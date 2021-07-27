import * as React from 'react';
import { Text, View, StyleSheet, Platform, StatusBar, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style ={{ flex: 1}}>
                <SafeAreaView style={styles.android}/>
                <ImageBackground
                style={styles.backgroundImage}
                source= {require('../assets/bg.png')}>
                <View style={styles.Title}>
                <Text> Iss Tracker App </Text>
            </View>
            <View >
            <TouchableOpacity style= {styles.Button}
            onPress={()=>{this.props.navigation.navigate('IssLocation')}}>
                <Text> Iss Location </Text>
                <Image 
                style={styles.Icon}
                source={require('../assets/iss_icon.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.Button}
            onPress={()=>{this.props.navigation.navigate('Meteors')}}>
                <Text> Meteors </Text>
                <Image 
                style={styles.Icon}
                source={require('../assets/meteor_icon.png')}></Image>
            </TouchableOpacity>
            </View>
            </ImageBackground>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    android:{
        marginTop: Platform.OS === 'android' ?StatusBar.currentHeight :0,
    },
    Title:{
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    Button:{
        marginTop: 20,
        marginLeft: 50,
        backgroundColor: 'yellow',
        width: 100,
        height: 100,
        borderRadius: 10,
        borderColor: 'black',
    },
    backgroundImage:{
        flex: 1,
        resizeMode: 'cover'
    },
    Icon:{
        resizeMode:'contain',
        position: 'absolute',
        width: 100,
        height: 100
    }
})