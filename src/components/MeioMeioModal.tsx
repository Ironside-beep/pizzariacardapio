import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pizza, Check, ChevronLeft } from "lucide-react";
import { MenuItem } from "@/data/menu";
import { type CartItem } from "@/hooks/useCart";

interface MeioMeioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pizzasSalgadas: MenuItem[];
  pizzasDoces: MenuItem[];
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
}

export function MeioMeioModal({ 
  open, 
  onOpenChange, 
  pizzasSalgadas, 
  pizzasDoces,
  onAddToCart 
}: MeioMeioModalProps) {
  const [firstHalf, setFirstHalf] = useState("");
  const [secondHalf, setSecondHalf] = useState("");
  const [pizzaSize, setPizzaSize] = useState<"broto" | "grande">("grande");
  const [pizzaType, setPizzaType] = useState<"salgada" | "doce">("salgada");
  const [selectingHalf, setSelectingHalf] = useState<"first" | "second" | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset ao fechar
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSelectingHalf(null);
      }, 300);
    }
  }, [open]);

  // Scroll para o topo quando muda de tela
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [selectingHalf]);

  const getPizzasByType = () => {
    return pizzaType === "salgada" ? pizzasSalgadas : pizzasDoces;
  };

  const allPizzas = [...pizzasSalgadas, ...pizzasDoces];

  const calculateMeioMeioPrice = () => {
    const pizza1 = allPizzas.find(p => p.id === firstHalf);
    const pizza2 = allPizzas.find(p => p.id === secondHalf);
    
    if (!pizza1 || !pizza2) return 0;
    
    const price1 = (pizzaSize === "broto" ? pizza1.prices.broto : pizza1.prices.grande) || 0;
    const price2 = (pizzaSize === "broto" ? pizza2.prices.broto : pizza2.prices.grande) || 0;
    
    return Math.max(price1, price2);
  };

  const handleAddMeioMeio = () => {
    if (!firstHalf || !secondHalf) {
      alert("Selecione os dois sabores!");
      return;
    }
    
    const pizza1 = allPizzas.find(p => p.id === firstHalf);
    const pizza2 = allPizzas.find(p => p.id === secondHalf);
    const totalPrice = calculateMeioMeioPrice();
    
    onAddToCart({
      id: `mm-${Date.now()}`,
      category: pizzaType === "salgada" ? "pizza-salgada" : "pizza-doce",
      name: `MEIO A MEIO (${pizzaSize.toUpperCase()}): ${pizza1?.name} + ${pizza2?.name}`,
      price: totalPrice,
      size: pizzaSize
    });
    
    setFirstHalf("");
    setSecondHalf("");
    setSelectingHalf(null);
    onOpenChange(false);
  };

  const handleClose = () => {
    setFirstHalf("");
    setSecondHalf("");
    setSelectingHalf(null);
    onOpenChange(false);
  };

  const handleTypeChange = (newType: "salgada" | "doce") => {
    setPizzaType(newType);
    setFirstHalf("");
    setSecondHalf("");
  };

  const handlePizzaSelect = (pizzaId: string) => {
    if (selectingHalf === "first") {
      setFirstHalf(pizzaId);
    } else if (selectingHalf === "second") {
      setSecondHalf(pizzaId);
    }
    setTimeout(() => {
      setSelectingHalf(null);
    }, 100);
  };

  const handleBackToMain = () => {
    setTimeout(() => {
      setSelectingHalf(null);
    }, 50);
  };

  const getPizzaName = (id: string) => {
    return allPizzas.find(p => p.id === id)?.name || "";
  };

  const availablePizzas = getPizzasByType().filter(p => 
    pizzaSize === "broto" ? p.prices.broto : p.prices.grande
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-2xl bg-gray-900 text-white border-2 border-pink-500/30 p-0 gap-0 max-w-[95vw] w-full"
        style={{ 
          maxHeight: '90vh',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Tela de Seleção de Sabores */}
        {selectingHalf ? (
          <>
            {/* Header Fixo */}
            <div className="p-4 sm:p-6 pb-3 flex-shrink-0 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleBackToMain}
                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 flex-shrink-0"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2 text-white">
                    <Pizza className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                    {selectingHalf === "first" ? "Primeiro" : "Segundo"} Sabor
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Toque para selecionar
                  </p>
                </div>
              </div>
            </div>

            {/* Área Scrollável */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 sm:p-6 pt-3"
              style={{
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
              }}
            >
              <div className="space-y-2 pb-4">
                {availablePizzas.map((pizza) => {
                  const price = (pizzaSize === "broto" ? pizza.prices.broto : pizza.prices.grande) || 0;
                  const isSelected = (selectingHalf === "first" ? firstHalf : secondHalf) === pizza.id;
                  
                  return (
                    <button
                      key={pizza.id}
                      type="button"
                      onClick={() => handlePizzaSelect(pizza.id)}
                      className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                        isSelected 
                          ? "border-green-500 bg-green-500/10" 
                          : "border-gray-700 bg-gray-800 active:bg-gray-700"
                      }`}
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div className="flex items-start justify-between gap-2 sm:gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm sm:text-base leading-tight">{pizza.name}</h4>
                          {pizza.description && (
                            <p className="text-xs sm:text-sm text-gray-400 line-clamp-1 mt-1">{pizza.description}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                          <span className="font-bold text-green-500 text-sm sm:text-base whitespace-nowrap">R$ {price.toFixed(2)}</span>
                          {isSelected && (
                            <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Tela Principal */
          <>
            {/* Header Fixo */}
            <div className="p-4 sm:p-6 pb-3 flex-shrink-0 border-b border-gray-800">
              <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2 text-white">
                <Pizza className="h-5 w-5 sm:h-6 sm:w-6 text-pink-500" />
                Monte sua Pizza Meio a Meio
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Escolha 2 sabores do mesmo tipo
              </p>
            </div>

            {/* Área Scrollável */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 sm:p-6 pt-3"
              style={{
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
              }}
            >
              <div className="space-y-4 sm:space-y-6 pb-4">
                {/* Seletor de Tamanho */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-200">
                    Tamanho da Pizza *
                  </label>
                  <div className="flex gap-2">
                    <Badge 
                      variant={pizzaSize === "broto" ? "default" : "outline"}
                      className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold transition-colors ${
                        pizzaSize === "broto" 
                          ? "bg-green-600 hover:bg-green-700 text-white border-green-600" 
                          : "bg-gray-700 hover:bg-gray-600 border-gray-500 text-white"
                      }`}
                      onClick={() => setPizzaSize("broto")}
                    >
                      BROTO
                    </Badge>
                    <Badge 
                      variant={pizzaSize === "grande" ? "default" : "outline"}
                      className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-bold transition-colors ${
                        pizzaSize === "grande" 
                          ? "bg-green-600 hover:bg-green-700 text-white border-green-600" 
                          : "bg-gray-700 hover:bg-gray-600 border-gray-500 text-white"
                      }`}
                      onClick={() => setPizzaSize("grande")}
                    >
                      GRANDE
                    </Badge>
                  </div>
                </div>

                {/* Seletor de Tipo */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-200">
                    Tipo de Pizza *
                  </label>
                  <div className="flex gap-2">
                    <Badge 
                      variant={pizzaType === "salgada" ? "default" : "outline"}
                      className={`cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-bold transition-colors ${
                        pizzaType === "salgada" 
                          ? "bg-pink-600 hover:bg-pink-700 text-white border-pink-600" 
                          : "bg-gray-700 hover:bg-gray-600 border-gray-500 text-white"
                      }`}
                      onClick={() => handleTypeChange("salgada")}
                    >
                      🍕 Salgadas
                    </Badge>
                    <Badge 
                      variant={pizzaType === "doce" ? "default" : "outline"}
                      className={`cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-bold transition-colors ${
                        pizzaType === "doce" 
                          ? "bg-pink-600 hover:bg-pink-700 text-white border-pink-600" 
                          : "bg-gray-700 hover:bg-gray-600 border-gray-500 text-white"
                      }`}
                      onClick={() => handleTypeChange("doce")}
                    >
                      🍰 Doces
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    ⚠️ Não é possível misturar pizza doce com salgada
                  </p>
                </div>

                {/* Primeira Metade */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-200">
                    Primeira Metade *
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectingHalf("first")}
                    className="w-full justify-between bg-gray-800 border-gray-700 text-white hover:bg-gray-700 h-auto py-3 text-sm sm:text-base"
                  >
                    <span className={`truncate ${firstHalf ? "text-white" : "text-gray-400"}`}>
                      {firstHalf ? getPizzaName(firstHalf) : "Escolha o primeiro sabor"}
                    </span>
                    <span className="text-gray-400 text-lg ml-2 flex-shrink-0">›</span>
                  </Button>
                </div>

                {/* Segunda Metade */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-200">
                    Segunda Metade *
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectingHalf("second")}
                    className="w-full justify-between bg-gray-800 border-gray-700 text-white hover:bg-gray-700 h-auto py-3 text-sm sm:text-base"
                  >
                    <span className={`truncate ${secondHalf ? "text-white" : "text-gray-400"}`}>
                      {secondHalf ? getPizzaName(secondHalf) : "Escolha o segundo sabor"}
                    </span>
                    <span className="text-gray-400 text-lg ml-2 flex-shrink-0">›</span>
                  </Button>
                </div>

                {/* Preview do Preço */}
                {firstHalf && secondHalf && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-400">Pizza {pizzaSize === "broto" ? "Broto" : "Grande"} Meio a Meio</p>
                        <p className="font-semibold text-white text-sm sm:text-base break-words">
                          {getPizzaName(firstHalf)} + {getPizzaName(secondHalf)}
                        </p>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <p className="text-xl sm:text-2xl font-bold text-green-500">
                          R$ {calculateMeioMeioPrice().toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Fixo */}
            <div className="flex-shrink-0 p-4 sm:p-6 pt-3 border-t border-gray-800">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                >
                  Cancelar
                </Button>
                <Button
                  type="button"
                  onClick={handleAddMeioMeio}
                  disabled={!firstHalf || !secondHalf}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}