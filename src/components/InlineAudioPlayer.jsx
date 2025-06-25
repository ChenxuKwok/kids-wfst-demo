import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InlineAudioPlayer = ({ 
  audioSrc, 
  title = "Audio Sample",
  showDownload = true,
  showTitle = true,
  compact = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * duration;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioSrc;
    link.download = title.replace(/\s+/g, '_').toLowerCase() + '.mp3';
    link.click();
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (compact) {
    // Compact version for table cells
    return (
      <div className="flex items-center gap-2 min-w-[200px]">
        <audio ref={audioRef} src={audioSrc} preload="metadata" />
        
        <Button
          size="sm"
          variant="outline"
          onClick={togglePlay}
          disabled={isLoading}
          className="h-8 w-8 p-0 flex-shrink-0"
        >
          {isLoading ? (
            <div className="w-3 h-3 border border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause size={14} />
          ) : (
            <Play size={14} />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          {showTitle && (
            <div className="text-xs font-medium text-gray-700 truncate mb-1">
              {title}
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <div 
              className="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer relative"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-150"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            <span className="text-xs text-gray-500 font-mono">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {showDownload && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDownload}
            className="h-6 w-6 p-0 flex-shrink-0"
          >
            <Download size={12} />
          </Button>
        )}
      </div>
    );
  }

  // Full version for regular use
  return (
    <div className="bg-gray-50 rounded-lg p-4 border">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      
      {showTitle && (
        <h4 className="font-medium text-gray-800 mb-3">{title}</h4>
      )}

      <div className="flex items-center gap-3">
        <Button
          onClick={togglePlay}
          disabled={isLoading}
          className="h-10 w-10 rounded-full"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause size={16} />
          ) : (
            <Play size={16} />
          )}
        </Button>

        <div className="flex-1">
          <div 
            className="h-2 bg-gray-300 rounded-full cursor-pointer mb-2 relative"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="h-8 w-8 p-0"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </Button>

        {showDownload && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="h-8 w-8 p-0"
          >
            <Download size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default InlineAudioPlayer;

