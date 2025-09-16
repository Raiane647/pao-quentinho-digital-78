import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import CustomCakeModal from '@/components/CustomCakeModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { products, categoryNames, categoryIcons } from '@/data/products';
import { Product } from '@/contexts/CartContext';
import { Search, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [customCakeProduct, setCustomCakeProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  const categories = ['all', 'paes', 'lanches', 'bolos', 'salgados', 'bebidas'] as const;

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group products by category for display
  const productsByCategory = categories.slice(1).reduce((acc, category) => {
    acc[category] = products.filter(product => product.category === category);
    return acc;
  }, {} as Record<string, Product[]>);

  const handleCustomizeProduct = (product: Product) => {
    setCustomCakeProduct(product);
  };

  const renderProductsGrid = (products: Product[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onCustomize={handleCustomizeProduct}
        />
      ))}
    </div>
  );

  const renderCategoryView = () => {
    if (selectedCategory !== 'all') {
      const categoryProducts = filteredProducts;
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-4xl">{categoryIcons[selectedCategory as keyof typeof categoryIcons]}</span>
            <h2 className="text-2xl font-bold text-foreground">
              {categoryNames[selectedCategory as keyof typeof categoryNames]}
            </h2>
          </div>
          
          {categoryProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-muted-foreground">
                Tente ajustar sua busca para encontrar o que procura.
              </p>
            </div>
          ) : (
            renderProductsGrid(categoryProducts)
          )}
        </div>
      );
    }

    // Show all categories
    return (
      <div className="space-y-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar sua busca para encontrar o que procura.
            </p>
          </div>
        ) : (
          categories.slice(1).map((category) => {
            const categoryProducts = productsByCategory[category].filter(product => {
              const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                   product.description.toLowerCase().includes(searchTerm.toLowerCase());
              return matchesSearch;
            });

            if (categoryProducts.length === 0) return null;

            return (
              <section key={category} id={category} className="scroll-mt-24">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                    <h2 className="text-2xl font-bold text-foreground">
                      {categoryNames[category as keyof typeof categoryNames]}
                    </h2>
                    <Badge variant="secondary" className="ml-2">
                      {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'itens'}
                    </Badge>
                  </div>
                  
                  {category === 'bolos' && (
                    <Link to="/personalizar-bolo">
                      <Button variant="outline" size="sm">
                        🍰 Personalizar Bolo
                      </Button>
                    </Link>
                  )}
                </div>
                
                {renderProductsGrid(categoryProducts)}
              </section>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nosso Cardápio Completo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore nossa variedade de produtos frescos e artesanais. 
            Encontre seus favoritos ou descubra novos sabores!
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-2"
            >
              {category !== 'all' && (
                <span>{categoryIcons[category as keyof typeof categoryIcons]}</span>
              )}
              {category === 'all' ? 'Todos' : categoryNames[category as keyof typeof categoryNames]}
            </Button>
          ))}
        </div>

        {/* Products Count */}
        <div className="text-center mb-6">
          <Badge variant="secondary" className="text-sm">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </Badge>
        </div>

        {/* Products Display */}
        {renderCategoryView()}

        {/* Custom Cake CTA */}
        <div className="mt-12 text-center">
          <div className="bg-secondary/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              🍰 Quer um Bolo Personalizado?
            </h3>
            <p className="text-muted-foreground mb-6">
              Crie o bolo dos seus sonhos com nosso sistema de personalização!
            </p>
            <Link to="/personalizar-bolo">
              <Button className="btn-hero">
                Personalizar Meu Bolo
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Custom Cake Modal */}
      {customCakeProduct && (
        <CustomCakeModal
          product={customCakeProduct}
          isOpen={!!customCakeProduct}
          onClose={() => setCustomCakeProduct(null)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Menu;