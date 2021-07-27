import * as React from 'react';
import { Text, View, SafeAreaView,Image, ImageBackground, Platform, StatusBar, StyleSheet} from 'react-native';
import MapView ,{Marker} from 'react-native-maps';
import axios from 'axios';

export default class IssLocationScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            Location: {}
        }
    }
    getIssLoc=()=>{
        axios.get('http://api.wheretheiss.at/v1/satellites/25544')
        .then(response=>{
            this.setState({
                Location: response.data
            })
        })
    }

    componentDidMount(){
        try{
        this.getIssLoc();
    }catch(e){
        return(
        <Text> {e} </Text>
        );}
}

    render() {  
        if(Object.keys(this.state.Location).length === 0){
            return(
                <View>
                    <Text style={{color: '#FFFFFF',fontSize: 30, justifyContent: 'center', alignItems: 'center'}}> 
                    Loading... </Text>
                </View>
            );
        } else{
        return (
            <View style={{flex:1}}>
            <SafeAreaView style={styles.android}/>
            <ImageBackground
            style={styles.image}
            source={require('../assets/iss_bg.jpg')}>
            <View>
            <Text style={styles.title}> Iss Location </Text>
            </View>
            <View style={{flex: 0.6}}>
                <MapView
                style={styles.map}
                region={{latitude: this.state.Location.latitude, longitude: this.state.Location.longitude,
                         latitudeDelta: 100, longitudeDelta:100}}>
                <Marker
                coordinate={{latitude: this.state.Location.latitude, longitude: this.state.Location.longitude}}> 
                <Image 
                style={styles.ico}
                source={require('../assets/iss_icon.png')}
                /> 
                </Marker>
                </MapView>
            </View>

         
            </ImageBackground>
            </View>
        )
        }
    }
}

const styles = StyleSheet.create({
    android:{
        marginTop: Platform.OS === 'android'?StatusBar.currentHeight:0
    },
    title:{
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        marginLeft: 600,
        marginTop: 20,
        fontFamily: 'sans-serif',
        fontSize: 30
    },
    image:{
        flex: 1,
        resizeMode: 'cover'
    },
    map:{
        width: '100%' ,
        height: '100%'
    },
    ico:{
        height: 50,
        width: 50
    }
})