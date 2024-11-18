import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import TestPage from './pages/Test'
import CardPage from './pages/Card'
import ScrollToTop from './components/shared/ScrollToTop'
import SigninPage from './pages/Signin'
import SignupPage from './pages/Signup'
import Navbar from './components/shared/Navbar'

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/card/:id" element={<CardPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
