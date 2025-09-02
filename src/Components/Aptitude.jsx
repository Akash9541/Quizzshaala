import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaCalculator, FaTrophy, FaStar, FaFire, FaLightbulb, FaCheckCircle, FaTimesCircle, FaRocket, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://quizshaala.onrender.com";

const questions = [
  {
    question: "A shopkeeper sells an article at 20% profit. If he had bought it at 10% less and sold it for ₹10 more, he would have gained 30%. What is the cost price of the article?",
    options: ["₹100", "₹150", "₹200", "₹250"],
    answer: "₹200"
  },
  {
    question: "A train 150 m long passes a pole in 15 seconds. What is the speed of the train?",
    options: ["30 km/h", "36 km/h", "45 km/h", "54 km/h"],
    answer: "36 km/h"
  },
  {
    question: "If the simple interest on ₹5000 in 2 years is ₹800, what is the rate of interest?",
    options: ["6%", "8%", "10%", "12%"],
    answer: "8%"
  },
  {
    question: "A sum of money becomes ₹9800 in 2 years and ₹12005 in 5 years at simple interest. What is the rate?",
    options: ["10%", "12%", "15%", "18%"],
    answer: "12%"
  },
  {
    question: "A can do a work in 10 days and B in 15 days. How many days will they take to complete it together?",
    options: ["6", "5", "7", "8"],
    answer: "6"
  },
];

const AptitudeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - questionStartTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [questionStartTime]);

  const handleOptionClick = (option) => {
    if (showFeedback) return;
    
    setSelectedOption(option);
    const correct = option === questions[currentQuestion].answer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
      setAnsweredQuestions([...answeredQuestions, { 
        question: questions[currentQuestion].question,
        correct: true 
      }]);
    } else {
      setAnsweredQuestions([...answeredQuestions, { 
        question: questions[currentQuestion].question,
        correct: false,
        correctAnswer: questions[currentQuestion].answer 
      }]);
    }
  };

  const handleNext = () => {
    setSelectedOption('');
    setShowFeedback(false);
    setIsCorrect(null);
    setCurrentQuestion(currentQuestion + 1);
    setQuestionStartTime(Date.now());
    setTimeElapsed(0);
  };

  const getScorePercentage = () => {
    return Math.round((score / questions.length) * 100);
  };

  const getScoreEmoji = () => {
    const percentage = getScorePercentage();
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 70) return '🎯';
    if (percentage >= 60) return '👍';
    return '💪';
  };

  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300">Progress</span>
        <span className="text-sm text-cyan-400">{currentQuestion + 1}/{questions.length}</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-3 backdrop-blur-sm border border-white/10">
        <div 
          className="bg-gradient-to-r from-cyan-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );

useEffect(() => {
  if (currentQuestion === questions.length) {
    const saveHistory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            quizTitle: "Quantitative Aptitude Quiz",
            score,
            totalQuestions: questions.length,
            dateTaken: new Date(),
          }),
        });

        if (response.ok) {
          console.log("✅ Quiz history saved!");

          // 🔥 Tell History.jsx to refresh
          window.dispatchEvent(new Event("historyShouldUpdate"));
        } else {
          console.error("❌ Failed to save history:", response.status);
        }
      } catch (err) {
        console.error("❌ Error saving history:", err);
      }
    };

    saveHistory();
  }
}, [currentQuestion, score]);

