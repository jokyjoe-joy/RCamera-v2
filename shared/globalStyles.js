import { StyleSheet } from 'react-native';

export default globalstyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    h1: {
      fontSize: 30,
      justifyContent: 'center',
      textAlign: 'center',
    },

    content: {
      flex: 1,
      padding: 40,
    },
    loginContent: {
      flex: 1,
      padding: 40,
      alignContent: 'center',
    },
    loginContainer: {
      justifyContent: 'center',
      padding: 20,
      borderColor: '#bbb',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 10,
    },
    list: {
      flex: 1,
      marginTop: 20,
    },
    item: {
      color: 'black'
    },
    input: {
      marginBottom: 10,
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    videoContainer: {
      flex: 1,
      backgroundColor: '#444',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    video: {
      width: '100%',
      height: '100%'
    },
    footerText: {
      textAlign: 'center',
      fontSize: 10,
      color: '#444',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 10
    }
});
  