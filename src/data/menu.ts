export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  prices: {
    broto?: number;
    grande?: number;
    unit?: number;
  };
}

export const pizzasSalgadas: MenuItem[] = [
  { id: "americana", name: "AMERICANA", description: "Chicharro ralado, palmito, ervilhas cob. com mussarela", prices: { broto: 39.99, grande: 49.99 } },
  { id: "alcapone", name: "ALCAPONE", description: "Mussarela, polenguinho e parmesão", prices: { broto: 41.99, grande: 51.99 } },
  { id: "alcaponetes", name: "ALCAPONETES", description: "Atum, ovos, cebola, tomate e mussarela", prices: { broto: 39.99, grande: 49.99 } },
  { id: "alho", name: "ALHO", description: "Alho frito e mussarela", prices: { broto: 35.99, grande: 45.99 } },
  { id: "atum1", name: "ATUM 1", description: "Atum e cebola", prices: { broto: 36.99, grande: 46.99 } },
  { id: "atum2", name: "ATUM 2", description: "Atum, cebola com mussarela", prices: { broto: 41.99, grande: 51.99 } },
  { id: "atum3", name: "ATUM 3", description: "Atum e mussarela", prices: { broto: 39.99, grande: 49.99 } },
  { id: "atum4", name: "ATUM 4", description: "Atum puro", prices: { broto: 43.99, grande: 53.99 } },
  { id: "baiana", name: "BAIANA", description: "Calabresa moida, ovos picados com cebola e pimenta", prices: { broto: 36.99, grande: 46.99 } },
  { id: "bajacatu", name: "BAJACATU", description: "Calabresa moida picante e catupiry", prices: { broto: 36.99, grande: 46.99 } },
  { id: "bacon", name: "BACON", description: "Bacon e mussarela", prices: { broto: 37.99, grande: 47.99 } },
  { id: "bacana", name: "BACANA", description: "Presunto, ovos, frango e mussarela", prices: { broto: 38.99, grande: 48.99 } },
  { id: "bauru", name: "BAURU", description: "Presunto, tomate e mussarela", prices: { broto: 36.99, grande: 46.99 } },
  { id: "boa-dica", name: "BOA DICA", description: "Carne seca, mussarela, bacon e tomate", prices: { broto: 45.99, grande: 55.99 } },
  { id: "brasileira", name: "BRASILEIRA", description: "Atum, mussarela, rodelas de tomate e bacon", prices: { broto: 41.99, grande: 51.99 } },
  { id: "brocolis", name: "BRÓCOLIS", description: "Brócolis, mussarela e bacon", prices: { broto: 38.99, grande: 48.99 } },
  { id: "canadense", name: "CANADENSE", description: "Lombo e mussarela", prices: { broto: 37.99, grande: 47.99 } },
  { id: "calabacon", name: "CALABACON", description: "Calabresa, cebola e bacon", prices: { broto: 37.99, grande: 47.99 } },
  { id: "caipira", name: "CAIPIRA", description: "Peito de frango desfiado, catupiry e milho verde", prices: { broto: 39.99, grande: 49.99 } },
  { id: "calabresa", name: "CALABRESA", description: "Calabresa e cebola", prices: { broto: 34.99, grande: 44.99 } },
  { id: "calacatu", name: "CALACATU", description: "Calabresa moida e catupiry", prices: { broto: 36.99, grande: 46.99 } },
  { id: "camarao", name: "CAMARÃO", description: "Camarão e catupiry", prices: { broto: 59.99, grande: 69.99 } },
  { id: "camarao-especial", name: "CAMARÃO ESPECIAL", description: "Camarão, mussarela, bacon e alho poró", prices: { broto: 65.99, grande: 75.99 } },
  { id: "carne-seca", name: "CARNE SECA", description: "Carne seca, cebola e mussarela", prices: { broto: 52.99, grande: 62.99 } },
  { id: "catupiry", name: "CATUPIRY", description: "Catupiry e rodelas de tomate", prices: { broto: 35.99, grande: 45.99 } },
  { id: "cinco-queijos", name: "CINCO QUEIJOS", description: "Mussarela, catupiry, provolone, gorgonzola e parmesão", prices: { broto: 49.99, grande: 59.99 } },
  { id: "dois-queijos", name: "DOIS QUEIJOS", description: "Mussarela e catupiry", prices: { broto: 39.99, grande: 49.99 } },
  { id: "do-forneiro", name: "DO FORNEIRO", description: "Carne seca, cebola, catupiry e mussarela", prices: { broto: 46.99, grande: 56.99 } },
  { id: "do-motoqueiro", name: "DO MOTOQUEIRO", description: "Calabresa, presunto, frango, mussarela e tomate", prices: { broto: 41.99, grande: 51.99 } },
  { id: "do-pizzaiolo", name: "DO PIZZAIOLO", description: "Peito de Peru ovos mussarela e bacon", prices: { broto: 41.99, grande: 51.99 } },
  { id: "especial", name: "ESPECIAL", description: "Calabresa, mussarela e catupiry", prices: { broto: 39.99, grande: 49.99 } },
  { id: "escarola", name: "ESCAROLA", description: "Escarola, rodelas de cebola, mussarela e fatias de bacon", prices: { broto: 36.99, grande: 46.99 } },
  { id: "francesa", name: "FRANCESA", description: "Peito de peru defumado, mussarela, palmito e bacon", prices: { broto: 42.99, grande: 52.99 } },
  { id: "fidelis", name: "FIDELIS", description: "Mussarela, calabresa, aliche e bacon", prices: { broto: 38.99, grande: 48.99 } },
  { id: "felipe", name: "FELIPE", description: "Provolone, ervilhas, presunto picado e bacon", prices: { broto: 39.99, grande: 49.99 } },
  { id: "frango1", name: "FRANGO 1", description: "Frango desfiado coberto com catupiry", prices: { broto: 37.99, grande: 47.99 } },
  { id: "frango2", name: "FRANGO 2", description: "Frango desfiado puro", prices: { broto: 39.99, grande: 49.99 } },
  { id: "frango3", name: "FRANGO 3", description: "Frango desfiado coberto com cheddar", prices: { broto: 37.99, grande: 47.99 } },
  { id: "frango4", name: "FRANGO 4", description: "Frango desfiado coberto com mussarela", prices: { broto: 38.99, grande: 48.99 } },
  { id: "hot-dog", name: "HOT DOG", description: "Molho, mussarela, salsicha, mostarda e batata chips", prices: { broto: 41.99, grande: 51.99 } },
  { id: "favorita", name: "FAVORITA", description: "Frango, milho, mussarela e bacon", prices: { broto: 41.99, grande: 51.99 } },
  { id: "fascinante", name: "FASCINANTE", description: "Frango, bacon, tomate e catupiry", prices: { broto: 41.99, grande: 51.99 } },
  {
  id: "havaiana",
  name: "HAVAIANA",
  description: "Peito de frango desfiado, mussarela e rodelas de tomate",
  prices: { broto: 41.99, grande: 51.99 }
},
{
  id: "italiana",
  name: "ITALIANA",
  description: "Presunto picado, palmito, catupiry e mussarela",
  prices: { broto: 38.99, grande: 48.99 }
},
{
  id: "joao-paulo",
  name: "JOÃO PAULO",
  description: "Escarola, ovos, palmito, bacon e parmesão",
  prices: { broto: 39.99, grande: 49.99 }
},
{
  id: "lainne",
  name: "LAINNE",
  description: "Atum, cheddar e bacon",
  prices: { broto: 39.99, grande: 49.99 }
},
{
  id: "lombo",
  name: "LOMBO",
  description: "Lombo canadense, cebola e catupiry",
  prices: { broto: 38.99, grande: 48.99 }
},
{
  id: "margherita",
  name: "MARGHERITA",
  description: "Mussarela, tomate em fatias e manjericão",
  prices: { broto: 37.99, grande: 47.99 }
},
{
  id: "mafiosa",
  name: "MAFIOSA",
  description: "Lombo, calabresa, mussarela e bacon",
  prices: { broto: 39.99, grande: 49.99 }
},
{
  id: "mexicana",
  name: "MEXICANA",
  description: "Carne moída, tomate, cebola, mussarela e molho de pimenta",
  prices: { broto: 42.99, grande: 52.99 }
},
{
  id: "milho-verde-1",
  name: "MILHO VERDE 1",
  description: "Milho verde coberto com mussarela",
  prices: { broto: 35.99, grande: 45.99 }
},
{
  id: "milho-verde-2",
  name: "MILHO VERDE 2",
  description: "Milho verde coberto com catupiry",
  prices: { broto: 35.99, grande: 45.99 }
},
{
  id: "mista",
  name: "MISTA",
  description: "Mussarela e calabresa fatiada",
  prices: { broto: 36.99, grande: 46.99 }
},
{
  id: "moda-da-casa",
  name: "MODA DA CASA",
  description: "Presunto picado, azeitonas verdes picadas e mussarela",
  prices: { broto: 38.99, grande: 48.99 }
},
{
  id: "mussarela",
  name: "MUSSARELA",
  description: "Mussarela",
  prices: { broto: 34.99, grande: 44.99 }
},
{
  id: "mussarela-com-tomate",
  name: "MUSSARELA COM TOMATE",
  description: "Mussarela e rodelas de tomate",
  prices: { broto: 36.99, grande: 46.99 }
},
{
  id: "namorados",
  name: "NAMORADOS",
  description: "Palmito, catupiry e mussarela",
  prices: { broto: 36.99, grande: 46.99 }
},
{
  id: "napolitana",
  name: "NAPOLITANA",
  description: "Mussarela, tomate em fatias e parmesão",
  prices: { broto: 37.99, grande: 47.99 }
},
{
  id: "palmito-1",
  name: "PALMITO 1",
  description: "Palmito e cebola coberto com mussarela",
  prices: { broto: 37.99, grande: 47.99 }
},
{
  id: "palmito-2",
  name: "PALMITO 2",
  description: "Palmito coberto com catupiry",
  prices: { broto: 37.99, grande: 47.99 }
},
{
  id: "paleta",
  name: "PALETA",
  description: "Frango com catupiry e batata palha",
  prices: { broto: 39.99, grande: 49.99 }
},
{
  id: "salame",
  name: "SALAME",
  description: "Mussarela com fatias de salame",
  prices: { broto: 39.99, grande: 49.99 }
},
{
  id: "pepperoni",
  name: "PEPPERONI",
  description: "Pepperoni e mussarela",
  prices: { broto: 47.99, grande: 57.99 }
},
{
  id: "peruana",
  name: "PERUANA",
  description: "Atum, ervilha, palmito, ovo, cebola e mussarela",
  prices: { broto: 43.99, grande: 53.99 }
},
{
  id: "portuguesa-1",
  name: "PORTUGUESA 1",
  description: "Mussarela, presunto, cebola, ervilhas e ovos cozidos",
  prices: { broto: 38.99, grande: 48.99 }
},
{
  id: "portuguesa-2",
  name: "PORTUGUESA 2",
  description: "Mussarela, presunto, cebola, milho e ovos cozidos",
  prices: { broto: 38.99, grande: 48.99 }
},
{
  id: "presunto",
  name: "PRESUNTO",
  description: "Presunto, champignon e mussarela",
  prices: { broto: 36.99, grande: 46.99 }
},
{
  id: "primavera",
  name: "PRIMAVERA",
  description: "Mussarela, presunto, bacon, cebola, tomate seco, parmesão e champignon",
  prices: { broto: 49.99, grande: 59.99 }
},
{
  id: "provolone",
  name: "PROVOLONE",
  description: "Queijo provolone",
  prices: { broto: 37.99, grande: 47.99 }
},
{
  id: "paulista",
  name: "PAULISTA",
  description: "Calabresa, bacon e mussarela",
  prices: { broto: 37.99, grande: 47.99 }
},
{
  id: "quatro-queijos",
  name: "QUATRO QUEIJOS",
  description: "Mussarela, catupiry, provolone e parmesão",
  prices: { broto: 47.99, grande: 57.99 }
},
{
  id: "rafhael",
  name: "RAFHAEL",
  description: "Calabresa moída picante e mussarela",
  prices: { broto: 36.99, grande: 46.99 }
},
{
  id: "romana",
  name: "ROMANA",
  description: "Mussarela, rodelas de tomate, filés de aliche e parmesão",
  prices: { broto: 49.99, grande: 49.99 }
},
{
  id: "saborosa",
  name: "SABOROSA",
  description: "Mussarela, presunto, calabresa, bacon, rodelas de tomate e cebola",
  prices: { broto: 46.99, grande: 56.99 }
},
{
  id: "toscana",
  name: "TOSCANA",
  description: "Linguiça toscana moída coberta com mussarela",
  prices: { broto: 36.99, grande: 46.99 }
},
{
  id: "tres-queijos",
  name: "TRÊS QUEIJOS",
  description: "Mussarela, catupiry e parmesão",
  prices: { broto: 42.99, grande: 52.99 }
},
{
  id: "zairon",
  name: "ZAIRON",
  description: "Calabresa, mussarela e cheddar",
  prices: { broto: 38.99, grande: 48.99 }
},
{
  id: "zairon-il",
  name: "ZAIRON IL",
  description: "Frango, mussarela e cheddar",
  prices: { broto: 41.99, grande: 51.99 }
},
{
  id: "predileta",
  name: "PREDILETA",
  description: "Peito de peru, catupiry e parmesão",
  prices: { broto: 44.99, grande: 54.99 }
},
{
  id: "la-mafia",
  name: "LA MAFIA",
  description: "Peito de peru, palmito, ovo, milho, mussarela e bacon",
  prices: { broto: 44.99, grande: 54.99 }
},
{
  id: "mista-acebolada",
  name: "MISTA ACEBOLADA",
  description: "Calabresa, cebola e mussarela",
  prices: { broto: 37.99, grande: 47.99 }
},
{
  id: "chefe",
  name: "CHEFE",
  description: "Carne seca, catupiry, tomate e parmesão",
  prices: { broto: 0.0, grande: 0.0 } // preços não informados, ajustar depois
}


];

