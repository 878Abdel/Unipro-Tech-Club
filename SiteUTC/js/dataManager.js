class DataManager {
    constructor() {
        this.storageKey = 'unipro_data';
        this.version = '1.0.0';
        this.initializeData();
        this.setupAutoSave();
    }

    setupAutoSave() {
        setInterval(() => {
            this.backupData();
        }, 5 * 60 * 1000);
    }

    backupData() {
        const data = this.exportData();
        localStorage.setItem(`${this.storageKey}_backup`, JSON.stringify(data));
        localStorage.setItem(`${this.storageKey}_backup_date`, new Date().toISOString());
    }

    initializeData() {
        if (!localStorage.getItem('unipro_projects')) {
            const defaultProjects = [
                {
                    id: 1,
                    title: "UTC Campus App",
                    description: "Application mobile pour la vie étudiante",
                    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&crop=center",
                    technologies: ["React Native", "Firebase", "Node.js"],
                    date: "2024-01-15",
                    featured: true,
                    githubLink: "https://github.com/unipro/utc-campus-app",
                    category: "Mobile"
                },
                {
                    id: 2,
                    title: "Shop UTC",
                    description: "Plateforme e-commerce universitaire",
                    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
                    technologies: ["React", "Stripe", "MongoDB"],
                    date: "2024-01-20",
                    featured: true,
                    githubLink: "https://github.com/unipro/shop-utc",
                    category: "Web"
                },
                {
                    id: 3,
                    title: "UTC Assistant",
                    description: "Chatbot IA pour étudiants",
                    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center",
                    technologies: ["Python", "OpenAI", "LangChain"],
                    date: "2024-02-01",
                    featured: false,
                    githubLink: "https://github.com/unipro/utc-assistant",
                    category: "IA"
                }
            ];
            localStorage.setItem('unipro_projects', JSON.stringify(defaultProjects));
        }

        if (!localStorage.getItem('unipro_services')) {
            const defaultServices = [
                {
                    id: 1,
                    title: "Développement Web",
                    description: "Sites modernes et performants",
                    price: "À partir de 500€",
                    category: "Web",
                    features: ["Design responsive", "SEO optimisé", "Performance"],
                    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=center"
                },
                {
                    id: 2,
                    title: "Applications Mobile",
                    description: "Apps iOS et Android natives",
                    price: "À partir de 1500€",
                    category: "Mobile",
                    features: ["React Native", "Performance", "UI/UX moderne"],
                    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center"
                },
                {
                    id: 3,
                    title: "Solutions IA",
                    description: "Intelligence artificielle sur mesure",
                    price: "Sur devis",
                    category: "IA",
                    features: ["Machine Learning", "NLP", "Computer Vision"],
                    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center"
                }
            ];
            localStorage.setItem('unipro_services', JSON.stringify(defaultServices));
        }

        if (!localStorage.getItem('unipro_activities')) {
            const defaultActivities = [
                {
                    id: 1,
                    title: "Hackathon 2024",
                    description: "48h de développement intensif",
                    date: "2024-03-15",
                    location: "Campus UTC",
                    type: "Hackathon",
                    participants: 50,
                    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop&crop=center"
                },
                {
                    id: 2,
                    title: "Workshop React",
                    description: "Formation intensive React.js",
                    date: "2024-02-20",
                    location: "Lab Tech",
                    type: "Formation",
                    participants: 25,
                    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop&crop=center"
                }
            ];
            localStorage.setItem('unipro_activities', JSON.stringify(defaultActivities));
        }

        if (!localStorage.getItem('unipro_contact_messages')) {
            localStorage.setItem('unipro_contact_messages', JSON.stringify([]));
        }
    }

    getProjects() {
        return JSON.parse(localStorage.getItem('unipro_projects') || '[]');
    }

    validateProject(project) {
        const required = ['title', 'description', 'category'];
        const missing = required.filter(field => !project[field]);
        if (missing.length > 0) {
            throw new Error(`Champs obligatoires manquants: ${missing.join(', ')}`);
        }
        return true;
    }

    validateService(service) {
        const required = ['title', 'description', 'price'];
        const missing = required.filter(field => !service[field]);
        if (missing.length > 0) {
            throw new Error(`Champs obligatoires manquants: ${missing.join(', ')}`);
        }
        return true;
    }

    validateActivity(activity) {
        const required = ['title', 'description', 'date', 'type'];
        const missing = required.filter(field => !activity[field]);
        if (missing.length > 0) {
            throw new Error(`Champs obligatoires manquants: ${missing.join(', ')}`);
        }
        return true;
    }

    addProject(project) {
        try {
            this.validateProject(project);
            const projects = this.getProjects();
            project.id = Date.now();
            project.createdAt = new Date().toISOString();
            projects.push(project);
            localStorage.setItem('unipro_projects', JSON.stringify(projects));
            return project;
        } catch (error) {
            console.error('Erreur ajout projet:', error.message);
            throw error;
        }
    }

    updateProject(id, updatedProject) {
        const projects = this.getProjects();
        const index = projects.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updatedProject };
            localStorage.setItem('unipro_projects', JSON.stringify(projects));
            return projects[index];
        }
        return null;
    }

    deleteProject(id) {
        const projects = this.getProjects();
        const filtered = projects.filter(p => p.id !== parseInt(id));
        localStorage.setItem('unipro_projects', JSON.stringify(filtered));
        return true;
    }

    getServices() {
        return JSON.parse(localStorage.getItem('unipro_services') || '[]');
    }

    addService(service) {
        try {
            this.validateService(service);
            const services = this.getServices();
            service.id = Date.now();
            service.createdAt = new Date().toISOString();
            services.push(service);
            localStorage.setItem('unipro_services', JSON.stringify(services));
            return service;
        } catch (error) {
            console.error('Erreur ajout service:', error.message);
            throw error;
        }
    }

    addActivity(activity) {
        try {
            this.validateActivity(activity);
            const activities = this.getActivities();
            activity.id = Date.now();
            activity.createdAt = new Date().toISOString();
            activities.push(activity);
            localStorage.setItem('unipro_activities', JSON.stringify(activities));
            return activity;
        } catch (error) {
            console.error('Erreur ajout activité:', error.message);
            throw error;
        }
    }

    searchProjects(query) {
        const projects = this.getProjects();
        return projects.filter(project => 
            project.title.toLowerCase().includes(query.toLowerCase()) ||
            project.description.toLowerCase().includes(query.toLowerCase()) ||
            project.category.toLowerCase().includes(query.toLowerCase())
        );
    }

    getFeaturedProjects() {
        const projects = this.getProjects();
        return projects.filter(project => project.featured);
    }

    updateActivity(id, updatedActivity) {
        const activities = this.getActivities();
        const index = activities.findIndex(a => a.id === parseInt(id));
        if (index !== -1) {
            activities[index] = { ...activities[index], ...updatedActivity };
            localStorage.setItem('unipro_activities', JSON.stringify(activities));
            return activities[index];
        }
        return null;
    }

    deleteActivity(id) {
        const activities = this.getActivities();
        const filtered = activities.filter(a => a.id !== parseInt(id));
        localStorage.setItem('unipro_activities', JSON.stringify(filtered));
        return true;
    }

    getMessages() {
        return JSON.parse(localStorage.getItem('unipro_contact_messages') || '[]');
    }

    addMessage(message) {
        const messages = this.getMessages();
        message.id = Date.now();
        message.date = new Date().toISOString();
        message.status = "nouveau";
        messages.push(message);
        localStorage.setItem('unipro_contact_messages', JSON.stringify(messages));
        return message;
    }

    markMessageAsRead(id) {
        const messages = this.getMessages();
        const index = messages.findIndex(m => m.id === parseInt(id));
        if (index !== -1) {
            messages[index].status = "lu";
            localStorage.setItem('unipro_contact_messages', JSON.stringify(messages));
            return messages[index];
        }
        return null;
    }

    deleteMessage(id) {
        const messages = this.getMessages();
        const filtered = messages.filter(m => m.id !== parseInt(id));
        localStorage.setItem('unipro_contact_messages', JSON.stringify(filtered));
        return true;
    }

    getStats() {
        const projects = this.getProjects();
        const services = this.getServices();
        const activities = this.getActivities();
        const messages = this.getMessages();

        return {
            totalProjects: projects.length,
            totalServices: services.length,
            totalActivities: activities.length,
            totalMessages: messages.length,
            unreadMessages: messages.filter(m => m.status === "nouveau").length,
            featuredProjects: projects.filter(p => p.featured).length
        };
    }

    exportData() {
        return {
            projects: this.getProjects(),
            services: this.getServices(),
            activities: this.getActivities(),
            messages: this.getMessages(),
            exportDate: new Date().toISOString()
        };
    }

    importData(data) {
        if (data.projects) {
            localStorage.setItem('unipro_projects', JSON.stringify(data.projects));
        }
        if (data.services) {
            localStorage.setItem('unipro_services', JSON.stringify(data.services));
        }
        if (data.activities) {
            localStorage.setItem('unipro_activities', JSON.stringify(data.activities));
        }
        if (data.messages) {
            localStorage.setItem('unipro_contact_messages', JSON.stringify(data.messages));
        }
        return true;
    }

    resetData() {
        localStorage.removeItem('unipro_projects');
        localStorage.removeItem('unipro_services');
        localStorage.removeItem('unipro_activities');
        localStorage.removeItem('unipro_contact_messages');
        this.initializeData();
        return true;
    }
}

const dataManager = new DataManager();

