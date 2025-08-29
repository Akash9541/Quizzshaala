import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCode, FaExternalLinkAlt } from 'react-icons/fa';

const leetcodeQuestions = {
  Easy: [
    { title: "Two Sum", link: "https://leetcode.com/problems/two-sum/" },
    { title: "Valid Palindrome", link: "https://leetcode.com/problems/valid-palindrome/" },
    { title: "Merge Two Sorted Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/" },
    { title: "Best Time to Buy and Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
    { title: "Reverse Linked List", link: "https://leetcode.com/problems/reverse-linked-list/" },
    { title: "Valid Parentheses", link: "https://leetcode.com/problems/valid-parentheses/" },
    { title: "Majority Element", link: "https://leetcode.com/problems/majority-element/" },
    { title: "Remove Duplicates from Sorted Array", link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
    { title: "Climbing Stairs", link: "https://leetcode.com/problems/climbing-stairs/" },
    { title: "Intersection of Two Arrays", link: "https://leetcode.com/problems/intersection-of-two-arrays/" }
  ],
  Medium: [
    { title: "Add Two Numbers", link: "https://leetcode.com/problems/add-two-numbers/" },
    { title: "Longest Substring Without Repeating Characters", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
    { title: "Group Anagrams", link: "https://leetcode.com/problems/group-anagrams/" },
    { title: "Top K Frequent Elements", link: "https://leetcode.com/problems/top-k-frequent-elements/" },
    { title: "Kth Largest Element in an Array", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
    { title: "Product of Array Except Self", link: "https://leetcode.com/problems/product-of-array-except-self/" },
    { title: "Sort Colors", link: "https://leetcode.com/problems/sort-colors/" },
    { title: "Search in Rotated Sorted Array", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
    { title: "Subarray Sum Equals K", link: "https://leetcode.com/problems/subarray-sum-equals-k/" },
    { title: "Course Schedule", link: "https://leetcode.com/problems/course-schedule/" }
  ],
  Hard: [
    { title: "Median of Two Sorted Arrays", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
    { title: "Merge k Sorted Lists", link: "https://leetcode.com/problems/merge-k-sorted-lists/" },
    { title: "Trapping Rain Water", link: "https://leetcode.com/problems/trapping-rain-water/" },
    { title: "Word Ladder", link: "https://leetcode.com/problems/word-ladder/" },
    { title: "Longest Valid Parentheses", link: "https://leetcode.com/problems/longest-valid-parentheses/" },
    { title: "Maximal Rectangle", link: "https://leetcode.com/problems/maximal-rectangle/" },
    { title: "Regular Expression Matching", link: "https://leetcode.com/problems/regular-expression-matching/" },
    { title: "Palindrome Partitioning II", link: "https://leetcode.com/problems/palindrome-partitioning-ii/" },
    { title: "LFU Cache", link: "https://leetcode.com/problems/lfu-cache/" },
    { title: "N-Queens", link: "https://leetcode.com/problems/n-queens/" }
  ]
};

const Coding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black">
        <div className="absolute inset-0 bg-fixed bg-cover bg-center opacity-30" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
      </div>

      {/* Mouse Follow Effect */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(100, 100, 100, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />

      <div className="relative z-10 min-h-screen px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/Front')}
            className="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-gray-300 font-semibold">Total: {Object.values(leetcodeQuestions).flat().length}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4 animate-bounce">
            <FaCode className="text-blue-400 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent mb-4">
            Coding & DSA Practice ✨
          </h1>
          <p className="text-xl text-gray-300">Master your problem-solving skills with these curated challenges</p>
        </div>

        <div className="max-w-6xl mx-auto">
          {Object.entries(leetcodeQuestions).map(([level, questions]) => (
            <div key={level} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2
                  className={`text-2xl font-semibold ${
                    level === 'Easy'
                      ? 'text-green-400'
                      : level === 'Medium'
                      ? 'text-yellow-400'
                      : 'text-red-400'
                  }`}
                >
                  {level} Level
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    level === 'Easy'
                      ? 'bg-green-700/30 text-green-200'
                      : level === 'Medium'
                      ? 'bg-yellow-600/30 text-yellow-100'
                      : 'bg-red-700/30 text-red-200'
                  }`}
                >
                  {questions.length} Problems
                </span>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {questions.map((q, index) => (
                  <a
                    key={index}
                    href={q.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative overflow-hidden bg-white/10 backdrop-blur-md hover:bg-white/20 p-6 rounded-xl border border-white/20 shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: level === 'Easy' 
                          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, transparent 100%)'
                          : level === 'Medium'
                          ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, transparent 100%)'
                          : 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, transparent 100%)'
                      }}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium mb-2 text-white">{q.title}</h3>
                        <FaExternalLinkAlt className="text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                      
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          level === 'Easy'
                            ? 'bg-green-700/30 text-green-200'
                            : level === 'Medium'
                            ? 'bg-yellow-600/30 text-yellow-100'
                            : 'bg-red-700/30 text-red-200'
                        }`}
                      >
                        {level}
                      </span>
                      
                      <div className="mt-4 text-sm text-gray-300 group-hover:text-white transition-colors">
                        Click to solve on LeetCode
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coding;