import { Sparkles, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onAddPromptClick: () => void
}

export function Header({ onAddPromptClick }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-orange-500" />
        <h1 className="text-2xl font-bold">
          Prompt<span className="text-white">WIZ</span>
        </h1>
      </div>
      <Button onClick={onAddPromptClick}>
        <Plus className="mr-2 h-4 w-4" />
        Aggiungi Prompt
      </Button>
    </header>
  )
}

