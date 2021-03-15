import React, { useState } from 'react';
import { View } from 'react-native';
import Header from '../components/header';
import { Video } from 'expo-av';

/**
 * This is not functional and not used at all (yet).
 * @param route
 * @param navigation
 */
export default function Playback({route, navigation}) {
    const url = route.params.cameraURL.replace(route.params.viewfile,"/cgi-bin/flv.cgi")
    const [channel, setChannel] = useState(0);
    const [beginDate, setBeginDate] = useState(0);
    const [endDate, setEndDate] = useState(0);

    // 0 is 1970/01/01 0:00:00
    // Thus 2021/03/10, 15:57:40 is 1615391860
    // Aand 2021/03/10, 15:55:48 is 1615391706    
    var dateToday = new Date();
    // Need to divide by 1000 as JS is in milliseconds
    var _begin = Date.parse(dateToday) / 1000;
    _begin += 3600; // for Hungarian timezone
    _begin -= 30; // Watch a video 100 s ago
    var _end = _begin + 10;
    console.log(_begin);

    const chn = 2
    const urlFull = (url + '&mode=time&begin=' + _begin + "&end=" + _end).replace("#CHN#", chn)
    console.log(urlFull)
    
    return (
        <View style={{flex: 1,}}>
            <Header
            title="Visszajátszás"
            />
            <Video
            source={{ uri: (urlFull) }}
            rate={1.0}
            volume={0.0}
            isMuted={true}
            resizeMode="contain"
            shouldPlay
            isLooping
            useNativeControls
            style={{flex: 1}}
            />
        </View>
    )

}