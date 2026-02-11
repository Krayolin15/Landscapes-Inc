// --- MOBILE NAVBAR TOGGLE ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Fixed: Removed the nested/duplicate listener
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('nav-open');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('nav-open');
    });
});
// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// --- 1. PRELOADER ---
    const preloader = document.querySelector('.preloader');
    const navbar = document.querySelector('.navbar'); // Add this line
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        navbar.classList.add('loaded'); // Add this line to trigger the link animation
        
        // ... rest of your existing code ...
    }, 2200);

    

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PRELOADER ---
    const preloader = document.querySelector('.preloader');
    
    // Wait for the bar animation (2s) then fade out
    setTimeout(() => {
        preloader.classList.add('fade-out');
        // Start hero text animations after loader is gone
        setTimeout(() => {
            document.querySelectorAll('.hero .reveal-text').forEach(el => {
                el.style.animationPlayState = 'running'; 
            });
        }, 500);
    }, 2200);


    // --- 2. CUSTOM CURSOR ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .service-card, .gallery-item');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Small delay for follower to create "fluid" feel
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hover effect for interactive elements
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.classList.add('active');
        });
        link.addEventListener('mouseleave', () => {
            follower.classList.remove('active');
        });
    });


    // --- 3. SCROLL REVEAL ANIMATIONS (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's the counter in About section
                if(entry.target.querySelector('.count')) {
                    startCounter(entry.target.querySelector('.count'));
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });


    // --- 4. MAGNETIC BUTTONS ---
    // Makes buttons "stick" to the cursor slightly
    const magneticBtns = document.querySelectorAll('.magnetic');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });


    // --- 5. NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // --- 6. NUMBER COUNTER ANIMATION ---
    function startCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100; // Speed

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounter(counter), 20);
        } else {
            counter.innerText = target;
        }
    }
});

// Initialize EmailJS (Get your Key from EmailJS Dashboard)
(function() {
    emailjs.init("LQ6eotAPQ4JLekpCw"); 
})();

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Start "Sending" Animation
    submitBtn.classList.add('sending');
    submitBtn.disabled = true;

    // 2. EmailJS Logic
    // Parameters: Service ID, Template ID, Form Element
    emailjs.sendForm('service_qzto81c', 'template_fm30cvk', this)
        .then(() => {
            // 3. Success Animation
            submitBtn.classList.remove('sending');
            submitBtn.classList.add('success');
            
            // Clear form
            contactForm.reset();

            // 4. Reset Button after 5 seconds
            setTimeout(() => {
                submitBtn.classList.remove('success');
                submitBtn.disabled = false;
            }, 5000);

        }, (error) => {
            console.error('Email Error:', error);
            submitBtn.classList.remove('sending');
            alert('Something went wrong. Please call us directly!');
            submitBtn.disabled = false;
        });
});

// Back to Top functionality
document.querySelector('.back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 1. Smooth Back to Top Scroll
    const backToTop = document.getElementById('scrollToTop');
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 2. Magnetic Effect for Buttons
    const magneticItems = document.querySelectorAll('.magnetic');

    magneticItems.forEach((item) => {
        item.addEventListener('mousemove', function(e) {
            const position = item.getBoundingClientRect();
            
            // Calculate mouse position relative to the element center
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;

            // Move the element slightly towards the mouse
            // We use (x * 0.3) to keep the movement subtle
            item.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        // Reset position when mouse leaves
        item.addEventListener('mouseout', function() {
            item.style.transform = 'translate(0px, 0px)';
        });
    });

    // 3. Simple Reveal Animation on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const footer = document.querySelector('.footer-reveal');
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(20px)';
    footer.style.transition = 'all 0.8s ease-out';
    observer.observe(footer);


    document.addEventListener('DOMContentLoaded', () => {
    const transitionBtn = document.querySelector('.transition-trigger');
    const overlay = document.querySelector('.page-transition-overlay');

    if (transitionBtn) {
        transitionBtn.addEventListener('click', function(e) {
            // 1. Prevent the page from changing immediately
            e.preventDefault();
            const targetUrl = this.getAttribute('href');

            // 2. Trigger the animation
            overlay.classList.add('active');

            // 3. Wait for the animation to finish (0.6s), then switch page
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 700); // 700ms gives a tiny buffer after the 600ms CSS transition
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.querySelector('.back-to-top');

    // 1. SHOW/HIDE BUTTON ON SCROLL
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // 2. SMOOTH SCROLL TO TOP
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 3. MAGNETIC EFFECT (The "Crazy" Part)
    backToTop.addEventListener('mousemove', (e) => {
        const rect = backToTop.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Move the button slightly toward the mouse
        backToTop.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
    });

    backToTop.addEventListener('mouseleave', () => {
        // Snap back to original position
        backToTop.style.transform = `translate(0px, 0px) scale(1)`;
    });
});

document.querySelectorAll('.designer-name').forEach(el => {
    el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
    });
});

document.querySelectorAll('.designer-name-glitch').forEach(el => {
    el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `
            perspective(600px)
            rotateX(${y * -0.1}deg)
            rotateY(${x * 0.1}deg)
            scale(1.1)
        `;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
    });
});


document.querySelectorAll('.designer-plant').forEach(el => {
    el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        el.style.transform = `rotate(${x * 0.03}deg)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'rotate(0deg)';
    });
});


document.querySelectorAll('.designer-tree').forEach(el => {
  const tree = el.querySelector('.tree');
  
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Sway with mouse x movement, small rotation
    tree.style.transform = `scaleY(1) rotate(${x * 0.1}deg)`;
  });

  el.addEventListener('mouseleave', () => {
    tree.style.transform = 'scaleY(1) rotate(0deg)';
  });
});


  const backTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backTop.classList.add('show');
    } else {
      backTop.classList.remove('show');
    }
  });

