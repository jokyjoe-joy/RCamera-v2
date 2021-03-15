import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, ImageBackground } from "react-native";
import {ListItem, Thumbnail, Left, Right, Body, Text, Button } from 'native-base';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AppLoading from 'expo-app-loading';
import { Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons'; 
import { checkForUpdates } from '../scripts/updateFunctions';

export default class CameraList extends React.Component {
  constructor(props) {
    super(props)
    this.viewCamera = props.viewCamera
    this.gridMode = props.gridMode
    this.experimental = props.experimental
    this.snapshotfile = props.snapshotfile
    this.cameraURL = props.cameraURL
    this.viewfile = props.viewfile
    this.backgroundImageURL = props.backgroundImageURL
    this.state = {
      selectedIds: '',
      loaded: false,
    }
  }

  UNSAFE_componentWillReceiveProps(props) {
    this.gridMode = props.gridMode
    this.experimental = props.experimental
  }
  
  async loadAndGetData() {
    
  }


  DATA = [
    {
      id: 0,
      title: "Csatorna 1",
    },
    {
      id: 1,
      title: "Csatorna 2",
    },
    {
      id: 2,
      title: "Csatorna 3",
    },
    {
      id: 3,
      title: "Csatorna 4",
    },
    {
      id: 4,
      title: "Csatorna 5",
    },
    {
      id: 5,
      title: "Csatorna 6",
    },
    {
      id: 6,
      title: "Csatorna 7",
    },
    {
      id: 7,
      title: "Csatorna 8",
    },
    {
      id: 8,
      title: "Csatorna 9",
    },
  ];
  
  getChannelSnapshotURL(channel) {
      return(this.cameraURL.replace(this.viewfile, this.snapshotfile).replace("#CHN#", channel))
    }

  render() {
    if (!this.state.loaded) {
      return <AppLoading
      startAsync={() => this.loadAndGetData()}
      onFinish={() => this.setState({loaded: true})}
      onError={console.warn}
      /> 
    }

    /* init */
    let Item = ''
    let listObject = ''
    let textObject = '' // see later below

    /* Check if in grid mode and return either grid style flatlist 
    or return list style flatlist object*/
    if (this.gridMode && !this.experimental) {
      listObject = () => (
        <FlatList
        key={'#'}
        data={this.DATA}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        extraData={this.state.selectedIds}
        />
      )
    } else if (this.gridMode && this.experimental) {
      listObject = () => (
        <FlatList
        key={'#'}
        data={this.DATA}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        extraData={this.state.selectedIds}
        />
      )
    } else {
      listObject = () => (
        <FlatList
        key={'_'}
        data={this.DATA}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={(item) => item.id.toString()}
        extraData={this.state.selectedIds}
        />
      )
    }


    /* check how many cameras are selected and change the button text accordingly */
    if (this.state.selectedIds.length > 1) {
      textObject = () => (
        <Text>Kamerák elindítása</Text>
      )
    } else {
      textObject = () => (
        <Text>Kamera elindítása</Text>
      )
    }

    const renderItem = ({ item }) => {
      /* If selected, change background color, else use default */
      let backgroundColor;
      let blurRadiusThumbnail
      if (this.state.selectedIds.includes(item.id)) {
          backgroundColor = '#ffb79d'
          blurRadiusThumbnail = 1
      } else {
          backgroundColor = ""
          blurRadiusThumbnail = 0
      }
      
      if (this.gridMode && !this.experimental) {
        Item = ({ item, onPress, style, blurRadiusThumbnail }) => (
          <View style={[styles.videoContainer]}>
              <TouchableWithoutFeedback onPress={onPress} style={{flex: 1}}>
              
              <ListItem thumbnail style={[{borderRadius: 35},style]}>
                  <Thumbnail square
                  style={{height: 160, width: 170, borderRadius: 55}}
                  source={{ uri: this.getChannelSnapshotURL(item.id)}} />
              
              </ListItem>
  
            </TouchableWithoutFeedback>
          </View>
        );
      } else if (this.gridMode && this.experimental) {
        Item = ({ item, onPress, style, blurRadiusThumbnail }) => (
          <View style={[styles.videoContainer]}>
              <TouchableWithoutFeedback onPress={onPress} style={{flex: 1}}>
              
              <ListItem thumbnail style={[{borderRadius: 35},style]}>
                <Video
                source={{ uri: this.cameraURL.replace("#CHN#", item.id) }}
                rate={1.0}
                volume={0.0}
                isMuted={true}
                resizeMode="stretch"
                shouldPlay
                isLooping
                style={{height: 160, width: 170, borderRadius: 55}}
                />
              </ListItem>
  
            </TouchableWithoutFeedback>
          </View>
        );
      } else {
        Item = ({ item, onPress, style }) => (
          <TouchableOpacity style={[styles.videoContainer, style]}>
          <ListItem thumbnail onPress={onPress}>
              <Left>
                  <Thumbnail square
                  style={{height: 75, width: 75}}
                  source={{ uri: this.getChannelSnapshotURL(item.id)}} />
              </Left>
              
              <Body>
                  <Text style={styles.title}>{item.title}</Text>
              </Body>
              
              <Right></Right>
            </ListItem>
          </TouchableOpacity>
        );
      }

      return (
        <Item
          item={item}
          onPress={() => {
              if (this.state.selectedIds.includes(item.id)) {
                /* Remove item if already in list */
                  this.setState({selectedIds: this.state.selectedIds.replace(item.id, '')})
              } else {
                /* Add item if there are less than 8 items selected */
                  if (this.state.selectedIds.length < 8) {
                    this.setState({selectedIds: this.state.selectedIds + item.id});
                  }

              }
          }}
          style={{ backgroundColor }}
          blurRadiusThumbnail={blurRadiusThumbnail}
        />
      );
    };

    return (
        <View style={{flex: 1}}>
          <ImageBackground source={{uri: this.backgroundImageURL}} style={styles.image}>
            <View style={styles.listView}>

            {listObject()}
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button style={{
                  backgroundColor: 'coral',
                  alignSelf: 'center'}} onPress={() => this.viewCamera(this.state.selectedIds)}>
                    {textObject()}
                </Button>
                <TouchableOpacity style={{position: 'absolute', left: '5%',}} onPress={() => checkForUpdates(true)}>
                  <MaterialIcons name="system-update" size={42} color="coral" />
                </TouchableOpacity>

            </View>
          </ImageBackground>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  listView: {
    height: '85%',
    borderBottomWidth: 0.3,
    borderColor: '#444',
    marginRight: 5,
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
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});