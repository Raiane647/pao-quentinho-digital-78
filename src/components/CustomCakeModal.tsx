import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product, CustomCakeOptions } from '@/contexts/CartContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { customCakeOptions } from '@/data/products';

interface CustomCakeModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const CustomCakeModal = ({ product, isOpen, onClose }: CustomCakeModalProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [options, setOptions] = useState<CustomCakeOptions>({
    massa: '',
    recheio: '',
    cobertura: '',
    pickupDate: undefined,
    pickupTime: ''
  });

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const calculateTotalPrice = () => {
    let total = product.price;
    
    const massaOption = customCakeOptions.massa.find(m => m.value === options.massa);
    const recheioOption = customCakeOptions.recheio.find(r => r.value === options.recheio);
    const coberturaOption = customCakeOptions.cobertura.find(c => c.value === options.cobertura);
    
    if (massaOption) total += massaOption.price;
    if (recheioOption) total += recheioOption.price;
    if (coberturaOption) total += coberturaOption.price;
    
    return total;
  };

  const isFormValid = () => {
    return options.massa && options.recheio && options.cobertura && 
           options.pickupDate && options.pickupTime;
  };

  const handleAddToCart = async () => {
    if (!isFormValid()) {
      toast({
        variant: "destructive",
        title: "Formulário incompleto",
        description: "Preencha todas as opções para personalizar seu bolo.",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addToCart(product, 1, options);
    
    toast({
      title: "Bolo personalizado adicionado!",
      description: `Seu bolo será preparado para retirada em ${format(options.pickupDate!, 'dd/MM/yyyy', { locale: ptBR })} às ${options.pickupTime}.`,
    });
    
    setIsLoading(false);
    onClose();
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  // Only allow dates from tomorrow onwards
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            🍰 Personalize seu Bolo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex gap-4 p-4 bg-secondary/50 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>
          </div>

          {/* Massa */}
          <div className="space-y-2">
            <Label>Escolha a Massa *</Label>
            <Select value={options.massa} onValueChange={(value) => setOptions(prev => ({ ...prev, massa: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a massa" />
              </SelectTrigger>
              <SelectContent>
                {customCakeOptions.massa.map((massa) => (
                  <SelectItem key={massa.value} value={massa.value}>
                    <div className="flex justify-between items-center w-full">
                      <span>{massa.label}</span>
                      {massa.price > 0 && (
                        <span className="text-sm text-muted-foreground ml-2">
                          +{formatPrice(massa.price)}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recheio */}
          <div className="space-y-2">
            <Label>Escolha o Recheio *</Label>
            <Select value={options.recheio} onValueChange={(value) => setOptions(prev => ({ ...prev, recheio: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o recheio" />
              </SelectTrigger>
              <SelectContent>
                {customCakeOptions.recheio.map((recheio) => (
                  <SelectItem key={recheio.value} value={recheio.value}>
                    <div className="flex justify-between items-center w-full">
                      <span>{recheio.label}</span>
                      {recheio.price > 0 && (
                        <span className="text-sm text-muted-foreground ml-2">
                          +{formatPrice(recheio.price)}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cobertura */}
          <div className="space-y-2">
            <Label>Escolha a Cobertura *</Label>
            <Select value={options.cobertura} onValueChange={(value) => setOptions(prev => ({ ...prev, cobertura: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a cobertura" />
              </SelectTrigger>
              <SelectContent>
                {customCakeOptions.cobertura.map((cobertura) => (
                  <SelectItem key={cobertura.value} value={cobertura.value}>
                    <div className="flex justify-between items-center w-full">
                      <span>{cobertura.label}</span>
                      {cobertura.price > 0 && (
                        <span className="text-sm text-muted-foreground ml-2">
                          +{formatPrice(cobertura.price)}
                        </span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pickup Date */}
          <div className="space-y-2">
            <Label>Data de Retirada *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !options.pickupDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {options.pickupDate ? format(options.pickupDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={options.pickupDate}
                  onSelect={(date) => setOptions(prev => ({ ...prev, pickupDate: date }))}
                  disabled={(date) => date < tomorrow}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              Mínimo de 24 horas de antecedência
            </p>
          </div>

          {/* Pickup Time */}
          <div className="space-y-2">
            <Label>Horário de Retirada *</Label>
            <Select value={options.pickupTime} onValueChange={(value) => setOptions(prev => ({ ...prev, pickupTime: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o horário" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Summary */}
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">{formatPrice(calculateTotalPrice())}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handleAddToCart} 
              disabled={!isFormValid() || isLoading}
              className="flex-1"
            >
              {isLoading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomCakeModal;