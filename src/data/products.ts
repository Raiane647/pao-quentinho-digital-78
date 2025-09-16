import { Product } from '@/contexts/CartContext';
import frenchBread from "@/assets/french-bread.jpg";
import chocolateCake from "@/assets/chocolate-cake.jpg";
import coxinha from "@/assets/coxinha.jpg";
import paoDeQueijo from "@/assets/pao-de-queijo.jpg";

// Produtos de pronta entrega (exceto bolos personalizados)

export const products: Product[] = [
  // Pães
  {
    id: 'pao-frances',
    name: 'Pão Francês',
    description: 'Nosso clássico pão francês, crocante por fora e macio por dentro',
    price: 0.75,
    image: frenchBread,
    category: 'paes',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'pao-de-queijo',
    name: 'Pão de Queijo',
    description: 'Pão de queijo mineiro autêntico, quentinho e sequinho',
    price: 2.50,
    image: paoDeQueijo,
    category: 'paes',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'pao-integral',
    name: 'Pão Integral',
    description: 'Pão integral com grãos e sementes, nutritivo e saboroso',
    price: 8.90,
    image: frenchBread,
    category: 'paes',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'croissant',
    name: 'Croissant',
    description: 'Croissant francês folhado e amanteigado',
    price: 4.50,
    image: frenchBread,
    category: 'paes',
    isAvailable: true,
    isReadyToTake: true
  },

  // Lanches
  {
    id: 'misto-quente',
    name: 'Misto Quente',
    description: 'Sanduíche quente com queijo e presunto no pão de forma',
    price: 6.50,
    image: coxinha,
    category: 'lanches',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'pao-na-chapa',
    name: 'Pão na Chapa',
    description: 'Pão francês tostado na chapa com manteiga',
    price: 3.50,
    image: frenchBread,
    category: 'lanches',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'sanduiche-natural',
    name: 'Sanduíche Natural',
    description: 'Sanduíche natural com peito de peru, queijo branco e salada',
    price: 12.90,
    image: coxinha,
    category: 'lanches',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'bauru',
    name: 'Bauru',
    description: 'Sanduíche Bauru com rosbife, queijo, tomate e pickles',
    price: 15.90,
    image: coxinha,
    category: 'lanches',
    isAvailable: true,
    isReadyToTake: true
  },

  // Bolos
  {
    id: 'bolo-chocolate',
    name: 'Bolo de Chocolate',
    description: 'Bolo de chocolate com cobertura cremosa, uma delícia irresistível',
    price: 35.90,
    image: chocolateCake,
    category: 'bolos',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'bolo-cenoura',
    name: 'Bolo de Cenoura com Chocolate',
    description: 'Tradicional bolo de cenoura com cobertura de chocolate',
    price: 32.90,
    image: chocolateCake,
    category: 'bolos',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'bolo-fuba',
    name: 'Bolo de Fubá',
    description: 'Bolo de fubá cremoso com erva-doce',
    price: 28.90,
    image: chocolateCake,
    category: 'bolos',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'bolo-laranja',
    name: 'Bolo de Laranja',
    description: 'Bolo de laranja com calda cítrica refrescante',
    price: 30.90,
    image: chocolateCake,
    category: 'bolos',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'bolo-personalizado',
    name: 'Bolo Personalizado',
    description: 'Crie seu bolo dos sonhos escolhendo massa, recheio e cobertura',
    price: 45.00,
    image: chocolateCake,
    category: 'bolos',
    isCustomizable: true,
    isAvailable: true,
    isReadyToTake: false
  },

  // Salgados
  {
    id: 'coxinha',
    name: 'Coxinha de Frango',
    description: 'Coxinha tradicional com recheio generoso de frango desfiado',
    price: 4.50,
    image: coxinha,
    category: 'salgados',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'empada-frango',
    name: 'Empada de Frango',
    description: 'Empada artesanal com recheio de frango e catupiry',
    price: 5.50,
    image: coxinha,
    category: 'salgados',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'pastel-assado',
    name: 'Pastel Assado',
    description: 'Pastel assado crocante com recheio de carne',
    price: 6.50,
    image: coxinha,
    category: 'salgados',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'enroladinho',
    name: 'Enroladinho de Salsicha',
    description: 'Massa folhada enrolada com salsicha',
    price: 4.00,
    image: coxinha,
    category: 'salgados',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'quiche-queijo',
    name: 'Quiche de Queijo',
    description: 'Quiche cremosa com queijo e ervas finas',
    price: 8.50,
    image: coxinha,
    category: 'salgados',
    isAvailable: true,
    isReadyToTake: true
  },

  // Bebidas
  {
    id: 'cafe-expresso',
    name: 'Café Expresso',
    description: 'Café expresso encorpado e aromático',
    price: 3.50,
    image: coxinha,
    category: 'bebidas',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'cafe-com-leite',
    name: 'Café com Leite',
    description: 'Café com leite cremoso na medida certa',
    price: 4.50,
    image: coxinha,
    category: 'bebidas',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Cappuccino cremoso com espuma de leite',
    price: 6.50,
    image: coxinha,
    category: 'bebidas',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'suco-laranja',
    name: 'Suco de Laranja',
    description: 'Suco natural de laranja fresquinho',
    price: 5.50,
    image: coxinha,
    category: 'bebidas',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'suco-abacaxi',
    name: 'Suco de Abacaxi',
    description: 'Suco natural de abacaxi doce e refrescante',
    price: 5.50,
    image: coxinha,
    category: 'bebidas',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'refrigerante',
    name: 'Refrigerante',
    description: 'Refrigerante gelado - Coca-Cola, Guaraná ou Fanta',
    price: 4.00,
    image: coxinha,
    category: 'bebidas',
    isAvailable: true,
    isReadyToTake: true
  },
  {
    id: 'agua',
    name: 'Água',
    description: 'Água mineral gelada 500ml',
    price: 2.50,
    image: coxinha,
    category: 'bebidas',
    isAvailable: true,
    isReadyToTake: true
  }
];

export const categoryNames = {
  paes: 'Pães',
  lanches: 'Lanches',
  bolos: 'Bolos',
  salgados: 'Salgados',
  bebidas: 'Bebidas'
};

export const categoryIcons = {
  paes: '🥖',
  lanches: '🥪',
  bolos: '🍰',
  salgados: '🥟',
  bebidas: '☕'
};

export const customCakeOptions = {
  massa: [
    { value: 'chocolate', label: 'Chocolate', price: 0 },
    { value: 'baunilha', label: 'Baunilha', price: 0 },
    { value: 'cenoura', label: 'Cenoura', price: 0 },
    { value: 'chocolate-premium', label: 'Chocolate Premium', price: 5 },
    { value: 'red-velvet', label: 'Red Velvet', price: 8 }
  ],
  recheio: [
    { value: 'brigadeiro', label: 'Brigadeiro', price: 0 },
    { value: 'doce-de-leite', label: 'Doce de Leite', price: 0 },
    { value: 'creme-frutas', label: 'Creme de Frutas', price: 0 },
    { value: 'nutella', label: 'Nutella', price: 10 },
    { value: 'doce-de-leite-argentino', label: 'Doce de Leite Argentino', price: 7 }
  ],
  cobertura: [
    { value: 'chantilly', label: 'Chantilly', price: 0 },
    { value: 'chocolate', label: 'Chocolate', price: 0 },
    { value: 'glace', label: 'Glacê', price: 0 },
    { value: 'fondant', label: 'Fondant', price: 15 },
    { value: 'chantilly-com-frutas', label: 'Chantilly com Frutas', price: 8 }
  ]
};