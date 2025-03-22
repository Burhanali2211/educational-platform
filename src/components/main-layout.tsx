"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./navbar";
import Chatbot from "./chatbot";
import { usePathname } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 pt-16 md:pt-20"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <footer className="w-full border-t border-border/40 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Developers Mindset. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a 
              href="/privacy" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </a>
            <a 
              href="/terms" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
} 