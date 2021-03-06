import React, { useState } from 'react';
import { View, Alert, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Form, Item, Input, Label, CheckBox, Picker, Icon } from 'native-base';
import Header from '../components/header';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {setSecureStorage, resetStorage } from '../scripts/storageFunctions';

export default function Settings({navigation, route}) {
    /* basic useStates */
    const [loaded, setLoaded] = useState(false)
    const [saved, setSaved] = useState(true)

    /* sensitive info useStates */
    const [editableSensitiveInfo, setEditableSensitiveInfo] = useState(false)
    const [username, setUsername] = useState(route.params.username)
    const [password, setPassword] = useState(route.params.password)
    const [urlad, setUrlad] = useState(route.params.urlad)
    const [viewfile, setViewfile] = useState(route.params.viewfile)
    const [snapshotfile, setSnapshotfile] = useState(route.params.snapshotfile)
    const [parameters, setParameters] = useState(route.params.parameters)

    /* custom menu buttons useStates */
    const [customButton1, setCustomButton1] = useState(route.params.custombutton1)
    const [customButton2, setCustomButton2] = useState(route.params.custombutton2)    
    const [customButton3, setCustomButton3] = useState(route.params.custombutton3)    
    const [customButton4, setCustomButton4] = useState(route.params.custombutton4)    
    const [customButton5, setCustomButton5] = useState(route.params.custombutton5)    
    const [customButton1Cameras, setCustomButton1Cameras] = useState(route.params.custombutton1cameras)
    const [customButton2Cameras, setCustomButton2Cameras] = useState(route.params.custombutton2cameras)
    const [customButton3Cameras, setCustomButton3Cameras] = useState(route.params.custombutton3cameras)
    const [customButton4Cameras, setCustomButton4Cameras] = useState(route.params.custombutton4cameras)
    const [customButton5Cameras, setCustomButton5Cameras] = useState(route.params.custombutton5cameras)

    /* custom image url */
    /* below experimental */
    const [backgroundImageURL, setBackgroundImageURL] = useState(route.params.backgroundImageURL)
    /* below production */
    const [chosenBackground, setChosenBackground] = useState(route.params.backgroundImageURL)


    async function loadAndGetData() {
        /* In case i want to load something, put here
            but only if you can't load it at App.js!!
        */
    }

    /* Save data */
    async function saveData() {
        Alert.alert('El szeretn??d menteni a v??ltoztat??sokat?',"Amennyiben a Nem-re kattintasz, minden megv??ltoztatott adat t??rl??dik!", [
            {text: 'Igen', onPress: async () => {
                /* save data */
                await setSecureStorage('customMenuButton1', customButton1)
                await setSecureStorage('customMenuButton2', customButton2)
                await setSecureStorage('customMenuButton3', customButton3)
                await setSecureStorage('customMenuButton4', customButton4)
                await setSecureStorage('customMenuButton5', customButton5)
                /* save custom menu checkboxes */
                await setSecureStorage('customMenuButton1Cameras', customButton1Cameras)
                await setSecureStorage('customMenuButton2Cameras', customButton2Cameras)
                await setSecureStorage('customMenuButton3Cameras', customButton3Cameras)
                await setSecureStorage('customMenuButton4Cameras', customButton4Cameras)
                await setSecureStorage('customMenuButton5Cameras', customButton5Cameras)
                /* save background image url */
                if (route.params.experimental) {
                    await setSecureStorage('backgroundImageURL', backgroundImageURL)
                } else {
                    await setSecureStorage('backgroundImageURL', chosenBackground)
                }
                /* logins */
                await setSecureStorage('ravenhead', username)
                await setSecureStorage('ravenclaw', password)
                await setSecureStorage('urlad', urlad)
                await setSecureStorage('viewfile', viewfile)
                await setSecureStorage('snapshotfile', snapshotfile)
                await setSecureStorage('parameters', parameters)
                route.params.reloadApp()
            }},
            {text: 'Nem'}
        ])   
    }

    async function resetStorageData() {
        Alert.alert('Biztosan szeretn??l minden mentett adatot t??r??lni?', 
        'Megjegyz??s: a t??rl??s ut??n az alkalmaz??s ??jra fog indulni.', [
            {text: 'Igen',  onPress: () => {
                resetStorage();
                route.params.logOut(forced=true)
                route.params.reloadApp()
            }},
            {text: 'Nem'}
        ])

    }

    if (!loaded) {
        return (
            <AppLoading
            startAsync={() => loadAndGetData()}
            onFinish={() => setLoaded(true)}
            onError={console.warn}
            />
        )
    }

    /* used to nicely render custom menu buttons settings */
    let customMenuButtonsData = [
        {title: customButton1, setValue: setCustomButton1, cameras: customButton1Cameras, setCameras: setCustomButton1Cameras, key: '1'},
        {title: customButton2, setValue: setCustomButton2, cameras: customButton2Cameras, setCameras: setCustomButton2Cameras, key: '2'},
        {title: customButton3, setValue: setCustomButton3, cameras: customButton3Cameras, setCameras: setCustomButton3Cameras, key: '3'},
        {title: customButton4, setValue: setCustomButton4, cameras: customButton4Cameras, setCameras: setCustomButton4Cameras, key: '4'},
        {title: customButton5, setValue: setCustomButton5, cameras: customButton5Cameras, setCameras: setCustomButton5Cameras, key: '5'}
    ]

    return (
        <View style={{flex: 1}}>
            <Header
            title='Be??ll??t??sok'
            leftIconName='arrow-back'
            leftIconOnPress={() => {if (!saved) {saveData()}; navigation.goBack()}}
            rightIconName='save'
            rightIconOnPress={() => saveData()}
            />
            <ScrollView>
                <Card>
                    <Text style={styles.h1Text}>Men?? be??ll??t??sai</Text>
                    <View style={{marginLeft: '3%'}}>

                        {customMenuButtonsData.map((info, index) => {
                            
                            let checkBoxHandler = (value) => {
                                /* if value is in info.cameras, remove it
                                else if value is not in info.cameras and currently there aren't
                                8 cameras selected, add it to the string
                                */
                                setSaved(false)
                                if (info.cameras.indexOf(value) !== -1) {info.setCameras(info.cameras.replace(value, ''))}
                                else if (info.cameras.length !== 8) {info.setCameras(info.cameras + value)}
                            }

                            return (
                                <Item stackedLabel style={{width: '90%'}} key={index}>
                                    <Label>Gomb neve</Label>  
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Input 
                                        onChangeText={(value) => {setSaved(false); info.setValue(value)}}
                                        value={info.title}
                                        />
                                        <View style={{flex: 1, flexDirection: 'row', marginRight: '35%', marginTop: '4%'}}>
                                            <View style={{width: 0, height: 0}}>
                                                <Text style={{position: 'absolute', left: 16, top: -1}}>1</Text>
                                            </View>
                                            <CheckBox style={{marginRight: '3.5%'}} checked={info.cameras.indexOf(0) !== -1} onPress={() => checkBoxHandler('0')}/>
                                            
                                            <View style={{width: 0, height: 0}}>
                                                <Text style={{position: 'absolute', left: 16, top: -1}}>2</Text>
                                            </View>
                                            <CheckBox style={{marginRight: '3.5%'}} checked={info.cameras.indexOf(1) !== -1} onPress={() => checkBoxHandler('1')}/>  
                                            
                                            <View style={{width: 0, height: 0}}>
                                                <Text style={{position: 'absolute', left: 16, top: -1}}>3</Text>
                                            </View>
                                            <CheckBox style={{marginRight: '3.5%'}} checked={info.cameras.indexOf(2) !== -1} onPress={() => checkBoxHandler('2')}/>  
                                            
                                            <View style={{width: 0, height: 0}}>
                                                <Text style={{position: 'absolute', left: 16, top: -1}}>4</Text>
                                            </View>
                                            <CheckBox style={{marginRight: '3.5%'}} checked={info.cameras.indexOf(3) !== -1} onPress={() => checkBoxHandler('3')}/>  
                                            
                                            <View style={{width: 0, height: 0}}>
                                                <Text style={{position: 'absolute', left: 16, top: -1}}>5</Text>
                                            </View>
                                            <CheckBox style={{marginRight: '3.5%'}} checked={info.cameras.indexOf(4) !== -1} onPress={() => checkBoxHandler('4')}/>  
                                            
                                            <View style={{width: 0, height: 0}}>
                                                <Text style={{position: 'absolute', left: 16, top: -1}}>6</Text>
                                            </View>
                                            <CheckBox style={{marginRight: '3.5%'}} checked={info.cameras.indexOf(5) !== -1} onPress={() => checkBoxHandler('5')}/>  
                                            
                                            <View style={{width: 0, height: 0}}>
                                                <Text style={{position: 'absolute', left: 16, top: -1}}>7</Text>
                                            </View>
                                            <CheckBox style={{marginRight: '3.5%'}} checked={info.cameras.indexOf(6) !== -1} onPress={() => checkBoxHandler('6')}/>  
                                            
                                            <View style={{width: 0, height: 0}}>
                                                <Text style={{position: 'absolute', left: 16, top: -1}}>8</Text>
                                            </View>
                                            <CheckBox style={{marginRight: '3.5%'}} checked={info.cameras.indexOf(7) !== -1} onPress={() => checkBoxHandler('7')}/>  
                                            
                                            <View style={{width: 0, height: 0}}>
                                                <Text style={{position: 'absolute', left: 16, top: -1}}>9</Text>
                                            </View>
                                            <CheckBox style={{marginRight: '3.5%'}} checked={info.cameras.indexOf(8) !== -1} onPress={() => checkBoxHandler('8')}/>  
                                        </View>
                                    </View>
                                </Item>
                            )
                        })}

                    </View>

                </Card>

                <Card>
                    <Text style={styles.h1Text}>H??tt??r be??ll??t??sai</Text>
                    <View style={{marginLeft: '3%', marginBottom: '5%'}}>
                        {route.params.experimental && <Item stackedLabel style={{width: '90%'}}>
                                        <Label>H??tt??r linkje</Label>  
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <Input 
                                            onChangeText={(value) => {setSaved(false); setBackgroundImageURL(value)}}
                                            value={backgroundImageURL}
                                            multiline
                                            />
                                        </View>
                        </Item>}
                        {!route.params.experimental && <Item picker style={{width: '90%'}}>
                            <Label>H??tt??r</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="V??lassz h??tteret el??re megadott h??tteret"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={chosenBackground}
                                onValueChange={(value) => setChosenBackground(value)}
                                >
                                    <Picker.Item label="Egyiptom 1" value="https://i.pinimg.com/originals/ea/52/33/ea5233c4d9ae1d2b93d7d04426459f6e.jpg" />
                                    <Picker.Item label="Egyiptom 2" value="https://wallpaperaccess.com/full/307403.jpg" />
                                    <Picker.Item label="Tengerpart" value="https://wallpapercave.com/wp/wp5165674.jpg" />
                                    <Picker.Item label="Tengerpart naplemente" value="https://wallpaperaccess.com/full/410704.jpg" />
                                    <Picker.Item label="Term??szet ??sz" value="https://wallpaperaccess.com/full/24861.jpg" />
                                    <Picker.Item label="Feh??r h??tt??r" value="" />
                            </Picker>

                        </Item>}
                    </View>
                </Card>

                <Card>
                    <Form>
                        <TouchableOpacity style={{marginBottom: '5%'}} onPress={() => {
                            if (!editableSensitiveInfo) {
                                Alert.alert('Biztosan szeretn??d m??dos??tani az ??rz??keny be??ll??t??sokat?', 
                                'A be??ll??t??sok hib??s m??dos??t??sa ut??n a program haszn??lhatatlann?? v??lhat.', [
                                    {text: 'Igen',  onPress: () => setEditableSensitiveInfo(true)},
                                    {text: 'Nem'}
                                ])
                            } else {
                                setEditableSensitiveInfo(false)
                            }
                        }}>
                            <Text style={styles.sensitiveText}>??RZ??KENY BE??LL??T??SOK</Text>
                        </TouchableOpacity>
                        
                        {/* Only show if in that state */}
                        {editableSensitiveInfo && (
                            <View>
                                <Item stackedLabel>
                                    <Label>Link</Label>
                                    <Input
                                    onChangeText={(value) => {setSaved(false);setUrlad(value)}}
                                    value={urlad}
                                    />
                                </Item>

                                <Item stackedLabel>
                                    <Label>Vide?? f??jl</Label>
                                    <Input
                                    onChangeText={(value) => {setSaved(false);setViewfile(value)}}
                                    value={viewfile}
                                    />
                                </Item>

                                <Item stackedLabel>
                                    <Label>Fot?? f??jl</Label>
                                    <Input 
                                    onChangeText={(value) => {setSaved(false);setSnapshotfile(value)}}
                                    value={snapshotfile}
                                    />
                                </Item>

                                <Item stackedLabel>
                                    <Label>Felhaszn??l??n??v</Label>
                                    <Input 
                                    onChangeText={(value) => {setSaved(false);setUsername(value)}}
                                    value={username}
                                    />
                                </Item>

                                <Item stackedLabel>
                                    <Label>Jelsz??</Label>
                                    <Input 
                                    onChangeText={(value) => {setSaved(false);setPassword(value)}}
                                    value={password}
                                    secureTextEntry={true}/>
                                </Item>

                                <Item stackedLabel>
                                    <Label>Param??terek</Label>    
                                    <Input 
                                    onChangeText={(value) => {setSaved(false);setParameters(value)}}
                                    value={parameters}
                                    />
                                </Item>
                                <View style={{margin: '3%'}}>
                                    <Text style={styles.parametersNoteText}>Megjegyz??s:</Text>
                                    <Text style={styles.parametersNoteText}>#USR# - felhaszn??l??n??v</Text>
                                    <Text style={styles.parametersNoteText}>#PSW# - jelsz??</Text>
                                    <Text style={styles.parametersNoteText}>#CHN# - kamera indexsz??ma</Text>
                                </View>
                            </View>


                        )}
                    </Form>                    
                </Card>
                <Card>
                    <TouchableOpacity style={{marginBottom: 20}} onPress={() => resetStorageData()}>
                        <Text style={styles.sensitiveText}>Minden null??ra ??ll??t??sa</Text>
                    </TouchableOpacity>
                </Card>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    sensitiveText: {
        fontSize: 24, 
        color: 'red',
        textAlign: 'center',
        marginTop: '4%',
        letterSpacing: 3,
        fontFamily: 'Roboto'
    },

    parametersNoteText: {
        fontSize: 12,
        color: 'grey',
        letterSpacing: 1,
        fontFamily: 'Roboto_light'
    },
    
    h1Text: {
        fontSize: 24,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        alignSelf: "center",
        marginVertical: '2.5%'
    }
})