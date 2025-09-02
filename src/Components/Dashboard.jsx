import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaTrophy, FaBookOpen, FaChartLine, FaPlay, FaHistory, FaAward, FaRocket, FaBrain, FaCode, FaCalculator, FaComments } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://quizshaala.onrender.com";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    quizzesCompleted: 0,
    averageScore: 0,
    totalPoints: 0
  });
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    loadUserData();
    loadUserStats();
    loadRecentQuizzes();
    
    // Mouse tracking for background effect
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const loadUserData = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const response = await fetch(`${API_BASE_URL}/profile`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserStats = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const response = await fetch(`${API_BASE_URL}/stats`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadRecentQuizzes = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const response = await fetch(`${API_BASE_URL}/recent-quizzes`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setRecentQuizzes(data.quizzes || []);
        }
      }
    } catch (error) {
      console.error('Error loading recent quizzes:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      
      if (accessToken) {
        await fetch(`${API_BASE_URL}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      sessionStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const startNewQuiz = () => {
    // For demonstration, we'll create a mock quiz
    const mockQuiz = {
      id: 1,
      title: "Sample Quiz: Web Development",
      topic: "Coding & Problem-Solving",
      questions: [
        {
          id: 1,
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "Which of these is a JavaScript framework?",
          options: [
            "Django",
            "Flask",
            "React",
            "Ruby on Rails"
          ],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "What does CSS stand for?",
          options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
          ],
          correctAnswer: 2
        }
      ]
    };
    
    setCurrentQuiz(mockQuiz);
    setQuizAnswers(new Array(mockQuiz.questions.length).fill(null));
    setShowQuizModal(true);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const submitQuiz = async () => {
    // Calculate score
    let score = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        score += 1;
      }
    });
    
    setQuizScore(score);
    
    try {
      // Save quiz results to backend
      const results = {
        topic: currentQuiz.topic,
        score: score,
        totalQuestions: currentQuiz.questions.length
      };
      
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(results),
      });
      
      if (response.ok) {
        // Notify the history page to refresh
        
        // Refresh dashboard stats
        loadUserStats();
        loadRecentQuizzes();
      } else {
        console.error("Failed to save quiz results");
      }
    } catch (error) {
      console.error("Error saving quiz results:", error);
    }
  };

  const closeQuizModal = () => {
    setShowQuizModal(false);
    setCurrentQuiz(null);
    setQuizAnswers([]);
    setQuizScore(0);
  };

  const viewQuizHistory = () => {
    navigate('/history');
  };

  // Background effect component matching the front page
  const BackgroundEffect = () => (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/5 via-transparent to-cyan-900/5" />
      </div>
      
      <div
        className="fixed w-96 h-96 pointer-events-none z-0 transition-all duration-700 ease-out opacity-30"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 8)}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
    </>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundEffect />
      
      <div className="relative z-10 text-white">
        {/* Header */}
        <header className="fixed top-0 w-full backdrop-blur-xl bg-slate-900/90 border-b border-slate-700/50 shadow-2xl z-50">
          <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto">
            <div className="group cursor-pointer" onClick={() => navigate('/')}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  Q
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Quizshaala
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-200">
                <FaUser className="text-sm" />
                <span>{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg transition-all duration-300"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          {/* Welcome Section */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">
              Welcome back, {user?.name}! 👋
            </h2>
            <p className="text-slate-300 text-xl">
              Ready to continue your learning journey?
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Quizzes Completed</p>
                  <p className="text-2xl font-bold text-white">{stats.quizzesCompleted}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <FaBookOpen className="text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Average Score</p>
                  <p className="text-2xl font-bold text-white">{stats.averageScore}%</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <FaChartLine className="text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Points</p>
                  <p className="text-2xl font-bold text-white">{stats.totalPoints}</p>
                </div>
                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <FaAward className="text-amber-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={startNewQuiz}
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white p-6 rounded-xl border border-cyan-500/30 transition-all hover:scale-105 group"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-2">Start New Quiz</h3>
                  <p className="text-cyan-100">Test your knowledge with new challenges</p>
                </div>
                <FaPlay className="text-2xl transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={viewQuizHistory}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-6 rounded-xl border border-purple-500/30 transition-all hover:scale-105 group"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-2">View History</h3>
                  <p className="text-purple-100">Review your past quiz performances</p>
                </div>
                <FaHistory className="text-2xl transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Recent Quizzes Section */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <FaHistory className="mr-2 text-purple-400" />
              Recent Quizzes
            </h3>
            
            {recentQuizzes.length > 0 ? (
              <div className="space-y-4">
                {recentQuizzes.map((quiz, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                    <div>
                      <h4 className="font-semibold text-white">{quiz.category}</h4>
                      <p className="text-sm text-slate-400">{new Date(quiz.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{quiz.score}%</p>
                      <p className="text-sm text-slate-400">{quiz.correctAnswers}/{quiz.totalQuestions} correct</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaBookOpen className="text-4xl text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No quizzes completed yet</p>
                <p className="text-sm text-slate-600 mt-2">Start your first quiz to see your progress here!</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Quiz Modal */}
      {showQuizModal && currentQuiz && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">{currentQuiz.title}</h3>
                <button 
                  onClick={closeQuizModal}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {quizScore > 0 ? (
                // Quiz Results
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">{quizScore}/{currentQuiz.questions.length}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h4>
                  <p className="text-slate-300 mb-6">
                    You scored {Math.round((quizScore / currentQuiz.questions.length) * 100)}%
                  </p>
                  <button
                    onClick={closeQuizModal}
                    className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg"
                  >
                    Return to Dashboard
                  </button>
                </div>
              ) : (
                // Quiz Questions
                <>
                  {currentQuiz.questions.map((question, qIndex) => (
                    <div key={question.id} className="mb-8 last:mb-0">
                      <h4 className="text-lg font-semibold text-white mb-4">
                        {qIndex + 1}. {question.question}
                      </h4>
                      <div className="space-y-3">
                        {question.options.map((option, oIndex) => (
                          <div 
                            key={oIndex}
                            className={`p-4 rounded-lg cursor-pointer transition-all ${
                              quizAnswers[qIndex] === oIndex
                                ? "bg-blue-600/30 border border-blue-500/50"
                                : "bg-slate-700/30 hover:bg-slate-700/50 border border-slate-700/50"
                            }`}
                            onClick={() => handleAnswerSelect(qIndex, oIndex)}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                                quizAnswers[qIndex] === oIndex
                                  ? "border-blue-400 bg-blue-400/20"
                                  : "border-slate-500"
                              }`}>
                                {quizAnswers[qIndex] === oIndex && (
                                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                )}
                              </div>
                              <span className="text-slate-200">{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={submitQuiz}
                    disabled={quizAnswers.includes(null)}
                    className={`w-full py-3 rounded-lg font-medium mt-6 ${
                      quizAnswers.includes(null)
                        ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                    }`}
                  >
                    Submit Quiz
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;