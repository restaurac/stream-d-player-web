import React, { useState } from 'react'
import './Settings.css'

interface SettingsProps {
  onSettingsSaved?: () => void
}

export const Settings: React.FC<SettingsProps> = ({ onSettingsSaved }) => {
  const [activeTab, setActiveTab] = useState('security')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    // Validações
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'Todos os campos são obrigatórios' })
      return
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Nova senha deve ter pelo menos 6 caracteres' })
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas não correspondem' })
      return
    }

    if (currentPassword === newPassword) {
      setMessage({ type: 'error', text: 'Nova senha deve ser diferente da atual' })
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ type: 'success', text: 'Senha alterada com sucesso!' })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        if (onSettingsSaved) {
          setTimeout(onSettingsSaved, 2000)
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Erro ao alterar senha' })
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Erro de conexão: ' + error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Configurações</h2>
        <p>Gerencie as configurações do aplicativo</p>
      </div>

      <div className="settings-tabs">
        <button
          className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          🔒 Segurança
        </button>
        <button
          className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          ⚙️ Geral
        </button>
        <button
          className={`settings-tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          ℹ️ Sobre
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'security' && (
          <div className="settings-section">
            <h3>Segurança</h3>

            <div className="settings-card">
              <h4>Alterar Senha de Admin</h4>
              <p className="description">
                Altere sua senha de administrador para manter o app seguro
              </p>

              <form onSubmit={handleChangePassword} className="password-form">
                <div className="form-group">
                  <label htmlFor="current-password">Senha Atual</label>
                  <input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Digite sua senha atual"
                    disabled={loading}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-password">Nova Senha</label>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Digite a nova senha (mínimo 6 caracteres)"
                    disabled={loading}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-password">Confirmar Senha</label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme a nova senha"
                    disabled={loading}
                    required
                  />
                </div>

                {message && (
                  <div className={`message ${message.type}`}>
                    {message.type === 'success' ? '✅' : '❌'} {message.text}
                  </div>
                )}

                <button type="submit" disabled={loading} className="save-button">
                  {loading ? 'Alterando...' : 'Alterar Senha'}
                </button>
              </form>

              <div className="security-tips">
                <h5>💡 Dicas de Segurança:</h5>
                <ul>
                  <li>Use uma senha forte com letras, números e símbolos</li>
                  <li>Não compartilhe sua senha com ninguém</li>
                  <li>Altere sua senha regularmente</li>
                  <li>Use senhas diferentes para cada aplicativo</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'general' && (
          <div className="settings-section">
            <h3>Configurações Gerais</h3>

            <div className="settings-card">
              <h4>Preferências do Aplicativo</h4>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Tema</label>
                  <p>Escolha entre tema claro ou escuro</p>
                </div>
                <select className="setting-select">
                  <option>Automático</option>
                  <option>Claro</option>
                  <option>Escuro</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Notificações</label>
                  <p>Receber notificações de downloads e streams</p>
                </div>
                <input type="checkbox" defaultChecked className="setting-checkbox" />
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Iniciar com o Sistema</label>
                  <p>Abrir o app automaticamente ao iniciar o computador</p>
                </div>
                <input type="checkbox" className="setting-checkbox" />
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Cache Automático</label>
                  <p>Limpar cache automaticamente ao fechar</p>
                </div>
                <input type="checkbox" defaultChecked className="setting-checkbox" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="settings-section">
            <h3>Sobre o Aplicativo</h3>

            <div className="settings-card about-card">
              <div className="about-header">
                <h4>Stream D Player</h4>
                <p className="version">v1.0.0</p>
              </div>

              <p className="about-description">
                Um app desktop profissional multi-plataforma com navegador integrado, VPN privada,
                media player e gerenciador de streaming.
              </p>

              <div className="about-features">
                <h5>Funcionalidades:</h5>
                <ul>
                  <li>🌐 Navegador integrado com proxy HTTPS</li>
                  <li>🔒 VPN privada configurável</li>
                  <li>▶️ Media player profissional</li>
                  <li>⬇️ Download manager otimizado</li>
                  <li>🎬 Streaming de canais</li>
                  <li>📊 Dashboard com gráficos em tempo real</li>
                </ul>
              </div>

              <div className="about-info">
                <p>
                  <strong>Desenvolvido com:</strong> Electron, React, TypeScript, Vite
                </p>
                <p>
                  <strong>Plataformas:</strong> Windows, macOS, Linux
                </p>
                <p>
                  <strong>Licença:</strong> MIT
                </p>
              </div>

              <div className="about-links">
                <a href="#" className="about-link">
                  📖 Documentação
                </a>
                <a href="#" className="about-link">
                  🐛 Reportar Bug
                </a>
                <a href="#" className="about-link">
                  💬 Suporte
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
