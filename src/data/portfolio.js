export const portfolioData = {
  personal: {
    name: "Dilshodbek Raxmonjonov",
    shortName: "Dilshodbek",
    location: "Namangan, O'zbekiston",
    phone: "+998 50 088 82 10",
    experienceYears: "1+",
    projectsCount: "10+",
    satisfactionRate: "100%"
  },
  socials: {
    github: "https://github.com/Raxmonjonov",
    linkedin: "https://www.linkedin.com/in/dilshodbek-raxmonjonov",
    telegram: "https://t.me/raxmonjonov_dev",
    email: "raxmonjonov.dev@gmail.com"
  },
  skills: {
    backend: [
      { name: "Python & Django / DRF", level: "90%" },
      { name: "PostgreSQL & SQLite", level: "86%" },
      { name: "Node.js & Express", level: "84%" },
      { name: "Prisma ORM & Migrations", level: "82%" },
      { name: "REST API & Auth (JWT / NextAuth)", level: "88%" }
    ],
    frontend: [
      { name: "HTML5 / CSS3 / Bootstrap", level: "95%" },
      { name: "JavaScript / TypeScript", level: "88%" },
      { name: "React & Next.js", level: "88%" },
      { name: "React Native (Expo)", level: "82%" },
      { name: "Tailwind CSS & Zustand", level: "85%" }
    ],
    tools: [
      { name: "AI Integration & Prompting", level: "92%" },
      { name: "Git & GitHub", level: "90%" },
      { name: "Netlify & Deployment", level: "88%" },
      { name: "Playwright & Vitest", level: "80%" },
      { name: "Linux / CLI Workflows", level: "82%" }
    ]
  },
  projects: [
    {
      id: "3talab",
      tags: ["Next.js 15", "React 19", "TypeScript", "Prisma", "PostgreSQL", "NextAuth"],
      githubUrl: "https://github.com/Raxmonjonov/3Talaba",
      liveUrl: "",
      featured: true
    },
    {
      id: "silkway",
      tags: ["Django REST", "React", "Vite", "Python", "PostgreSQL", "Netlify"],
      githubUrl: "https://github.com/Raxmonjonov/silkway-express",
      liveUrl: "",
      featured: true
    },
    {
      id: "hibon",
      tags: ["React Native", "Expo", "AsyncStorage", "SVG", "Mobile UI"],
      githubUrl: "https://github.com/Raxmonjonov",
      liveUrl: "",
      featured: true
    },
    {
      id: "resturan",
      tags: ["Python", "Django", "SQLite", "HTML5", "CSS3", "Bootstrap"],
      githubUrl: "https://github.com/Raxmonjonov",
      liveUrl: "",
      featured: false
    },
    {
      id: "tilgo",
      tags: ["Full-Stack", "Backend API", "Frontend", "EdTech"],
      githubUrl: "https://github.com/Raxmonjonov",
      liveUrl: "",
      featured: false
    }
  ]
};
