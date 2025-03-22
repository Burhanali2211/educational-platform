"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import Search from "./search";
import { SearchIcon, Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Tutorials", path: "/tutorials" },
  { name: "Blog", path: "/blog" },
  { name: "PlayGround", path: "/playground" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full
          ${scrolled 
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.03)] border-b border-gray-200/80 dark:border-gray-800/80" 
            : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 relative">
            <Link 
              href="/" 
              className="flex items-center space-x-2 shrink-0"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Developers Mindset.
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 overflow-x-auto">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 whitespace-nowrap ${
                    pathname === item.path
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Items */}
            <div className="flex items-center space-x-4 shrink-0">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Search"
              >
                <SearchIcon className="w-5 h-5" />
              </button>
              <ThemeToggle />
              {!isOpen && (
                <button
                  onClick={() => setIsOpen(true)}
                  className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-white dark:bg-gray-900 
                shadow-[0_0_50px_rgb(0,0,0,0.15)] dark:shadow-[0_0_50px_rgb(0,0,0,0.3)]
                border-l border-gray-200 dark:border-gray-800 overflow-y-auto"
            >
              <div className="flex flex-col p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    DevMindset.
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`py-3 text-lg font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                      pathname === item.path
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300"}`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-8 flex items-center justify-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
} 