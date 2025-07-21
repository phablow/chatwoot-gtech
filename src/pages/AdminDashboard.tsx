import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MessageSquare, Clock, TrendingUp, Plus, Search, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { UserMenu } from '@/components/auth/UserMenu';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for admin dashboard
  const stats = [
    { title: 'Agentes Online', value: '3', icon: Users, color: 'text-status-online' },
    { title: 'Conversas Ativas', value: '12', icon: MessageSquare, color: 'text-primary' },
    { title: 'Tempo Médio', value: '4.2min', icon: Clock, color: 'text-status-away' },
    { title: 'Satisfação', value: '94%', icon: TrendingUp, color: 'text-status-online' },
  ];

  const agents = [
    { id: '1', name: 'Carlos Mendes', email: 'carlos@empresa.com', status: 'online', conversations: 5 },
    { id: '2', name: 'Ana Silva', email: 'ana@empresa.com', status: 'away', conversations: 3 },
    { id: '3', name: 'Pedro Santos', email: 'pedro@empresa.com', status: 'offline', conversations: 0 },
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      online: 'bg-status-online text-white',
      away: 'bg-status-away text-white',
      offline: 'bg-status-offline text-white'
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-gradient-chat">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
            <p className="text-muted-foreground">Bem-vindo, {user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/profile')} className="gap-2">
              <User className="w-4 h-4" />
              Perfil
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/settings')} className="gap-2">
              <Settings className="w-4 h-4" />
              Configurações
            </Button>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-elegant transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Agents Management */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Gerenciar Agentes</h2>
            <Button variant="whatsapp" className="gap-2" onClick={() => navigate('/admin/add-agent')}>
              <Plus className="w-4 h-4" />
              Novo Agente
            </Button>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar agentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Agente</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Conversas</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id} className="border-b hover:bg-accent/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">
                          {agent.name.charAt(0)}
                        </div>
                        <span className="font-medium">{agent.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{agent.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(agent.status)}`}>
                        {agent.status === 'online' ? 'Online' : agent.status === 'away' ? 'Ausente' : 'Offline'}
                      </span>
                    </td>
                    <td className="py-3 px-4">{agent.conversations}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/admin/edit-agent/${agent.id}`)}>
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">Desativar</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Atividade Recente</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-accent/30 rounded-lg">
              <div className="w-2 h-2 bg-status-online rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Carlos Mendes iniciou atendimento com Maria Silva</p>
                <p className="text-xs text-muted-foreground">Há 2 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-accent/30 rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Nova conversa atribuída para Ana Silva</p>
                <p className="text-xs text-muted-foreground">Há 5 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-accent/30 rounded-lg">
              <div className="w-2 h-2 bg-status-away rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Pedro Santos alterou status para ausente</p>
                <p className="text-xs text-muted-foreground">Há 10 minutos</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
