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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EditCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentCategory: string
  onSave: (oldCategory: string, newCategory: string) => void
}

export function EditCategoryDialog({
  open,
  onOpenChange,
  currentCategory,
  onSave,
}: EditCategoryDialogProps) {
  const [newCategory, setNewCategory] = useState(currentCategory)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(currentCategory, newCategory.toLowerCase())
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Modifica Categoria</DialogTitle>
            <DialogDescription>
              Modifica il nome della categoria. Questo aggiornerà tutti i prompt associati.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Nome Categoria</Label>
              <Input
                id="category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Inserisci il nome della categoria"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salva Modifiche</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

