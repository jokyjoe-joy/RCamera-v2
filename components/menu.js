import React from "react";
import { Text } from 'native-base';
import { View, TouchableOpacity, StyleSheet, Image, FlatList } from "react-native";
import Constants from 'expo-constants';

export default class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.navigation = props.navigation
        this.closeSelf = props.closeSelf
        this.logOut = props.logOut
        this.menu1Function = props.menu1Function
        this.menu2Function = props.menu2Function
        this.menu3Function = props.menu3Function
        this.menu4Function = props.menu4Function
        this.menu5Function = props.menu5Function
        this.menu1Title = props.menu1Title
        this.menu2Title = props.menu2Title
        this.menu3Title = props.menu3Title
        this.menu4Title = props.menu4Title
        this.menu5Title = props.menu5Title
        this.experimentalSwitchHandler = props.experimentalSwitchHandler
        this.experimental = props.experimental
    }

    goToSettings() {
        this.navigation.navigate('Settings', {experimental: this.experimental})
    }

    UNSAFE_componentWillReceiveProps(props) {
        /* Is there a better way to do this? */
        this.experimental = props.experimental
        /* the one below is needed as the state changes in home.js */
        this.experimentalSwitchHandler = props.experimentalSwitchHandler
    }

    experimentalPlayback() {
        if (this.experimental) {
            return (
                <TouchableOpacity onPress={() => this.navigation.navigate('Playback')} style={styles.menuRowBottomUp2}>
                    <Text style={styles.menuTextBottom}>Visszajátszás</Text>
                </TouchableOpacity>
            )
        } else {
            return null;
        }

    }

    render() {
        const DATA = [
            {
                id: 1,
                title: this.menu1Title,
                pressFunction: this.menu1Function
            },
            {
                id: 2,
                title: this.menu2Title,
                pressFunction: this.menu2Function
            },
            {
                id: 3,
                title: this.menu3Title,
                pressFunction: this.menu3Function
            },
            {
                id: 4,
                title: this.menu4Title,
                pressFunction: this.menu4Function
            },
            {
                id: 5,
                title: this.menu5Title,
                pressFunction: this.menu5Function
            },
        ]

        const renderItem = ({item}) => {
            /* if undefined function return null */
            if (item.pressFunction === undefined) {
                return null;
            }

            return (
                <TouchableOpacity onPress={() => item.pressFunction()} style={styles.menuRow}>
                    <Text style={styles.menuText} adjustsFontSizeToFit numberOfLines={1}>{item.title}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.wrapper}>

                <TouchableOpacity onPress={() => this.experimentalSwitchHandler()}>
                    <Image
                    style={styles.logo}
                    resizeMode='contain'
                    source={require('../assets/icon.png')}
                    />
                </TouchableOpacity>

                
                <View style={{flex: 1}}>
                    {/* Version text */}

                    <Text style={styles.versionText}>
                    {`${Constants.manifest.name}\nJelenlegi verzió: v${Constants.manifest.version} @ ${Constants.manifest.releaseChannel}`}
                    </Text>

                    {/* Rows */}

                    <FlatList 
                    data={DATA} 
                    renderItem={renderItem} 
                    keyExtractor={item => item.id.toString()}
                    
                    />

                    {/* Bottom buttons */}
                    

                    {this.experimentalPlayback()}
                    
                    <TouchableOpacity onPress={() => this.goToSettings()} style={styles.menuRowBottomUp}>
                        <Text style={styles.menuTextBottom} adjustsFontSizeToFit numberOfLines={1}>Beállítások</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.logOut()} style={styles.menuRowBottom}>
                        <Text style={styles.menuTextBottom} adjustsFontSizeToFit numberOfLines={1}>Kijelentkezés</Text>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }

}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1, 
        flexDirection: 'column', 
        backgroundColor: '#ff926a',
        borderRightWidth: 1.2, 
        borderColor: '#444',

    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 40,
        alignSelf: 'center'
    },
    menuRow: {
        borderBottomWidth: 0.8,
        borderColor: '#fff',
        marginVertical: 15,
        alignSelf: 'center',
        width: '80%'
    },
    menuRowBottomUp: {
        borderTopWidth: 0.8,
        borderColor: '#fff',
        marginVertical: 15,
        position: 'absolute',
        bottom: '10%',
        width: '100%'
    },
    menuRowBottomUp2: {
        borderTopWidth: 0.8,
        borderColor: '#fff',
        marginVertical: 15,
        position: 'absolute',
        bottom: '20%',
        width: '100%'
    },
    menuRowBottom: {
        borderTopWidth: 0.8,
        borderColor: '#fff',
        marginVertical: 15,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    menuText: {
        fontSize: 32,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Roboto_light',
        letterSpacing: 5,
    },
    menuTextBottom: {
        fontSize: 32,
        letterSpacing: 4,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Roboto'
    },
    versionText: {
        textAlign: 'center',
        fontSize: 8,
        color: 'white',
        letterSpacing: 1.7,
        fontFamily: 'Roboto_light',
        marginBottom: 15,
    }
})