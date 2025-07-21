import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, User, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const editAgentSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  status: z.enum(['online', 'away', 'offline']),
});

type EditAgentFormData = z.infer<typeof editAgentSchema>;

const EditAgent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [agent, setAgent] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditAgentFormData>({
    resolver: zodResolver(editAgentSchema),
  });

  // Mock data - aqui seria carregado do backend
  useEffect(() => {
    const mockAgent = {
      id: id,
      name: 'Carlos Mendes',
      email: 'carlos@empresa.com',
      status: 'online'
    };
    
    setAgent(mockAgent);
    setValue('name', mockAgent.name);
    setValue('email', mockAgent.email);
    setValue('status', mockAgent.status as 'online' | 'away' | 'offline');
  }, [id, setValue]);

  const onSubmit = async (data: EditAgentFormData) => {
    setIsLoading(true);
    try {
      console.log('Atualizando agente:', data);
      
      toast({
        title: "Agente atualizado com sucesso!",
        description: `Dados de ${data.name} foram salvos.`,
      });
      
      navigate('/admin');
    } catch (error) {
      toast({
        title: "Erro ao atualizar agente",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeactivate = async () => {
    if (window.confirm('Tem certeza que deseja desativar este agente?')) {
      try {
        console.log('Desativando agente:', id);
        
        toast({
          title: "Agente desativado",
          description: "O agente foi desativado com sucesso.",
        });
        
        navigate('/admin');
      } catch (error) {
        toast({
          title: "Erro ao desativar agente",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    }
  };

  if (!agent) {
    return <div className="min-h-screen bg-gradient-chat flex items-center justify-center">
      <div className="text-center">Carregando...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-chat">
      <header className="bg-card border-b shadow-sm">
        <div className="px-6 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/admin')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Editar Agente</h1>
            <p className="text-muted-foreground">Altere os dados do agente</p>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Dados do Agente</h2>
                <p className="text-muted-foreground">ID: {id}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  placeholder="Digite o nome completo"
                  {...register('name')}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@empresa.com"
                  {...register('email')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  {...register('status')}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="online">Online</option>
                  <option value="away">Ausente</option>
                  <option value="offline">Offline</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-destructive">{errors.status.message}</p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin')}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="whatsapp"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeactivate}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Desativar
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditAgent;
