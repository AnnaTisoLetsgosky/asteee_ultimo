import Link from "next/link"
import { ArrowRight, BookOpen, Camera, Clock3, Gem, Palette, Shirt } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  {
    id: "art",
    name: "Arte",
    description: "Dipinti, stampe e sculture di artisti rinomati",
    icon: Palette,
    count: 245,
  },
  {
    id: "collectibles",
    name: "Collezionismo",
    description: "Oggetti rari e memorabilia per collezionisti",
    icon: Gem,
    count: 189,
  },
  {
    id: "books",
    name: "Libri e Manoscritti",
    description: "Prime edizioni, copie firmate e manoscritti rari",
    icon: BookOpen,
    count: 132,
  },
  {
    id: "fashion",
    name: "Moda",
    description: "Abbigliamento vintage, accessori di lusso e gioielli",
    icon: Shirt,
    count: 178,
  },
  {
    id: "watches",
    name: "Orologi",
    description: "Orologi di lusso e orologi vintage",
    icon: Clock3,
    count: 156,
  },
  {
    id: "photography",
    name: "Fotografia",
    description: "Macchine fotografiche vintage e stampe fotografiche",
    icon: Camera,
    count: 94,
  },
]

export default function CategoryList() {
  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-white via-gray-50 to-gray-200">
      <div className="container px-4 md:px-6 flex flex-col items-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">Sfoglia per Categoria</h2>
          <p className="text-lg max-w-[600px] mx-auto text-muted-foreground">
            Esplora la nostra vasta gamma di categorie d'asta e trova esattamente ciò che stai cercando.
          </p>
        </div>
  
        <div className="mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10 max-w-6xl">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow rounded-xl bg-white border border-muted"
            >
              <CardHeader className="p-4 pb-3">
                <div className="flex items-center gap-3">
                  <category.icon className="h-6 w-6 text-emerald-600" />
                  <CardTitle className="text-xl font-semibold">{category.name}</CardTitle>
                </div>
                <CardDescription className="mt-2 text-sm text-muted-foreground">
                  {category.description}
                </CardDescription>
              </CardHeader>
  
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{category.count} aste attive</p>
              </CardContent>
  
              <CardFooter className="p-4 pt-0">
                <Link href={`/categories/${category.id}`} className="flex items-center text-sm font-medium text-emerald-600 hover:underline">
                  Sfoglia Categoria
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform transform hover:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
  
}
