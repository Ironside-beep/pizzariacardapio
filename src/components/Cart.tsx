import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Minus, ShoppingCart, Clock, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Importar as interfaces do hook
import type { CartItem, CustomerInfo } from "@/hooks/useCart";

interface CartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  total: number;
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
  updateQuantity: (id: string, quantity: number, size?: string) => void;
  removeItem: (id: string, size?: string) => void;
  clearCart: () => void;
}

export function Cart({ 
  open, 
  onOpenChange, 
  items,
  total,
  customerInfo,
  setCustomerInfo,
  updateQuantity,
  removeItem,
  clearCart
}: CartProps) {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [orderType, setOrderType] = useState<"retirada" | "entrega">("retirada");
  const [showClosedAlert, setShowClosedAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: "", description: "" });

  // Toast simples
  const toast = ({ title, description }: { title: string; description: string; variant?: string }) => {
    setToastMessage({ title, description });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Função para verificar se está aberto
  const isOpen = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    if (day >= 1 && day <= 4) return hour >= 18 && hour < 24;
    if (day === 5 || day === 6) return hour >= 18 || hour < 1;
    return hour >= 18 && hour < 24;
  };

  // Função para obter próximo horário de abertura
  const getNextOpeningTime = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if ((day === 5 || day === 6) && hour >= 0 && hour < 1) {
      return "Hoje até 00:50";
    }

    if (hour < 18) {
      return "Hoje às 18:00";
    }

    if (day === 0) return "Segunda-feira às 18:00";
    if (day >= 1 && day <= 4) return "Amanhã às 18:00";
    if (day === 5) return "Hoje às 18:00";
    if (day === 6) return "Hoje às 18:00";
    
    return "Em breve";
  };

  const handleContinueToCheckout = () => {
    if (!isOpen()) {
      setShowClosedAlert(true);
      return;
    }
    setStep("checkout");
  };

  const handleFinishOrder = () => {
    if (!isOpen()) {
      setShowClosedAlert(true);
      return;
    }

    // Validação condicional baseada no tipo de pedido
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Se for entrega, valida os campos de endereço
    if (orderType === "entrega" && (!customerInfo.address || !customerInfo.neighborhood || !customerInfo.number)) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o endereço completo para entrega.",
        variant: "destructive",
      });
      return;
    }

    const itemsMessage = items
      .map(item => `${item.quantity}x ${item.name}${item.size ? ` (${item.size})` : ""} - R$ ${(item.price * item.quantity).toFixed(2)}`)
      .join("\n");

    // Monta a mensagem condicionalmente
    let message = `
Pedido:
${itemsMessage}

Total: R$ ${total.toFixed(2)}

Tipo de pedido: ${orderType === "retirada" ? "Retirada no local" : "Entrega"}
Cliente: ${customerInfo.name}
Telefone: ${customerInfo.phone}`;

    // Adiciona endereço apenas se for entrega
    if (orderType === "entrega") {
      message += `
Endereço: ${customerInfo.address}, ${customerInfo.number} - ${customerInfo.neighborhood}`;
    }

    message += `
Observações: ${customerInfo.observations || "Nenhuma"}
Forma de pagamento: ${customerInfo.paymentMethod}
`;

    const whatsappUrl = `https://wa.me/5511992596860?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    clearCart();
    setCustomerInfo({
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

  // Toast Component
  const ToastNotification = () => showToast ? (
    <div className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white p-4 rounded-lg shadow-lg border border-gray-700 animate-in slide-in-from-bottom">
      <h4 className="font-semibold">{toastMessage.title}</h4>
      <p className="text-sm text-gray-300">{toastMessage.description}</p>
    </div>
  ) : null;

  // Modal de Pizzaria Fechada
  const ClosedAlert = () => (
    <Dialog open={showClosedAlert} onOpenChange={setShowClosedAlert}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-2 border-pink-500/30 text-white">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20 ring-8 ring-red-500/10">
            <AlertCircle className="h-10 w-10 text-red-500 animate-pulse" />
          </div>
          <DialogTitle className="text-center text-2xl font-bold text-white">
            Ops! Estamos Fechados
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300 text-base mt-2">
            No momento não estamos recebendo pedidos
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                <Clock className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-white">Próxima Abertura</p>
                <p className="text-sm text-gray-400">{getNextOpeningTime()}</p>
              </div>
            </div>
            
            <Separator className="my-3 bg-gray-700" />
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Dom - Quinta:</span>
                <span className="text-white font-medium">18:00 - 23:45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sex - Sábado:</span>
                <span className="text-white font-medium">18:00 - 00:50</span>
              </div>
            </div>
          </div>

          <div className="bg-pink-500/10 rounded-lg p-4 border border-pink-500/30">
            <p className="text-center text-sm text-pink-200">
              Seu carrinho está salvo! Volte no horário de funcionamento para finalizar seu pedido.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setShowClosedAlert(false)}
            className="flex-1 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold"
          >
            Entendi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (step === "checkout") {
    return (
      <>
        <ToastNotification />
        <ClosedAlert />
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent 
            className="w-full sm:max-w-lg overflow-y-auto bg-gray-900 text-white flex flex-col h-full"
            style={{ maxHeight: '100dvh' }}
          >
            <SheetHeader className="flex-shrink-0">
              <SheetTitle className="flex items-center gap-2 text-white">
                <ShoppingCart className="h-5 w-5" />
                <span className="truncate">Finalizar Pedido</span>
              </SheetTitle>
              <SheetDescription className="text-gray-400">
                Preencha seus dados para finalizar o pedido
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 py-6 flex-1 overflow-y-auto">
              <div className="flex gap-4 mb-4">
                <Button 
                  variant="ghost"
                  onClick={() => setOrderType("retirada")}
                  className={`flex-1 whitespace-nowrap border ${orderType === "retirada" ? "bg-green-600 text-white border-green-600" : "bg-gray-800 text-white border-gray-700"} hover:bg-green-700 hover:border-green-700`}
                >
                  Retirada
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => setOrderType("entrega")}
                  className={`flex-1 whitespace-nowrap border ${orderType === "entrega" ? "bg-green-600 text-white border-green-600" : "bg-gray-800 text-white border-gray-700"} hover:bg-green-700 hover:border-green-700`}
                >
                  Entrega
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-200">Nome *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="Seu nome completo"
                      className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-200">Telefone *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* Campos de endereço - apenas para entrega */}
                {orderType === "entrega" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="address" className="text-gray-200">Endereço *</Label>
                        <Input
                          id="address"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                          placeholder="Rua, Avenida..."
                          className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                        />
                      </div>
                      <div>
                        <Label htmlFor="number" className="text-gray-200">Número *</Label>
                        <Input
                          id="number"
                          value={customerInfo.number}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, number: e.target.value })}
                          placeholder="123"
                          className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="neighborhood" className="text-gray-200">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={customerInfo.neighborhood}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, neighborhood: e.target.value })}
                        placeholder="Nome do bairro"
                        className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="payment" className="text-gray-200">Forma de Pagamento *</Label>
                  <Select
                    value={customerInfo.paymentMethod}
                    onValueChange={(value: "dinheiro" | "debito" | "credito" | "pix") => 
                      setCustomerInfo({ ...customerInfo, paymentMethod: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800 text-white border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all">
                      <SelectValue className="text-white"/>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-gray-700">
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
                    value={customerInfo.observations || ""}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, observations: e.target.value })}
                    placeholder="Observações adicionais (opcional)"
                    rows={3}
                    className="bg-gray-800 text-white placeholder-gray-400 border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <SheetFooter className="flex-shrink-0 flex flex-col gap-2 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between text-lg font-bold text-white">
                <span>Total:</span>
                <span className="text-green-500">R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setStep("cart")} 
                  className="flex-1 whitespace-nowrap bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                >
                  Voltar
                </Button>
                <Button 
                  onClick={handleFinishOrder} 
                  className="flex-1 whitespace-nowrap bg-green-600 text-white hover:bg-green-700"
                >
                  Finalizar no WhatsApp
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <>
      <ToastNotification />
      <ClosedAlert />
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent 
          className="w-full sm:max-w-lg overflow-y-auto bg-gray-900 text-white flex flex-col h-full"
          style={{ maxHeight: '100dvh' }}
        >
          <SheetHeader className="flex-shrink-0">
            <SheetTitle className="flex items-center gap-2 text-white">
              <ShoppingCart className="h-5 w-5" />
              <span className="truncate">Carrinho ({items.reduce((sum, item) => sum + item.quantity, 0)} itens)</span>
            </SheetTitle>
            <SheetDescription className="text-gray-400">
              Revise seu pedido antes de finalizar
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 py-6 flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Seu carrinho está vazio</p>
                <p className="text-sm">Adicione itens do cardápio</p>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div key={`${item.id}-${item.size || 'unit'}`} className="p-4 rounded-lg border border-gray-700 bg-gray-800 hover:border-gray-600 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate text-white">{item.name}</h4>
                        {item.size && (
                          <Badge variant="outline" className="mt-1 whitespace-nowrap text-white border-gray-600">
                            {item.size.toUpperCase()}
                          </Badge>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="font-bold text-green-500">R$ {(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                          onClick={() => removeItem(item.id, item.size)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between text-lg font-bold text-white">
                  <span>Total:</span>
                  <span className="text-green-500">R$ {total.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>

          {items.length > 0 && (
            <SheetFooter className="flex-shrink-0 flex flex-col gap-2 pt-4 border-t border-gray-700">
              <Button 
                variant="outline" 
                onClick={clearCart} 
                className="w-full bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar Carrinho
              </Button>
              <Button 
                onClick={handleContinueToCheckout} 
                className="w-full bg-green-600 text-white hover:bg-green-700"
              >
                Continuar Pedido
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}