import React, { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { MediaPlayer } from './MediaPlayer'
import { Browser } from './Browser'
import { DownloadManager } from './DownloadManager'
import { StreamingPlaylist } from './StreamingPlaylist'
import { Settings } from './Settings'
import './Dashboard.css'

interface DashboardProps {
  token: string
  onLogout: () => void
}

interface Stats {
  timestamp: number
  speed: number
  latency: number
  dataUsed: number
}

export const Dashboard: React.FC<DashboardProps> = ({ token, onLogout }) => {
  const [stats, setStats] = useState<Stats[]>([])
  const [currentSpeed, setCurrentSpeed] = useState(0)
  const [currentLatency, setCurrentLatency] = useState(0)
  const [totalData, setTotalData] = useState(0)
  const [activeTab, setActiveTab] = useState('browser')

  useEffect(() => {
    // Simular coleta de dados
    const interval = setInterval(() => {
      const newStat: Stats = {
        timestamp: Date.now(),
        speed: Math.random() * 100 + 50,
        latency: Math.random() * 50 + 10,
        dataUsed: Math.random() * 1000 + 500,
      }

      setCurrentSpeed(newStat.speed)
      setCurrentLatency(newStat.latency)
      setTotalData((prev) => prev + newStat.dataUsed)
      setStats((prev) => [...prev.slice(-29), newStat])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Stream D Player</h1>
          <p>Advanced Streaming & Proxy Management</p>
        </div>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'browser' ? 'active' : ''}`}
          onClick={() => setActiveTab('browser')}
        >
          🌐 Browser
        </button>
        <button
          className={`tab ${activeTab === 'player' ? 'active' : ''}`}
          onClick={() => setActiveTab('player')}
        >
          ▶️ Media Player
        </button>
        <button
          className={`tab ${activeTab === 'proxy' ? 'active' : ''}`}
          onClick={() => setActiveTab('proxy')}
        >
          🔒 Proxy Settings
        </button>
        <button
          className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          📊 Statistics
        </button>
        <button
          className={`tab ${activeTab === 'downloads' ? 'active' : ''}`}
          onClick={() => setActiveTab('downloads')}
        >
          ⬇️ Downloads
        </button>
        <button
          className={`tab ${activeTab === 'streaming' ? 'active' : ''}`}
          onClick={() => setActiveTab('streaming')}
        >
          🎬 Streaming
        </button>
        <button
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {activeTab === 'browser' && (
          <div className="tab-content browser-tab">
            <Browser />
          </div>
        )}

        {activeTab === 'player' && (
          <div className="tab-content player-tab">
            <MediaPlayer />
          </div>
        )}

        {activeTab === 'proxy' && (
          <div className="tab-content">
            <h2>Proxy Configuration</h2>
            <div className="proxy-settings">
              <div className="setting-group">
                <label>Proxy Host</label>
                <input type="text" placeholder="proxy.example.com" />
              </div>
              <div className="setting-group">
                <label>Proxy Port</label>
                <input type="number" placeholder="8080" />
              </div>
              <div className="setting-group">
                <label>Username (Optional)</label>
                <input type="text" placeholder="username" />
              </div>
              <div className="setting-group">
                <label>Password (Optional)</label>
                <input type="password" placeholder="password" />
              </div>
              <button className="test-button">Test Connection</button>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="tab-content">
            <h2>Real-time Statistics</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Current Speed</div>
                <div className="stat-value">{currentSpeed.toFixed(2)} Mbps</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Latency</div>
                <div className="stat-value">{currentLatency.toFixed(2)} ms</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Data</div>
                <div className="stat-value">{(totalData / 1024).toFixed(2)} MB</div>
              </div>
            </div>

            {stats.length > 0 && (
              <>
                <div className="chart-container">
                  <h3>Speed Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={stats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="timestamp" stroke="#ffcc00" />
                      <YAxis stroke="#ffcc00" />
                      <Tooltip contentStyle={{ background: '#1a1a1a', border: '2px solid #ffcc00' }} />
                      <Legend />
                      <Line type="monotone" dataKey="speed" stroke="#ffcc00" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container">
                  <h3>Latency Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="timestamp" stroke="#ffcc00" />
                      <YAxis stroke="#ffcc00" />
                      <Tooltip contentStyle={{ background: '#1a1a1a', border: '2px solid #ffcc00' }} />
                      <Legend />
                      <Bar dataKey="latency" fill="#ffcc00" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
               )}
          </div>
        )}

        {activeTab === 'downloads' && (
          <div className="tab-content downloads-tab">
            <DownloadManager />
          </div>
        )}

        {activeTab === 'streaming' && (
          <div className="tab-content streaming-tab">
            <StreamingPlaylist />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="tab-content settings-tab">
            <Settings />
          </div>
        )}
      </div>
    </div>
  )
}