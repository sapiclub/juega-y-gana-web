"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirm-password") as string

  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden." }
  }

  const supabase = createClient()

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`, // Asegúrate de configurar esta URL en Supabase Auth > URL Configuration
    },
  })

  if (error) {
    console.error("Error signing up:", error.message)
    return { error: error.message }
  }

  // Insertar el perfil del usuario con saldo inicial
  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: data.user.id,
      balance: 0, // Saldo inicial
    })

    if (profileError) {
      console.error("Error creating user profile:", profileError.message)
      // Consider deleting the user if profile creation fails
      return { error: "Error al crear el perfil del usuario." }
    }
  }

  return redirect("/auth/login?message=Revisa tu correo para confirmar tu cuenta.")
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Error signing in:", error.message)
    return { error: error.message }
  }

  return redirect("/dashboard")
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect("/auth/login")
}
