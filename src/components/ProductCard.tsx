import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Plus, Settings } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onCustomize?: (product: Product) => void;
}

const ProductCard = ({ product, onCustomize }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (product.isCustomizable && onCustomize) {
      onCustomize(product);
      return;
    }

    setIsAdding(true);
    
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addToCart(product, 1);
    
    toast({
      title: "✅ Produto adicionado ao carrinho!",
      description: `${product.name} foi adicionado com sucesso.`,
    });
    
    setIsAdding(false);
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  return (
    <Card className="product-card overflow-hidden h-full">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Indisponível</Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="text-xl font-bold text-primary">
            {product.isCustomizable ? `A partir de ${formatPrice(product.price)}` : formatPrice(product.price)}
          </div>
          
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            disabled={!product.isAvailable || isAdding}
            className="bg-primary hover:bg-primary/90"
          >
            {product.isCustomizable ? (
              <>
                <Settings className="w-4 h-4 mr-1" />
                Personalizar
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1" />
                {isAdding ? 'Adicionando...' : 'Adicionar'}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;