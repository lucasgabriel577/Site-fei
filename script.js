// ═══════════════════════════════════════════
//  LIQUID GLASS NAV
// ═══════════════════════════════════════════
const navList      = document.querySelector('.liquid-nav__list');
const navItems     = document.querySelectorAll('.liquid-nav__item');
const indicator    = document.querySelector('.liquid-nav__indicator');
const themeButton  = document.querySelector('.theme-toggle');

// ── Move o indicador para o item informado ──
function moveIndicator(item) {
    if (!indicator || !item || !navList) return;

    const listRect = navList.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    indicator.style.left  = (itemRect.left - listRect.left) + 'px';
    indicator.style.width = itemRect.width + 'px';
}

// ── Posição inicial (sem transição) ──
function initIndicator() {
    const active = document.querySelector('.liquid-nav__item.pre-active, .liquid-nav__item.active');
    if (!indicator || !active) return;

    // Desabilita transição para o posicionamento inicial
    indicator.style.transition = 'none';
    moveIndicator(active);

    // Reabilita a transição no próximo frame
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            indicator.style.transition = '';
        });
    });
}

// ── Clique nos itens ──
navItems.forEach((item) => {
    item.addEventListener('click', () => {
        const themeItem = themeButton?.closest('.liquid-nav__item');

        // O botão de tema não move o indicador nem ativa item
        if (item === themeItem) return;

        // Remove estados anteriores
        navItems.forEach((n) => n.classList.remove('pre-active', 'active', 'is-clicking'));

        // Adiciona bounce
        item.classList.add('active', 'is-clicking');
        item.addEventListener('animationend', () => {
            item.classList.remove('is-clicking');
        }, { once: true });

        // Move indicador
        moveIndicator(item);
    });
});

// ── Reposiciona o indicador no resize ──
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

// ── Dark theme ──
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

// ── Init ──
initIndicator();
