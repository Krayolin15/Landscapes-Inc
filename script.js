

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
// Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Counter Animation for Satisfaction Badge
    const countElement = document.querySelector('.experience-badge .count');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let count = 0;
                const target = parseInt(entry.target.dataset.target);
                const increment = target / 50;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(count);
                }, 30);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (countElement) countObserver.observe(countElement);

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.organic-shape');
        shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
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

// WhatsApp Send Function
function sendToWhatsApp(e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('successMessage');
    const form = document.getElementById('landscape-contact-form');

    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const address = document.getElementById('address').value.trim();
    const message = document.getElementById('message').value.trim();

    // Get current date and time
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-ZA', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('en-ZA', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    // Professional formatted message using WhatsApp's native formatting
    const formattedMessage = encodeURIComponent(
        `*LANDSCAPERS INC — NEW CLIENT ENQUIRY*\n` +
        `────────────────────────────\n\n` +
        `*Submitted:* ${dateStr} at ${timeStr}\n\n` +
        `*CLIENT DETAILS*\n` +
        `• Name: ${firstName} ${lastName}\n` +
        `• Email: ${email}\n` +
        `• Phone: ${phone}\n` +
        `• Address: ${address}\n\n` +
        `*SERVICE REQUESTED*\n` +
        `• Type: ${service}\n\n` +
        `*PROJECT DETAILS*\n` +
        `${message || 'No additional details provided.'}\n\n` +
        `────────────────────────────\n` +
        `_Source: Landscapers Inc Website_`
    );

    // Show button loading state
    btn.innerHTML = '<span class="btn-content"><i class="fa-solid fa-spinner fa-spin" style="font-size:1.5rem;margin-right:10px;"></i><span class="btn-text-main"><span class="btn-label">Sending...</span></span></span>';
    btn.disabled = true;

    // Simulate processing then open WhatsApp
    setTimeout(() => {
        // Hide form and show success
        form.style.display = 'none';
        successMsg.classList.add('show');

        // Open WhatsApp
        const whatsappUrl = `https://wa.me/27691315387?text=${formattedMessage}`;
        window.open(whatsappUrl, '_blank');

        // Reset after 5 seconds
        setTimeout(() => {
            form.style.display = 'block';
            successMsg.classList.remove('show');
            btn.innerHTML = `<span class="btn-soil"></span><span class="btn-content"><span class="btn-icon-main"><i class="fa-brands fa-whatsapp"></i></span><span class="btn-text-main"><span class="btn-label">Send via WhatsApp</span><span class="btn-sublabel">Instant Quote Request</span></span></span><span class="btn-leaves-float"><i class="fa-solid fa-leaf l-1"></i><i class="fa-solid fa-leaf l-2"></i><i class="fa-solid fa-leaf l-3"></i></span><span class="btn-ripple"></span>`;
            btn.disabled = false;
            form.reset();
        }, 5000);
    }, 1500);
}

/* Floating leaf particles */
(function() {
  const container = document.getElementById('leafContainer');
  if (!container) return;
  const colors = ['#2a6a1e','#3a8c2c','#1e4a1c','#5bab47','#4e7d48'];
  const shapes = (c) => [
    `<svg viewBox="0 0 20 20"><path d="M10 1C10 1 2 7 2 14C2 18 6 20 10 20C14 20 18 18 18 14C18 7 10 1 10 1Z" fill="${c}" opacity="0.7"/><line x1="10" y1="20" x2="10" y2="8" stroke="${c}" stroke-width="1" opacity="0.5"/></svg>`,
    `<svg viewBox="0 0 20 14"><ellipse cx="10" cy="7" rx="9" ry="6" fill="${c}" opacity="0.6" transform="rotate(-15 10 7)"/></svg>`,
    `<svg viewBox="0 0 16 20"><path d="M8 1C14 5 16 12 8 19C0 12 2 5 8 1Z" fill="${c}" opacity="0.6"/></svg>`
  ];

  function makeLeaf() {
    const el = document.createElement('div');
    el.className = 'leaf';
    const size = 10 + Math.random() * 14;
    el.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;top:-20px;animation-duration:${8+Math.random()*10}s;animation-delay:${Math.random()*8}s;`;
    const c = colors[Math.floor(Math.random() * colors.length)];
    const sh = shapes(c);
    el.innerHTML = sh[Math.floor(Math.random() * sh.length)];
    container.appendChild(el);
    setTimeout(() => el.remove(), 20000);
  }

  for (let i = 0; i < 8; i++) setTimeout(makeLeaf, i * 600);
  setInterval(makeLeaf, 1200);
})();


// Footer fade in

const footerReveal = document.querySelector(".footer");

const footerObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.style.opacity = "1";

entry.target.style.transform = "translateY(0)";

}

});

},{

threshold:0.15

});

footerReveal.style.opacity = "0";

footerReveal.style.transform = "translateY(40px)";

footerReveal.style.transition = "all .8s ease";

footerObserver.observe(footerReveal);

  const backTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backTop.classList.add('show');
    } else {
      backTop.classList.remove('show');
    }

    
  });

  

