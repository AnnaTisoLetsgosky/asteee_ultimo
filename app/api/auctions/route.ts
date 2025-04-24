import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import { medusaClient, convertMedusaProductToAuction } from "@/lib/medusa-client"

export async function GET(request: NextRequest) {
  try {
    // Ottieni parametri di query
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const sort = searchParams.get("sort") || "latest"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Connessione al database
    const db = await connectToDatabase()

    // Recupera prodotti dal database
    // In un'implementazione reale, applicheresti filtri, ordinamento e paginazione
    const dbProducts = await db.products.findMany()

    // Recupera prodotti da Medusa
    const { products: medusaProducts } = await medusaClient.products.list()

    // Converti i prodotti Medusa in formato d'asta
    const auctionProducts = medusaProducts.map(convertMedusaProductToAuction)

    // Combina i prodotti da entrambe le fonti
    const allProducts = [...dbProducts, ...auctionProducts]

    // Applica ordinamento
    let sortedProducts = [...allProducts]
    if (sort === "price-asc") {
      sortedProducts.sort((a, b) => a.currentBid - b.currentBid)
    } else if (sort === "price-desc") {
      sortedProducts.sort((a, b) => b.currentBid - a.currentBid)
    } else if (sort === "ending-soon") {
      sortedProducts.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime())
    } else {
      // Predefinito a più recenti
      sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    // Applica filtro per categoria
    if (category) {
      sortedProducts = sortedProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    }

    // Applica paginazione
    const paginatedProducts = sortedProducts.slice((page - 1) * limit, page * limit)

    return NextResponse.json({
      products: paginatedProducts,
      total: sortedProducts.length,
      page,
      limit,
      totalPages: Math.ceil(sortedProducts.length / limit),
    })
  } catch (error) {
    console.error("Errore nel recupero delle aste:", error)
    return NextResponse.json({ error: "Impossibile recuperare le aste" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Convalida il corpo della richiesta
    if (!body.title || !body.startingBid || !body.endTime) {
      return NextResponse.json({ error: "Campi obbligatori mancanti" }, { status: 400 })
    }

    // Connessione al database
    const db = await connectToDatabase()

    // Crea nuova asta
    const newAuction = await db.products.create({
      data: {
        title: body.title,
        description: body.description || "",
        images: body.images || ["/placeholder.svg"],
        currentBid: body.startingBid,
        startingBid: body.startingBid,
        minBidIncrement: body.minBidIncrement || Math.floor(body.startingBid * 0.05),
        endTime: body.endTime,
        seller: body.seller,
        category: body.category || "Non Categorizzato",
        condition: body.condition || "Usato",
      },
    })

    return NextResponse.json(newAuction, { status: 201 })
  } catch (error) {
    console.error("Errore nella creazione dell'asta:", error)
    return NextResponse.json({ error: "Impossibile creare l'asta" }, { status: 500 })
  }
}
