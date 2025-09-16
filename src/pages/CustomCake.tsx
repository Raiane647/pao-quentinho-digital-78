import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

interface CakeConfig {
  massa: string;
  recheio: string;
  cobertura: string;
  tamanho: string;
  observacoes: string;
  dataEntrega: string;
  horaEntrega: string;
}

const masses = [
  { id: "chocolate", name: "Chocolate", price: 0 },
  { id: "baunilha", name: "Baunilha", price: 0 },
  { id: "cenoura", name: "Cenoura", price: 5 },
  { id: "coco", name: "Coco", price: 5 },
  { id: "limao", name: "Limão", price: 5 },
  { id: "red-velvet", name: "Red Velvet", price: 10 }
];

const recheios = [
  { id: "brigadeiro", name: "Brigadeiro", price: 0 },
  { id: "doce-leite", name: "Doce de Leite", price: 5 },
  { id: "nutella", name: "Nutella", price: 10 },
  { id: "frutas-vermelhas", name: "Frutas Vermelhas", price: 8 },
  { id: "beijinho", name: "Beijinho", price: 5 },
  { id: "morango", name: "Morango", price: 8 }
];

const coberturas = [
  { id: "chantilly", name: "Chantilly", price: 0 },
  { id: "ganache", name: "Ganache de Chocolate", price: 8 },
  { id: "fondant", name: "Pasta Americana", price: 15 },
  { id: "buttercream", name: "Buttercream", price: 10 },
  { id: "glacê", name: "Glacê Real", price: 12 }
];

const tamanhos = [
  { id: "pequeno", name: "Pequeno (15cm) - 8 fatias", basePrice: 35 },
  { id: "medio", name: "Médio (20cm) - 12 fatias", basePrice: 55 },
  { id: "grande", name: "Grande (25cm) - 16 fatias", basePrice: 80 },
  { id: "extra-grande", name: "Extra Grande (30cm) - 20 fatias", basePrice: 120 }
];

