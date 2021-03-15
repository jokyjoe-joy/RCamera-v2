import * as SecureStore from 'expo-secure-store';

/* Save data to SecureStore */
async function setSecureStorage(key, value) {
    await SecureStore.setItemAsync(key.toString(), value.toString())
}

/* Get data from securestore */
async function getSecureStorage(key) {
    const value = await SecureStore.getItemAsync(key.toString());
    // Note: in case it doesn't exist, it returns '[object Undefined]'
    // Only return if it exists
    if (value !== null && value.indexOf('Undefined') === -1 && value !== undefined) {
        return value
    } else {
        return false
    }
}

async function resetStorage() {
    setSecureStorage('ravenhead', '') // username
    setSecureStorage('loggedIn', false)
    setSecureStorage('ravenclaw', '') // password
    setSecureStorage('urlad', 'http://ip:port')
    setSecureStorage('viewfile', '/cgi-bin/view.cgi')
    setSecureStorage('snapshotfile', '/cgi-bin/snapshot.cgi')
    setSecureStorage('parameters', '?u=#USR#&p=#PSW#&chn=#CHN#')
    setSecureStorage('gridMode', false)
    setSecureStorage('experimental', false)
}

export {setSecureStorage, getSecureStorage, resetStorage};