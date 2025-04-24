"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Eye, Heart, Share2, ShieldCheck, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DepositModal from "@/components/deposit-modal"

// Questo normalmente verrebbe recuperato dal backend Medusa
const mockAuction = {
  id: "1",
  title: "Rolex Submariner Vintage",
  description:
    "Un raro Rolex Submariner vintage in eccellenti condizioni. Questo orologio presenta un quadrante e una lunetta neri, con la scatola e i documenti originali inclusi. L'orologio è stato revisionato di recente e mantiene un'eccellente precisione.",
  category: "Orologi",
  currentBid: 8500,
  startingBid: 5000,
  minBidIncrement: 100,
  depositRequired: 850, // 10% dell'offerta attuale
  bids: [
    { id: "bid1", user: "collector123", amount: 8500, time: "2023-12-20T14:32:00" },
    { id: "bid2", user: "watchfan", amount: 8400, time: "2023-12-20T12:15:00" },
    { id: "bid3", user: "luxurybuyer", amount: 8200, time: "2023-12-19T18:45:00" },
    { id: "bid4", user: "timepiece_collector", amount: 7800, time: "2023-12-19T10:22:00" },
    { id: "bid5", user: "vintage_lover", amount: 7500, time: "2023-12-18T16:08:00" },
  ],
  endTime: "2023-12-31T23:59:59",
  seller: {
    id: "seller1",
    name: "OrologiDiLusso",
    rating: 4.9,
    sales: 156,
  },
  condition: "Eccellente",
  year: "1985",
  authenticity: "Verificata",
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  views: 342,
  watchers: 24,
}

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const [bidAmount, setBidAmount] = useState<number>(mockAuction.currentBid + mockAuction.minBidIncrement)
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false) // Simulazione stato di login
  const [hasDepositPaid, setHasDepositPaid] = useState<boolean>(false) // Simulazione pagamento cauzione

  // Formatta il tempo rimanente
  const getRemainingTime = () => {
    const end = new Date(mockAuction.endTime).getTime()
    const now = new Date().getTime()
    const distance = end - now

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

    return `${days}g ${hours}h ${minutes}m`
  }

  // Formatta la data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const handleBid = () => {
    // Questo normalmente invierebbe l'offerta al backend
    alert(`La tua offerta di €${bidAmount} è stata registrata!`)
  }

  const handleDepositPaid = () => {
    setHasDepositPaid(true)
  }

  // Renderizza il componente appropriato in base allo stato di login e pagamento cauzione
  const renderBiddingInterface = () => {
    if (!isLoggedIn) {
      return (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Accesso richiesto</AlertTitle>
          <AlertDescription>
            Per fare un'offerta devi prima{" "}
            <Link href="/auth/login" className="font-medium underline underline-offset-4">
              accedere
            </Link>{" "}
            o{" "}
            <Link href="/auth/register" className="font-medium underline underline-offset-4">
              registrarti
            </Link>
            .
          </AlertDescription>
        </Alert>
      )
    } else if (!hasDepositPaid) {
      return (
        <div className="space-y-4">
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Cauzione richiesta</AlertTitle>
            <AlertDescription>
              Per partecipare a questa asta è richiesto il pagamento di una cauzione di €
              {mockAuction.depositRequired.toLocaleString()}.
            </AlertDescription>
          </Alert>
          <DepositModal
            auctionTitle={mockAuction.title}
            depositAmount={mockAuction.depositRequired}
            onDepositPaid={handleDepositPaid}
          />
        </div>
      )
    } else {
      return (
        <div className="space-y-4">
          <Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-50">
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Cauzione pagata</AlertTitle>
            <AlertDescription>
              Hai pagato la cauzione di €{mockAuction.depositRequired.toLocaleString()}. Ora puoi fare offerte per
              questa asta.
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                min={mockAuction.currentBid + mockAuction.minBidIncrement}
                step={mockAuction.minBidIncrement}
                className="w-full"
              />
            </div>
            <Button onClick={handleBid} className="w-full">
              Fai Offerta
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Inserisci €{(mockAuction.currentBid + mockAuction.minBidIncrement).toLocaleString()} o più
          </p>
        </div>
      )
    }
  }

  // Per simulare il login/logout
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn)
    if (!isLoggedIn) {
      setHasDepositPaid(false)
    }
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <Link
          href="/auctions"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna alle Aste
        </Link>

        {/* Pulsante per simulare login/logout - solo per demo */}
        <Button variant="outline" size="sm" onClick={toggleLogin}>
          {isLoggedIn ? "Simula Logout" : "Simula Login"}
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Immagini Prodotto */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border bg-background">
            <img
              src={mockAuction.images[selectedImage] || "/placeholder.svg"}
              alt={mockAuction.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {mockAuction.images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer overflow-hidden rounded-lg border ${
                  selectedImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Immagine prodotto ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info Prodotto e Offerte */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{mockAuction.title}</h1>
            <div className="mt-2 flex items-center gap-4">
              <Badge variant="outline" className="px-2 py-1">
                {mockAuction.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="mr-1 h-4 w-4" />
                {mockAuction.views} visualizzazioni
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Heart className="mr-1 h-4 w-4" />
                {mockAuction.watchers} osservatori
              </div>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Offerta Attuale: €{mockAuction.currentBid.toLocaleString()}</CardTitle>
              <CardDescription>L'offerta iniziale era €{mockAuction.startingBid.toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm mb-4">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Tempo Rimanente: {getRemainingTime()}</span>
              </div>

              {renderBiddingInterface()}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Salvato" : "Salva"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Condividi
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Dettagli</TabsTrigger>
                <TabsTrigger value="bidding">Cronologia Offerte</TabsTrigger>
                <TabsTrigger value="seller">Info Venditore</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div>
                  <h3 className="font-medium">Descrizione</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{mockAuction.description}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium">Condizione</h4>
                    <p className="text-muted-foreground">{mockAuction.condition}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Anno</h4>
                    <p className="text-muted-foreground">{mockAuction.year}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Autenticità</h4>
                    <div className="flex items-center text-muted-foreground">
                      <ShieldCheck className="mr-1 h-4 w-4 text-green-500" />
                      {mockAuction.authenticity}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Cauzione Richiesta</h4>
                    <p className="text-muted-foreground">€{mockAuction.depositRequired.toLocaleString()}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="bidding" className="pt-4">
                <div className="space-y-4">
                  {mockAuction.bids.map((bid) => (
                    <div key={bid.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{bid.user}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(bid.time)}</p>
                      </div>
                      <p className="font-medium">€{bid.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="seller" className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      {mockAuction.seller.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{mockAuction.seller.name}</p>
                      <div className="flex items-center text-sm">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">
                          {mockAuction.seller.rating} ({mockAuction.seller.sales} vendite)
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Contatta Venditore
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
