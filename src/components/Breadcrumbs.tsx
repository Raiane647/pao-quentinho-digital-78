import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ label: "Início", href: "/" }];

    pathnames.forEach((pathname, index) => {
      const href = `/${pathnames.slice(0, index + 1).join('/')}`;
      
      switch (pathname) {
        case 'cardapio':
          items.push({ label: "Cardápio", href });
          break;
        case 'personalizar-bolo':
          items.push({ label: "Personalizar Bolo", href });
          break;
        case 'pedidos':
          items.push({ label: "Meus Pedidos", href });
          break;
        case 'perfil':
          items.push({ label: "Perfil", href });
          break;
        case 'checkout':
          items.push({ label: "Finalizar Pedido", href });
          break;
        default:
          items.push({ label: pathname, href });
      }
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className="bg-secondary/30 py-3 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground font-medium">Você está em:</span>
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />
              )}
              {index === 0 && (
                <Home className="w-4 h-4 text-muted-foreground mr-2" />
              )}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-primary font-medium">{item.label}</span>
              ) : (
                <Link
                  to={item.href!}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;