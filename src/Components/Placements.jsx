import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaLinkedin, FaGithub, FaTwitter, FaTrophy, FaAward, FaUniversity, FaMapMarkerAlt, FaCalendarAlt, FaChartBar, FaChartLine, FaChartPie, FaUserGraduate, FaMoneyBillWave, FaBuilding } from 'react-icons/fa';

const Placements = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [stats, setStats] = useState({
    totalPlacements: 1247,
    averagePackage: '28.5 LPA',
    highestPackage: '62 LPA',
    successRate: '92%'
  });

  // Academic year placement data
  const academicYearData = [
    { year: '2017-18', enrolled: 617, placed: 405, percentage: '66.00%' },
    { year: '2018-19', enrolled: 631, placed: 523, percentage: '82.88%' },
    { year: '2019-20', enrolled: 659, placed: 555, percentage: '84.21%' },
    { year: '2020-21', enrolled: 720, placed: 661, percentage: '91.80%' },
    { year: '2021-22', enrolled: 730, placed: 671, percentage: '91.91%' },
    { year: '2022-23', enrolled: 755, placed: 707, percentage: '93.64%' },
    { year: '2023-24', enrolled: 760, placed: 708, percentage: '93.15%' },
    { year: '2024-25', enrolled: 775, placed: 564, percentage: 'In Progress' }
  ];

  // Sample placement data
  const placementsData = {
    yearly: {
      '2023': 1247,
      '2022': 986,
      '2021': 845,
      '2020': 723,
      '2019': 654
    },
    byCompany: [
      { name: 'Google', count: 142, average: '42 LPA' },
      { name: 'Microsoft', count: 128, average: '38 LPA' },
      { name: 'Amazon', count: 235, average: '35 LPA' },
      { name: 'Adobe', count: 87, average: '32 LPA' },
      { name: 'Goldman Sachs', count: 76, average: '40 LPA' },
      { name: 'Meta', count: 63, average: '45 LPA' },
      { name: 'Apple', count: 58, average: '44 LPA' }
    ],
    byPackage: [
      { range: '60+ LPA', count: 18 },
      { range: '40-60 LPA', count: 127 },
      { range: '30-40 LPA', count: 345 },
      { range: '20-30 LPA', count: 458 },
      { range: '10-20 LPA', count: 299 }
    ]
  };

  // Sample student success stories
  const successStories = [
    {
      id: 1,
      name: "Priya Sharma",
      company: "Google",
      role: "Software Engineer",
      image: "/images/placements/priya-google.jpg",
      year: 2023,
      package: "₹42 LPA",
      college: "IIT Delhi",
      testimonial: "Quizshaala's mock tests were instrumental in my preparation. The platform helped me identify my weak areas and improve systematically."
    },
    {
      id: 2,
      name: "Rahul Kumar",
      company: "Microsoft",
      role: "Data Scientist",
      image: "/images/placements/rahul-microsoft.jpg",
      year: 2023,
      package: "₹38 LPA",
      college: "BITS Pilani",
      testimonial: "The AI-powered learning paths helped me focus on exactly what I needed to crack the technical interviews."
    },
    {
      id: 3,
      name: "Ananya Patel",
      company: "Amazon",
      role: "Product Manager",
      image: "/images/placements/ananya-amazon.jpg",
      year: 2022,
      package: "₹35 LPA",
      college: "NIT Trichy",
      testimonial: "The resume building tool and mock interviews gave me the confidence to excel in my actual interviews."
    }
  ];

  // Function to render bar chart
  const renderBarChart = (data, maxValue, color) => {
    return (
      <div className="space-y-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-1/4 text-sm text-slate-300">{item.name || item.range}</div>
            <div className="w-3/4 flex items-center">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-6 rounded-md transition-all duration-500 ease-out"
                style={{ width: `${(item.count / maxValue) * 100}%` }}
              ></div>
              <span className="ml-2 text-sm text-slate-300">{item.count}</span>
              {item.average && <span className="ml-2 text-xs text-slate-400">({item.average})</span>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10" />
      <div className="fixed inset-0 bg-gradient-to-bl from-indigo-900/5 via-transparent to-cyan-900/5" />
      
      <div className="relative z-10 text-white">
        {/* Header */}
        <header className="fixed top-0 w-full backdrop-blur-xl bg-slate-900/90 border-b border-slate-700/50 shadow-2xl z-50">
          <div className="flex justify-between items-center px-6 lg:px-8 py-4 max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors duration-300"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">
                  Q
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Quizshaala
                </span>
              </div>
            </div>
            
            <h1 className="text-xl font-semibold text-slate-200">Placement Records</h1>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors duration-300">
                <FaCalendarAlt className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-400 text-sm">Total Placements</h3>
                  <p className="text-3xl font-bold text-white">{stats.totalPlacements}</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <FaUserGraduate className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-400 text-sm">Average Package</h3>
                  <p className="text-3xl font-bold text-white">{stats.averagePackage}</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <FaMoneyBillWave className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-400 text-sm">Highest Package</h3>
                  <p className="text-3xl font-bold text-white">{stats.highestPackage}</p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <FaTrophy className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{width: '95%'}}></div>
              </div>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-400 text-sm">Success Rate</h3>
                  <p className="text-3xl font-bold text-white">{stats.successRate}</p>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-lg">
                  <FaAward className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <div className="mt-2 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-700/50 mb-8 overflow-x-auto">
            <button
              className={`px-4 py-3 font-medium transition-colors duration-300 ${
                activeTab === 'overview'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-3 font-medium transition-colors duration-300 ${
                activeTab === 'academic'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('academic')}
            >
              Academic Year
            </button>
            <button
              className={`px-4 py-3 font-medium transition-colors duration-300 ${
                activeTab === 'companies'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('companies')}
            >
              By Company
            </button>
            <button
              className={`px-4 py-3 font-medium transition-colors duration-300 ${
                activeTab === 'packages'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('packages')}
            >
              Package Distribution
            </button>
            <button
              className={`px-4 py-3 font-medium transition-colors duration-300 ${
                activeTab === 'stories'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              onClick={() => setActiveTab('stories')}
            >
              Success Stories
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 mb-8">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Yearly Placement Trends</h2>
                <div className="grid grid-cols-5 gap-4 mt-6">
                  {Object.entries(placementsData.yearly).map(([year, count]) => (
                    <div key={year} className="text-center">
                      <div className="bg-slate-700/50 rounded-lg p-3">
                        <div className="text-lg font-bold text-white">{count}</div>
                        <div className="text-sm text-slate-400">{year}</div>
                      </div>
                      <div className="mt-2 mx-auto bg-blue-500 rounded-t-md" style={{height: `${(count / 1247) * 100}px`, width: '30px'}}></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">Academic Year Placement Records</h2>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/50">
                    <h3 className="text-slate-400 text-sm mb-2">Total Students Enrolled</h3>
                    <p className="text-2xl font-bold text-blue-400">5,647</p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/50">
                    <h3 className="text-slate-400 text-sm mb-2">Total Students Placed</h3>
                    <p className="text-2xl font-bold text-green-400">4,794</p>
                  </div>
                  <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/50">
                    <h3 className="text-slate-400 text-sm mb-2">Overall Placement %</h3>
                    <p className="text-2xl font-bold text-amber-400">84.89%</p>
                  </div>
                </div>

                {/* Academic Year Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="py-3 px-4 text-left text-slate-400 font-medium">Academic Year</th>
                        <th className="py-3 px-4 text-right text-slate-400 font-medium">Students Enrolled</th>
                        <th className="py-3 px-4 text-right text-slate-400 font-medium">Students Placed</th>
                        <th className="py-3 px-4 text-right text-slate-400 font-medium">Placement %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {academicYearData.map((data, index) => (
                        <tr key={index} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                          <td className="py-3 px-4 text-slate-200">{data.year}</td>
                          <td className="py-3 px-4 text-right text-slate-300">{data.enrolled}</td>
                          <td className="py-3 px-4 text-right text-slate-300">{data.placed}</td>
                          <td className={`py-3 px-4 text-right font-medium ${
                            data.percentage === 'In Progress' ? 'text-amber-400' : 'text-green-400'
                          }`}>
                            {data.percentage}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  {/* Placement Percentage Chart */}
                  <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Placement Percentage Trend</h3>
                    <div className="h-64 flex items-end justify-between">
                      {academicYearData.slice(0, -1).map((data, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-md w-8 transition-all duration-500"
                            style={{ height: `${parseFloat(data.percentage) * 0.7}px` }}
                          ></div>
                          <span className="text-xs text-slate-400 mt-2">{data.year.split('-')[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Students Placed vs Enrolled Chart */}
                  <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Students Enrolled vs Placed</h3>
                    <div className="h-64 flex items-end justify-between">
                      {academicYearData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className="flex items-end">
                            <div 
                              className="bg-slate-500 w-6 rounded-t-md mr-1 transition-all duration-500"
                              style={{ height: `${(data.enrolled / 775) * 150}px` }}
                            ></div>
                            <div 
                              className="bg-green-500 w-6 rounded-t-md transition-all duration-500"
                              style={{ height: `${(data.placed / 775) * 150}px` }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate-400 mt-2">{data.year.split('-')[0]}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-4 space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-slate-500 rounded mr-2"></div>
                        <span className="text-xs text-slate-400">Enrolled</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                        <span className="text-xs text-slate-400">Placed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'companies' && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Placements by Company</h2>
                {renderBarChart(placementsData.byCompany, 235, 'from-blue-500 to-purple-600')}
              </div>
            )}

            {activeTab === 'packages' && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Package Distribution</h2>
                {renderBarChart(placementsData.byPackage, 458, 'from-green-500 to-teal-600')}
              </div>
            )}

            {activeTab === 'stories' && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">Student Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {successStories.map((student) => (
                    <div key={student.id} className="bg-slate-700/30 rounded-xl overflow-hidden border border-slate-600/50 transition-transform duration-300 hover:scale-105">
                      <div className="h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-3xl">
                          {student.name.charAt(0)}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white">{student.name}</h3>
                        <div className="flex items-center mt-1 text-slate-300">
                          <FaBuilding className="w-4 h-4 mr-2" />
                          <span>{student.company} • {student.role}</span>
                        </div>
                        <div className="flex items-center mt-2 text-slate-300">
                          <FaUniversity className="w-4 h-4 mr-2" />
                          <span>{student.college}</span>
                        </div>
                        <div className="flex items-center mt-2 text-slate-300">
                          <FaMoneyBillWave className="w-4 h-4 mr-2" />
                          <span className="font-semibold text-green-400">{student.package}</span>
                        </div>
                        <p className="mt-3 text-sm text-slate-400 italic">"{student.testimonial}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Additional Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Monthly Placement Trends (2023)</h3>
              <div className="flex items-end justify-between h-40 mt-6">
                {[65, 89, 102, 115, 132, 148, 165, 142, 128, 110, 95, 78].map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-md w-8" style={{height: `${(value / 165) * 100}%`}}></div>
                    <span className="text-xs text-slate-400 mt-2">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Domain-wise Distribution</h3>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { name: 'Software Development', value: 42, color: 'bg-blue-500' },
                  { name: 'Data Science', value: 23, color: 'bg-purple-500' },
                  { name: 'Product Management', value: 15, color: 'bg-green-500' },
                  { name: 'UX/UI Design', value: 12, color: 'bg-amber-500' },
                  { name: 'Consulting', value: 5, color: 'bg-pink-500' },
                  { name: 'Others', value: 3, color: 'bg-slate-500' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                    <span className="text-sm text-slate-300 flex-1">{item.name}</span>
                    <span className="text-sm text-slate-400">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900/50 backdrop-blur-sm py-8 border-t border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-400">
              © {new Date().getFullYear()} Quizshaala Placement Records. Data updated monthly.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Placements;