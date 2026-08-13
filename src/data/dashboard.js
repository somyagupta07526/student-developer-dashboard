export const profileData = {
  name: "Somya Gupta",
  greeting: "Welcome back, Somya 👋",
  subtitle: "Track your development progress and stay consistent.",
  title: "Student Developer & AI Enthusiast",
  githubUsername: "somyagupta07526",
  githubUrl: "https://github.com/somyagupta07526",
  resumeUrl: "#resume-download",
  portfolioUrl: "https://github.com/somyagupta07526",
  avatarUrl: "https://github.com/somyagupta07526.png",
};

export const defaultStats = [
  { id: 'github-repos', title: 'GitHub Repositories', value: 14, change: '+2 this month', icon: 'FiGithub', type: 'github' },
  { id: 'github-followers', title: 'GitHub Followers', value: 28, change: 'Active builder', icon: 'FiUsers', type: 'github' },
  { id: 'projects', title: 'Projects', value: 8, change: '3 Completed, 4 In Progress', icon: 'FiFolder', type: 'general' },
  { id: 'skills', title: 'Skills Tracked', value: 16, change: 'Across 4 Domains', icon: 'FiCpu', type: 'general' },
  { id: 'streak', title: 'Current Streak', value: '12 Days', change: 'Personal Record', icon: 'FiZap', type: 'general' },
];

export const initialProjects = [
  {
    id: 1,
    name: "Student Dev Dashboard",
    description: "A lightweight, high-performance personal developer workspace to aggregate coding stats, tasks, and project updates.",
    techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    status: "In Progress",
    githubUrl: "https://github.com/somyagupta07526",
    demoUrl: "https://github.com/somyagupta07526",
    category: "Web App"
  },
  {
    id: 2,
    name: "AI Code Summarizer",
    description: "Machine learning powered tool to generate concise documentation and explanations for complex codebase snippets.",
    techStack: ["Python", "Pandas", "NumPy", "Machine Learning"],
    status: "Completed",
    githubUrl: "https://github.com/somyagupta07526",
    demoUrl: "https://github.com/somyagupta07526",
    category: "AI/ML"
  },
  {
    id: 3,
    name: "Algorithm Visualizer",
    description: "Interactive visual tool showcasing sorting, graph traversals, and dynamic programming algorithms in real-time.",
    techStack: ["JavaScript", "HTML", "CSS", "Vite"],
    status: "Completed",
    githubUrl: "https://github.com/somyagupta07526",
    demoUrl: "https://github.com/somyagupta07526",
    category: "Web App"
  },
  {
    id: 4,
    name: "Smart Task & Habit Tracker",
    description: "Minimalist productivity application with local storage persistence and priority-based task scheduling.",
    techStack: ["React", "Tailwind CSS", "JavaScript"],
    status: "Planned",
    githubUrl: "https://github.com/somyagupta07526",
    demoUrl: "https://github.com/somyagupta07526",
    category: "Productivity"
  }
];

export const initialSkills = [
  {
    category: "Frontend",
    items: [
      { name: "HTML", level: "Comfortable" },
      { name: "CSS", level: "Comfortable" },
      { name: "JavaScript", level: "Comfortable" },
      { name: "React", level: "Learning" },
      { name: "Tailwind CSS", level: "Learning" }
    ]
  },
  {
    category: "Programming",
    items: [
      { name: "Python", level: "Comfortable" },
      { name: "C", level: "Comfortable" },
      { name: "Java", level: "Learning" },
      { name: "C++", level: "Not Learned" }
    ]
  },
  {
    category: "AI/ML",
    items: [
      { name: "Python", level: "Comfortable" },
      { name: "Pandas", level: "Intermediate" },
      { name: "NumPy", level: "Intermediate" },
      { name: "Machine Learning", level: "Learning" }
    ]
  },
  {
    category: "Tools",
    items: [
      { name: "Git", level: "Comfortable" },
      { name: "GitHub", level: "Comfortable" },
      { name: "VS Code", level: "Comfortable" },
      { name: "Vite", level: "Intermediate" }
    ]
  }
];

export const initialLearning = [
  {
    id: 1,
    technology: "React & Modern Web Design",
    progress: 45,
    status: "Learning",
    lastUpdated: "2 days ago",
    notes: "Deep diving into custom hooks, context management, and responsive layouts."
  },
  {
    id: 2,
    technology: "Python Data Science & ML",
    progress: 80,
    status: "Active",
    lastUpdated: "Yesterday",
    notes: "Practicing data manipulation with Pandas & numerical analysis with NumPy."
  },
  {
    id: 3,
    technology: "Data Structures & Algorithms in C",
    progress: 70,
    status: "Active",
    lastUpdated: "Today",
    notes: "Mastering pointers, memory allocation, and graph data structures in C."
  },
  {
    id: 4,
    technology: "System Design Fundamentals",
    progress: 40,
    status: "Learning",
    lastUpdated: "1 week ago",
    notes: "Understanding RESTful API standards, caching strategies, and database indexing."
  }
];

export const defaultTasks = [
  {
    id: "task-1",
    title: "Implement Binary Search Tree in C",
    priority: "High",
    dueDate: "Today",
    completed: false,
    category: "Coding"
  },
  {
    id: "task-2",
    title: "Update Student Dev Dashboard GitHub widget",
    priority: "Medium",
    dueDate: "Tomorrow",
    completed: true,
    category: "Development"
  },
  {
    id: "task-3",
    title: "Review Machine Learning linear regression notebook",
    priority: "Medium",
    dueDate: "Aug 12",
    completed: false,
    category: "AI/ML"
  },
  {
    id: "task-4",
    title: "Refactor portfolio component styles with Tailwind CSS",
    priority: "Low",
    dueDate: "Aug 15",
    completed: false,
    category: "Design"
  }
];

export const initialActivities = [
  {
    id: 1,
    title: "Project updated",
    description: "Pushed clean React architecture for Student Dev Dashboard.",
    time: "2 hours ago",
    type: "project"
  },
  {
    id: 2,
    title: "C Algorithm Milestone",
    description: "Implemented Binary Search Tree traversal algorithms in C.",
    time: "Yesterday",
    type: "task"
  },
  {
    id: 3,
    title: "Task completed",
    description: "Finished setting up initial dataset structure and Tailwind theme tokens.",
    time: "Yesterday",
    type: "task"
  },
  {
    id: 4,
    title: "GitHub Repository Added",
    description: "Created new public repository 'student-dev-dashboard'.",
    time: "3 days ago",
    type: "github"
  }
];
