/**
 * Alpacode Blocks — Loaders & Utilities
 * Scroll progress indicator, preloader, page transitions.
 */

(function () {
    'use strict';

    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /* ── Scroll Progress ── */

    function initScrollProgress() {
        var bar = document.querySelector('.ac-scroll-progress');
        if (!bar) return;

        var ticking = false;

        function update() {
            var scrollTop = window.pageYOffset;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (docHeight > 0) {
                var progress = Math.min(scrollTop / docHeight, 1) * 100;
                bar.style.width = progress + '%';
            }

            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }, { passive: true });

        update();
    }

    /* ── Preloader ── */

    function initPreloader() {
        var preloader = document.querySelector('.ac-preloader');
        if (!preloader) return;

        function hide() {
            preloader.classList.add('ac-preloader--hidden');

            if (!prefersReducedMotion()) {
                preloader.addEventListener('transitionend', function () {
                    preloader.remove();
                }, { once: true });
            } else {
                preloader.remove();
            }
        }

        if (document.readyState === 'complete') {
            hide();
        } else {
            window.addEventListener('load', hide);
        }
    }

    /* ── Page Transition ── */

    function initPageTransition() {
        var overlay = document.querySelector('.ac-page-transition');
        if (!overlay || prefersReducedMotion()) return;

        document.addEventListener('click', function (e) {
            var link = e.target.closest('a[href]');
            if (!link) return;

            var href = link.getAttribute('href');

            // Skip external links, anchors, new tabs, and special protocols
            if (!href ||
                href.startsWith('#') ||
                href.startsWith('mailto:') ||
                href.startsWith('tel:') ||
                href.startsWith('javascript:') ||
                link.target === '_blank' ||
                link.hasAttribute('download') ||
                e.ctrlKey || e.metaKey || e.shiftKey) {
                return;
            }

            // Skip external links
            try {
                var url = new URL(href, window.location.origin);
                if (url.origin !== window.location.origin) return;
            } catch (err) {
                return;
            }

            e.preventDefault();
            overlay.classList.add('ac-page-transition--active');

            setTimeout(function () {
                window.location.href = href;
            }, 300);
        });

        // Fade out on page show (back/forward navigation)
        window.addEventListener('pageshow', function (e) {
            if (e.persisted) {
                overlay.classList.remove('ac-page-transition--active');
            }
        });
    }

    /* ── Initialize ── */

    function init() {
        initScrollProgress();
        initPreloader();
        initPageTransition();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
