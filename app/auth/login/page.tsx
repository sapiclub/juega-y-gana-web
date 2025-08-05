"use client"

import Image from "next/image"
import Link from "next/link"
import { useActionState } from "react"
import { signIn } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gamepad2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const [state, action, isPending] = useActionState(signIn, null)

  const message = searchParams.get("message")

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6 bg-purple-900/50 p-8 rounded-lg shadow-xl border border-purple-700">
          <div className="grid gap-2 text-center">
            <Link href="/" className="flex items-center justify-center mb-4" prefetch={false}>
              <Gamepad2 className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-2xl font-bold text-yellow-300">Juega y Gana</span>
            </Link>
            <h1 className="text-3xl font-bold text-yellow-300">Iniciar Sesión</h1>
            <p className="text-gray-300">Ingresa tu correo electrónico para acceder a tu cuenta</p>
          </div>
          <form action={action} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-200">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@ejemplo.com"
                required
                className="bg-purple-800/70 border-purple-700 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-gray-200">
                  Contraseña
                </Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline text-yellow-400 hover:text-yellow-300"
                  prefetch={false}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-purple-800/70 border-purple-700 text-white placeholder:text-gray-400"
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-500 font-semibold"
            >
              {isPending ? "Iniciando Sesión..." : "Iniciar Sesión"}
            </Button>
            <Button
              variant="outline"
              className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-900 font-semibold bg-transparent"
            >
              Iniciar Sesión con Google
            </Button>
          </form>
          {state?.error && <p className="text-red-400 text-center text-sm mt-2">{state.error}</p>}
          {message && <p className="text-green-400 text-center text-sm mt-2">{message}</p>}
          <div className="mt-4 text-center text-sm text-gray-300">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/register" className="underline text-yellow-400 hover:text-yellow-300" prefetch={false}>
              Regístrate
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Gaming Dashboard"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
