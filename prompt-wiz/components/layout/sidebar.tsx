import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { EditCategoryDialog } from "../edit-category-dialog"
import { Edit2 } from 'lucide-react'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedCategory?: string
  onSelectCategory: (category: string) => void
  categories: string[]
  onUpdateCategory: (oldCategory: string, newCategory: string) => void
}

export function Sidebar({
  selectedCategory = "all",
  onSelectCategory,
  categories,
  onUpdateCategory,
  className
}: SidebarProps) {
  const [editingCategory, setEditingCategory] = useState<string | null>(null)

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <ScrollArea className="h-[300px] px-2">
            <div className="space-y-1">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <Button
                    onClick={() => onSelectCategory(category)}
                    variant={selectedCategory === category ? "secondary" : "ghost"}
                    className={cn(
                      "flex-1 justify-start transition-colors",
                      selectedCategory === category && "bg-primary text-primary-foreground"
                    )}
                  >
                    {category}
                  </Button>
                  {category !== 'all' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingCategory(category)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      {editingCategory && (
        <EditCategoryDialog
          open={!!editingCategory}
          onOpenChange={(open) => !open && setEditingCategory(null)}
          currentCategory={editingCategory}
          onSave={onUpdateCategory}
        />
      )}
    </div>
  )
}

