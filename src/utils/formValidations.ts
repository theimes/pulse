export const validateEmail = (email: string) => {
  console.log(`validateEmail: ${email}`)
  const trimmedEmail = email.trim()

  if (!trimmedEmail) {
    return []
  }

  const errors = []

  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
  const isValidEmailFormat = emailRegex.test(trimmedEmail)

  if (!isValidEmailFormat) {
    errors.push('Invalid email format')
  }

  return errors
}

export const validatePassword = (password: string) => {
  const trimmedPassword = password.trim()

  if (!trimmedPassword) {
    return []
  }

  const errors = []

  if (trimmedPassword.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  const isValidPasswordFormat = passwordRegex.test(trimmedPassword)

  if (!isValidPasswordFormat) {
    errors.push('Password must contain at least 1 letter and 1 number')
  }

  return errors
}
