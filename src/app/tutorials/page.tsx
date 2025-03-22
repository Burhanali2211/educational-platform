"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Clock, Tag, ChevronRight, Star, Users } from "lucide-react";
import Link from "next/link";
import { tutorials } from "@/data/tutorials";
import { Tutorial } from "@/types/tutorial";
import MainLayout from "@/components/main-layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Cast tutorials to the correct type
const typedTutorials = tutorials as Tutorial[];

// Tutorial categories and difficulty levels
const categories = ["All", "Web Development", "Mobile", "Python", "JavaScript", "DevOps", "Data Science"];
const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function TutorialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutorials = typedTutorials.filter((tutorial) => {
    const matchesCategory = selectedCategory === "All" || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All Levels" || tutorial.difficulty === selectedDifficulty;
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Explore Our Tutorials
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn from our comprehensive collection of tutorials covering various technologies and skill levels
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search tutorials..."
                className="pl-10 bg-background/50 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-all",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-all",
                    selectedDifficulty === difficulty
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tutorial Cards */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/tutorials/${tutorial.slug}`}>
                  <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-primary/10">
                    <div className="relative h-48 w-full">
                      <Image
                        src={tutorial.image}
                        alt={tutorial.title}
                        fill
                        className="object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
                      <Badge className={cn(
                        "absolute top-4 right-4",
                        tutorial.difficulty === "beginner" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                        tutorial.difficulty === "intermediate" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                        "bg-red-500/10 text-red-400 border-red-500/20"
                      )}>
                        {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {tutorial.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {tutorial.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span>{tutorial.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{tutorial.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{tutorial.duration}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {tutorial.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary/80">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-primary/10">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <BookOpen className="h-4 w-4" />
                          <span>{tutorial.chapters} Chapters</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 