import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initStory() {

    // ─── Hero Entrance ────────────────────────
    const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTL
        .from('.hero-subtitle', { duration: 1, y: 20, opacity: 0, delay: 0.5 })
        .from('.hero-heading', { duration: 1.5, y: 40, opacity: 0, scale: 0.97 }, '-=0.6')
        .from('.hero-heart-inner', { duration: 2, scale: 0.8, opacity: 0 }, '-=1.2')
        .from('.scroll-indicator', { duration: 0.8, opacity: 0, y: 20 }, '-=0.5');

    // ─── Section: Beginning ────────────────────────
    gsap.fromTo('.section-hero-heading h2',
        { y: 60, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 1.2, ease: 'power2.out',
            scrollTrigger: { trigger: '#beginning', start: 'top 75%', toggleActions: 'play none none reverse' }
        }
    );

    gsap.fromTo('.section-hero-heading p',
        { y: 30, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power2.out',
            scrollTrigger: { trigger: '#beginning', start: 'top 70%', toggleActions: 'play none none reverse' }
        }
    );

    // Timeline nodes
    document.querySelectorAll('.timeline-node').forEach((node, i) => {
        gsap.fromTo(node,
            { y: 80, opacity: 0, scale: 0.95 },
            {
                y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out',
                scrollTrigger: { trigger: node, start: 'top 80%', toggleActions: 'play none none reverse' }
            }
        );
    });

    // ─── Section: Roses ────────────────────────
    gsap.fromTo('.roses-content',
        { y: 60, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 1.5, ease: 'power2.out',
            scrollTrigger: { trigger: '#falling', start: 'top 60%', toggleActions: 'play none none reverse' }
        }
    );

    // ─── Section: Reasons Cards ────────────────────────
    const reasons = [
        { title: 'You are my peace', text: 'In the middle of every storm, you are the calm that guides me home.', icon: '✨' },
        { title: 'That Smile', text: 'Your smile makes my worst days better and my best days unforgettable.', icon: '😊' },
        { title: 'Your Heart', text: 'The way you listen with your heart and care for everyone around you.', icon: '💗' },
        { title: 'Pure Kindness', text: "Your kindness is my favorite thing about you; it's a light in this world.", icon: '🤝' },
        { title: 'Feeling Like Home', text: 'How you make every house feel like a home just by being in it.', icon: '🏠' },
        { title: 'Your Laugh', text: 'Your laugh is my favorite song. I could listen to it on repeat forever.', icon: '🎵' },
    ];

    const cardsContainer = document.getElementById('cards-container');
    if (cardsContainer) {
        reasons.forEach((reason) => {
            const card = document.createElement('div');
            card.className = 'glass-card reason-card';
            card.innerHTML = `
        <div class="icon-circle">
          <span style="font-size:1.5rem;">${reason.icon}</span>
        </div>
        <h3>${reason.title}</h3>
        <p>${reason.text}</p>
      `;
            cardsContainer.appendChild(card);
        });

        // Stagger cards in
        gsap.fromTo('.reason-card',
            { y: 60, opacity: 0, rotateX: 10 },
            {
                y: 0, opacity: 1, rotateX: 0,
                duration: 0.8, stagger: 0.12, ease: 'back.out(1.2)',
                scrollTrigger: { trigger: '#reasons', start: 'top 65%', toggleActions: 'play none none reverse' }
            }
        );
    }

    // ─── Reasons header ────────────────────────
    gsap.fromTo('.reasons-header',
        { y: 40, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '#reasons', start: 'top 75%', toggleActions: 'play none none reverse' }
        }
    );

    // ─── Section: Final ────────────────────────
    gsap.fromTo('.final-heart-wrap',
        { scale: 0.7, opacity: 0 },
        {
            scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out',
            scrollTrigger: { trigger: '#ending', start: 'top 70%', toggleActions: 'play none none reverse' }
        }
    );

    gsap.fromTo('.final-subtitle',
        { y: 20, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 0.8, delay: 0.2,
            scrollTrigger: { trigger: '#ending', start: 'top 65%', toggleActions: 'play none none reverse' }
        }
    );

    gsap.fromTo('.final-heading',
        { y: 30, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 1, delay: 0.4,
            scrollTrigger: { trigger: '#ending', start: 'top 60%', toggleActions: 'play none none reverse' }
        }
    );

    gsap.fromTo('.cta-wrapper',
        { y: 20, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 0.8, delay: 0.6,
            scrollTrigger: { trigger: '#ending', start: 'top 55%', toggleActions: 'play none none reverse' }
        }
    );

    // ─── Valentine Button ────────────────────────
    const yesBtn = document.getElementById('yes-btn');
    const foreverMsg = document.getElementById('forever-msg');

    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            yesBtn.classList.add('clicked');
            yesBtn.querySelector('span:first-child').textContent = 'Forever & Always';

            if (foreverMsg) {
                setTimeout(() => foreverMsg.classList.add('visible'), 500);
            }

            // Confetti
            launchConfetti();

            gsap.fromTo(yesBtn,
                { scale: 1 },
                { scale: 1.08, duration: 0.3, yoyo: true, repeat: 2, ease: 'power2.inOut' }
            );
        });
    }
}

// ─── Confetti ────────────────────────
function launchConfetti() {
    const emojis = ['❤️', '💖', '💕', '💗', '💘', '✨', '🌹', '🥰'];
    const count = 60;

    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.top = '-5vh';
        piece.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
        piece.style.animationDuration = (Math.random() * 3 + 2) + 's';
        piece.style.animationDelay = (Math.random() * 1.5) + 's';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 6000);
    }
}
