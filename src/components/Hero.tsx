import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import bakeryHero from "@/assets/bakery-hero.jpg";

const Hero = () => {
  return (
    <section 
      className="min-h-[70vh] flex items-center justify-center text-center relative overflow-hidden"
      id="inicio"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(var(--warm-brown) / 0.8), hsl(var(--bread-crust) / 0.6)), url(${bakeryHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Bem-vindos à Padaria
            <br />
            <span className="text-accent-foreground">Pão Quentinho</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Produtos frescos e artesanais feitos com amor todos os dias. 
            Desde pães quentinhos até bolos personalizados dos seus sonhos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/cardapio">
              <button className="btn-hero">
                Ver Cardápio
              </button>
            </Link>
            <Link to="/personalizar-bolo">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                Bolos Personalizados
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative bread icons */}
      <div className="absolute top-10 left-10 text-6xl opacity-30 text-white drop-shadow-lg">🥖</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-30 text-white drop-shadow-lg">🍰</div>
      <div className="absolute top-1/2 left-20 text-4xl opacity-20 text-white drop-shadow-lg">🥐</div>
      <div className="absolute top-20 right-20 text-4xl opacity-20 text-white drop-shadow-lg">🧁</div>
    </section>
  );
};

export default Hero;