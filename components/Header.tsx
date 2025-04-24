// components/Header.tsx
import Image from 'next/image'; // Importa Image di Next.js
import React from 'react';
import Link from 'next/link'; // Importa Link di Next.js
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Search } from "lucide-react"
const Header: React.FC = () => {
  return (
    
    <header className="border-b bg-white shadow-md">
  <div className="container mx-auto px-6 py-6">
    <div className="flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-emerald-700 flex items-center gap-2">
        <Image src="/logo.png" alt="Logo Mr Auctions" width={200} height={200} />
      </Link>

      <div className="hidden md:flex flex-1 justify-center">
        <div className="relative w-3/4 max-w-3xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            type="search"
            placeholder="Cerca aste, articoli..."
            className="w-full pl-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/auth/login">
          <Button variant="outline" size="sm" className="text-gray-700 hover:bg-gray-100">
            Accedi
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Registrati
          </Button>
        </Link>
      </div>
    </div>

    <nav className="mt-4">
      <ul className="flex justify-center space-x-8 text-sm font-semibold text-gray-700">
        <li>
          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>
        </li>
        <li>
          <Link href="/categorie" className="hover:text-emerald-600">
            Categorie
          </Link>
        </li>
        <li>
          <Link href="/aste" className="hover:text-emerald-600">
            Aste
          </Link>
        </li>
        <li>
          <Link href="/come-funziona" className="hover:text-emerald-600">
            Come Funziona
          </Link>
        </li>
        <li>
          <Link href="/contatti" className="hover:text-emerald-600">
            Contatti
          </Link>
        </li>
      </ul>
    </nav>
  </div>
</header>


  );
};

export default Header;
