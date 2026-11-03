# Periféricos Tech - E-commerce Front-end

Site de e-commerce completo para venda de periféricos (mouses, teclados, headsets, monitores e acessórios) desenvolvido em **HTML/CSS/JavaScript puro** com design **Tech/Profissional**.

## 🚀 Características

### Funcionalidades Implementadas
- ✅ **Catálogo de produtos** com 16 produtos reais (4 mouses, 4 teclados, 2 headsets, 2 monitores, 4 acessórios)
- ✅ **Página de produto detalhada** com galeria de imagens, abas (Descrição, Especificações, Avaliações, Entrega), produtos relacionados
- ✅ **Carrinho de compras** lateral (slide-out) e página completa
- ✅ **Lista de desejos (Wishlist)** com persistência
- ✅ **Busca em tempo real** com autocomplete
- ✅ **Filtros avançados** (categoria, marca, preço, disponibilidade, promoções)
- ✅ **Ordenação** (populares, preço, avaliação, novidades)
- ✅ **Paginação** no catálogo
- ✅ **Design responsivo** (mobile-first)
- ✅ **Acessibilidade** (ARIA, focus visible, semântico)
- ✅ **SEO ready** (meta tags, structured data JSON-LD)
- ✅ **Notificações toast** para feedback do usuário

### Tecnologias
- **HTML5** semântico
- **CSS3** com Custom Properties (Design Tokens)
- **JavaScript ES6+** (Modules pattern, IIFE)
- **Fontes**: Inter + JetBrains Mono (Google Fonts)
- **Ícones**: SVG inline
- **Imagens**: Unsplash (placeholders)

### Design System (Tech/Profissional)
- **Cores**: Azul escuro (#1e3a5f) como primária, tons de cinza neutros
- **Tipografia**: Inter (UI) + JetBrains Mono (código/preços)
- **Espaçamento**: Sistema de 4px (space-1 a space-20)
- **Bordas**: 4px, 8px, 12px, 16px, 24px
- **Sombras**: 4 níveis (sm, md, lg, xl)
- **Transições**: 150ms, 250ms, 350ms

## 📁 Estrutura do Projeto

```
perifericos-tech/
├── index.html              # Home page
├── categoria.html          # Catálogo com filtros
├── produto.html            # Página de produto
├── carrinho.html           # Carrinho de compras
├── css/
│   └── main.css            # Estilos principais (design system + componentes)
├── js/
│   ├── products.js         # Dados dos produtos + funções utilitárias
│   ├── cart.js             # Lógica do carrinho (sidebar + localStorage)
│   ├── wishlist.js         # Lista de desejos (localStorage)
│   ├── main.js             # Home page (renderização, busca, newsletter)
│   ├── catalog.js          # Página categoria (filtros, ordenação, paginação)
│   ├── product.js          # Página produto (galeria, abas, reviews, zoom)
│   └── cart-page.js        # Página carrinho completa
└── assets/
    └── images/
        └── favicon.svg
```

## 🛠️ Como Executar

### Opção 1: Live Server (VS Code) - Recomendado
1. Abra a pasta `perifericos-tech` no VS Code
2. Instale a extensão **Live Server**
3. Clique com botão direito no `index.html` → "Open with Live Server"

### Opção 2: Python HTTP Server
```bash
cd perifericos-tech
python -m http.server 8000
# Acesse http://localhost:8000
```

### Opção 3: Node.js http-server
```bash
cd perifericos-tech
npx http-server
# Acesse http://localhost:8080
```

### Opção 4: PHP Built-in Server
```bash
cd perifericos-tech
php -S localhost:8000
```

## 📱 Páginas Disponíveis

| Página | Descrição |
|--------|-----------|
| `index.html` | Home com hero, categorias, destaques, lançamentos, marcas, newsletter |
| `categoria.html` | Catálogo completo com sidebar de filtros, busca, ordenação, paginação |
| `produto.html?slug=mouse-gamer-pro-x1` | Detalhes do produto com galeria, tabs, reviews, produtos relacionados |
| `carrinho.html` | Carrinho completo com resumo do pedido, frete grátis progressivo |

## 🔧 Personalização

### Adicionar Novos Produtos
Edite `js/products.js` no array `PRODUCTS`:

```javascript
{
  id: 17,
  name: "Novo Produto",
  slug: "novo-produto",
  category: "mouses", // mouses, teclados, headsets, monitores, acessorios
  brand: "Marca",
  price: 299.90,
  originalPrice: 349.90, // opcional
  rating: 4.5,
  reviewCount: 100,
  badge: "Novo", // opcional
  badgeType: "new", // hot, new, premium, value
  images: ["url1", "url2", "url3"],
  description: "Descrição completa...",
  shortDescription: "Resumo curto",
  specs: { "Especificação": "Valor" },
  features: ["Feature 1", "Feature 2"],
  inStock: true,
  stockCount: 50
}
```

### Alterar Cores do Tema
Edite as **CSS Custom Properties** no início do `css/main.css`:

```css
:root {
  --color-primary: #1e3a5f;        /* Cor principal */
  --color-secondary: #0066cc;      /* Botões secundários */
  --color-accent: #00a86b;         /* Sucesso/CTAs positivos */
  --color-warning: #f59e0b;        /* Alertas */
  --color-error: #dc2626;          /* Erros */
  /* ... */
}
```

### Modificar Breakpoints
No `css/main.css`, procure por `@media (max-width: ...)`:
- `1200px` - Desktop grande
- `1024px` - Tablet/Desktop
- `768px` - Tablet
- `480px` - Mobile

## 📦 Dados Mockados

O projeto inclui 16 produtos reais com:
- **Mouses**: Logitech G Pro X, MX Master 3S, Razer Viper V3 Pro, MX Vertical
- **Teclados**: Logitech G915 TKL, Corsair K70 RGB MK.2, Razer Huntsman Mini, Keychron K2 V2
- **Headsets**: Razer BlackShark V2 Pro, Sony WH-1000XM5
- **Monitores**: LG 27" OLED 240Hz, Samsung 34" UltraWide 165Hz
- **Acessórios**: Razer Mousepad XL RGB, Ergotron Braço Articulado, Logitech Webcam 4K, Logitech Teclado Numérico

## ♿ Acessibilidade

- Semântica HTML5 correta
- ARIA labels e roles
- Focus visible personalizado
- Contraste WCAG AA
- Navegação por teclado
- Screen reader friendly
- Reduced motion support

## 🔍 SEO

- Meta tags completas
- Open Graph / Twitter Cards ready
- Structured Data (JSON-LD) nas páginas de produto
- URLs amigáveis
- Sitemap ready
- Breadcrumb navigation

## 🚀 Performance

- CSS e JS organizados e modulares
- Imagens com `loading="lazy"`
- `preconnect` para domínios externos
- Fontes com `font-display: swap`
- Debounce na busca (200ms)
- Event delegation

## 📄 Licença

Projeto educacional/demonstração. Livre para uso e modificação.

---

**Desenvolvido com ❤️ para demonstrar front-end moderno em HTML/CSS/JS puro.**