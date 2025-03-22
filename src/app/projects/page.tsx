"use client";

import { useState } from "react";
import MainLayout from "@/components/main-layout";
import { ProjectsGrid } from '@/components/ui/projects-grid';
import { projects } from '@/data/projects';
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const [selectedTechFilters, setSelectedTechFilters] = useState<string[]>([]);
  const [selectedDifficultyFilters, setSelectedDifficultyFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('newest');

  const handleTechFilterChange = (value: string) => {
    setSelectedTechFilters(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleDifficultyFilterChange = (value: string) => {
    setSelectedDifficultyFilters(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleClearFilters = () => {
    setSelectedTechFilters([]);
    setSelectedDifficultyFilters([]);
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        {/* Enhanced Hero Section with Multiple Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-600/20 via-purple-500/10 to-transparent" />
        <div className="absolute inset-0 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative">
          {/* Enhanced Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative pt-24 pb-16 mb-12"
          >
            <div className="absolute -left-4 top-20 w-1 h-24 bg-gradient-to-b from-blue-500 to-purple-500" />
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-8"
            >
              Educational Projects
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-[650px] leading-relaxed"
            >
              Explore our curated collection of educational projects. Filter by technology, 
              difficulty level, or use the search to find the perfect project for your learning journey.
            </motion.p>
          </motion.div>

          {/* Enhanced Filters Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-gray-900/40 rounded-2xl p-8 backdrop-blur-lg border border-gray-800/50 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                    <span className="w-2 h-8 rounded-full bg-gradient-to-b from-blue-500 to-blue-600"></span>
                    Tech Stack
                  </h2>
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 hover:bg-blue-500/10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    <span>Clear filters</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'AWS', count: 1 },
                    { label: 'BERT', count: 1 },
                    { label: 'Docker', count: 1 },
                    { label: 'FastAPI', count: 1 },
                    { label: 'Figma', count: 1 },
                    { label: 'Firebase', count: 1 },
                    { label: 'IoT', count: 1 },
                    { label: 'Kubernetes', count: 1 },
                    { label: 'MongoDB', count: 1 },
                    { label: 'Next.js', count: 1 },
                    { label: 'Node.js', count: 2 },
                    { label: 'PostgreSQL', count: 1 },
                    { label: 'Python', count: 2 },
                    { label: 'React', count: 2 },
                    { label: 'React Native', count: 1 },
                    { label: 'Redux', count: 1 },
                    { label: 'Storybook', count: 1 },
                    { label: 'Styled Components', count: 1 },
                    { label: 'Tailwind CSS', count: 1 },
                    { label: 'TensorFlow', count: 1 },
                    { label: 'TypeScript', count: 2 }
                  ].map((tech) => (
                    <motion.button
                      key={tech.label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTechFilterChange(tech.label)}
                      className={`inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                        ${selectedTechFilters.includes(tech.label)
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 border-transparent scale-105'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50 hover:border-blue-500/50'}`}
                    >
                      {tech.label}
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs transition-colors duration-300
                        ${selectedTechFilters.includes(tech.label)
                          ? 'bg-white/20'
                          : 'bg-gray-700/50'}`}>
                        {tech.count}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-900/40 rounded-2xl p-8 backdrop-blur-lg border border-gray-800/50 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <h2 className="text-xl font-semibold text-white flex items-center gap-3 mb-6">
                  <span className="w-2 h-8 rounded-full bg-gradient-to-b from-blue-500 to-blue-600"></span>
                  Sort Projects
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: 'newest', label: 'Newest First' },
                    { value: 'oldest', label: 'Oldest First' },
                    { value: 'az', label: 'A-Z' },
                    { value: 'difficulty_beginner', label: 'Difficulty (Beginner First)' },
                    { value: 'difficulty_advanced', label: 'Difficulty (Advanced First)' }
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                        ${sortOption === option.value
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 border-transparent scale-105'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50 hover:border-blue-500/50'}`}
                      onClick={() => setSortOption(option.value)}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <ProjectsGrid
                projects={projects}
                selectedTechFilters={selectedTechFilters}
                selectedDifficultyFilters={selectedDifficultyFilters}
                sortOption={sortOption}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
} 