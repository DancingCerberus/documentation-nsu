import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config';

let pathToPageIdCache = null;
let loadingPages = false;

let currentPageId = null;
let startTime = null;

const sendTimeToServer = async (pageId, timeSpent) => {
    try {
        const response = await fetch(`${API_BASE_URL}/kpi/visit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page_id: pageId,
                time_spent: timeSpent,
            }),
        });
        
        if (!response.ok) {
            console.error('Failed to send time data:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending time data:', error);
    }
};

const handlePageLeave = () => {
    if (currentPageId && startTime) {
        const timeSpent = (Date.now() - startTime) / 1000;
        sendTimeToServer(currentPageId, timeSpent);
        currentPageId = null;
        startTime = null;
    }
};

const loadPagesMapping = async () => {
    if (pathToPageIdCache) {
        return pathToPageIdCache;
    }
    
    if (loadingPages) {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (pathToPageIdCache) {
                    clearInterval(checkInterval);
                    resolve(pathToPageIdCache);
                }
            }, 100);
        });
    }
    
    loadingPages = true;
    try {
        const response = await fetch(`${API_BASE_URL}/pages`);
        if (response.ok) {
            const pages = await response.json();
            const mapping = {};
            pages.forEach((page) => {
                mapping[page.url] = page.id;
            });
            pathToPageIdCache = mapping;
            return mapping;
        }

        const kpiResponse = await fetch(`${API_BASE_URL}/kpi/all`);
        if (kpiResponse.ok) {
            const kpiData = await kpiResponse.json();
            const mapping = {};
            kpiData.forEach((item) => {
                mapping[item.page_url] = item.page_id;
            });
            pathToPageIdCache = mapping;
            return mapping;
        }

        console.warn('Не удалось загрузить страницы, используем дефолтные ID');
        pathToPageIdCache = {
            '/': 1,
            '/description': 2,
            '/posts': 3,
            '/conclusion': 4,
            '/api-ui': 5,
        };
        return pathToPageIdCache;
    } catch (error) {
        console.error('Ошибка загрузки страниц:', error);
        pathToPageIdCache = {
            '/': 1,
            '/description': 2,
            '/posts': 3,
            '/conclusion': 4,
            '/api-ui': 5,
        };
        return pathToPageIdCache;
    } finally {
        loadingPages = false;
    }
};

export const usePageTracking = () => {
    const location = useLocation();
    const pageIdRef = useRef(null);
    const [pagesMapping, setPagesMapping] = useState(null);

    useEffect(() => {
        loadPagesMapping().then((mapping) => {
            setPagesMapping(mapping);
        });
    }, []);

    useEffect(() => {
        if (!pagesMapping) {
            return;
        }

        const pageId = pagesMapping[location.pathname];
        
        if (!pageId) {
            return;
        }

        if (pageIdRef.current && pageIdRef.current !== pageId && startTime) {
            const timeSpent = (Date.now() - startTime) / 1000;
            sendTimeToServer(pageIdRef.current, timeSpent);
        }

        currentPageId = pageId;
        pageIdRef.current = pageId;
        startTime = Date.now();

        sendTimeToServer(pageId, 0);

        const handleBeforeUnload = () => {
            handlePageLeave();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            if (pageIdRef.current === pageId && startTime) {
                const timeSpent = (Date.now() - startTime) / 1000;
                sendTimeToServer(pageId, timeSpent);
            }
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [location.pathname, pagesMapping]);
};

