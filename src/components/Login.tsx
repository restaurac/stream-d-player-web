import React, { useState } from 'react'
import './Login.css'

interface LoginProps {
  onLoginSuccess: (token: string) => void
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

  return (
    <div className="login-container">
      <div className="login-gradient-bg"></div>

      <div className="login-card">
        <div className="login-header">
          <h1>Stream D Player</h1>
          <p>Admin Access</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              disabled={loading}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p>Default: admin / admin123</p>
        </div>
      </div>
    </div>
  )
}
