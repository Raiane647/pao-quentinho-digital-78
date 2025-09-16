import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrders } from '@/contexts/OrdersContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrders();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      const foundOrder = orders.find(o => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        // If order not found, redirect to orders page
        navigate('/pedidos');
      }
    }
  }, [orderId, orders, navigate]);

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const hasCustomCake = order?.items?.some((item: any) => item.customOptions || !item.product.isReadyToTake);
  const hasReadyItems = order?.items?.some((item: any) => item.product.isReadyToTake && !item.customOptions);

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Pedido não encontrado</h1>
            <Button onClick={() => navigate('/pedidos')}>
              Ver Meus Pedidos
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
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              🎉 Pedido Confirmado!
            </h1>
            <p className="text-lg text-muted-foreground">
              Obrigado! Seu pedido foi recebido com sucesso.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8 text-left">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📋 Detalhes do Pedido #{order.id.slice(-6)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Itens do Pedido:</h4>
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between py-2 border-b last:border-b-0">
                    <div>
                      <span className="font-medium">{item.product.name}</span>
                      <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                      {item.customOptions && (
                        <div className="text-sm text-muted-foreground">
                          Personalizado
                        </div>
                      )}
                    </div>
                    <span className="font-semibold">{formatPrice(item.totalPrice)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
                <span>Total:</span>
                <span className="text-primary">{formatPrice(order.total)}</span>
              </div>

              <div className="bg-secondary/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Informações de Retirada
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Padaria Pão Quentinho<br />
                  Rua Exemplo, 123 - Centro<br />
                  São Paulo, SP
                </p>

                {/* Ready Items */}
                {hasReadyItems && (
                  <div className="bg-green-50 border border-green-200 p-3 rounded mb-3">
                    <h5 className="font-semibold text-green-800 mb-1 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      ⚡ Pronta Entrega - Pronto em 5 minutos!
                    </h5>
                    <p className="text-green-700 text-sm">
                      Seus produtos de pronta entrega estão sendo preparados e estarão prontos para retirada em aproximadamente 5 minutos.
                    </p>
                  </div>
                )}

                {/* Custom Cake */}
                {hasCustomCake && (
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded">
                    <h5 className="font-semibold text-amber-800 mb-1 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      🍰 Bolo Personalizado - Entrega Agendada
                    </h5>
                    <p className="text-amber-700 text-sm">
                      Seu bolo personalizado estará pronto conforme agendado.
                      Entregamos no endereço informado no dia e horário combinados.
                    </p>
                  </div>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                <strong>Data do Pedido:</strong> {formatDate(order.createdAt)}
                <br />
                <strong>Forma de Pagamento:</strong> {
                  order.paymentMethod === 'balcao' ? 'Pagamento no Balcão' :
                  order.paymentMethod === 'cartao' ? 'Cartão de Crédito/Débito' :
                  'Pix'
                }
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Voltar ao Início
                </Button>
              </Link>
              
              <Link to="/cardapio">
                <Button className="w-full btn-hero">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Fazer Novo Pedido
                </Button>
              </Link>
            </div>

            <Link to="/pedidos">
              <Button variant="ghost" className="w-full">
                Ver Todos os Meus Pedidos
              </Button>
            </Link>
          </div>

          {/* Thank You Message */}
          <div className="mt-8 p-6 bg-secondary/30 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Obrigado pela preferência! 🙏</h3>
            <p className="text-muted-foreground">
              Continuamos trabalhando com amor para oferecer os melhores produtos artesanais. 
              Sua satisfação é nossa maior recompensa!
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;