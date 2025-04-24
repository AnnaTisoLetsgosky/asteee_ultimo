// pages/api/register.js
import { Client } from 'pg'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  // Estrai i dati dal corpo della richiesta
  const { name, email, password, companyType, companyName, vatNumber } = req.body

  // Verifica che tutti i campi siano presenti
  if (!name || !email || !password || !companyType || !companyName || !vatNumber) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    // Connessione al database
    const client = new Client({
      connectionString: process.env.DATABASE_URL, // Usa la variabile di ambiente per il DB URL
    })
    await client.connect()

    // Prepara una query per inserire l'utente nel database
    const result = await client.query(
      'INSERT INTO users (name, email, password, company_type, company_name, vat_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, password, companyType, companyName, vatNumber]
    )

    // Ottieni il risultato dell'inserimento
    const newUser = result.rows[0]

    // Risposta con i dati dell'utente appena creato
    res.status(201).json(newUser)

    await client.end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
