/**
 * Catálogo de produtos - Periféricos Tech
 * Dados mockados para demonstração do front-end
 */

const PRODUCTS = [
  // Mouses
  {
    id: 1,
    name: "Mouse Gamer Pro X1",
    slug: "mouse-gamer-pro-x1",
    category: "mouses",
    brand: "Logitech",
    price: 349.90,
    originalPrice: 429.90,
    rating: 4.8,
    reviewCount: 1247,
    badge: "Mais Vendido",
    badgeType: "hot",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=600&h=600&fit=crop"
    ],
    description: "Mouse gamer de alta performance com sensor HERO 25K, 11 botões programáveis, iluminação RGB LIGHTSYNC e design ergonômico para sessões prolongadas.",
    shortDescription: "Sensor HERO 25K • 11 botões programáveis • RGB LIGHTSYNC • Design ergonômico",
    specs: {
      "Sensor": "HERO 25K (até 25.600 DPI)",
      "Botões": "11 programáveis",
      "Conexão": "USB com fio / Lightspeed Wireless",
      "Peso": "89g (sem cabo)",
      "Iluminação": "RGB LIGHTSYNC (16.8M cores)",
      "Durabilidade": "50 milhões de cliques",
      "Software": "G HUB para personalização",
      "Compatibilidade": "Windows 10+, macOS 10.14+"
    },
    features: [
      "Sensor HERO 25K de última geração com rastreamento 1:1",
      "11 botões programáveis com macros via G HUB",
      "Iluminação RGB LIGHTSYNC sincronizável com jogos",
      "Design ambidestro com apoio de polegar ergonômico",
      "Peso ajustável com pesos opcionais (até 16g)",
      "Cabo trançado LightSpeed sem arrasto"
    ],
    inStock: true,
    stockCount: 47
  },
  {
    id: 2,
    name: "Mouse Sem Fio MX Master 3S",
    slug: "mouse-sem-fio-mx-master-3s",
    category: "mouses",
    brand: "Logitech",
    price: 529.90,
    originalPrice: 599.90,
    rating: 4.9,
    reviewCount: 892,
    badge: "Premium",
    badgeType: "premium",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=600&h=600&fit=crop"
    ],
    description: "Mouse de produtividade avançado com roda MagSpeed, rastreamento em vidro 8K DPI, design ergonômico esculpido e bateria de 70 dias.",
    shortDescription: "Roda MagSpeed • 8K DPI em vidro • 70 dias bateria • Ergonomia esculpida",
    specs: {
      "Sensor": "Darkfield 8K DPI (funciona em vidro)",
      "Botões": "7 botões personalizáveis",
      "Conexão": "Bluetooth / Bolt USB Receiver",
      "Peso": "141g",
      "Bateria": "70 dias (carregamento rápido 1 min = 3h)",
      "Carregamento": "USB-C",
      "Compatibilidade": "Windows, macOS, Linux, iPadOS, ChromeOS",
      "Rodas": "MagSpeed eletromagnética + roda lateral"
    },
    features: [
      "Roda MagSpeed: rolagem 1000 linhas/segundo, silenciosa e precisa",
      "Rastreamento Darkfield 8K DPI funciona em vidro (mín. 4mm)",
      "Design esculpido para apoio natural da mão e punho",
      "Easy-Switch: alterna entre 3 dispositivos instantaneamente",
      "Flow: controle múltiplos computadores e copia/cola entre eles",
      "Carregamento rápido USB-C: 1 minuto = 3 horas de uso"
    ],
    inStock: true,
    stockCount: 23
  },
  {
    id: 3,
    name: "Mouse Gamer Viper V3 Pro",
    slug: "mouse-gamer-viper-v3-pro",
    category: "mouses",
    brand: "Razer",
    price: 649.90,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 456,
    badge: "Lançamento",
    badgeType: "new",
    images: [
      "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop"
    ],
    description: "Mouse gamer ultraleve (54g) com sensor Focus Pro 30K, switches ópticos Gen-3, polling rate 8000Hz e formato simétrico para claw/grip.",
    shortDescription: "54g ultraleve • Focus Pro 30K • Switches ópticos Gen-3 • 8000Hz polling",
    specs: {
      "Sensor": "Focus Pro 30K (até 30.000 DPI)",
      "Botões": "5 botões programáveis",
      "Conexão": "HyperSpeed Wireless / USB-C",
      "Peso": "54g",
      "Bateria": "Até 90 horas",
      "Switches": "Ópticos Gen-3 (90M cliques)",
      "Polling Rate": "8000Hz (com dongle incluso)",
      "Formato": "Simétrico, médio"
    },
    features: [
      "Apenas 54g - um dos mouses gamers mais leves do mercado",
      "Sensor Focus Pro 30K com 99.8% precisão de resolução",
      "Switches ópticos Gen-3 com atuação em 0.2ms",
      "Polling rate real de 8000Hz para latência mínima",
      "Formato simétrico otimizado para claw e fingertip grip",
      "HyperSpeed Wireless com latência inferior a fio"
    ],
    inStock: true,
    stockCount: 18
  },
  {
    id: 4,
    name: "Mouse Ergonômico Vertical MX Vertical",
    slug: "mouse-ergonomico-vertical-mx-vertical",
    category: "mouses",
    brand: "Logitech",
    price: 419.90,
    originalPrice: 479.90,
    rating: 4.6,
    reviewCount: 634,
    badge: null,
    badgeType: null,
    images: [
      "https://images.unsplash.com/photo-1563298476-e9e6f8a8b6a7?w=600&h=600&fit=crop"
    ],
    description: "Mouse vertical ergonômico com ângulo de 57°, sensor de 4000 DPI, reduz tensão muscular em 10% e pressão no pulso. Ideal para uso prolongado.",
    shortDescription: "Ângulo 57° • Reduz tensão 10% • 4000 DPI • 4 meses bateria",
    specs: {
      "Sensor": "Óptico 4000 DPI",
      "Botões": "4 botões + roda",
      "Conexão": "Bluetooth / Unifying USB",
      "Peso": "135g",
      "Bateria": "4 meses (pilha AA inclusa)",
      "Ângulo": "57° vertical",
      "Compatibilidade": "Windows, macOS, Linux, ChromeOS"
    },
    features: [
      "Ângulo vertical de 57° reduz pronação do antebraço",
      "Comprovadamente reduz tensão muscular em 10%",
      "Design ergonômico apoia a mão em posição de aperto de mão",
      "Sensor de alta precisão 4000 DPI ajustável",
      "Conexão dual: Bluetooth + Unifying Receiver",
      "Bateria de 4 meses com pilha AA única"
    ],
    inStock: true,
    stockCount: 31
  },

  // Teclados
  {
    id: 5,
    name: "Teclado Mecânico G915 TKL",
    slug: "teclado-mecanico-g915-tkl",
    category: "teclados",
    brand: "Logitech",
    price: 1199.90,
    originalPrice: 1399.90,
    rating: 4.8,
    reviewCount: 567,
    badge: "Top de Linha",
    badgeType: "premium",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&h=600&fit=crop"
    ],
    description: "Teclado mecânico sem fio low-profile TKL com switches GL Tactile, RGB LIGHTSYNC por tecla, alumínio aeronáutico e 40h de bateria com RGB ligado.",
    shortDescription: "Low-profile GL Tactile • RGB por tecla • Alumínio aeronáutico • 40h bateria",
    specs: {
      "Switches": "GL Tactile (Low-profile, 50M keystrokes)",
      "Layout": "TKL (Tenkeyless) - ABNT2",
      "Conexão": "Lightspeed Wireless / Bluetooth / USB-C",
      "Iluminação": "RGB LIGHTSYNC por tecla (16.8M cores)",
      "Material": "Alumínio aeronáutico 5052",
      "Bateria": "40h (RGB 100%) / 135d (RGB off)",
      "Perfil": "Ultrafino 22mm",
      "Teclas": "PBT double-shot"
    },
    features: [
      "Switches GL Tactile low-profile: atuação em 1.5mm, 50M de cliques",
      "RGB LIGHTSYNC por tecla com efeitos avançados via G HUB",
      "Construção em alumínio 5052 usinado CNC - premium e durável",
      "Lightspeed Wireless: latência imperceptível, igual a fio",
      "Perfil ultrafino 22mm com keycaps PBT double-shot",
      "40h bateria com RGB total, 135 dias sem iluminação"
    ],
    inStock: true,
    stockCount: 15
  },
  {
    id: 6,
    name: "Teclado Mecânico K70 RGB MK.2",
    slug: "teclado-mecanico-k70-rgb-mk2",
    category: "teclados",
    brand: "Corsair",
    price: 749.90,
    originalPrice: 899.90,
    rating: 4.7,
    reviewCount: 1123,
    badge: "Custo x Benefício",
    badgeType: "value",
    images: [
      "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop"
    ],
    description: "Teclado mecânico full-size com switches Cherry MX Red, RGB por tecla, estrutura em alumínio escovado, repousa-pulso magnético e teclas PBT double-shot.",
    shortDescription: "Cherry MX Red • RGB por tecla • Alumínio escovado • Repousa-pulso magnético • PBT",
    specs: {
      "Switches": "Cherry MX Red (Linear, 45g, 100M keystrokes)",
      "Layout": "Full-size ABNT2 com numpad",
      "Conexão": "USB-C destacável",
      "Iluminação": "RGB por tecla (16.8M cores)",
      "Material": "Estrutura alumínio escovado",
      "Teclas": "PBT double-shot",
      "Extras": "Repousa-pulso magnético, controlo multimídia dedicado",
      "Software": "iCUE"
    },
    features: [
      "Switches Cherry MX Red: lineares, suaves, 100M de durabilidade",
      "Iluminação RGB por tecla com controle via iCUE",
      "Estrutura em alumínio escovado anodizado - rígida e premium",
      "Teclas PBT double-shot: resistentes a brilho e desgaste",
      "Repousa-pulso magnético em couro sintético macio",
      "Controles multimídia dedicados + roda de volume em alumínio"
    ],
    inStock: true,
    stockCount: 28
  },
  {
    id: 7,
    name: "Teclado 60% Huntsman Mini",
    slug: "teclado-60-huntsman-mini",
    category: "teclados",
    brand: "Razer",
    price: 599.90,
    originalPrice: 699.90,
    rating: 4.6,
    reviewCount: 789,
    badge: "Compacto",
    badgeType: "new",
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop"
    ],
    description: "Teclado 60% com switches ópticos Razer Red, RGB Chroma, case em alumínio, keycaps PBT e cabo USB-C destacável. Ideal para setups minimalistas.",
    shortDescription: "60% compacto • Switches ópticos Red • RGB Chroma • Alumínio • PBT",
    specs: {
      "Switches": "Razer Optical Red (Linear, 45g, 100M)",
      "Layout": "60% (ANSI/ISO adaptável)",
      "Conexão": "USB-C destacável",
      "Iluminação": "Razer Chroma RGB por tecla",
      "Material": "Case alumínio + base plástica reforçada",
      "Teclas": "PBT double-shot",
      "Atuação": "1.0mm (óptico)",
      "Software": "Razer Synapse 3"
    },
    features: [
      "Formato 60%: máximo espaço para mouse, portabilidade total",
      "Switches ópticos Razer: atuação em 1.0mm, velocidade da luz",
      "Razer Chroma RGB: 16.8M cores, efeitos imersivos, integração jogos",
      "Case em alumínio usinado: rigidez e estética premium",
      "Keycaps PBT double-shot: textura premium, resistentes a shine",
      "Cabo USB-C trançado destacável para transporte fácil"
    ],
    inStock: true,
    stockCount: 42
  },
  {
    id: 8,
    name: "Teclado Mecânico Keychron K2 V2",
    slug: "teclado-mecanico-keychron-k2-v2",
    category: "teclados",
    brand: "Keychron",
    price: 479.90,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 934,
    badge: "Mac/Win",
    badgeType: "value",
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&h=600&fit=crop"
    ],
    description: "Teclado mecânico 75% sem fio com hot-swap, compatível Mac/Windows, switches Gateron G Pro, RGB 18 modos, bateria 72h e keycaps OSA PBT.",
    shortDescription: "75% • Hot-swap • Mac/Win • Gateron G Pro • RGB 18 modos • 72h bateria",
    specs: {
      "Switches": "Gateron G Pro Red/Brown/Blue (Hot-swap)",
      "Layout": "75% (84 teclas) - Mac/Windows",
      "Conexão": "Bluetooth 5.1 (3 dispositivos) / USB-C",
      "Iluminação": "RGB 18 modos + 4 brilho + velocidade",
      "Teclas": "OSA profile PBT (compatível Mac/Win)",
      "Bateria": "4000mAh - 72h (RGB) / 240h (sem RGB)",
      "Hot-swap": "Sim, compatível 3/5 pinos",
      "Estrutura": "Alumínio + plástico ABS"
    },
    features: [
      "Layout 75%: setas e função mantidas, compacto e funcional",
      "Hot-swap nativo: troque switches sem solda (3 e 5 pinos)",
      "Compatibilidade nativa Mac/Windows: keycaps inclusas para ambos",
      "Bluetooth 5.1: conecta até 3 dispositivos, troca instantânea",
      "Perfil OSA PBT: altura média, textura premium, legends duráveis",
      "Bateria 4000mAh: até 10 dias uso real com RGB moderado"
    ],
    inStock: true,
    stockCount: 36
  },

  // Headsets
  {
    id: 9,
    name: "Headset Gamer BlackShark V2 Pro",
    slug: "headset-gamer-blackshark-v2-pro",
    category: "headsets",
    brand: "Razer",
    price: 899.90,
    originalPrice: 1099.90,
    rating: 4.8,
    reviewCount: 678,
    badge: "Esports Ready",
    badgeType: "premium",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=600&h=600&fit=crop"
    ],
    description: "Headset wireless esports com drivers TriForce Titanium 50mm, microfone HyperClear Supercardioid removível, THX Spatial Audio e 24h bateria.",
    shortDescription: "TriForce Titanium 50mm • HyperClear mic • THX Spatial • 24h bateria • 280g",
    specs: {
      "Drivers": "TriForce Titanium 50mm",
      "Resposta Frequência": "12Hz - 28kHz",
      "Microfone": "HyperClear Supercardioid 9.9mm (removível)",
      "Conexão": "HyperSpeed Wireless 2.4GHz / USB-C / 3.5mm",
      "Bateria": "24 horas",
      "Peso": "280g",
      "Áudio": "THX Spatial Audio 7.1",
      "Compatibilidade": "PC, PS5, PS4, Switch, Mobile"
    },
    features: [
      "Drivers TriForce Titanium 50mm: agudos, médios e graves separados",
      "THX Spatial Audio 7.1: posicionamento sonoro preciso para competitivo",
      "Microfone HyperClear Supercardioid: captação direcional, ruído -30dB",
      "HyperSpeed Wireless 2.4GHz: latência imperceptível, alcance 12m",
      "Leve 280g: almofadas FlowKnit memory foam, arco em aço mola",
      "24h bateria: carregamento rápido USB-C (15min = 2.5h)"
    ],
    inStock: true,
    stockCount: 19
  },
  {
    id: 10,
    name: "Headset Sem Fio WH-1000XM5",
    slug: "headset-sem-fio-wh-1000xm5",
    category: "headsets",
    brand: "Sony",
    price: 1899.90,
    originalPrice: 2199.90,
    rating: 4.9,
    reviewCount: 2156,
    badge: "Referência",
    badgeType: "premium",
    images: [
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"
    ],
    description: "Headphone premium com cancelamento de ruído líder de mercado (Auto NC Optimizer), drivers 30mm, 30h bateria, LDAC, multipoint e speak-to-chat.",
    shortDescription: "ANC Auto NC Optimizer • Drivers 30mm • 30h bateria • LDAC • Multipoint",
    specs: {
      "Drivers": "30mm com cúpula de carbono",
      "Cancelamento Ruído": "Auto NC Optimizer (8 microfones)",
      "Conexão": "Bluetooth 5.2 / USB-C / 3.5mm",
      "Codecs": "LDAC, AAC, SBC",
      "Bateria": "30h (ANC ligado) / 40h (ANC desligado)",
      "Carregamento": "USB-C (3 min = 3h, carga total 3h)",
      "Peso": "250g",
      "Extras": "Multipoint, Speak-to-Chat, Wear Detection"
    },
    features: [
      "Auto NC Optimizer: ANC adaptativo em tempo real (8 mics)",
      "Drivers 30mm carbono: áudio Hi-Res, LDAC 990kbps",
      "30h bateria com ANC: carregamento rápido 3min = 3h",
      "Multipoint Bluetooth: conecta 2 dispositivos simultaneamente",
      "Speak-to-Chat: pausa música e ativa ANC ao falar",
      "Design leve 250g: conforto todo dia, case compacta inclusa"
    ],
    inStock: true,
    stockCount: 12
  },

  // Monitores
  {
    id: 11,
    name: "Monitor Gamer 27\" 240Hz OLED",
    slug: "monitor-gamer-27-240hz-oled",
    category: "monitores",
    brand: "LG",
    price: 3299.90,
    originalPrice: 3899.90,
    rating: 4.8,
    reviewCount: 342,
    badge: "OLED",
    badgeType: "premium",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop"
    ],
    description: "Monitor gamer 27\" QHD OLED 240Hz 0.03ms GtG, G-Sync Compatible, FreeSync Premium, 98.5% DCI-P3, HDR 1000, HDMI 2.1.",
    shortDescription: "27\" QHD OLED • 240Hz • 0.03ms • G-Sync/FreeSync • 98.5% DCI-P3 • HDR 1000",
    specs: {
      "Painel": "27\" OLED (LG Display)",
      "Resolução": "2560 x 1440 (QHD)",
      "Taxa Atualização": "240Hz",
      "Tempo Resposta": "0.03ms GtG",
      "HDR": "HDR 1000 (True Black 400)",
      "Cobertura Cor": "98.5% DCI-P3 / 135% sRGB",
      "Sync": "NVIDIA G-Sync Compatible / AMD FreeSync Premium",
      "Conectividade": "2x HDMI 2.1, 1x DP 1.4, 2x USB 3.0, fone 3.5mm",
      "Ergonomia": "Altura, inclinação, pivô, VESA 100x100"
    },
    features: [
      "Painel OLED: pretos perfeitos, contraste infinito, 0.03ms resposta",
      "240Hz QHD: motion clarity excepcional para competitivo",
      "HDR 1000 True Black 400: brilho pico 1000 nits, pretos perfeitos",
      "98.5% DCI-P3: cores cinema, calibração de fábrica Delta E < 2",
      "HDMI 2.1: 4K 120Hz para PS5/Xbox Series X, VRR nativo",
      "Design gamer refinado: iluminação Hexagon Lighting, cabo management"
    ],
    inStock: true,
    stockCount: 8
  },
  {
    id: 12,
    name: "Monitor UltraWide 34\" 165Hz",
    slug: "monitor-ultrawide-34-165hz",
    category: "monitores",
    brand: "Samsung",
    price: 2199.90,
    originalPrice: 2599.90,
    rating: 4.7,
    reviewCount: 567,
    badge: "Imersivo",
    badgeType: "hot",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop"
    ],
    description: "Monitor UltraWide 34\" 1000R QHD 165Hz 1ms VA, FreeSync Premium Pro, HDR 1000, 100% sRGB, PBP/PIP, suporte ergonômico completo.",
    shortDescription: "34\" 1000R • QHD 165Hz • 1ms VA • FreeSync Premium Pro • HDR 1000",
    specs: {
      "Painel": "34\" VA Curvo 1000R",
      "Resolução": "3440 x 1440 (UWQHD)",
      "Taxa Atualização": "165Hz",
      "Tempo Resposta": "1ms MPRT",
      "HDR": "HDR 1000",
      "Cobertura Cor": "100% sRGB / 95% DCI-P3",
      "Sync": "AMD FreeSync Premium Pro",
      "Conectividade": "2x HDMI 2.0, 1x DP 1.4, 1x USB-C 65W, 2x USB 3.0",
      "Ergonomia": "Altura, inclinação, giro, VESA 100x100"
    },
    features: [
      "Curvatura 1000R: imersão máxima, campo de visão natural",
      "UltraWide 21:9: equivalente a 2 monitores 16:9 sem bordas",
      "165Hz 1ms VA: fluidez gaming com contraste 3000:1 nativo",
      "USB-C 65W: carrega notebook e transmite vídeo/dados em 1 cabo",
      "PBP/PIP: visualize 2 fontes simultâneas (trabalho + jogo)",
      "HDR 1000: brilho pico 1000 nits para conteúdo HDR real"
    ],
    inStock: true,
    stockCount: 14
  },

  // Acessórios
  {
    id: 13,
    name: "Mousepad XL 900x400mm RGB",
    slug: "mousepad-xl-900x400mm-rgb",
    category: "acessorios",
    brand: "Razer",
    price: 189.90,
    originalPrice: 249.90,
    rating: 4.6,
    reviewCount: 445,
    badge: "RGB",
    badgeType: "new",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop"
    ],
    description: "Mousepad estendido 900x400x4mm com iluminação RGB Chroma 19 zonas, superfície micro-texturada otimizada, base antiderrapante e cabo USB destacável.",
    shortDescription: "900x400x4mm • RGB Chroma 19 zonas • Micro-textura • Base antiderrapante",
    specs: {
      "Dimensões": "900 x 400 x 4mm",
      "Iluminação": "Razer Chroma RGB 19 zonas",
      "Superfície": "Micro-texturada (speed/control balance)",
      "Base": "Borracha antiderrapante texturizada",
      "Conexão": "USB destacável 1.8m",
      "Software": "Razer Synapse 3",
      "Bordas": "Costura anti-desfiamento"
    },
    features: [
      "Tamanho XL 900x400mm: cobre teclado + mouse + espaço extra",
      "RGB Chroma 19 zonas: 16.8M cores, efeitos reativos, sync jogos",
      "Superfície micro-texturada: equilíbrio speed/control para todos sensores",
      "Base de borracha premium: não desloca em movimentos bruscos",
      "4mm espessura: conforto pulso, nivela imperfeições da mesa",
      "Cabo USB destacável: transporte fácil, substituição se danificar"
    ],
    inStock: true,
    stockCount: 56
  },
  {
    id: 14,
    name: "Suporte Monitor Braço Articulado",
    slug: "suporte-monitor-braco-articulado",
    category: "acessorios",
    brand: "Ergotron",
    price: 549.90,
    originalPrice: 649.90,
    rating: 4.9,
    reviewCount: 289,
    badge: "Ergonômico",
    badgeType: "value",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop"
    ],
    description: "Braço articulado para monitor 13-32\" até 11.3kg, movimento fluido CF, rotação 360°, inclinação ±85°, extensão 64cm, gestão cabos integrada.",
    shortDescription: "13-32\" • até 11.3kg • CF Technology • 360° rot. • 64cm ext. • Gestão cabos",
    specs: {
      "Compatibilidade": "Monitores 13\" a 32\"",
      "Peso Suportado": "0.7 a 11.3kg",
      "Padrão VESA": "75x75 / 100x100",
      "Tecnologia": "CF (Constant Force) - movimento sem esforço",
      "Rotação": "360° (retrato/paisagem)",
      "Inclinação": "±85°",
      "Extensão": "64cm",
      "Altura": "40cm curso vertical",
      "Gestão Cabos": "Canais integrados no braço"
    },
    features: [
      "CF Technology: contrapeso constante, monitor flutua sem travar",
      "Amplo range 0.7-11.3kg: serve ultra-leves a pesados 32\"",
      "Extensão 64cm + 40cm vertical: posicionamento total liberdade",
      "Rotação 360°: alterna retrato/paisagem instantaneamente",
      "Gestão cabos integrada: visual clean, cabos escondidos no braço",
      "Instalação: grampo mesa (até 6cm) ou furação (incluído)"
    ],
    inStock: true,
    stockCount: 22
  },
  {
    id: 15,
    name: "Webcam 4K Pro Stream",
    slug: "webcam-4k-pro-stream",
    category: "acessorios",
    brand: "Logitech",
    price: 899.90,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 567,
    badge: "4K",
    badgeType: "premium",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop"
    ],
    description: "Webcam 4K 30fps / 1080p 60fps com HDR, foco automático, microfones duplos com noise-canceling, privacidade física, tripé incluso e software avançado.",
    shortDescription: "4K 30fps • 1080p 60fps • HDR • Foco auto • Mic noise-canceling • Privacidade",
    specs: {
      "Resolução": "4K 30fps / 1080p 60fps / 720p 90fps",
      "HDR": "Sim (até 1080p 30fps)",
      "Campo Visão": "90° (ajustável 65°/78°/90° via software)",
      "Foco": "Automático contínuo + foco fixo via software",
      "Microfones": "2x MEMS beamforming com noise-canceling",
      "Privacidade": "Obturador físico integrado",
      "Montagem": "Clip monitor + rosca tripé 1/4\"",
      "Conexão": "USB 3.0 (compatível USB 2.0)",
      "Software": "Logitech Capture / G HUB"
    },
    features: [
      "4K 30fps nativo: qualidade profissional para streaming/gravação",
      "1080p 60fps: fluidez total para calls e conteúdo",
      "HDR: alcance dinâmico expandido, melhor em contraluz",
      "Foco automático inteligente: mantém rosto nítido em movimento",
      "Microfones beamforming: capta sua voz, rejeita ruído ambiente",
      "Obturador físico: privacidade total com indicador visual"
    ],
    inStock: true,
    stockCount: 34
  },
  {
    id: 16,
    name: "Teclado Numérico Mecânico G213",
    slug: "teclado-numerico-mecanico-g213",
    category: "acessorios",
    brand: "Logitech",
    price: 129.90,
    originalPrice: 169.90,
    rating: 4.5,
    reviewCount: 234,
    badge: null,
    badgeType: null,
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&h=600&fit=crop"
    ],
    description: "Teclado numérico mecânico compacto com switches tácteis, RGB por tecla, conexão USB, design slim para uso ao lado do teclado principal ou notebook.",
    shortDescription: "Mecânico táctil • RGB por tecla • Compacto • USB • Slim",
    specs: {
      "Switches": "Mecânicos Tácteis (45g, 50M cliques)",
      "Teclas": "21 teclas (numérico + nav + enter)",
      "Iluminação": "RGB por tecla (16.8M cores)",
      "Conexão": "USB-A",
      "Dimensões": "85 x 135 x 22mm",
      "Peso": "180g",
      "Compatibilidade": "Windows, macOS, Linux, ChromeOS"
    },
    features: [
      "Switches mecânicos tácteis: feedback preciso para digitação numérica",
      "RGB por tecla personalizável via G HUB",
      "Design ultracompacto 85x135mm: cabe em qualquer espaço",
      "Perfil slim 22mm: altura similar a teclados de notebook",
      "Plug & Play: sem drivers, funciona instantaneamente",
      "Ideal para: planilhas, contabilidade, data entry, gaming"
    ],
    inStock: true,
    stockCount: 67
  }
];