export const pizzasDoces: MenuItem[] = [
  { id: "banana", name: "BANANA", description: "Banana, canela, leite condensado, cereja e creme de leite", prices: { broto: 33.99, grande: 43.99 } },
  { id: "bombom", name: "BOMBOM", description: "Sonho de valsa, gotas de chocolate e cerejas", prices: { broto: 36.99, grande: 46.99 } },
  { id: "brigadeiro", name: "BRIGADEIRO", description: "Chocolate ao leite e granulado", prices: { broto: 35.99, grande: 45.99 } },
  { id: "chocolate-morango", name: "CHOCOLATE COM MORANGO", description: "Chocolate, granulado e morango", prices: { broto: 35.99, grande: 45.99 } },
  { id: "mam", name: "M&M", description: "Chocolate e M&M'S", prices: { broto: 38.99, grande: 48.99 } },
  { id: "doce-leite", name: "DOCE DE LEITE", description: "Creme de leite e doce de leite", prices: { broto: 36.99, grande: 46.99 } },
  { id: "prestigio", name: "PRESTÍGIO", description: "Chocolate ao leite com coco ralado", prices: { broto: 36.99, grande: 46.99 } },
  { id: "romeu-julieta", name: "ROMEU E JULIETA", description: "Goiabada com catupiry ou mussarela", prices: { broto: 35.99, grande: 45.99 } },
  { id: "sonho-valsa", name: "SONHO DE VALSA", description: "Chocolate e bombom Sonho de Valsa", prices: { broto: 36.99, grande: 46.99 } },
  { id: "ouro-branco", name: "OURO BRANCO", description: "Chocolate e bombom Ouro Branco", prices: { broto: 36.99, grande: 46.99 } },
  { id: "chocolate-branco", name: "CHOCOLATE BRANCO", description: "Chocolate ao leite branco", prices: { broto: 36.99, grande: 46.99 } },
  { id: "mix-chocolate", name: "MIX CHOCOLATE BRANCO E PRETO", description: "Chocolate ao leite preto e branco", prices: { broto: 36.99, grande: 46.99 } },
  { id: "docinho", name: "DOCINHO", description: "Doce de leite com coco", prices: { broto: 36.99, grande: 46.99 } },
];

