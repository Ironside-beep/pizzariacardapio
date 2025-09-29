import { useState, useEffect } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Clock, Truck } from "lucide-react";

export function DeliveryAlert() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show alert on first visit
    const hasSeenAlert = localStorage.getItem("pizzaria-delivery-alert");
    if (!hasSeenAlert) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("pizzaria-delivery-alert", "true");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-md border-2 border-primary/20 bg-gradient-card">
        <AlertDialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-pizza">
            <Truck className="h-8 w-8 text-white" />
          </div>
          <AlertDialogTitle className="text-2xl font-bold bg-gradient-pizza bg-clip-text text-transparent">
            PIZZARIA ALCAPONE
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base space-y-3">
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <Clock className="h-5 w-5" />
              <span>Tempo de Entrega</span>
            </div>
            <p className="text-foreground font-medium">
              Nossos pedidos para entrega levam entre <strong className="text-primary">50 a 60 minutos</strong> para chegar até você.
            </p>
            <p className="text-sm text-muted-foreground">
              Obrigado pela preferência! 🍕
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={handleClose}
            className="w-full bg-gradient-pizza text-white hover:shadow-glow font-semibold"
          >
            Entendi!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}