import Header from '../components/header';
import { Video } from 'expo-av';
import { View, StyleSheet, TouchableWithoutFeedback, BackHandler, Image, ImageBackground} from 'react-native';
import React from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import ReactNativeZoomableWithGestures from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

export default class CameraViewer extends React.Component {
    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.navigation = props.navigation
        this.cameraURL = this.props.route.params.cameraURL
        this.backgroundImageURL = this.props.route.params.backgroundImageURL
        this.state = {
            camerasArray: this.props.route.params.camerasArray,
            lastCamerasArray: '0',
            zoomEnabled: false,
        }
    }

    componentDidMount() {
        /* keep awake */
        activateKeepAwake();
        /* backhandler */
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        /* keep awake */
        deactivateKeepAwake()
        /* backhandler */
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if (this.state.camerasArray.length === 1 && this.state.lastCamerasArray.length > 1) {
            this.setState({camerasArray: this.state.lastCamerasArray});
            this.setState({zoomEnabled: false})
            return true;
        }

    }

    showVideo(cameraIndex, style, resizeMode="stretch") {
        return (<TouchableWithoutFeedback style={{flex:1}} onPress={() => {
            this.setState({lastCamerasArray: this.state.camerasArray})
            this.setState({camerasArray: cameraIndex})
            }}>
            <Video
            source={{ uri: this.cameraURL.replace("#CHN#", cameraIndex) }}
            rate={1.0}
            volume={0.0}
            isMuted={true}
            resizeMode={resizeMode}
            shouldPlay
            isLooping
            style={style}
            />
        </TouchableWithoutFeedback>
        )
    }

    onZoomHandler(event, gestureState, zoomableViewEventObject) {
        if (zoomableViewEventObject.zoomLevel === 1) {
            this.setState({zoomEnabled: false})
        }
    }

    render() {

        /* Get all indexes that are passed */
        const cameraIndexes = this.state.camerasArray.split('')

        switch (this.state.camerasArray.length) {
            case 8:
                return (
                    <View style={{flex: 1}}>
                        <Header 
                        title='Kamerák'
                        />
                        <View style={vidStylesEight.row}>
                            <View style={vidStylesEight.column}>
                                {this.showVideo(cameraIndexes[0], vidStylesEight.video)}
                                {this.showVideo(cameraIndexes[1], vidStylesEight.video)}
                                {this.showVideo(cameraIndexes[2], vidStylesEight.video)}
                                {this.showVideo(cameraIndexes[3], vidStylesEight.video)}
    
                            </View>
                            <View style={vidStylesEight.column}>
                                {this.showVideo(cameraIndexes[4], vidStylesEight.video)}
                                {this.showVideo(cameraIndexes[5], vidStylesEight.video)}
                                {this.showVideo(cameraIndexes[6], vidStylesEight.video)}
                                {this.showVideo(cameraIndexes[7], vidStylesEight.video)}
                                
                            </View>
                        </View>
                    </View>
                );
            
            case 7:
                return (
                    <View style={{flex: 1}}>
                        <Header 
                        title='Kamerák'
                        />
                        
                        <View style={vidStylesEight.column}>
                            <View style={vidStylesEight.row}>
                                <View style={vidStylesEight.column}>
                                    {this.showVideo(cameraIndexes[0], vidStylesEight.video)}
                                    {this.showVideo(cameraIndexes[1], vidStylesEight.video)}
                                    {this.showVideo(cameraIndexes[2], vidStylesEight.video)}
                                </View>
                                <View style={vidStylesEight.column}>
                                    {this.showVideo(cameraIndexes[3], vidStylesEight.video)}
                                    {this.showVideo(cameraIndexes[4], vidStylesEight.video)}
                                    {this.showVideo(cameraIndexes[5], vidStylesEight.video)}
                                </View>
                                
                            </View>
                            {this.showVideo(cameraIndexes[6], vidStylesSeven.videoBottom)}
                        </View>
                      
                    </View>
                );
            
            case 6:
                return (
                    <View style={{flex: 1,}}>
                        <Header 
                        title='Kamerák'
                        />
                        <View style={vidStylesFour.row}>
                            {this.showVideo(cameraIndexes[0], vidStylesSix.videoTop)}
                            <View style={vidStylesFour.column}>
                                {this.showVideo(cameraIndexes[1], vidStylesFour.video)}
                                {this.showVideo(cameraIndexes[2], vidStylesFour.video)}
                            </View>
                            <View style={vidStylesFour.column}>
                                {this.showVideo(cameraIndexes[3], vidStylesFour.video)}
                                {this.showVideo(cameraIndexes[4], vidStylesFour.video)}
                            </View>
                            {this.showVideo(cameraIndexes[5], vidStylesSix.videoBottom)}
                        </View>
    
                    </View>
                )

            case 5:
                return (
                    <View style={{flex: 1,}}>
                        <Header 
                        title='Kamerák'
                        />
                        <View style={vidStylesFive.row}>
                            {this.showVideo(cameraIndexes[0], vidStylesFive.videoTop)}
                            <View style={vidStylesFive.column}>
                                {this.showVideo(cameraIndexes[1], vidStylesFive.video)}
                                {this.showVideo(cameraIndexes[2], vidStylesFive.video)}
                            </View>
                            <View style={vidStylesFive.column}>
                                {this.showVideo(cameraIndexes[3], vidStylesFive.video)}
                                {this.showVideo(cameraIndexes[4], vidStylesFive.video)}
                            </View>
                        </View>
    
                    </View>
                )
            
            case 4:
                return (
                    <View style={{flex: 1}}>
                        <Header 
                        title='Kamerák'
                        />
                        <ImageBackground source={{uri: this.backgroundImageURL}} style={styles.image}>
                            <View style={vidStylesFour.row}>
                                <View style={vidStylesFour.column}>
                                    {this.showVideo(cameraIndexes[0], vidStylesFour.video)}
                                    {this.showVideo(cameraIndexes[1], vidStylesFour.video)}
                                </View>
                                <View style={vidStylesFour.column}>
                                    {this.showVideo(cameraIndexes[2], vidStylesFour.video)}
                                    {this.showVideo(cameraIndexes[3], vidStylesFour.video)}
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                )

            case 3:
                return (
                    <View style={{flex: 1}}>
                        <Header 
                        title='Kamerák'
                        />
                        <View style={vidStylesTwo.column}>
                            {this.showVideo(cameraIndexes[0], vidStylesTwo.video)}
                            {this.showVideo(cameraIndexes[1], vidStylesTwo.video)}
                            {this.showVideo(cameraIndexes[2], vidStylesTwo.video)}
                        </View>
    
                    </View>
                )

            case 2:
                return (
                    <View style={{flex: 1}}>
                        <Header 
                        title='Kamerák'
                        />
                        <View style={vidStylesTwo.column}>
                            {this.showVideo(cameraIndexes[0], vidStylesTwo.video)}
                            {this.showVideo(cameraIndexes[1], vidStylesTwo.video)}
                        </View>
    
                    </View>
                )
            
            case 1:
                const cameraIndex = this.state.camerasArray.toString()

                return (
                    <View style={{flex: 1, backgroundColor: '#444'}}>
                        <Header 
                        title="Kamera"
                        />
                        <ImageBackground source={{uri: this.backgroundImageURL}} style={styles.image}>

                        <View style={{flex: 1}}>
                        {/* We need this to put the icon below lower */}
                        </View>
                        <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => {
                                this.setState({zoomEnabled: true});
                                }}>
                                <Fontisto 
                                name="zoom" 
                                size={60} 
                                color="white" 
                                />
                            </TouchableOpacity>
                        </View>
    

                            <GestureRecognizer
                            onSwipeLeft={() => {
                                if (cameraIndex < 8) {
                                    this.setState({camerasArray: (Number(cameraIndex) + 1).toString()})
                                }
                            }}
                            onSwipeRight={() => {
                                if (cameraIndex > 0) {
                                    this.setState({camerasArray: (Number(cameraIndex) - 1).toString()})
                                }
                            }}
                            config={{
                                velocityThreshold: 0.1,
                                directionalOffsetThreshold: 150
                            }}
                            style={{flex: 30,}}>   
                                <ReactNativeZoomableWithGestures
                                maxZoom={1.3}
                                minZoom={1.0}
                                initialZoom={1}
                                bindToBorders={true}
                                style={{flex: 1}}
                                onZoomEnd={(event, gestureState, zoomableViewEventObject) => this.onZoomHandler(event, gestureState, zoomableViewEventObject)}
                                zoomEnabled={this.state.zoomEnabled}
                                >
                                    {this.showVideo(cameraIndex, {flex: 1}, "contain")}
                                </ReactNativeZoomableWithGestures>
    
                            </GestureRecognizer>
                            </ImageBackground>
                      </View>
                )
        }
    }

}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
})

const vidStylesEight = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444',
    },
    column: {
        flexDirection: 'column',
        flex: 1,
        margin: 0,
    },
    video: {
        flex: 1,
        width: '100%',
        height: '100%'
    }
})

const vidStylesSeven = StyleSheet.create({
    videoBottom: {
        width: '100%',
        height: 198,
    }
})

const vidStylesSix = StyleSheet.create({
    videoTop: {
        width: '100%',
        height: 198,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0
    },
    videoBottom: {
        width: '100%',
        height: 198,
        position: 'absolute',
        left: 0,
        bottom: 0
    }
})

const vidStylesFive = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'flex-end',
        backgroundColor: '#444',
    },
    column: {
        flexDirection: 'column',
        flex: 1,
    },
    videoTop: {
        width: '100%',
        height: 300,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    video: {
        width: 198,
        height: 230,
    }
})

const vidStylesFour = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
    },
    column: {
        flexDirection: 'column',
        flex: 1,
    },
    video: {
        width: 198,
        height: 198,
    }
})


const vidStylesTwo = StyleSheet.create({
    column: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#444',
    },
    video: {
        flex: 1,
    }
})
