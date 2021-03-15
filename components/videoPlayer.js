import React, { useState, useRef, useEffect } from 'react';
import { Video } from 'expo-av';

export default function VideoPlayer({videoURL, style}) {
    const camera = useRef(null);
    const [reRenderKey, setRerenderKey] = useState(912572)
    const [status, setStatus] = useState({})

    useEffect(() => {

        if (!status.isLoaded) {
            
            console.log('not loaded')
        }

    }, [status])

    return (
        <Video
        key={reRenderKey}
        ref={camera}
        source={{ uri: videoURL }}
        rate={1.0}
        volume={0.0}
        isMuted={true}
        resizeMode="stretch"
        shouldPlay
        isLooping
        style={style}
        onPlaybackStatusUpdate={status => setStatus(status)}
        //onError={() => setRerenderKey(Math.random())}
        />
    )

}