import React, { useState, useEffect } from "react";
import { View, StyleSheet, LayoutAnimation, ImageBackground, TouchableOpacity, UIManager, FlatList, Platform} from 'react-native';
import AppLoading from 'expo-app-loading';
import {ListItem, Button, Text} from 'native-base';
import { activateKeepAwake } from 'expo-keep-awake';
import { MaterialIcons } from '@expo/vector-icons'; 
import { checkForUpdates } from "../scripts/updateFunctions";
import VideoPlayer from "./videoPlayer";

export default function CameraGridList({cameraURL, backgroundImageURL}) {
    const [loaded, setLoaded] = useState(false)
    const [buttonStartTitle, setButtonStartTitle] = useState("Kamerák elindítása")
    const [selectedIds, setSelectedIds] = useState('')

    /* create list objects */
    /* creating data for renderItem 
    P.S.: there must be a better way for this
    */
    const camerasData = [
        {id: 0}, {id: 1}, {id: 2}, {id: 3},
        {id: 4}, {id: 5}, {id: 6}, {id: 7},
        {id: 8}
    ]
    
    /* renderItem */
    const renderItem = ({ item }) => { 
        let backgroundColor = ""
        
        let Item = ({ item, style, highlighted }) => (
            <View style={[styles.videoContainer]}>
                    <ListItem thumbnail style={[{borderRadius: 35}, highlighted && style]}>
                        <VideoPlayer 
                        videoURL={cameraURL.replace("#CHN#", item.id)}
                        style={{height: 160, width: 170, borderRadius: 55, marginVertical: 4}}
                        />
                    </ListItem>
            </View>
            );
        
        return (
            <Item
                item={item}
                style={{ backgroundColor }}
                highlighted={true}
            />
        );   
        
    }


    /* init listObject */
    const listObject = () => (
        <FlatList
        key={'#'}
        data={camerasData}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedIds}
        />
    )

    async function loadAndGetData() {
        /* set up animation manager */
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        /* keep awake */
        activateKeepAwake();
    }



    /* refresh animations ? */
    useEffect(() => {
        LayoutAnimation.spring()
    })

    /* change start button title depending on selectedIds */
    useEffect(() => {
        if (selectedIds.length > 1) {
            setButtonStartTitle("Kamerák elindítása")
        } else {
            setButtonStartTitle("Kamera elindítása")
        }
    }, [selectedIds])

    if (!loaded) {
        return <AppLoading
        startAsync={() => loadAndGetData()}
        onFinish={() => setLoaded(true)}
        onError={console.warn}
        /> 
    }

    return (
        <View style={{flex: 1, }}>
          <ImageBackground source={{uri: backgroundImageURL}} style={styles.image}>
            <View style={stylesOld.listView}>

            {listObject()}
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button
                style={{backgroundColor: 'coral',alignSelf: 'center'}} 
                onPress={() => this.viewCamera(this.state.selectedIds)}>
                    <Text>{buttonStartTitle}</Text>
                </Button>
                <TouchableOpacity style={{position: 'absolute', left: '5%',}} onPress={() => checkForUpdates(true)}>
                    <MaterialIcons name="system-update" size={42} color="coral" />
                </TouchableOpacity>

            </View>
          </ImageBackground>
        </View>

    )

}

const styles = StyleSheet.create({
    base: {
        fontSize: 20,
    },
    special: {
        fontSize: 50
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }
})

const stylesOld = StyleSheet.create({
    listView: {
      height: '85%',
      borderBottomWidth: 0.3,
      borderColor: '#444'
    },
    container: {
      flex: 1,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 26,
    },
    videoContainer: {
        paddingTop: 5,
        paddingBottom: 5,
    }
  });