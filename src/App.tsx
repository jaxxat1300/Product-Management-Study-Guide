import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { TopNav } from './components/navigation/TopNav';
import { MobileNav } from './components/navigation/MobileNav';
import { Home } from './pages/Home';
import { LearningPath } from './pages/LearningPath';
import { ModuleDetail } from './pages/ModuleDetail';
import { LessonViewer } from './components/lesson/LessonViewer';
import { LessonResults } from './pages/LessonResults';
import { Planner } from './pages/Planner';
import { Profile } from './pages/Profile';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <TopNav />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/learn" element={<LearningPath />} />
              <Route path="/learn/:moduleId" element={<ModuleDetail />} />
              <Route path="/lesson/:lessonId" element={<LessonViewer />} />
              <Route path="/lesson/:lessonId/results" element={<LessonResults />} />
              <Route path="/planner" element={<Planner />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <MobileNav />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
