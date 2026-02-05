gsap.registerPlugin(ScrollTrigger);

// Apparition du Hero Text
gsap.from(".hero-text-area > *", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "expo.out"
});

// Animation des cartes missions au scroll
gsap.from(".mission-card", {
    scrollTrigger: {
        trigger: "#mission-grid",
        start: "top 80%",
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "power4.out"
});

// Animation des cartes technologies
gsap.from(".liquid-glass.p-8.rounded-2xl", {
    scrollTrigger: {
        trigger: ".grid.grid-cols-2",
        start: "top 80%",
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.7)"
});

// Animation des barres de progression
ScrollTrigger.create({
    trigger: ".skill-item",
    start: "top 80%",
    onEnter: () => {
        document.querySelectorAll('[data-width]').forEach(bar => {
            const width = bar.getAttribute('data-width');
            gsap.to(bar, {
                width: width,
                duration: 1.5,
                ease: "power2.out",
                delay: 0.2
            });
        });
    }
});

// Animation des images de la galerie
gsap.from(".group.relative.overflow-hidden", {
    scrollTrigger: {
        trigger: ".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3",
        start: "top 80%",
    },
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out"
});

// Animation des statistiques
gsap.from(".liquid-glass.p-8.text-center", {
    scrollTrigger: {
        trigger: ".grid.grid-cols-2.md\\:grid-cols-4",
        start: "top 85%",
    },
    scale: 0.5,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "elastic.out(1, 0.5)"
});

// Blobs de fond
gsap.to("#blob1", {
    x: "40vw",
    y: "20vh",
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

gsap.to("#blob2", {
    x: "-20vw",
    y: "50vh",
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 1
});

// Animation du titre principal au chargement
gsap.from("h1", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: "power4.out",
    delay: 0.3
});

// Effet de parallaxe subtil sur les sections
gsap.utils.toArray("section").forEach(section => {
    gsap.to(section, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});