import { useEffect, useRef, useState } from "react"; 
import { Instagram, MapPin, Clock, ShoppingCart, Percent, ChevronDown, Menu, Pizza, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeliveryAlert } from "./DeliveryAlert";
import { Cart } from "./Cart";
import { MenuSection } from "./MenuSection";
import { PromoModal } from "./PromoModal";
import { MeioMeioModal } from "./MeioMeioModal";
import { useCart } from "@/hooks/useCart";
import { pizzasSalgadas, pizzasDoces, esfihasSalgadas, esfihasDoces, bebidas, porcoes, promocoes } from "@/data/menu";

export function PizzariaApp() {
  const [activeTab, setActiveTab] = useState("home");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const [meioMeioOpen, setMeioMeioOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartBtnPos, setCartBtnPos] = useState({ left: 20, top: 20 });
  const draggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const btnRef = useRef<HTMLElement | null>(null);
  const movedRef = useRef(false);
  const mountedRef = useRef(false);
  const pointerDownPosRef = useRef({ x: 0, y: 0 });
  const posRef = useRef(cartBtnPos);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const isOpen = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    if (day >= 1 && day <= 4) return hour >= 18 && hour < 24;
    if (day === 5 || day === 6) return hour >= 18 || hour < 1;
    return hour >= 18 && hour < 24;
  };

  // Função de busca inteligente
  const filterItems = (items: typeof pizzasSalgadas) => {
    if (!searchTerm.trim()) return items;
    
    const searchLower = searchTerm.toLowerCase().trim();
    const searchWords = searchLower.split(/\s+/);
    
    return items.filter((item) => {
      const itemName = item.name.toLowerCase();
      const itemDescription = item.description?.toLowerCase() || "";
      
      return searchWords.every(searchWord => {
        const allWords = `${itemName} ${itemDescription}`.split(/\s+/);
        return allWords.some(word => 
          word.startsWith(searchWord) || 
          word === searchWord || 
          (searchWord.length >= 3 && word.includes(searchWord))
        );
      });
    });
  };

  // Função de busca para porções (usa PorcaoItem)
  const filterPorcoes = (items: typeof porcoes) => {
    if (!searchTerm.trim()) return items;
    
    const searchLower = searchTerm.toLowerCase().trim();
    const searchWords = searchLower.split(/\s+/);
    
    return items.filter((item) => {
      const itemName = item.name.toLowerCase();
      const itemDescription = item.description?.toLowerCase() || "";
      
      return searchWords.every(searchWord => {
        const allWords = `${itemName} ${itemDescription}`.split(/\s+/);
        return allWords.some(word => 
          word.startsWith(searchWord) || 
          word === searchWord || 
          (searchWord.length >= 3 && word.includes(searchWord))
        );
      });
    });
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    mountedRef.current = true;
    try {
      const raw = localStorage.getItem("floatingCartPos");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.left === "number" && typeof parsed.top === "number") {
          setCartBtnPos(parsed);
          return;
        }
      }
    } catch {}
    if (typeof window !== "undefined") {
      setCartBtnPos({ left: Math.max(20, window.innerWidth - 80), top: Math.max(20, window.innerHeight - 140) });
    }
  }, []);

  useEffect(() => {
    posRef.current = cartBtnPos;
  }, [cartBtnPos]);

  useEffect(() => {
    const DRAG_THRESHOLD = 8;

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current || (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current)) return;
      const dx = e.clientX - pointerDownPosRef.current.x;
      const dy = e.clientY - pointerDownPosRef.current.y;
      const dist = Math.hypot(dx, dy);
      if (!movedRef.current && dist > DRAG_THRESHOLD) movedRef.current = true;

      if (movedRef.current) {
        const w = btnRef.current?.offsetWidth ?? 64;
        const h = btnRef.current?.offsetHeight ?? 64;
        const left = Math.min(Math.max(0, Math.round(e.clientX - offsetRef.current.x)), window.innerWidth - w);
        const top = Math.min(Math.max(0, Math.round(e.clientY - offsetRef.current.y)), window.innerHeight - h);
        if (btnRef.current) {
          btnRef.current.style.left = `${left}px`;
          btnRef.current.style.top = `${top}px`;
        }
        posRef.current = { left, top };
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!draggingRef.current || (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current)) return;
      draggingRef.current = false;
      pointerIdRef.current = null;
      setCartBtnPos(posRef.current);
      try { localStorage.setItem("floatingCartPos", JSON.stringify(posRef.current)); } catch {}
      setTimeout(() => { movedRef.current = false; }, 0);
    };

    const onPointerCancel = () => {
      draggingRef.current = false;
      pointerIdRef.current = null;
      movedRef.current = false;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerCancel);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerIdRef.current = e.pointerId;
    draggingRef.current = true;
    movedRef.current = false;
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY };
    const rect = (btnRef.current ?? e.currentTarget).getBoundingClientRect();
    offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    try { (e.currentTarget as Element).setPointerCapture?.(e.pointerId); } catch {}
  };

  const handleClick = (e: React.MouseEvent) => {
    if (movedRef.current) { e.preventDefault(); e.stopPropagation(); return; }
    setCartOpen(true);
  };

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  // Contadores de resultados
  const filteredPizzasSalgadas = filterItems(pizzasSalgadas);
  const filteredPizzasDoces = filterItems(pizzasDoces);
  const filteredEsfihasSalgadas = filterItems(esfihasSalgadas);
  const filteredEsfihasDoces = filterItems(esfihasDoces);
  const filteredBebidas = filterItems(bebidas);
  const filteredPorcoes = filterPorcoes(porcoes);
  
  const totalResults = filteredPizzasSalgadas.length + filteredPizzasDoces.length + 
                       filteredEsfihasSalgadas.length + filteredEsfihasDoces.length + 
                       filteredBebidas.length + filteredPorcoes.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DeliveryAlert />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.jpg" alt="Logo Pizzaria Alcapone" className="h-10 w-10 rounded-full object-cover" />
            <div className="text-2xl font-bold flex gap-1 items-center">
              <span className="font-sans text-gray-200">Pizzaria</span>
              <span className="font-serif text-pink-500">Alcapone</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={openInstagram}><Instagram className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" onClick={openMaps}><MapPin className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">{cartCount}</Badge>}
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 px-4 py-2 space-y-2 border-t border-gray-700">
            <Button variant="ghost" className="w-full justify-start" onClick={openInstagram}>
              <Instagram className="h-5 w-5 mr-2" /> Instagram
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={openMaps}>
              <MapPin className="h-5 w-5 mr-2" /> Como Chegar
            </Button>
            <Button variant="ghost" className="w-full justify-start relative" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="h-5 w-5 mr-2" /> Carrinho
              {cartCount > 0 && <Badge className="absolute right-4 top-2 h-5 w-5 flex items-center justify-center p-0 text-xs">{cartCount}</Badge>}
            </Button>
          </div>
        )}

        <div className="bg-gray-800 py-2 text-center border-t border-gray-700">
          <Badge className={`px-3 py-2 rounded text-sm ${isOpen() ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
            <Clock className="h-4 w-4 mr-2 inline" />{isOpen() ? "ABERTO" : "FECHADO"}
          </Badge>
        </div>
      </header>

      {/* Campo de busca FIXO - OTIMIZADO MOBILE */}
      {activeTab === "menu" && (
        <div className="sticky top-[121px] z-40 bg-gray-900 border-b border-gray-700 shadow-lg">
          <div className="container mx-auto px-3 sm:px-4 py-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar pizza, esfiha, porção..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-12 py-3 sm:py-3 text-base rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all touch-manipulation"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white active:text-pink-500 transition-colors p-1 touch-manipulation"
                  aria-label="Limpar busca"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {searchTerm && (
              <div className="mt-2 text-sm text-gray-400 text-center">
                {totalResults === 0 ? (
                  <span className="text-red-400">Nenhum resultado encontrado para "{searchTerm}"</span>
                ) : (
                  <span>
                    {totalResults} {totalResults === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero */}
      {activeTab === "home" && (
        <section className="relative py-20 px-4 bg-gray-800 text-white text-center">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">PIZZARIA ALCAPONE</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">A melhor pizza da região!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button variant="hero" size="xl" onClick={() => setActiveTab("menu")}>Ver Cardápio</Button>
              <Button variant="secondary" size="xl" onClick={openInstagram}><Instagram className="h-5 w-5 mr-2" />Siga-nos</Button>
              <Button variant="outline" size="xl" onClick={openMaps} className="bg-white/10 border-white/30 text-white hover:bg-white/20"><MapPin className="h-5 w-5 mr-2" />Como Chegar</Button>
            </div>
            <Card className="max-w-md mx-auto bg-white/10 border-white/20 text-white">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2"><Clock className="h-5 w-5" />Horários de Funcionamento</CardTitle>
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
      <nav className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-2">
          <div className="flex gap-2 overflow-x-auto items-center">
            <Button 
              variant={activeTab === "home" ? "default" : "ghost"} 
              onClick={() => setActiveTab("home")} 
              className="whitespace-nowrap"
            >
              Início
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={activeTab === "menu" ? "default" : "ghost"} className="whitespace-nowrap gap-1">
                  Cardápio
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-background border shadow-lg z-50">
                <DropdownMenuItem onClick={() => scrollToSection("pizzas-salgadas")}>Pizzas Salgadas</DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("pizzas-doces")}>Pizzas Doces</DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("esfihas-salgadas")}>Esfihas Salgadas</DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("esfihas-doces")}>Esfihas Doces</DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("porcoes")}>Porções</DropdownMenuItem>
                <DropdownMenuItem onClick={() => scrollToSection("bebidas")}>Bebidas</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              onClick={() => setPromoOpen(true)}
              className="whitespace-nowrap bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              PROMOÇÕES
            </Button>
          </div>
        </div>
      </nav>

      {/* Conteúdo */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "menu" && (
          <div className="space-y-8">
            <div className="flex justify-center">
              <Button
                onClick={() => setMeioMeioOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
                size="lg"
              >
                <Pizza className="h-5 w-5 mr-2" />
                Montar Pizza Meio a Meio
              </Button>
            </div>

            {(!searchTerm || filteredPizzasSalgadas.length > 0) && (
              <div id="pizzas-salgadas">
                <MenuSection 
                  title="Pizzas Salgadas" 
                  items={filteredPizzasSalgadas} 
                  category="pizza-salgada" 
                  onAddToCart={cart.addItem} 
                  hasSizes 
                />
              </div>
            )}
            
            {(!searchTerm || filteredPizzasDoces.length > 0) && (
              <div id="pizzas-doces">
                <MenuSection 
                  title="Pizzas Doces" 
                  items={filteredPizzasDoces} 
                  category="pizza-doce" 
                  onAddToCart={cart.addItem} 
                  hasSizes 
                />
              </div>
            )}
            
            {(!searchTerm || filteredEsfihasSalgadas.length > 0) && (
              <div id="esfihas-salgadas">
                <MenuSection 
                  title="Esfihas Salgadas" 
                  items={filteredEsfihasSalgadas} 
                  category="esfiha-salgada" 
                  onAddToCart={cart.addItem} 
                />
              </div>
            )}
            
            {(!searchTerm || filteredEsfihasDoces.length > 0) && (
              <div id="esfihas-doces">
                <MenuSection 
                  title="Esfihas Doces" 
                  items={filteredEsfihasDoces} 
                  category="esfiha-doce" 
                  onAddToCart={cart.addItem} 
                />
              </div>
            )}
            
            {(!searchTerm || filteredPorcoes.length > 0) && (
              <div id="porcoes">
                <MenuSection 
                  title="Porções" 
                  items={filteredPorcoes} 
                  category="porcao" 
                  onAddToCart={cart.addItem} 
                />
              </div>
            )}
            
            {(!searchTerm || filteredBebidas.length > 0) && (
              <div id="bebidas">
                <MenuSection 
                  title="Bebidas" 
                  items={filteredBebidas} 
                  category="bebida" 
                  onAddToCart={cart.addItem} 
                />
              </div>
            )}

            {searchTerm && totalResults === 0 && (
              <div className="text-center py-16">
                <Search className="h-16 w-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-500 mb-6">
                  Não encontramos itens para "{searchTerm}"
                </p>
                <Button 
                  onClick={clearSearch}
                  variant="outline"
                  className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                >
                  Limpar busca
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Pizza Button - OTIMIZADO MOBILE */}
      <Button
        variant="floating"
        onClick={handleClick}
        size="pizza"
        className="relative shadow-2xl"
        style={{
          position: "fixed",
          left: cartBtnPos.left,
          top: cartBtnPos.top,
          zIndex: 50,
          cursor: draggingRef.current ? "grabbing" : "grab",
          touchAction: "none",
          minWidth: "64px",
          minHeight: "64px",
        }}
        onPointerDown={(e) => {
          btnRef.current = e.currentTarget as unknown as HTMLElement;
          handlePointerDown(e);
        }}
        aria-label="Abrir carrinho"
      >
        <span className="text-2xl sm:text-3xl">🍕</span>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-red-600 text-xs sm:text-sm font-bold text-white border-2 border-gray-900 shadow-lg">
            {cartCount}
          </span>
        )}
      </Button>

      <Cart 
        open={cartOpen} 
        onOpenChange={setCartOpen}
        items={cart.items}
        total={cart.total}
        customerInfo={cart.customerInfo}
        setCustomerInfo={cart.setCustomerInfo}
        updateQuantity={cart.updateQuantity}
        removeItem={cart.removeItem}
        clearCart={cart.clearCart}
      />
      
      <PromoModal open={promoOpen} onOpenChange={setPromoOpen} onAddToCart={cart.addItem} />
      <MeioMeioModal 
        open={meioMeioOpen} 
        onOpenChange={setMeioMeioOpen}
        pizzasSalgadas={pizzasSalgadas}
        pizzasDoces={pizzasDoces}
        onAddToCart={cart.addItem}
      />
    </div>
  );
}