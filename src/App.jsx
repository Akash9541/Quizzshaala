import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";

// ================================
// Lazy-loaded components
// ================================
const Front = lazy(() => import("./Components/Front"));
const Coding = lazy(() => import("./Components/dsa"));
const Login = lazy(() => import("./Components/Login"));
const Logical = lazy(() => import("./Components/Logical"));
const Aptitude = lazy(() => import("./Components/Aptitude"));
const CS = lazy(() => import("./Components/csfundamentals"));
const Verbal = lazy(() => import("./Components/verbal"));
const Mock = lazy(() => import("./Components/mock"));
const Dashboard = lazy(() => import("./Components/Dashboard"));
const History = lazy(() => import("./Components/History"));
const Signup = lazy(() => import("./Components/signup"));
const Resume = lazy(() => import("./Components/Resume"));
const Placements = lazy(() => import("./Components/Placements"));
const Motivation = lazy(() => import("./Components/Motivation"));
const CompanyQuestionsPage = lazy(() => import("./Components/Company"));

// ================================
// Protected Route Component
// ================================
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
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

// ================================
// Public Route Component
// ================================
const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
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

  return !isAuthenticated ? children : <Navigate to="/front" replace />;
};

// ================================
// Main App Component
// ================================
export default function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading page...</p>
          </div>
        </div>
      }
    >
      <Routes>
        {/* ===================== PUBLIC ROUTES ===================== */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Front />
            </PublicRoute>
          }
        />

        {/* ===================== PROTECTED ROUTES ===================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/front"
          element={
            <ProtectedRoute>
              <Front />
            </ProtectedRoute>
          }
        />

        {/* Topic Pages */}
        <Route
          path="/coding"
          element={
            <ProtectedRoute>
              <Coding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logical"
          element={
            <ProtectedRoute>
              <Logical />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aptitude"
          element={
            <ProtectedRoute>
              <Aptitude />
            </ProtectedRoute>
          }
        />
        <Route
          path="/csfundamentals"
          element={
            <ProtectedRoute>
              <CS />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verbal"
          element={
            <ProtectedRoute>
              <Verbal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mock"
          element={
            <ProtectedRoute>
              <Mock />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* Resume / Placements */}
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
        />
        <Route
          path="/placements"
          element={
            <ProtectedRoute>
              <Placements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company"
          element={
            <ProtectedRoute>
              <CompanyQuestionsPage />
            </ProtectedRoute>
          }
        />

        {/* Motivation */}
        <Route
          path="/motivation"
          element={
            <ProtectedRoute>
              <Motivation />
            </ProtectedRoute>
          }
        />

        {/* ===================== 404 ROUTE ===================== */}
        <Route
          path="*"
          element={
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
          }
        />
      </Routes>
    </Suspense>
  );
}