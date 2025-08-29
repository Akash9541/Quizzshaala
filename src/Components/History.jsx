import React, { useEffect, useState } from "react";
import { FaTrophy, FaSync } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

// Custom event to notify history page of updates
export const notifyHistoryUpdate = () => {
  window.dispatchEvent(new CustomEvent('historyShouldUpdate'));
};

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching quiz history:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchHistory();

    // Listen for custom events to refresh history
    const handleHistoryUpdate = () => {
      setRefreshing(true);
      fetchHistory();
    };

    window.addEventListener('historyShouldUpdate', handleHistoryUpdate);
    
    // Cleanup
    return () => {
      window.removeEventListener('historyShouldUpdate', handleHistoryUpdate);
    };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchHistory();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FaTrophy className="text-yellow-400" /> Quiz History
        </h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-4 py-2 rounded-lg transition"
        >
          <FaSync className={refreshing ? "animate-spin" : ""} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-400 text-xl">You haven't attempted any quizzes yet.</p>
          <p className="text-gray-500 mt-2">Complete a quiz to see your results here!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {history.map((quiz) => (
            <div
              key={quiz._id || quiz.id}
              className="p-6 bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition hover:scale-[1.02]"
            >
              <h2 className="text-xl font-semibold mb-2 text-blue-300">{quiz.topic || quiz.quizTitle}</h2>
              <p className="text-gray-400 mb-3">
                {new Date(quiz.dateTaken).toLocaleDateString()} • {new Date(quiz.dateTaken).toLocaleTimeString()}
              </p>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <span className="text-gray-400">Score: </span>
                  <span className="font-bold text-green-400">
                    {quiz.score}/{quiz.totalQuestions}
                  </span>
                </div>
                <div className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-3">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${(quiz.score / quiz.totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;