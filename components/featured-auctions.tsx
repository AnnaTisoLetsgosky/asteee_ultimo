"use client"

import { useState } from "react"
import Link from "next/link"
import { Clock, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Questo normalmente verrebbe recuperato dal backend Medusa
const mockAuctions = [
  {
    id: "1",
    title: "Rolex Submariner Vintage",
    category: "Orologi",
    currentBid: 8500,
    bids: 24,
    endTime: "2023-12-31T23:59:59",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "2",
    title: "Libro Prima Edizione Raro",
    category: "Libri",
    currentBid: 1200,
    bids: 8,
    endTime: "2023-12-28T23:59:59",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "3",
    title: "Sedia Mid-Century Modern",
    category: "Arredamento",
    currentBid: 650,
    bids: 12,
    endTime: "2023-12-29T23:59:59",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "4",
    title: "Opera d'Arte Firmata Originale",
    category: "Arte",
    currentBid: 3200,
    bids: 18,
    endTime: "2023-12-30T23:59:59",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "5",
    title: "Candelabro d'Argento Antico",
    category: "Antiquariato",
    currentBid: 950,
    bids: 7,
    endTime: "2023-12-27T23:59:59",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "6",
    title: "Collezione di Macchine Fotografiche Vintage",
    category: "Collezionismo",
    currentBid: 780,
    bids: 15,
    endTime: "2023-12-26T23:59:59",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function FeaturedAuctions() {
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  // Formatta il tempo rimanente
  const getRemainingTime = (endTime: string) => {
    const end = new Date(endTime).getTime()
    const now = new Date().getTime()
    const distance = end - now

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    return `${days}g ${hours}h`
  }

  return (
    <section className="w-full py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Aste in Evidenza</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Scopri le nostre aste più popolari che stanno per terminare. Non perdere l'occasione di fare un'offerta!
          </p>
        </div>
  
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-10 gap-2">
            <TabsTrigger value="all">Tutte</TabsTrigger>
            <TabsTrigger value="ending-soon">In Scadenza</TabsTrigger>
            <TabsTrigger value="popular">Più Popolari</TabsTrigger>
            <TabsTrigger value="new">Appena Inserite</TabsTrigger>
          </TabsList>
  
          {["all", "ending-soon", "popular", "new"].map((tab) => {
            const filtered = {
              all: mockAuctions,
              "ending-soon": [...mockAuctions].sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime()).slice(0, 3),
              popular: [...mockAuctions].sort((a, b) => b.bids - a.bids).slice(0, 3),
              new: mockAuctions.slice(0, 3),
            }[tab];
  
            return (
              <TabsContent key={tab} value={tab} className="mt-0">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {(filtered ?? []).map((auction) => (
                    <Card
                      key={auction.id}
                      className="overflow-hidden transition-shadow hover:shadow-lg rounded-2xl border border-muted bg-white"
                    >
                      <CardHeader className="p-0">
                        <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                          <img
                            src={auction.image || "/placeholder.svg"}
                            alt={auction.title}
                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full"
                            onClick={() => toggleFavorite(auction.id)}
                          >
                            <Heart
                              className={`h-5 w-5 transition-colors ${
                                favorites.includes(auction.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                              }`}
                            />
                            <span className="sr-only">Aggiungi ai preferiti</span>
                          </Button>
                        </div>
                      </CardHeader>
  
                      <CardContent className="p-4">
                        <CardTitle className="line-clamp-1 text-lg font-semibold">{auction.title}</CardTitle>
                        <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                          <span>{auction.category}</span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {getRemainingTime(auction.endTime)}
                          </span>
                        </div>
                        <div className="mt-4">
                          <div className="text-xl font-bold text-emerald-700">€{auction.currentBid.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{auction.bids} offerte</div>
                        </div>
                      </CardContent>
  
                      <CardFooter className="p-4 pt-0">
                        <Link href={`/auctions/${auction.id}`} className="w-full">
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all">
                            Fai Offerta
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
  
        <div className="mt-14 text-center">
          <Link href="/auctions">
            <Button size="lg" variant="outline" className="hover:bg-emerald-50 text-emerald-700 border-emerald-600">
              Vedi Tutte le Aste
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
  

}
