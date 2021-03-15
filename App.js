import React, { useState } from 'react';
import { Alert } from 'react-native';
import LoginForm from './screens/loginForm';
import Home from './screens/home';
import Settings from './screens/settings';
import Playback from './screens/playback';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraViewer from './screens/cameraViewer';
import { setSecureStorage, getSecureStorage, resetStorage } from './scripts/storageFunctions';
import AppLoading from 'expo-app-loading';
import { checkForUpdates } from './scripts/updateFunctions';

export default function App() { 
  const [loaded, setLoaded] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [urlad, setUrlad] = useState("")
  const [viewfile, setViewfile] = useState("")
  const [snapshotfile, setSnapshotfile] = useState("")
  const [parameters, setParameters] = useState("")

  /* custom menu buttons */
  const [customMenuButton1, setCustomMenuButton1] = useState("Gomb 1")
  const [customMenuButton2, setCustomMenuButton2] = useState("Gomb 2")
  const [customMenuButton3, setCustomMenuButton3] = useState("Gomb 3")
  const [customMenuButton4, setCustomMenuButton4] = useState("Gomb 4")
  const [customMenuButton5, setCustomMenuButton5] = useState("Gomb 5")

  /* custom menu camera infos */
  const [customMenuButton1Cameras, setCustomMenuButton1Cameras] = useState("01")
  const [customMenuButton2Cameras, setCustomMenuButton2Cameras] = useState("12")
  const [customMenuButton3Cameras, setCustomMenuButton3Cameras] = useState("23")
  const [customMenuButton4Cameras, setCustomMenuButton4Cameras] = useState("34")
  const [customMenuButton5Cameras, setCustomMenuButton5Cameras] = useState("45")

  /* background image */
  const [backgroundImageURL, setBackgroundImageURL] = useState("https://i.pinimg.com/originals/ea/52/33/ea5233c4d9ae1d2b93d7d04426459f6e.jpg")

  /* Login functions */
  const onLoginPress = async(username, password) => {
    /* save username */
    setSecureStorage('ravenhead', username)
    setUsername(username)
    /* save password */
    setSecureStorage('ravenclaw', password)
    setPassword(password)
    /* login */
    setSecureStorage('loggedIn', true)
    setLoggedIn(true)
  }

  /* LOGOUT */
  function logOut(forced=false) {
    if (!forced) {
      /* if logout is not forced, show alert */
      Alert.alert('Biztosan ki szeretnél jelentkezni?', 
        'Amennyiben kijelentkezel, a helyi tárhelyről törlődnek az egyedi beállítások.', [
        {text: 'Igen', onPress: () => {
          resetStorage();
          setLoggedIn(false)
          setLoaded(false) // reload app.js
        }},
        {text: 'Nem'}
      ])
    } else {
      /* if forced logout, no alert is shown */
      resetStorage();
      setLoggedIn(false)
      setLoaded(false) // reload app.js
    }
  }

  /* LOADING */
  async function loadAndGetData() {
    /* Load fonts */
    await Font.loadAsync({
      Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
      Roboto_light: require('./assets/fonts/Roboto-Light.ttf'),
      Roboto_thin: require('./assets/fonts/Roboto-Thin.ttf'),
      Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
    })


    /* Get if logged in, log in if yes*/
    await getSecureStorage('loggedIn').then((result) => {
      /* Log in if we have that stored */
      if (result.toString() === true.toString()) {
        setLoggedIn(result)
      }
    })


    /* get username */
    await getSecureStorage('ravenhead').then((result) => {
      if (typeof result === 'string') { setUsername(result) }})
    /* get password */
    await getSecureStorage('ravenclaw').then((result) => {
      if (typeof result === 'string') { setPassword(result) }})
    /* get urlad */
    await getSecureStorage('urlad').then((result) => {
        if (typeof result === 'string') { setUrlad(result) }})
    /* get viewfile */
    await getSecureStorage('viewfile').then((result) => {
        if (typeof result === 'string') { setViewfile(result) }})
    /* get snapshotfile */
    await getSecureStorage('snapshotfile').then((result) => {
      if (typeof result === 'string') { setSnapshotfile(result) }})
    /* get parameters */
    await getSecureStorage('parameters').then((result) => {
        if (typeof result === 'string') { setParameters(result) }})


    /* getting custom buttons */
    await getSecureStorage('customMenuButton1').then((result) => {
      if (typeof result === 'string') { setCustomMenuButton1(result) }})
    await getSecureStorage('customMenuButton2').then((result) => {
      if (typeof result === 'string') { setCustomMenuButton2(result) }})
    await getSecureStorage('customMenuButton3').then((result) => {
      if (typeof result === 'string') { setCustomMenuButton3(result) }})
    await getSecureStorage('customMenuButton4').then((result) => {
      if (typeof result === 'string') { setCustomMenuButton4(result) }})
    await getSecureStorage('customMenuButton5').then((result) => {
      if (typeof result === 'string') { setCustomMenuButton5(result) }})
          
    /* getting custom menu button cameras*/
    await getSecureStorage('customMenuButton1Cameras').then((result) => {
      if (typeof result === 'string') { setCustomMenuButton1Cameras(result) }})
    await getSecureStorage('customMenuButton2Cameras').then((result) => {
      if (typeof result === 'string') { setCustomMenuButton2Cameras(result) }})
    await getSecureStorage('customMenuButton3Cameras').then((result) => {
      if (typeof result === 'string') { setCustomMenuButton3Cameras(result) }})
    await getSecureStorage('customMenuButton4Cameras').then((result) => {
      if (typeof result === 'string') { setCustomMenuButton4Cameras(result) }})
    await getSecureStorage('customMenuButton5Cameras').then((result) => {
      if (typeof result === 'string') { setCustomMenuButton5Cameras(result) }})
    
    /* get background image url */
    await getSecureStorage('backgroundImageURL').then((result) => {
      if (typeof result === 'string') { setBackgroundImageURL(result) }})
    

    /* Loading done */
    setLoaded(true)
  }

  /* If not loaded, load */
  if (!loaded) {
    return (
        <AppLoading
          startAsync={() => loadAndGetData()}
          onFinish={() => setLoaded(true)}
          onError={console.warn}
        />
    );
  }

  checkForUpdates();

  if (loggedIn) {
    /* NAVIGATION */
    const Stack = createStackNavigator();
    /* Setting up URLs for initialParams at other screens */
    const cameraURL = urlad + viewfile + parameters.replace('#USR#', username).replace("#PSW#", password)
    const snapshotURL = cameraURL.replace(viewfile, snapshotfile)
    
    const initialParamsArr = {
      logOut: (param) => logOut(param),
      cameraURL: cameraURL,
      snapshotURL: snapshotURL,
      username: username,
      password: password,
      urlad: urlad,
      viewfile: viewfile,
      snapshotfile: snapshotfile,
      parameters: parameters,
      custombutton1: customMenuButton1,
      custombutton2: customMenuButton2,
      custombutton3: customMenuButton3,
      custombutton4: customMenuButton4,
      custombutton5: customMenuButton5,
      custombutton1cameras: customMenuButton1Cameras,
      custombutton2cameras: customMenuButton2Cameras,
      custombutton3cameras: customMenuButton3Cameras,
      custombutton4cameras: customMenuButton4Cameras,
      custombutton5cameras: customMenuButton5Cameras,
      reloadApp: () => setLoaded(false),
      backgroundImageURL: backgroundImageURL
    }

    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            {/* Home */}
            <Stack.Screen name="Home" component={Home}
            options={{headerShown: false,}}
            initialParams={initialParamsArr}
            />
            {/* Viewing Camera */}
            <Stack.Screen name="CameraViewer" component={CameraViewer} 
            options={{headerShown: false,}}
            initialParams={initialParamsArr}
            />
            {/* Settings */}
            <Stack.Screen name="Settings" component={Settings} 
            options={{headerShown: false,}}
            initialParams={initialParamsArr}
            />
            {/* Playback */}
            <Stack.Screen name="Playback" component={Playback} 
            options={{headerShown: false,}}
            initialParams={initialParamsArr}
            />
          </Stack.Navigator>
        </NavigationContainer>
    )

  } else {
    return (
      /* LOGIN FORM */
      <LoginForm 
      onLoginPress={(username, password) => onLoginPress(username, password)}
      />
    )
  }
}