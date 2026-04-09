import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SiteProvider } from './context/SiteContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import BookingPage from './pages/BookingPage'
import TestimonialsPage from './pages/TestimonialsPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'
import './index.css'

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean; error: string }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: '' }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message + '\n\n' + error.stack }
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App crashed:', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: 'sans-serif', color: '#333', maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ color: '#8b6f47' }}>Something went wrong</h1>
          <p>The website encountered an error. Please try refreshing.</p>
          <pre style={{ background: '#fef2f2', padding: 20, borderRadius: 8, fontSize: 13, overflow: 'auto', whiteSpace: 'pre-wrap', color: '#991b1b' }}>
            {this.state.error}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: 16, padding: '12px 24px', background: '#8b6f47', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16 }}>
            Refresh Page
          </button>
          <button onClick={() => { localStorage.clear(); window.location.reload() }} style={{ marginTop: 16, marginLeft: 12, padding: '12px 24px', background: '#6b7280', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16 }}>
            Clear Data & Refresh
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <SiteProvider>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <Footer />
        </HashRouter>
      </SiteProvider>
    </ErrorBoundary>
  )
}
