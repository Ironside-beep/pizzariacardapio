import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { MenuItem, PorcaoItem } from "@/data/menu";
import { type CartItem } from "@/hooks/useCart";

interface MenuSectionProps {
  title: string;
  items: MenuItem[] | PorcaoItem[];
  category: CartItem["category"];
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
  hasSizes?: boolean;
}

function isPorcaoItem(item: MenuItem | PorcaoItem): item is PorcaoItem {
  return 'price' in item && !('prices' in item);
}

export function MenuSection({ title, items, category, onAddToCart, hasSizes = false }: MenuSectionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [accompanimentModal, setAccompanimentModal] = useState<{
    open: boolean;
    item: PorcaoItem | null;
  }>({ open: false, item: null });

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleAddPorcao = (item: PorcaoItem, accompaniment?: string) => {
    const itemName = accompaniment ? `${item.name} (${accompaniment})` : item.name;
    
    onAddToCart({
      id: item.id,
      category,
      name: itemName,
      price: item.price,
    });
    
    setAccompanimentModal({ open: false, item: null });
  };

  const addToCart = (item: MenuItem | PorcaoItem, size?: "broto" | "grande") => {
    // Se é porção com acompanhamentos opcionais, abre o modal
    if (isPorcaoItem(item) && item.accompaniments?.optional && item.accompaniments.optional.length > 0) {
      setAccompanimentModal({ open: true, item });
      return;
    }
    
    let price = 0;
    
    if (isPorcaoItem(item)) {
      price = item.price;
    } else {
      price = size ? (item.prices[size] || 0) : (item.prices.unit || 0);
    }
    
    onAddToCart({
      id: item.id,
      category,
      name: item.name,
      price,
      size,
    });
  };

  return (
    <>
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-center bg-gradient-pizza bg-clip-text text-transparent">
          {title}
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const isExpanded = expandedItems.has(item.id);
            const isPorcao = isPorcaoItem(item);
            
            return (
              <Card key={item.id} className="card-hover bg-gray-800 border-gray-700 text-white">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base font-semibold leading-tight text-white">
                        {item.name}
                      </CardTitle>
                      {item.description && (
                        <CardDescription 
                          className={`mt-1 text-xs leading-relaxed text-gray-400 ${
                            isExpanded ? "" : "line-clamp-2"
                          }`}
                          onClick={() => item.description && toggleExpanded(item.id)}
                          role={item.description ? "button" : undefined}
                        >
                          {item.description}
                        </CardDescription>
                      )}
                      
                      {isPorcao && item.servings && (
                        <Badge className="mt-2 text-xs bg-red-600 hover:bg-red-600 text-white border-0 cursor-default">
                          {item.servings}
                        </Badge>
                      )}
                      
                      {isPorcao && item.accompaniments && (
                        <div className="mt-2 text-xs">
                          {item.accompaniments.included && item.accompaniments.included.length > 0 && (
                            <p className="mb-1 text-gray-300">
                              <span className="font-semibold text-green-400">Acompanha:</span> {item.accompaniments.included.join(", ")}
                            </p>
                          )}
                          {item.accompaniments.optional && item.accompaniments.optional.length > 0 && (
                            <p className="text-yellow-400 font-semibold">
                              + Escolha: {item.accompaniments.optional.join(" ou ")}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {!isPorcao && hasSizes && 'prices' in item && (item.prices.broto || item.prices.grande) ? (
                      <div className="space-y-2">
                        {item.prices.broto && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs text-white border-gray-600">BROTO</Badge>
                              <span className="font-semibold text-green-500">
                                R$ {item.prices.broto.toFixed(2)}
                              </span>
                            </div>
                            <Button
                              variant="pizza"
                              size="icon"
                              className="h-8 w-8 bg-green-600 hover:bg-green-700"
                              onClick={() => addToCart(item, "broto")}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        
                        {item.prices.grande && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs text-white border-gray-600">GRANDE</Badge>
                              <span className="font-semibold text-green-500">
                                R$ {item.prices.grande.toFixed(2)}
                              </span>
                            </div>
                            <Button
                              variant="pizza"
                              size="icon"
                              className="h-8 w-8 bg-green-600 hover:bg-green-700"
                              onClick={() => addToCart(item, "grande")}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-green-500 text-lg">
                          R$ {isPorcao ? item.price.toFixed(2) : ('prices' in item && item.prices.unit ? item.prices.unit.toFixed(2) : '0.00')}
                        </span>
                        <Button
                          variant="pizza"
                          size="icon"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Modal de seleção de acompanhamento - OTIMIZADO MOBILE */}
      <Dialog open={accompanimentModal.open} onOpenChange={(open) => setAccompanimentModal({ open, item: null })}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-[95vw] sm:max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-bold text-white">
              {accompanimentModal.item?.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-400">
              Escolha o acompanhamento para sua porção
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 mt-2 sm:mt-4">
            {accompanimentModal.item?.accompaniments?.included && 
             accompanimentModal.item.accompaniments.included.length > 0 && (
              <div className="p-3 bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-green-400">Já incluso:</span>{" "}
                  {accompanimentModal.item.accompaniments.included.join(", ")}
                </p>
              </div>
            )}
            
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-300 mb-2">
                Escolha uma opção:
              </p>
              
              {accompanimentModal.item?.accompaniments?.optional?.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleAddPorcao(accompanimentModal.item!, option)}
                  className="w-full bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white font-semibold py-4 text-base sm:text-lg touch-manipulation"
                >
                  {option}
                </Button>
              ))}
            </div>
            
            <div className="pt-3 border-t border-gray-700">
              <p className="text-center text-base text-gray-400">
                Preço: <span className="text-green-500 font-bold text-xl">R$ {accompanimentModal.item?.price.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}