export const esfihasSalgadas: MenuItem[] = [
  { id: "esf-carne", name: "CARNE", prices: { unit: 6.00 } },
  { id: "esf-queijo", name: "QUEIJO", prices: { unit: 6.00 } },
  { id: "esf-cala-cheddar", name: "CALABRESA COM CHEDDAR", prices: { unit: 6.00 } },
  { id: "esf-calabresa-cebola", name: "CALABRESA COM CEBOLA", prices: { unit: 6.00 } },
  { id: "esf-toscana", name: "TOSCANA", prices: { unit: 6.00 } },
  { id: "esf-carioca", name: "CARIOCA", prices: { unit: 6.00 } },
  { id: "esf-atum", name: "ATUM", prices: { unit: 6.00 } },
  { id: "esf-atum-cebola", name: "ATUM COM CEBOLA", prices: { unit: 6.00 } },
  { id: "esf-bauru", name: "BAURU", prices: { unit: 6.00 } },
  { id: "esf-bacon", name: "BACON", prices: { unit: 6.00 } },
  { id: "esf-bacon-cheddar", name: "BACON COM CHEDDAR", prices: { unit: 6.00 } },
  { id: "esf-atum-queijo", name: "ATUM COM QUEIJO", prices: { unit: 6.00 } },
  { id: "esf-palmito-queijo", name: "PALMITO COM QUEIJO", prices: { unit: 6.00 } },
  { id: "esf-frango-catupiry", name: "FRANGO COM CATUPIRY", prices: { unit: 6.00 } },
  { id: "esf-frango-queijo", name: "FRANGO COM QUEIJO", prices: { unit: 6.00 } },
  { id: "esf-frango-cheddar", name: "FRANGO COM CHEDDAR", prices: { unit: 6.00 } },
  { id: "esf-milho-queijo", name: "MILHO COM QUEIJO", prices: { unit: 6.00 } },
  { id: "esf-carne-catupiry", name: "CARNE COM CATUPIRY", prices: { unit: 6.00 } },
  { id: "esf-carne-queijo", name: "CARNE COM QUEIJO", prices: { unit: 6.00 } },
  { id: "esf-carne-cheddar", name: "CARNE COM CHEDDAR", prices: { unit: 6.00 } },
  { id: "esf-brocolis", name: "BRÓCOLIS", prices: { unit: 6.00 } },
  { id: "esf-2-queijos", name: "2 QUEIJOS", prices: { unit: 6.00 } },
  { id: "esf-3-queijos", name: "3 QUEIJOS", prices: { unit: 6.00 } },
  { id: "esf-alho", name: "ALHO", prices: { unit: 6.00 } },
  { id: "esf-escarola", name: "ESCAROLA", prices: { unit: 6.00 } },
  { id: "esf-camarao", name: "CAMARÃO", prices: { unit: 10.00 } },
  { id: "esf-havaiana", name: "HAVAIANA", prices: { unit: 6.00 } },
  { id: "esf-carne-seca", name: "CARNE SECA", prices: { unit: 8.00 } },
  { id: "esf-salame", name: "SALAME", prices: { unit: 8.00 } },
  { id: "esf-peru-catupiry", name: "PEITO DE PERU, CATUPIRY E PARMESÃO", prices: { unit: 8.00 } },
  { id: "esf-calabresa-fatiada", name: "CALABRESA FATIADA COM CEBOLA", prices: { unit: 8.00 } },
  { id: "esf-portuguesa", name: "PORTUGUESA", prices: { unit: 8.00 } },
  { id: "esf-calacatu", name: "CALACATU (CALABRESA COM CATUPIRY)", prices: { unit: 8.00 } },
  { id: "esf-queijo-tomate", name: "QUEIJO E TOMATE", prices: { unit: 8.00 } },
  { id: "esf-carne-seca-cheddar", name: "CARNE SECA COM CHEDDAR", prices: { unit: 8.00 } },
  { id: "esf-catupiry", name: "CATUPIRY", prices: { unit: 8.00 } },
  { id: "esf-milho-catupiry", name: "MILHO COM CATUPIRY", prices: { unit: 8.00 } },
  { id: "esf-brocolis-catupiry", name: "BRÓCOLIS COM CATUPIRY", prices: { unit: 8.00 } },
];

