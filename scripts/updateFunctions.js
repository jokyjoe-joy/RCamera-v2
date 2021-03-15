import { Alert } from 'react-native';
import * as Updates from 'expo-updates';
import Constants from 'expo-constants';


/* !! Release channel notes !!
Prod-v1: base release, if there is prod-v2 available, will notify user
Prod-v2: release version 2, if there is prod-v3 available, will notify user
Prod-v3: latest release?

Staging: testing environment before going for prod
*/

/* Get release channel */
function getEnvironment() {
    let releaseChannel = Constants.manifest.releaseChannel;
  
    if (releaseChannel === undefined) {
      // no releaseChannel (is undefined) in dev
      return { envName: 'DEVELOPMENT', envShort: 'dev', dbUrl: 'aaa', apiKey: 'bbb' }; // dev env settings
    }
    if (releaseChannel.indexOf('prod') !== -1) {
      // matches prod-v1, prod-v2, prod-v3
      return { envName: 'PRODUCTION', envShort: 'prod', dbUrl: 'ccc', apiKey: 'ddd' }; // prod env settings
    }
    if (releaseChannel.indexOf('staging') !== -1) {
      // matches staging-v1, staging-v2
      return { envName: 'STAGING', envShort: 'staging', dbUrl: 'eee', apiKey: 'fff' }; // stage env settings
    }
}

async function updateApp() {
    console.log('Updating App')
    await Updates.fetchUpdateAsync()
    .then(() => {
        console.log('Reloading app to update')
        Updates.reloadAsync();
    })

}

async function checkForUpdates(mustAlert = false) {
    if (getEnvironment().envName !== "DEVELOPMENT") {
        console.log('Checking for updates')
        await Updates.checkForUpdateAsync()
        .then((result) => {
            console.log('Checked update')
            if (result.isAvailable) {
                console.log('Update available')
                /* UPDATE AVAILABLE */
    
                /* Check if we are in the same environment */
                if (result.manifest.releaseChannel.indexOf(getEnvironment().envShort) !== -1) {
                    Alert.alert('Szeretnéd frissíteni az alkalmazást?', 
                    result.manifest.extra.updateInformation,
                    [
                        {text: 'Igen', onPress: () => updateApp()},
                        {text: 'Nem'}
                    ])
                }
            } else if (mustAlert) {
                Alert.alert('A legújabb verzión vagy!', 'Gratulálok! A legfrissebb verzió fut a telefonodon.',
                [
                    {text: 'OK'}
                ])
            }
        })
    }
}

export {getEnvironment, checkForUpdates}