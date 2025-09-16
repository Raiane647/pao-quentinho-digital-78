import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrdersContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import LoginModal from '@/components/LoginModal';
import { MapPin, Clock, CreditCard, DollarSign, ArrowLeft, ShoppingBag } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState<'balcao' | 'cartao' | 'pix'>('balcao');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
  
  const hasCustomCake = items.some(item => item.customOptions || !item.product.isReadyToTake);
  const hasReadyItems = items.some(item => item.product.isReadyToTake && !item.customOptions);

  const handleConfirmOrder = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order
      const order = createOrder(items, paymentMethod, user.id);
      
      // Clear cart
      clearCart();

      toast({
        title: "✅ Pedido confirmado!",
        description: hasCustomCake 
          ? "Seu bolo personalizado será preparado conforme agendado."
          : "Seus produtos de pronta entrega estarão prontos em 5 minutos.",
      });

      // Navigate to order confirmation
      navigate(`/pedido-confirmado/${order.id}`);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no pagamento",
        description: "Não foi possível processar seu pedido. Tente novamente.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-2xl font-bold mb-4">Carrinho Vazio</h1>
            <p className="text-muted-foreground mb-6">
              Adicione alguns produtos ao seu carrinho para continuar.
            </p>
            <Button onClick={() => navigate('/cardapio')}>
              Ver Cardápio
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-8">Finalizar Pedido</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📋 Resumo do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item, index) => (
                    <div key={`${item.product.id}-${index}`} className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{item.product.name}</h4>
                          {item.product.isReadyToTake && !item.customOptions && (
                            <Badge variant="secondary" className="text-xs">Pronta Entrega</Badge>
                          )}
                          {(!item.product.isReadyToTake || item.customOptions) && (
                            <Badge variant="outline" className="text-xs">Agendado</Badge>
                          )}
                        </div>
                        {item.customOptions && (
                          <p className="text-sm text-muted-foreground">
                            {formatCustomOptions(item.customOptions)}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Quantidade: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(item.totalPrice)}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Pickup Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Informações de Retirada
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Endereço da Padaria:</h4>
                    <p className="text-muted-foreground">
                      Padaria Pão Quentinho<br />
                      Rua Exemplo, 123 - Centro<br />
                      São Paulo, SP
                    </p>
                  </div>

                  {/* Ready Items Section */}
                  {hasReadyItems && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-800">
                        <Clock className="w-4 h-4" />
                        ⚡ Itens de Pronta Entrega
                      </h4>
                      <p className="text-green-700 text-sm">
                        Seus produtos de pronta entrega estarão prontos em aproximadamente <strong>5 minutos</strong> após a confirmação do pedido.
                      </p>
                      <div className="mt-2 text-xs text-green-600">
                        {items
                          .filter(item => item.product.isReadyToTake && !item.customOptions)
                          .map(item => `${item.quantity}x ${item.product.name}`)
                          .join(', ')}
                      </div>
                    </div>
                  )}

                  {/* Custom Cake Section */}
                  {hasCustomCake && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-amber-800">
                        <Clock className="w-4 h-4" />
                        🍰 Bolos Personalizados - Entrega Agendada
                      </h4>
                      <p className="text-amber-700 text-sm mb-2">
                        Bolos personalizados serão preparados com carinho especial e entregues conforme agendado.
                      </p>
                      {items.filter(item => item.customOptions || !item.product.isReadyToTake).map((item, index) => (
                        <div key={index} className="text-xs text-amber-600 mt-1">
                          🍰 {item.product.name}: {' '}
                          {item.customOptions?.pickupDate && 
                            format(item.customOptions.pickupDate, 'dd/MM/yyyy', { locale: ptBR })
                          } às {item.customOptions?.pickupTime || 'A definir'}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
                <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    💳 Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="balcao" id="balcao" />
                      <Label htmlFor="balcao" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold">Pagamento no Balcão</p>
                            <p className="text-sm text-muted-foreground">
                              Pague na retirada (dinheiro, cartão ou Pix)
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cartao" id="cartao" />
                      <Label htmlFor="cartao" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold">Cartão de Crédito/Débito</p>
                            <p className="text-sm text-muted-foreground">
                              Pagamento online seguro (simulado)
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-primary rounded text-primary-foreground flex items-center justify-center text-xs font-bold">
                            P
                          </div>
                          <div>
                            <p className="font-semibold">Pix</p>
                            <p className="text-sm text-muted-foreground">
                              Pagamento instantâneo via Pix
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button 
                  className="w-full h-12 text-lg btn-hero" 
                  onClick={handleConfirmOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processando...' : `Confirmar Pedido - ${formatPrice(totalPrice)}`}
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/cardapio')}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continuar Comprando
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Ao confirmar o pedido, você concorda com nossos termos de serviço.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default Checkout;