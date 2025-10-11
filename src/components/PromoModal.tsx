import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Percent, ShoppingCart } from "lucide-react";
import { promocoes } from "@/data/menu";
import { type CartItem } from "@/hooks/useCart";

interface PromoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
}

export function PromoModal({ open, onOpenChange, onAddToCart }: PromoModalProps) {
  
  const handleAddPromo = (promo: typeof promocoes[0]) => {
    onAddToCart({
      id: promo.id,
      category: "esfiha-salgada",
      name: promo.name,
      price: promo.price,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl bg-gray-900 text-white border-2 border-green-500/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Percent className="h-6 w-6 text-green-500" />
            Promoções Especiais
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Pacotes com preços especiais!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {promocoes.map((promo) => (
            <div 
              key={promo.id} 
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-green-500/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white">{promo.name}</h3>
                    <Badge className="bg-green-600 text-white">PROMOÇÃO</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{promo.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {promo.items.map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-white border-gray-600">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 min-w-[120px]">
                  <p className="text-2xl font-bold text-green-500">
                    R$ {promo.price.toFixed(2)}
                  </p>
                  <Button
                    onClick={() => handleAddPromo(promo)}
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}