import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import IntroPanel from './components/IntroPanel';
import DescriptionPanel from './components/MainPanel';
import PostsPanel from "./components/PostsPanel.jsx";
import ConclusionPanel from './components/ConclusionPanel';
import ApiPanel from "./components/ApiPanel.jsx";
import StatsPanel from "./components/StatsPanel.jsx";
import { usePageTracking } from './hooks/usePageTracking';

function AppContent() {
    usePageTracking();
    
    return (
        <div className="wrapper">
            <Sidebar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<IntroPanel/>}/>
                    <Route path="/description" element={<DescriptionPanel/>}/>
                    <Route path="/posts" element={<PostsPanel/>} />
                    <Route path="/conclusion" element={<ConclusionPanel/>}/>
                    <Route path="/api-ui" element={<ApiPanel/>}/>
                    <Route path="/stats" element={<StatsPanel/>}/>
                </Routes>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
