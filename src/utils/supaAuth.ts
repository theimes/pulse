import { supabase } from '@/lib/supabaseClient'
import { useAuthStore } from '@/stores/auth'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'

const authStore = useAuthStore()

export const register = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password
  })

  if (error) {
    console.error('Error registering user', error)
    return false
  }

  console.log(`data: ${JSON.stringify(data)}, error: ${error}`)

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.username,
      full_name: formData.first_name.concat(' ') + ' ' + formData.last_name
    })
    if (error) {
      console.error('Error inserting data into profiles table', error)
      return false
    }
  }
  await authStore.setAuth(data.session)
  return true
}

export const login = async (formData: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  if (error) {
    console.error('Error signing in', error)
    return false
  } else {
    console.log('Signed in successfully')
    await authStore.setAuth(data.session)
    return true
  }
}