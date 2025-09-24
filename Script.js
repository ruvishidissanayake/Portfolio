/* === Loading Screen === */
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;

    // Simulate loading time (you can adjust this)
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        body.classList.add('loaded');

        // Remove loading screen from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 800);

        // Start scroll animations after loading
        setTimeout(() => {
            initScrollAnimations();
            initTypingAnimation(); // Start typing animation after loading
            initSkillBarAnimations(); // Start skill bar animations after loading
        }, 100);
    }, 2500); // 2.5 seconds loading time
});

/* === Scroll Animations === */
function initScrollAnimations() {
    // Create intersection observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Create intersection observer for images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all images
    const images = document.querySelectorAll('.home-img img, .about-img img');
    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Create intersection observer for services boxes with stagger effect
    const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const servicesBoxes = entry.target.querySelectorAll('.services-box');
                servicesBoxes.forEach((box, index) => {
                    setTimeout(() => {
                        box.classList.add('animate');
                    }, index * 200); // Stagger animation by 200ms
                });
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe services section
    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
        servicesObserver.observe(servicesSection);
    }

    // Create intersection observer for timeline items with stagger effect
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timelineItems = entry.target.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 300); // Stagger animation by 300ms
                    item.style.transitionDelay = `${index * 0.1}s`;
                });
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe education section
    const educationSection = document.querySelector('.education-certifications');
    if (educationSection) {
        timelineObserver.observe(educationSection);
    }

    // Create intersection observer for skills section
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const fill = bar.querySelector('.skill-bar-fill');
                        const percent = bar.getAttribute('data-percent');
                        fill.style.width = percent;
                    }, index * 200); // Stagger animation by 200ms
                });
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe skills section
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Create intersection observer for certifications
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe certifications
    const certifications = document.querySelector('.certifications');
    if (certifications) {
        certObserver.observe(certifications);
    }

    // Create intersection observer for contact section
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe contact section
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }
}

/* === Skill Bar Animations === */
function initSkillBarAnimations() {
    const skillSection = document.querySelector('.skills-section');
    if (!skillSection) return;

    const skillBars = skillSection.querySelectorAll('.skill-bar');

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const fill = bar.querySelector('.skill-bar-fill');
                    const percent = bar.getAttribute('data-percent');
                    fill.style.width = percent;
                });
                observer.unobserve(skillSection);
            }
        });
    }, {
        threshold: 0.5
    });

    skillObserver.observe(skillSection);
}



/* === Toggle icon navbar === */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');   // Toggle cross icon
    navbar.classList.toggle('active');   // Toggle visibility of navbar
};

/* === Scroll section active link === */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {
    let currentSectionId = "";

    sections.forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 300; // Offset to trigger the section in view (increased for better visibility)
        let height = section.offsetHeight;
        let id = section.getAttribute("id");

        if (top >= offset && top < offset + height) {
            currentSectionId = id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(currentSectionId)) {
            link.classList.add("active"); // Add active class to the corresponding link
        }
    });

    // Sticky navbar effect when scrolling
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 100);

    /* === Remove toggle icon and navbar when click navbar link (scroll) === */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* === Typing Animation === */
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    const titles = [
        'Cyber Security Undergraduate',
        'Website Designer Front End',
        'Video Editing',
        'Logo & Branding Designing',
        'UI/UX Designing'
    ];

    let currentTitleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function type() {
        const currentTitle = titles[currentTitleIndex];

        if (isDeleting) {
            // Deleting characters - stop cursor blinking
            cursor.classList.remove('blink');
            cursor.classList.add('no-blink');

            typingText.textContent = currentTitle.substring(0, currentCharIndex - 1);
            currentCharIndex--;

            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                setTimeout(type, 500); // Pause before starting next title
                return;
            }
        } else {
            // Typing characters - stop cursor blinking
            cursor.classList.remove('blink');
            cursor.classList.add('no-blink');

            typingText.textContent = currentTitle.substring(0, currentCharIndex + 1);
            currentCharIndex++;

            if (currentCharIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(type, 1500); // Pause before deleting
                return;
            }
        }

        setTimeout(type, 150);
    }

    type();
}
