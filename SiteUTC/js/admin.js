class AdminManager {
    constructor() {
        this.dataManager = new DataManager();
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStats();
        this.loadProjects();
    }

    setupEventListeners() {
        document.getElementById('logoutBtn').addEventListener('click', () => {
            sessionStorage.removeItem('unipro_admin_logged_in');
            sessionStorage.removeItem('unipro_admin_username');
            window.location.href = 'login.html';
        });

        document.getElementById('addProjectBtn').addEventListener('click', () => {
            this.openProjectModal();
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeProjectModal();
        });

        document.getElementById('modalOverlay').addEventListener('click', () => {
            this.closeProjectModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeProjectModal();
        });

        document.getElementById('projectForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProject();
        });

        document.getElementById('manageServicesBtn').addEventListener('click', () => {
            this.showNotification('Gestion des services - En développement', 'info');
        });

        document.getElementById('manageActivitiesBtn').addEventListener('click', () => {
            this.showNotification('Gestion des activités - En développement', 'info');
        });

        document.getElementById('viewSiteBtn').addEventListener('click', () => {
            window.open('index.html', '_blank');
        });

        document.getElementById('exportDataBtn').addEventListener('click', () => {
            this.exportData();
        });
    }

    loadStats() {
        const stats = this.dataManager.getStats();
        
        this.animateCounter('totalProjects', stats.totalProjects);
        this.animateCounter('totalServices', stats.totalServices);
        this.animateCounter('totalActivities', stats.totalActivities);
        this.animateCounter('featuredProjects', stats.featuredProjects);
    }

    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const duration = 2000;
        const start = 0;
        const increment = targetValue / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    loadProjects() {
        const projects = this.dataManager.getProjects();
        const projectsList = document.getElementById('projectsList');
        
        if (projects.length === 0) {
            projectsList.innerHTML = `
                <div class="text-center py-8 opacity-50">
                    <i class="fas fa-folder-open text-4xl mb-4"></i>
                    <p class="text-sm font-black uppercase">Aucun projet pour le moment</p>
                </div>
            `;
            return;
        }

        projectsList.innerHTML = projects.map(project => `
            <div class="project-card bg-white/30 rounded-xl p-4 border border-utcBlue/20 hover:border-utcBlue transition group" data-id="${project.id}">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <h4 class="font-black text-sm uppercase">${project.title}</h4>
                            ${project.featured ? '<span class="px-2 py-1 bg-utcRed text-white text-xs font-black rounded">Featured</span>' : ''}
                            <span class="px-2 py-1 bg-utcBlue/20 text-utcBlue text-xs font-black rounded">${project.category}</span>
                        </div>
                        <p class="text-xs opacity-70 mb-2">${project.description}</p>
                        <div class="flex items-center gap-4 text-xs opacity-50">
                            <span><i class="fas fa-calendar mr-1"></i>${new Date(project.date).toLocaleDateString('fr-FR')}</span>
                            <span><i class="fas fa-code mr-1"></i>${project.technologies.join(', ')}</span>
                        </div>
                    </div>
                    <div class="flex gap-2 ml-4">
                        <button onclick="adminManager.editProject(${project.id})" class="p-2 bg-utcBlue/20 text-utcBlue rounded-lg hover:bg-utcBlue hover:text-white transition">
                            <i class="fas fa-edit text-xs"></i>
                        </button>
                        <button onclick="adminManager.deleteProject(${project.id})" class="p-2 bg-utcRed/20 text-utcRed rounded-lg hover:bg-utcRed hover:text-white transition">
                            <i class="fas fa-trash text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        gsap.from(".project-card", {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out"
        });
    }

    openProjectModal(projectId = null) {
        const modal = document.getElementById('projectModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('projectForm');
        
        this.currentEditId = projectId;
        
        if (projectId) {
            const project = this.dataManager.getProjects().find(p => p.id === projectId);
            if (project) {
                modalTitle.textContent = 'Modifier le Projet';
                document.getElementById('projectId').value = project.id;
                document.getElementById('projectTitle').value = project.title;
                document.getElementById('projectDescription').value = project.description;
                document.getElementById('projectDate').value = project.date;
                document.getElementById('projectImage').value = project.image;
                document.getElementById('projectCategory').value = project.category;
                document.getElementById('projectTechnologies').value = project.technologies.join(', ');
                document.getElementById('projectFeatured').checked = project.featured;
            }
        } else {
            modalTitle.textContent = 'Ajouter un Projet';
            form.reset();
        }
        
        modal.classList.remove('hidden');
        
        gsap.from("#projectModal .liquid-glass", {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
    }

    closeProjectModal() {
        const modal = document.getElementById('projectModal');
        
        gsap.to("#projectModal .liquid-glass", {
            scale: 0.8,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                modal.classList.add('hidden');
                document.getElementById('projectForm').reset();
                this.currentEditId = null;
            }
        });
    }

    saveProject() {
        const projectData = {
            title: document.getElementById('projectTitle').value,
            description: document.getElementById('projectDescription').value,
            date: document.getElementById('projectDate').value,
            image: document.getElementById('projectImage').value,
            category: document.getElementById('projectCategory').value,
            technologies: document.getElementById('projectTechnologies').value.split(',').map(t => t.trim()),
            featured: document.getElementById('projectFeatured').checked
        };

        let result;
        if (this.currentEditId) {
            result = this.dataManager.updateProject(this.currentEditId, projectData);
            this.showNotification('Projet modifié avec succès!', 'success');
        } else {
            result = this.dataManager.addProject(projectData);
            this.showNotification('Projet ajouté avec succès!', 'success');
        }

        if (result) {
            this.closeProjectModal();
            this.loadProjects();
            this.loadStats();
        } else {
            this.showNotification('Erreur lors de la sauvegarde', 'error');
        }
    }

    editProject(projectId) {
        this.openProjectModal(projectId);
    }

    deleteProject(projectId) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce projet?')) {
            const result = this.dataManager.deleteProject(projectId);
            if (result) {
                this.showNotification('Projet supprimé avec succès!', 'success');
                this.loadProjects();
                this.loadStats();
            } else {
                this.showNotification('Erreur lors de la suppression', 'error');
            }
        }
    }

    exportData() {
        const data = {
            projects: this.dataManager.getProjects(),
            services: this.dataManager.getServices(),
            activities: this.dataManager.getActivities(),
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `unipro_data_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        this.showNotification('Données exportées avec succès!', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-24 right-6 z-[300] px-6 py-4 rounded-xl border-2 font-black text-sm uppercase tracking-widest transition-all duration-300 transform translate-x-full`;
        
        switch(type) {
            case 'success':
                notification.classList.add('bg-green-500/10', 'border-green-500', 'text-green-700');
                notification.innerHTML = `<i class="fas fa-check-circle mr-2"></i>${message}`;
                break;
            case 'error':
                notification.classList.add('bg-utcRed/10', 'border-utcRed', 'text-utcRed');
                notification.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message}`;
                break;
            default:
                notification.classList.add('bg-utcBlue/10', 'border-utcBlue', 'text-utcBlue');
                notification.innerHTML = `<i class="fas fa-info-circle mr-2"></i>${message}`;
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
            notification.classList.add('translate-x-0');
        }, 100);
        
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

let adminManager;
document.addEventListener('DOMContentLoaded', () => {
    adminManager = new AdminManager();
});

