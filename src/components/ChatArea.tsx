import { useState } from "react";
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Conversation, Agent } from "./WhatsAppDashboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  fromAgent: boolean;
  agentName?: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatAreaProps {
  conversation: Conversation | null;
  currentAgent: Agent;
}

// Mock messages
const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Olá, gostaria de saber mais sobre os produtos da empresa.',
    timestamp: '14:28',
    fromAgent: false
  },
  {
    id: '2',
    content: 'Olá! Claro, ficarei feliz em ajudar. Qual tipo de produto você tem interesse?',
    timestamp: '14:29',
    fromAgent: true,
    agentName: 'Carlos Mendes',
    status: 'read'
  },
  {
    id: '3',
    content: 'Estou interessada em equipamentos de informática para escritório.',
    timestamp: '14:30',
    fromAgent: false
  },
  {
    id: '4',
    content: 'Perfeito! Temos uma linha completa de equipamentos. Você precisa de computadores, impressoras ou outros equipamentos específicos?',
    timestamp: '14:32',
    fromAgent: true,
    agentName: 'Carlos Mendes',
    status: 'delivered'
  }
];

export const ChatArea = ({ conversation, currentAgent }: ChatAreaProps) => {
  const [message, setMessage] = useState('');
  const [messages] = useState<Message[]>(mockMessages);

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implementar envio via baileys
      console.log('Enviando mensagem:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-chat-bg">
        <div className="text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 mx-auto">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Sistema de Atendimento WhatsApp
          </h2>
          <p className="text-muted-foreground max-w-md">
            Selecione uma conversa na lista à esquerda para começar a atender seus clientes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-chat-bg">
      {/* Chat Header */}
      <div className="p-4 bg-card border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {conversation.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{conversation.contactName}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{conversation.contactPhone}</span>
              <Badge 
                variant={conversation.status === 'open' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {conversation.status === 'open' ? 'Ativo' : 
                 conversation.status === 'pending' ? 'Pendente' : 'Fechado'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Ver perfil do contato</DropdownMenuItem>
              <DropdownMenuItem>Histórico de conversas</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Transferir conversa</DropdownMenuItem>
              <DropdownMenuItem>Fechar atendimento</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.fromAgent ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-2xl shadow-bubble ${
                msg.fromAgent
                  ? 'bg-chat-sent text-chat-sent-foreground'
                  : 'bg-chat-received text-chat-received-foreground'
              }`}
            >
              {msg.fromAgent && msg.agentName && (
                <div className="text-xs opacity-75 mb-1">{msg.agentName}</div>
              )}
              <div className="text-sm">{msg.content}</div>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-xs opacity-60">{msg.timestamp}</span>
                {msg.fromAgent && msg.status && (
                  <div className="flex">
                    <div className={`w-1 h-1 rounded-full ${
                      msg.status === 'sent' ? 'bg-white/60' : 
                      msg.status === 'delivered' ? 'bg-white/80' : 'bg-white'
                    }`} />
                    <div className={`w-1 h-1 rounded-full ml-0.5 ${
                      msg.status === 'delivered' ? 'bg-white/80' : 
                      msg.status === 'read' ? 'bg-white' : 'bg-white/40'
                    }`} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-end gap-2">
          <Button variant="ghost" size="sm" className="mb-2">
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="pr-10 min-h-10 max-h-32 resize-none"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="mb-2 bg-primary hover:bg-primary-hover"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {conversation.assignedAgent !== currentAgent.id && (
          <div className="mt-2 p-2 bg-accent rounded-lg">
            <p className="text-xs text-muted-foreground">
              Esta conversa não está atribuída a você. 
              <Button variant="link" className="p-0 h-auto text-xs ml-1">
                Atribuir a mim
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
