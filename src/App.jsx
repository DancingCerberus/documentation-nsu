import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import IntroPanel from './components/IntroPanel';
import DescriptionPanel from './components/MainPanel';
import PostsPanel from "./components/PostsPanel.jsx";
import ConclusionPanel from './components/ConclusionPanel';
import ApiPanel from "./components/ApiPanel.jsx";

function App() {
    return (
        <Router>
            <div className="wrapper">
                <Sidebar />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<IntroPanel/>}/>
                        <Route path="/description" element={<DescriptionPanel/>}/>
                        <Route path="/posts" element={<PostsPanel/>} />
                        <Route path="/conclusion" element={<ConclusionPanel/>}/>
                        <Route path="/api-ui" element={<ApiPanel/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
