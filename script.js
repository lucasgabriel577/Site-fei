const navList      = document.querySelector('.liquid-nav__list');
const navItems     = document.querySelectorAll('.liquid-nav__item');
const indicator    = document.querySelector('.liquid-nav__indicator');
const themeButton  = document.querySelector('.theme-toggle');

function moveIndicator(item) {
    if (!indicator || !item || !navList) return;

    const listRect = navList.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    indicator.style.left  = (itemRect.left - listRect.left) + 'px';
    indicator.style.width = itemRect.width + 'px';
}

function initIndicator() {
    const active = document.querySelector('.liquid-nav__item.pre-active, .liquid-nav__item.active');
    if (!indicator || !active) return;

    indicator.style.transition = 'none';
    moveIndicator(active);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            indicator.style.transition = '';
        });
    });
}

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        const themeItem = themeButton?.closest('.liquid-nav__item');

        if (item === themeItem) return;

        navItems.forEach((n) => n.classList.remove('pre-active', 'active', 'is-clicking'));

        item.classList.add('active', 'is-clicking');
        item.addEventListener('animationend', () => {
            item.classList.remove('is-clicking');
        }, { once: true });

        moveIndicator(item);
    });
});

window.addEventListener('resize', () => {
    const active = document.querySelector('.liquid-nav__item.pre-active, .liquid-nav__item.active');
    if (active) {
        indicator.style.transition = 'none';
        moveIndicator(active);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { indicator.style.transition = ''; });
        });
    }
});

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const icon = themeButton?.querySelector('.liquid-nav__icon i');
    if (icon) icon.className = 'fa-solid fa-moon';
}

themeButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    const icon = themeButton.querySelector('.liquid-nav__icon i');
    if (icon) icon.className = isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
});

initIndicator();
