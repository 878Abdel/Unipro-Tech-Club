// Gestion des services dynamiques
class ServicesManager {
    constructor() {
        this.dataManager = new DataManager();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadServices();
    }

    setupEventListeners() {
        // Filtres de services
        const filterButtons = document.querySelectorAll('.service-filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Mettre à jour le style des boutons
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-utcBlue', 'text-white');
                    btn.classList.add('border-utcBlue/20');
                });
                
                e.target.classList.add('bg-utcBlue', 'text-white');
                e.target.classList.remove('border-utcBlue/20');
                
                // Filtrer les services
                this.currentFilter = e.target.dataset.category;
                this.loadServices();
            });
        });
    }

    loadServices() {
        const services = this.dataManager.getServices();
        const servicesGrid = document.getElementById('services-grid');
        
        // Filtrer les services
        const filteredServices = this.currentFilter === 'all' 
            ? services 
            : services.filter(s => s.category === this.currentFilter);
        
        if (filteredServices.length === 0) {
            servicesGrid.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <i class="fas fa-cogs text-6xl mb-6 opacity-20"></i>
                    <p class="text-xl font-black uppercase opacity-50">Aucun service trouvé</p>
                    <p class="text-sm opacity-30 mt-2">Essayez une autre catégorie</p>
                </div>
            `;
            return;
        }

        servicesGrid.innerHTML = filteredServices.map(service => `
            <div class="service-card liquid-glass rounded-3xl p-8 border-4 border-white/40 group hover:scale-105 transition-all duration-500">
                <div class="relative h-48 overflow-hidden rounded-2xl mb-6">
                    <img src="${service.image}" alt="${service.title}" 
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-utcBlue/80 to-transparent flex items-end">
                        <div class="p-4">
                            <span class="px-3 py-1 bg-utcRed text-white text-xs font-black rounded-full">
                                ${service.category}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <h3 class="text-2xl font-black uppercase mb-2">${service.title}</h3>
                        <div class="text-lg font-black text-utcRed mb-4">${service.price}</div>
                    </div>
                    
                    <p class="text-sm opacity-70 leading-relaxed">${service.description}</p>
                    
                    <div class="space-y-2">
                        <h4 class="text-xs font-black uppercase tracking-[0.3em] opacity-50">Caractéristiques:</h4>
                        <ul class="space-y-1">
                            ${service.features.map(feature => `
                                <li class="text-xs opacity-60 flex items-center">
                                    <i class="fas fa-check text-utcRed mr-2"></i>
                                    ${feature}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <div class="pt-4 flex gap-4">
                        <a href="contact.html?service=${encodeURIComponent(service.title)}" 
                           class="flex-1 brutalist-card bg-utcBlue text-white py-3 font-black text-xs uppercase tracking-widest text-center hover:bg-utcRed transition">
                            <i class="fas fa-envelope mr-2"></i>
                            Demander un devis
                        </a>
                        <button class="px-4 py-3 bg-white/50 border-2 border-utcRed/20 rounded-xl font-black text-xs uppercase hover:border-utcRed hover:bg-white/80 transition">
                            <i class="fas fa-info-circle mr-2"></i>
                            Détails
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Animation d'apparition des cartes
        gsap.from(".service-card", {
            scrollTrigger: {
                trigger: ".service-card",
                start: "top 85%"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });
    }
}

// Initialiser le gestionnaire de services
let servicesManager;
document.addEventListener('DOMContentLoaded', () => {
    servicesManager = new ServicesManager();
});
