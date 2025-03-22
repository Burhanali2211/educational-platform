"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Book, Code, Users, ChevronRight } from "lucide-react";
import { projects } from '@/data/projects';
import { Button, type ButtonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Particles } from "@/components/ui/particles";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import TechStack from "@/components/ui/tech-stack";
import { Stats } from "@/components/ui/stats";
import { ProjectCard } from "@/components/ui/project-card";
// import { EditorSkeleton, QuizSkeleton } from "@/components/skeletons";

console.log('Imported Projects:', projects);

const featuredProjects = [
  {
    title: "Modern Blog Platform",
    description: "Build a full-stack blog platform with Next.js, TypeScript, and MongoDB",
    image: "/projects/blog-platform.svg",
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"] as string[],
    link: "/projects/blog-platform",
    difficulty: "Beginner" as const,
    duration: "2-3 hours",
  },
  {
    title: "Real-time Chat App",
    description: "Create a real-time chat application with WebSocket integration",
    image: "/projects/chat-app.svg",
    tags: ["React", "Node.js", "Socket.io", "Express"] as string[],
    link: "/projects/chat-app",
    difficulty: "Intermediate" as const,
    duration: "4-5 hours",
  },
  {
    title: "E-commerce Dashboard",
    description: "Develop a comprehensive e-commerce admin dashboard",
    image: "/projects/ecommerce-dashboard.svg",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Chart.js"] as string[],
    link: "/projects/ecommerce-dashboard",
    difficulty: "Advanced" as const,
    duration: "8-10 hours",
  },
] as const;

export default function Home() {
  const buttonProps: ButtonVariants = {
    variant: "outline",
  };

  const features = [
    {
      icon: <Book className="h-8 w-8" />,
      title: "Structured Learning Path",
      description: "Follow our carefully designed curriculum that takes you from basics to advanced concepts systematically."
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Hands-on Experience",
      description: "Build real-world projects that you can add to your portfolio while learning practical skills."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Support",
      description: "Join our active community of developers to get help, share knowledge, and grow together."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "Tech Corp",
      image: "/testimonials/sarah.svg",
      content: "This platform transformed my learning journey. The project-based approach helped me land my dream job!"
    },
    {
      name: "Michael Chen",
      role: "Full Stack Developer",
      company: "StartUp Inc",
      image: "/testimonials/michael.svg",
      content: "The structured learning path and hands-on projects gave me the confidence to build complex applications."
    },
    {
      name: "Emily Rodriguez",
      role: "Software Engineer",
      company: "Innovation Labs",
      image: "/testimonials/emily.svg",
      content: "The community support is amazing. I always got help when stuck, and now I help others grow!"
    }
  ];

  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Particles className="absolute inset-0" />
        </div>
        <div className="container relative z-10 mx-auto flex flex-col items-center justify-center gap-8 text-center">
          <h1 className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Learn to Code with
            <br />
            <span className="text-primary animate-typewriter">Next.js</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Join our platform to learn modern web development through hands-on
            projects. Master the latest technologies and build real-world
            applications.
          </p>
          <div className="flex gap-4">
            <Link href="/projects">
              <Button className="gap-2">
                Start Learning <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/about">
              <Button {...buttonProps}>
                Learn More
              </Button>
            </Link>
          </div>
          <div className="relative h-[200px] w-full max-w-[600px]">
            <TechStack />
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Stats Section */}
      <section className="section-padding w-full">
        <div className="container">
          <Stats />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding w-full bg-gradient-to-b from-background to-background/50">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Featured Projects</h2>
            <p className="text-muted-foreground">Start your journey with these carefully curated projects</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="w-full"
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/projects">
              <Button {...buttonProps} className="gap-2">
                View All Projects <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="section-padding w-full bg-gradient-to-b from-background to-background/50">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Why Join Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers a unique learning experience that combines structured learning, hands-on practice, and community support.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative p-6 rounded-lg bg-card hover:bg-card/80 transition-colors w-full"
              >
                <div className="mb-4 p-3 rounded-full bg-primary/10 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="section-padding w-full">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Your Learning Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow our structured path to become a proficient developer
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2" />
            {[
              { step: 1, title: "Master the Fundamentals", content: "Start with the basics of web development, including HTML, CSS, and JavaScript." },
              { step: 2, title: "Build with React", content: "Learn React and its ecosystem through hands-on projects and exercises." },
              { step: 3, title: "Full Stack Development", content: "Dive into backend development with Node.js and database management." },
              { step: 4, title: "Advanced Concepts", content: "Master advanced topics like TypeScript, Next.js, and modern development practices." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 ${
                  index % 2 ? "md:text-right" : ""
                }`}
              >
                <div className={`flex items-center ${index % 2 ? "md:order-2 md:justify-end" : ""}`}>
                  <div className="relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full" />
                    <div className="relative z-10 w-6 h-6 bg-background rounded-full border-2 border-primary flex items-center justify-center m-1">
                      <span className="text-xs font-bold">{item.step}</span>
                    </div>
                  </div>
                  <div className={`ml-4 ${index % 2 ? "md:mr-4 md:ml-0" : ""}`}>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.content}</p>
                  </div>
                </div>
                <div className={`hidden md:block ${index % 2 ? "md:order-1" : ""}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding w-full bg-gradient-to-t from-background to-background/50">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from our community members who have transformed their careers
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative p-6 rounded-lg bg-card w-full"
              >
                <div className="mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </div>
                <p className="mb-4 text-muted-foreground">{testimonial.content}</p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding w-full">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our platform
            </p>
          </div>
          <div className="grid gap-6 max-w-3xl mx-auto">
            {[
              {
                question: "How long does it take to complete a project?",
                answer: "Project completion time varies based on complexity and your experience level. Most projects take between 2-10 hours to complete."
              },
              {
                question: "Do I need prior programming experience?",
                answer: "While some basic understanding is helpful, our beginner-friendly projects start from the basics and gradually progress to more advanced concepts."
              },
              {
                question: "Can I get help if I'm stuck?",
                answer: "Yes! Our community forum and dedicated support team are always ready to help you overcome any challenges you face."
              },
              {
                question: "Are the projects practical for real-world use?",
                answer: "Absolutely! Our projects are designed based on real-world scenarios and current industry practices."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-6 rounded-lg bg-card hover:bg-card/80 transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding w-full">
        <div className="container">
          <div className="rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 p-8 sm:p-12 text-center overflow-hidden">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers learning and building with us. Start your journey today and transform your career with hands-on projects and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto btn-primary">
                  Start Learning Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button {...buttonProps} className="w-full sm:w-auto btn-outline">
                  Talk to Us <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
