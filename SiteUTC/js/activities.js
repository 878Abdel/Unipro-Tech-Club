// Gestion des activités dynamiques
class ActivitiesManager {
    constructor() {
        this.dataManager = new DataManager();
        this.init();
    }

    init() {
        this.loadActivities();
    }

    loadActivities() {
        const activities = this.dataManager.getActivities();
        const activitiesGrid = document.getElementById('activities-grid');
        
        if (!activitiesGrid) return;
        
        if (activities.length === 0) {
            activitiesGrid.innerHTML = `
                <div class="col-span-full text-center py-20">
                    <i class="fas fa-calendar-alt text-6xl mb-6 opacity-20"></i>
                    <p class="text-xl font-black uppercase opacity-50">Aucune activité prévue</p>
                    <p class="text-sm opacity-30 mt-2">Revenez bientôt pour découvrir nos événements</p>
                </div>
            `;
            return;
        }

        // Afficher seulement les 3 activités les plus récentes
        const recentActivities = activities
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);

        activitiesGrid.innerHTML = recentActivities.map(activity => `
            <div class="activity-card liquid-glass rounded-3xl p-8 border-4 border-white/40 group hover:scale-105 transition-all duration-500">
                <div class="relative h-48 overflow-hidden rounded-2xl mb-6">
                    <img src="${activity.image}" alt="${activity.title}" 
                         class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-utcBlue/90 to-transparent flex items-end">
                        <div class="p-6">
                            <span class="px-3 py-1 bg-utcRed text-white text-xs font-black rounded-full">
                                ${activity.type}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <h3 class="text-xl font-black uppercase mb-2">${activity.title}</h3>
                        <div class="flex items-center gap-4 text-sm opacity-70">
                            <span class="flex items-center">
                                <i class="fas fa-calendar mr-2"></i>
                                ${new Date(activity.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                            <span class="flex items-center">
                                <i class="fas fa-map-marker-alt mr-2"></i>
                                ${activity.location}
                            </span>
                        </div>
                    </div>
                    
                    <p class="text-sm opacity-70 leading-relaxed mb-4">${activity.description}</p>
                    
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <i class="fas fa-users text-utcRed mr-2"></i>
                            <span class="text-sm font-black">${activity.participants} participants</span>
                        </div>
                        
                        <button class="px-4 py-2 bg-utcBlue text-white text-xs font-black uppercase rounded-lg hover:bg-utcRed transition">
                            <i class="fas fa-info-circle mr-2"></i>
                            Détails
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Animation d'apparition des cartes
        gsap.from(".activity-card", {
            scrollTrigger: {
                trigger: ".activity-card",
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

// Initialiser le gestionnaire d'activités
let activitiesManager;
document.addEventListener('DOMContentLoaded', () => {
    activitiesManager = new ActivitiesManager();
});
