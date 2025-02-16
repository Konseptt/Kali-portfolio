import React from 'react'

export default function Spotify() {
    return (
        <iframe 
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/track/64wsC9qC6oFtnHYbDJfsgQ?utm_source=generator" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            title="Spotify"
            className="bg-ub-cool-grey"
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
        ></iframe>
    )
}

export const displaySpotify = () => {
    return <Spotify />
}

export const controlSpotify = (action) => {
    const iframe = document.querySelector('iframe[title="Spotify"]');
    if (!iframe) return;

    const spotifyWindow = iframe.contentWindow;
    if (!spotifyWindow) return;

    switch (action) {
        case 'play':
            spotifyWindow.postMessage({ type: 'play' }, '*');
            break;
        case 'pause':
            spotifyWindow.postMessage({ type: 'pause' }, '*');
            break;
        case 'next':
            spotifyWindow.postMessage({ type: 'next' }, '*');
            break;
        case 'previous':
            spotifyWindow.postMessage({ type: 'previous' }, '*');
            break;
        default:
            console.warn(`Unknown action: ${action}`);
    }
}