const CustomCake = () => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<CakeConfig>({
    massa: "",
    recheio: "",
    cobertura: "",
    tamanho: "",
    observacoes: "",
    dataEntrega: "",
    horaEntrega: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const calculatePrice = () => {
    const tamanho = tamanhos.find(t => t.id === config.tamanho);
    const massa = masses.find(m => m.id === config.massa);
    const recheio = recheios.find(r => r.id === config.recheio);
    const cobertura = coberturas.find(c => c.id === config.cobertura);

    if (!tamanho) return 0;

    return tamanho.basePrice + 
           (massa?.price || 0) + 
           (recheio?.price || 0) + 
           (cobertura?.price || 0);
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    if (!config.dataEntrega || !config.horaEntrega) {
      toast({
        title: "Erro",
        description: "Por favor, selecione a data e horário de entrega.",
        variant: "destructive"
      });
      return;
    }

    const price = calculatePrice();
    const customCake = {
      id: Date.now().toString(),
      name: `Bolo Personalizado - ${tamanhos.find(t => t.id === config.tamanho)?.name}`,
      price,
      image: "/placeholder.svg",
      category: "bolos",
      isCustom: true,
      config,
      quantity: 1
    };

    // Add to cart logic here
    toast({
      title: "✅ Bolo adicionado ao carrinho!",
      description: `Seu bolo personalizado foi adicionado. Entrega agendada para ${config.dataEntrega} às ${config.horaEntrega}.`
    });

    navigate("/checkout");
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return config.massa && config.tamanho;
      case 2: return config.recheio;
      case 3: return config.cobertura;
      case 4: return config.dataEntrega && config.horaEntrega;
      default: return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Escolha o Tamanho</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tamanhos.map((tamanho) => (
                  <Card 
                    key={tamanho.id}
                    className={`cursor-pointer transition-all ${
                      config.tamanho === tamanho.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setConfig({...config, tamanho: tamanho.id})}
                  >
                    <CardContent className="p-4">
                      <div className="font-medium">{tamanho.name}</div>
                      <div className="text-primary font-semibold">R$ {tamanho.basePrice.toFixed(2)}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Escolha a Massa</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {masses.map((massa) => (
                  <Card 
                    key={massa.id}
                    className={`cursor-pointer transition-all ${
                      config.massa === massa.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setConfig({...config, massa: massa.id})}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="font-medium">{massa.name}</div>
                      {massa.price > 0 && (
                        <div className="text-primary text-sm">+R$ {massa.price.toFixed(2)}</div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">Escolha o Recheio</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recheios.map((recheio) => (
                <Card 
                  key={recheio.id}
                  className={`cursor-pointer transition-all ${
                    config.recheio === recheio.id 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setConfig({...config, recheio: recheio.id})}
                >
                  <CardContent className="p-4 text-center">
                    <div className="font-medium">{recheio.name}</div>
                    {recheio.price > 0 && (
                      <div className="text-primary text-sm">+R$ {recheio.price.toFixed(2)}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Escolha a Cobertura</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {coberturas.map((cobertura) => (
                  <Card 
                    key={cobertura.id}
                    className={`cursor-pointer transition-all ${
                      config.cobertura === cobertura.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setConfig({...config, cobertura: cobertura.id})}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="font-medium">{cobertura.name}</div>
                      {cobertura.price > 0 && (
                        <div className="text-primary text-sm">+R$ {cobertura.price.toFixed(2)}</div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="observacoes">Observações Especiais (opcional)</Label>
              <Textarea
                id="observacoes"
                placeholder="Deseja alguma decoração especial, cor específica ou mensagem no bolo?"
                value={config.observacoes}
                onChange={(e) => setConfig({...config, observacoes: e.target.value})}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">
              <Calendar className="inline w-5 h-5 mr-2" />
              Agendamento de Entrega
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="dataEntrega">Data de Entrega</Label>
                <Input
                  id="dataEntrega"
                  type="date"
                  value={config.dataEntrega}
                  min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  onChange={(e) => setConfig({...config, dataEntrega: e.target.value})}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Prazo mínimo: 2 dias úteis
                </p>
              </div>

              <div>
                <Label htmlFor="horaEntrega">Horário de Entrega</Label>
                <Input
                  id="horaEntrega"
                  type="time"
                  value={config.horaEntrega}
                  min="08:00"
                  max="18:00"
                  onChange={(e) => setConfig({...config, horaEntrega: e.target.value})}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Horário de funcionamento: 8h às 18h
                </p>
              </div>
            </div>

            <Card className="bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Tamanho:</strong> {tamanhos.find(t => t.id === config.tamanho)?.name}</div>
                  <div><strong>Massa:</strong> {masses.find(m => m.id === config.massa)?.name}</div>
                  <div><strong>Recheio:</strong> {recheios.find(r => r.id === config.recheio)?.name}</div>
                  <div><strong>Cobertura:</strong> {coberturas.find(c => c.id === config.cobertura)?.name}</div>
                  {config.observacoes && (
                    <div><strong>Observações:</strong> {config.observacoes}</div>
                  )}
                  <div><strong>Entrega:</strong> {config.dataEntrega} às {config.horaEntrega}</div>
                  <div className="text-lg font-semibold text-primary pt-2 border-t">
                    <strong>Total: R$ {calculatePrice().toFixed(2)}</strong>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Personalizar Bolo</h1>
              <p className="text-muted-foreground">Crie o bolo dos seus sonhos!</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    i <= step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i}
                </div>
                {i < 4 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      i < step ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-4">
            <div className="text-sm text-muted-foreground">
              {step === 1 && "Massa e Tamanho"}
              {step === 2 && "Recheio"}
              {step === 3 && "Cobertura e Detalhes"}
              {step === 4 && "Agendamento"}
            </div>
          </div>

          <Card>
            <CardContent className="p-8">
              {renderStep()}
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            {step < 4 ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="btn-hero"
              >
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                disabled={!isStepValid()}
                className="btn-hero"
              >
                Adicionar ao Carrinho
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomCake;