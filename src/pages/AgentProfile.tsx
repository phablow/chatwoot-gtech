import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AgentProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Mock agent profile data
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Agente Exemplo',
    email: user?.email || 'agente@empresa.com',
    phone: '+55 11 99999-9999',
    department: 'Atendimento ao Cliente',
    location: 'São Paulo, SP',
    joinDate: '15/03/2023',
    bio: 'Agente especializado em atendimento ao cliente com foco em vendas e suporte técnico.'
  });

  const [editedData, setEditedData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso."
    });
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-chat">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/agent')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Meu Perfil</h1>
              <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                <Edit className="w-4 h-4" />
                Editar Perfil
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancel} className="gap-2">
                  <X className="w-4 h-4" />
                  Cancelar
                </Button>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Salvar
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold">
                {profileData.name.charAt(0)}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nome Completo
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedData.name}
                      onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                      placeholder="Seu nome completo"
                    />
                  ) : (
                    <p className="text-foreground font-medium">{profileData.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedData.email}
                      onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                      placeholder="seu.email@empresa.com"
                      type="email"
                    />
                  ) : (
                    <p className="text-foreground">{profileData.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telefone
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedData.phone}
                      onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                      placeholder="+55 11 99999-9999"
                    />
                  ) : (
                    <p className="text-foreground">{profileData.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Departamento
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedData.department}
                      onChange={(e) => setEditedData({ ...editedData, department: e.target.value })}
                      placeholder="Seu departamento"
                    />
                  ) : (
                    <p className="text-foreground">{profileData.department}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Localização
                  </label>
                  {isEditing ? (
                    <Input
                      value={editedData.location}
                      onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                      placeholder="Cidade, Estado"
                    />
                  ) : (
                    <p className="text-foreground">{profileData.location}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data de Ingresso
                  </label>
                  <p className="text-foreground">{profileData.joinDate}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Biografia
                </label>
                {isEditing ? (
                  <textarea
                    value={editedData.bio}
                    onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                    placeholder="Conte um pouco sobre você e sua experiência..."
                    className="w-full p-3 border rounded-lg resize-none h-24 bg-background"
                  />
                ) : (
                  <p className="text-foreground">{profileData.bio}</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Statistics Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Estatísticas de Atendimento</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <p className="text-2xl font-bold text-primary">247</p>
              <p className="text-sm text-muted-foreground">Conversas Atendidas</p>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <p className="text-2xl font-bold text-status-online">94%</p>
              <p className="text-sm text-muted-foreground">Satisfação</p>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <p className="text-2xl font-bold text-status-away">3.2min</p>
              <p className="text-sm text-muted-foreground">Tempo Médio</p>
            </div>
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Conversas Hoje</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AgentProfile;
