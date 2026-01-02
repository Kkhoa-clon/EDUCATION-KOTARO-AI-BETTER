/* === MODERN UI JAVASCRIPT ENHANCEMENTS === */
/* 3D Effects & Interactive Animations - Compatible with main.js */

(function($) {
    'use strict';

    // === INITIALIZATION ===
    $(document).ready(function() {
        initializeModernUI();
        setupScrollAnimations();
        setup3DEffects();
        setupTypingEffects();
        setupParallaxEffects();
        setupModernSectionAnimations(); // New function for modern sections
    });

    // === MODERN SECTION ANIMATIONS ===
    function setupModernSectionAnimations() {
        const modernSections = $('.modern-section');
        
        modernSections.each(function() {
            const section = $(this);
            const sectionId = section.attr('id');
            
            // Skip parallax effects for section One
            if (sectionId === 'one') {
                return;
            }
            
            // Skip parallax effects for section Four (features grid)
            if (sectionId === 'four') {
                return;
            }
            
            // Parallax effect for floating elements (only for section Two and Three)
            const floatElements = section.find('.float-element');
            const particles = section.find('.particle');
            const orbs = section.find('.gradient-orb');
            
            $(window).on('scroll', function() {
                const scrolled = $(window).scrollTop();
                const sectionTop = section.offset().top;
                const sectionHeight = section.height();
                const sectionProgress = (scrolled - sectionTop + $(window).height()) / (sectionHeight + $(window).height());
                
                if (sectionProgress > 0 && sectionProgress < 1) {
                    // Animate floating elements
                    floatElements.each(function(index) {
                        const element = $(this);
                        const speed = parseFloat(element.data('speed')) || 0.5;
                        const yOffset = Math.sin(sectionProgress * Math.PI * 2 + index) * 50 * speed;
                        element.css('transform', `translateY(${yOffset}px) rotate(${sectionProgress * 360}deg)`);
                    });
                    
                    // Animate particles
                    particles.each(function(index) {
                        const particle = $(this);
                        const speed = parseFloat(particle.data('speed')) || 1;
                        const xOffset = Math.sin(sectionProgress * Math.PI * 4 + index) * 100 * speed;
                        const yOffset = Math.cos(sectionProgress * Math.PI * 2 + index) * 50 * speed;
                        particle.css('transform', `translate(${xOffset}px, ${yOffset}px)`);
                    });
                    
                    // Animate gradient orbs
                    orbs.each(function(index) {
                        const orb = $(this);
                        const speed = parseFloat(orb.data('speed')) || 0.3;
                        const scale = 1 + Math.sin(sectionProgress * Math.PI * 2 + index) * 0.2 * speed;
                        const opacity = 0.3 + Math.sin(sectionProgress * Math.PI * 2 + index) * 0.2;
                        orb.css({
                            'transform': `scale(${scale})`,
                            'opacity': opacity
                        });
                    });
                }
            });
        });

        // Intersection Observer for section animations
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = $(entry.target);
                    const sectionId = section.attr('id');
                    
                    // Skip scroll animations for section One and Four, only show content immediately
                    if (sectionId === 'one' || sectionId === 'four') {
                        const contentElements = section.find('.content-wrapper > *');
                        const imageShowcase = section.find('.image-showcase');
                        const floatingCards = section.find('.floating-card');
                        
                        contentElements.css({
                            'opacity': '1',
                            'transform': 'translateY(0)'
                        });
                        
                        if (imageShowcase.length) {
                            imageShowcase.css({
                                'opacity': '1',
                                'transform': 'translateX(0)'
                            });
                        }
                        
                        floatingCards.css({
                            'opacity': '1',
                            'transform': 'translateY(0)'
                        });
                        return;
                    }
                    
                    // Animate content elements for other sections
                    const contentElements = section.find('.content-wrapper > *');
                    contentElements.each(function(index) {
                        const element = $(this);
                        setTimeout(() => {
                            element.css({
                                'opacity': '1',
                                'transform': 'translateY(0)'
                            });
                        }, index * 200);
                    });
                    
                    // Animate image showcase
                    const imageShowcase = section.find('.image-showcase');
                    if (imageShowcase.length) {
                        setTimeout(() => {
                            imageShowcase.css({
                                'opacity': '1',
                                'transform': 'translateX(0)'
                            });
                        }, 600);
                    }
                    
                    // Animate floating cards
                    const floatingCards = section.find('.floating-card');
                    floatingCards.each(function(index) {
                        const card = $(this);
                        setTimeout(() => {
                            card.css({
                                'opacity': '1',
                                'transform': 'translateY(0)'
                            });
                        }, 800 + index * 200);
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe modern sections
        modernSections.each(function() {
            sectionObserver.observe(this);
        });

        // Counter animation for stats
        const statNumbers = $('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = $(entry.target);
                    const finalValue = statNumber.text();
                    const isPercentage = finalValue.includes('%');
                    const isPlus = finalValue.includes('+');
                    const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
                    
                    let currentValue = 0;
                    const increment = numericValue / 50;
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= numericValue) {
                            currentValue = numericValue;
                            clearInterval(counter);
                        }
                        
                        let displayValue = Math.floor(currentValue);
                        if (isPercentage) displayValue += '%';
                        if (isPlus) displayValue += '+';
                        
                        statNumber.text(displayValue);
                    }, 50);
                    
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.each(function() {
            statsObserver.observe(this);
        });

        // Mouse parallax effect for floating cards
        $(document).on('mousemove', function(e) {
            const floatingCards = $('.floating-card');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            floatingCards.each(function(index) {
                const card = $(this);
                const speed = 0.02 + (index * 0.01);
                const x = (mouseX - 0.5) * 20 * speed;
                const y = (mouseY - 0.5) * 20 * speed;
                
                card.css('transform', `translate(${x}px, ${y}px)`);
            });
        });
    }

    // === MODERN UI INITIALIZATION ===
    function initializeModernUI() {
        // Add modern classes to existing elements
        $('.spotlight').addClass('modern-spotlight');
        $('.box.alt').addClass('modern-card');
        $('.icon.major').addClass('modern-icon');
        
        // Setup smooth scrolling
        setupSmoothScrolling();
        
        // Initialize loading animations
        setupLoadingAnimations();
    }

    // === 3D EFFECTS ===
    function setup3DEffects() {
        // 3D tilt effect for cards
        $('.modern-card').on('mousemove', function(e) {
            const card = $(this);
            const rect = card[0].getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`);
        });

        $('.modern-card').on('mouseleave', function() {
            $(this).css('transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
        });

        // 3D icon effects
        $('.modern-icon').on('mousemove', function(e) {
            const icon = $(this);
            const rect = icon[0].getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            icon.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);
        });

        $('.modern-icon').on('mouseleave', function() {
            $(this).css('transform', 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
        });
    }

    // === TYPING EFFECTS ===
    function setupTypingEffects() {
        // Typing effect for banner title
        const bannerTitle = $('#banner h2');
        if (bannerTitle.length) {
            const text = bannerTitle.text();
            bannerTitle.text('');
            bannerTitle.css('border-right', '3px solid #73d239');
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    bannerTitle.text(text.substring(0, i + 1));
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Start blinking cursor
                    setInterval(() => {
                        bannerTitle.css('border-right-color', 
                            bannerTitle.css('border-right-color') === 'transparent' ? '#73d239' : 'transparent'
                        );
                    }, 750);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }

        // Animated text for feature descriptions
        $('.modern-card p').each(function(index) {
            const element = $(this);
            const text = element.text();
            element.text('');
            
            setTimeout(() => {
                let i = 0;
                const animateText = () => {
                    if (i < text.length) {
                        element.text(text.substring(0, i + 1));
                        i++;
                        setTimeout(animateText, 20);
                    }
                };
                animateText();
            }, index * 500);
        });
    }

    // === SCROLL ANIMATIONS ===
    function setupScrollAnimations() {
        // Intersection Observer for fade-up animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        $('.spotlight, .modern-card, .modern-icon').each(function() {
            $(this).addClass('fade-up');
            observer.observe(this);
        });

        // Parallax scroll effect
        $(window).on('scroll', function() {
            const scrolled = $(window).scrollTop();
            
            // Parallax for banner
            $('#banner').css('transform', `translateY(${scrolled * 0.5}px)`);
            
            // Parallax for background elements
            $('.spotlight::before').css('transform', `translateY(${scrolled * 0.3}px)`);
        });
    }

    // === PARALLAX EFFECTS ===
    function setupParallaxEffects() {
        // Mouse parallax effect
        $(document).on('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Subtle parallax for background elements
            $('.spotlight::before').css('transform', 
                `translate(${mouseX * 10}px, ${mouseY * 10}px)`
            );
            
            // Parallax for floating elements
            $('.modern-icon').css('transform', 
                `translate(${mouseX * 5}px, ${mouseY * 5}px)`
            );
        });
    }

    // === SUBTLE PARTICLE EFFECTS ===
    function createParticleEffect() {
        // Create particle container
        if (!$('#particles').length) {
            $('body').append('<div id="particles"></div>');
        }
        
        const particlesContainer = $('#particles');
        particlesContainer.css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
        });

        // Create fewer, more subtle particles
        for (let i = 0; i < 20; i++) {
            createParticle(particlesContainer);
        }
    }

    function createParticle(container) {
        const particle = $('<div class="particle"></div>');
        particle.css({
            position: 'absolute',
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            background: `rgba(115, 210, 57, ${Math.random() * 0.3 + 0.1})`,
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 15 + 20}s linear infinite`
        });
        
        container.append(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
            createParticle(container);
        }, 25000);
    }

    // === SMOOTH SCROLLING (Improved for smoothness and responsiveness) ===
    function setupSmoothScrolling() {
        $('a[href^="#"]').on('click', function(e) {
            const href = $(this).attr('href');
            // Ignore if href is just "#" or empty
            if (!href || href === '#') return;
            const target = $(href);
            if (target.length) {
                e.preventDefault();
                const targetOffset = target.offset().top - 0;
                // Use native scroll if supported for better smoothness
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetOffset,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback for older browsers
                    $('html, body').stop().animate({
                        scrollTop: targetOffset
                    }, 500); // Faster and less delay
                }
            }
        });
    }

    // === LOADING ANIMATIONS ===
    function setupLoadingAnimations() {
        // Add loading animation to buttons
        $('.button, input[type="submit"]').on('click', function() {
            const button = $(this);
            const originalText = button.text();
            
            button.text('Đang xử lý...').addClass('loading-dots');
            button.prop('disabled', true);
            
            // Simulate loading (remove in production)
            setTimeout(() => {
                button.text(originalText).removeClass('loading-dots');
                button.prop('disabled', false);
            }, 2000);
        });

        // Progressive loading for images
        $('img').each(function() {
            const img = $(this);
            img.on('load', function() {
                img.addClass('loaded');
            });
        });
    }

    // === INTERACTIVE ELEMENTS ===
    function setupInteractiveElements() {
        // Hover effects for buttons
        $('.button').hover(
            function() {
                $(this).addClass('button-3d');
            },
            function() {
                $(this).removeClass('button-3d');
            }
        );

        // Form validation with modern feedback
        $('#contact-form').on('submit', function(e) {
            e.preventDefault();
            
            const form = $(this);
            const submitBtn = form.find('input[type="submit"]');
            const originalText = submitBtn.val();
            
            // Show loading state
            submitBtn.val('Đang gửi...').prop('disabled', true);
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.val('Gửi thành công!').addClass('success');
                
                setTimeout(() => {
                    submitBtn.val(originalText).removeClass('success').prop('disabled', false);
                    form[0].reset();
                }, 2000);
            }, 1500);
        });
    }

    // === RESPONSIVE BEHAVIORS ===
    function setupResponsiveBehaviors() {
        // Disable 3D effects on mobile
        if (window.innerWidth <= 768) {
            $('.modern-card, .modern-icon').off('mousemove mouseleave');
        }

        // Adjust animations for mobile
        $(window).on('resize', function() {
            if (window.innerWidth <= 768) {
                $('.modern-card, .modern-icon').css('transform', 'none');
            }
        });
    }

    // === PERFORMANCE OPTIMIZATIONS ===
    function optimizePerformance() {
        // Throttle scroll events
        let ticking = false;
        $(window).on('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-based animations here
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Debounce resize events
        let resizeTimer;
        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                setupResponsiveBehaviors();
            }, 250);
        });
    }

    // === INITIALIZATION CALLS ===
    $(document).ready(function() {
        setupInteractiveElements();
        setupResponsiveBehaviors();
        optimizePerformance();
    });

    // === CSS ANIMATIONS (injected via JavaScript) ===
    const additionalCSS = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }

        .particle {
            pointer-events: none;
        }

        .modern-card {
            transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .modern-icon {
            transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .button-3d {
            transform: perspective(1000px) rotateX(5deg) translateY(-3px);
            box-shadow: 0 15px 40px rgba(115, 210, 57, 0.4);
        }

        .success {
            background: linear-gradient(135deg, #10b981, #059669) !important;
            color: white !important;
        }

        img.loaded {
            animation: fadeInScale 0.6s ease-out;
        }

        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        .fade-up {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .fade-up.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = additionalCSS;
    document.head.appendChild(style);

})(jQuery); 