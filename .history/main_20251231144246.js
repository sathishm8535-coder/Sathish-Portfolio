// Professional Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbarBackground);

    // Animate skill progress bars when in view
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = width + '%';
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars
                if (entry.target.classList.contains('skills-section')) {
                    animateSkillBars();
                }
                
                // Fade in animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .contact-item, .timeline-item, .about-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Observe skills section for progress bar animation
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Enhanced Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            let isValid = true;
            let errorMessage = '';
            
            // Remove existing error
            field.classList.remove('error');
            const existingError = field.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Validation rules
            switch(fieldName) {
                case 'name':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'Name is required';
                    } else if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Name must be at least 2 characters';
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!value) {
                        isValid = false;
                        errorMessage = 'Email is required';
                    } else if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                    
                case 'subject':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'Subject is required';
                    } else if (value.length < 5) {
                        isValid = false;
                        errorMessage = 'Subject must be at least 5 characters';
                    }
                    break;
                    
                case 'message':
                    if (!value) {
                        isValid = false;
                        errorMessage = 'Message is required';
                    } else if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'Message must be at least 10 characters';
                    }
                    break;
            }
            
            if (!isValid) {
                field.classList.add('error');
                const errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.textContent = errorMessage;
                field.parentElement.appendChild(errorElement);
            }
            
            return isValid;
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isFormValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });
            
            if (!isFormValid) {
                // Shake form animation
                this.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            submitBtn.classList.add('loading');
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs
              .sendForm(
                "service_4v7s1rp"
                "template_gxw3shr",
                this,
                "yiMzeSr04gqEy48ou"
              )
              .then(() => {
                showSuccessMessage("Message sent successfully!");
                this.reset();
                // Remove focused class from all form groups
                inputs.forEach((input) => {
                  input.parentElement.classList.remove("focused");
                });
              })
              .catch(() => {
                showErrorMessage("Failed to send message. Please try again.");
              })
              .finally(() => {
                // Reset button state
                submitBtn.classList.remove("loading");
                btnText.style.display = "inline";
                btnLoading.style.display = "none";
                submitBtn.disabled = false;
              });
        });
        
        function showSuccessMessage(message = 'Message Sent Successfully!') {
            // Create success notification
            const notification = document.createElement('div');
            notification.className = 'success-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>${message}</h4>
                        <p>Thank you for reaching out. I'll get back to you soon.</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            // Remove after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 5000);
        }
        
        function showErrorMessage(message = 'Failed to send message') {
            // Create error notification
            const notification = document.createElement('div');
            notification.className = 'error-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-exclamation-circle"></i>
                    <div>
                        <h4>${message}</h4>
                        <p>Please try again or contact me directly.</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            // Remove after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 5000);
        }
    }

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Don't add loading to form submit buttons or external links
            if (this.type === 'submit' || this.target === '_blank') {
                return;
            }
            
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add enhanced CSS for form animations and notifications
    const enhancedStyle = document.createElement('style');
    enhancedStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .form-group.focused label {
            color: var(--primary-color);
            transform: translateY(-2px);
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        .error-message {
            display: block;
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .btn-primary.loading {
            pointer-events: none;
        }
        
        .success-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            border-left: 4px solid #10b981;
            padding: 1.5rem;
            max-width: 400px;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .error-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
            border-left: 4px solid #ef4444;
            padding: 1.5rem;
            max-width: 400px;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .success-notification.show,
        .error-notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .notification-content i {
            color: #10b981;
            font-size: 1.5rem;
            margin-top: 0.25rem;
        }
        
        .error-notification .notification-content i {
            color: #ef4444;
        }
        
        .notification-content h4 {
            margin: 0 0 0.25rem 0;
            color: var(--text-primary);
            font-size: 1rem;
            font-weight: 600;
        }
        
        .notification-content p {
            margin: 0;
            color: var(--text-secondary);
            font-size: 0.875rem;
            line-height: 1.4;
        }
        
        .contact-item {
            cursor: pointer;
        }
        
        .contact-item[data-action="email"]:hover {
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(59, 130, 246, 0.05));
        }
        
        .contact-item[data-action="phone"]:hover {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(34, 197, 94, 0.05));
        }
        
        .contact-item[data-action="location"]:hover {
            background: linear-gradient(135deg, rgba(245, 101, 101, 0.05), rgba(251, 113, 133, 0.05));
        }
    `;
    document.head.appendChild(enhancedStyle);

    // Initialize animations
    updateNavbarBackground();
    
    // Add entrance animation to hero section
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText && heroImage) {
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateX(0)';
        }, 300);
        
        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateX(0)';
        }, 600);
        
        // Initial styles
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateX(-50px)';
        heroText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateX(50px)';
        heroImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
});