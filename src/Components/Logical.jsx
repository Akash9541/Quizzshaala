import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaTrophy, FaStar, FaRedo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://quizshaala.onrender.com";

const questions = [
  {
    question: "What comes next in the sequence: 2, 4, 8, 16, ?",
    options: ["18", "24", "32", "20"],
    correct: "32",
    explanation: "This is a geometric sequence where each term is multiplied by 2."
  },
  {
    question: "If ALL DOGS are ANIMALS, and SOME ANIMALS are CATS, which of the following is true?",
    options: [
      "All dogs are cats",
      "Some cats are dogs",
      "Some animals are cats",
      "No animals are dogs"
    ],
    correct: "Some animals are cats",
    explanation: "The statement 'SOME ANIMALS are CATS' directly implies this is true."
  },
  {
    question: "Choose the odd one out: Apple, Banana, Carrot, Grape",
    options: ["Apple", "Banana", "Carrot", "Grape"],
    correct: "Carrot",
    explanation: "Carrot is a vegetable while the others are fruits."
  },
  {
    question: "Which number is missing: 1, 4, 9, 16, ?",
    options: ["20", "25", "30", "36"],
    correct: "25",
    explanation: "These are perfect squares: 1², 2², 3², 4², so next is 5²=25."
  },
  {
    question: "If it takes 5 machines 5 minutes to make 5 parts, how long will 100 machines take to make 100 parts?",
    options: ["5 minutes", "100 minutes", "50 minutes", "10 minutes"],
    correct: "5 minutes",
    explanation: "Each machine makes 1 part every 5 minutes, so scaling maintains the time."
  }
];

const Logical = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();
  const feedbackRef = useRef(null);

useEffect(() => {
  if (showFeedback && feedbackRef.current) {
    feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}, [showFeedback]);

// Always call useEffect at the top level
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
            quizTitle: "Logical Reasoning Quiz",
            score,
            totalQuestions: questions.length,
            dateTaken: new Date(),
          }),
        });

        if (response.ok) {
          console.log("✅ Logical quiz history saved!");
          // 🔥 Tell History.jsx to refresh
          window.dispatchEvent(new Event("historyShouldUpdate"));
        } else {
          console.error("❌ Failed to save logical quiz history:", response.status);
        }
      } catch (err) {
        console.error("❌ Error saving logical quiz history:", err);
      }
    };

    saveHistory();
  }
}, [currentQuestion, score]);

const handleOptionClick = (option) => {
  if (showFeedback) return;
  
  const isAnswerCorrect = option === questions[currentQuestion].correct;
  setIsCorrect(isAnswerCorrect);
  setSelectedOption(option);
  setShowFeedback(true);
  
  if (isAnswerCorrect) {
    setScore(score + 1);
    const newStreak = streak + 1;
    setStreak(newStreak);
    if (newStreak > maxStreak) setMaxStreak(newStreak);
  } else {
    setStreak(0);
  }
  
  setUserAnswers([...userAnswers, {
    question: questions[currentQuestion].question,
    selected: option,
    correct: questions[currentQuestion].correct
  }]);
};

const handleNext = () => {
  setSelectedOption('');
  setShowFeedback(false);
  setIsCorrect(null);
  setCurrentQuestion(currentQuestion + 1);
};

const getScorePercentage = () => Math.round((score / questions.length) * 100);

const triggerConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
};

if (currentQuestion >= questions.length) {

    const percentage = getScorePercentage();
    if (percentage >= 80) {
      triggerConfetti();
    }
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white p-6">
        <div className="bg-slate-800/30 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-slate-700/50 shadow-2xl max-w-2xl w-full text-center">
          <div className="text-6xl mb-4 animate-bounce">
            <FaTrophy className="text-yellow-400 mx-auto" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Quiz Completed!
          </h1>
          
          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-cyan-400">{score}/{questions.length}</p>
              <p className="text-gray-300">Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-400">{percentage}%</p>
              <p className="text-gray-300">Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">{maxStreak}</p>
              <p className="text-gray-300">Max Streak</p>
            </div>
          </div>
          
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`text-2xl mx-1 ${
                  i < Math.floor(percentage / 20) 
                    ? "text-yellow-400" 
                    : "text-gray-600"
                }`} 
              />
            ))}
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/Front')} 
              className="w-full max-w-xs mx-auto py-3 flex items-center justify-center gap-2 rounded-full bg-cyan-600 hover:bg-cyan-700 transition"
            >
              <FaArrowLeft /> Back to Home
            </button>
            
            <button 
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setStreak(0);
                setMaxStreak(0);
                setSelectedOption('');
                setShowFeedback(false);
                setIsCorrect(null);
                setUserAnswers([]);
              }} 
              className="w-full max-w-xs mx-auto py-3 flex items-center justify-center gap-2 rounded-full bg-purple-600 hover:bg-purple-700 transition"
            >
              <FaRedo /> Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white p-4 md:p-6">
      {/* Background gradient similar to Front component */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/5 via-transparent to-cyan-900/5" />
      </div>

      {/* Mouse tracking effect removed as requested */}

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <button 
            onClick={() => navigate('/Front')} 
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm rounded-full border border-slate-700 hover:border-slate-600 transition"
          >
            <FaArrowLeft /> Back
          </button>
          
          <div className="flex items-center gap-4">
            {streak > 0 && (
              <div className="hidden md:flex items-center gap-1 text-yellow-400 animate-pulse">
                <span className="font-semibold">🔥 {streak}</span>
              </div>
            )}
            <div className="text-cyan-400 font-semibold">Score: {score}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
          <div 
            className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-700/50 shadow-xl">
          <div className="mb-6 text-xl font-semibold">
            <span className="text-cyan-400">Q{currentQuestion + 1}: </span>
            {questions[currentQuestion].question}
          </div>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, i) => {
              let className = "w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 ";
              
              if (showFeedback) {
                if (option === questions[currentQuestion].correct) {
                  className += "bg-green-500/20 border-green-500 text-green-300";
                } else if (option === selectedOption) {
                  className += "bg-red-500/20 border-red-500 text-red-300";
                } else {
                  className += "bg-white/5 border-white/10 text-gray-300";
                }
              } else {
                className += "bg-white/10 border-white/20 hover:bg-white/20 text-white";
              }
              
              return (
                <button 
                  key={i} 
                  className={`${className} flex items-center`}
                  onClick={() => handleOptionClick(option)} 
                  disabled={showFeedback}
                >
                  <span className="mr-4 font-bold opacity-80">{String.fromCharCode(65 + i)}.</span>
                  {option}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div 
              ref={feedbackRef}
              className={`mt-6 p-4 rounded-xl ${
                isCorrect 
                  ? 'bg-green-500/10 text-green-300' 
                  : 'bg-red-500/10 text-red-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <FaCheckCircle className="text-2xl text-green-500" />
                ) : (
                  <FaTimesCircle className="text-2xl text-red-500" />
                )}
                <span className="text-lg font-semibold">
                  {isCorrect ? 'Correct! Great job!' : `Incorrect. The right answer is: ${questions[currentQuestion].correct}`}
                </span>
              </div>
              
              <div className="mt-3 text-sm opacity-90">
                {questions[currentQuestion].explanation}
              </div>
              
              <div className="mt-4 text-center">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-full text-white font-semibold transition"
                >
                  {currentQuestion === questions.length - 1 
                    ? 'Finish Quiz' 
                    : 'Next Question →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logical;