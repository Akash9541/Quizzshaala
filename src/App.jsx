import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Front from "./Components/Front";
import Coding from "./Components/dsa";
import Login from "./Components/Login";
import Logical from "./Components/Logical";
import Aptitude from "./Components/Aptitude";
import CS from "./Components/csfundamentals";
import Verbal from "./Components/verbal";
import Mock from "./Components/mock";
import Dashboard from "./Components/Dashboard";
import History from "./Components/History";
import Signup from "./Components/signup";
import Resume from "./Components/Resume"; 
import Placements from "./Components/Placements";// Import the Resume component
import Motivation from "./Components/Motivation";
import CompanyQuestionsPage from "./Components/Company";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/front" element={
          <ProtectedRoute>
            <Front />
          </ProtectedRoute>
        } />

        {/* Topic Pages */}
        <Route path="/coding" element={
          <ProtectedRoute>
            <Coding />
          </ProtectedRoute>
        } />
        <Route path="/logical" element={
          <ProtectedRoute>
            <Logical />
          </ProtectedRoute>
        } />
        <Route path="/aptitude" element={
          <ProtectedRoute>
            <Aptitude />
          </ProtectedRoute>
        } />
        <Route path="/csfundamentals" element={
          <ProtectedRoute>
            <CS />
          </ProtectedRoute>
        } />
        <Route path="/verbal" element={
          <ProtectedRoute>
            <Verbal />
          </ProtectedRoute>
        } />
        <Route path="/mock" element={
          <ProtectedRoute>
            <Mock />
          </ProtectedRoute>
        } />
        <Route path="/history" element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        } />
        
        {/* Resume Page */}
        <Route path="/resume" element={
          <ProtectedRoute>
            <Resume />
          </ProtectedRoute>
        } />
        {/* Placements Page - This should be your main page */}
        <Route path="/Company" element={
          <ProtectedRoute>
            <CompanyQuestionsPage />
          </ProtectedRoute>
        } />
        {/* Placements Page - This should be your main page */}
        <Route path="/Placements" element={
          <ProtectedRoute>
            <Placements />
          </ProtectedRoute>
        } />
        {/* Motivation page*/}
        <Route path="/Motivation" element={
          <ProtectedRoute>
            <Motivation />
          </ProtectedRoute>
        } 
        />
        

        {/* 404 Route */}
        <Route path="*" element={
          <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">404</h1>
              <p className="text-gray-400">Page not found</p>
              <button 
                onClick={() => window.history.back()}
                className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        } />
      </Routes>
    </>
  );
}