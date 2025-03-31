import { Copy, PlayCircle, Trash2, Edit2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChatDialog } from "./chat-dialog"
import { EditCategoryDialog } from "./edit-category-dialog"
import { useToast } from "@/hooks/use-toast"

interface PromptCardProps {
  id: number
  title: string
  description: string
  category: string
  onCopy: () => void
  onDelete: () => void
  onUpdateCategory: (oldCategory: string, newCategory: string) => void
}

export function PromptCard({
  id,
  title,
  description,
  category,
  onCopy,
  onDelete,
  onUpdateCategory
}: PromptCardProps) {
  const [chatOpen, setChatOpen] = useState(false)
  const [editCategoryOpen, setEditCategoryOpen] = useState(false)
  const { toast } = useToast()

  const handleCopy = () => {
    onCopy()
    toast({
      variant: "success",
      title: "Copiato!",
      description: "Prompt copiato negli appunti",
      duration: 2000,
    })
  }

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{title}</span>
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => setEditCategoryOpen(true)}
            >
              {category}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <div className="ml-auto flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setChatOpen(true)}
            >
              <PlayCircle className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <ChatDialog 
        open={chatOpen} 
        onOpenChange={setChatOpen}
        prompt={description}
      />
      <EditCategoryDialog
        open={editCategoryOpen}
        onOpenChange={setEditCategoryOpen}
        currentCategory={category}
        onSave={onUpdateCategory}
      />
    </>
  )
}

