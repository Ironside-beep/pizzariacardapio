import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { MenuItem } from "@/data/menu";
import { type CartItem } from "@/hooks/useCart";

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  category: CartItem["category"];
  onAddToCart: (item: Omit<CartItem, "quantity">) => void;
  hasSizes?: boolean;
}

export function MenuSection({ title, items, category, onAddToCart, hasSizes = false }: MenuSectionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const addToCart = (item: MenuItem, size?: "broto" | "grande") => {
    const price = size ? (item.prices[size] || 0) : (item.prices.unit || 0);
    onAddToCart({
      id: item.id,
      category,
      name: item.name,
      price,
      size,
    });
  };

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-center bg-gradient-pizza bg-clip-text text-transparent">
        {title}
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isExpanded = expandedItems.has(item.id);
          
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
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {hasSizes && (item.prices.broto || item.prices.grande) ? (
                    // Pizza sizes
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
                    // Single price items
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-green-500 text-lg">
                        R$ {(item.prices.unit || 0).toFixed(2)}
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
  );
}