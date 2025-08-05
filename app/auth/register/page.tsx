import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gamepad2 } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 bg-purple-900/50 p-8 rounded-lg shadow-xl border border-purple-700">
          <div className="grid gap-2 text-center">
            <Link href="/" className="flex items-center justify-center mb-4" prefetch={false}>
              <Gamepad2 className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-2xl font-bold text-yellow-300">Juega y Gana</span>
            </Link>
            <h1 className="text-3xl font-bold text-yellow-300">Registrarse</h1>
            <p className="text-gray-300">Crea tu cuenta para empezar a jugar</p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-200">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@ejemplo.com"
                required
                className="bg-purple-800/70 border-purple-700 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-200">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                required
                className="bg-purple-800/70 border-purple-700 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password" className="text-gray-200">
                Confirmar Contraseña
              </Label>
              <Input
                id="confirm-password"
                type="password"
                required
                className="bg-purple-800/70 border-purple-700 text-white placeholder:text-gray-400"
              />
            </div>
            <Button type="submit" className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-500 font-semibold">
              Registrarse
            </Button>
            <Button
              variant="outline"
              className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-900 font-semibold bg-transparent"
            >
              Registrarse con Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-300">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="underline text-yellow-400 hover:text-yellow-300" prefetch={false}>
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
