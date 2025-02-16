import React, { useState, useRef } from 'react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(1);
    const [playlist, setPlaylist] = useState([]);
    const audioRef = useRef(null);

    const tracks = [
        { title: 'Track 1', src: '/path/to/track1.mp3' },
        { title: 'Track 2', src: '/path/to/track2.mp3' },
        { title: 'Track 3', src: '/path/to/track3.mp3' },
    ];

    const playPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        setCurrentTrack((currentTrack + 1) % tracks.length);
    };

    const previousTrack = () => {
        setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length);
    };

    const adjustVolume = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
    };

    const addTrackToPlaylist = (track) => {
        setPlaylist([...playlist, track]);
    };

    const removeTrackFromPlaylist = (index) => {
        setPlaylist(playlist.filter((_, i) => i !== index));
    };

    return (
        <div className="music-player">
            <h1>Music Player</h1>
            <audio ref={audioRef} src={tracks[currentTrack].src} onEnded={nextTrack} />
            <div className="controls">
                <button onClick={previousTrack}>Previous</button>
                <button onClick={playPause}>{isPlaying ? 'Pause' : 'Play'}</button>
                <button onClick={nextTrack}>Next</button>
                <input type="range" min="0" max="1" step="0.01" value={volume} onChange={adjustVolume} />
            </div>
            <div className="playlist">
                <h2>Playlist</h2>
                <ul>
                    {playlist.map((track, index) => (
                        <li key={index}>
                            {track.title}
                            <button onClick={() => removeTrackFromPlaylist(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <div className="add-track">
                    <h3>Add Track</h3>
                    {tracks.map((track, index) => (
                        <button key={index} onClick={() => addTrackToPlaylist(track)}>
                            {track.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const displayMusicPlayer = () => {
    return <MusicPlayer />;
};

export default MusicPlayer;
