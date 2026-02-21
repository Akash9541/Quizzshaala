import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaTwitter, FaArrowRight, FaArrowLeft, FaRocket, FaBrain, FaCode, FaCalculator, FaComments, FaTrophy, FaBars, FaTimes, FaPlay, FaUsers, FaChartLine, FaStar, FaAward, FaGraduationCap, FaLaptopCode, FaClipboardCheck, FaBookOpen, FaFileAlt, FaUserCircle } from 'react-icons/fa';
import { api } from '../services/api';

const Front = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const scrollRef = useRef(null);
  const throttleTimeout = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
        if (!token) return;
        await api.get('/history', token);
      } catch (err) {
        console.error(err);
      }
    };

    const handleHistoryUpdate = () => fetchHistory();
    window.addEventListener("historyShouldUpdate", handleHistoryUpdate);

    fetchHistory();

    return () => {
      window.removeEventListener("historyShouldUpdate", handleHistoryUpdate);
    };
  }, []);


  const topics = [
    {
      label: "Logical Reasoning",
      path: "/logical",
      icon: <FaBrain />,
      gradient: "from-indigo-600 to-purple-700",
      description: "Enhance critical thinking and problem-solving skills",
      problems: "150+ Questions"
    },
    {
      label: "Coding & Problem-Solving",
      path: "/coding",
      icon: <FaCode />,
      gradient: "from-emerald-600 to-teal-700",
      description: "Master DSA and programming fundamentals",
      problems: "300+ Problems"
    },
    {
      label: "Quantitative Aptitude",
      path: "/aptitude",
      icon: <FaCalculator />,
      gradient: "from-orange-600 to-red-700",
      description: "Excel in mathematical and analytical reasoning",
      problems: "200+ Questions"
    },
    {
      label: "CS Fundamentals",
      path: "/csfundamentals",
      icon: <FaRocket />,
      gradient: "from-cyan-600 to-blue-700",
      description: "Build strong computer science foundations",
      problems: "180+ Topics"
    },
    {
      label: "Verbal & Communication",
      path: "/verbal",
      icon: <FaComments />,
      gradient: "from-amber-600 to-orange-700",
      description: "Improve communication and language skills",
      problems: "120+ Exercises"
    },
    {
      label: "Mock Tests & Assessments",
      path: "/mock",
      icon: <FaTrophy />,
      gradient: "from-violet-600 to-purple-700",
      description: "Practice with real company questions",
      problems: "50+ Tests"
    }
  ];

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Services', href: '#services' },
    { name: 'Placement Records', href: '#placement' },
    { name: 'Contact', href: '#contact' }
  ];


  const features = [
    {
      icon: <FaLaptopCode className="text-4xl text-blue-400" />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths powered by advanced AI algorithms",
      color: "from-blue-500/10 to-cyan-500/10"
    },
    {
      icon: <FaChartLine className="text-4xl text-green-400" />,
      title: "Real-time Analytics",
      description: "Track your progress with detailed performance insights",
      color: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: <FaGraduationCap className="text-4xl text-purple-400" />,
      title: "Expert Mentorship",
      description: "Get guidance from industry professionals and top performers",
      color: "from-purple-500/10 to-violet-500/10"
    },
    {
      icon: <FaClipboardCheck className="text-4xl text-orange-400" />,
      title: "Mock Interviews",
      description: "Practice with realistic interview simulations and feedback",
      color: "from-orange-500/10 to-amber-500/10"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      content: "Quizshaala transformed my preparation strategy. The AI-powered recommendations were spot on!",
      avatar: "👩‍💻",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      role: "Data Scientist at Microsoft",
      content: "The mock interviews and real-time feedback helped me crack multiple top-tier companies.",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      name: "Ananya Patel",
      role: "Product Manager at Amazon",
      content: "Outstanding platform with comprehensive coverage of all placement topics. Highly recommended!",
      avatar: "👩‍🎓",
      rating: 5
    }
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Handle topic navigation
  const handleTopicClick = (path) => {
    navigate(path);
  };

  // Scroll to section function
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission - UPDATED VERSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.post('/contact', formData);
      alert(data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to send email');
    }
  };

  // Enhanced scroll and mouse tracking with throttling
  useEffect(() => {
    const throttleDelay = 100; // ms

    const handleMouseMove = (e) => {
      if (!throttleTimeout.current) {
        throttleTimeout.current = setTimeout(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          throttleTimeout.current = null;
        }, throttleDelay);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const elements = document.querySelectorAll("[data-animate]");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisibleNow = rect.top < window.innerHeight * 0.8;
        const id = el.getAttribute("data-animate");
        if (isVisibleNow) {
          setIsVisible((prev) => ({ ...prev, [id]: true }));
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, []);

  // Optimized BackgroundEffect component with React.memo
  const BackgroundEffect = React.memo(() => (
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
  ));

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundEffect />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInLeft {      
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .animated-element {
          will-change: transform, opacity;
        }
        .animate-on-scroll {
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in-up {
          transform: translateY(30px);
        }
        .fade-in-left {
          transform: translateX(-30px);
        }
        .fade-in-right {
          transform: translateX(30px);
        }
        .is-visible {
          opacity: 1;
          transform: translate(0, 0);
        }
      `}</style>

      <div className="relative z-10 text-white">

        {/* Professional Header */}
        <header className={`fixed top-0 w-full transition-all duration-500 z-50 ${scrolled
            ? 'backdrop-blur-xl bg-slate-900/90 border-b border-slate-700/50 shadow-2xl'
            : 'backdrop-blur-md bg-slate-900/20 border-b border-slate-700/20'
          }`}>
          <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto">

            <div className="group cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  Q
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Quizshaala
                </span>
              </div>
            </div>

            <nav className="hidden lg:block">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="relative px-4 py-2 text-slate-200 hover:text-white transition-colors duration-300 group font-medium"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Profile Icon Button */}
              <button
                className="p-2 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 rounded-full transition-all duration-300 group"
                onClick={() => navigate('/dashboard')}
                aria-label="Go to Dashboard"
              >
                <FaUserCircle className="w-6 h-6 text-slate-200 group-hover:text-white transition-colors duration-300" />
              </button>

              <button
                className="lg:hidden p-2 hover:bg-slate-800/50 rounded-lg transition-colors duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <div className="w-6 h-6 relative">
                  <FaBars className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100'}`} />
                  <FaTimes className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 -rotate-180'}`} />
                </div>
              </button>
            </div>
          </div>

          <div className={`lg:hidden backdrop-blur-xl bg-slate-900/95 border-t border-slate-700/50 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}>
            <nav className="px-6 py-4">
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center justify-between w-full px-4 py-3 text-slate-200 hover:text-white hover:bg-slate-800/30 rounded-lg transition-all duration-300"
                    >
                      <span>{item.name}</span>
                      <FaArrowRight className="w-4 h-4 opacity-50" />
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      navigate('/dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 text-slate-200 hover:text-white hover:bg-slate-800/30 rounded-lg transition-all duration-300"
                  >
                    <span>Dashboard</span>
                    <FaArrowRight className="w-4 h-4 opacity-50" />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Enhanced Hero Section */}
        <section
          id="home"
          className="flex flex-col items-center justify-center text-center px-4 py-20 min-h-screen"
        >
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-200">
                Now Live - AI-Powered Learning Experience
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent block mb-4">
                Master Your Career
              </span>
              <span className="text-white text-4xl md:text-5xl lg:text-6xl block">
                with Smart Learning
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your placement preparation with AI-powered quizzes,
              personalized learning paths, and real-time performance analytics
              designed for success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105"
                onClick={() =>
                  document
                    .getElementById("topics")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <FaRocket className="w-5 h-5" />
                <span>Start Learning</span>
              </button>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section id="features" className="px-4 py-20 relative" data-animate="features">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-purple-900/5 backdrop-blur-3xl" />
          <div className="relative max-w-7xl mx-auto">

            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Why Choose Quizshaala?
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Experience the future of learning with our cutting-edge features
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group relative bg-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 animate-on-scroll fade-in-up ${isVisible.features ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Topics Section */}
        <section
          id="topics"
          data-animate="topics"
          className={`relative bg-[#0f172a] py-24 overflow-hidden ${isVisible.topics ? "is-visible" : ""
            }`} >

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Explore Learning Paths
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Comprehensive preparation across all domains essential for placement success
              </p>
            </div>

            <div className="flex justify-between items-center mb-8">
              <button
                onClick={() => scroll('left')}
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 rounded-lg transition-all duration-300 group"
              >
                <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 rounded-lg transition-all duration-300 group"
              >
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide"
              aria-label="Learning topics carousel"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') scroll('left');
                if (e.key === 'ArrowRight') scroll('right');
              }}
            >
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className={`group min-w-[320px] cursor-pointer animate-on-scroll fade-in-left ${isVisible.topics ? "is-visible" : ""
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => handleTopicClick(topic.path)}
                >

                  <div className={`relative bg-gradient-to-br ${topic.gradient} p-8 rounded-2xl transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl border border-white/10 ${isVisible.topics ? 'is-visible' : ''}`}>

                    <div className="absolute inset-0 bg-black/20 rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                    <div className="relative z-10">
                      <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        {topic.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                        {topic.label}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-4">
                        {topic.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm font-medium">{topic.problems}</span>
                        <div className="flex items-center text-white/60 group-hover:text-white/80 transition-colors duration-300">
                          <span className="text-sm font-medium">Explore</span>
                          <FaArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-4 py-20 relative" data-animate="testimonials">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-blue-900/5 backdrop-blur-3xl" />
          <div className="relative max-w-6xl mx-auto">

            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Success Stories
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Hear from students who achieved their dream placements
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`group relative bg-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 animate-on-scroll fade-in-up ${isVisible.testimonials ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3">{testimonial.avatar}</div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-slate-400">{testimonial.role}</p>
                      </div>
                    </div>

                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                    </div>

                    <p className="text-slate-300 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-4 py-20 relative" data-animate="about">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-purple-900/5 backdrop-blur-3xl" />
          <div className="relative max-w-6xl mx-auto">

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`animate-on-scroll fade-in-left ${isVisible.about ? 'is-visible' : ''}`}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  About Quizshaala
                </h2>
                <p className="text-xl text-slate-300 leading-relaxed mb-8">
                  We're revolutionizing placement preparation with AI-powered learning experiences.
                  Our platform combines cutting-edge technology with expertly curated content to
                  help students excel in their career journey.
                </p>

                <div className="space-y-4">
                  {[
                    'AI-powered personalized learning paths',
                    'Real-time performance analytics and insights',
                    'Company-specific question banks and patterns',
                    'Expert-curated content library with regular updates',
                    'Interactive coding environment and compiler',
                    'Mock interview simulations with AI feedback'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="text-slate-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 animate-on-scroll fade-in-right ${isVisible.about ? 'is-visible' : ''}`}>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: '15K+', label: 'Questions', icon: '📚' },
                    { number: '100+', label: 'Companies', icon: '🏢' },
                    { number: '98%', label: 'Success Rate', icon: '🎯' },
                    { number: '24/7', label: 'Support', icon: '💬' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-slate-800/40 rounded-lg hover:bg-slate-800/60 transition-colors duration-300">
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="px-4 py-20" data-animate="services">
          <div className="max-w-6xl mx-auto text-center">

            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-slate-300 mb-16 max-w-2xl mx-auto">
              Everything you need to excel in your placement journey
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[
                {
                  name: "Motivation",
                  icon: "💡",
                  description: "Daily quotes and success stories to keep you inspired.",
                  path: "/Motivation"
                },
                {
                  name: "Performance Analytics",
                  icon: "📊",
                  description: "Detailed progress tracking with actionable insights",
                  path: "/Dashboard"
                },
                {
                  name: "Company Prep",
                  icon: "🏢",
                  description: "Company-specific preparation with latest patterns",
                  path: "/Company"
                },
                {
                  name: "Resume Building",
                  icon: "📄",
                  description: "Create a simple and professional resume.",
                  path: "/Resume"
                },
              ].map((service, index) => (
                <div
                  key={index}
                  onClick={() => navigate(service.path)}
                  className={`group relative bg-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 cursor-pointer animate-on-scroll fade-in-up ${isVisible.services ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{service.name}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{service.description}</p>

                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Placement Records Section */}
        <section id="placement" className="px-4 py-20 relative" data-animate="placement">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Placement Records 🏆
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Celebrating our students' success stories and achievements
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  year: "2023",
                  placements: "1200+",
                  companies: "50+",
                  highestPackage: "₹42 LPA",
                  description: "Exceptional year with record-breaking placements"
                },
                {
                  year: "2022",
                  placements: "950+",
                  companies: "45+",
                  highestPackage: "₹38 LPA",
                  description: "Consistent growth in placements and packages"
                },
                {
                  year: "2021",
                  placements: "800+",
                  companies: "40+",
                  highestPackage: "₹35 LPA",
                  description: "Strong recovery and placement performance"
                }
              ].map((record, index) => (
                <div
                  key={index}
                  className={`group relative bg-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 cursor-pointer animate-on-scroll fade-in-up ${isVisible.placement ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => navigate('/Placement')}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">{record.year}</h3>
                    <div className="space-y-3">
                      <p className="text-2xl text-blue-400 font-semibold">{record.placements} Placements</p>
                      <p className="text-lg text-slate-300">{record.companies} Companies</p>
                      <p className="text-lg text-green-400">Highest: {record.highestPackage}</p>
                      <p className="text-sm text-slate-400 italic">{record.description}</p>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/Placements')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Explore All Placement Records
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-4 py-20" data-animate="contact">
          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-xl text-slate-300">Ready to start your learning journey?</p>
            </div>

            <div className={`bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 animate-on-scroll fade-in-up ${isVisible.contact ? 'is-visible' : ''}`}>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm text-white border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors rounded-lg placeholder-slate-400"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm text-white border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors rounded-lg placeholder-slate-400"
                    required
                  />
                </div>
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm text-white border border-slate-700 focus:border-blue-500 focus:outline-none transition-colors rounded-lg placeholder-slate-400 resize-none"
                  required
                />
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900/50 backdrop-blur-sm py-16 border-t border-slate-700/50">
          <div className="max-w-6xl mx-auto px-4">

            <div className="grid md:grid-cols-4 gap-8 text-center md:text-left mb-8">

              <div className={`animate-on-scroll fade-in-left ${isVisible.contact ? 'is-visible' : ''}`}>
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold">
                    Q
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Quizshaala
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Empowering students with AI-powered learning experiences for career success.
                </p>
              </div>

              <div className={`animate-on-scroll fade-in-up ${isVisible.contact ? 'is-visible' : ''}`}>
                <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2 text-slate-300">
                  {navItems.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="hover:text-blue-400 transition-colors duration-300"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`animate-on-scroll fade-in-up ${isVisible.contact ? 'is-visible' : ''}`}>
                <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
                <ul className="space-y-2 text-slate-300">
                  {['Documentation', 'Tutorials', 'Community', 'Support'].map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`animate-on-scroll fade-in-right ${isVisible.contact ? 'is-visible' : ''}`}>
                <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
                <div className="flex justify-center md:justify-start space-x-4 text-2xl">
                  <a href="https://www.linkedin.com/in/akash-thakur-6354b9347"
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110">
                    <FaLinkedin />
                  </a>
                  <a href="https://github.com/Akash9541"
                    className="text-slate-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
                    <FaGithub />
                  </a>
                  <a href="https://x.com/AkashThaku86906"
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110">
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-slate-700/50">
              <p className="text-slate-400">
                © {new Date().getFullYear()} Quizshaala. Built with passion for student success.
              </p>
            </div>
          </div>
        </footer>

        {/* Floating Action Button */}
        <button
          className="fixed bottom-8 right-8 group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl z-50 transition-all duration-300 transform hover:scale-110"
          onClick={() => navigate('/dashboard')}
        >
          <FaRocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
        </button>
      </div>
    </div>
  );
};

export default Front;
