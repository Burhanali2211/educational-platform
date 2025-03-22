interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  longDescription?: string;
  createdAt: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Learning Platform",
    description: "An intelligent education platform that adapts to each student's learning style using machine learning algorithms and provides personalized learning paths.",
    longDescription: "This comprehensive learning platform leverages artificial intelligence to create personalized learning experiences. It analyzes student performance, learning patterns, and preferences to generate custom curriculum paths and interactive content. The system includes real-time progress tracking, adaptive assessments, and intelligent content recommendations.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    tags: ["React", "Python", "TensorFlow", "AWS", "TypeScript"],
    link: "/projects/ai-learning",
    difficulty: "Advanced",
    duration: "8-10 weeks",
    githubUrl: "https://github.com/example/ai-learning",
    liveUrl: "https://ai-learning-demo.com",
    docsUrl: "https://docs.ai-learning-demo.com",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    title: "Educational Platform",
    description: "Interactive learning platform with tutorials, quizzes, and real-time code execution to enhance coding skills.",
    longDescription: "A modern educational platform designed to help students learn programming through interactive lessons, hands-on coding exercises, and real-time feedback. Features include an integrated code editor, automated test suites, and progress tracking.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    link: "/",
    difficulty: "Intermediate",
    duration: "6-8 weeks",
    githubUrl: "https://github.com/example/educational-platform",
    liveUrl: "https://educational-platform.com",
    createdAt: "2024-03-10",
  },
  {
    id: 3,
    title: "Smart Home Mobile App",
    description: "Cross-platform mobile application for controlling smart home devices with voice commands and automation schedules.",
    longDescription: "A feature-rich mobile application that provides seamless control over smart home devices. Users can create custom automation rules, schedule device operations, and use voice commands for hands-free control. The app includes energy monitoring and usage analytics.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=60",
    tags: ["React Native", "Firebase", "IoT", "Redux"],
    link: "/projects/smart-home",
    difficulty: "Intermediate",
    duration: "4-6 weeks",
    githubUrl: "https://github.com/example/smart-home",
    liveUrl: "https://smart-home-demo.com",
    createdAt: "2024-03-05",
  },
  {
    id: 4,
    title: "E-commerce Microservices",
    description: "Scalable microservices architecture for e-commerce platforms with service discovery and load balancing.",
    longDescription: "A modern e-commerce backend built using microservices architecture. The system includes services for product management, order processing, user authentication, and inventory management. Features include automatic scaling, service discovery, and distributed logging.",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=60",
    tags: ["Node.js", "Docker", "Kubernetes", "MongoDB"],
    link: "/projects/ecommerce-backend",
    difficulty: "Advanced",
    duration: "10-12 weeks",
    githubUrl: "https://github.com/example/ecommerce-microservices",
    docsUrl: "https://docs.ecommerce-microservices.com",
    createdAt: "2024-02-28",
  },
  {
    id: 5,
    title: "Design System Library",
    description: "Comprehensive UI component library with dark mode, animations, and accessibility features built for modern web applications.",
    longDescription: "A professionally crafted design system that provides a collection of reusable UI components. The library includes support for themes, animations, and follows accessibility best practices. Comprehensive documentation and interactive examples are provided.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60",
    tags: ["React", "Storybook", "Figma", "Styled Components"],
    link: "/projects/design-system",
    difficulty: "Beginner",
    duration: "3-4 weeks",
    githubUrl: "https://github.com/example/design-system",
    liveUrl: "https://design-system-demo.com",
    docsUrl: "https://docs.design-system-demo.com",
    createdAt: "2024-02-20",
  },
  {
    id: 6,
    title: "Sentiment Analysis Dashboard",
    description: "Real-time social media sentiment analysis tool using natural language processing and machine learning.",
    longDescription: "An advanced sentiment analysis tool that processes social media data in real-time to provide insights about brand perception and customer sentiment. The dashboard includes trend analysis, keyword tracking, and customizable alerts.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    tags: ["Python", "BERT", "FastAPI", "PostgreSQL"],
    link: "/projects/sentiment-analysis",
    difficulty: "Advanced",
    duration: "6-8 weeks",
    githubUrl: "https://github.com/example/sentiment-analysis",
    liveUrl: "https://sentiment-analysis-demo.com",
    createdAt: "2024-02-15",
  }
]; 