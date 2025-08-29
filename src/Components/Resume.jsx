import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    summary: '',
  });
  
  const [skills, setSkills] = useState([]);
  const [customSkills, setCustomSkills] = useState([]);
  const [education, setEducation] = useState([{ id: 0, degree: '', institution: '', start: '', end: '', location: '', desc: '' }]);
  const [experience, setExperience] = useState([{ id: 0, title: '', company: '', start: '', end: '', location: '', desc: '' }]);
  const [particles, setParticles] = useState([]);
  
  const resumePreviewRef = useRef(null);
  const skillInputRef = useRef(null);
  
  const predefinedSkills = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];
  
  // Initialize floating particles
  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);
  
  // Calculate completion percentage
  const calculateProgress = () => {
    let filled = 0;
    let total = 4; // name, email, phone, summary
    
    // Basic fields
    if (formData.name.trim()) filled++;
    if (formData.email.trim()) filled++;
    if (formData.phone.trim()) filled++;
    if (formData.summary.trim()) filled++;
    
    // Education
    education.forEach(edu => {
      total += 5;
      if (edu.degree.trim()) filled++;
      if (edu.institution.trim()) filled++;
      if (edu.start.trim()) filled++;
      if (edu.end.trim()) filled++;
      if (edu.desc.trim()) filled++;
    });
    
    // Experience
    experience.forEach(exp => {
      total += 5;
      if (exp.title.trim()) filled++;
      if (exp.company.trim()) filled++;
      if (exp.start.trim()) filled++;
      if (exp.end.trim()) filled++;
      if (exp.desc.trim()) filled++;
    });
    
    // Skills
    total += 5;
    filled += Math.min(5, [...skills, ...customSkills].length);
    
    return total ? Math.round((filled / total) * 100) : 0;
  };
  
  const progress = calculateProgress();
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  // Handle skill checkbox changes
  const handleSkillChange = (skill) => {
    setSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };
  
  // Add custom skill
  const handleAddCustomSkill = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const skill = e.target.value.trim();
      if (skill && !customSkills.includes(skill)) {
        setCustomSkills(prev => [...prev, skill]);
        e.target.value = '';
      }
    }
  };
  
  // Remove custom skill
  const removeCustomSkill = (skill) => {
    setCustomSkills(prev => prev.filter(s => s !== skill));
  };
  
  // Handle education changes
  const handleEducationChange = (index, field, value) => {
    setEducation(prev => 
      prev.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    );
  };
  
  // Add education entry
  const addEducation = () => {
    setEducation(prev => [...prev, { 
      id: Date.now(), 
      degree: '', 
      institution: '', 
      start: '', 
      end: '', 
      location: '', 
      desc: '' 
    }]);
  };
  
  // Remove education entry
  const removeEducation = (index) => {
    if (education.length > 1) {
      setEducation(prev => prev.filter((_, i) => i !== index));
    }
  };
  
  // Handle experience changes
  const handleExperienceChange = (index, field, value) => {
    setExperience(prev => 
      prev.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    );
  };
  
  // Add experience entry
  const addExperience = () => {
    setExperience(prev => [...prev, { 
      id: Date.now(), 
      title: '', 
      company: '', 
      start: '', 
      end: '', 
      location: '', 
      desc: '' 
    }]);
  };
  
  // Remove experience entry
  const removeExperience = (index) => {
    if (experience.length > 1) {
      setExperience(prev => prev.filter((_, i) => i !== index));
    }
  };
  
  // Download PDF
  const downloadPDF = () => {
    // Get the resume preview element
    const element = resumePreviewRef.current;
    
    // Options for the PDF
    const opt = {
      margin: 10,
      filename: `${formData.name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff',
        logging: true,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate and download PDF
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .catch(err => {
        console.error('Error generating PDF:', err);
        alert('Error generating PDF. Please try again.');
      });
  };
  
  // Print resume
  const printResume = () => {
    window.print();
  };
  
  // Clear form
  const clearForm = () => {
    if (window.confirm('Clear the form and reset preview?')) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        summary: '',
      });
      setSkills([]);
      setCustomSkills([]);
      setEducation([{ id: 0, degree: '', institution: '', start: '', end: '', location: '', desc: '' }]);
      setExperience([{ id: 0, title: '', company: '', start: '', end: '', location: '', desc: '' }]);
    }
  };
  
  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 animate-gradient-shift"></div>
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/30 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transition: 'all 0.05s linear',
            }}
          />
        ))}
      </div>

      {/* Glassmorphism overlay for better readability */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-[0.5px]"></div>
      
      <div className="relative z-10 text-gray-100">
        {/* Progress Bar */}
        <div className="sticky top-0 z-40 bg-black/30 backdrop-blur-lg border-b border-white/10">
          <div className="flex justify-between text-xs px-3 py-1.5 text-slate-300">
            <span>Form Completion</span>
            <span>{progress}%</span>
          </div>
          <div 
            className="h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-700 ease-out shadow-lg shadow-cyan-400/20"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="container mx-auto p-5 flex flex-col lg:flex-row gap-6 max-w-7xl">
          {/* Form Panel */}
          <div className="flex-1 min-w-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:bg-black/50 hover:border-white/20 hover:shadow-cyan-500/10 hover:shadow-2xl transition-all duration-500 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
            
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Resume Builder — Live Preview
            </h1>
            
            <form className="space-y-8">
              {/* Basic Info */}
              <div>
                <h2 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-3"></span>
                  Basic Info
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-slate-300 mb-2">Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-4 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm text-slate-300 mb-2">Email</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-4 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm text-slate-300 mb-2">Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-4 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="summary" className="block text-sm text-slate-300 mb-2">Profile Summary</label>
                    <textarea
                      id="summary"
                      placeholder="A concise introduction highlighting your strengths and goals..."
                      value={formData.summary}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-4 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30 resize-none"
                    />
                  </div>
                </div>
              </div>
              
              {/* Skills */}
              <div>
                <h2 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-3"></span>
                  Skills
                </h2>
                <div className="text-sm text-slate-300 mb-4">Select a few or type custom skills (press Enter):</div>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  {predefinedSkills.map(skill => (
                    <label key={skill} className="cursor-pointer group">
                      <div className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        skills.includes(skill) 
                          ? 'border-cyan-400/50 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 text-cyan-300 shadow-lg shadow-cyan-400/20' 
                          : 'border-white/20 bg-black/30 text-gray-300 hover:border-white/40 hover:bg-black/50'
                      }`}>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={skills.includes(skill)}
                          onChange={() => handleSkillChange(skill)}
                        />
                        {skill}
                      </div>
                    </label>
                  ))}
                </div>
                
                <input
                  ref={skillInputRef}
                  type="text"
                  placeholder="Type a skill and press Enter"
                  onKeyDown={handleAddCustomSkill}
                  className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-4 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30 mb-4"
                />
                
                <div className="flex flex-wrap gap-3">
                  {customSkills.map(skill => (
                    <div key={skill} className="px-4 py-2 rounded-xl border border-purple-400/50 bg-gradient-to-r from-purple-400/20 to-pink-400/20 text-purple-300 text-sm font-medium flex items-center shadow-lg shadow-purple-400/20 hover:scale-105 transition-all duration-300">
                      {skill}
                      <button
                        onClick={() => removeCustomSkill(skill)}
                        className="ml-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-red-500/30 transition-all duration-200 text-red-400 hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Education */}
              <div>
                <h2 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-3"></span>
                  Education
                </h2>
                
                {education.map((edu, index) => (
                  <div key={edu.id} className="border border-dashed border-white/20 rounded-2xl p-6 mb-6 bg-black/20 hover:bg-black/30 hover:border-white/30 transition-all duration-500 group">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Degree</label>
                        <input
                          type="text"
                          placeholder="B.Tech in Computer Engineering"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                          className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-3 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Institution</label>
                        <input
                          type="text"
                          placeholder="Your College/University"
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                          className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-3 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Start Year</label>
                        <input
                          type="text"
                          placeholder="2021"
                          value={edu.start}
                          onChange={(e) => handleEducationChange(index, 'start', e.target.value)}
                          className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-3 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">End Year</label>
                        <input
                          type="text"
                          placeholder="2025"
                          value={edu.end}
                          onChange={(e) => handleEducationChange(index, 'end', e.target.value)}
                          className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-3 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Location</label>
                        <input
                          type="text"
                          placeholder="City, Country"
                          value={edu.location}
                          onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                          className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-3 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm text-slate-300 mb-2">Description</label>
                      <textarea
                        placeholder="Key coursework, GPA, achievements..."
                        value={edu.desc}
                        onChange={(e) => handleEducationChange(index, 'desc', e.target.value)}
                        rows={3}
                        className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-3 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30 resize-none"
                      />
                    </div>
                    
                    {education.length > 1 && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeEducation(index)}
                          className="px-4 py-2 border border-red-400/40 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:border-red-400/60 hover:scale-105 transition-all duration-300 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
                >
                  + Add Education
                </button>
              </div>
              
              {/* Experience */}
              <div>
                <h2 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-3"></span>
                  Experience
                </h2>
                
                {experience.map((exp, index) => (
                  <div key={exp.id} className="border border-dashed border-white/20 rounded-2xl p-6 mb-6 bg-black/20 hover:bg-black/30 hover:border-white/30 transition-all duration-500 group">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Job Title</label>
                        <input
                          type="text"
                          placeholder="Software Engineer"
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                          className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-3 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Company</label>
                        <input
                          type="text"
                          placeholder="Company Pvt Ltd"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                          className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-3 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Start</label>
                        <input
                          type="text"
                          placeholder="Jan 2024"
                          value={exp.start}
                          onChange={(e) => handleExperienceChange(index, 'start', e.target.value)}
                          className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-3 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">End</label>
                        <input
                          type="text"
                          placeholder="Present"
                          value={exp.end}
                          onChange={(e) => handleExperienceChange(index, 'end', e.target.value)}
                          className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-3 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-300 mb-2">Location</label>
                        <input
                          type="text"
                          placeholder="Remote / City"
                          value={exp.location}
                          onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                          className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-3 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm text-slate-300 mb-2">Description</label>
                      <textarea
                        placeholder="Impact, tech stack, achievements..."
                        value={exp.desc}
                        onChange={(e) => handleExperienceChange(index, 'desc', e.target.value)}
                        rows={3}
                        className="w-full bg-black/30 text-gray-100 border border-white/20 rounded-xl p-3 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 focus:bg-black/50 outline-none transition-all duration-300 placeholder-slate-400 hover:border-white/30 resize-none"
                      />
                    </div>
                    
                    {experience.length > 1 && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeExperience(index)}
                          className="px-4 py-2 border border-red-400/40 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:border-red-400/60 hover:scale-105 transition-all duration-300 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addExperience}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-400 hover:to-pink-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-400/30 transition-all duration-300"
                >
                  + Add Experience
                </button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6">
                <button
                  type="button"
                  onClick={downloadPDF}
                  className="px-6 py-3 border border-white/30 rounded-xl bg-black/40 text-gray-200 hover:bg-black/60 hover:border-white/50 hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium backdrop-blur-sm"
                >
                  📄 Download PDF
                </button>
                <button
                  type="button"
                  onClick={printResume}
                  className="px-6 py-3 border border-white/30 rounded-xl bg-black/40 text-gray-200 hover:bg-black/60 hover:border-white/50 hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium backdrop-blur-sm"
                >
                  🖨️ Print
                </button>
                <button
                  type="button"
                  onClick={clearForm}
                  className="px-6 py-3 border border-red-400/40 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:border-red-400/60 hover:scale-105 transition-all duration-300 font-medium"
                >
                  🗑️ Clear Form
                </button>
              </div>
            </form>
          </div>
          
          {/* Preview Panel */}
          <div className="flex-1 min-w-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl hover:bg-black/50 hover:border-white/20 hover:shadow-purple-500/10 hover:shadow-2xl transition-all duration-500 group print:border-0 print:shadow-none">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
            
            <div 
              ref={resumePreviewRef}
              className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 min-h-[500px] hover:bg-black/40 hover:border-white/20 transition-all duration-500 print:border-0 print:bg-white print:text-black"
            >
              <div className="border-b border-white/20 pb-4 mb-6 print:border-gray-300">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent print:text-black print:bg-none">
                  {formData.name || 'Your Name'}
                </div>
                <div className="text-sm text-slate-300 mt-2 print:text-gray-600">
                  {formData.email || 'you@example.com'} • {formData.phone || '+91 00000 00000'}
                </div>
              </div>
              
              {/* Profile Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center print:text-black">
                  <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-3 print:bg-gray-400"></span>
                  Profile
                </h3>
                <div className="text-sm text-gray-200 leading-relaxed print:text-black">
                  {formData.summary || 'Write a short summary to introduce yourself.'}
                </div>
              </div>
              
              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center print:text-black">
                  <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-3 print:bg-gray-400"></span>
                  Skills
                </h3>
                <div className="text-sm text-gray-200 leading-relaxed print:text-black">
                  {[...skills, ...customSkills].length > 0 
                    ? [...skills, ...customSkills].join(' • ') 
                    : 'HTML • CSS • JavaScript'
                  }
                </div>
              </div>
              
              {/* Education */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center print:text-black">
                  <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-3 print:bg-gray-400"></span>
                  Education
                </h3>
                {education.map((edu, index) => (
                  (edu.degree || edu.institution || edu.start || edu.end || edu.desc) ? (
                    <div key={index} className="mb-4 p-4 border border-white/10 rounded-xl hover:bg-cyan-400/5 hover:border-cyan-400/30 transition-all duration-300 print:border-gray-300 print:hover:bg-transparent">
                      <div className="font-semibold text-gray-100 print:text-black">
                        {edu.degree || 'Degree'}
                      </div>
                      <div className="text-sm text-slate-300 mt-1 print:text-gray-600">
                        {edu.institution || 'Institution'} • {edu.start || 'Start'} – {edu.end || 'End'}
                        {edu.location && ` • ${edu.location}`}
                      </div>
                      {edu.desc && (
                        <div className="text-sm mt-2 text-gray-200 print:text-black">
                          {edu.desc}
                        </div>
                      )}
                    </div>
                  ) : null
                ))}
                {education.every(edu => !edu.degree && !edu.institution && !edu.start && !edu.end && !edu.desc) && (
                  <div className="text-sm text-slate-400 print:text-gray-500">
                    Add your education details using the form.
                  </div>
                )}
              </div>
              
              {/* Experience */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center print:text-black">
                  <span className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-3 print:bg-gray-400"></span>
                  Experience
                </h3>
                {experience.map((exp, index) => (
                  (exp.title || exp.company || exp.start || exp.end || exp.desc) ? (
                    <div key={index} className="mb-4 p-4 border border-white/10 rounded-xl hover:bg-purple-400/5 hover:border-purple-400/30 transition-all duration-300 print:border-gray-300 print:hover:bg-transparent">
                      <div className="font-semibold text-gray-100 print:text-black">
                        {exp.title || 'Job Title'}
                      </div>
                      <div className="text-sm text-slate-300 mt-1 print:text-gray-600">
                        {exp.company || 'Company'} • {exp.start || 'Start'} – {exp.end || 'End'}
                        {exp.location && ` • ${exp.location}`}
                      </div>
                      {exp.desc && (
                        <div className="text-sm mt-2 text-gray-200 print:text-black">
                          {exp.desc}
                        </div>
                      )}
                    </div>
                  ) : null
                ))}
                {experience.every(exp => !exp.title && !exp.company && !exp.start && !exp.end && !exp.desc) && (
                  <div className="text-sm text-slate-400 print:text-gray-500">
                    Add your work experience details using the form.
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 text-center text-xs text-slate-400 print:hidden">
              This preview updates in real-time as you fill out the form.
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="text-center py-6 text-slate-400 text-sm print:hidden">
          <p>Built with React • Real-time Preview • PDF Export</p>
        </footer>
      </div>
    </div>
  );
};

export default ResumeBuilder;

