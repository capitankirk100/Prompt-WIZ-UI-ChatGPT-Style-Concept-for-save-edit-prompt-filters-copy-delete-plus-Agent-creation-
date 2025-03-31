"use client"

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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AddPromptDialogProps {
  open: boolean
  categories: string[]
  onAddPrompt: (prompt: {
    title: string
    description: string
    category: string
  }) => void
  onAddCategory: (category: string) => void
  onOpenChange: (open: boolean) => void
}

export function AddPromptDialog({ open, categories, onAddPrompt, onAddCategory, onOpenChange }: AddPromptDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [showNewCategory, setShowNewCategory] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (showNewCategory && newCategory) {
      onAddCategory(newCategory)
      onAddPrompt({ title, description, category: newCategory })
    } else {
      onAddPrompt({ title, description, category })
    }
    onOpenChange(false)
    setTitle("")
    setDescription("")
    setCategory("")
    setNewCategory("")
    setShowNewCategory(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Prompt</DialogTitle>
            <DialogDescription>
              Create a new prompt template. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter prompt title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter prompt description"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              {!showNewCategory ? (
                <div className="flex gap-2">
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewCategory(true)}
                  >
                    New
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewCategory(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Prompt</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

