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
                content.classList.toggle('hidden');
                
                if (content.classList.contains('hidden')) {
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.style.transform = 'rotate(180deg)';
                }
                
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
        const urlParams = new URLSearchParams(window.location.search);
        const service = urlParams.get('service');
        
        if (service) {
            const subjectSelect = document.getElementById('subject');
            if (subjectSelect) {
                for (let option of subjectSelect.options) {
                    if (option.value === 'projet' && service.toLowerCase().includes('projet')) {
                        subjectSelect.value = 'projet';
                        break;
                    } else if (option.value === 'devis' && service.toLowerCase().includes('devis')) {
                        subjectSelect.value = 'devis';
                        break;
                    }
                }
                
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

        if (!this.validateForm(formData)) {
            return;
        }

        this.saveContactMessage(formData);
        
        this.showSuccessMessage();
        
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
        const messages = JSON.parse(localStorage.getItem('unipro_contact_messages') || '[]');
        
        messages.push({
            ...data,
            id: Date.now(),
            status: 'nouveau'
        });
        
        localStorage.setItem('unipro_contact_messages', JSON.stringify(messages));
        
        console.log('Message de contact sauvegardé:', data);
    }

    showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('hidden');
        
        gsap.from(successMessage, {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        });
        
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
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-24 right-6 z-[300] px-6 py-4 bg-utcRed/10 border-2 border-utcRed/30 rounded-xl';
        errorDiv.innerHTML = `
            <p class="text-sm font-black text-utcRed">
                <i class="fas fa-exclamation-circle mr-2"></i>
                ${message}
            </p>
        `;
        
        document.body.appendChild(errorDiv);
        
        gsap.from(errorDiv, {
            x: 50,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
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

let contactManager;
document.addEventListener('DOMContentLoaded', () => {
    contactManager = new ContactManager();
});

