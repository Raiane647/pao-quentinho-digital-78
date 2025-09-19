import { MapPin, Phone, Clock, Mail } from "lucide-react";
import trilhaTechLogo from "@/assets/trilha-tech-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🥖</div>
              <div>
                <h3 className="text-xl font-bold">Padaria Pão Quentinho</h3>
                <p className="text-sm opacity-90">Sabor artesanal em cada mordida</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Há mais de 20 anos oferecendo produtos frescos e artesanais para nossa comunidade. 
              Venha sentir o aroma do pão quentinho saindo do forno!
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Rua Exemplo, 123 - Centro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contato@paoquentinho.com.br</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horário de Funcionamento</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Segunda a Sexta: 6h às 20h</span>
              </div>
              <div className="flex items-center space-x-2 ml-6">
                <span>Sábado: 6h às 18h</span>
              </div>
              <div className="flex items-center space-x-2 ml-6">
                <span>Domingo: 7h às 15h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center relative">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Padaria Pão Quentinho. Todos os direitos reservados.
          </p>
          <img 
            src={trilhaTechLogo} 
            alt="Trilha Tech" 
            className="absolute bottom-8 right-0 w-[88px] h-[68px]"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;