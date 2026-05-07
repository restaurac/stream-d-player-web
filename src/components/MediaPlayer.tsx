import React, { useState, useRef, useEffect } from 'react'
import './MediaPlayer.css'

interface Playlist {
  id: string
  title: string
  url: string
  duration: number
}

export const MediaPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [playlist, setPlaylist] = useState<Playlist[]>([
    {
      id: '1',
      title: 'Sample Video 1',
      url: 'https://example.com/video1.mp4',
      duration: 0,
    },
    {
      id: '2',
      title: 'Sample Video 2',
      url: 'https://example.com/video2.mp4',
      duration: 0,
    },
  ])
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value)
    setVolume(vol)
    if (videoRef.current) {
      videoRef.current.volume = vol
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="media-player-container">
      <div className="player-wrapper">
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="video-element"
        />

        <div className="player-controls">
          <div className="progress-bar">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="progress-input"
            />
          </div>

          <div className="controls-bottom">
            <div className="left-controls">
              <button onClick={handlePlayPause} className="control-button">
                {isPlaying ? '⏸' : '▶'}
              </button>
              <div className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="right-controls">
              <div className="volume-control">
                <span>🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-input"
                />
              </div>
              <button onClick={handleFullscreen} className="control-button">
                {isFullscreen ? '⛶' : '⛶'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="playlist-section">
        <h3>Playlist</h3>
        <div className="playlist">
          {playlist.map((item, index) => (
            <div
              key={item.id}
              className={`playlist-item ${index === currentTrack ? 'active' : ''}`}
              onClick={() => setCurrentTrack(index)}
            >
              <span className="item-number">{index + 1}</span>
              <span className="item-title">{item.title}</span>
              <span className="item-duration">{formatTime(item.duration)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