const CATEGORIES = [
  { id: 'mouses', name: 'Mouses', icon: 'mouse', count: 4 },
  { id: 'teclados', name: 'Teclados', icon: 'keyboard', count: 4 },
  { id: 'headsets', name: 'Headsets', icon: 'headphones', count: 2 },
  { id: 'monitores', name: 'Monitores', icon: 'monitor', count: 2 },
  { id: 'acessorios', name: 'Acessórios', icon: 'mouse-pointer-2', count: 4 }
];

const BRANDS = [
  'Logitech', 'Razer', 'Corsair', 'Keychron', 'Sony', 'LG', 'Samsung', 'Ergotron'
];

// Funções utilitárias
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

function getProductsByCategory(category) {
  return PRODUCTS.filter(p => p.category === category);
}

function getFeaturedProducts(limit = 8) {
  return PRODUCTS
    .filter(p => p.badge === 'Mais Vendido' || p.badgeType === 'hot' || p.badgeType === 'premium')
    .slice(0, limit);
}

function getNewProducts(limit = 8) {
  return PRODUCTS
    .filter(p => p.badgeType === 'new')
    .slice(0, limit);
}

function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  return PRODUCTS
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}

function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return PRODUCTS;
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.shortDescription.toLowerCase().includes(q)
  );
}

