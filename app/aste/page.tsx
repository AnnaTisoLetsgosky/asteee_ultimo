import Link from "next/link"
import { ArrowRight, Clock, Gavel, Search, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FeaturedAuctions from "@/components/featured-auctions"
import CategoryList from "@/components/category-list"
import Header from "@/components/Header"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <Header />

      <main className="flex-1">
        <FeaturedAuctions />

        <CategoryList />

        {/* CTA Section */}
        <section className="w-full py-16 md:py-28 lg:py-36 border-t bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-3">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-emerald-900">
                  Inizia a Vendere Oggi
                </h2>
                <p className="max-w-[600px] text-lg md:text-xl text-gray-600">
                  Inserisci i tuoi articoli e raggiungi migliaia di potenziali acquirenti sulla nostra piattaforma.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300"
                  >
                    Crea un Account
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                  >
                    Scopri di Più
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white shadow-inner py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
            <Link href="/" className="flex items-center gap-2 text-emerald-800">
              <Gavel className="h-5 w-5" />
              <span className="text-lg font-semibold">MR Aste</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} MR Aste. Tutti i diritti riservati.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-emerald-600 hover:underline">
              Termini
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-emerald-600 hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-emerald-600 hover:underline">
              Contatti
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
