/**
 * Alpacode Blocks — Global Animation Controller
 * IntersectionObserver-based scroll animations.
 * Handles: reveal, text-reveal, image-reveal, parallax, stagger, counter, hairline draw, magnetic.
 */

(function () {
    'use strict';

    var AlpacodeBlocks = {};

    /* ── Utility: check reduced motion ── */

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /* ── Scroll Reveal ── */

    AlpacodeBlocks.initReveal = function () {
        var elements = document.querySelectorAll('[data-ac-reveal]');
        if (!elements.length) return;

        if (prefersReducedMotion()) {
            elements.forEach(function (el) {
                el.classList.add('ac-revealed');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var delay = parseInt(el.getAttribute('data-ac-reveal-delay'), 10) || 0;

                    if (delay > 0) {
                        setTimeout(function () {
                            el.classList.add('ac-revealed');
                        }, delay);
                    } else {
                        el.classList.add('ac-revealed');
                    }

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    };

    /* ── Text Reveal ── */

    AlpacodeBlocks.initTextReveal = function () {
        var elements = document.querySelectorAll('[data-ac-text-reveal]');
        if (!elements.length) return;

        elements.forEach(function (el) {
            var mode = el.getAttribute('data-ac-text-reveal');
            var text = el.textContent;
            var chunks;

            if (mode === 'words') {
                chunks = text.split(/(\s+)/);
            } else if (mode === 'lines') {
                chunks = text.split(/\n/);
            } else {
                chunks = text.split('');
            }

            el.textContent = '';
            var delay = 0;
            var staggerMs = mode === 'words' ? 60 : mode === 'lines' ? 120 : 30;

            chunks.forEach(function (chunk) {
                if (chunk.match(/^\s+$/)) {
                    el.appendChild(document.createTextNode(chunk));
                    return;
                }

                var span = document.createElement('span');
                span.className = 'ac-text-chunk';
                span.textContent = chunk;
                span.style.transitionDelay = delay + 'ms';
                el.appendChild(span);
                delay += staggerMs;
            });
        });

        if (prefersReducedMotion()) {
            elements.forEach(function (el) {
                el.classList.add('ac-revealed');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ac-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    };

    /* ── Image Reveal ── */

    AlpacodeBlocks.initImageReveal = function () {
        var elements = document.querySelectorAll('[data-ac-image-reveal]');
        if (!elements.length) return;

        if (prefersReducedMotion()) {
            elements.forEach(function (el) {
                el.classList.add('ac-revealed');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ac-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    };

    /* ── Stagger ── */

    AlpacodeBlocks.initStagger = function () {
        var parents = document.querySelectorAll('[data-ac-stagger]');
        if (!parents.length) return;

        if (prefersReducedMotion()) {
            parents.forEach(function (parent) {
                parent.classList.add('ac-revealed');
            });
            return;
        }

        parents.forEach(function (parent) {
            var delayMs = parseInt(parent.getAttribute('data-ac-stagger-delay'), 10) || 100;
            var children = parent.children;

            for (var i = 0; i < children.length; i++) {
                children[i].style.transitionDelay = (i * delayMs) + 'ms';
            }
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ac-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        parents.forEach(function (parent) {
            observer.observe(parent);
        });
    };

    /* ── Counter ── */

    AlpacodeBlocks.initCounter = function () {
        var elements = document.querySelectorAll('[data-ac-counter]');
        if (!elements.length) return;

        if (prefersReducedMotion()) {
            elements.forEach(function (el) {
                el.textContent = el.getAttribute('data-ac-counter');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var target = parseInt(el.getAttribute('data-ac-counter'), 10);
                    var duration = 1800;
                    var start = 0;
                    var startTime = null;

                    function animate(timestamp) {
                        if (!startTime) startTime = timestamp;
                        var progress = Math.min((timestamp - startTime) / duration, 1);
                        var eased = 1 - Math.pow(1 - progress, 3);
                        var current = Math.round(eased * (target - start) + start);
                        el.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    }

                    requestAnimationFrame(animate);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        elements.forEach(function (el) {
            el.textContent = '0';
            observer.observe(el);
        });
    };

    /* ── Hairline Draw ── */

    AlpacodeBlocks.initLine = function () {
        var elements = document.querySelectorAll('[data-ac-line]');
        if (!elements.length) return;

        if (prefersReducedMotion()) {
            elements.forEach(function (el) {
                el.classList.add('ac-revealed');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ac-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    };

    /* ── Parallax ── */

    AlpacodeBlocks.initParallax = function () {
        var elements = document.querySelectorAll('[data-ac-parallax]');
        if (!elements.length || prefersReducedMotion()) return;

        var ticking = false;

        function update() {
            var scrollY = window.pageYOffset;

            elements.forEach(function (el) {
                var speed = parseFloat(el.getAttribute('data-ac-parallax')) || 0.1;
                var rect = el.getBoundingClientRect();
                var offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
                el.style.transform = 'translateY(' + offset + 'px)';
            });

            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });
    };

    /* ── Magnetic Hover ── */

    AlpacodeBlocks.initMagnetic = function () {
        var elements = document.querySelectorAll('[data-ac-magnetic]');
        if (!elements.length || prefersReducedMotion()) return;

        elements.forEach(function (el) {
            el.addEventListener('mousemove', function (e) {
                var rect = el.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
            });

            el.addEventListener('mouseleave', function () {
                el.style.transform = 'translate(0, 0)';
                el.style.transition = 'transform 400ms var(--ac-ease-out)';
                setTimeout(function () {
                    el.style.transition = '';
                }, 400);
            });
        });
    };

    /* ── Header Shrink (Center Logo) ── */

    AlpacodeBlocks.initHeaderShrink = function () {
        var header = document.querySelector('.ac-header-center');
        if (!header) return;

        var threshold = 50;
        var ticking = false;
        var scrolled = false;

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(function () {
                    var shouldScroll = window.scrollY > threshold;

                    if (shouldScroll !== scrolled) {
                        scrolled = shouldScroll;

                        if (scrolled) {
                            header.classList.add('is-scrolled');
                        } else {
                            header.classList.remove('is-scrolled');
                        }
                    }

                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    };

    /* ── Initialize All ── */

    function init() {
        AlpacodeBlocks.initReveal();
        AlpacodeBlocks.initTextReveal();
        AlpacodeBlocks.initImageReveal();
        AlpacodeBlocks.initStagger();
        AlpacodeBlocks.initCounter();
        AlpacodeBlocks.initLine();
        AlpacodeBlocks.initParallax();
        AlpacodeBlocks.initMagnetic();
        AlpacodeBlocks.initHeaderShrink();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.AlpacodeBlocks = AlpacodeBlocks;
})();
