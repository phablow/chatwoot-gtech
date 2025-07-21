import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, MoreVertical } from "lucide-react";
import { Conversation } from "./WhatsAppDashboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Label {
  id: string;
  name: string;
  color: string;
  description?: string;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  labels: Label[];
}

export const ConversationList = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  labels,
}: ConversationListProps) => {
  const getConversationLabels = (conversation: Conversation) => {
    if (!conversation.labels || conversation.labels.length === 0) return null;
    return conversation.labels
      .map(labelId => labels.find(label => label.id === labelId)?.name)
      .filter(Boolean)
      .join(' / ');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-status-online';
      case 'pending': return 'bg-status-away';
      case 'closed': return 'bg-status-offline';
      default: return 'bg-status-offline';
    }
  };

  const formatTime = (timestamp: string) => {
    // Aqui você pode implementar formatação mais sofisticada
    return timestamp;
  };

  const truncateMessage = (message: string, maxLength: number = 50) => {
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  if (conversations.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <UserPlus className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-foreground mb-2">Nenhuma conversa encontrada</h3>
        <p className="text-sm text-muted-foreground">
          Aguarde por novas mensagens ou ajuste seus filtros
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={`p-3 border-b border-border cursor-pointer transition-colors hover:bg-accent/50 ${
            selectedConversation?.id === conversation.id ? 'bg-accent' : ''
          }`}
          onClick={() => onSelectConversation(conversation)}
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {conversation.avatar}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.status)}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-foreground truncate">
                  {conversation.contactName}
                </h4>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(conversation.timestamp)}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-muted">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>Atribuir a mim</DropdownMenuItem>
                      <DropdownMenuItem>Marcar como lida</DropdownMenuItem>
                      <DropdownMenuItem>Arquivar conversa</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate flex-1">
                  {truncateMessage(conversation.lastMessage)}
                </p>
                {conversation.unreadCount > 0 && (
                  <Badge className="ml-2 bg-primary text-primary-foreground h-5 min-w-5 text-xs flex items-center justify-center">
                    {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                  </Badge>
                )}
              </div>

              {/* Phone and status */}
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {conversation.contactPhone}
                </span>
                {getConversationLabels(conversation) && (
                  <Badge variant="outline" className="text-xs">
                    {getConversationLabels(conversation)}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
