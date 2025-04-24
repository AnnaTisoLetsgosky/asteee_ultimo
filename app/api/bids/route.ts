import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Convalida il corpo della richiesta
    if (!body.productId || !body.userId || !body.amount) {
      return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 })
    }

    // Connessione al database
    const db = await connectToDatabase()

    // Ottieni prodotto
    const product = await db.products.findUnique({
      where: { id: body.productId },
    })

    if (!product) {
      return NextResponse.json({ error: "Prodotto non trovato" }, { status: 404 })
    }

    // Verifica se l'importo dell'offerta è valido
    if (body.amount <= product.currentBid) {
      return NextResponse.json(
        { error: "L'importo dell'offerta deve essere superiore all'offerta attuale" },
        { status: 400 },
      )
    }

    // Verifica se l'asta è terminata
    if (new Date(product.endTime) < new Date()) {
      return NextResponse.json({ error: "L'asta è terminata" }, { status: 400 })
    }

    // Crea nuova offerta
    const newBid = await db.bids.create({
      data: {
        productId: body.productId,
        userId: body.userId,
        amount: body.amount,
      },
    })

    // Aggiorna l'offerta attuale del prodotto
    // In un'implementazione reale, aggiorneresti l'offerta attuale del prodotto

    return NextResponse.json(newBid, { status: 201 })
  } catch (error) {
    console.error("Errore nella creazione dell'offerta:", error)
    return NextResponse.json({ error: "Impossibile creare l'offerta" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Ottieni parametri di query
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ error: "ID prodotto richiesto" }, { status: 400 })
    }

    // Connessione al database
    const db = await connectToDatabase()

    // Ottieni offerte per il prodotto
    const bids = await db.bids.findMany({
      where: { productId },
    })

    return NextResponse.json({ bids })
  } catch (error) {
    console.error("Errore nel recupero delle offerte:", error)
    return NextResponse.json({ error: "Impossibile recuperare le offerte" }, { status: 500 })
  }
}
