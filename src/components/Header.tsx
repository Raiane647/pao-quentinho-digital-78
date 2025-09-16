import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import CartSidebar from "./CartSidebar";
import LoginModal from "./LoginModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (user) {
      navigate('/perfil');
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl">🥖</div>
              <div>
                <h1 className="text-xl font-bold text-primary">Padaria Pão Quentinho</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Sabor artesanal em cada mordida</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium">Início</Link>
              <Link to="/cardapio" className="text-foreground hover:text-primary transition-colors font-medium">Cardápio</Link>
              <Link to="/personalizar-bolo" className="text-foreground hover:text-primary transition-colors font-medium">Personalizar Bolo</Link>
              {user && (
                <>
                  <Link to="/pedidos" className="text-foreground hover:text-primary transition-colors font-medium">Meus Pedidos</Link>
                  <Link to="/perfil" className="text-foreground hover:text-primary transition-colors font-medium">Perfil</Link>
                </>
              )}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <CartSidebar />
              
              <Button variant="ghost" size="icon" onClick={handleUserClick}>
                <User className="w-5 h-5" />
                <span className="sr-only">{user ? 'Perfil' : 'Login'}</span>
              </Button>
              
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </Link>
                <Link 
                  to="/cardapio" 
                  className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cardápio
                </Link>
                <Link 
                  to="/personalizar-bolo" 
                  className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Personalizar Bolo
                </Link>
                {user && (
                  <>
                    <Link 
                      to="/pedidos" 
                      className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Meus Pedidos
                    </Link>
                    <Link 
                      to="/perfil" 
                      className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Perfil
                    </Link>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
};

export default Header;