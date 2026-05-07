import React, { useState } from 'react'
import './StreamingPlaylist.css'

interface Channel {
  id: string
  name: string
  category: string
  url: string
  logo?: string
  status: 'online' | 'offline'
}

export const StreamingPlaylist: React.FC = () => {
  const [channels] = useState<Channel[]>([
    {
      id: '1',
      name: 'Sky Sports',
      category: 'Sports',
      url: 'https://example.com/sky-sports',
      status: 'online',
    },
    {
      id: '2',
      name: 'History Channel',
      category: 'Documentary',
      url: 'https://example.com/history',
      status: 'online',
    },
    {
      id: '3',
      name: 'Cinema HD',
      category: 'Movies',
      url: 'https://example.com/cinema',
      status: 'online',
    },
    {
      id: '4',
      name: 'A&X Network',
      category: 'Entertainment',
      url: 'https://example.com/ax',
      status: 'offline',
    },
    {
      id: '5',
      name: 'Discovery',
      category: 'Documentary',
      url: 'https://example.com/discovery',
      status: 'online',
    },
    {
      id: '6',
      name: 'National Geographic',
      category: 'Documentary',
      url: 'https://example.com/natgeo',
      status: 'online',
    },
  ])

  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(channels[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Sports', 'Documentary', 'Movies', 'Entertainment']

  const filteredChannels = channels.filter((channel) => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || channel.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="streaming-playlist">
      <div className="playlist-sidebar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="categories">
          <h4>Categories</h4>
          <div className="category-list">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="channels-list">
          <h4>Channels</h4>
          <div className="channels">
            {filteredChannels.map((channel) => (
              <div
                key={channel.id}
                className={`channel-item ${selectedChannel?.id === channel.id ? 'active' : ''} ${
                  channel.status
                }`}
                onClick={() => setSelectedChannel(channel)}
              >
                <div className="channel-header">
                  <span className="channel-name">{channel.name}</span>
                  <span className={`status-badge ${channel.status}`}>
                    {channel.status === 'online' ? '🔴 Live' : '⚫ Offline'}
                  </span>
                </div>
                <span className="channel-category">{channel.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="playlist-player">
        {selectedChannel ? (
          <>
            <div className="player-header">
              <h2>{selectedChannel.name}</h2>
              <span className={`status-badge large ${selectedChannel.status}`}>
                {selectedChannel.status === 'online' ? '🔴 LIVE' : '⚫ OFFLINE'}
              </span>
            </div>

            <div className="player-container">
              <div className="video-placeholder">
                <div className="placeholder-content">
                  {selectedChannel.status === 'online' ? (
                    <>
                      <p>▶️ Now Playing</p>
                      <p>{selectedChannel.name}</p>
                      <p className="url">{selectedChannel.url}</p>
                    </>
                  ) : (
                    <>
                      <p>⚫ Channel Offline</p>
                      <p>Check back later</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="channel-info">
              <div className="info-card">
                <h4>Channel Information</h4>
                <p>
                  <strong>Name:</strong> {selectedChannel.name}
                </p>
                <p>
                  <strong>Category:</strong> {selectedChannel.category}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`status-text ${selectedChannel.status}`}>
                    {selectedChannel.status.toUpperCase()}
                  </span>
                </p>
                <p>
                  <strong>Stream URL:</strong>
                  <br />
                  <code>{selectedChannel.url}</code>
                </p>
              </div>

              <div className="info-card">
                <h4>Stream Quality</h4>
                <div className="quality-options">
                  <button className="quality-btn active">1080p HD</button>
                  <button className="quality-btn">720p</button>
                  <button className="quality-btn">480p</button>
                  <button className="quality-btn">Auto</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="no-selection">
            <p>Select a channel to start streaming</p>
          </div>
        )}
      </div>
    </div>
  )
}
