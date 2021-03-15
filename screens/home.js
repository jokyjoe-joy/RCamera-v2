import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Container } from 'native-base';
import Header from '../components/header';
import CameraList from '../components/cameraList';
import Drawer from 'react-native-drawer';
import Menu from '../components/menu';
import GestureRecognizer from 'react-native-swipe-gestures';
import AppLoading from 'expo-app-loading';
import EXPCameraList from '../components/cameraGridList';
import CameraRowList from '../components/cameraRowList';
import { setSecureStorage, getSecureStorage } from '../scripts/storageFunctions';

export default function Home({route, navigation}) {
    const [gridMode, setGridMode] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [experimental, setExperimental] = useState(false)

    const viewCamera = (channels) => {
        /* In case no channels are selected */
        if (channels.length < 1) {
            Alert.alert('Hoppá!', 'Egy kamerát sem jelöltél ki. Kérlek próbáld újra.', [{
                text: 'Rendben'
            }])
        } else {
            navigation.navigate('CameraViewer', {camerasArray: channels})
        }

    }

    /* Grid mode button handler */
    async function gridModeHandler() {
        setSecureStorage('gridMode', !gridMode)
        setGridMode(!gridMode)
    }

    /* Loading */
    async function loadAndGetData() {
        /* check if in grid mode in storage */
        await getSecureStorage('gridMode').then((result) => {
            if (result.toString() === true.toString()) {
                setGridMode(true)
            }
        })

        await getSecureStorage('experimental').then((result) => {
            if (result.toString() === true.toString()) {
                setExperimental(result)
            }
        })
    }

    /* Experimental switch */
    function experimentalSwitchHandler() {
        console.log('calling exp handler')
        console.log(experimental)
        if (!experimental) {
            Alert.alert('Biztosan át akarod állítani a programot kísérleti módra?',
            'A kísérleti mód alatt a program könnyen összeomolhat, és feltehetően lassú lehet. A programot bármikor visszaállíthatod az eredeti módra, ugyanerre a képre kattintva.', 
            [
                {text: 'Igen', onPress: () => {
                    setSecureStorage('experimental', true)
                    setExperimental(true)
                }},
                {text: 'Nem'}
            ])
        } else {
            setSecureStorage('experimental', false)
            setExperimental(false)
        }
    }

    /* Checking which list we have turned on and returning it */
    function cameraList() {
        if (experimental && gridMode) {
            return <EXPCameraList 
                    cameraURL={route.params.cameraURL}
                    backgroundImageURL={route.params.backgroundImageURL}
                    />;
        } else if (experimental && !gridMode) {
            return <CameraRowList
                    snapshotURL={route.params.snapshotURL}
                    />;
        } else {
            return <CameraList
                gridMode={gridMode}
                experimental={false}
                viewCamera={(val) => viewCamera(val)} 
                cameraURL={route.params.cameraURL}
                snapshotfile={route.params.snapshotfile}
                viewfile={route.params.viewfile}
                backgroundImageURL={route.params.backgroundImageURL}
                />;
        }
    }

    /* Load */
    if (!loaded) {
        return <AppLoading
                startAsync={() => loadAndGetData()}
                onFinish={() => setLoaded(true)}
                onError={console.warn}
        />
    }

    /* Return screen */
    return (
        <Drawer
        ref={(ref) => _drawer = ref}
        content={<Menu 
            logOut={() => route.params.logOut()} 
            closeSelf={() => _drawer.close()}
            menu1Title={route.params.custombutton1}
            menu1Function={() => viewCamera(route.params.custombutton1cameras)}
            menu2Title={route.params.custombutton2}
            menu2Function={() => viewCamera(route.params.custombutton2cameras)}
            menu3Title={route.params.custombutton3}
            menu3Function={() => viewCamera(route.params.custombutton3cameras)}
            menu4Title={route.params.custombutton4}
            menu4Function={() => viewCamera(route.params.custombutton4cameras)}
            menu5Title={route.params.custombutton5}
            menu5Function={() => viewCamera(route.params.custombutton5cameras)}
            navigation={navigation}
            experimentalSwitchHandler={() => experimentalSwitchHandler()}
            experimental={experimental}
            />}
        type="static"
        openDrawerOffset={0.35}
        styles={{
            drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3}, 
            main: {paddingLeft: 0},}}
        tapToClose={true}
        tweenHandler={Drawer.tweenPresets.parallax}
        >
            <GestureRecognizer
            onSwipeRight={() => {
                _drawer.open()
            }}
            config={{
                velocityThreshold: 0.4,
                directionalOffsetThreshold: 350
            }}
            style={{flex: 1,}}>
                <Container style={{flex: 1,}}>
                    <Header 
                    title='Főoldal'
                    leftIconName='menu'
                    leftIconOnPress={() => _drawer.open()}
                    rightIconName='grid-view'
                    rightIconOnPress={() => gridModeHandler()}
                    />
        
                    {cameraList()}
                </Container>
            </GestureRecognizer>
        </Drawer>
    )
}