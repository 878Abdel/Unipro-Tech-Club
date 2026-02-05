// Gestion du formulaire de contact
class ContactManager {
    constructor() {
        this.dataManager = new DataManager();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFAQ();
        this.checkURLParams();
    }

    setupEventListeners() {
        // Formulaire de contact
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm();
            });
        }
    }

    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const button = item.querySelector('button');
            const content = item.querySelector('div');
            const icon = button.querySelector('i');
            
            button.addEventListener('click', () => {
                // Toggle l'affichage du contenu
                content.classList.toggle('hidden');
                
                // Animation de l'icône
                if (content.classList.contains('hidden')) {
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.style.transform = 'rotate(180deg)';
                }
                
                // Animation du contenu
                if (!content.classList.contains('hidden')) {
                    gsap.from(content, {
                        height: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    checkURLParams() {
        // Vérifier s'il y a un paramètre de service dans l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const service = urlParams.get('service');
        
        if (service) {
            const subjectSelect = document.getElementById('subject');
            if (subjectSelect) {
                // Sélectionner le sujet correspondant
                for (let option of subjectSelect.options) {
                    if (option.value === 'projet' && service.toLowerCase().includes('projet')) {
                        subjectSelect.value = 'projet';
                        break;
                    } else if (option.value === 'devis' && service.toLowerCase().includes('devis')) {
                        subjectSelect.value = 'devis';
                        break;
                    }
                }
                
                // Pré-remplir le message
                const messageTextarea = document.getElementById('message');
                if (messageTextarea) {
                    messageTextarea.value = `Bonjour, je suis intéressé(e) par votre service : ${service}. Pourriez-vous me fournir plus d'informations ?`;
                }
            }
        }
    }

    handleContactForm() {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked,
            date: new Date().toISOString()
        };

        // Validation simple
        if (!this.validateForm(formData)) {
            return;
        }

        // Sauvegarder le message (simulé)
        this.saveContactMessage(formData);
        
        // Afficher le message de succès
        this.showSuccessMessage();
        
        // Réinitialiser le formulaire
        document.getElementById('contactForm').reset();
    }

    validateForm(data) {
        if (!data.name || data.name.trim().length < 2) {
            this.showError('Veuillez entrer un nom valide');
            return false;
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            this.showError('Veuillez entrer une adresse email valide');
            return false;
        }
        
        if (!data.subject) {
            this.showError('Veuillez sélectionner un sujet');
            return false;
        }
        
        if (!data.message || data.message.trim().length < 10) {
            this.showError('Veuillez entrer un message d\'au moins 10 caractères');
            return false;
        }
        
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    saveContactMessage(data) {
        // Récupérer les messages existants
        const messages = JSON.parse(localStorage.getItem('unipro_contact_messages') || '[]');
        
        // Ajouter le nouveau message
        messages.push({
            ...data,
            id: Date.now(),
            status: 'nouveau'
        });
        
        // Sauvegarder dans localStorage
        localStorage.setItem('unipro_contact_messages', JSON.stringify(messages));
        
        console.log('Message de contact sauvegardé:', data);
    }

    showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('hidden');
        
        // Animation d'apparition
        gsap.from(successMessage, {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        });
        
        // Auto-masquage après 5 secondes
        setTimeout(() => {
            gsap.to(successMessage, {
                y: -20,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    successMessage.classList.add('hidden');
                }
            });
        }, 5000);
    }

    showError(message) {
        // Créer une alerte d'erreur
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-24 right-6 z-[300] px-6 py-4 bg-utcRed/10 border-2 border-utcRed/30 rounded-xl';
        errorDiv.innerHTML = `
            <p class="text-sm font-black text-utcRed">
                <i class="fas fa-exclamation-circle mr-2"></i>
                ${message}
            </p>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Animation d'apparition
        gsap.from(errorDiv, {
            x: 50,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        // Auto-suppression après 3 secondes
        setTimeout(() => {
            gsap.to(errorDiv, {
                x: 50,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    document.body.removeChild(errorDiv);
                }
            });
        }, 3000);
    }
}

// Initialiser le gestionnaire de contact
let contactManager;
document.addEventListener('DOMContentLoaded', () => {
    contactManager = new ContactManager();
});
