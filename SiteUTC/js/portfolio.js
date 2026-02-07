class PortfolioManager {
    constructor() {
        this.dataManager = new DataManager();
        this.currentFilter = 'Tous';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadProjects();
        this.setupFilters();
    }

    setupEventListeners() {
        document.getElementById('closeDetailModal').addEventListener('click', () => {
            this.closeDetailModal();
        });

        document.getElementById('detailModalOverlay').addEventListener('click', () => {
            this.closeDetailModal();
        });
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.max-w-7xl button');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-utcBlue', 'text-white');
                    btn.classList.add('border-utcBlue/20');
                });
                
                e.target.classList.add('bg-utcBlue', 'text-white');
                e.target.classList.remove('border-utcBlue/20');
                
                this.currentFilter = e.target.textContent.replace('_', '');
                this.loadProjects();
            });
        });
    }

    loadProjects() {
        const projects = this.dataManager.getProjects();
        const projectGrid = document.getElementById('project-grid');
        
        const filteredProjects = this.currentFilter === 'Tous' 
            ? projects 
            : projects.filter(p => p.category === this.currentFilter);
        
        if (filteredProjects.length === 0) {
            projectGrid.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <i class="fas fa-folder-open text-6xl mb-6 opacity-20"></i>
                    <p class="text-xl font-black uppercase opacity-50">Aucun projet trouvé</p>
                    <p class="text-sm opacity-30 mt-2">Essayez une autre catégorie</p>
                </div>
            `;
            return;
        }

        projectGrid.innerHTML = filteredProjects.map(project => `
            <div class="project-card liquid-glass rounded-3xl overflow-hidden group cursor-pointer transform transition-all duration-500 hover:scale-105" data-id="${project.id}">
                <div class="relative h-80 overflow-hidden">
                    <img src="${project.image}" alt="${project.title}" 
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-utcBlue/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div class="p-8 text-white w-full">
                            <div class="flex items-center justify-between mb-4">
                                <span class="px-3 py-1 bg-utcRed text-white text-xs font-black rounded-full">
                                    ${project.category}
                                </span>
                                ${project.featured ? '<span class="px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-black rounded-full"><i class="fas fa-star mr-1"></i>Featured</span>' : ''}
                            </div>
                            <h3 class="text-2xl font-black mb-2">${project.title}</h3>
                            <p class="text-sm opacity-90 mb-4">${project.description}</p>
                            <button onclick="portfolioManager.showProjectDetail(${project.id})" class="px-4 py-2 bg-white text-utcBlue text-xs font-black uppercase rounded-lg hover:bg-utcRed hover:text-white transition">
                                <i class="fas fa-eye mr-2"></i>Voir les détails
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-8">
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-xs font-black uppercase tracking-[0.3em] opacity-50">
                            <i class="fas fa-calendar mr-2"></i>${new Date(project.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span class="text-xs font-black uppercase tracking-[0.3em] opacity-50">
                            <i class="fas fa-code mr-2"></i>${project.technologies.length} technologies
                        </span>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        ${project.technologies.map(tech => `
                            <span class="px-2 py-1 bg-utcBlue/10 text-utcBlue text-xs font-black rounded">
                                ${tech}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        gsap.from(".project-card", {
            scrollTrigger: {
                trigger: ".project-card",
                start: "top 85%"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    showProjectDetail(projectId) {
        const project = this.dataManager.getProjects().find(p => p.id === projectId);
        if (!project) return;

        const modal = document.getElementById('projectDetailModal');
        const detailContent = document.getElementById('projectDetailContent');
        const detailTitle = document.getElementById('detailTitle');

        detailTitle.innerHTML = `
            <i class="fas fa-project-diagram mr-3 text-utcBlue"></i>
            ${project.title}
        `;

        detailContent.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Image principale -->
                <div class="space-y-4">
                    <img src="${project.image}" alt="${project.title}" 
                         class="w-full h-80 object-cover rounded-2xl">
                    <div class="grid grid-cols-3 gap-2">
                        ${[1, 2, 3].map(i => `
                            <img src="https://picsum.photos/seed/project${projectId}_${i}/300/200.jpg" 
                                 alt="Detail ${i}" class="w-full h-24 object-cover rounded-lg">
                        `).join('')}
                    </div>
                </div>
                
                <!-- Informations détaillées -->
                <div class="space-y-6">
                    <div>
                        <h4 class="text-lg font-black uppercase mb-3">Description</h4>
                        <p class="text-sm opacity-70 leading-relaxed">${project.description}</p>
                    </div>
                    
                    <div>
                        <h4 class="text-lg font-black uppercase mb-3">Informations</h4>
                        <div class="space-y-2">
                            <div class="flex justify-between text-sm">
                                <span class="opacity-50">Date de réalisation:</span>
                                <span class="font-black">${new Date(project.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="opacity-50">Catégorie:</span>
                                <span class="font-black">${project.category}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="opacity-50">Statut:</span>
                                <span class="font-black text-utcRed">${project.featured ? 'En vedette' : 'Standard'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="text-lg font-black uppercase mb-3">Technologies utilisées</h4>
                        <div class="flex flex-wrap gap-2">
                            ${project.technologies.map(tech => `
                                <span class="px-3 py-2 bg-utcBlue text-white text-xs font-black rounded-lg">
                                    <i class="fas fa-code mr-1"></i>${tech}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="text-lg font-black uppercase mb-3">Caractéristiques</h4>
                        <ul class="space-y-2 text-sm opacity-70">
                            <li class="flex items-center">
                                <i class="fas fa-check text-utcRed mr-3"></i>
                                Design moderne et responsive
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-check text-utcRed mr-3"></i>
                                Performance optimisée
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-check text-utcRed mr-3"></i>
                                Code maintenable et documenté
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-check text-utcRed mr-3"></i>
                                Tests unitaires inclus
                            </li>
                        </ul>
                    </div>
                    
                    <div class="flex gap-4 pt-4">
                        <button class="flex-1 brutalist-card bg-utcBlue text-white py-3 font-black text-sm uppercase tracking-widest hover:bg-utcRed transition">
                            <i class="fas fa-external-link-alt mr-2"></i>
                            Voir le projet
                        </button>
                        <button class="flex-1 px-4 py-3 bg-white/50 border-2 border-utcRed/20 rounded-xl font-black text-sm uppercase hover:border-utcRed hover:bg-white/80 transition">
                            <i class="fab fa-github mr-2"></i>
                            Code source
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        
        gsap.from("#projectDetailModal .liquid-glass", {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
    }

    closeDetailModal() {
        const modal = document.getElementById('projectDetailModal');
        
        gsap.to("#projectDetailModal .liquid-glass", {
            scale: 0.8,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                modal.classList.add('hidden');
            }
        });
    }
}

let portfolioManager;
document.addEventListener('DOMContentLoaded', () => {
    portfolioManager = new PortfolioManager();
});
