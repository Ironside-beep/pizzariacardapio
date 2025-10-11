import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pizza } from "lucide-react";
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
    
    // Adiciona ao carrinho
    onAddToCart({
      id: `meio-meio-${pizzaSize}-${firstHalf}-${secondHalf}`,
      category: pizzaType === "salgada" ? "pizza-salgada" : "pizza-doce",
      name: `MEIO A MEIO (${pizzaSize.toUpperCase()}): ${pizza1?.name} + ${pizza2?.name}`,
      price: totalPrice,
      size: pizzaSize
    });
    
    // Limpa e fecha
    setFirstHalf("");
    setSecondHalf("");
    onOpenChange(false);
  };

  const handleClose = () => {
    setFirstHalf("");
    setSecondHalf("");
    onOpenChange(false);
  };

  // Reseta as seleções quando muda o tipo
  const handleTypeChange = (newType: "salgada" | "doce") => {
    setPizzaType(newType);
    setFirstHalf("");
    setSecondHalf("");
  };

  const getPrice1 = () => {
    const pizza = allPizzas.find(p => p.id === firstHalf);
    if (!pizza) return 0;
    return (pizzaSize === "broto" ? pizza.prices.broto : pizza.prices.grande) || 0;
  };

  const getPrice2 = () => {
    const pizza = allPizzas.find(p => p.id === secondHalf);
    if (!pizza) return 0;
    return (pizzaSize === "broto" ? pizza.prices.broto : pizza.prices.grande) || 0;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Select value={firstHalf} onValueChange={setFirstHalf}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Escolha o primeiro sabor" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 max-h-[300px]">
                {getPizzasByType()
                  .filter(p => pizzaSize === "broto" ? p.prices.broto : p.prices.grande)
                  .map((pizza) => (
                    <SelectItem 
                      key={pizza.id} 
                      value={pizza.id} 
                      className="text-white bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white"
                    >
                      {pizza.name} - R$ {(pizzaSize === "broto" ? pizza.prices.broto : pizza.prices.grande)?.toFixed(2)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Segunda Metade */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-200">
              Segunda Metade *
            </label>
            <Select value={secondHalf} onValueChange={setSecondHalf}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Escolha o segundo sabor" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 max-h-[300px]">
                {getPizzasByType()
                  .filter(p => pizzaSize === "broto" ? p.prices.broto : p.prices.grande)
                  .map((pizza) => (
                    <SelectItem 
                      key={pizza.id} 
                      value={pizza.id}
                      className="text-white bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 focus:text-white data-[highlighted]:bg-gray-700 data-[highlighted]:text-white"
                    >
                      {pizza.name} - R$ {(pizzaSize === "broto" ? pizza.prices.broto : pizza.prices.grande)?.toFixed(2)}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preview do Preço */}
          {firstHalf && secondHalf && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-400">Pizza {pizzaSize === "broto" ? "Broto" : "Grande"} Meio a Meio</p>
                  <p className="font-semibold text-white">
                    {allPizzas.find(p => p.id === firstHalf)?.name} + {allPizzas.find(p => p.id === secondHalf)?.name}
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