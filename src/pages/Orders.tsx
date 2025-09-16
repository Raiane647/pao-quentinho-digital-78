import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrdersContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getUserOrders } = useOrders();

  const orders = user ? getUserOrders(user.id) : [];

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Recebido':
        return <Package className="w-4 h-4" />;
      case 'Em Preparo':
        return <Clock className="w-4 h-4" />;
      case 'Pronto para Retirada':
        return <CheckCircle className="w-4 h-4" />;
      case 'Concluído':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recebido':
        return 'default';
      case 'Em Preparo':
        return 'secondary';
      case 'Pronto para Retirada':
        return 'destructive';
      case 'Concluído':
        return 'outline';
      default:
        return 'default';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground">Faça login para ver seus pedidos.</p>
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
          
          <h1 className="text-3xl font-bold text-center mb-8">Meus Pedidos</h1>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                Nenhum pedido encontrado
              </h3>
              <p className="text-muted-foreground">
                Quando você fizer pedidos, eles aparecerão aqui.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          Pedido #{order.id}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {format(order.createdAt, 'dd/MM/yyyy - HH:mm', { locale: ptBR })}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(order.status) as any} className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{item.quantity}x {item.product.name}</span>
                          <span>{formatPrice(item.totalPrice)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total:</span>
                        <span className="text-primary">{formatPrice(order.totalPrice)}</span>
                      </div>
                      
                      <div className="mt-2 text-sm text-muted-foreground">
                        Pagamento: {order.paymentMethod === 'balcao' ? 'No balcão' : 
                                   order.paymentMethod === 'cartao' ? 'Cartão' : 'Pix'}
                      </div>
                      
                      {order.pickupTime && (
                        <div className="mt-1 text-sm text-muted-foreground">
                          Retirada agendada: {format(order.pickupTime, 'dd/MM/yyyy - HH:mm', { locale: ptBR })}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;