import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "paes",
    name: "Pães",
    icon: "🥖",
    description: "Pães frescos e quentinhos",
    itemCount: 8
  },
  {
    id: "lanches",
    name: "Lanches",
    icon: "🥪",
    description: "Sanduíches e lanches gostosos",
    itemCount: 12
  },
  {
    id: "bolos",
    name: "Bolos",
    icon: "🍰",
    description: "Bolos prontos e personalizados",
    itemCount: 6
  },
  {
    id: "salgados",
    name: "Salgados",
    icon: "🥟",
    description: "Salgados assados e fritos",
    itemCount: 10
  },
  {
    id: "bebidas",
    name: "Bebidas",
    icon: "☕",
    description: "Cafés, sucos e refrigerantes",
    itemCount: 15
  }
];

const MenuCategories = () => {
  return (
    <section className="py-16 bg-secondary/30" id="cardapio">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nosso Cardápio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra nossa variedade de produtos frescos e artesanais, 
            preparados com ingredientes selecionados e muito carinho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/cardapio#${category.id}`}>
              <Card className="product-card cursor-pointer group h-full">
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="text-primary font-medium text-sm">
                    {category.itemCount} itens disponíveis
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/cardapio">
            <button className="btn-hero">
              Ver Todos os Produtos
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MenuCategories;