import { useState } from "react";  
import { Instagram, MapPin, Clock, ShoppingCart, Percent, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { DeliveryAlert } from "./DeliveryAlert";
import { Cart } from "./Cart";
import { MenuSection } from "./MenuSection";
import { PromoModal } from "./PromoModal";
import { useCart } from "@/hooks/useCart";
import { pizzasSalgadas, pizzasDoces, esfihasSalgadas, esfihasDoces, bebidas } from "@/data/menu";

export function PizzariaApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // estado de busca
  const [cartBtnPos, setCartBtnPos] = useState({ x: 20, y: 20 }); // posição inicial do botão movível
  const [dragging, setDragging] = useState(false);
  const cart = useCart();

  const openInstagram = () => {
    window.open("https://www.instagram.com/pizzarialcapone3divisao?igsh=c2FvaTlhN3hzZjM2", "_blank");
  };

  const openMaps = () => {
    const address = "Estrada dos Fidelis 85, Jd Iguatemi";
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    window.open(mapsUrl, "_blank");
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab("menu");
    setActiveSection(sectionId);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const isOpen = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    if (day >= 1 && day <= 4) {
      return hour >= 18 && hour < 24;
    } else if (day === 5 || day === 6) {
      return hour >= 18 || hour < 1;
    } else {
      return hour >= 18 && hour < 24;
    }
  };

  // Função de filtro de produtos
  const filterItems = (items: typeof pizzasSalgadas) =>
    items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Funções para arrastar o botão
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      setCartBtnPos({ x: e.clientX - 30, y: e.clientY - 30 }); // ajusta centro do botão
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DeliveryAlert />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <img 
                src="/logo.jpg" 
                alt="Logo Pizzaria Alcapone" 
                className="h-10 w-10 rounded-full object-cover"
              />
              
              {/* Nome com cores e fontes diferentes */}
              <div className="text-2xl font-bold flex gap-1 items-center">
                <span className="font-sans text-gray-200">Pizzaria</span>
                <span className="font-serif text-pink-500">Alcapone</span>
              </div>

              {/* Badge ABERTO/FECHADO - agora aparece em celular */}
              <Badge 
                className={`px-2 py-1 rounded ${isOpen() ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
              >
                <Clock className="h-3 w-3 mr-1" />
                {isOpen() ? "ABERTO" : "FECHADO"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={openInstagram}>
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={openMaps}>
                <MapPin className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.items.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Campo de busca (aparece apenas em Cardápio) */}
      {activeTab === "menu" && (
        <div className="container mx-auto px-4 py-4">
          <input
            type="text"
            placeholder="Buscar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded border border-gray-400 text-black"
          />
        </div>
      )}

      {/* Hero Section */}
      {activeTab === "home" && (
        <section className="relative py-20 px-4 bg-gray-800 text-white text-center">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display">
              PIZZARIA ALCAPONE
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              A melhor pizza da região! 🍕
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button variant="hero" size="xl" onClick={() => setActiveTab("menu")}>
                Ver Cardápio
              </Button>
              <Button variant="secondary" size="xl" onClick={openInstagram}>
                <Instagram className="h-5 w-5 mr-2" />
                Siga-nos
              </Button>
              <Button variant="outline" size="xl" onClick={openMaps} className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <MapPin className="h-5 w-5 mr-2" />
                Como Chegar
              </Button>
            </div>

            {/* Horários */}
            <Card className="max-w-md mx-auto bg-white/10 border-white/20 text-white">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horários de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-center">
                <p><strong>Dom a Quinta:</strong> 18:00 às 23:45</p>
                <p><strong>Sex e Sábado:</strong> 18:00 às 00:50</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Navigation */}
      <nav className="sticky top-[73px] z-30 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            <Button
              variant={activeTab === "home" ? "default" : "ghost"}
              onClick={() => setActiveTab("home")}
              className="whitespace-nowrap"
            >
              Início
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={activeTab === "menu" ? "default" : "ghost"}
                  className="whitespace-nowrap gap-1"
                >
                  Cardápio
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-56 bg-background border shadow-lg z-50"
              >
                <DropdownMenuItem onClick={() => scrollToSection("pizzas-salgadas")}>
                  🍕 Pizzas Salgadas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("pizzas-doces")}>
                  🍰 Pizzas Doces
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("esfihas-salgadas")}>
                  🥟 Esfihas Salgadas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("esfihas-doces")}>
                  🧁 Esfihas Doces
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("bebidas")}>
                  🥤 Bebidas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "menu" && (
          <div className="space-y-8">
            <div id="pizzas-salgadas">
              <MenuSection
                title="🍕 Pizzas Salgadas"
                items={filterItems(pizzasSalgadas)}
                category="pizza-salgada"
                onAddToCart={cart.addItem}
                hasSizes
              />
            </div>
            <div id="pizzas-doces">
              <MenuSection
                title="🍰 Pizzas Doces"
                items={filterItems(pizzasDoces)}
                category="pizza-doce"
                onAddToCart={cart.addItem}
                hasSizes
              />
            </div>
            <div id="esfihas-salgadas">
              <MenuSection
                title="🥟 Esfihas Salgadas"
                items={filterItems(esfihasSalgadas)}
                category="esfiha-salgada"
                onAddToCart={cart.addItem}
              />
            </div>
            <div id="esfihas-doces">
              <MenuSection
                title="🧁 Esfihas Doces"
                items={filterItems(esfihasDoces)}
                category="esfiha-doce"
                onAddToCart={cart.addItem}
              />
            </div>
            <div id="bebidas">
              <MenuSection
                title="🥤 Bebidas"
                items={filterItems(bebidas)}
                category="bebida"
                onAddToCart={cart.addItem}
              />
            </div>
          </div>
        )}
      </main>

      {/* Floating Buttons */}

      {/* Botão do Carrinho movível */}
      <Button
        variant="floating"
        onClick={() => setCartOpen(true)}
        size="pizza"
        className="relative"
        style={{
          position: 'fixed',
          left: cartBtnPos.x,
          top: cartBtnPos.y,
          zIndex: 50,
          cursor: 'grab'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        aria-label="Abrir carrinho"
      >
        {/* ícone da pizza */}
        <span className="text-xl">🍕</span>

        {/* Badge de notificação (bolinha vermelha com a quantidade) */}
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {cartCount}
          </span>
        )}
      </Button>
      
      {/* Botão de Promoções */}
      <Button 
        onClick={() => setPromoOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-green-500 text-white hover:bg-green-600"
        size="lg"
      >
        <Percent className="h-5 w-5 mr-2" />
        PROMOÇÕES
      </Button>

      {/* Modals */}
      <Cart 
        open={cartOpen}
        onOpenChange={setCartOpen}
        cart={cart}
      />
      
      <PromoModal
        open={promoOpen}
        onOpenChange={setPromoOpen}
        onAddToCart={cart.addItem}
      />
    </div>
  );
}
