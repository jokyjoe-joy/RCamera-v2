import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, } from 'react-native';
import AppLoading from 'expo-app-loading';
import {ListItem, Thumbnail, Left, Right, Body, Button, Text} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons'; 
import { checkForUpdates } from '../scripts/updateFunctions';

export default function CameraGridList({snapshotURL}) {
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
        let backgroundColor = "#fff"
        
        let Item = ({ item, onPress, style }) => (
            <TouchableOpacity style={[stylesOld.videoContainer, style]}>
            <ListItem thumbnail onPress={onPress}>
                <Left>
                    <Thumbnail square
                    style={{height: 75, width: 75}}
                    source={{ uri: snapshotURL.replace("#CHN#", item.id) }} />
                </Left>
                <Body>
                    <Text style={stylesOld.title}>Kamera {item.id + 1}</Text>
                </Body>
                <Right>
    
                </Right>
              </ListItem>
            </TouchableOpacity>
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
        key={'_'}
        data={camerasData}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedIds}
        />
    )

    async function loadAndGetData() {
        
    }

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
        <View style={{flex: 1}}>
          <View style={stylesOld.listView}>

          {listObject()}
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Button 
              style={{
                  backgroundColor: 'coral',
                  alignSelf: 'center'}} 
              onPress={() => this.viewCamera(this.state.selectedIds)}>
                  <Text>{buttonStartTitle}</Text>
              </Button>
            <TouchableOpacity style={{position: 'absolute', left: '5%',}} onPress={() => checkForUpdates(true)}>
                <MaterialIcons name="system-update" size={42} color="coral" />
            </TouchableOpacity>
          </View>
        </View>
    )
}


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