if (currentQuestion >= questions.length) {
  return (
    <div className="min-h-screen relative overflow-hidden">

        {/* Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
          <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/5 via-transparent to-cyan-900/5" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-slate-800/30 backdrop-blur-md rounded-3xl p-12 border border-slate-700/50 shadow-2xl">
              <div className="text-8xl mb-8 animate-bounce">
                {getScoreEmoji()}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Quiz Completed! ✨
              </h1>
              
              <div className="mb-8">
                <div className="text-6xl font-bold text-white mb-2">{score}/{questions.length}</div>
                <div className="text-2xl text-gray-300 mb-4">
                  Score: <span className="text-cyan-400 font-semibold">{getScorePercentage()}%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl p-4 border border-green-500/30">
                  <FaCheckCircle className="text-green-400 text-2xl mx-auto mb-2" />
                  <div className="text-lg font-semibold text-white">{score}</div>
                  <div className="text-sm text-gray-300">Correct</div>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-pink-600/20 rounded-xl p-4 border border-red-500/30">
                  <FaTimesCircle className="text-red-400 text-2xl mx-auto mb-2" />
                  <div className="text-lg font-semibold text-white">{questions.length - score}</div>
                  <div className="text-sm text-gray-300">Wrong</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-xl p-4 border border-purple-500/30">
                  <FaTrophy className="text-purple-400 text-2xl mx-auto mb-2" />
                  <div className="text-lg font-semibold text-white">{getScorePercentage()}%</div>
                  <div className="text-sm text-gray-300">Grade</div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => {
                    setCurrentQuestion(0);
                    setScore(0);
                    setSelectedOption('');
                    setShowFeedback(false);
                    setIsCorrect(null);
                    setAnsweredQuestions([]);
                    setQuestionStartTime(Date.now());
                  }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 text-white rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  <FaRocket className="inline mr-2" /> Try Again
                </button>
                <button 
                  onClick={() => navigate('/Front')}
                  className="w-full px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full text-lg font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <FaArrowLeft className="inline mr-2" /> Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/5 via-transparent to-cyan-900/5" />
      </div>

      <div className="relative z-10 min-h-screen p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/Front')}
            className="group flex items-center gap-3 px-6 py-3 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 text-white rounded-full transition-all duration-300 border border-slate-700 hover:border-slate-600 hover:scale-105"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="flex items-center gap-4">
            <div className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700">
              <span className="text-cyan-400 font-semibold">Score: {score}</span>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700">
              <span className="text-purple-400 font-semibold">Time: {timeElapsed}s</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce">
            <FaCalculator className="text-cyan-400 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4">
            Quantitative Aptitude Quiz ✨
          </h1>
          <p className="text-xl text-gray-300">Master your mathematical skills</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <ProgressBar />

          {/* Question Card */}
          <div className="bg-slate-800/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-slate-700/50 shadow-2xl mb-8 transition-all duration-500 hover:shadow-3xl">
            <div className="flex items-start gap-4 mb-8">
              <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                {currentQuestion + 1}
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                  {questions[currentQuestion].question}
                </h2>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => {
                let buttonStyle = "w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 transform hover:scale-[1.02] ";
                
                if (showFeedback) {
                  if (option === questions[currentQuestion].answer) {
                    buttonStyle += 'bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-green-500/50 text-green-300 shadow-green-500/20 shadow-lg';
                  } else if (option === selectedOption) {
                    buttonStyle += 'bg-gradient-to-r from-red-500/20 to-pink-600/20 border-red-500/50 text-red-300 shadow-red-500/20 shadow-lg';
                  } else {
                    buttonStyle += 'bg-white/5 border-white/10 text-gray-300';
                  }
                } else {
                  buttonStyle += 'bg-white/10 backdrop-blur-md hover:bg-white/20 border-white/20 hover:border-white/40 text-white hover:shadow-xl';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    disabled={showFeedback}
                    className={buttonStyle}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-lg">{option}</span>
                      {showFeedback && option === questions[currentQuestion].answer && (
                        <FaCheckCircle className="text-green-400 ml-auto text-xl" />
                      )}
                      {showFeedback && option === selectedOption && option !== questions[currentQuestion].answer && (
                        <FaTimesCircle className="text-red-400 ml-auto text-xl" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`mt-8 p-6 rounded-xl backdrop-blur-md border transition-all duration-500 ${
                isCorrect 
                  ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                  : 'bg-red-500/10 border-red-500/30 text-red-300'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  {isCorrect ? (
                    <>
                      <FaCheckCircle className="text-2xl" />
                      <span className="text-xl font-semibold">Correct! +1 Point</span>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="text-2xl" />
                      <span className="text-xl font-semibold">Incorrect Answer</span>
                    </>
                  )}
                </div>
                <p className="text-lg">
                  {isCorrect 
                    ? 'Great job! You earned a point.' 
                    : `The correct answer is: ${questions[currentQuestion].answer}`
                  }
                </p>
                {!isCorrect && (
                  <div className="mt-4 p-3 bg-white/5 rounded-lg">
                    <p className="text-sm">Remember this for next time!</p>
                  </div>
                )}
              </div>
            )}

            {/* Next Button */}
            {showFeedback && (
              <div className="text-center mt-8">
                <button
                  onClick={handleNext}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-purple-600 hover:to-cyan-500 text-white rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  {currentQuestion === questions.length - 1 ? (
                    <>
                      <FaTrophy className="inline mr-2" /> Finish Quiz
                    </>
                  ) : (
                    <>
                      Next Question <FaArrowRight className="inline ml-2" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-4 border border-slate-700/50 text-center">
              <FaLightbulb className="text-yellow-400 text-2xl mx-auto mb-2" />
              <div className="text-lg font-semibold text-white">{currentQuestion + 1}</div>
              <div className="text-sm text-gray-300">Current</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-4 border border-slate-700/50 text-center">
              <FaStar className="text-cyan-400 text-2xl mx-auto mb-2" />
              <div className="text-lg font-semibold text-white">{score}</div>
              <div className="text-sm text-gray-300">Score</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-4 border border-slate-700/50 text-center">
              <FaFire className="text-orange-400 text-2xl mx-auto mb-2" />
              <div className="text-lg font-semibold text-white">{questions.length}</div>
              <div className="text-sm text-gray-300">Total</div>
            </div>
            <div className="bg-slate-800/30 backdrop-blur-md rounded-xl p-4 border border-slate-700/50 text-center">
              <FaTrophy className="text-purple-400 text-2xl mx-auto mb-2" />
              <div className="text-lg font-semibold text-white">{Math.round((score / Math.max(currentQuestion, 1)) * 100)}%</div>
              <div className="text-sm text-gray-300">Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudeQuiz;