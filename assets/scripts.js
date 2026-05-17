document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all', '', true); // Inicia com skeleton loading
    setupFilters();
    setupSearch();
    setupFooterLinks();
    setupHeroCTAs();
});

// Helper para traduzir chaves de categoria em títulos amigáveis
const getCategoryTitle = (key) => {
    const categoryNames = { 
        all: 'Produtos em Destaque', 
        caes: 'Produtos para Cães 🐶', 
        gatos: 'Produtos para Gatos 🐱', 
        conforto: 'Conforto & Bem-Estar 🛏️',
        brinquedos: 'Brinquedos & Diversão 🎾',
        tecnologia: 'Tecnologia Pet 🤖'
    };
    return categoryNames[key] || 'Produtos em Destaque';
};

// Gerador de Estrelas de Avaliação
const generateStarsHTML = (rating) => {
    const rounded = Math.round(rating);
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rounded) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    return stars;
};

// Criação dinâmica de um Card de Produto (Estilo Marketplace de Alta Conversão)
const createProductCard = (product, index) => {
    const card = document.createElement('div');
    card.className = 'ml-card';
    card.style.animationDelay = `${index * 0.04}s`;

    const oldPrice = product.originalPrice || calculateOldPrice(product.price);
    const badgeClass = product.badge ? product.badge.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "") : '';

    card.innerHTML = `
        <div class="card-img">
            ${product.badge ? `<span class="card-badge ${badgeClass}">${product.badge}</span>` : ''}
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=500&q=60';">
        </div>
        <div class="card-content">
            <div class="card-title">${product.name}</div>
            <div class="card-rating">
                <span class="rating-stars">${generateStarsHTML(product.rating)}</span>
                <span class="rating-value">${product.rating.toFixed(1)}</span>
                <span class="rating-count">(${product.reviewsCount} avaliações)</span>
            </div>
            <div class="card-price-row">
                <span class="old-price">${oldPrice}</span>
                <span class="new-price">${product.price}</span>
                <span class="installments">em 10x de ${calculateInstallment(product.price)} sem juros</span>
            </div>
            ${product.freeShipping ? `
                <div class="shipping-badge">🟢 Frete grátis</div>
                <div class="delivery-info">🚚 Chega amanhã</div>
            ` : ''}
            <button class="card-cta-btn">
                <span>Ver no Mercado Livre</span>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none" style="display:inline-block; vertical-align:middle;"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
            </button>
        </div>
    `;

    card.onclick = () => {
        registrarClique(product.name);
        window.open(product.link, '_blank');
    };

    return card;
};

// Renderiza o Skeleton Loading de forma suave
const renderSkeleton = (filter, searchQuery) => {
    const container = document.getElementById('product-area');
    if (!container) return;

    // Limpa a área
    container.innerHTML = '';

    // Título temporário do Skeleton
    const title = document.createElement('h2');
    title.className = 'section-heading';
    title.textContent = searchQuery ? `Buscando por "${searchQuery}"...` : 'Carregando ofertas exclusivas...';
    container.appendChild(title);

    // Grade do Skeleton
    const grid = document.createElement('div');
    grid.className = 'marketplace-grid';

    for (let i = 0; i < 4; i++) {
        const skeletonCard = document.createElement('div');
        skeletonCard.className = 'skeleton-card pulse';
        skeletonCard.innerHTML = `
            <div class="skeleton-img"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-title short"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-price"></div>
            <div class="skeleton-btn"></div>
        `;
        grid.appendChild(skeletonCard);
    }

    container.appendChild(grid);
};

// Renderiza a grade ou seções de produtos
const renderProducts = (filter = 'all', searchQuery = '', triggerSkeleton = false) => {
    const container = document.getElementById('product-area');
    if (!container) return;

    // Se solicitado, dispara o skeleton e agenda a renderização real
    if (triggerSkeleton) {
        renderSkeleton(filter, searchQuery);
        setTimeout(() => {
            renderProducts(filter, searchQuery, false);
        }, 400); // 400ms para uma transição fluida
        return;
    }

    container.innerHTML = '';

    // Filtro por termo de busca
    const matchSearch = (p) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    };

    // Caso 1: Usuário digitou busca OU selecionou filtro específico (Exibe grade única)
    if (searchQuery || filter !== 'all') {
        let filtered = products.filter(matchSearch);
        
        if (filter !== 'all') {
            filtered = filtered.filter(p => p.categories.includes(filter));
        }

        const titleText = searchQuery ? `Resultados para "${searchQuery}"` : getCategoryTitle(filter);
        
        const heading = document.createElement('h2');
        heading.className = 'section-heading';
        heading.textContent = titleText;
        container.appendChild(heading);

        if (filtered.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.innerHTML = `<span>🔍</span><p>Nenhum produto encontrado. Tente outro termo.</p>`;
            container.appendChild(empty);
            return;
        }

        const grid = document.createElement('div');
        grid.className = 'marketplace-grid';
        
        filtered.forEach((product, index) => {
            grid.appendChild(createProductCard(product, index));
        });
        
        container.appendChild(grid);
    } 
    // Caso 2: Filtro é "Todos" e não há busca (Exibe seções separadas de categoria)
    else {
        // Seções padrão solicitadas pelo usuário (não mistura cães e gatos)
        const sectionsData = [
            { id: 'caes', title: 'Produtos para Cães 🐶', filterKey: 'caes' },
            { id: 'gatos', title: 'Produtos para Gatos 🐱', filterKey: 'gatos' },
            { id: 'tecnologia', title: 'Tecnologia Pet 🤖', filterKey: 'tecnologia' },
            { id: 'conforto', title: 'Conforto & Bem-estar 🛏️', filterKey: 'conforto' }
        ];

        let hasAnyProduct = false;

        sectionsData.forEach(sec => {
            const filtered = products.filter(p => p.categories.includes(sec.filterKey));
            if (filtered.length === 0) return;

            hasAnyProduct = true;

            const sectionEl = document.createElement('section');
            sectionEl.className = 'section-category';
            sectionEl.id = `section-${sec.id}`;

            const heading = document.createElement('h2');
            heading.className = 'section-heading';
            heading.textContent = sec.title;
            sectionEl.appendChild(heading);

            const grid = document.createElement('div');
            grid.className = 'marketplace-grid';

            filtered.forEach((product, idx) => {
                grid.appendChild(createProductCard(product, idx));
            });

            sectionEl.appendChild(grid);
            container.appendChild(sectionEl);
        });

        if (!hasAnyProduct) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.innerHTML = `<span>📦</span><p>Nenhum produto cadastrado no momento.</p>`;
            container.appendChild(empty);
        }
    }
};

// Event Listeners para Busca
const setupSearch = () => {
    const input = document.getElementById('search-input');
    if (!input) return;
    let debounceTimer;
    input.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const active = document.querySelector('.category-item.active');
            const cat = active ? active.dataset.category : 'all';
            renderProducts(cat, e.target.value, false); // Sem skeleton para busca digitada (UX instantânea)
        }, 250);
    });
};

// Event Listeners para Filtros do Menu
const setupFilters = () => {
    const items = document.querySelectorAll('.category-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Limpa busca ao trocar de categoria principal para melhor fluxo de UX
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.value = '';

            renderProducts(item.dataset.category, '', true); // Dispara o skeleton
        });
    });
};

// Event Listeners para Banners do Hero (Scroll & Auto-Filtro)
const setupHeroCTAs = () => {
    document.querySelectorAll('.hero-cta').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetCat = btn.dataset.target;
            const items = document.querySelectorAll('.category-item');
            
            items.forEach(i => i.classList.remove('active'));
            const targetNavItem = document.querySelector(`[data-category="${targetCat}"]`);
            if (targetNavItem) {
                targetNavItem.classList.add('active');
            }

            // Limpa barra de busca
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.value = '';

            // Scroll suave até a área de produtos
            const productArea = document.getElementById('product-area');
            if (productArea) {
                productArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Renderiza com skeleton loading
            renderProducts(targetCat, '', true);
        });
    });
};

// Event Listeners para Links do Footer
const setupFooterLinks = () => {
    document.querySelectorAll('[data-cat]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = link.dataset.cat;
            const items = document.querySelectorAll('.category-item');
            
            items.forEach(i => i.classList.remove('active'));
            const target = document.querySelector(`[data-category="${cat}"]`);
            if (target) {
                target.classList.add('active');
            }

            // Limpa barra de busca
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.value = '';

            // Scroll suave
            const productArea = document.getElementById('product-area');
            if (productArea) {
                productArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            renderProducts(cat, '', true); // Dispara o skeleton
        });
    });
};

// Cálculos automáticos de preço
const calculateInstallment = (priceString) => {
    const num = parseFloat(priceString.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    return `R$ ${(num / 10).toFixed(2).replace('.', ',')}`;
};

const calculateOldPrice = (priceString) => {
    const num = parseFloat(priceString.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    return `R$ ${(num * 1.25).toFixed(2).replace('.', ',')}`;
};

// Analytics / Registro de Conversão
const registrarClique = (productName) => {
    console.log(`[Guia Pet Tech] Clique Afiliado: ${productName} | ${new Date().toISOString()}`);
};
