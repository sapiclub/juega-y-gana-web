"use client"

import { useActionState } from "react"
import { processWithdrawal } from "@/app/actions/withdraw"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, DollarSign } from "lucide-react"

export default function WithdrawPage() {
  const [state, action, isPending] = useActionState(processWithdrawal, null)

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 text-white items-center justify-center p-4">
      <Card className="w-full max-w-md bg-purple-900/50 border-purple-700 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-2xl font-bold text-yellow-300">Retiro de Fondos</CardTitle>
          <Link
            href="/dashboard"
            className="text-gray-300 hover:text-yellow-400 flex items-center gap-1"
            prefetch={false}
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Panel
          </Link>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">Ingresa el monto que deseas retirar. Se aplicará una comisión del 10%.</p>
          <form action={action} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-gray-200">
                Monto a Retirar (USD)
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="Ej: 50.00"
                required
                className="bg-purple-800/70 border-purple-700 text-white placeholder:text-gray-400"
              />
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-500 font-semibold"
            >
              {isPending ? (
                "Procesando Retiro..."
              ) : (
                <>
                  <DollarSign className="mr-2 h-5 w-5" />
                  Solicitar Retiro
                </>
              )}
            </Button>
          </form>
          {state && (
            <div
              className={`mt-4 p-3 rounded-md ${state.success ? "bg-green-600/20 text-green-300" : "bg-red-600/20 text-red-300"}`}
            >
              <p className="font-medium">{state.message}</p>
              {state.success && state.amountRequested && (
                <div className="text-sm mt-2">
                  <p>Monto solicitado: {state.amountRequested.toFixed(2)} USD</p>
                  <p>Comisión (10%): {state.feeAmount?.toFixed(2)} USD</p>
                  <p>Monto neto a recibir: {state.netAmount?.toFixed(2)} USD</p>
                  <p>Nuevo saldo: {state.currentBalance?.toFixed(2)} USD</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
