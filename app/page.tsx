import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dice5, Gamepad2, LogIn, UserPlus } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Gamepad2 className="h-6 w-6 text-yellow-400" />
          <span className="sr-only">Juega y Gana</span>
          <span className="ml-2 text-xl font-bold">Juega y Gana</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/auth/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Iniciar Sesión
          </Link>
          <Link
            href="/auth/register"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Registrarse
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-yellow-300 drop-shadow-lg">
                Juega, Gana, Retira. ¡Así de fácil!
              </h1>
              <p className="max-w-[700px] text-lg text-gray-200 md:text-xl">
                Tu plataforma para competir en Ludo, UNO y Dominó por premios en efectivo.
              </p>
              <div className="space-x-4">
                <Button
                  asChild
                  className="bg-yellow-400 text-purple-900 hover:bg-yellow-500 px-6 py-3 text-lg font-semibold rounded-full shadow-lg"
                >
                  <Link href="/auth/register">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Regístrate Ahora
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-purple-900 px-6 py-3 text-lg font-semibold rounded-full shadow-lg bg-transparent"
                >
                  <Link href="/auth/login">
                    <LogIn className="mr-2 h-5 w-5" />
                    Iniciar Sesión
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-900/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-300">
                  Nuestros Juegos
                </h2>
                <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Disfruta de tus juegos de mesa favoritos y compite por dinero real.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3 w-full max-w-5xl">
                <Card className="flex flex-col items-center justify-center p-6 bg-purple-800/50 border-purple-700 text-white shadow-lg transform transition-transform hover:scale-105">
                  <Dice5 className="h-16 w-16 text-yellow-400 mb-4" />
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Ludo</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-300">Lanza los dados, mueve tus fichas y sé el primero en llegar a casa.</p>
                  </CardContent>
                </Card>
                <Card className="flex flex-col items-center justify-center p-6 bg-purple-800/50 border-purple-700 text-white shadow-lg transform transition-transform hover:scale-105">
                  <Image src="/uno-icon.png" alt="UNO Icon" width={64} height={64} className="mb-4" />
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">UNO</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-300">Combina colores y números, usa cartas especiales y grita "UNO!".</p>
                  </CardContent>
                </Card>
                <Card className="flex flex-col items-center justify-center p-6 bg-purple-800/50 border-purple-700 text-white shadow-lg transform transition-transform hover:scale-105">
                  <Image src="/domino-icon.png" alt="Dominó Icon" width={64} height={64} className="mb-4" />
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Dominó</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-300">Conecta tus fichas, bloquea a tus oponentes y domina la mesa.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-300">
                ¿Cómo Funciona?
              </h2>
              <p className="max-w-[700px] text-lg text-gray-200 md:text-xl">Es simple, seguro y divertido.</p>
              <div className="grid gap-8 md:grid-cols-3 w-full max-w-4xl pt-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-purple-900 text-3xl font-bold shadow-lg">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-yellow-300">Regístrate y Deposita</h3>
                  <p className="text-gray-300">Crea tu cuenta y añade fondos de forma segura.</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-purple-900 text-3xl font-bold shadow-lg">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-yellow-300">Juega y Gana</h3>
                  <p className="text-gray-300">Únete a una sala, compite y demuestra tus habilidades.</p>
                </div>
                <div className="flex flex-col items-y-center space-y-2">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400 text-purple-900 text-3xl font-bold shadow-lg">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-yellow-300">Retira tus Premios</h3>
                  <p className="text-gray-300">Retira tus ganancias de forma rápida y sencilla.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-purple-700 bg-purple-900/50 text-gray-300">
        <p className="text-xs">&copy; {new Date().getFullYear()} Juega y Gana. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Términos de Servicio
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Política de Privacidad
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Soporte
          </Link>
        </nav>
      </footer>
    </div>
  )
}
