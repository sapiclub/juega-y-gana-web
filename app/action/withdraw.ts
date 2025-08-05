"use server"

interface WithdrawResult {
  success: boolean
  message: string
  amountRequested?: number
  feeAmount?: number
  netAmount?: number
}

export async function processWithdrawal(formData: FormData): Promise<WithdrawResult> {
  // Simula un retraso de red
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const amountString = formData.get("amount") as string
  const amount = Number.parseFloat(amountString)

  if (isNaN(amount) || amount <= 0) {
    return { success: false, message: "Por favor, ingresa un monto válido." }
  }

  const commissionRate = 0.1 // 10% de comisión
  const feeAmount = amount * commissionRate
  const netAmount = amount - feeAmount

  // Aquí es donde en una aplicación real interactuarías con una base de datos
  // para verificar el saldo del usuario y procesar el retiro a través de un proveedor de pagos.
  // Por ahora, solo simulamos el éxito.

  console.log(`Solicitud de retiro: ${amount} USD`)
  console.log(`Comisión (10%): ${feeAmount.toFixed(2)} USD`)
  console.log(`Monto neto a recibir: ${netAmount.toFixed(2)} USD`)

  return {
    success: true,
    message: `¡Retiro de ${amount.toFixed(2)} USD solicitado con éxito! Recibirás ${netAmount.toFixed(2)} USD después de la comisión del 10% (${feeAmount.toFixed(2)} USD).`,
    amountRequested: amount,
    feeAmount: Number.parseFloat(feeAmount.toFixed(2)),
    netAmount: Number.parseFloat(netAmount.toFixed(2)),
  }
}
