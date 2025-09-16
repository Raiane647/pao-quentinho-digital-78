import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useCart, Product } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import frenchBread from "@/assets/french-bread.jpg";
import chocolateCake from "@/assets/chocolate-cake.jpg";
import coxinha from "@/assets/coxinha.jpg";
import paoDeQueijo from "@/assets/pao-de-queijo.jpg";

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Pão Francês",
    description: "Nosso clássico pão francês, crocante por fora e macio por dentro",
    price: 0.75,
    image: frenchBread,
    category: "paes",
    isAvailable: true,
    isCustomizable: false
  },
  {
    id: "2",
    name: "Bolo de Chocolate",
    description: "Bolo de chocolate com cobertura cremosa, uma delícia irresistível",
    price: 35.90,
    image: chocolateCake,
    category: "bolos",
    isAvailable: true,
    isCustomizable: false
  },
  {
    id: "3",
    name: "Coxinha de Frango",
    description: "Coxinha tradicional com recheio generoso de frango desfiado",
    price: 4.50,
    image: coxinha,
    category: "salgados",
    isAvailable: true,
    isCustomizable: false
  },
  {
    id: "4",
    name: "Pão de Queijo",
    description: "Pão de queijo mineiro autêntico, quentinho e sequinho",
    price: 2.50,
    image: paoDeQueijo,
    category: "paes",
    isAvailable: true,
    isCustomizable: false
  }
];

const featuredProductsDisplay = [
  { ...featuredProducts[0], isNew: false, isPromo: true, displayCategory: "Pães" },
  { ...featuredProducts[1], isNew: true, isPromo: false, displayCategory: "Bolos" },
  { ...featuredProducts[2], isNew: false, isPromo: false, displayCategory: "Salgados" },
  { ...featuredProducts[3], isNew: false, isPromo: true, displayCategory: "Pães" }
];

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toast({
      title: "✅ Produto adicionado ao carrinho!",
      description: `${product.name} foi adicionado com sucesso.`,
    });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Produtos em Destaque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experimente nossos produtos mais populares, feitos frescos todos os dias
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProductsDisplay.map((item, index) => (
            <Card key={featuredProducts[index].id} className="product-card overflow-hidden">
              <div className="relative">
                <img
                  src={featuredProducts[index].image}
                  alt={featuredProducts[index].name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {item.isNew && (
                    <Badge className="bg-accent text-accent-foreground">Novo</Badge>
                  )}
                  {item.isPromo && (
                    <Badge className="bg-destructive text-destructive-foreground">Promoção</Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.displayCategory}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {featuredProducts[index].name}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {featuredProducts[index].description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    R$ {featuredProducts[index].price.toFixed(2).replace('.', ',')}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => handleAddToCart(featuredProducts[index])}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver Todos os Produtos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;