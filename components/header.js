import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Header({title, leftIconName, rightIconName, leftIconOnPress, rightIconOnPress})
{
    /* Checking what properties we have */
    const checkLeftIcon = () => {
        if (leftIconName !== undefined && leftIconOnPress !== undefined) {
            return(
            <TouchableOpacity style={styles.icon} onPress={leftIconOnPress}>
                <MaterialIcons
                name={leftIconName}
                size={30}
                color="white" 
                />
            </TouchableOpacity>
            )
        } else {
            return <View></View> /* needed to center title */
        }
    }


    const checkRightIcon = () => {
        if (rightIconName !== undefined && rightIconOnPress !== undefined) {
            return (
            <TouchableOpacity style={styles.icon} onPress={rightIconOnPress}>
                <MaterialIcons 
                name={rightIconName}
                size={30}
                color="white"
                style={{}}
                />
            </TouchableOpacity>

            )
        } else {
            return <View></View> /* needed to center title */
        }
    }


    if (title === undefined) {const title = ''}


    return (
        <View style={styles.header}>
            {checkLeftIcon()}
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
            {checkRightIcon()}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 100,
        paddingTop: 50,
        backgroundColor: 'coral',
    },
    title: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        flex: 1,
        bottom: 7
    },
    icon: {
        flex: 1,
        marginHorizontal: 20
    }
})