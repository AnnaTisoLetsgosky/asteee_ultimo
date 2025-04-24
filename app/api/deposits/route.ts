import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validazione del corpo della richiesta
    if (!body.userId || !body.productId || !body.amount) {
      return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 })
    }

    // Connessione al database
    const db = await connectToDatabase()

    // Verifica se l'utente esiste
    const user = await db.users.findUnique({
      where: { id: body.userId },
    })

    if (!user) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 })
    }

    // Verifica se il prodotto esiste
    const product = await db.products.findUnique({
      where: { id: body.productId },
    })

    if (!product) {
      return NextResponse.json({ error: "Prodotto non trovato" }, { status: 404 })
    }

    // Verifica se la cauzione è già stata pagata
    const existingDeposit = await db.deposits.findUnique({
      where: {
        userId_productId: {
          userId: body.userId,
          productId: body.productId,
        },
      },
    })

    if (existingDeposit) {
      return NextResponse.json({ error: "Cauzione già pagata per questo prodotto" }, { status: 400 })
    }

    // Crea il record della cauzione
    const deposit = await db.deposits.create({
      data: {
        userId: body.userId,
        productId: body.productId,
        amount: body.amount,
      },
    })

    // Aggiorna l'utente con la cauzione pagata
    // In un'implementazione reale, aggiorneresti l'array depositsPaid dell'utente

    return NextResponse.json(deposit, { status: 201 })
  } catch (error) {
    console.error("Errore nel pagamento della cauzione:", error)
    return NextResponse.json({ error: "Impossibile elaborare il pagamento della cauzione" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Ottieni parametri di query
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const productId = searchParams.get("productId")

    if (!userId || !productId) {
      return NextResponse.json({ error: "userId e productId sono richiesti" }, { status: 400 })
    }

    // Connessione al database
    const db = await connectToDatabase()

    // Verifica se la cauzione è stata pagata
    const deposit = await db.deposits.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    })

    return NextResponse.json({
      hasPaid: !!deposit,
      deposit,
    })
  } catch (error) {
    console.error("Errore nella verifica della cauzione:", error)
    return NextResponse.json({ error: "Impossibile verificare lo stato della cauzione" }, { status: 500 })
  }
}
