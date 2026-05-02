document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupFilters();
    setupSearch();
    setupFooterLinks();
});

// Renderiza a grade de produtos
const renderProducts = (filter = 'all', searchQuery = '') => {
    const grid = document.getElementById('product-grid');
    const title = document.getElementById('section-title');
    if (!grid) return;

    grid.innerHTML = '';

    // Título dinâmico
    const categoryNames = { all: 'Produtos em Destaque', tech: 'Tecnologia Pet', conforto: 'Conforto & Bem-Estar', educacao: 'Produtos Digitais' };
    if (title) title.textContent = searchQuery ? `Resultados para "${searchQuery}"` : (categoryNames[filter] || 'Produtos em Destaque');

    // Filtro duplo: categoria + busca
    let filtered = products;
    if (filter !== 'all') filtered = filtered.filter(p => p.category === filter);
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state"><span>🔍</span><p>Nenhum produto encontrado. Tente outro termo.</p></div>';
        return;
    }

    filtered.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'ml-card';
        card.style.animationDelay = `${index * 0.06}s`;

        const oldPrice = calculateOldPrice(product.price);

        card.innerHTML = `
            <div class="card-img">
                ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=500&q=60';">
            </div>
            <div class="card-content">
                <div class="card-title">${product.name}</div>
                <div class="card-price-row">
                    <span class="old-price">${oldPrice}</span>
                    <span class="new-price">${product.price}</span>
                    <span class="installments">em 10x de ${calculateInstallment(product.price)} sem juros</span>
                </div>
                <div class="shipping-badge">🟢 Frete grátis</div>
                <div class="delivery-info">
                    ${product.type === 'digital' ? '⚡ Entrega imediata' : '🚚 Chega amanhã'}
                </div>
            </div>
        `;

        card.onclick = () => {
            registrarClique(product.name);
            window.open(product.link, '_blank');
        };

        grid.appendChild(card);
    });
};

// Busca
const setupSearch = () => {
    const input = document.getElementById('search-input');
    if (!input) return;
    let debounceTimer;
    input.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const active = document.querySelector('.category-item.active');
            const cat = active ? active.dataset.category : 'all';
            renderProducts(cat, e.target.value);
        }, 250);
    });
};

// Filtros de categoria
const setupFilters = () => {
    const items = document.querySelectorAll('.category-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const query = document.getElementById('search-input')?.value || '';
            renderProducts(item.dataset.category, query);
        });
    });
};

// Links do footer
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
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            renderProducts(cat);
        });
    });
};

// Cálculos de preço
const calculateInstallment = (priceString) => {
    const num = parseFloat(priceString.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    return `R$ ${(num / 10).toFixed(2).replace('.', ',')}`;
};

const calculateOldPrice = (priceString) => {
    const num = parseFloat(priceString.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    return `R$ ${(num * 1.25).toFixed(2).replace('.', ',')}`;
};

// Analytics
const registrarClique = (productName) => {
    console.log(`[Guia Pet Tech] Clique: ${productName} | ${new Date().toISOString()}`);
};
