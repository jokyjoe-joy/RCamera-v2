import React, { useState } from 'react';
import { View, TextInput, Button, Image, Text, Dimensions} from 'react-native';
import globalstyles from '../shared/globalStyles';
import Constants from 'expo-constants';


export default function LoginForm({onLoginPress}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const changeUsernameHandler = (val) => {
        setUsername(val);
    }

    const changePasswordHandler = (val) => {
        setPassword(val)
    }

    return (
            /* Min height needed, as without it footer is going to get pushed up by keyboard */
            <View style={{flex: 1, minHeight: Math.round(Dimensions.get('window').height) }}>
                <Image
                style={{width: 230,
                    height: 230,
                    alignSelf: 'center',
                    marginTop: 40,
                    resizeMode: 'contain'
                    }}
                source={require('../assets/icon.png')}
                />

                <View style={globalstyles.loginContent}>
                    <View style={globalstyles.loginContainer}>
                        <TextInput 
                        placeholder='Felhasználónév...'
                        secureTextEntry={false}
                        autoCompleteType='off'
                        onSubmitEditing={() => onLoginPress(username, password)}
                        onChangeText={changeUsernameHandler}
                        style={globalstyles.input}
                        />
                        <TextInput 
                        placeholder='Jelszó...'
                        secureTextEntry={true}
                        autoCompleteType='off'
                        onSubmitEditing={() => onLoginPress(username, password)}
                        onChangeText={changePasswordHandler}
                        style={globalstyles.input}
                        />
                        <Button 
                        title="Belépés"
                        onPress={() => onLoginPress(username, password)}
                        color='coral'
                        />
                    </View>

                </View>


                <View style={{flex: 1,}}>
                        <Text style={globalstyles.footerText}>
                        {`${Constants.manifest.name}\nJelenlegi verzió: v${Constants.manifest.version} @ ${Constants.manifest.releaseChannel}`}
                        </Text>
                </View>
            </View>

    )
}

