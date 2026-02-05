// --- 1. BACKGROUND FIXE PROFESSIONNEL ---
const canvas = document.getElementById('tech-bg');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Éléments géométriques flottants
class TechShape {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 60 + 20;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.type = Math.floor(Math.random() * 3); // 0: carré, 1: triangle, 2: hexagone
        this.opacity = Math.random() * 0.1 + 0.02;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        // Rebondir sur les bords
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.type === 0 ? 'rgba(45, 51, 130, ' + this.opacity + ')' : 
                        this.type === 1 ? 'rgba(227, 30, 36, ' + this.opacity + ')' : 
                        'rgba(45, 51, 130, ' + this.opacity + ')';
        ctx.strokeStyle = 'rgba(45, 51, 130, ' + (this.opacity * 2) + ')';
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        if (this.type === 0) {
            // Carré
            ctx.rect(-this.size/2, -this.size/2, this.size, this.size);
        } else if (this.type === 1) {
            // Triangle
            ctx.moveTo(0, -this.size/2);
            ctx.lineTo(-this.size/2, this.size/2);
            ctx.lineTo(this.size/2, this.size/2);
            ctx.closePath();
        } else {
            // Hexagone
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const x = Math.cos(angle) * this.size/2;
                const y = Math.sin(angle) * this.size/2;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
        }
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}

const shapes = Array(25).fill().map(() => new TechShape());

function draw() {
    // Fond dégradé professionnel
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(0.5, '#f1f5f9');
    gradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grille subtile
    ctx.strokeStyle = 'rgba(45, 51, 130, 0.03)';
    ctx.lineWidth = 1;
    const gridSize = 50;
    
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    
    // Dessiner les formes géométriques
    shapes.forEach(shape => {
        shape.update();
        shape.draw();
    });
}

function animate() {
    draw();
    requestAnimationFrame(animate);
}
animate();

// --- 2. TILT 3D "LIQUID GLASS" ---
const card = document.querySelector('#tilt-card');
const shine = document.querySelector('#glass-shine');

if (card && shine) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const rotateX = (y - (rect.height / 2)) / 8;
        const rotateY = ((rect.width / 2) - x) / 8;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        
        // Réfraction du verre (Lueur qui suit la souris)
        const moveX = (x / rect.width) * 100;
        const moveY = (y / rect.height) * 100;
        shine.style.background = `radial-gradient(circle at ${moveX}% ${moveY}%, rgba(255,255,255,0.4) 0%, transparent 75%)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        shine.style.background = `none`;
    });
}