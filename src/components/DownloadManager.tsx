import React, { useState } from 'react'
import './DownloadManager.css'

interface Download {
  id: string
  filename: string
  url: string
  progress: number
  speed: number
  status: 'downloading' | 'completed' | 'paused' | 'error'
  size: number
  downloaded: number
  timeRemaining: number
}

export const DownloadManager: React.FC = () => {
  const [downloads, setDownloads] = useState<Download[]>([
    {
      id: '1',
      filename: 'video-sample.mp4',
      url: 'https://example.com/video.mp4',
      progress: 75,
      speed: 5.2,
      status: 'downloading',
      size: 500,
      downloaded: 375,
      timeRemaining: 45,
    },
    {
      id: '2',
      filename: 'document.pdf',
      url: 'https://example.com/doc.pdf',
      progress: 100,
      speed: 0,
      status: 'completed',
      size: 25,
      downloaded: 25,
      timeRemaining: 0,
    },
  ])
  const [newUrl, setNewUrl] = useState('')

  const handleAddDownload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUrl) return

    const filename = newUrl.split('/').pop() || 'download'
    const newDownload: Download = {
      id: Date.now().toString(),
      filename,
      url: newUrl,
      progress: 0,
      speed: 0,
      status: 'downloading',
      size: 0,
      downloaded: 0,
      timeRemaining: 0,
    }

    setDownloads([...downloads, newDownload])
    setNewUrl('')
  }

  const handlePause = (id: string) => {
    setDownloads(
      downloads.map((d) =>
        d.id === id ? { ...d, status: d.status === 'paused' ? 'downloading' : 'paused' } : d
      )
    )
  }

  const handleCancel = (id: string) => {
    setDownloads(downloads.filter((d) => d.id !== id))
  }

  const formatSize = (mb: number) => {
    if (mb > 1024) return (mb / 1024).toFixed(2) + ' GB'
    return mb.toFixed(2) + ' MB'
  }

  const formatSpeed = (mbps: number) => {
    return mbps.toFixed(2) + ' MB/s'
  }

  const formatTime = (seconds: number) => {
    if (seconds < 60) return seconds + 's'
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm'
    return Math.floor(seconds / 3600) + 'h'
  }

  const totalProgress =
    downloads.length > 0
      ? Math.round(downloads.reduce((sum, d) => sum + d.progress, 0) / downloads.length)
      : 0

  return (
    <div className="download-manager">
      <div className="download-header">
        <h3>Download Manager</h3>
        <div className="overall-stats">
          <span>Total Progress: {totalProgress}%</span>
        </div>
      </div>

      <form onSubmit={handleAddDownload} className="download-form">
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Enter download URL..."
          className="download-input"
        />
        <button type="submit" className="download-button">
          ⬇️ Add Download
        </button>
      </form>

      <div className="downloads-list">
        {downloads.map((download) => (
          <div key={download.id} className={`download-item ${download.status}`}>
            <div className="download-info">
              <div className="download-name">
                <span className="status-icon">
                  {download.status === 'downloading' && '⬇️'}
                  {download.status === 'completed' && '✅'}
                  {download.status === 'paused' && '⏸'}
                  {download.status === 'error' && '❌'}
                </span>
                <span className="filename">{download.filename}</span>
              </div>

              <div className="download-details">
                <span className="size">
                  {formatSize(download.downloaded)} / {formatSize(download.size)}
                </span>
                {download.status === 'downloading' && (
                  <>
                    <span className="speed">{formatSpeed(download.speed)}</span>
                    <span className="time-remaining">{formatTime(download.timeRemaining)}</span>
                  </>
                )}
              </div>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${download.progress}%` }} />
              </div>

              <div className="download-controls">
                {download.status !== 'completed' && download.status !== 'error' && (
                  <button
                    onClick={() => handlePause(download.id)}
                    className="control-btn pause-btn"
                  >
                    {download.status === 'paused' ? '▶' : '⏸'}
                  </button>
                )}
                <button onClick={() => handleCancel(download.id)} className="control-btn cancel-btn">
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {downloads.length === 0 && (
        <div className="empty-state">
          <p>No downloads yet</p>
          <p>Add a URL above to start downloading</p>
        </div>
      )}
    </div>
  )
}
