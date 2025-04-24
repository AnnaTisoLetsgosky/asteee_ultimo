"use client"

import { useState } from "react"
import { CreditCard, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DepositModalProps {
  auctionTitle: string
  depositAmount: number
  onDepositPaid: () => void
}

export default function DepositModal({ auctionTitle, depositAmount, onDepositPaid }: DepositModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulazione del pagamento
    setTimeout(() => {
      setIsProcessing(false)
      setIsOpen(false)
      onDepositPaid()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Paga Cauzione per Partecipare</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pagamento Cauzione</DialogTitle>
          <DialogDescription>
            Per partecipare all'asta "{auctionTitle}" è richiesto il pagamento di una cauzione.
          </DialogDescription>
        </DialogHeader>

        <Alert variant="outline" className="my-4">
          <Info className="h-4 w-4" />
          <AlertDescription>
            La cauzione verrà restituita se non vincerai l'asta. In caso di vittoria, sarà detratta dal prezzo finale.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Importo Cauzione</Label>
            <div className="text-xl font-bold">€{depositAmount.toLocaleString()}</div>
          </div>

          <div className="space-y-2">
            <Label>Metodo di Pagamento</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2 rounded-md border p-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1">
                  Carta di Credito
                </Label>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-2">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex-1">
                  Bonifico Bancario
                </Label>
              </div>
            </RadioGroup>
          </div>

          {paymentMethod === "card" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Numero Carta</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Scadenza</Label>
                  <Input id="expiry" placeholder="MM/AA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </>
          )}

          {paymentMethod === "bank" && (
            <div className="space-y-2 rounded-md border p-3">
              <p className="text-sm font-medium">Dati Bancari</p>
              <p className="text-sm text-muted-foreground">IBAN: IT60X0542811101000000123456</p>
              <p className="text-sm text-muted-foreground">Intestatario: MR Aste S.r.l.</p>
              <p className="text-sm text-muted-foreground">Causale: Cauzione Asta #{auctionTitle.substring(0, 10)}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Annulla
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? "Elaborazione..." : "Paga Cauzione"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
