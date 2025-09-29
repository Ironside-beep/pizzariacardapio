import { useState, useCallback } from "react";

export interface CartItem {
  id: string;
  category: "pizza-salgada" | "pizza-doce" | "esfiha-salgada" | "esfiha-doce" | "bebida";
  name: string;
  price: number;
  size?: "broto" | "grande";
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  neighborhood: string;
  number: string;
  observations?: string;
  paymentMethod: "dinheiro" | "debito" | "credito" | "pix";
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    address: "",
    neighborhood: "",
    number: "",
    observations: "",
    paymentMethod: "dinheiro",
  });

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems(prev => {
      const existingItem = prev.find(
        i => i.id === item.id && i.size === item.size
      );
      
      if (existingItem) {
        return prev.map(i =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string, size?: string) => {
    setItems(prev => prev.filter(item => 
      !(item.id === id && item.size === size)
    ));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeItem(id, size);
      return;
    }
    
    setItems(prev =>
      prev.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const generateWhatsAppMessage = useCallback(() => {
    if (items.length === 0) return "";

    let message = "🍕 *PEDIDO PIZZARIA ALCAPONE* 🍕\n\n";
    
    // Customer info
    message += "👤 *OLA GOSTARIA DE FAZER O SEGUINTE PEDIDO:*\n";
    message += `Nome: ${customerInfo.name}\n`;
    message += `Telefone: ${customerInfo.phone}\n`;
    message += `Endereço: ${customerInfo.address}, ${customerInfo.number}\n`;
    message += `Bairro: ${customerInfo.neighborhood}\n`;
    if (customerInfo.observations) {
      message += `Observações: ${customerInfo.observations}\n`;
    }
    message += `Forma de Pagamento: ${customerInfo.paymentMethod.toUpperCase()}\n\n`;

    // Order items
    message += "🛒 *ITENS DO PEDIDO:*\n";
    items.forEach(item => {
      message += `• ${item.quantity}x ${item.name}`;
      if (item.size) {
        message += ` (${item.size.toUpperCase()})`;
      }
      message += ` - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n💰 *TOTAL: R$ ${total.toFixed(2)}*\n\n`;
    message += "Muito Obrigado! 🙏";

    return encodeURIComponent(message);
  }, [items, customerInfo, total]);

  return {
    items,
    customerInfo,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setCustomerInfo,
    generateWhatsAppMessage,
  };
}