function filterProducts({ category, brand, minPrice, maxPrice, inStockOnly, sortBy }) {
  let results = [...PRODUCTS];

  if (category) {
    results = results.filter(p => p.category === category);
  }
  if (brand) {
    results = results.filter(p => p.brand === brand);
  }
  if (minPrice !== undefined) {
    results = results.filter(p => p.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    results = results.filter(p => p.price <= maxPrice);
  }
  if (inStockOnly) {
    results = results.filter(p => p.inStock);
  }

  // Ordenação
  switch (sortBy) {
    case 'price-asc':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      results.sort((a, b) => b.id - a.id);
      break;
    case 'popular':
    default:
      results.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }

  return results;
}

function formatPrice(price) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
}

function getDiscountPercent(original, current) {
  if (!original || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}

// Exportar para uso global
window.PRODUCTS = PRODUCTS;
window.CATEGORIES = CATEGORIES;
window.BRANDS = BRANDS;
window.getProductById = getProductById;
window.getProductBySlug = getProductBySlug;
window.getProductsByCategory = getProductsByCategory;
window.getFeaturedProducts = getFeaturedProducts;
window.getNewProducts = getNewProducts;
window.getRelatedProducts = getRelatedProducts;
window.searchProducts = searchProducts;
window.filterProducts = filterProducts;
window.formatPrice = formatPrice;
window.getDiscountPercent = getDiscountPercent;