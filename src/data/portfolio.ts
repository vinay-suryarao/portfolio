export const portfolioData = {
  personal: {
    name: "Vinay Suryarao",
    firstName: "Vinay",
    lastName: "Suryarao",
    email: "suryaraovinay@gmail.com",
    tagline: "IT Professional • DevOps • Web Developer",
    heroSubtitle: "Building digital experiences with code, cloud, and creativity.",
    about: `I'm Vinay Suryarao, an IT professional and aspiring engineer currently pursuing my B.E. in Information Technology at A.P. Shah Institute of Technology, Thane. I'm passionate about DevOps, web development, cloud computing, and networking. As the Technical Head of the DevOps Club at APSIT, I lead workshops, manage projects, and foster a culture of innovation. I hold certifications in Red Hat OpenShift, AWS Cloud Foundation, and IoT Cloud Engineering. Whether it's building full-stack applications, automating infrastructure, or creating sleek user interfaces — I love turning ideas into reality.`,
    resumeUrl: "/resume/VINAY_RESUME.pdf",
    avatar: "/images/vinay.png",
    location: "Thane, Maharashtra, India",
    github: "https://github.com/vinay-suryarao",
    linkedin: "https://www.linkedin.com/in/vinay-suryarao/",
  },

  stats: [
    { label: "Projects Built", value: 10 },
    { label: "Certifications", value: 8 },
    { label: "Months Experience", value: 3 },
    { label: "Technologies", value: 20 },
  ],

  experience: [
    {
      id: 1,
      role: "Full Stack Web Developer Intern",
      company: "NexiaQuest Ventures LLP",
      duration: "April 2025 – Present",
      description:
        "Engineered and launched the official company website from scratch using the MERN stack. Designed responsive, high-performance UI with React, Vite, and Tailwind CSS. Architected and deployed CI/CD pipeline on AWS. Containerized applications with Docker and led project execution using Agile methodologies with Jira.",
      type: "work",
    },
    {
      id: 2,
      role: "Technical Head",
      company: "DevOps Club — APSIT",
      duration: "July 2025 – Present",
      description:
        "Spearhead the technical vision of the club, guiding a team through project development and structured learning paths. Architect and deliver hands-on workshops on Docker, Jenkins, and Git. Lead bootcamps with curriculum design and mentor members on advanced DevOps concepts and best practices.",
      type: "position",
    },
    {
      id: 3,
      role: "Red Hat Student Ambassador",
      company: "A.P. Shah Institute of Technology",
      duration: "2025 – Present",
      description:
        "Promoting open-source technologies and Red Hat solutions within the campus community. Organizing events and workshops around Linux, containers, and cloud-native technologies.",
      type: "position",
    },
  ],

  education: [
    {
      id: 1,
      degree: "Bachelor of Engineering in Information Technology",
      institution: "A.P. Shah Institute of Technology, Thane",
      duration: "July 2024 – Present",
      coursework: "Operating Systems, Computer Architecture, OOP, Data Structures, Database Management, DevOps, Advanced DevOps, Computer Networks and Security",
    },
    {
      id: 2,
      degree: "Diploma in Information Technology",
      institution: "V.P.M's Polytechnic, Thane",
      duration: "July 2019 – May 2022",
      coursework: "Web Technologies (HTML, CSS), Software Engineering, Database Fundamentals, OOP, Basic Networking",
    },
  ],

  projects: [
    {
      id: 1,
      title: "MarketWip",
      description:
        "A comprehensive Indian stock market news & analytics platform tracking real-time market data, corporate developments, FII/DII activity, and providing market discovery tools.",
      tech: ["Next.js", "React", "API Integration", "Real-time Data"],
      image: "/images/projects/marketwip.png",
      github: "https://github.com/vinay-suryarao",
      live: "https://marketwip.com",
      featured: true,
    },
    {
      id: 2,
      title: "CodeArmour AI",
      description:
        "An AI-powered code security analysis tool that scans codebases for vulnerabilities, provides security insights, and suggests remediations for safer software development.",
      tech: ["Python", "AI/ML", "Security", "Code Analysis"],
      image: "/images/projects/codearmour.jpg",
      github: "https://github.com/vinay-suryarao",
      live: "https://code-armour-ai.vercel.app/",
      featured: true,
    },
    {
      id: 3,
      title: "APSIT DevOps Club",
      description:
        "Designed and developed the APSIT DevOps Club Web Platform to centralize resources, streamline event management, and foster a collaborative digital community. Features one-click event registration, resource library, and project hub.",
      tech: ["React", "Node.js", "Firebase", "Cloudinary", "Vercel"],
      image: "/images/projects/devops-club.jpg",
      github: "https://github.com/vinay-suryarao/DevOps",
      live: "https://dev-ops-apsit.vercel.app/",
      featured: true,
    },
    {
      id: 4,
      title: "Duracool",
      description:
        "A professional corporate website for Duracool, an industrial cooling solutions company. Built with modern web technologies featuring responsive design, product showcases, and business-focused UI.",
      tech: ["React", "Node.js", "Responsive Design", "Corporate Web"],
      image: "/images/projects/duracool.png",
      github: "https://github.com/vinay-suryarao/duracool",
      live: "https://duracool.in",
      featured: true,
    },
    {
      id: 5,
      title: "Durashield",
      description:
        "A professional corporate website for Durashield, a waterproofing and protective coating company. Features product catalogs, service pages, and modern corporate design with optimized performance.",
      tech: ["React", "Node.js", "Corporate Web", "Responsive Design"],
      image: "/images/projects/durashield.png",
      github: "https://github.com/vinay-suryarao/durashield",
      live: "https://durashield.co.in",
      featured: true,
    },
    {
      id: 6,
      title: "Realtime Attendance with Anti-Spoofing",
      description:
        "Engineered a standalone desktop application to automate attendance tracking using facial recognition, recording in-time and out-time with high accuracy. Secure data storage with robust search and verification capabilities.",
      tech: ["Python", "MySQL", "OpenCV", "Tkinter"],
      image: "/images/projects/attendance.jpg",
      github: "https://github.com/vinay-suryarao/Attend",
      live: "#",
      featured: false,
    },
    {
      id: 7,
      title: "Smart Home Application",
      description:
        "An IoT-enabled Android application allowing users to remotely monitor and control home appliances such as lights, fans, and switches with a user-friendly interface for seamless control.",
      tech: ["IoT", "C++", "Java", "Android"],
      image: "/images/projects/smart-home.jpg",
      github: "https://github.com/vinay-suryarao/SHA",
      live: "#",
      featured: false,
    },
  ],

  awards: [
    {
      id: 1,
      title: "Winner — Proto-IT Webinar Series",
      organization: "VESIT, Chembur",
      icon: "🏆",
    },
    {
      id: 2,
      title: "Winner — Sparkathon",
      organization: "APSIT, Thane",
      icon: "🏆",
    },
    {
      id: 3,
      title: "First Runner-up — State Level AI-IoT Competition",
      organization: "VIT, Wadala",
      icon: "🥈",
    },
    {
      id: 4,
      title: "Runner-up — NASA's Problem Solving Event",
      organization: "VPMSP, Thane",
      icon: "🥈",
    },
  ],

  certifications: [
    {
      id: 1,
      title: "AWS Cloud Foundation",
      issuer: "Amazon Web Services (AWS)",
      icon: "☁️",
    },
    {
      id: 2,
      title: "Python Full Stack Developer Virtual Internship",
      issuer: "EduSkills Foundation",
      icon: "🐍",
    },
    {
      id: 3,
      title: "Full Stack Web Development Certification",
      issuer: "Certification Authority",
      icon: "💻",
    },
    {
      id: 4,
      title: "Android Application Development Certification",
      issuer: "Certification Authority",
      icon: "📱",
    },
    {
      id: 5,
      title: "IoT Cloud Engineer Virtual Internship",
      issuer: "EduSkills Foundation",
      icon: "🌩️",
    },
    {
      id: 6,
      title: "IBM Web Development Fundamentals",
      issuer: "IBM",
      icon: "🌐",
    },
    {
      id: 7,
      title: "CCNA Introduction to Networks",
      issuer: "Cisco Networking Academy",
      icon: "🔗",
    },
    {
      id: 8,
      title: "RedHat OpenShift Administration",
      issuer: "Red Hat",
      icon: "🎩",
    },
  ],

  skills: [
    "C", "C++", "Java", "Python", "Bash Scripting",
    "HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js",
    "Git", "GitHub", "Docker", "Jenkins", "CI/CD", "Jira",
    "Ansible", "Chef", "Puppet",
    "AWS", "Firebase", "Vercel", "Netlify", "Cloudinary",
    "MySQL", "MongoDB", "Firestore",
    "Ubuntu", "CentOS", "Windows",
    "Wireshark", "Nmap", "Firewalls", "IDS",
  ],

  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Gallery", href: "#gallery" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ],
};
