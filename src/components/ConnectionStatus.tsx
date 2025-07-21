import { Smartphone, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ConnectionStatus = () => {
  const isConnected = true; // TODO: Conectar com baileys
  const phoneNumber = "+55 11 99999-0000"; // TODO: Buscar do baileys

  return (
    <div className="p-3 border-b border-border bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Smartphone className="h-4 w-4 text-primary" />
            {isConnected ? (
              <Wifi className="h-3 w-3 text-status-online absolute -top-1 -right-1" />
            ) : (
              <WifiOff className="h-3 w-3 text-status-offline absolute -top-1 -right-1" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium">{phoneNumber}</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-status-online animate-pulse-green' : 'bg-status-offline'}`} />
              <span className={`text-xs ${isConnected ? 'text-status-online' : 'text-status-offline'}`}>
                {isConnected ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
          </div>
        </div>
        
        {!isConnected && (
          <Button variant="outline" size="sm" className="text-xs h-7">
            Reconectar
          </Button>
        )}
      </div>
      
      {isConnected && (
        <div className="mt-2 flex gap-1">
          <Badge variant="secondary" className="text-xs">
            QR conectado
          </Badge>
        </div>
      )}
    </div>
  );
};
