import type { LoginForm } from '@/types/AuthForm'
import type { AuthError } from '@supabase/supabase-js'

type FormErrors<T> = {
  [K in keyof T]: T[K][]
}

export const useFormErrors = () => {
  const serverError = ref('')
  const realtimeErrors = ref<FormErrors<LoginForm>>()

  const handleServerError = (error: AuthError) => {
    serverError.value =
      error.message === 'Invalid login credentials' ? 'Invalid email or password' : error.message
  }

  const handleLoginForm = async (formData: LoginForm) => {
    console.log(`handleLoginForm: ${JSON.stringify(formData)}`)

    realtimeErrors.value = {
      email: [],
      password: []
    }

    const { validateEmail, validatePassword } = await import('@/utils/formValidations')

    const emailErrors = validateEmail(formData.email)
    if (emailErrors.length) {
      realtimeErrors.value.email = emailErrors
    }

    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors.length) {
      realtimeErrors.value.password = passwordErrors
    }
  }

  return {
    serverError,
    handleServerError,
    realtimeErrors,
    handleLoginForm
  }
}
