import { useState } from "react";
import { ConversationList } from "./ConversationList";
import { ChatArea } from "./ChatArea";
import { Header } from "./Header";
import { ConnectionStatus } from "./ConnectionStatus";

export interface Conversation {
  id: string;
  contactName: string;
  contactPhone: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  assignedAgent?: string;
  status: 'open' | 'closed' | 'pending';
  avatar?: string;
  labels?: string[]; // Array of label IDs
}

export interface Label {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  status: 'online' | 'away' | 'offline';
  avatar?: string;
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    contactName: 'Maria Silva',
    contactPhone: '+55 11 99999-1234',
    lastMessage: 'Olá, gostaria de saber mais sobre os produtos...',
    timestamp: '14:32',
    unreadCount: 3,
    assignedAgent: 'agent1',
    status: 'open',
    avatar: 'MS',
    labels: ['1', '2'] // Urgente, Vendas
  },
  {
    id: '2',
    contactName: 'João Santos',
    contactPhone: '+55 11 88888-5678',
    lastMessage: 'Perfeito! Muito obrigado pelo atendimento',
    timestamp: '13:45',
    unreadCount: 0,
    assignedAgent: 'agent1',
    status: 'closed',
    avatar: 'JS',
    labels: ['3'] // Suporte
  },
  {
    id: '3',
    contactName: 'Ana Costa',
    contactPhone: '+55 11 77777-9012',
    lastMessage: 'Quando estará disponível?',
    timestamp: '12:20',
    unreadCount: 1,
    assignedAgent: 'agent1',
    status: 'pending',
    avatar: 'AC',
    labels: ['4'] // Followup
  }
];

// Mock labels
const mockLabels: Label[] = [
  { id: '1', name: 'Urgente', color: 'destructive', description: 'Conversas que precisam de atenção imediata' },
  { id: '2', name: 'Vendas', color: 'default', description: 'Leads de vendas e oportunidades' },
  { id: '3', name: 'Suporte', color: 'secondary', description: 'Questões de suporte técnico' },
  { id: '4', name: 'Followup', color: 'outline', description: 'Conversas para acompanhamento' }
];

const mockAgent: Agent = {
  id: 'agent1',
  name: 'Carlos Mendes',
  email: 'carlos@empresa.com',
  status: 'online',
  avatar: 'CM'
};

export const WhatsAppDashboard = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [currentAgent] = useState<Agent>(mockAgent);
  const [labels] = useState<Label[]>(mockLabels);
  const [filter, setFilter] = useState<string>('all'); // Now can be 'all' or label ID
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conv => {
    // Only show conversations assigned to current agent
    if (conv.assignedAgent !== currentAgent.id) {
      return false;
    }

    const matchesSearch = conv.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.contactPhone.includes(searchTerm) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (conv.labels && conv.labels.includes(filter));
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        <Header
          filter={filter}
          onFilterChange={setFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          labels={labels}
        />
        
        <ConnectionStatus />
        
        <ConversationList
          conversations={filteredConversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
          labels={labels}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatArea
          conversation={selectedConversation}
          currentAgent={currentAgent}
        />
      </div>
    </div>
  );
};
