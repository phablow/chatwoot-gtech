import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return 'bg-status-online';
      case 'away': return 'bg-status-away';
      case 'offline': return 'bg-status-offline';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 hover:bg-accent"
      >
        <div className="relative">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
            {user.avatar || user.name.charAt(0)}
          </div>
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-background`}></div>
        </div>
        <div className="text-left hidden md:block">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
        </div>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-card border rounded-lg shadow-elegant z-20 py-2">
            <div className="px-4 py-2 border-b">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground capitalize mt-1">
                {user.role === 'ADMIN' ? 'Administrador' : 'Agente'}
              </p>
            </div>
            
            <div className="py-1">
              <button 
                onClick={() => {
                  navigate(user.role === 'ADMIN' ? '/admin/profile' : '/agent/profile');
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-accent"
              >
                <User className="w-4 h-4" />
                Perfil
              </button>
              <button 
                onClick={() => {
                  navigate(user.role === 'ADMIN' ? '/admin/settings' : '/agent/settings');
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-accent"
              >
                <Settings className="w-4 h-4" />
                Configurações
              </button>
              <div className="border-t my-1" />
              <button
                onClick={logout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-destructive hover:bg-accent"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
