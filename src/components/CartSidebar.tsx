import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import LoginModal from './LoginModal';

const CartSidebar = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    // Navigate to checkout
    window.location.href = '/checkout';
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const formatCustomOptions = (customOptions: any) => {
    if (!customOptions) return '';
    
    const options = [];
    if (customOptions.massa) options.push(`Massa: ${customOptions.massa}`);
    if (customOptions.recheio) options.push(`Recheio: ${customOptions.recheio}`);
    if (customOptions.cobertura) options.push(`Cobertura: ${customOptions.cobertura}`);
    
    return options.join(', ');
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {totalItems}
              </Badge>
            )}
            <span className="sr-only">Carrinho</span>
          </Button>
        </SheetTrigger>
        
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Seu Carrinho ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
            </SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-muted-foreground mb-6">
                Adicione alguns produtos deliciosos para começar!
              </p>
              <Button onClick={() => setIsOpen(false)}>
                Ver Cardápio
              </Button>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="flex gap-4 p-4 border rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm line-clamp-1 flex items-center gap-2">
                        {item.product.name}
                        {item.product.isReadyToTake && !item.customOptions && (
                          <Badge variant="secondary" className="text-xs px-1 py-0">Pronta</Badge>
                        )}
                        {(!item.product.isReadyToTake || item.customOptions) && (
                          <Badge variant="outline" className="text-xs px-1 py-0">Agendado</Badge>
                        )}
                      </h4>
                      
                      {item.customOptions && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatCustomOptions(item.customOptions)}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="text-sm font-semibold text-primary mt-1">
                        {formatPrice(item.totalPrice)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={clearCart} className="flex-1">
                    Limpar
                  </Button>
                  <Button onClick={handleCheckout} className="flex-1">
                    Finalizar Pedido
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default CartSidebar;