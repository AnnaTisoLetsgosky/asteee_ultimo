"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Gavel, Building2, Factory, Store } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/Header"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyType: "retail",
    companyName: "",
    vatNumber: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, companyType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/"
    }, 1500)
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <header>
        <div className="flex items-center justify-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            <Image src="/logo.png" alt="Logo" width={180} height={180} />
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[500px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-900">Crea un account</h1>
          <p className="text-sm text-muted-foreground">Inserisci le tue informazioni per creare un account</p>
        </div>

        <Card className="shadow-xl rounded-2xl">
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white rounded-2xl">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Mario Rossi"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@esempio.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Conferma Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500"
                  />
                </div>

                <Separator className="my-4 bg-emerald-600/40" />

                <div className="space-y-4">
                  <Label>Tipo di Azienda</Label>
                  <RadioGroup
                    value={formData.companyType}
                    onValueChange={handleRadioChange}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                  >
                    <div className="flex flex-col items-center space-y-2 rounded-md border p-4 hover:bg-emerald-700 hover:text-white transition-colors duration-300">
                      <RadioGroupItem value="retail" id="retail" className="sr-only" />
                      <Store className="h-6 w-6" />
                      <Label htmlFor="retail" className="text-center">
                        Azienda
                      </Label>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-md border p-4 hover:bg-emerald-600 hover:text-white transition-colors duration-300">
                      <RadioGroupItem value="manufacturing" id="manufacturing" className="sr-only" />
                      <Factory className="h-6 w-6" />
                      <Label htmlFor="manufacturing" className="text-center">
                        Società di intermediazione
                      </Label>
                    </div>
                    <div className="flex flex-col items-center space-y-2 rounded-md border p-4 hover:bg-emerald-500 hover:text-white transition-colors duration-300">
                      <RadioGroupItem value="wholesale" id="wholesale" className="sr-only" />
                      <Building2 className="h-6 w-6" />
                      <Label htmlFor="wholesale" className="text-center">
                        Impianto di trattamento
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Nome Azienda</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Nome Azienda S.r.l."
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vatNumber">Partita IVA</Label>
                  <Input
                    id="vatNumber"
                    name="vatNumber"
                    placeholder="IT12345678901"
                    value={formData.vatNumber}
                    onChange={handleChange}
                    required
                    className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500"
                  />
                </div>

                {(formData.companyType === "manufacturing" || formData.companyType === "wholesale") && (
                  <div className="space-y-2">
                    <Label htmlFor="alboPdf">Iscrizione all'albo (PDF)</Label>
                    <Input
                      id="alboPdf"
                      name="alboPdf"
                      type="file"
                      accept="application/pdf"
                      required
                    />
                  </div>
                )}

                {formData.companyType === "manufacturing" && (
                  <div className="space-y-2">
                    <Label htmlFor="cat8Pdf">Categoria 8 (PDF)</Label>
                    <Input
                      id="cat8Pdf"
                      name="cat8Pdf"
                      type="file"
                      accept="application/pdf"
                      required
                    />
                  </div>
                )}

                <Separator className="my-4 bg-emerald-600/30" />

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accetto i{" "}
                    <Link href="/terms" className="text-white underline hover:text-emerald-300">
                      termini di servizio
                    </Link>{" "}
                    e la{" "}
                    <Link href="/privacy" className="text-white underline hover:text-emerald-300">
                      politica sulla privacy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Creazione account..." : "Crea Account"}
                </Button>
              </div>
            </CardContent>
          </form>

          <CardFooter className="flex flex-col">
            <div className="mt-4 text-center text-sm">
              Hai già un account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4 hover:text-emerald-600">
                Accedi
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
