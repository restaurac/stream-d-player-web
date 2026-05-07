import React, { useState, useRef } from 'react'
import './Browser.css'

export const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://www.google.com')
  const [history, setHistory] = useState<string[]>(['https://www.google.com'])
  const [historyIndex, setHistoryIndex] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleNavigate = (newUrl: string) => {
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
      newUrl = 'https://' + newUrl
    }

    setUrl(newUrl)
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newUrl)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setUrl(history[historyIndex - 1])
    }
  }

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setUrl(history[historyIndex + 1])
    }
  }

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = url
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleNavigate(url)
  }

  return (
    <div className="browser-container">
      <div className="browser-toolbar">
        <div className="toolbar-buttons">
          <button
            onClick={handleBack}
            disabled={historyIndex === 0}
            className="toolbar-button"
            title="Back"
          >
            ◀
          </button>
          <button
            onClick={handleForward}
            disabled={historyIndex === history.length - 1}
            className="toolbar-button"
            title="Forward"
          >
            ▶
          </button>
          <button onClick={handleRefresh} className="toolbar-button" title="Refresh">
            ⟳
          </button>
        </div>

        <form onSubmit={handleSubmit} className="address-bar-form">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="address-bar"
            placeholder="Enter URL..."
          />
          <button type="submit" className="go-button">
            Go
          </button>
        </form>

        <div className="toolbar-info">
          <span className="connection-status">🔒 Proxy: Active</span>
        </div>
      </div>

      <div className="browser-content">
        <iframe
          ref={iframeRef}
          src={url}
          className="browser-iframe"
          title="Web Browser"
        />
      </div>

      <div className="browser-footer">
        <span>Connected via HTTPS Proxy</span>
      </div>
    </div>
  )
}
