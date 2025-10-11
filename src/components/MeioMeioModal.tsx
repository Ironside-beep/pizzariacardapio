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
  const [pizzaType, setPizzaType] = useState<"salgada" | "doce" | "mista">("salgada");

  // Combina todas as pizzas
  const allPizzas = [...pizzasSalgadas, ...pizzasDoces];

  // Calcula o preço do meio a meio
  const calculateMeioMeioPrice = () => {
    const pizza1 = allPizzas.find(p => p.id === firstHalf);
    const pizza2 = allPizzas.find(p => p.id === secondHalf);
    
    if (!pizza1 || !pizza2) return 0;
    
    const price1 = pizza1.prices.grande || 0;
    const price2 = pizza2.prices.grande || 0;
    
    return (price1 / 2) + (price2 / 2);
  };

  const getPizzasByType = () => {
    if (pizzaType === "salgada") return pizzasSalgadas;
    if (pizzaType === "doce") return pizzasDoces;
    return allPizzas;
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
      id: `meio-meio-${firstHalf}-${secondHalf}`,
      category: "pizza-salgada", // ou detectar automaticamente
      name: `MEIO A MEIO: ${pizza1?.name} + ${pizza2?.name}`,
      price: totalPrice,
      size: "grande"
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-gray-900 text-white border-2 border-pink-500/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Pizza className="h-6 w-6 text-pink-500" />
            Monte sua Pizza Meio a Meio
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Escolha 2 sabores para criar sua pizza grande personalizada
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Seletor de Tipo */}
          <div className="flex gap-2 flex-wrap">
            <Badge 
              variant={pizzaType === "salgada" ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 transition-colors ${
                pizzaType === "salgada" 
                  ? "bg-pink-600 hover:bg-pink-700" 
                  : "bg-gray-800 hover:bg-gray-700 border-gray-600"
              }`}
              onClick={() => setPizzaType("salgada")}
            >
              Salgadas
            </Badge>
            <Badge 
              variant={pizzaType === "doce" ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 transition-colors ${
                pizzaType === "doce" 
                  ? "bg-pink-600 hover:bg-pink-700" 
                  : "bg-gray-800 hover:bg-gray-700 border-gray-600"
              }`}
              onClick={() => setPizzaType("doce")}
            >
              Doces
            </Badge>
            <Badge 
              variant={pizzaType === "mista" ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 transition-colors ${
                pizzaType === "mista" 
                  ? "bg-pink-600 hover:bg-pink-700" 
                  : "bg-gray-800 hover:bg-gray-700 border-gray-600"
              }`}
              onClick={() => setPizzaType("mista")}
            >
              Todas (Doce + Salgada)
            </Badge>
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
              <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-[300px]">
                {getPizzasByType()
                  .filter(p => p.prices.grande) // Apenas pizzas com tamanho grande
                  .map((pizza) => (
                    <SelectItem 
                      key={pizza.id} 
                      value={pizza.id} 
                      className="text-white hover:bg-gray-700"
                    >
                      {pizza.name} - R$ {pizza.prices.grande?.toFixed(2)}
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
              <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-[300px]">
                {getPizzasByType()
                  .filter(p => p.prices.grande) // Apenas pizzas com tamanho grande
                  .map((pizza) => (
                    <SelectItem 
                      key={pizza.id} 
                      value={pizza.id}
                      className="text-white hover:bg-gray-700"
                    >
                      {pizza.name} - R$ {pizza.prices.grande?.toFixed(2)}
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
                  <p className="text-sm text-gray-400">Pizza Grande Meio a Meio</p>
                  <p className="font-semibold text-white">
                    {allPizzas.find(p => p.id === firstHalf)?.name} + {allPizzas.find(p => p.id === secondHalf)?.name}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl font-bold text-green-500">
                    R$ {calculateMeioMeioPrice().toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400">
                    (R$ {((allPizzas.find(p => p.id === firstHalf)?.prices.grande || 0) / 2).toFixed(2)} + 
                    R$ {((allPizzas.find(p => p.id === secondHalf)?.prices.grande || 0) / 2).toFixed(2)})
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