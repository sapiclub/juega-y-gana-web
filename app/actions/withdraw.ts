"use server"

import { createClient } from "@/lib/supabase/server"

interface WithdrawResult {
  success: boolean
  message: string
  amountRequested?: number
  feeAmount?: number
  netAmount?: number
  currentBalance?: number
}

export async function processWithdrawal(formData: FormData): Promise<WithdrawResult> {
  // Simula un retraso de red
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const amountString = formData.get("amount") as string
  const amount = Number.parseFloat(amountString)

  if (isNaN(amount) || amount <= 0) {
    return { success: false, message: "Por favor, ingresa un monto válido." }
  }

  const supabase = createClient()

  // Obtener la sesión del usuario
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Debes iniciar sesión para retirar fondos." }
  }

  // Obtener el saldo actual del usuario
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("balance")
    .eq("user_id", user.id)
    .single()

  if (profileError || !profile) {
    console.error("Error fetching user profile:", profileError?.message)
    return { success: false, message: "Error al obtener el saldo del usuario." }
  }

  const currentBalance = Number.parseFloat(profile.balance)

  if (amount > currentBalance) {
    return { success: false, message: `Saldo insuficiente. Tu saldo actual es ${currentBalance.toFixed(2)} USD.` }
  }

  const commissionRate = 0.1 // 10% de comisión
  const feeAmount = amount * commissionRate
  const netAmount = amount - feeAmount
  const newBalance = currentBalance - amount // Restamos el monto total solicitado

  // Actualizar el saldo del usuario en la base de datos
  const { error: updateError } = await supabase.from("profiles").update({ balance: newBalance }).eq("user_id", user.id)

  if (updateError) {
    console.error("Error updating user balance:", updateError.message)
    return { success: false, message: "Error al procesar el retiro. Intenta de nuevo." }
  }

  console.log(`Retiro procesado para usuario ${user.id}:`)
  console.log(`Monto solicitado: ${amount.toFixed(2)} USD`)
  console.log(`Comisión (10%): ${feeAmount.toFixed(2)} USD`)
  console.log(`Monto neto a recibir: ${netAmount.toFixed(2)} USD`)
  console.log(`Nuevo saldo: ${newBalance.toFixed(2)} USD`)

  return {
    success: true,
    message: `¡Retiro de ${amount.toFixed(2)} USD solicitado con éxito! Recibirás ${netAmount.toFixed(2)} USD después de la comisión del 10% (${feeAmount.toFixed(2)} USD).`,
    amountRequested: amount,
    feeAmount: Number.parseFloat(feeAmount.toFixed(2)),
    netAmount: Number.parseFloat(netAmount.toFixed(2)),
    currentBalance: Number.parseFloat(newBalance.toFixed(2)),
  }
}

// Acción de servidor para simular un depósito
export async function processDeposit(
  formData: FormData,
): Promise<{ success: boolean; message: string; newBalance?: number }> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const amountString = formData.get("amount") as string
  const amount = Number.parseFloat(amountString)

  if (isNaN(amount) || amount <= 0) {
    return { success: false, message: "Por favor, ingresa un monto válido para depositar." }
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Debes iniciar sesión para depositar fondos." }
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("balance")
    .eq("user_id", user.id)
    .single()

  if (profileError || !profile) {
    console.error("Error fetching user profile for deposit:", profileError?.message)
    return { success: false, message: "Error al obtener el perfil del usuario para depósito." }
  }

  const currentBalance = Number.parseFloat(profile.balance)
  const newBalance = currentBalance + amount

  const { error: updateError } = await supabase.from("profiles").update({ balance: newBalance }).eq("user_id", user.id)

  if (updateError) {
    console.error("Error updating balance for deposit:", updateError.message)
    return { success: false, message: "Error al procesar el depósito. Intenta de nuevo." }
  }

  return {
    success: true,
    message: `¡Depósito de ${amount.toFixed(2)} USD realizado con éxito! Tu nuevo saldo es ${newBalance.toFixed(2)} USD.`,
    newBalance: Number.parseFloat(newBalance.toFixed(2)),
  }
}
