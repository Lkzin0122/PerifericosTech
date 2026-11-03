/**
 * Página de Produto - Periféricos Tech
 * Galeria de imagens, abas, avaliações, produtos relacionados
 */

(function() {
  'use strict';

  // ========================================
  // ESTADO
  // ========================================
  let state = {
    product: null,
    currentImageIndex: 0,
    reviews: [],
    currentReviewPage: 1,
    reviewsPerPage: 5
  };

  // Elementos DOM
  const elements = {
    gallery: null,
    info: null,
    breadcrumb: null,
    tabButtons: {},
    tabPanels: {},
    relatedGrid: null
  };

  // ========================================
  // INICIALIZAÇÃO
  // ========================================
  function init() {
    cacheElements();
    loadProductFromURL();
    if (state.product) {
      renderAll();
      bindEvents();
      updateWishlistUI();
    } else {
      showNotFound();
    }
  }

  function cacheElements() {
    elements.gallery = document.getElementById('product-gallery');
    elements.info = document.getElementById('product-info-detail');
    elements.breadcrumb = document.getElementById('breadcrumb');
    elements.tabButtons = {
      description: document.getElementById('tab-btn-description'),
      specs: document.getElementById('tab-btn-specs'),
      reviews: document.getElementById('tab-btn-reviews'),
      shipping: document.getElementById('tab-btn-shipping')
    };
    elements.tabPanels = {
      description: document.getElementById('tab-description'),
      specs: document.getElementById('tab-specs'),
      reviews: document.getElementById('tab-reviews'),
      shipping: document.getElementById('tab-shipping')
    };
    elements.relatedGrid = document.getElementById('related-grid');
  }

  function loadProductFromURL() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const id = params.get('id');

    if (slug && window.getProductBySlug) {
      state.product = window.getProductBySlug(slug);
    } else if (id && window.getProductById) {
      state.product = window.getProductById(id);
    }

    if (!state.product && window.PRODUCTS && window.PRODUCTS.length) {
      state.product = window.PRODUCTS[0];
    }
  }

  function showNotFound() {
    document.title = 'Produto não encontrado | Periféricos Tech';
    if (elements.info) {
      elements.info.innerHTML = `
        <div style="text-align: center; padding: var(--space-16) var(--space-4);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 80px; height: 80px; margin: 0 auto var(--space-6); opacity: 0.3;"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <h1 style="font-size: var(--font-size-3xl); color: var(--color-gray-900); margin-bottom: var(--space-3);">Produto não encontrado</h1>
          <p style="color: var(--color-gray-500); margin-bottom: var(--space-6); max-width: 400px; margin-left: auto; margin-right: auto;">O produto que você procura não existe ou foi removido.</p>
          <a href="categoria.html" class="btn btn-primary">Ver catálogo completo</a>
        </div>
      `;
    }
    if (elements.gallery) elements.gallery.style.display = 'none';
  }

  // ========================================
  // RENDERIZAÇÃO
  // ========================================
  function renderAll() {
    document.title = `${state.product.name} | Periféricos Tech`;
    renderBreadcrumb();
    renderGallery();
    renderInfo();
    renderTabs();
    renderRelatedProducts();
    generateStructuredData();
  }

  function renderBreadcrumb() {
    if (!elements.breadcrumb) return;

    const categoryNames = {
      mouses: 'Mouses',
      teclados: 'Teclados',
      headsets: 'Headsets',
      monitores: 'Monitores',
      acessorios: 'Acessórios'
    };

    elements.breadcrumb.innerHTML = `
      <li><a href="index.html" style="color: inherit;">Home</a></li>
      <svg style="width: 16px; height: 16px; margin: 0 var(--space-2);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      <li><a href="categoria.html?cat=${state.product.category}" style="color: inherit;">${categoryNames[state.product.category] || state.product.category}</a></li>
      <svg style="width: 16px; height: 16px; margin: 0 var(--space-2);" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      <li aria-current="page" style="color: var(--color-gray-900); max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${state.product.name}</li>
    `;
  }

  function renderGallery() {
    if (!elements.gallery) return;

    const images = state.product.images || ['https://via.placeholder.com/600x600/1e3a5f/fff?text=Sem+Imagem'];
    const mainImage = images[state.currentImageIndex] || images[0];

    elements.gallery.innerHTML = `
      <div class="gallery-main" style="position: relative; border-radius: var(--radius-xl); overflow: hidden; background: var(--color-gray-100); margin-bottom: var(--space-4);">
        <img src="${mainImage}" alt="${state.product.name}" id="main-product-image" style="width: 100%; aspect-ratio: 1; object-fit: cover; cursor: zoom-in;">
        ${images.length > 1 ? `
          <button class="gallery-nav prev" aria-label="Imagem anterior" style="position: absolute; top: 50%; left: var(--space-4); transform: translateY(-50%); width: 48px; height: 48px; border-radius: var(--radius-full); background: var(--color-white); box-shadow: var(--shadow-lg); display: flex; align-items: center; justify-content: center; color: var(--color-gray-700); opacity: 0; transition: all var(--transition-fast);" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px;"><path d="M15 18l-6-6 6-6"/></svg></button>
          <button class="gallery-nav next" aria-label="Próxima imagem" style="position: absolute; top: 50%; right: var(--space-4); transform: translateY(-50%); width: 48px; height: 48px; border-radius: var(--radius-full); background: var(--color-white); box-shadow: var(--shadow-lg); display: flex; align-items: center; justify-content: center; color: var(--color-gray-700); opacity: 0; transition: all var(--transition-fast);" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 24px; height: 24px;"><path d="M9 18l6-6-6-6"/></svg></button>
        ` : ''}
      </div>
      ${images.length > 1 ? `
        <div class="gallery-thumbs" style="display: flex; gap: var(--space-3); overflow-x: auto; padding: var(--space-2);">
          ${images.map((img, i) => `
            <button class="gallery-thumb${i === state.currentImageIndex ? ' active' : ''}" data-index="${i}" aria-label="Ver imagem ${i + 1}" aria-current="${i === state.currentImageIndex ? 'true' : 'false'}" style="flex: 0 0 80px; height: 80px; border-radius: var(--radius-md); overflow: hidden; border: 2px solid ${i === state.currentImageIndex ? 'var(--color-primary)' : 'transparent'}; cursor: pointer; transition: all var(--transition-fast); background: var(--color-gray-100);">
              <img src="${img}" alt="${state.product.name} - visão ${i + 1}" style="width: 100%; height: 100%; object-fit: cover;">
            </button>
          `).join('')}
        </div>
      ` : ''}
    `;
  }

  function renderInfo() {
    if (!elements.info) return;

    const discount = window.getDiscountPercent ? window.getDiscountPercent(state.product.originalPrice, state.product.price) : 0;
    const inStock = state.product.inStock && state.product.stockCount > 0;
    const isWishlisted = window.Wishlist?.hasItem?.(state.product.id) || false;
    const formatPrice = window.formatPrice || (p => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

    elements.info.innerHTML = `
      <div class="product-header">
        <span class="product-brand" style="font-size: var(--font-size-sm); font-weight: var(--font-weight-medium); color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.05em;">${state.product.brand}</span>
        <h1 style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-gray-900); margin: var(--space-2) 0 var(--space-4); line-height: var(--line-height-tight);">${state.product.name}</h1>
      </div>

      <div class="product-rating" style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4); flex-wrap: wrap;">
        <div class="stars" style="display: flex; gap: 2px;">${renderStars(state.product.rating)}</div>
        <span class="rating-value" style="font-size: var(--font-size-lg); font-weight: var(--font-weight-bold); color: var(--color-gray-900);">${state.product.rating.toFixed(1)}</span>
        <span class="rating-count" style="color: var(--color-gray-500);">(${state.product.reviewCount} avaliações)</span>
        <button class="btn btn-ghost btn-sm" id="scroll-to-reviews" style="margin-left: auto;">Ver avaliações</button>
      </div>

      ${state.product.badge ? `
        <div class="product-badges" style="display: flex; gap: var(--space-2); margin-bottom: var(--space-4); flex-wrap: wrap;">
          <span class="badge badge-${state.product.badgeType || 'new'}">${state.product.badge}</span>
          ${discount > 0 ? `<span class="badge badge-sale">-${discount}% OFF</span>` : ''}
        </div>
      ` : discount > 0 ? `
        <div class="product-badges" style="display: flex; gap: var(--space-2); margin-bottom: var(--space-4);">
          <span class="badge badge-sale">-${discount}% OFF</span>
        </div>
      ` : ''}

      <div class="product-price" style="display: flex; align-items: baseline; gap: var(--space-3); margin-bottom: var(--space-6); flex-wrap: wrap;">
        <span class="current-price" style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); color: var(--color-gray-900);">${formatPrice(state.product.price)}</span>
        ${state.product.originalPrice && state.product.originalPrice > state.product.price ? `
          <span class="original-price" style="font-size: var(--font-size-xl); color: var(--color-gray-400); text-decoration: line-through;">${formatPrice(state.product.originalPrice)}</span>
        ` : ''}
        ${inStock && state.product.stockCount <= 10 ? `
          <span class="stock-alert" style="font-size: var(--font-size-sm); color: var(--color-warning); background: #fef3c7; padding: var(--space-1) var(--space-2); border-radius: var(--radius-full); display: flex; align-items: center; gap: var(--space-1);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Apenas ${state.product.stockCount} em estoque
          </span>
        ` : ''}
      </div>

      <p class="product-short-desc" style="color: var(--color-gray-600); line-height: var(--line-height-relaxed); margin-bottom: var(--space-6); font-size: var(--font-size-lg);">${state.product.shortDescription}</p>

      <div class="product-actions" style="display: flex; gap: var(--space-3); margin-bottom: var(--space-8); flex-wrap: wrap;">
        <button class="btn btn-primary btn-lg add-to-cart-btn" data-id="${state.product.id}" ${!inStock ? 'disabled' : ''} style="flex: 1; min-width: 200px; height: 56px;" aria-label="${inStock ? `Adicionar ${state.product.name} ao carrinho` : 'Produto indisponível'}">
          ${inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
        </button>
        <button class="btn btn-icon btn-lg${isWishlisted ? ' active' : ''}" data-id="${state.product.id}" aria-label="${isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}" aria-pressed="${isWishlisted}" data-wishlist-action="${isWishlisted ? 'remove' : 'add'}" style="width: 56px; height: 56px;">
          <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button class="btn btn-secondary btn-lg" id="buy-now-btn" ${!inStock ? 'disabled' : ''} style="height: 56px;">Comprar Agora</button>
      </div>

      <div class="product-meta" style="display: flex; flex-wrap: wrap; gap: var(--space-4); font-size: var(--font-size-sm); color: var(--color-gray-500); border-top: 1px solid var(--color-gray-200); padding-top: var(--space-6);">
        <div style="display: flex; align-items: center; gap: var(--space-2);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><path d="M21 12V7H5v5"/><path d="M16 7l-4 4-4-4"/><path d="M12 17v5"/></svg><span>Entrega para todo Brasil</span></div>
        <div style="display: flex; align-items: center; gap: var(--space-2);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span>Compra segura</span></div>
        <div style="display: flex; align-items: center; gap: var(--space-2);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><path d="M21 12V7H5v5"/><path d="M16 7l-4 4-4-4"/><path d="M12 17v5"/></svg><span>Troca em 30 dias</span></div>
        <div style="display: flex; align-items: center; gap: var(--space-2);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg><span>Até 12x sem juros</span></div>
      </div>
    `;
  }

  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let html = '';

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        html += '<svg class="filled" viewBox="0 0 24 24" style="width: 20px; height: 20px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      } else if (i === fullStars + 1 && hasHalf) {
        html += '<svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      } else {
        html += '<svg viewBox="0 0 24 24" style="width: 20px; height: 20px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      }
    }
    return html;
  }

  function renderTabs() {
    // Description
    const descContent = document.getElementById('tab-description-content');
    if (descContent) {
      descContent.innerHTML = `
        <div style="line-height: var(--line-height-relaxed); color: var(--color-gray-700);">
          <p style="margin-bottom: var(--space-4); font-size: var(--font-size-lg);">${state.product.description}</p>
          ${state.product.features && state.product.features.length ? `
            <h3 style="font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); margin: var(--space-6) 0 var(--space-3);">Destaques</h3>
            <ul style="list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-3);">
              ${state.product.features.map(f => `
                <li style="display: flex; align-items: flex-start; gap: var(--space-3); padding: var(--space-3); background: var(--color-gray-50); border-radius: var(--radius-md);">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2" style="width: 20px; height: 20px; flex-shrink: 0; margin-top: 2px;"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          ` : ''}
        </div>
      `;
    }

    // Specs
    const specsContent = document.getElementById('tab-specs-content');
    if (specsContent && state.product.specs) {
      specsContent.innerHTML = `
        <dl style="display: grid; grid-template-columns: auto 1fr; gap: var(--space-3) var(--space-6); max-width: 600px;">
          ${Object.entries(state.product.specs).map(([key, value]) => `
            <dt style="color: var(--color-gray-500); font-weight: var(--font-weight-medium);">${key}</dt>
            <dd style="color: var(--color-gray-900); font-weight: var(--font-weight-normal);">${value}</dd>
          `).join('')}
        </dl>
      `;
    }

    // Reviews
    const reviewsContent = document.getElementById('tab-reviews-content');
    if (reviewsContent) {
      renderReviews(reviewsContent);
    }

    // Shipping
    const shippingContent = document.getElementById('tab-shipping-content');
    if (shippingContent) {
      shippingContent.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-6);">
          <div style="padding: var(--space-6); background: var(--color-gray-50); border-radius: var(--radius-lg);">
            <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-3); display: flex; align-items: center; gap: var(--space-2);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;"><path d="M21 12V7H5v5"/><path d="M16 7l-4 4-4-4"/><path d="M12 17v5"/></svg> Entrega</h4>
            <ul style="color: var(--color-gray-600); line-height: var(--line-height-relaxed); display: flex; flex-direction: column; gap: var(--space-2);">
              <li>Frete grátis para compras acima de R$ 299,90</li>
              <li>Entrega expressa disponível para capitais (1-2 dias úteis)</li>
              <li>Entrega padrão: 3-7 dias úteis</li>
              <li>Retirada na loja disponível em São Paulo/SP</li>
            </ul>
          </div>
          <div style="padding: var(--space-6); background: var(--color-gray-50); border-radius: var(--radius-lg);">
            <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-3); display: flex; align-items: center; gap: var(--space-2);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Garantia</h4>
            <ul style="color: var(--color-gray-600); line-height: var(--line-height-relaxed); display: flex; flex-direction: column; gap: var(--space-2);">
              <li>Garantia de 12 meses contra defeitos de fabricação</li>
              <li>Suporte técnico especializado</li>
              <li>Troca imediata para produtos com defeito (7 dias)</li>
              <li>Assistência técnica autorizada em todo Brasil</li>
            </ul>
          </div>
          <div style="padding: var(--space-6); background: var(--color-gray-50); border-radius: var(--radius-lg);">
            <h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-3); display: flex; align-items: center; gap: var(--space-2);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px;"><path d="M21 12V7H5v5"/><path d="M16 7l-4 4-4-4"/><path d="M12 17v5"/></svg> Devoluções</h4>
            <ul style="color: var(--color-gray-600); line-height: var(--line-height-relaxed); display: flex; flex-direction: column; gap: var(--space-2);">
              <li>Arrependimento: 7 dias corridos após recebimento</li>
              <li>Produto deve estar lacrado e com acessórios</li>
              <li>Frete de devolução por nossa conta</li>
              <li>Estorno no mesmo meio de pagamento</li>
            </ul>
          </div>
        </div>
      `;
    }

    // Contador de avaliações
    const reviewsCount = document.getElementById('reviews-count');
    if (reviewsCount) {
      reviewsCount.textContent = state.product.reviewCount;
    }
  }

  function renderReviews(container) {
    // Gerar avaliações mockadas
    const mockReviews = generateMockReviews(state.product.reviewCount || 0);
    state.reviews = mockReviews;

    const start = (state.currentReviewPage - 1) * state.reviewsPerPage;
    const pageReviews = mockReviews.slice(start, start + state.reviewsPerPage);

    container.innerHTML = `
      <div class="reviews-summary" style="display: grid; grid-template-columns: 200px 1fr; gap: var(--space-8); margin-bottom: var(--space-8); padding-bottom: var(--space-8); border-bottom: 1px solid var(--color-gray-200);">
        <div style="text-align: center;">
          <div style="font-size: 4rem; font-weight: var(--font-weight-bold); color: var(--color-gray-900); line-height: 1;">${state.product.rating.toFixed(1)}</div>
          <div class="stars" style="display: flex; justify-content: center; gap: 2px; margin: var(--space-2) 0;">${renderStars(state.product.rating)}</div>
          <div style="color: var(--color-gray-500); font-size: var(--font-size-sm);">${state.product.reviewCount} avaliações</div>
        </div>
        <div class="rating-bars">
          ${[5,4,3,2,1].map(stars => {
            const count = mockReviews.filter(r => r.rating === stars).length;
            const percent = state.product.reviewCount > 0 ? (count / state.product.reviewCount) * 100 : 0;
            return `
              <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
                <span style="width: 40px; font-size: var(--font-size-sm); color: var(--color-gray-500);">${stars}★</span>
                <div style="flex: 1; height: 8px; background: var(--color-gray-200); border-radius: var(--radius-full); overflow: hidden;">
                  <div style="width: ${percent}%; height: 100%; background: var(--color-warning); border-radius: var(--radius-full); transition: width 0.5s ease;"></div>
                </div>
                <span style="width: 40px; font-size: var(--font-size-sm); color: var(--color-gray-500); text-align: right;">${count}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="reviews-list" style="display: flex; flex-direction: column; gap: var(--space-6);">
        ${pageReviews.map(review => `
          <article class="review-item" style="padding: var(--space-6); background: var(--color-gray-50); border-radius: var(--radius-lg);">
            <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-3);">
              <div>
                <strong style="color: var(--color-gray-900);">${review.author}</strong>
                <span style="margin-left: var(--space-3); color: var(--color-gray-500); font-size: var(--font-size-sm);">${review.date}</span>
                ${review.verified ? '<span style="margin-left: var(--space-3); font-size: var(--font-size-xs); color: var(--color-accent); background: #dcfce7; padding: 2px 8px; border-radius: var(--radius-full);">Compra verificada</span>' : ''}
              </div>
              <div class="stars" style="display: flex; gap: 1px;">${renderSmallStars(review.rating)}</div>
            </div>
            ${review.title ? `<h4 style="font-weight: var(--font-weight-semibold); margin-bottom: var(--space-2);">${review.title}</h4>` : ''}
            <p style="color: var(--color-gray-700); line-height: var(--line-height-relaxed);">${review.text}</p>
            ${review.pros || review.cons ? `
              <div style="display: flex; gap: var(--space-4); margin-top: var(--space-4); font-size: var(--font-size-sm);">
                ${review.pros ? `<div style="color: var(--color-accent);"><strong>Prós:</strong> ${review.pros}</div>` : ''}
                ${review.cons ? `<div style="color: var(--color-error);"><strong>Contras:</strong> ${review.cons}</div>` : ''}
              </div>
            ` : ''}
          </article>
        `).join('')}
      </div>

      ${mockReviews.length > state.reviewsPerPage ? `
        <div class="reviews-pagination" style="display: flex; justify-content: center; gap: var(--space-2); margin-top: var(--space-8);">
          <button class="btn btn-outline btn-sm" id="prev-reviews" ${state.currentReviewPage === 1 ? 'disabled' : ''}>Anterior</button>
          <span style="display: flex; align-items: center; gap: var(--space-2);">
            ${Array.from({length: Math.ceil(mockReviews.length / state.reviewsPerPage)}, (_, i) => i + 1).map(p => `
              <button class="pagination-btn${p === state.currentReviewPage ? ' active' : ''}" data-page="${p}" style="width: 36px; height: 36px; border-radius: var(--radius-md); border: 1px solid ${p === state.currentReviewPage ? 'var(--color-primary)' : 'var(--color-gray-300)'}; background: ${p === state.currentReviewPage ? 'var(--color-primary)' : 'transparent'}; color: ${p === state.currentReviewPage ? 'white' : 'var(--color-gray-700)'};">${p}</button>
            `).join('')}
          </span>
          <button class="btn btn-outline btn-sm" id="next-reviews" ${state.currentReviewPage >= Math.ceil(mockReviews.length / state.reviewsPerPage) ? 'disabled' : ''}>Próxima</button>
        </div>
      ` : ''}
    `;
  }

  function renderSmallStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let html = '';

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        html += '<svg class="filled" viewBox="0 0 24 24" style="width: 16px; height: 16px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      } else if (i === fullStars + 1 && hasHalf) {
        html += '<svg viewBox="0 0 24 24" style="width: 16px; height: 16px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      } else {
        html += '<svg viewBox="0 0 24 24" style="width: 16px; height: 16px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
      }
    }
    return html;
  }

  function generateMockReviews(totalCount) {
    const names = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Lucas Ferreira', 'Camila Rodrigues', 'Rafael Almeida', 'Fernanda Lima', 'Gustavo Pereira', 'Juliana Martins'];
    const titles = ['Excelente produto!', 'Muito bom', 'Atendeu expectativas', 'Recomendo', 'Ótimo custo-benefício', 'Qualidade premium', 'Vale cada centavo', 'Surpreendeu positivamente'];
    const texts = [
      'Produto chegou rápido, bem embalado e funcionando perfeitamente. A qualidade de construção é excelente.',
      'Uso há algumas semanas e não tenho do que reclamar. Performance incrível, exatamente o que procurava.',
      'Bom produto, cumpre o que promete. O acabamento poderia ser um pouco melhor mas pelo preço está ótimo.',
      'Superou minhas expectativas. Muito confortável para uso prolongado, materiais de alta qualidade.',
      'Entrega rápida, produto original. Recomendo a loja e o produto sem dúvidas.',
      'Excelente custo-benefício. Funciona perfeitamente para jogos e trabalho.',
      'Produto premium, sente-se a qualidade ao tocar. Vale o investimento para quem usa profissionalmente.',
      'Chegou antes do prazo, embalagem impecável. Estou muito satisfeito com a compra.'
    ];
    const pros = ['Ótima construção', 'Muito confortável', 'Desempenho excelente', 'Design bonito', 'Fácil configuração', 'Bateria dura muito'];
    const cons = ['Preço alto', 'Cabo poderia ser mais longo', 'Software poderia ser melhor', 'Peso elevado', 'Poucas opções de cor'];

    const reviews = [];
    for (let i = 0; i < Math.min(totalCount, 20); i++) {
      const rating = [5,5,5,5,4,4,4,3,3,2][Math.floor(Math.random() * 10)];
      reviews.push({
        author: names[Math.floor(Math.random() * names.length)],
        rating,
        title: titles[Math.floor(Math.random() * titles.length)],
        text: texts[Math.floor(Math.random() * texts.length)],
        date: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/2024`,
        verified: Math.random() > 0.3,
        pros: rating >= 4 && Math.random() > 0.5 ? pros[Math.floor(Math.random() * pros.length)] : '',
        cons: rating <= 3 && Math.random() > 0.5 ? cons[Math.floor(Math.random() * cons.length)] : ''
      });
    }
    return reviews;
  }

  function renderRelatedProducts() {
    if (!elements.relatedGrid || !window.getRelatedProducts) return;

    const related = window.getRelatedProducts(state.product.id, 4);
    if (related.length === 0) {
      elements.relatedGrid.closest('.related-products').style.display = 'none';
      return;
    }

    if (window.createProductCard) {
      elements.relatedGrid.innerHTML = related.map(window.createProductCard).join('');
    } else {
      elements.relatedGrid.innerHTML = related.map(createProductCardFallback).join('');
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
          <div class="product-rating"><div class="stars">${renderStarsFallback(product.rating)}</div><span class="rating-value">${product.rating.toFixed(1)}</span><span class="rating-count">(${product.reviewCount})</span></div>
          <div class="product-price"><span class="current-price">${formatPrice(product.price)}</span>${product.originalPrice && product.originalPrice > product.price ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}</div>
          <div class="product-actions"><button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}" ${!inStock ? 'disabled' : ''} aria-label="${inStock ? `Adicionar ${product.name} ao carrinho` : 'Produto indisponível'}">${inStock ? 'Comprar' : 'Indisponível'}</button><button class="btn btn-icon btn-sm btn-outline quick-view-btn" data-id="${product.id}" aria-label="Visualização rápida de ${product.name}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button></div>
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

  function generateStructuredData() {
    const formatPrice = window.formatPrice || (p => p.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": state.product.name,
      "description": state.product.description,
      "brand": { "@type": "Brand", "name": state.product.brand },
      "sku": state.product.slug,
      "mpn": state.product.id.toString(),
      "image": state.product.images?.[0] || '',
      "offers": {
        "@type": "Offer",
        "url": window.location.href,
        "priceCurrency": "BRL",
        "price": state.product.price.toFixed(2),
        "priceValidUntil": new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        "availability": state.product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": { "@type": "Organization", "name": "Periféricos Tech" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": state.product.rating,
        "reviewCount": state.product.reviewCount
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // ========================================
  // EVENTOS
  // ========================================
  function bindEvents() {
    // Galeria
    bindGalleryEvents();

    // Abas
    bindTabEvents();

    // Botões de ação
    bindActionEvents();

    // Avaliações
    bindReviewEvents();

    // Scroll para avaliações
    const scrollBtn = document.getElementById('scroll-to-reviews');
    scrollBtn?.addEventListener('click', () => {
      document.getElementById('tab-btn-reviews')?.click();
      document.getElementById('tab-reviews')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function bindGalleryEvents() {
    // Thumbnails
    elements.gallery?.addEventListener('click', (e) => {
      const thumb = e.target.closest('.gallery-thumb');
      if (thumb) {
        const index = parseInt(thumb.dataset.index);
        changeImage(index);
      }
    });

    // Navegação
    elements.gallery?.addEventListener('click', (e) => {
      const nav = e.target.closest('.gallery-nav');
      if (nav) {
        const images = state.product.images || [];
        if (nav.classList.contains('prev')) {
          changeImage((state.currentImageIndex - 1 + images.length) % images.length);
        } else {
          changeImage((state.currentImageIndex + 1) % images.length);
        }
      }
    });

    // Zoom no clique da imagem principal
    const mainImg = document.getElementById('main-product-image');
    mainImg?.addEventListener('click', openImageZoom);
  }

  function changeImage(index) {
    state.currentImageIndex = index;
    const images = state.product.images || [];
    const mainImg = document.getElementById('main-product-image');
    if (mainImg && images[index]) {
      mainImg.src = images[index];
      mainImg.alt = `${state.product.name} - visão ${index + 1}`;
    }

    // Atualizar thumbnails
    elements.gallery?.querySelectorAll('.gallery-thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
      thumb.setAttribute('aria-current', i === index);
      thumb.style.borderColor = i === index ? 'var(--color-primary)' : 'transparent';
    });
  }

  function openImageZoom() {
    const images = state.product.images || [];
    const currentIndex = state.currentImageIndex;

    const modal = document.createElement('div');
    modal.className = 'image-zoom-modal';
    modal.innerHTML = `
      <div class="zoom-overlay" aria-hidden="true"></div>
      <div class="zoom-container" role="dialog" aria-modal="true">
        <button class="zoom-close" aria-label="Fechar zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
        <button class="zoom-nav prev" aria-label="Imagem anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
        <button class="zoom-nav next" aria-label="Próxima imagem"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
        <img src="${images[currentIndex]}" alt="${state.product.name}" class="zoom-image">
        <div class="zoom-counter">${currentIndex + 1} / ${images.length}</div>
        <div class="zoom-thumbs">
          ${images.map((img, i) => `
            <img src="${img}" alt="" class="${i === currentIndex ? 'active' : ''}" data-index="${i}">
          `).join('')}
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .image-zoom-modal { position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.95); }
      .zoom-overlay { position: absolute; inset: 0; }
      .zoom-container { position: relative; max-width: 90vw; max-height: 90vh; display: flex; flex-direction: column; align-items: center; }
      .zoom-close { position: absolute; top: -60px; right: 0; width: 48px; height: 48px; border-radius: var(--radius-full); background: var(--color-white); display: flex; align-items: center; justify-content: center; color: var(--color-gray-700); box-shadow: var(--shadow-lg); }
      .zoom-nav { position: absolute; top: 50%; transform: translateY(-50%); width: 56px; height: 56px; border-radius: var(--radius-full); background: var(--color-white); display: flex; align-items: center; justify-content: center; color: var(--color-gray-700); box-shadow: var(--shadow-lg); }
      .zoom-nav.prev { left: -80px; } .zoom-nav.next { right: -80px; }
      .zoom-image { max-width: 100%; max-height: 70vh; border-radius: var(--radius-lg); }
      .zoom-counter { color: var(--color-white); margin: var(--space-4) 0; font-size: var(--font-size-sm); }
      .zoom-thumbs { display: flex; gap: var(--space-2); margin-top: var(--space-4); }
      .zoom-thumbs img { width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-sm); cursor: pointer; opacity: 0.5; border: 2px solid transparent; }
      .zoom-thumbs img.active { opacity: 1; border-color: var(--color-primary); }
      @media (max-width: 768px) { .zoom-nav { display: none; } .zoom-close { top: -50px; right: -10px; } }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    let currentZoomIndex = currentIndex;

    const updateZoom = () => {
      const zoomImg = modal.querySelector('.zoom-image');
      const counter = modal.querySelector('.zoom-counter');
      zoomImg.src = images[currentZoomIndex];
      counter.textContent = `${currentZoomIndex + 1} / ${images.length}`;
      modal.querySelectorAll('.zoom-thumbs img').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === currentZoomIndex);
      });
    };

    modal.querySelector('.zoom-nav.prev')?.addEventListener('click', () => {
      currentZoomIndex = (currentZoomIndex - 1 + images.length) % images.length;
      updateZoom();
    });
    modal.querySelector('.zoom-nav.next')?.addEventListener('click', () => {
      currentZoomIndex = (currentZoomIndex + 1) % images.length;
      updateZoom();
    });
    modal.querySelectorAll('.zoom-thumbs img').forEach(thumb => {
      thumb.addEventListener('click', () => {
        currentZoomIndex = parseInt(thumb.dataset.index);
        updateZoom();
      });
    });

    const closeZoom = () => {
      modal.remove();
      style.remove();
      document.body.style.overflow = '';
    };

    modal.querySelector('.zoom-close').addEventListener('click', closeZoom);
    modal.querySelector('.zoom-overlay').addEventListener('click', closeZoom);

    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        closeZoom();
        document.removeEventListener('keydown', escHandler);
      }
      if (e.key === 'ArrowLeft') {
        currentZoomIndex = (currentZoomIndex - 1 + images.length) % images.length;
        updateZoom();
      }
      if (e.key === 'ArrowRight') {
        currentZoomIndex = (currentZoomIndex + 1) % images.length;
        updateZoom();
      }
    });
  }

  function bindTabEvents() {
    Object.keys(elements.tabButtons).forEach(key => {
      const btn = elements.tabButtons[key];
      const panel = elements.tabPanels[key];
      if (btn && panel) {
        btn.addEventListener('click', () => {
          Object.values(elements.tabButtons).forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
            b.style.borderBottomColor = 'transparent';
            b.style.color = 'var(--color-gray-500)';
          });
          Object.values(elements.tabPanels).forEach(p => p.style.display = 'none');

          btn.classList.add('active');
          btn.setAttribute('aria-selected', 'true');
          btn.style.borderBottomColor = 'var(--color-primary)';
          btn.style.color = 'var(--color-primary)';
          panel.style.display = 'block';
        });
      }
    });
  }

  function bindActionEvents() {
    // Add to cart
    elements.info?.addEventListener('click', (e) => {
      const btn = e.target.closest('.add-to-cart-btn');
      if (btn && !btn.disabled) {
        window.Cart?.addItem(state.product);
      }
    });

    // Buy now
    const buyNowBtn = document.getElementById('buy-now-btn');
    buyNowBtn?.addEventListener('click', () => {
      if (window.Cart?.addItem(state.product)) {
        window.Cart?.open();
      }
    });
  }

  function bindReviewEvents() {
    const reviewsContent = document.getElementById('tab-reviews-content');
    if (!reviewsContent) return;

    reviewsContent.addEventListener('click', (e) => {
      const btn = e.target.closest('.pagination-btn');
      if (btn) {
        const page = parseInt(btn.dataset.page);
        state.currentReviewPage = page;
        renderReviews(reviewsContent);
        bindReviewEvents(); // Re-bind after re-render
      }

      if (e.target.id === 'prev-reviews' && state.currentReviewPage > 1) {
        state.currentReviewPage--;
        renderReviews(reviewsContent);
        bindReviewEvents();
      }

      if (e.target.id === 'next-reviews') {
        const totalPages = Math.ceil(state.reviews.length / state.reviewsPerPage);
        if (state.currentReviewPage < totalPages) {
          state.currentReviewPage++;
          renderReviews(reviewsContent);
          bindReviewEvents();
        }
      }
    });
  }

  function updateWishlistUI() {
    window.Wishlist?.updateAllUI?.();
  }

  // ========================================
  // BOOTSTRAP
  // ========================================
  document.addEventListener('DOMContentLoaded', init);

})();