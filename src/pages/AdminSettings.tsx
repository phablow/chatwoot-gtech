import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MessageSquare, Bell, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Mock settings state
  const [settings, setSettings] = useState({
    workingHours: {
      start: '08:00',
      end: '18:00',
      enabled: true,
    },
    autoResponse: {
      enabled: true,
      message: 'Olá! Obrigado por entrar em contato. Em breve um de nossos agentes irá atendê-lo.',
      delay: 30,
    },
    notifications: {
      newMessage: true,
      agentOffline: true,
      systemAlerts: true,
    },
    whatsapp: {
      maxConversationsPerAgent: 5,
      autoAssignment: true,
      sessionTimeout: 30,
    }
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      console.log('Salvando configurações:', settings);
      
      toast({
        title: "Configurações salvas!",
        description: "As configurações do sistema foram atualizadas.",
      });
      
    } catch (error) {
      toast({
        title: "Erro ao salvar configurações",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = (path: string[], value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      let current = newSettings;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      
      current[path[path.length - 1]] = value;
      return newSettings;
    });
  };

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
            <h1 className="text-2xl font-bold text-foreground">Configurações do Sistema</h1>
            <p className="text-muted-foreground">Gerencie as configurações do WhatsApp Business</p>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Working Hours */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Horário de Funcionamento</h3>
                <p className="text-muted-foreground">Configure os horários de atendimento</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ativar horário de funcionamento</p>
                  <p className="text-sm text-muted-foreground">Mensagens fora do horário recebem resposta automática</p>
                </div>
                <Switch
                  checked={settings.workingHours.enabled}
                  onCheckedChange={(checked) => updateSetting(['workingHours', 'enabled'], checked)}
                />
              </div>

              {settings.workingHours.enabled && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Horário de início</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={settings.workingHours.start}
                      onChange={(e) => updateSetting(['workingHours', 'start'], e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Horário de fim</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={settings.workingHours.end}
                      onChange={(e) => updateSetting(['workingHours', 'end'], e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Auto Response */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Resposta Automática</h3>
                <p className="text-muted-foreground">Configure mensagens automáticas</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ativar resposta automática</p>
                  <p className="text-sm text-muted-foreground">Envia mensagem quando cliente inicia conversa</p>
                </div>
                <Switch
                  checked={settings.autoResponse.enabled}
                  onCheckedChange={(checked) => updateSetting(['autoResponse', 'enabled'], checked)}
                />
              </div>

              {settings.autoResponse.enabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="autoMessage">Mensagem automática</Label>
                    <Textarea
                      id="autoMessage"
                      placeholder="Digite a mensagem automática"
                      value={settings.autoResponse.message}
                      onChange={(e) => updateSetting(['autoResponse', 'message'], e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delay">Atraso para envio (segundos)</Label>
                    <Input
                      id="delay"
                      type="number"
                      min="0"
                      max="300"
                      value={settings.autoResponse.delay}
                      onChange={(e) => updateSetting(['autoResponse', 'delay'], parseInt(e.target.value))}
                    />
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Notificações</h3>
                <p className="text-muted-foreground">Configure alertas do sistema</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nova mensagem</p>
                  <p className="text-sm text-muted-foreground">Notificar quando chegar nova mensagem</p>
                </div>
                <Switch
                  checked={settings.notifications.newMessage}
                  onCheckedChange={(checked) => updateSetting(['notifications', 'newMessage'], checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Agente offline</p>
                  <p className="text-sm text-muted-foreground">Notificar quando agente ficar offline</p>
                </div>
                <Switch
                  checked={settings.notifications.agentOffline}
                  onCheckedChange={(checked) => updateSetting(['notifications', 'agentOffline'], checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Alertas do sistema</p>
                  <p className="text-sm text-muted-foreground">Notificar sobre erros e atualizações</p>
                </div>
                <Switch
                  checked={settings.notifications.systemAlerts}
                  onCheckedChange={(checked) => updateSetting(['notifications', 'systemAlerts'], checked)}
                />
              </div>
            </div>
          </Card>

          {/* WhatsApp Settings */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Configurações do WhatsApp</h3>
                <p className="text-muted-foreground">Configurações específicas do atendimento</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxConversations">Máximo de conversas por agente</Label>
                <Input
                  id="maxConversations"
                  type="number"
                  min="1"
                  max="20"
                  value={settings.whatsapp.maxConversationsPerAgent}
                  onChange={(e) => updateSetting(['whatsapp', 'maxConversationsPerAgent'], parseInt(e.target.value))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Atribuição automática</p>
                  <p className="text-sm text-muted-foreground">Atribui automaticamente conversas para agentes disponíveis</p>
                </div>
                <Switch
                  checked={settings.whatsapp.autoAssignment}
                  onCheckedChange={(checked) => updateSetting(['whatsapp', 'autoAssignment'], checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Timeout da sessão (minutos)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  min="5"
                  max="120"
                  value={settings.whatsapp.sessionTimeout}
                  onChange={(e) => updateSetting(['whatsapp', 'sessionTimeout'], parseInt(e.target.value))}
                />
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              variant="whatsapp"
              disabled={isLoading}
              className="px-8"
            >
              {isLoading ? 'Salvando...' : 'Salvar Configurações'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
