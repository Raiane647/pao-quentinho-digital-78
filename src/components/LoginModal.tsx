import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { login, register, loginWithGoogle } = useAuth();
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({
    email: '',
    senha: ''
  });

  const [registerData, setRegisterData] = useState({
    nome: '',
    telefone: '',
    email: '',
    senha: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(loginData.email, loginData.senha);
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta à Padaria Pão Quentinho.",
        });
        onClose();
      } else {
        toast({
          variant: "destructive",
          title: "Erro no login",
          description: "Email ou senha incorretos. Tente novamente.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await register(registerData);
      if (success) {
        toast({
          title: "Conta criada com sucesso!",
          description: "Seja bem-vindo à Padaria Pão Quentinho.",
        });
        onClose();
      } else {
        toast({
          variant: "destructive",
          title: "Erro no cadastro",
          description: "Este email já está cadastrado. Tente fazer login.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await loginWithGoogle();
      toast({
        title: "Login com Google realizado!",
        description: "Bem-vindo à Padaria Pão Quentinho.",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Não foi possível fazer login com Google.",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary">
            🥖 Padaria Pão Quentinho
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="login-senha">Senha</Label>
                <Input
                  id="login-senha"
                  type="password"
                  placeholder="Sua senha"
                  value={loginData.senha}
                  onChange={(e) => setLoginData(prev => ({ ...prev, senha: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Entrar
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">ou</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Mail className="mr-2 h-4 w-4" />
              )}
              Entrar com Google
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="register-nome">Nome Completo</Label>
                <Input
                  id="register-nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={registerData.nome}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, nome: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-telefone">Telefone</Label>
                <Input
                  id="register-telefone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={registerData.telefone}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, telefone: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-senha">Senha</Label>
                <Input
                  id="register-senha"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={registerData.senha}
                  onChange={(e) => setRegisterData(prev => ({ ...prev, senha: e.target.value }))}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Criar Conta
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;