export const esfihasDoces: MenuItem[] = [
  { id: "esf-d-romeu-julieta", name: "ROMEU E JULIETA", prices: { unit: 6.00 } },
  { id: "esf-d-brigadeiro", name: "BRIGADEIRO", prices: { unit: 8.00 } },
  { id: "esf-d-mam", name: "M&M'S (CHOCOLATE E M&M'S)", prices: { unit: 8.00 } },
  { id: "esf-d-chocolate-morango", name: "CHOCOLATE COM MORANGO", prices: { unit: 8.00 } },
  { id: "esf-d-doce-leite", name: "DOCE DE LEITE", prices: { unit: 8.00 } },
  { id: "esf-d-prestigio", name: "PRESTÍGIO", prices: { unit: 8.00 } },
  { id: "esf-d-sonho-valsa", name: "SONHO DE VALSA", prices: { unit: 8.00 } },
  { id: "esf-d-ouro-branco", name: "OURO BRANCO", prices: { unit: 8.00 } },
  { id: "esf-d-chocolate-branco", name: "CHOCOLATE BRANCO", prices: { unit: 8.00 } },
  { id: "esf-d-banana-chocolate", name: "BANANA COM CHOCOLATE", prices: { unit: 8.00 } },
  { id: "esf-d-mix-chocolate", name: "MIX CHOCOLATE PRETO E BRANCO", prices: { unit: 8.00 } },
  { id: "esf-d-docinho", name: "DOCINHO (DOCE DE LEITE COM COCO)", prices: { unit: 8.00 } },
];

export const bebidas: MenuItem[] = [
  { id: "dolly", name: "DOLLY", prices: { unit: 8.00 } },
  { id: "coca", name: "COCA-COLA", prices: { unit: 8.00 } },
  { id: "fanta", name: "FANTA", prices: { unit: 8.00 } },
  { id: "guarana", name: "GUARANÁ ANTÁRTICA", prices: { unit: 8.00 } },
];

export const promocoes = [
  {
    id: "promo1",
    name: "PACOTE 1",
    description: "5 Carne + 5 Queijo + 5 Calabresa",
    price: 45.00,
    items: ["5x Carne", "5x Queijo", "5x Calabresa"]
  },
  {
    id: "promo2", 
    name: "PACOTE 2",
    description: "10 Carne + 5 Queijo + 5 Toscana + 2 Frango com Catupiry",
    price: 66.00,
    items: ["10x Carne", "5x Queijo", "5x Toscana", "2x Frango com Catupiry"]
  },
  {
    id: "promo3",
    name: "PACOTE 3", 
    description: "12 Frango com Catupiry + Carne + Queijo + Calabresa + Atum",
    price: 75.00,
    items: ["12x Frango com Catupiry", "Carne", "Queijo", "Calabresa", "Atum"]
  },
  {
    id: "promo4",
    name: "PACOTE 4",
    description: "10 Carne + 10 Queijo + 10 Calabresa",
    price: 92.00,
    items: ["10x Carne", "10x Queijo", "10x Calabresa"]
  },
  {
    id: "promo5",
    name: "PACOTE 5 + GRÁTIS 1 DOLLY",
    description: "5 Atum com Queijo + 5 Milho com Queijo + 5 Bauru + 5 Carne com Queijo + 5 Frango com Queijo + 5 Bacon",
    price: 92.00,
    items: ["5x Atum com Queijo", "5x Milho com Queijo", "5x Bauru", "5x Carne com Queijo", "5x Frango com Queijo", "5x Bacon", "1x Dolly GRÁTIS"]
  },
  {
    id: "promo6",
    name: "PACOTE 6",
    description: "20 Carne + 20 Queijo",
    price: 119.00,
    items: ["20x Carne", "20x Queijo"]
  }
];