const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  setTimeout(() => {
    if (username === 'admin' && password === 'admin123') {
      const fakeToken = 'admin-token-123'
      localStorage.setItem('authToken', fakeToken)
      onLoginSuccess(fakeToken)
    } else {
      setError('Usuário ou senha inválidos')
    }

    setLoading(false)
  }, 500)
}
