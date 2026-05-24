import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PeriodicPage from './pages/PeriodicPage'
import LabPage from './pages/LabPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import LessonPage from './pages/LessonPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/periodic" element={<PeriodicPage />} />
      <Route path="/lab" element={<LabPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route path="/courses/lesson/:id" element={<LessonPage />} />
    </Routes>
  )
}
