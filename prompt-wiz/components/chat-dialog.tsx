import { Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface ChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  prompt: string
}

export function ChatDialog({ open, onOpenChange, prompt }: ChatDialogProps) {
  const [editedPrompt, setEditedPrompt] = useState(prompt)

  const handleSend = () => {
    // Here you would implement the actual sending logic
    console.log('Sending prompt:', editedPrompt)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Testa il Prompt</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Modifica il prompt se necessario e premi Invio per testare
          </p>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="relative flex min-h-[200px] flex-col rounded-lg bg-muted p-4">
            <div className="flex-1">
              <Textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                className="min-h-[150px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0"
                placeholder="Il tuo prompt qui..."
              />
            </div>
            <div className="absolute bottom-4 right-4">
              <Button 
                size="icon"
                onClick={handleSend}
                className="rounded-full bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Invia prompt</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

