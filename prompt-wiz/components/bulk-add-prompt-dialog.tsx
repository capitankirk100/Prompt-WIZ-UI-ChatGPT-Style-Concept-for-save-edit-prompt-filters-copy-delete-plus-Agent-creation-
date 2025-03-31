import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface BulkAddPromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBulkAddPrompts: (prompts: { title: string; description: string; category: string }[]) => void
}

export function BulkAddPromptDialog({
  open,
  onOpenChange,
  onBulkAddPrompts,
}: BulkAddPromptDialogProps) {
  const [bulkText, setBulkText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const prompts = parsePrompts(bulkText)
    onBulkAddPrompts(prompts)
    setBulkText("")
    onOpenChange(false)
  }

  const parsePrompts = (text: string): { title: string; description: string; category: string }[] => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line !== '')
    const prompts: { title: string; description: string; category: string }[] = []
    let currentPrompt: { category: string; title: string; description: string[] } | null = null

    for (const line of lines) {
      if (line.match(/^[A-Za-z]+$/)) {
        // This line is a category
        if (currentPrompt) {
          prompts.push({
            category: currentPrompt.category,
            title: generateTitle(currentPrompt.description.join(' ')),
            description: currentPrompt.description.join('\n')
          })
        }
        currentPrompt = { category: line, title: '', description: [] }
      } else if (currentPrompt) {
        currentPrompt.description.push(line)
      }
    }

    if (currentPrompt) {
      prompts.push({
        category: currentPrompt.category,
        title: generateTitle(currentPrompt.description.join(' ')),
        description: currentPrompt.description.join('\n')
      })
    }

    return prompts
  }

  const generateTitle = (description: string): string => {
    const words = description.split(' ')
    return words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Aggiungi Prompt in Massa</DialogTitle>
          <DialogDescription>
            Incolla i tuoi prompt qui. Ogni prompt dovrebbe avere una categoria seguita dalla descrizione.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Textarea
              placeholder="Marketing

Crea un post sui social media che si rivolga a [il pubblico specifico] e spieghi in che modo il nostro prodotto [nome del prodotto] può aiutarli.

Business

Analizza lo stato attuale di <settore> e le sue tendenze, sfide e opportunità."
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              className="h-[200px]"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Aggiungi Prompt</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

