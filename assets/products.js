/**
 * BANCO DE DADOS DE PRODUTOS - GUIA PET TECH (MERCADO LIVRE OFFICIAL DATA)
 * 
 * Produtos reais com imagens oficiais extraídas diretamente do marketplace.
 */

const products = [
    // --- CATEGORIA: TECNOLOGIA (TECH) ---
    {
        id: 1,
        type: 'physical',
        category: 'tech',
        name: 'Comedouro Inteligente Pet Wi-Fi Com Câmera HD e App',
        description: 'Alimentação programada e monitoramento por vídeo em tempo real. Compatível com Alexa.',
        image: 'image/comedouro inteligente.jpg.webp',
        price: 'R$ 489,90',
        link: 'https://meli.la/1Zp8vBM',
        badge: 'CAMPEÃO DE VENDAS',
        ctaText: 'Ver no Mercado Livre'
    },
    {
        id: 2,
        type: 'physical',
        category: 'tech',
        name: 'Caixa de Areia Automática Autolimpante Inteligente Gatos',
        description: 'Higiene automática com sensores de segurança e controle de odores.',
        image: 'https://http2.mlstatic.com/D_Q_NP_2X_982558-MLA110437147585_042026-E.webp',
        price: 'R$ 1.950,00',
        link: 'https://meli.la/2fnfQzu',
        badge: 'PRODUTO PREMIUM',
        ctaText: 'Ver no Mercado Livre'
    },
    {
        id: 3,
        type: 'physical',
        category: 'tech',
        name: 'Coleira Inteligente de presente para animais de estimação',
        description: 'Saiba onde seu pet está em qualquer lugar do Brasil com precisão GPS.',
        image: 'image/coleira inteligente.jpg.webp',
        price: 'R$ 259,00',
        link: 'https://meli.la/1BTBPsB',
        badge: 'SEGURANÇA TOTAL',
        ctaText: 'Ver no Mercado Livre'
    },
    {
        id: 4,
        type: 'physical',
        category: 'tech',
        name: 'Fonte de Água Inox Pet Com Sensor De Movimento 3L',
        description: 'Filtro de carvão ativado e material cirúrgico. Água fresca e oxigenada.',
        image: 'https://http2.mlstatic.com/D_Q_NP_2X_668484-MLA96211125828_102025-E.webp',
        price: 'R$ 179,00',
        link: 'https://meli.la/2dp5u7x',
        badge: 'MAIS VENDIDO',
        ctaText: 'Ver no Mercado Livre'
    },
    {
        id: 5,
        type: 'physical',
        category: 'tech',
        name: 'Lançador Automático De Bolinha Para Cães',
        description: 'Diversão interativa com 3 níveis de distância. Ideal para gasto de energia.',
        image: 'image/lancador bolinha.jpg.webp',
        price: 'R$ 145,00',
        link: 'https://meli.la/1GPrmoT',
        badge: 'DIVERSÃO SMART',
        ctaText: 'Ver no Mercado Livre'
    },

    // --- CATEGORIA: CONFORTO ---
    {
        id: 6,
        type: 'physical',
        category: 'conforto',
        name: 'Colchão Pet Premium Ortopédico para Cães e Gatos D18',
        description: 'Suporte perfeito para a coluna e articulações. Capa lavável e impermeável.',
        image: 'image/colchao ortopedico.jpg.webp',
        price: 'R$ 297,50',
        link: 'https://meli.la/1A9z74c',
        badge: 'CONFORTO MAX',
        ctaText: 'Ver no Mercado Livre'
    },
    {
        id: 7,
        type: 'physical',
        category: 'conforto',
        name: 'Cama Pet Comfort Orthocrin',
        description: 'O lugar favorito dos felinos para observar o mundo com total segurança.',
        image: 'https://http2.mlstatic.com/D_Q_NP_2X_951923-MLU77147117726_062024-E.webp',
        price: 'R$ 89,90',
        link: 'https://meli.la/1gJhB5J',
        badge: 'RELAX TOTAL',
        ctaText: 'Ver no Mercado Livre'
    },
    {
        id: 8,
        type: 'physical',
        category: 'conforto',
        name: 'Tapete Térmico Elétrico com Controle de Temperatura',
        description: 'Mantenha seu pet aquecido no inverno com total segurança e conforto.',
        image: 'https://http2.mlstatic.com/D_Q_NP_2X_947241-MLB110710338775_042026-E-tapete-pet-termico-eletrico-almofada-cama-ces-gato-100x45cm.webp',
        price: 'R$ 115,00',
        link: 'https://meli.la/2x2NZRC',
        badge: 'PROTEÇÃO TÉRMICA',
        ctaText: 'Ver no Mercado Livre'
    },
    {
        id: 9,
        type: 'physical',
        category: 'conforto',
        name: 'Escada Para Pet 3 Degraus Luxo Para Cão E Gato Estofada',
        description: 'Facilita o acesso ao sofá e cama sem impactar as articulações.',
        image: 'image/escada pet.jpg.webp',
        price: 'R$ 168,00',
        link: 'https://meli.la/1kjzhJM',
        badge: 'SAÚDE PET',
        ctaText: 'Ver no Mercado Livre'
    },
    {
        id: 10,
        type: 'physical',
        category: 'conforto',
        name: 'Mochila Bolsa Pet Visão Astronauta Panorâmica',
        description: 'Transporte com estilo e visão total. Ventilação otimizada para passeios.',
        image: 'image/mochila astronauta.jpg.webp',
        price: 'R$ 129,90',
        link: 'https://meli.la/11o6idQ',
        badge: 'ESTILO & SEGURANÇA',
        ctaText: 'Ver no Mercado Livre'
    },
    {
        id: 11,
        type: 'physical',
        category: 'conforto',
        name: 'Arranhador Multifuncional',
        description: 'Diversão e cuidado com as unhas do seu felino em um só produto.',
        image: 'image/Arranhador Multifucional.jpg.webp',
        price: 'R$ 189,90',
        link: 'https://meli.la/2B6xsfZ',
        badge: 'NOVIDADE',
        ctaText: 'Ver no Mercado Livre'
    },
    {
        id: 12,
        type: 'physical',
        category: 'conforto',
        name: 'Bolsa Transporte Pet Grande Viagem Cabine Avião',
        description: 'Ideal para viagens de avião, aprovada pelas principais companhias aéreas.',
        image: 'image/Bolsa Transporte Pet Grande Viagem Cabine Avião.jpg.webp',
        price: 'R$ 245,00',
        link: 'https://meli.la/178jVJT',
        badge: 'VIAGEM SEGURA',
        ctaText: 'Ver no Mercado Livre'
    }
];


if (typeof module !== 'undefined') {
    module.exports = products;
}
