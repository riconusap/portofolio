import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePortfolioStore = defineStore('portfolio', () => {
  // Personal info state
  const personalInfo = ref({
    name: 'Your Name',
    title: 'Full Stack Developer',
    description: 'Passionate developer creating amazing web experiences with modern technologies.',
    email: 'your.email@example.com',
    phone: '+1234567890',
    location: 'Your City, Country',
    website: 'https://yourwebsite.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    profileImage: '',
    bio: 'I am a passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, functional, and user-friendly applications that solve real-world problems.',
    yearsOfExperience: 5,
    projectsCompleted: 50,
    happyClients: 30,
    technologies: 25
  })

  // Skills state
  const skills = ref([
    // Frontend
    {
      id: 'vue',
      name: 'Vue.js',
      category: 'frontend',
      icon: '⚡'
    },
    {
      id: 'react',
      name: 'React',
      category: 'frontend',
      icon: '⚛️'
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'frontend',
      icon: '📘'
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'frontend',
      icon: '💛'
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      category: 'frontend',
      icon: '🎨'
    },
    {
      id: 'scss',
      name: 'SCSS',
      category: 'frontend',
      icon: '💎'
    },
    {
      id: 'html',
      name: 'HTML5',
      category: 'frontend',
      icon: '🌐'
    },
    {
      id: 'css',
      name: 'CSS3',
      category: 'frontend',
      icon: '🎭'
    },
    // Backend
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'backend',
      icon: '🟢'
    },
    {
      id: 'express',
      name: 'Express.js',
      category: 'backend',
      icon: '🚂'
    },
    {
      id: 'python',
      name: 'Python',
      category: 'backend',
      icon: '🐍'
    },
    {
      id: 'php',
      name: 'PHP',
      category: 'backend',
      icon: '🐘'
    },
    // Database
    {
      id: 'supabase',
      name: 'Supabase',
      category: 'database',
      icon: '🚀'
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'database',
      icon: '🐘'
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'database',
      icon: '🍃'
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'database',
      icon: '🗄️'
    },
    // Tools
    {
      id: 'git',
      name: 'Git',
      category: 'tools',
      icon: '📝'
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'tools',
      icon: '🐳'
    },
    {
      id: 'vite',
      name: 'Vite',
      category: 'tools',
      icon: '⚡'
    },
    {
      id: 'webpack',
      name: 'Webpack',
      category: 'tools',
      icon: '📦'
    },
    {
      id: 'pinia',
      name: 'Pinia',
      category: 'tools',
      icon: '🍍'
    },
    {
      id: 'vitest',
      name: 'Vitest',
      category: 'tools',
      icon: '🧪'
    }
  ])

  // Projects state
  const projects = ref([
    {
      id: 'portfolio',
      title: 'Portfolio Website',
      description: 'Modern portfolio website built with Vue 3, TypeScript, and glassmorphism design.',
      longDescription: 'A comprehensive portfolio showcasing my skills and projects with a beautiful glassmorphism design.',
      image: '',
      gallery: [],
      technologies: ['Vue 3', 'TypeScript', 'SCSS', 'Tailwind CSS'],
      liveUrl: '',
      sourceUrl: '',
      featured: true,
      category: 'Frontend',
      status: 'in-progress',
      startDate: '2024-01-01',
      endDate: ''
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with modern UI and secure payment processing.',
      longDescription: 'A complete e-commerce platform with user authentication, product management, shopping cart, and payment integration.',
      image: '',
      gallery: [],
      technologies: ['Vue 3', 'TypeScript', 'Supabase', 'SCSS'],
      liveUrl: '',
      sourceUrl: '',
      featured: true,
      category: 'Full Stack',
      status: 'completed',
      startDate: '2023-06-01',
      endDate: '2023-12-01'
    }
  ])

  // Experience state
  const experience = ref([
    {
      id: 'current-job',
      company: 'Your Company',
      position: 'Senior Developer',
      description: 'Leading development of web applications using modern frameworks and technologies.',
      startDate: '2023-01-01',
      endDate: '',
      current: true,
      technologies: ['Vue.js', 'TypeScript', 'Node.js'],
      achievements: [
        'Led a team of 5 developers',
        'Improved application performance by 40%',
        'Implemented CI/CD pipeline'
      ]
    }
  ])

  // Computed properties
  const featuredProjects = computed(() =>
    projects.value.filter(project => project.featured)
  )

  const skillsByCategory = computed(() => {
    const categories: Record<string, any[]> = {}
    const categoryNames: Record<string, string> = {
      'frontend': 'Frontend Development',
      'backend': 'Backend Development', 
      'database': 'Database & Storage',
      'tools': 'Development Tools',
      'other': 'Other Technologies'
    }
    
    skills.value.forEach(skill => {
      const categoryKey = categoryNames[skill.category] || skill.category
      if (!categories[categoryKey]) {
        categories[categoryKey] = []
      }
      categories[categoryKey].push(skill)
    })
    return categories
  })

  const currentExperience = computed(() =>
    experience.value.filter(exp => exp.current)
  )

  // Actions
  const updatePersonalInfo = (info: any) => {
    personalInfo.value = { ...personalInfo.value, ...info }
  }

  const addProject = (project: any) => {
    projects.value.push({ ...project, id: Date.now().toString() })
  }

  const updateProject = (id: string, updates: any) => {
    const index = projects.value.findIndex(p => p.id === id)
    if (index !== -1) {
      projects.value[index] = { ...projects.value[index], ...updates }
    }
  }

  const removeProject = (id: string) => {
    const index = projects.value.findIndex(p => p.id === id)
    if (index !== -1) {
      projects.value.splice(index, 1)
    }
  }

  const addExperience = (exp: any) => {
    experience.value.push({ ...exp, id: Date.now().toString() })
  }

  const addSkill = (skill: any) => {
    skills.value.push({ ...skill, id: Date.now().toString() })
  }

  const removeSkill = (id: string) => {
    const index = skills.value.findIndex(s => s.id === id)
    if (index !== -1) {
      skills.value.splice(index, 1)
    }
  }

  return {
    // State
    personalInfo,
    skills,
    projects,
    experience,
    
    // Computed
    featuredProjects,
    skillsByCategory,
    currentExperience,
    
    // Actions
    updatePersonalInfo,
    addProject,
    updateProject,
    removeProject,
    addExperience,
    addSkill,
    removeSkill
  }
})

export default usePortfolioStore