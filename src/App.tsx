import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import TestPage from './pages/Test'
import CardPage from './pages/Card'
import ScrollToTop from './components/shared/ScrollToTop'

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
