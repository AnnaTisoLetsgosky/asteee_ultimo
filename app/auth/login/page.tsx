"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Gavel } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/"
    }, 1500)
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-6">
      <header className="mb-6 flex flex-col items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          <Image src="/logo.png" alt="Logo" width={160} height={160} />
        </Link>
      </header>

      <div className="w-full max-w-sm space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-emerald-900">Bentornato</h1>
          <p className="text-sm text-muted-foreground">Inserisci le tue credenziali per accedere al tuo account</p>
        </div>

        <Card className="shadow-xl rounded-2xl">
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@esempio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/reset-password" className="text-xs text-muted-foreground hover:text-emerald-600">
                    Password dimenticata?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Accesso in corso..." : "Accedi"}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="flex flex-col">
            <div className="mt-4 text-center text-sm">
              Non hai un account?{" "}
              <Link href="/auth/register" className="underline underline-offset-4 hover:text-emerald-600">
                Registrati
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
