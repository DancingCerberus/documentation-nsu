import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import '../App.css';

function StatsPanel() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/kpi/all`);
            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }
            const data = await response.json();
            setStats(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching stats:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        if (seconds < 60) {
            return `${Math.round(seconds)} сек`;
        } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.round(seconds % 60);
            return `${minutes} мин ${secs} сек`;
        } else {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.round(seconds % 60);
            return `${hours} ч ${minutes} мин ${secs} сек`;
        }
    };

    if (loading) {
        return (
            <div className="content">
                <h1>Статистика посещений</h1>
                <p>Загрузка...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="content">
                <h1>Статистика посещений</h1>
                <p className="stats-panel__error">Ошибка: {error}</p>
                <button className="stats-panel__button" onClick={fetchStats}>Попробовать снова</button>
            </div>
        );
    }

    return (
        <div className="content">
            <h1>Статистика посещений</h1>
            <table className="stats-panel__table">
                <thead>
                    <tr className="stats-panel__table-head-row">
                        <th className="stats-panel__table-head stats-panel__table-head--left">Страница</th>
                        <th className="stats-panel__table-head stats-panel__table-head--left">URL</th>
                        <th className="stats-panel__table-head stats-panel__table-head--center">Количество посещений</th>
                        <th className="stats-panel__table-head stats-panel__table-head--center">Общее время</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.length === 0 ? (
                        <tr>
                            <td className="stats-panel__table-cell stats-panel__table-cell--empty" colSpan="4">
                                Нет данных о посещениях
                            </td>
                        </tr>
                    ) : (
                        stats.map((stat, index) => (
                            <tr 
                                key={stat.page_id} 
                                className={`stats-panel__table-row ${index % 2 === 0 ? 'stats-panel__table-row--even' : 'stats-panel__table-row--odd'}`}
                            >
                                <td className="stats-panel__table-cell">{stat.page_name}</td>
                                <td className="stats-panel__table-cell">{stat.page_url}</td>
                                <td className="stats-panel__table-cell stats-panel__table-cell--center">
                                    {stat.visit_count}
                                </td>
                                <td className="stats-panel__table-cell stats-panel__table-cell--center">
                                    {formatTime(stat.total_time_spent)}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <button 
                className="stats-panel__button"
                onClick={fetchStats}
            >
                Обновить статистику
            </button>
        </div>
    );
}

export default StatsPanel;

