import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart, type CartItem } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface CartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: ReturnType<typeof useCart>;
}

export function Cart({ open, onOpenChange, cart }: CartProps) {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [orderType, setOrderType] = useState<"retirada" | "entrega">("retirada");
  const { toast } = useToast();

  const handleFinishOrder = () => {
    if (!cart.customerInfo.name || !cart.customerInfo.phone || !cart.customerInfo.address || !cart.customerInfo.neighborhood || !cart.customerInfo.number) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const itemsMessage = cart.items
      .map(item => `${item.quantity}x ${item.name}${item.size ? ` (${item.size})` : ""} - R$ ${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");

    const message = `
Pedido:
${itemsMessage}

Total: R$ ${cart.total.toFixed(2)}

Tipo de pedido: ${orderType}
Cliente: ${cart.customerInfo.name}
Telefone: ${cart.customerInfo.phone}
Endereço: ${cart.customerInfo.address}, ${cart.customerInfo.number} - ${cart.customerInfo.neighborhood}
Observações: ${cart.customerInfo.observations || "Nenhuma"}
Forma de pagamento: ${cart.customerInfo.paymentMethod}
`;

    const whatsappUrl = `https://wa.me/5511992596860?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    cart.clearCart();
    cart.setCustomerInfo({
      name: "",
      phone: "",
      address: "",
      neighborhood: "",
      number: "",
      observations: "",
      paymentMethod: "dinheiro",
    });
    setStep("cart");
    onOpenChange(false);

    toast({
      title: "Pedido enviado!",
      description: "Seu pedido foi enviado para o WhatsApp da pizzaria.",
    });
  };

  if (step === "checkout") {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-gray-900 text-white">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="truncate">Finalizar Pedido</span>
            </SheetTitle>
            <SheetDescription className="text-gray-400">
              Preencha seus dados para finalizar o pedido
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 py-6">
            {/* Tipo de Pedido */}
            <div className="flex gap-4 mb-4">
              <Button 
                variant="ghost"
                onClick={() => setOrderType("retirada")}
                className={`flex-1 whitespace-nowrap border ${orderType === "retirada" ? "bg-green-600 text-white border-pink-600" : "bg-gray-800 text-white border-gray-700"} hover:bg-green-700 hover:border-green-700`}
              >
                Retirada
              </Button>
              <Button 
                variant="ghost"
                onClick={() => setOrderType("entrega")}
                className={`flex-1 whitespace-nowrap border ${orderType === "entrega" ? "bg-green-600 text-white border-pink-600" : "bg-gray-800 text-white border-gray-700"} hover:bg-green-700 hover:border-green-700`}
              >
                Entrega
              </Button>
            </div>

            {/* Customer Info Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-200">Nome *</Label>
                  <Input
                    id="name"
                    value={cart.customerInfo.name}
                    onChange={(e) => cart.setCustomerInfo({ ...cart.customerInfo, name: e.target.value })}
                    placeholder="Seu nome completo"
                    className="bg-gray-800 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-gray-200">Telefone *</Label>
                  <Input
                    id="phone"
                    value={cart.customerInfo.phone}
                    onChange={(e) => cart.setCustomerInfo({ ...cart.customerInfo, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                    className="bg-gray-800 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address" className="text-gray-200">Endereço *</Label>
                  <Input
                    id="address"
                    value={cart.customerInfo.address}
                    onChange={(e) => cart.setCustomerInfo({ ...cart.customerInfo, address: e.target.value })}
                    placeholder="Rua, Avenida..."
                    className="bg-gray-800 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="number" className="text-gray-200">Número *</Label>
                  <Input
                    id="number"
                    value={cart.customerInfo.number}
                    onChange={(e) => cart.setCustomerInfo({ ...cart.customerInfo, number: e.target.value })}
                    placeholder="123"
                    className="bg-gray-800 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="neighborhood" className="text-gray-200">Bairro *</Label>
                <Input
                  id="neighborhood"
                  value={cart.customerInfo.neighborhood}
                  onChange={(e) => cart.setCustomerInfo({ ...cart.customerInfo, neighborhood: e.target.value })}
                  placeholder="Nome do bairro"
                  className="bg-gray-800 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="payment" className="text-gray-200">Forma de Pagamento *</Label>
                <Select
                  value={cart.customerInfo.paymentMethod}
                  onValueChange={(value: "dinheiro" | "debito" | "credito" | "pix") => 
                    cart.setCustomerInfo({ ...cart.customerInfo, paymentMethod: value })
                  }
                >
                  <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                    <SelectValue className="text-white"/>
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white">
                    <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    <SelectItem value="debito">Cartão de Débito</SelectItem>
                    <SelectItem value="credito">Cartão de Crédito</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="observations" className="text-gray-200">Observações</Label>
                <Textarea
                  id="observations"
                  value={cart.customerInfo.observations}
                  onChange={(e) => cart.setCustomerInfo({ ...cart.customerInfo, observations: e.target.value })}
                  placeholder="Observações adicionais (opcional)"
                  rows={3}
                  className="bg-gray-800 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          <SheetFooter className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-lg font-bold text-white">
              <span>Total:</span>
              <span className="text-primary">R$ {cart.total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="solid" onClick={() => setStep("cart")} className="flex-1 whitespace-nowrap bg-green-600 text-white">
                Voltar
              </Button>
              <Button variant="whatsapp" onClick={handleFinishOrder} className="flex-1 whitespace-nowrap bg-green-600 text-white">
                Finalizar no WhatsApp
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-gray-900 text-white">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span className="truncate">Carrinho ({cart.items.reduce((sum, item) => sum + item.quantity, 0)} itens)</span>
          </SheetTitle>
          <SheetDescription className="text-gray-400">
            Revise seu pedido antes de finalizar
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 py-6">
          {cart.items.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Seu carrinho está vazio</p>
              <p className="text-sm">Adicione itens do cardápio</p>
            </div>
          ) : (
            <>
              {cart.items.map((item) => (
                <div key={`${item.id}-${item.size || 'unit'}`} className="card-hover p-4 rounded-lg border border-gray-700 bg-gray-800">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{item.name}</h4>
                      {item.size && (
                        <Badge variant="outline" className="mt-1 whitespace-nowrap text-white border-gray-500">
                          {item.size.toUpperCase()}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="solid"
                          size="icon"
                          className="h-8 w-8 bg-green-600 text-white"
                          onClick={() => cart.updateQuantity(item.id, item.quantity - 1, item.size)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="solid"
                          size="icon"
                          className="h-8 w-8 bg-green-600 text-white"
                          onClick={() => cart.updateQuantity(item.id, item.quantity + 1, item.size)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-bold text-primary">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-400"
                        onClick={() => cart.removeItem(item.id, item.size)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Separator className="border-gray-700" />

              <div className="flex items-center justify-between text-lg font-bold text-white">
                <span>Total:</span>
                <span className="text-primary">R$ {cart.total.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {cart.items.length > 0 && (
          <SheetFooter className="flex flex-col gap-2">
            <Button variant="solid" onClick={cart.clearCart} className="w-full bg-green-600 text-white">
              <Trash2 className="h-4 w-4 mr-2" />
              Limpar Carrinho
            </Button>
            <Button variant="solid" onClick={() => setStep("checkout")} className="w-full bg-green-600 text-white">
              Continuar Pedido
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
