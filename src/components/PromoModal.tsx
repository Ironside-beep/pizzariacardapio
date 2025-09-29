import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Percent } from "lucide-react";
import { promocoes } from "@/data/menu";
import { type CartItem } from "@/hooks/useCart";

interface PromoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
}

export function PromoModal({ open, onOpenChange, onAddToCart }: PromoModalProps) {
  const addPromoToCart = (promo: typeof promocoes[0]) => {
    onAddToCart({
      id: promo.id,
      category: "esfiha-salgada", // Promocoes are mainly esfihas
      name: promo.name,
      price: promo.price,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Percent className="h-6 w-6 text-primary" />
            <span className="bg-gradient-pizza bg-clip-text text-transparent">
              PROMOÇÕES ESPECIAIS
            </span>
          </DialogTitle>
          <DialogDescription>
            Pacotes de esfihas com preços especiais! Não mexemos nos pacotes.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          {promocoes.map((promo) => (
            <Card key={promo.id} className="card-hover border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-primary">
                      {promo.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {promo.description}
                    </CardDescription>
                  </div>
                  <Badge variant="default" className="bg-primary pulse-glow">
                    OFERTA
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Inclui:</p>
                  <ul className="text-sm space-y-1">
                    {promo.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-2xl font-bold text-primary">
                    R$ {promo.price.toFixed(2)}
                  </span>
                  <Button
                    variant="pizza"
                    onClick={() => addPromoToCart(promo)}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-center text-muted-foreground">
            ⚠️ <strong>Importante:</strong> Não fazemos alterações nos pacotes promocionais.
            Os itens são fixos conforme descrição.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}