/**
 * Catálogo de Produtos - Periféricos Tech
 * Lógica para página de categoria: filtros, ordenação, paginação, URL state
 */

(function() {
  'use strict';

  // ========================================
  // ESTADO
  // ========================================
  let state = {
    products: [],
    filteredProducts: [],
    currentPage: 1,
    productsPerPage: 12,
    filters: {
      categories: [],
      brands: [],
      priceMin: 0,
      priceMax: 5000,
      inStock: false,
      onSale: false,
      freeShipping: false
    },
    sortBy: 'popular',
    urlParams: new URLSearchParams(window.location.search)
  };

  // Elementos DOM
  const elements = {
    grid: null,
    pagination: null,
    resultsCount: null,
    sortSelect: null,
    filtersForm: null,
    filtersSidebar: null,
    filtersToggle: null,
    clearFiltersBtn: null,
    priceMinInput: null,
    priceMaxInput: null,
    priceRange: null,
    categoryTitle: null,
    categoryDescription: null,
    pageTitle: null
  };

  // ========================================
  // INICIALIZAÇÃO
  // ========================================
  function init() {
    cacheElements();
    parseURLParams();
    loadProducts();
    applyInitialFilters();
    bindEvents();
    render();
    updateWishlistUI();
  }

  function cacheElements() {
    elements.grid = document.getElementById('catalog-grid');
    elements.pagination = document.getElementById('pagination');
    elements.resultsCount = document.getElementById('results-count');
    elements.sortSelect = document.getElementById('sort-select');
    elements.filtersForm = document.getElementById('filters-form');
    elements.filtersSidebar = document.getElementById('filters-sidebar');
    elements.filtersToggle = document.getElementById('filters-toggle');
    elements.clearFiltersBtn = document.getElementById('clear-filters');
    elements.priceMinInput = elements.filtersForm?.querySelector('input[name="price-min-input"]');
    elements.priceMaxInput = elements.filtersForm?.querySelector('input[name="price-max-input"]');
    elements.priceRange = elements.filtersForm?.querySelector('input[type="range"]');
    elements.categoryTitle = document.getElementById('category-title');
    elements.categoryDescription = document.getElementById('category-description');
    elements.pageTitle = document.getElementById('page-title');
  }

  function parseURLParams() {
    const params = state.urlParams;

    // Categoria
    if (params.has('cat')) {
      state.filters.categories = [params.get('cat')];
    }

    // Busca
    if (params.has('q')) {
      // A busca é tratada separadamente
    }

    // Marca
    if (params.has('brand')) {
      state.filters.brands = [params.get('brand')];
    }

    // Ordenação
    if (params.has('sort')) {
      state.sortBy = params.get('sort');
    }

    // Página
    if (params.has('page')) {
      state.currentPage = parseInt(params.get('page')) || 1;
    }
  }

  function loadProducts() {
    // Obter produtos baseado na categoria da URL
    const category = state.urlParams.get('cat');
    const brand = state.urlParams.get('brand');
    const searchQuery = state.urlParams.get('q');

    if (searchQuery && window.searchProducts) {
      state.products = window.searchProducts(searchQuery);
      updatePageTitle(`Busca: "${searchQuery}"`);
    } else if (category && window.getProductsByCategory) {
      state.products = window.getProductsByCategory(category);
      updateCategoryInfo(category);
    } else if (brand && window.PRODUCTS) {
      state.products = window.PRODUCTS.filter(p => p.brand === brand);
      updatePageTitle(`Marca: ${brand}`);
    } else if (window.PRODUCTS) {
      state.products = [...window.PRODUCTS];
      updatePageTitle('Todos os Produtos');
    } else {
      state.products = [];
    }

    // Aplicar filtro de marca se vier na URL junto com categoria
    if (brand && category) {
      state.products = state.products.filter(p => p.brand === brand);
    }
  }

  function updateCategoryInfo(category) {
    const categoryInfo = {
      mouses: { title: 'Mouses', desc: 'Mouses gamers, ergonômicos, para escritório e sem fio das melhores marcas' },
      teclados: { title: 'Teclados', desc: 'Teclados mecânicos, low-profile, compactos e sem fio para digitação e gaming' },
      headsets: { title: 'Headsets & Áudio', desc: 'Headsets gamers, com cancelamento de ruído, sem fio e alto-falantes' },
      monitores: { title: 'Monitores', desc: 'Monitores gamers, UltraWide, 4K, OLED para trabalho e jogos' },
      acessorios: { title: 'Acessórios', desc: 'Mousepads, suportes de monitor, webcams, teclados numéricos e mais' }
    };

    const info = categoryInfo[category] || { title: 'Produtos', desc: 'Catálogo completo de periféricos' };

    if (elements.categoryTitle) elements.categoryTitle.textContent = info.title;
    if (elements.categoryDescription) elements.categoryDescription.textContent = info.desc;
    if (elements.pageTitle) elements.pageTitle.textContent = info.title;

    document.title = `${info.title} | Periféricos Tech`;
  }

  function updatePageTitle(title) {
    if (elements.categoryTitle) elements.categoryTitle.textContent = title;
    if (elements.pageTitle) elements.pageTitle.textContent = title;
    document.title = `${title} | Periféricos Tech`;
  }

  function applyInitialFilters() {
    // Marcar checkboxes baseado no estado inicial
    if (state.filters.categories.length) {
      checkCheckboxes('category', state.filters.categories);
    }
    if (state.filters.brands.length) {
      checkCheckboxes('brand', state.filters.brands);
    }
    if (elements.sortSelect) {
      elements.sortSelect.value = state.sortBy;
    }
  }

  function checkCheckboxes(name, values) {
    document.querySelectorAll(`input[name="${name}"]`).forEach(cb => {
      cb.checked = values.includes(cb.value);
    });
  }

  // ========================================
  // EVENTOS
  // ========================================
  function bindEvents() {
    // Ordenação
    elements.sortSelect?.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      state.currentPage = 1;
      applyFiltersAndRender();
      updateURL();
    });

    // Filtros - checkboxes
    elements.filtersForm?.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        handleCheckboxFilter(e.target);
      }
    });

    // Filtros - inputs de preço
    elements.priceMinInput?.addEventListener('change', debounce(handlePriceInput, 300));
    elements.priceMaxInput?.addEventListener('change', debounce(handlePriceInput, 300));
    elements.priceRange?.addEventListener('input', debounce(handlePriceRange, 100));

    // Limpar filtros
    elements.clearFiltersBtn?.addEventListener('click', clearAllFilters);

    // Toggle filtros mobile
    elements.filtersToggle?.addEventListener('click', toggleFiltersMobile);

    // Fechar filtros ao clicar fora (mobile)
    document.addEventListener('click', (e) => {
      if (window.innerWidth < 1024) {
        const sidebar = elements.filtersSidebar;
        const toggle = elements.filtersToggle;
        if (sidebar && toggle && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
          closeFiltersMobile();
        }
      }
    });
  }

  function handleCheckboxFilter(checkbox) {
    const name = checkbox.name;
    const value = checkbox.value;

    if (name === 'category') {
      toggleArrayItem(state.filters.categories, value);
    } else if (name === 'brand') {
      toggleArrayItem(state.filters.brands, value);
    } else if (name === 'inStock') {
      state.filters.inStock = checkbox.checked;
    } else if (name === 'onSale') {
      state.filters.onSale = checkbox.checked;
    } else if (name === 'freeShipping') {
      state.filters.freeShipping = checkbox.checked;
    }

    state.currentPage = 1;
    applyFiltersAndRender();
    updateURL();
    updateClearFiltersVisibility();
  }

  function handlePriceInput() {
    const min = parseInt(elements.priceMinInput.value) || 0;
    const max = parseInt(elements.priceMaxInput.value) || 5000;

    state.filters.priceMin = Math.max(0, min);
    state.filters.priceMax = Math.min(5000, max);

    // Sincronizar slider
    if (elements.priceRange) {
      elements.priceRange.value = state.filters.priceMin;
    }

    state.currentPage = 1;
    applyFiltersAndRender();
    updateURL();
    updateClearFiltersVisibility();
  }

  function handlePriceRange() {
    const value = parseInt(elements.priceRange.value) || 0;
    state.filters.priceMin = value;

    if (elements.priceMinInput) {
      elements.priceMinInput.value = value;
    }

    // Não aplicar filtro a cada input do slider para performance
  }

  function toggleArrayItem(arr, item) {
    const index = arr.indexOf(item);
    if (index >= 0) {
      arr.splice(index, 1);
    } else {
      arr.push(item);
    }
  }

  function clearAllFilters() {
    state.filters = {
      categories: [],
      brands: [],
      priceMin: 0,
      priceMax: 5000,
      inStock: false,
      onSale: false,
      freeShipping: false
    };

    // Reset UI
    elements.filtersForm?.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    if (elements.priceMinInput) elements.priceMinInput.value = '';
    if (elements.priceMaxInput) elements.priceMaxInput.value = '';
    if (elements.priceRange) elements.priceRange.value = 0;

    state.currentPage = 1;
    applyFiltersAndRender();
    updateURL();
    updateClearFiltersVisibility();
  }

  function toggleFiltersMobile() {
    const isExpanded = elements.filtersToggle.getAttribute('aria-expanded') === 'true';
    elements.filtersToggle.setAttribute('aria-expanded', !isExpanded);
    elements.filtersSidebar.classList.toggle('mobile-open');
    document.body.style.overflow = isExpanded ? '' : 'hidden';
  }

  function closeFiltersMobile() {
    elements.filtersToggle.setAttribute('aria-expanded', 'false');
    elements.filtersSidebar.classList.remove('mobile-open');
    document.body.style.overflow = '';
  }

  // ========================================
  // FILTRAGEM E ORDENAÇÃO
  // ========================================
  function applyFiltersAndRender() {
    filterProducts();
    render();
    updateWishlistUI();
  }

  function filterProducts() {
    let results = [...state.products];

    // Filtro de categorias
    if (state.filters.categories.length > 0) {
      results = results.filter(p => state.filters.categories.includes(p.category));
    }

    // Filtro de marcas
    if (state.filters.brands.length > 0) {
      results = results.filter(p => state.filters.brands.includes(p.brand));
    }

    // Filtro de preço
    results = results.filter(p => p.price >= state.filters.priceMin && p.price <= state.filters.priceMax);

    // Filtro de estoque
    if (state.filters.inStock) {
      results = results.filter(p => p.inStock && p.stockCount > 0);
    }

    // Filtro de promoção
    if (state.filters.onSale) {
      results = results.filter(p => p.originalPrice && p.originalPrice > p.price);
    }

    // Filtro de frete grátis (simulado: produtos > 299.90)
    if (state.filters.freeShipping) {
      results = results.filter(p => p.price >= 299.90);
    }

    // Ordenação
    results = sortProducts(results, state.sortBy);

    state.filteredProducts = results;
  }

  function sortProducts(products, sortBy) {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      case 'popular':
      default:
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return sorted;
  }

  // ========================================
  // RENDERIZAÇÃO
  // ========================================
  function render() {
    renderProducts();
    renderPagination();
    updateResultsCount();
    updateClearFiltersVisibility();
  }

  function renderProducts() {
    if (!elements.grid) return;

    const start = (state.currentPage - 1) * state.productsPerPage;
    const end = start + state.productsPerPage;
    const pageProducts = state.filteredProducts.slice(start, end);

    if (pageProducts.length === 0) {
      elements.grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: var(--space-16) var(--space-4);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 80px; height: 80px; margin: 0 auto var(--space-6); opacity: 0.3;">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <h3 style="font-size: var(--font-size-xl); color: var(--color-gray-900); margin-bottom: var(--space-2);">Nenhum produto encontrado</h3>
          <p style="color: var(--color-gray-500); margin-bottom: var(--space-6); max-width: 400px; margin-left: auto; margin-right: auto;">Tente ajustar seus filtros ou buscar por outro termo</p>
          <button class="btn btn-primary" onclick="clearAllFilters()">Limpar filtros</button>
        </div>
      `;
      return;
    }

    // Usar a função createProductCard do main.js se disponível
    if (window.createProductCard) {
      elements.grid.innerHTML = pageProducts.map(window.createProductCard).join('');
    } else {
      // Fallback
      elements.grid.innerHTML = pageProducts.map(createProductCardFallback).join('');
    }
  }

  function createProductCardFallback(product) {
    const discount = window.getDiscountPercent ? window.getDiscountPercent(product.originalPrice, product.price) : 0;
    const inStock = product.inStock && product.stockCount > 0;
    const isWishlisted = window.Wishlist?.hasItem?.(product.id) || false;
    const formatPrice = window.formatPrice || (p => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

    return `
      <article class="product-card${!inStock ? ' out-of-stock' : ''}" data-id="${product.id}">
        <div class="product-image">
          <img src="${product.images?.[0] || 'https://via.placeholder.com/400x400/1e3a5f/fff?text=Sem+Imagem'}" alt="${product.name}" loading="lazy" width="400" height="400">
          ${product.badge || discount > 0 ? `
            <div class="product-badges">
              ${product.badge ? `<span class="badge badge-${product.badgeType || 'new'}">${product.badge}</span>` : ''}
              ${discount > 0 ? `<span class="badge badge-sale">-${discount}%</span>` : ''}
            </div>
          ` : ''}
          <button class="product-wishlist${isWishlisted ? ' active' : ''}" data-id="${product.id}" aria-label="${isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}" aria-pressed="${isWishlisted}" data-wishlist-action="${isWishlisted ? 'remove' : 'add'}">
            <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="product-info">
          <span class="product-brand">${product.brand}</span>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-rating">
            <div class="stars">${renderStarsFallback(product.rating)}</div>
            <span class="rating-value">${product.rating.toFixed(1)}</span>
            <span class="rating-count">(${product.reviewCount})</span>
          </div>
          <div class="product-price">
            <span class="current-price">${formatPrice(product.price)}</span>
            ${product.originalPrice && product.originalPrice > product.price ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>
          <div class="product-actions">
            <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}" ${!inStock ? 'disabled' : ''} aria-label="${inStock ? `Adicionar ${product.name} ao carrinho` : 'Produto indisponível'}">${inStock ? 'Comprar' : 'Indisponível'}</button>
            <button class="btn btn-icon btn-sm btn-outline quick-view-btn" data-id="${product.id}" aria-label="Visualização rápida de ${product.name}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
          </div>
        </div>
      </article>
    `;
  }

  function renderStarsFallback(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let html = '';

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        html += '<svg class="filled" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      } else if (i === fullStars + 1 && hasHalf) {
        html += '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      } else {
        html += '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      }
    }
    return html;
  }

  function renderPagination() {
    if (!elements.pagination) return;

    const totalPages = Math.ceil(state.filteredProducts.length / state.productsPerPage);

    if (totalPages <= 1) {
      elements.pagination.innerHTML = '';
      return;
    }

    let html = '';

    // Anterior
    html += `
      <button class="pagination-btn${state.currentPage === 1 ? ' disabled' : ''}" 
              data-page="${state.currentPage - 1}" 
              ${state.currentPage === 1 ? 'disabled' : ''}
              aria-label="Página anterior">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
    `;

    // Números das páginas
    const pages = getPaginationPages(state.currentPage, totalPages);
    pages.forEach(page => {
      if (page === '...') {
        html += '<span class="pagination-ellipsis" style="padding: var(--space-2); color: var(--color-gray-400);">…</span>';
      } else {
        html += `
          <button class="pagination-btn${page === state.currentPage ? ' active' : ''}" 
                  data-page="${page}" 
                  aria-label="Página ${page}"
                  ${page === state.currentPage ? 'aria-current="page"' : ''}>
            ${page}
          </button>
        `;
      }
    });

    // Próxima
    html += `
      <button class="pagination-btn${state.currentPage === totalPages ? ' disabled' : ''}" 
              data-page="${state.currentPage + 1}" 
              ${state.currentPage === totalPages ? 'disabled' : ''}
              aria-label="Próxima página">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    `;

    elements.pagination.innerHTML = html;

    // Event listeners para paginação
    elements.pagination.querySelectorAll('.pagination-btn:not(.disabled)').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = parseInt(btn.dataset.page);
        goToPage(page);
      });
    });
  }

  function getPaginationPages(current, total) {
    const pages = [];
    const delta = 2; // páginas adjacentes

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        pages.push(i);
      } else if (i === current - delta - 1 || i === current + delta + 1) {
        pages.push('...');
      }
    }

    return pages;
  }

  function goToPage(page) {
    const totalPages = Math.ceil(state.filteredProducts.length / state.productsPerPage);
    if (page < 1 || page > totalPages) return;

    state.currentPage = page;
    render();
    updateURL();
    scrollToTop();
  }

  function updateResultsCount() {
    if (elements.resultsCount) {
      elements.resultsCount.textContent = state.filteredProducts.length;
    }
  }

  function updateClearFiltersVisibility() {
    const hasFilters = state.filters.categories.length > 0 ||
                       state.filters.brands.length > 0 ||
                       state.filters.priceMin > 0 ||
                       state.filters.priceMax < 5000 ||
                       state.filters.inStock ||
                       state.filters.onSale ||
                       state.filters.freeShipping;

    if (elements.clearFiltersBtn) {
      elements.clearFiltersBtn.style.display = hasFilters ? 'inline-flex' : 'none';
    }
  }

  function updateWishlistUI() {
    window.Wishlist?.updateAllUI?.();
  }

  // ========================================
  // URL STATE
  // ========================================
  function updateURL() {
    const params = new URLSearchParams();

    // Manter parâmetros originais da categoria/busca/marca
    if (state.urlParams.has('cat')) params.set('cat', state.urlParams.get('cat'));
    if (state.urlParams.has('brand')) params.set('brand', state.urlParams.get('brand'));
    if (state.urlParams.has('q')) params.set('q', state.urlParams.get('q'));
    if (state.urlParams.has('type')) params.set('type', state.urlParams.get('type'));

    // Adicionar filtros ativos
    if (state.filters.categories.length) params.set('categories', state.filters.categories.join(','));
    if (state.filters.brands.length) params.set('brands', state.filters.brands.join(','));
    if (state.filters.priceMin > 0) params.set('priceMin', state.filters.priceMin);
    if (state.filters.priceMax < 5000) params.set('priceMax', state.filters.priceMax);
    if (state.filters.inStock) params.set('inStock', 'true');
    if (state.filters.onSale) params.set('onSale', 'true');
    if (state.filters.freeShipping) params.set('freeShipping', 'true');
    if (state.sortBy !== 'popular') params.set('sort', state.sortBy);
    if (state.currentPage > 1) params.set('page', state.currentPage);

    const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newURL);
  }

  function scrollToTop() {
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const toolbarHeight = document.querySelector('.toolbar')?.offsetHeight || 0;
    const offset = headerHeight + toolbarHeight + 20;

    window.scrollTo({ top: offset, behavior: 'smooth' });
  }

  // ========================================
  // UTILITÁRIOS
  // ========================================
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // ========================================
  // BOOTSTRAP
  // ========================================
  document.addEventListener('DOMContentLoaded', init);

  // Expor funções globais para uso inline
  window.clearAllFilters = clearAllFilters;
  window.goToPage = goToPage;

})();