import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pizza, Check } from "lucide-react";
import { MenuItem } from "@/data/menu";
import { type CartItem } from "@/hooks/useCart";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  // Pega as pizzas baseado no tipo selecionado
  const getPizzasByType = () => {
    return pizzaType === "salgada" ? pizzasSalgadas : pizzasDoces;
  };

  const allPizzas = [...pizzasSalgadas, ...pizzasDoces];

  // Calcula o preço do meio a meio (PREÇO DA MAIS CARA)
  const calculateMeioMeioPrice = () => {
    const pizza1 = allPizzas.find(p => p.id === firstHalf);
    const pizza2 = allPizzas.find(p => p.id === secondHalf);
    
    if (!pizza1 || !pizza2) return 0;
    
    const price1 = (pizzaSize === "broto" ? pizza1.prices.broto : pizza1.prices.grande) || 0;
    const price2 = (pizzaSize === "broto" ? pizza2.prices.broto : pizza2.prices.grande) || 0;
    
    // Retorna o MAIOR preço
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
    
    // Adiciona ao carrinho com ID simplificado
    onAddToCart({
      id: `mm-${Date.now()}`,
      category: pizzaType === "salgada" ? "pizza-salgada" : "pizza-doce",
      name: `MEIO A MEIO (${pizzaSize.toUpperCase()}): ${pizza1?.name} + ${pizza2?.name}`,
      price: totalPrice,
      size: pizzaSize
    });
    
    // Limpa e fecha
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

  // Reseta as seleções quando muda o tipo
  const handleTypeChange = (newType: "salgada" | "doce") => {
    setPizzaType(newType);
    setFirstHalf("");
    setSecondHalf("");
    setSelectingHalf(null);
  };

  const handlePizzaSelect = (pizzaId: string) => {
    if (selectingHalf === "first") {
      setFirstHalf(pizzaId);
      setSelectingHalf(null);
    } else if (selectingHalf === "second") {
      setSecondHalf(pizzaId);
      setSelectingHalf(null);
    }
  };

  const getPizzaName = (id: string) => {
    return allPizzas.find(p => p.id === id)?.name || "";
  };

  // Tela de seleção de sabores
  if (selectingHalf) {
    const availablePizzas = getPizzasByType().filter(p => 
      pizzaSize === "broto" ? p.prices.broto : p.prices.grande
    );

    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-2xl bg-gray-900 text-white border-2 border-pink-500/30 max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Pizza className="h-6 w-6 text-pink-500" />
              Escolha o {selectingHalf === "first" ? "Primeiro" : "Segundo"} Sabor
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Selecione uma pizza {pizzaType === "salgada" ? "salgada" : "doce"}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 px-6">
            <div className="space-y-2 py-4">
              {availablePizzas.map((pizza) => {
                const price = (pizzaSize === "broto" ? pizza.prices.broto : pizza.prices.grande) || 0;
                const isSelected = (selectingHalf === "first" ? firstHalf : secondHalf) === pizza.id;
                
                return (
                  <button
                    key={pizza.id}
                    onClick={() => handlePizzaSelect(pizza.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected 
                        ? "border-green-500 bg-green-500/10" 
                        : "border-gray-700 bg-gray-800 hover:border-gray-600 hover:bg-gray-750"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">{pizza.name}</h4>
                        <p className="text-sm text-gray-400 line-clamp-2">{pizza.description}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="font-bold text-green-500">R$ {price.toFixed(2)}</span>
                        {isSelected && (
                          <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>

          <div className="p-6 pt-4 border-t border-gray-700 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setSelectingHalf(null)}
              className="flex-1 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
            >
              Voltar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Tela principal
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-gray-900 text-white border-2 border-pink-500/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Pizza className="h-6 w-6 text-pink-500" />
            Monte sua Pizza Meio a Meio
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Escolha 2 sabores do mesmo tipo (salgada OU doce)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Seletor de Tamanho */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-200">
              Tamanho da Pizza *
            </label>
            <div className="flex gap-2">
              <Badge 
                variant={pizzaSize === "broto" ? "default" : "outline"}
                className={`cursor-pointer px-6 py-3 text-base font-bold transition-colors ${
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
                className={`cursor-pointer px-6 py-3 text-base font-bold transition-colors ${
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
            <label className="text-sm font-semibold text-gray-200">
              Tipo de Pizza *
            </label>
            <div className="flex gap-2 flex-wrap">
              <Badge 
                variant={pizzaType === "salgada" ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 font-bold transition-colors ${
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
                className={`cursor-pointer px-4 py-2 font-bold transition-colors ${
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
            <label className="text-sm font-semibold text-gray-200">
              Primeira Metade *
            </label>
            <Button
              variant="outline"
              onClick={() => setSelectingHalf("first")}
              className="w-full justify-between bg-gray-800 border-gray-700 text-white hover:bg-gray-700 h-auto py-3"
            >
              <span className={firstHalf ? "text-white" : "text-gray-400"}>
                {firstHalf ? getPizzaName(firstHalf) : "Escolha o primeiro sabor"}
              </span>
              <span className="text-gray-400">›</span>
            </Button>
          </div>

          {/* Segunda Metade */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-200">
              Segunda Metade *
            </label>
            <Button
              variant="outline"
              onClick={() => setSelectingHalf("second")}
              className="w-full justify-between bg-gray-800 border-gray-700 text-white hover:bg-gray-700 h-auto py-3"
            >
              <span className={secondHalf ? "text-white" : "text-gray-400"}>
                {secondHalf ? getPizzaName(secondHalf) : "Escolha o segundo sabor"}
              </span>
              <span className="text-gray-400">›</span>
            </Button>
          </div>

          {/* Preview do Preço */}
          {firstHalf && secondHalf && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-400">Pizza {pizzaSize === "broto" ? "Broto" : "Grande"} Meio a Meio</p>
                  <p className="font-semibold text-white">
                    {getPizzaName(firstHalf)} + {getPizzaName(secondHalf)}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl font-bold text-green-500">
                    R$ {calculateMeioMeioPrice().toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddMeioMeio}
            disabled={!firstHalf || !secondHalf}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Adicionar ao Carrinho
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}