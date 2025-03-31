"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { PromptCard } from "@/components/prompt-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToastProvider } from "@/components/ui/toast"
import { AddPromptDialog } from "@/components/add-prompt-dialog"
import { BulkAddPromptDialog } from "@/components/bulk-add-prompt-dialog"
import { Button } from "@/components/ui/button"

export default function Home() {
  const initialPrompts = [
    {
      id: 1,
      title: "Blog Ideas",
      description: "Get ideas for your blog in minutes - all we need is your brand name and description.",
      category: "content-seo",
    },
    {
      id: 2,
      title: "Blog Outline",
      description: "Get an outline of your blog post in minutes - all we need is your title and topic.",
      category: "content-seo",
    },
    {
      id: 3,
      title: "Social Media Post",
      description: "Generate engaging social media content for your brand.",
      category: "social-media",
    },
    {
      id: 4,
      title: "Email Newsletter",
      description: "Create compelling email newsletters that drive engagement.",
      category: "email",
    },
    {
      id: 5,
      title: "Product Description",
      description: "Write compelling product descriptions that convert.",
      category: "business",
    },
    {
      id: 6,
      title: "SEO Meta Tags",
      description: "Generate optimized meta titles and descriptions.",
      category: "content-seo",
    },
    {
      id: 7,
      title: "Instagram Caption",
      description: "Create engaging Instagram captions with relevant hashtags.",
      category: "social-media",
    },
    {
      id: 8,
      title: "Business Proposal",
      description: "Generate professional business proposals.",
      category: "business",
    },
  ]

  const initialCategories = [
    "all",
    "content-seo",
    "social-media",
    "email",
    "business",
    "test",
  ]

  const [prompts, setPrompts] = useState(initialPrompts)
  const [categories, setCategories] = useState(initialCategories)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [addPromptOpen, setAddPromptOpen] = useState(false)
  const [bulkAddPromptOpen, setBulkAddPromptOpen] = useState(false)

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCopy = (promptId: number) => {
    const prompt = prompts.find((p) => p.id === promptId)
    if (prompt) {
      navigator.clipboard.writeText(prompt.description)
    }
  }

  const handleAddPrompt = (newPrompt: { title: string; description: string; category: string }) => {
    setPrompts([
      ...prompts,
      {
        id: prompts.length + 1,
        ...newPrompt,
      },
    ])
    if (!categories.includes(newPrompt.category)) {
      setCategories([...categories, newPrompt.category])
    }
  }

  const handleBulkAddPrompts = (newPrompts: { title: string; description: string; category: string }[]) => {
    const updatedPrompts = [
      ...prompts,
      ...newPrompts.map((prompt, index) => ({
        id: prompts.length + index + 1,
        ...prompt,
      }))
    ]
    setPrompts(updatedPrompts)

    const newCategories = new Set(categories)
    newPrompts.forEach(prompt => {
      if (!newCategories.has(prompt.category)) {
        newCategories.add(prompt.category)
      }
    })
    setCategories(Array.from(newCategories))
  }

  const handleDeletePrompt = (promptId: number) => {
    setPrompts(prompts.filter(prompt => prompt.id !== promptId))
  }

  const handleUpdateCategory = (oldCategory: string, newCategory: string) => {
    // Update prompts with the new category
    const updatedPrompts = prompts.map(prompt => ({
      ...prompt,
      category: prompt.category === oldCategory ? newCategory : prompt.category
    }))
    setPrompts(updatedPrompts)

    // Update categories list
    const updatedCategories = categories.map(cat => 
      cat === oldCategory ? newCategory : cat
    )
    setCategories(updatedCategories)

    // Update selected category if it was the one being edited
    if (selectedCategory === oldCategory) {
      setSelectedCategory(newCategory)
    }
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Header onAddPromptClick={() => setAddPromptOpen(true)} />
        <div className="flex flex-col md:flex-row">
          <aside className="w-full md:w-64 md:border-r">
            <Sidebar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              categories={categories}
              onUpdateCategory={handleUpdateCategory}
            />
          </aside>
          <main className="flex-1 p-4">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Input
                placeholder="Filtra per sottocategoria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sm:max-w-xs"
              />
              <div className="flex gap-2">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Ordina per" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Più recenti</SelectItem>
                    <SelectItem value="oldest">Più vecchi</SelectItem>
                    <SelectItem value="az">A-Z</SelectItem>
                    <SelectItem value="za">Z-A</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => setBulkAddPromptOpen(true)}>
                  Aggiungi in massa
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              {filteredPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  id={prompt.id}
                  title={prompt.title}
                  description={prompt.description}
                  category={prompt.category}
                  onCopy={() => handleCopy(prompt.id)}
                  onDelete={() => handleDeletePrompt(prompt.id)}
                  onUpdateCategory={handleUpdateCategory}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
      <AddPromptDialog
        open={addPromptOpen}
        onOpenChange={setAddPromptOpen}
        onAddPrompt={handleAddPrompt}
        categories={categories.filter(c => c !== 'all')}
        onAddCategory={(category) => setCategories([...categories, category])}
      />
      <BulkAddPromptDialog
        open={bulkAddPromptOpen}
        onOpenChange={setBulkAddPromptOpen}
        onBulkAddPrompts={handleBulkAddPrompts}
      />
    </ToastProvider>
  )
}

