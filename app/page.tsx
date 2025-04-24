"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Clock, Gavel, Search, TrendingUp, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"
import CountUp from "react-countup"
import { EmblaCarouselType } from "embla-carousel"

export default function Home() {
  // Carosello per le testimonianze
  const [testimonialCarouselRef, testimonialCarouselApi] = useEmblaCarousel({ loop: true })

  // Carosello per le aste in evidenza
  const [featuredAuctionsRef, featuredAuctionsApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
    },
  })

  // Carosello per le immagini hero
  const [heroCarouselRef, heroCarouselApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (!heroCarouselApi) return

    const autoplay = () => {
      if (heroCarouselApi.canScrollNext()) {
        heroCarouselApi.scrollNext()
      } else {
        heroCarouselApi.scrollTo(0)
      }
    }

    const interval = setInterval(autoplay, 4000)
    return () => clearInterval(interval)
  }, [heroCarouselApi])

  // Controlli per i caroselli
  const scrollPrev = (api: EmblaCarouselType | undefined) => api && api.scrollPrev()
  const scrollNext = (api: EmblaCarouselType | undefined) => api && api.scrollNext()

  // Animazioni per le sezioni
  const statsRef = useRef(null)
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 })

  // Countdown per le aste
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 32,
    seconds: 45,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Dati di esempio per le aste
  const featuredAuctions = [
    {
      id: 1,
      title: "daje roma",
      currentBid: "€350",
      image: "rifiuti1.png?height=300&width=400",
      timeLeft: "4h 10m",
      bids: 15,
    },
    {
      id: 2,
      title: "Scarti industriali in PVC rigenerato",
      currentBid: "€620",
      image: "rifiuti2.png?height=300&width=400",
      timeLeft: "6h 45m",
      bids: 22,
    },
    {
      id: 3,
      title: "Rame macinato recuperato",
      currentBid: "€1,900",
      image: "rifiuti3.png?height=300&width=400",
      timeLeft: "3h 30m",
      bids: 30,
    },
    {
      id: 4,
      title: "Lastre di zinco usato",
      currentBid: "€1,100",
      image: "rifiuti4.png?height=300&width=400",
      timeLeft: "1h 55m",
      bids: 17,
    },
  ]
  

  // Immagini per il carosello hero
  const heroImages = [
    "/home1.png?height=500&width=800",
    "/home2.png?height=500&width=800",
    "/home3.png?height=500&width=800",
  ]

  // Testimonianze
  const testimonials = [
    {
      text: "Mr Auctions è la piattaforma ideale per fare acquisti in modo sicuro e conveniente. Grazie alla verifica dei prodotti e alle aste in tempo reale, non ho mai avuto problemi!",
      name: "Giovanni R.",
      since: "Utente di Mr Auctions dal 2022",
      rating: 5,
    },
    {
      text: "Una piattaforma intuitiva e facile da usare. Le aste sono rapide e il supporto clienti è sempre disponibile. Consiglio vivamente!",
      name: "Maria T.",
      since: "Utente di Mr Auctions dal 2021",
      rating: 5,
    },
    {
      text: "Ho trovato pezzi unici che cercavo da tempo. Il sistema di offerte è trasparente e la spedizione è sempre puntuale.",
      name: "Luca B.",
      since: "Utente di Mr Auctions dal 2023",
      rating: 4,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <Header />
      <main className="flex-1">
        {/* Sezione Hero con carosello */}
        <section className="w-full py-16 md:py-24 lg:py-32 px-6 lg:px-48 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-50 opacity-50 z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                className="flex flex-col justify-center space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <Badge className="bg-emerald-100 text-emerald-800 mb-4 hover:bg-emerald-200">Aste esclusive</Badge>
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl text-emerald-700">
                    Scopri tutte le aste su Mr Auctions
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Fai offerte su aste esclusive, con lotti di articoli unici e interessanti.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex-1 relative">
                    <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Cerca articoli..."
                      className="w-full pl-10 bg-background rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <Button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Trova Aste
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-8 text-sm mt-6 justify-center sm:justify-start">
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5 text-emerald-700" />
                    <span>Offerte in Tempo Reale</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-5 w-5 text-emerald-700" />
                    <span>Transazioni Sicure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Gavel className="h-5 w-5 text-emerald-700" />
                    <span>Verifica Esperta</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="mx-auto w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="overflow-hidden" ref={heroCarouselRef}>
                  <div className="flex">
                    {heroImages.map((src, index) => (
                      <div className="flex-[0_0_100%] min-w-0 relative" key={index}>
                        <img
                          src={src || "/placeholder.svg"}
                          alt={`Articolo in asta in evidenza ${index + 1}`}
                          className="object-cover w-full h-full rounded-xl transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={() => scrollPrev(heroCarouselApi)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={() => scrollNext(heroCarouselApi)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sezione Statistiche con contatori animati */}
        <section ref={statsRef} className="w-full py-12 bg-emerald-700 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {isStatsInView && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-4xl font-bold mb-2">
                      <CountUp end={5000} duration={2.5} separator="," />+
                    </span>
                    <span className="text-emerald-100">Aste Completate</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-4xl font-bold mb-2">
                      <CountUp end={12000} duration={2.5} separator="," />+
                    </span>
                    <span className="text-emerald-100">Utenti Attivi</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-4xl font-bold mb-2">
                      <CountUp end={98} duration={2.5} suffix="%" />
                    </span>
                    <span className="text-emerald-100">Clienti Soddisfatti</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col items-center"
                  >
                    <span className="text-4xl font-bold mb-2">
                      €
                      <CountUp end={2500000} duration={2.5} separator="," />
                    </span>
                    <span className="text-emerald-100">Valore Transazioni</span>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Sezione Aste in Evidenza con carosello */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-extrabold text-emerald-700">Aste in Evidenza</h2>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-emerald-200 hover:bg-emerald-50"
                  onClick={() => scrollPrev(featuredAuctionsApi)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-emerald-200 hover:bg-emerald-50"
                  onClick={() => scrollNext(featuredAuctionsApi)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="overflow-hidden" ref={featuredAuctionsRef}>
              <div className="flex">
                {featuredAuctions.map((auction) => (
                  <div
                    key={auction.id}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-4"
                  >
                    <motion.div
                      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="relative">
                        <img
                          src={auction.image || "/placeholder.svg"}
                          alt={auction.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">
                            {auction.bids} offerte
                          </Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-lg mb-2">{auction.title}</h3>
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Offerta attuale</p>
                            <p className="text-xl font-bold text-emerald-700">{auction.currentBid}</p>
                          </div>
                          <div className="bg-emerald-50 px-3 py-1 rounded-full flex items-center">
                            <Clock className="h-4 w-4 text-emerald-700 mr-1" />
                            <span className="text-sm font-medium text-emerald-700">{auction.timeLeft}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                          Fai un'offerta
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sezione Perché scegliere noi con animazioni */}
        <section className="w-full py-16 md:py-24 bg-white text-center">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-extrabold text-emerald-700 mb-8">Perché scegliere Mr Auctions?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div
                className="flex flex-col items-center p-8 bg-white shadow-xl rounded-xl transition-all hover:shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-emerald-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Offerte in tempo reale</h3>
                <p className="text-muted-foreground">
                  Partecipa a offerte in tempo reale, senza perdite di tempo, con un'esperienza fluida e sicura.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center p-8 bg-white shadow-xl rounded-xl transition-all hover:shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Gavel className="h-8 w-8 text-emerald-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Transazioni Sicure</h3>
                <p className="text-muted-foreground">
                  Tutte le transazioni sono protette da un sistema di pagamento sicuro e affidabile.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center p-8 bg-white shadow-xl rounded-xl transition-all hover:shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-emerald-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aste Esclusive</h3>
                <p className="text-muted-foreground">
                  Accedi a aste esclusive su articoli selezionati, per un'esperienza unica e vantaggiosa.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sezione Testimonianze con carosello */}
        <section className="w-full py-12 md:py-24 bg-gray-50 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-extrabold text-emerald-700 mb-12">Cosa dicono i nostri utenti</h2>

            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden" ref={testimonialCarouselRef}>
                <div className="flex">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                      <motion.div
                        className="bg-white p-8 rounded-xl shadow-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex justify-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-6 w-6 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-lg text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                        <div>
                          <p className="font-semibold text-lg">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.since}</p>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-8 space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-emerald-200 hover:bg-emerald-50"
                  onClick={() => scrollPrev(testimonialCarouselApi)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-emerald-200 hover:bg-emerald-50"
                  onClick={() => scrollNext(testimonialCarouselApi)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sezione Come funziona con animazioni */}
        <section id="how-it-works" className="w-full py-12 md:py-24 bg-emerald-700 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl font-extrabold mb-12">Come funziona Mr Auctions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Linea di connessione tra i passi */}
              <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-emerald-500"></div>

              <motion.div
                className="bg-white text-black p-8 shadow-xl rounded-xl transition-all relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4">Registrati</h3>
                <p className="mb-4">Iscriviti alla piattaforma con pochi passi per iniziare a partecipare alle aste.</p>
                <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50">
                  Crea un account
                </Button>
              </motion.div>

              <motion.div
                className="bg-white text-black p-8 shadow-xl rounded-xl transition-all relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4">Partecipa alle aste</h3>
                <p className="mb-4">Scegli l'asta a cui vuoi partecipare e fai la tua offerta in tempo reale.</p>
                <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50">
                  Sfoglia le aste
                </Button>
              </motion.div>

              <motion.div
                className="bg-white text-black p-8 shadow-xl rounded-xl transition-all relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4">Vinci e acquista</h3>
                <p className="mb-4">
                  Se la tua offerta è la più alta, procedi con il pagamento e ricevi il tuo articolo.
                </p>
                <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50">
                  Come funziona
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sezione CTA con effetto parallasse */}
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-900 opacity-90 z-0"></div>
          <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/header5.png?height=800&width=1600')",
              backgroundAttachment: "fixed",
            }}
          ></div>
          <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
            <motion.div
              className="max-w-3xl mx-auto text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-extrabold mb-6">Pronto a iniziare?</h2>
              <p className="text-xl mb-8 text-white">
                Unisciti a migliaia di utenti che ogni giorno trovano articoli unici su Mr Auctions. Registrati ora e
                inizia a fare offerte!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-emerald-800 hover:bg-white/90 text-lg px-8 py-6 h-auto">
                  Registrati Ora
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-emerald-800 hover:bg-white/90 text-lg px-8 py-6 h-auto"
                >
                  Scopri di più
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0 bg-emerald-800 text-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              <span className="text-lg font-semibold">MR Aste</span>
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} MR Aste. Tutti i diritti riservati.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Termini
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Contatti
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
