import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, LogOut, PlusCircle, MinusCircle, Gamepad2 } from "lucide-react"
import { signOut } from "@/app/actions/auth"
import { processDeposit } from "@/app/actions/withdraw" // Importamos la acción de depósito

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Obtener el perfil del usuario con el saldo
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("balance")
    .eq("user_id", user.id)
    .single()

  if (profileError || !profile) {
    console.error("Error fetching user profile:", profileError?.message)
    // Podrías redirigir a una página de error o crear el perfil si no existe
    redirect("/auth/login?message=Error al cargar el perfil. Intenta de nuevo.")
  }

  const userBalance = Number.parseFloat(profile.balance).toFixed(2)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b border-purple-700">
        <Link href="/dashboard" className="flex items-center justify-center" prefetch={false}>
          <Gamepad2 className="h-6 w-6 text-yellow-400" />
          <span className="ml-2 text-xl font-bold">Juega y Gana</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300 hidden sm:block">Hola, {user.email}</span>
          <form action={signOut}>
            <Button variant="ghost" className="text-yellow-400 hover:bg-purple-700 hover:text-yellow-300">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-purple-900/50 border-purple-700 shadow-xl text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-2xl font-bold text-yellow-300">Panel del Usuario</CardTitle>
            <DollarSign className="h-8 w-8 text-yellow-400" />
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between text-lg font-medium">
              <span>Saldo Disponible:</span>
              <span className="text-yellow-300 text-3xl font-bold">{userBalance} USD</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Formulario de Depósito Simplificado */}
              <form action={processDeposit} className="flex flex-col gap-2">
                <Label htmlFor="deposit-amount" className="text-gray-200">
                  Monto a Depositar
                </Label>
                <Input
                  id="deposit-amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="Ej: 20.00"
                  required
                  className="bg-purple-800/70 border-purple-700 text-white placeholder:text-gray-400"
                />
                <Button type="submit" className="w-full bg-green-500 text-white hover:bg-green-600 font-semibold">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Depositar
                </Button>
              </form>

              <Link href="/user/withdraw" passHref>
                <Button className="w-full bg-red-500 text-white hover:bg-red-600 font-semibold h-full py-2">
                  <MinusCircle className="mr-2 h-4 w-4" />
                  Retirar Fondos
                </Button>
              </Link>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Historial Reciente</h3>
              <p className="text-gray-400">
                (Aquí iría tu historial de partidas y movimientos de dinero. Necesitaría más lógica de base de datos
                para esto.)
              </p>
              <Link href="/history" className="text-yellow-400 hover:underline text-sm mt-2 block" prefetch={false}>
                Ver Historial Completo
              </Link>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Salas de Juego</h3>
              <p className="text-gray-400">
                (Aquí iría la lista de juegos activos y la opción para unirte o crear partidas.)
              </p>
              <Link href="/game-rooms" className="text-yellow-400 hover:underline text-sm mt-2 block" prefetch={false}>
                Ir a Salas de Juego
              </Link>
            </div>
          </CardContent>
        </Card>
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
