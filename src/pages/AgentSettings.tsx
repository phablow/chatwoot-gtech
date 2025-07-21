import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Tag, Plus, X, Edit, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Label {
  id: string;
  name: string;
  color: string;
  description?: string;
}

const AgentSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock labels data
  const [labels, setLabels] = useState<Label[]>([
    { id: '1', name: 'Urgente', color: 'destructive', description: 'Conversas que precisam de atenção imediata' },
    { id: '2', name: 'Vendas', color: 'default', description: 'Leads de vendas e oportunidades' },
    { id: '3', name: 'Suporte', color: 'secondary', description: 'Questões de suporte técnico' },
    { id: '4', name: 'Followup', color: 'outline', description: 'Conversas para acompanhamento' }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState({ name: '', color: 'default', description: '' });

  const colorOptions = [
    { value: 'default', label: 'Padrão', preview: 'bg-primary' },
    { value: 'secondary', label: 'Secundário', preview: 'bg-secondary' },
    { value: 'destructive', label: 'Vermelho', preview: 'bg-destructive' },
    { value: 'outline', label: 'Contorno', preview: 'bg-border' }
  ];

  const handleCreateLabel = () => {
    if (!newLabel.name.trim()) {
      toast({
        title: "Erro",
        description: "O nome da etiqueta é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    const label: Label = {
      id: Date.now().toString(),
      name: newLabel.name,
      color: newLabel.color,
      description: newLabel.description
    };

    setLabels([...labels, label]);
    setNewLabel({ name: '', color: 'default', description: '' });
    setIsCreating(false);
    
    toast({
      title: "Etiqueta criada",
      description: `A etiqueta "${label.name}" foi criada com sucesso.`
    });
  };

  const handleDeleteLabel = (id: string) => {
    const label = labels.find(l => l.id === id);
    setLabels(labels.filter(l => l.id !== id));
    
    toast({
      title: "Etiqueta removida",
      description: `A etiqueta "${label?.name}" foi removida.`
    });
  };

  const handleEditLabel = (id: string) => {
    setEditingId(id);
  };

  const handleSaveEdit = (id: string, updatedLabel: Partial<Label>) => {
    setLabels(labels.map(label => 
      label.id === id ? { ...label, ...updatedLabel } : label
    ));
    setEditingId(null);
    
    toast({
      title: "Etiqueta atualizada",
      description: "As alterações foram salvas com sucesso."
    });
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
              <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
              <p className="text-muted-foreground">Gerencie suas etiquetas e preferências</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Labels Management */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Etiquetas de Organização
              </h2>
              <p className="text-muted-foreground">
                Crie etiquetas para organizar suas conversas
              </p>
            </div>
            <Button 
              onClick={() => setIsCreating(true)}
              className="gap-2"
              disabled={isCreating}
            >
              <Plus className="w-4 h-4" />
              Nova Etiqueta
            </Button>
          </div>

          {/* Create New Label */}
          {isCreating && (
            <div className="p-4 border rounded-lg mb-4 bg-accent/30">
              <h3 className="font-medium mb-3">Criar Nova Etiqueta</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome</label>
                  <Input
                    value={newLabel.name}
                    onChange={(e) => setNewLabel({ ...newLabel, name: e.target.value })}
                    placeholder="Nome da etiqueta"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cor</label>
                  <div className="flex gap-2 mt-1">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setNewLabel({ ...newLabel, color: color.value })}
                        className={`p-2 rounded border ${
                          newLabel.color === color.value ? 'border-primary' : 'border-border'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded ${color.preview}`}></div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Descrição (opcional)</label>
                  <Input
                    value={newLabel.description}
                    onChange={(e) => setNewLabel({ ...newLabel, description: e.target.value })}
                    placeholder="Descrição da etiqueta"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCreateLabel} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Criar
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsCreating(false);
                      setNewLabel({ name: '', color: 'default', description: '' });
                    }}
                    size="sm"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Labels List */}
          <div className="space-y-3">
            {labels.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Tag className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Nenhuma etiqueta criada ainda</p>
                <p className="text-sm">Crie sua primeira etiqueta para organizar as conversas</p>
              </div>
            ) : (
              labels.map((label) => (
                <LabelItem
                  key={label.id}
                  label={label}
                  isEditing={editingId === label.id}
                  onEdit={() => handleEditLabel(label.id)}
                  onSave={(updatedLabel) => handleSaveEdit(label.id, updatedLabel)}
                  onCancel={() => setEditingId(null)}
                  onDelete={() => handleDeleteLabel(label.id)}
                  colorOptions={colorOptions}
                />
              ))
            )}
          </div>
        </Card>

        {/* Other Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Preferências Gerais</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Notificações de novas conversas</p>
                <p className="text-sm text-muted-foreground">Receber alertas quando novas conversas forem atribuídas</p>
              </div>
              <Button variant="outline" size="sm">Configurar</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Auto-resposta</p>
                <p className="text-sm text-muted-foreground">Mensagem automática quando não estiver disponível</p>
              </div>
              <Button variant="outline" size="sm">Configurar</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Component for individual label items
interface LabelItemProps {
  label: Label;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (label: Partial<Label>) => void;
  onCancel: () => void;
  onDelete: () => void;
  colorOptions: Array<{ value: string; label: string; preview: string }>;
}

const LabelItem = ({ label, isEditing, onEdit, onSave, onCancel, onDelete, colorOptions }: LabelItemProps) => {
  const [editedLabel, setEditedLabel] = useState(label);

  if (isEditing) {
    return (
      <div className="p-4 border rounded-lg bg-accent/30">
        <div className="space-y-3">
          <div>
            <Input
              value={editedLabel.name}
              onChange={(e) => setEditedLabel({ ...editedLabel, name: e.target.value })}
              placeholder="Nome da etiqueta"
            />
          </div>
          
          <div>
            <div className="flex gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setEditedLabel({ ...editedLabel, color: color.value })}
                  className={`p-2 rounded border ${
                    editedLabel.color === color.value ? 'border-primary' : 'border-border'
                  }`}
                >
                  <div className={`w-4 h-4 rounded ${color.preview}`}></div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Input
              value={editedLabel.description || ''}
              onChange={(e) => setEditedLabel({ ...editedLabel, description: e.target.value })}
              placeholder="Descrição da etiqueta"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={() => onSave(editedLabel)} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button variant="outline" onClick={onCancel} size="sm">
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-3">
        <Badge variant={label.color as any}>{label.name}</Badge>
        <div>
          <p className="font-medium">{label.name}</p>
          {label.description && (
            <p className="text-sm text-muted-foreground">{label.description}</p>
          )}
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AgentSettings;
