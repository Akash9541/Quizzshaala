import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Motivation = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Quotes Array
  const quotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Dream big. Work hard. Stay focused. Never give up.",
    "Don't watch the clock; do what it does. Keep going.",
    "Great things never come from comfort zones.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Sometimes later becomes never. Do it now.",
    "Great things never come from comfort zones.",
    "Dream it. Believe it. Build it."
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000); // change quote every 5 seconds
    return () => clearInterval(interval);
  }, [quotes.length]);

  // Mouse tracking for background effect
  useEffect(() => {
    const throttleDelay = 100;
    let throttleTimeout = null;

    const handleMouseMove = (e) => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          throttleTimeout = null;
        }, throttleDelay);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, []);

  // Particle Background Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 255}, ${Math.random() * 0.3 + 0.4})`;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });
  }, []);

  // BackgroundEffect component matching the Front page
  const BackgroundEffect = () => (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-900/5 via-transparent to-cyan-900/5" />
      </div>
      
      <div
        className="fixed w-96 h-96 pointer-events-none z-0 transition-all duration-700 ease-out opacity-20"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/10 rounded-full animated-element"
            style={{
              left: `${15 + (i * 30)}%`,
              top: `${25 + (i * 15)}%`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`
            }}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundEffect />
      
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-60" />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 flex items-center space-x-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm text-slate-200 hover:text-white border border-slate-700/50 hover:border-slate-600/50 rounded-lg transition-all duration-300 group"
      >
        <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back</span>
      </button>

     {/* Rotating Quotes */}
<div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
  <div className="mb-6">
    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      <span className="text-sm font-medium text-blue-200">Daily Motivation</span>
    </div>
  </div>
  
  <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
    "{quotes[index]}"
  </h1>
  
  <p className="text-xl text-slate-300 mb-8 text-center">
    Keep pushing forward. Every step, no matter how small, brings you closer to your dreams.
  </p>
  
  <div className="flex justify-center">
    <button 
      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
      onClick={() => navigate('/dashboard')}
    >
      <span>Continue Learning</span>
    </button>
  </div>
  
  <div className="mt-8 text-slate-400 text-sm">
    <p>Quote {index + 1} of {quotes.length}</p>
  </div>
</div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
        }
        .animated-element {
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
};

export default Motivation;
