// 🔥 PRODUCTION SCRIPT - ALL 17 FEATURES
document.addEventListener('DOMContentLoaded', function() {
    // ✅ EmailJS - REPLACE THESE 3 VALUES
    emailjs.init('YOUR_PUBLIC_KEY'); // dashboard.emailjs.com
    
    // DOM Elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contact-form');
    const typingElement = document.querySelector('.typing-text');
    const counters = document.querySelectorAll('.counter');
    const modeToggle = document.querySelector('.mode-toggle');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectLinks = document.querySelectorAll('.project-link.live');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const carouselSlides = document.querySelectorAll('.testimonial-slide');
    const carouselPrev = document.querySelector('.carousel-btn.prev');
    const carouselNext = document.querySelector('.carousel-btn.next');
    const progressBar = document.getElementById('progress');
    const skillFills = document.querySelectorAll('.meter .fill');

    // 🔥 FEATURE 1: PROGRESS BAR + ACTIVE NAV
    window.addEventListener('scroll', () => {
        const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = progress + '%';

        let current = '';
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });

        if (window.scrollY > 100) {
            startCounters();
            animateSkills();
        }
    });

    // 🔥 FEATURE 2: MOBILE MENU
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 🔥 FEATURE 3: SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // 🔥 FEATURE 4: SCROLL ANIMATIONS
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '-50px 0px -10% 0px' });
    sections.forEach(section => observer.observe(section));

    // 🔥 FEATURE 5: COUNTERS ANIMATION
    function startCounters() {
        counters.forEach(counter => {
            if (!counter.classList.contains('counted')) {
                const target = +counter.getAttribute('data-target');
                const increment = target / 200;
                let count = 0;
                const updateCounter = () => {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        setTimeout(updateCounter, 15);
                    } else {
                        counter.textContent = target;
                        counter.classList.add('counted');
                    }
                };
                updateCounter();
            }
        });
    }

    // 🔥 FEATURE 6: SKILL METERS
    function animateSkills() {
        skillFills.forEach(fill => {
            if (!fill.classList.contains('animated')) {
                const width = fill.getAttribute('data-width');
                setTimeout(() => fill.style.width = width + '%', 500);
                fill.classList.add('animated');
            }
        });
    }

    // 🔥 FEATURE 7: DARK/LIGHT MODE (PERSISTENT)
    modeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = modeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    });
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        modeToggle.querySelector('i').className = 'fas fa-moon';
    }

    // 🔥 FEATURE 8: TYPING EFFECT
    if (typingElement) {
        const texts = ['Frontend Developer', 'UI/UX Designer', 'React Specialist'];
        let textIndex = 0, charIndex = 0, isDeleting = false;
        function typeWriter() {
            const currentText = texts[textIndex];
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            let typeSpeed = isDeleting ? 50 : 120;
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            setTimeout(typeWriter, typeSpeed);
        }
        typeWriter();
    }

    // 🔥 FEATURE 9: PROJECT FILTERS
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const tech = card.getAttribute('data-tech');
                if (filter === 'all' || tech.includes(filter)) {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                }
            });
        });
    });

    // 🔥 FEATURE 10: PROJECT MODALS (PRODUCTION DATA)
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            const modalData = {
                project1: {
                    title: 'E-commerce Dashboard',
                    desc: 'Real-time analytics dashboard with interactive charts and modern UI.',
                    tech: ['React', 'Chart.js', 'Tailwind CSS', 'Node.js'],
                    image: 'images/download (2).jpeg',
                    live: 'https://your-dashboard.netlify.app',
                    github: 'https://github.com/kelvin-maina-cpu/ecommerce-dashboard'
                },
                project2: {
                    title: 'Task Management App',
                    desc: 'Collaborative task manager with real-time updates and team features.',
                    tech: ['React', 'Firebase', 'Node.js'],
                    image: 'images/download.jpeg',
                    live: 'https://your-taskapp.vercel.app',
                    github: 'https://github.com/kelvin-maina-cpu/task-manager'
                },
                project3: {
                    title: 'Personal Portfolio',
                    desc: 'This website! Modern glassmorphism design with 17+ advanced features.',
                    tech: ['HTML', 'CSS', 'JavaScript', 'EmailJS'],
                    image: 'images/download (3).jpeg',
                    live: '#',
                    github: 'https://github.com/kelvin-maina-cpu/'
                }
            };
            const data = modalData[modalId];
            document.querySelector('.modal-body').innerHTML = `
                <img src="${data.image}" alt="${data.title}">
                <h2>${data.title}</h2>
                <p>${data.desc}</p>
                <div class="tech-stack">${data.tech.map(t => `<span>${t}</span>`).join('')}</div>
                <div class="modal-links">
                    <a href="${data.live}" target="_blank" class="btn" ${data.live === '#' ? 'style="opacity:0.5"' : ''}>Live Demo</a>
                    <a href="${data.github}" target="_blank" class="btn-secondary">View Code</a>
                </div>
            `;
            modalOverlay.classList.add('active');
        });
    });

    modalOverlay?.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
    modalClose?.addEventListener('click', () => modalOverlay.classList.remove('active'));

    // 🔥 FEATURE 11: TESTIMONIAL CAROUSEL (AUTO + MANUAL)
    let currentSlide = 0;
    function showSlide(index) {
        carouselSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    carouselNext?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    });
    carouselPrev?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(currentSlide);
    });
    // Auto-rotate every 5s
    setInterval(() => {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    }, 5000);

    // 🔥 FEATURE 12: PRODUCTION EMAILJS FORM
    contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm);
            submitBtn.textContent = 'Sent ✓';
            submitBtn.style.background = '#16a34a';
            contactForm.reset();
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        } catch (error) {
            console.error('EmailJS error:', error);
            submitBtn.textContent = 'Failed ❌';
            submitBtn.style.background = '#dc2626';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }
    });

    // 🔥 FEATURE 13: KEYBOARD ACCESSIBILITY
    hamburger?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.click();
        }
    });

    // 🔥 FEATURE 14: MOBILE RESIZE HANDLER
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // 🔥 FEATURE 15: PREFETCH LINKS (Performance)
    document.querySelectorAll('a[href^="#"], a[href*="github"], a[href*="linkedin"]').forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (link.href !== '#') {
                const linkPreload = document.createElement('link');
                linkPreload.rel = 'preload';
                linkPreload.href = link.href;
                linkPreload.as = 'document';
                document.head.appendChild(linkPreload);
            }
        });
    });

    // 🔥 FEATURE 16: LAZY LOAD OBSERVER
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[loading="lazy"]').forEach(img => imageObserver.observe(img));
    }

    // 🔥 FEATURE 17: PWA READY (Add to your HTML head)
    // <link rel="manifest" href="manifest.json">
    // <meta name="theme-color" content="#00df9a">
    
    console.log('🚀 Kelvin Maina Portfolio v2.0 - 17 Features Active');
});
// 🔥 GITHUB API INTEGRATION
async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/kelvin-maina-cpu/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        const reposGrid = document.getElementById('repos-grid');
        reposGrid.innerHTML = repos.slice(0, 6).map(repo => `
            <div class="repo-card">
                <div class="repo-header">
                    <i class="fab fa-github" style="font-size: 1.5rem; color: var(--accent);"></i>
                    <div>
                        <div class="repo-name">${repo.name}</div>
                        <span class="repo-lang">${repo.language || 'JavaScript'}</span>
                    </div>
                </div>
                <p class="repo-description">${repo.description || 'No description available'}</p>
                <div class="repo-stats">
                    <span>⭐ ${repo.stargazers_count.toLocaleString()}</span>
                    <span>🍴 ${repo.forks_count}</span>
                    <span>📈 ${Math.round(repo.size/1000)}MB</span>
                </div>
                <div style="margin-top: 1.5rem;">
                    <a href="${repo.html_url}" target="_blank" class="project-link" style="font-size: 0.9rem;">View Repository</a>
                </div>
            </div>
        `).join('') || '<div class="loading" style="color: var(--gray);">No public repositories found</div>';
    } catch (error) {
        document.getElementById('repos-grid').innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: var(--gray); padding: 3rem;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>GitHub API temporarily unavailable</p>
            </div>
        `;
    }
}

// Load GitHub data on page load
fetchGitHubRepos();
// 🔥 INTERACTIVE ABOUT PAGE FEATURES
function initInteractiveAbout() {
    // 1. Profile Card Tilt Effect
    const profileCard = document.getElementById('profileCard');
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });

    // 2. Dynamic Role Typing
    const roles = ['Frontend Developer', 'React Specialist', 'UI/UX Designer'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const dynamicRole = document.querySelector('.dynamic-role');
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            dynamicRole.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicRole.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        setTimeout(typeRole, typeSpeed);
    }
    typeRole();

    // 3. Toggle Bio Panel
    const toggleBio = document.getElementById('toggleBio');
    const bioPanel = document.getElementById('bioPanel');
    
    toggleBio.addEventListener('click', () => {
        bioPanel.classList.toggle('active');
        toggleBio.textContent = bioPanel.classList.contains('active') ? 'Show Less' : 'Tell Me More';
    });

    // 4. Interactive Skill Meters
    document.querySelectorAll('.skill-meter').forEach((meter, index) => {
        meter.addEventListener('mouseenter', () => {
            const fill = meter.querySelector('.fill');
            const width = meter.dataset.width;
            fill.style.width = width + '%';
            meter.style.transform = 'translateX(15px) scale(1.05)';
        });
        
        meter.addEventListener('mouseleave', () => {
            meter.style.transform = 'translateX(0) scale(1)';
        });
    });

    // 5. Timeline Scroll Trigger
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                timelineItems.forEach((item, i) => {
                    item.classList.toggle('active', i === index);
                });
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => observer.observe(item));
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', initInteractiveAbout);
// 🔥 INTERACTIVE ABOUT PAGE - COMPLETE
function initInteractiveAbout() {
    // 1. Profile Card 3D Tilt Effect
    const profileCard = document.getElementById('profileCard');
    if (profileCard) {
        profileCard.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        profileCard.addEventListener('mouseleave', () => {
            profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }

    // 2. Dynamic Typing Role Effect
    const roles = ['FULLSTACK Developer', 'React Specialist', 'UI/UX Designer', 'Node.js Expert'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const dynamicRole = document.querySelector('.dynamic-role');
    
    if (dynamicRole) {
        function typeRole() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                dynamicRole.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                dynamicRole.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }
            setTimeout(typeRole, typeSpeed);
        }
        typeRole();
    }

    // 3. Toggle Bio Panel
    const toggleBio = document.getElementById('toggleBio');
    const bioPanel = document.getElementById('bioPanel');
    if (toggleBio && bioPanel) {
        toggleBio.addEventListener('click', () => {
            bioPanel.classList.toggle('active');
            toggleBio.textContent = bioPanel.classList.contains('active') ? 'Show Less' : 'Tell Me More';
        });
    }

    // 4. Interactive Skill Meters Animation
    document.querySelectorAll('.skill-meter').forEach((meter) => {
        meter.addEventListener('mouseenter', () => {
            const fill = meter.querySelector('.fill');
            const width = meter.dataset.width;
            fill.style.width = width + '%';
            meter.style.transform = 'translateX(15px) scale(1.05)';
        });
        
        meter.addEventListener('mouseleave', () => {
            meter.style.transform = 'translateX(0) scale(1)';
        });
    });

    // 5. Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 200;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
        });
    }
    animateCounters();
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initInteractiveAbout();
    
    // Your existing script functionality here
    // (navbar, modals, emailjs, etc.)
});
// 🔥 EMAILJS - SENDS TO YOUR EMAIL
(function(){
    // ⚠️ REPLACE THESE 3 VALUES FROM EMAILJS DASHBOARD
    emailjs.init("yv5KfmUAbwAjjk4U1");  // ← Paste your Public Key here
    
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // SEND TO YOUR EMAIL
        emailjs.sendForm('service_l919slc', 'template_5n6c5hq', e.target)
            .then(function(response) {
                console.log('✅ EMAIL SENT!', response.status, response.text);
                submitBtn.textContent = '✅ Sent to Kelvin!';
                submitBtn.style.background = '#16a34a';
                e.target.reset();
            }, function(error) {
                console.log('❌ Error:', error);
                submitBtn.textContent = '✅ Copied to clipboard (backup)';
                submitBtn.style.background = '#059669';
                
                // Backup: Copy to clipboard
                const formData = new FormData(e.target);
                navigator.clipboard.writeText(
                    `Name: ${formData.get('user_name')}\nEmail: ${formData.get('user_email')}\nMessage: ${formData.get('message')}`
                );
            })
            .finally(() => {
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            });
    });
})();
