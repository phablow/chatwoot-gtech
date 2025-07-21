import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/auth/UserMenu";
import { useAuth } from "@/contexts/AuthContext";
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

interface HeaderProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  labels: Label[];
}

export const Header = ({ filter, onFilterChange, searchTerm, onSearchChange, labels }: HeaderProps) => {
  const { user } = useAuth();

  const filterOptions = [
    { value: 'all', label: 'Todas as conversas' },
    ...labels.map(label => ({ value: label.id, label: label.name }))
  ];

  const currentFilter = filterOptions.find(option => option.value === filter);

  return (
    <div className="p-4 border-b border-border bg-gradient-header">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-semibold text-white">WhatsApp Business</h1>
          <p className="text-sm text-white/80">Sistema Multi-Agente</p>
        </div>
        <UserMenu />
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar conversas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background/90 border-white/20"
        />
      </div>

      {/* Filter Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between bg-background/90 border-white/20 text-foreground hover:bg-background"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {currentFilter?.label || 'Todas as conversas'}
            </div>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[200px]">
          {filterOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onFilterChange(option.value)}
              className={filter === option.value ? 'bg-accent' : ''}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
