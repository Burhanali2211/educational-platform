"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Book, Trophy, Clock, ArrowRight, Star, Code, Layout, Menu } from "lucide-react";
import Link from "next/link";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  isPremium: boolean;
}

interface Progress {
  tutorialId: string;
  progress: number;
  lastUpdated: Date;
}

const tutorials: Record<string, number> = { 'python-basics': 3, 'web-dev-101': 3, 'api-fun': 3 };

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [enrolledTutorials, setEnrolledTutorials] = useState<Tutorial[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const localProgress = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('progress') || '{}') : {};

  const refreshProgress = () => {
    if (typeof window !== 'undefined') {
      setProgress(JSON.parse(localStorage.getItem('progress') || '{}'));
    }
  };

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      setIsLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const [tutorialsRes, progressRes] = await Promise.all([
          fetch("/api/tutorials/enrolled"),
          fetch("/api/progress"),
        ]);

        if (tutorialsRes.ok && progressRes.ok) {
          const [tutorials, progressData] = await Promise.all([
            tutorialsRes.json(),
            progressRes.json(),
          ]);

          setEnrolledTutorials(tutorials);
          setProgress(progressData);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [session, status]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please sign in to access the dashboard.</p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Layout className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Dashboard</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/courses" className="nav-link">Courses</Link>
              <Link href="/playground" className="nav-link">Playground</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden py-4 space-y-4"
            >
              <Link href="/courses" className="block px-4 py-2 hover:bg-accent rounded-lg">Courses</Link>
              <Link href="/playground" className="block px-4 py-2 hover:bg-accent rounded-lg">Playground</Link>
              <Link href="/about" className="block px-4 py-2 hover:bg-accent rounded-lg">About</Link>
              <Link href="/contact" className="block px-4 py-2 hover:bg-accent rounded-lg">Contact</Link>
              <div className="pt-2">
                <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 border border-border mb-8"
        >
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome back, {session?.user?.name}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready to continue your learning journey? Here's your progress so far.
            </p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent" />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Link href="/playground">
            <motion.div
              variants={itemVariants}
              className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all hover:border-primary/50"
            >
              <Code className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Code Playground</h3>
              <p className="text-sm text-muted-foreground">Practice your coding skills in our interactive playground</p>
            </motion.div>
          </Link>

          <Link href="/courses">
            <motion.div
              variants={itemVariants}
              className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all hover:border-primary/50"
            >
              <Book className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Browse Courses</h3>
              <p className="text-sm text-muted-foreground">Explore our collection of programming tutorials</p>
            </motion.div>
          </Link>

          <Link href="/progress">
            <motion.div
              variants={itemVariants}
              className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all hover:border-primary/50"
            >
              <Trophy className="h-8 w-8 text-yellow-500 mb-4" />
              <h3 className="font-semibold mb-2">Your Progress</h3>
              <p className="text-sm text-muted-foreground">Track your learning achievements</p>
            </motion.div>
          </Link>

          <Link href="/settings">
            <motion.div
              variants={itemVariants}
              className="group p-6 rounded-xl border bg-card hover:shadow-lg transition-all hover:border-primary/50"
            >
              <Star className="h-8 w-8 text-purple-500 mb-4" />
              <h3 className="font-semibold mb-2">Premium Content</h3>
              <p className="text-sm text-muted-foreground">Access exclusive tutorials and resources</p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Progress</h2>
            <Link
              href="/courses"
              className="inline-flex items-center text-primary hover:text-primary/90 transition-colors"
            >
              View all courses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl bg-card border p-6 h-48"
                />
              ))}
            </div>
          ) : enrolledTutorials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledTutorials.map(tutorial => (
                <motion.div
                  key={tutorial.id}
                  variants={itemVariants}
                  className="group rounded-xl border bg-card p-6 hover:shadow-lg transition-all"
                >
                  <h3 className="font-semibold mb-4">{tutorial.title}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {progress.find(p => p.tutorialId === tutorial.id)?.progress || 0}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{
                          width: `${progress.find(p => p.tutorialId === tutorial.id)?.progress || 0}%`
                        }}
                      />
                    </div>
                  </div>
                  <Link
                    href={`/tutorials/${tutorial.id}`}
                    className="mt-4 inline-flex items-center text-sm text-primary hover:underline"
                  >
                    Continue learning <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="rounded-xl border bg-card p-8 text-center"
            >
              <Book className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tutorials enrolled yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your learning journey by enrolling in a tutorial
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Browse Tutorials <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Tutorial Progress Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
        >
          {Object.keys(tutorials).map((slug: keyof typeof tutorials) => {
            const completed = Object.keys(localProgress[slug] || {}).length;
            const percent = (completed / tutorials[slug]) * 100;
            return (
              <motion.div
                key={slug}
                variants={itemVariants}
                className="rounded-xl border bg-card p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold capitalize">{slug.replace('-', ' ')}</h3>
                  <span className="text-sm text-muted-foreground">{percent}% Complete</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden mb-4">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                {percent === 100 && (
                  <div className="flex justify-center">
                    <img
                      src={`/badges/${slug}-novice.svg`}
                      alt={`${slug} badge`}
                      className="w-12 h-12 transform hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
} 