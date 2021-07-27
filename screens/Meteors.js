import * as React from 'react';
import { ImageBackground, Platform, SafeAreaView, StatusBar, Text, View, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default class MeteorScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            meteors: {}
        }
    }

    getMeteors=()=>{
        axios.get('https://api.nasa.gov/neo/rest/v1/feed?api_key=bk6Y9jeXfGGwL2pGTU9z2DZWYSXZKJhaoDz0PIYQ')
        .then(response =>{
            this.setState={
                meteors: response.data.near_earth_objects
            }
        })
    }

    componentDidMount(){
        this.getMeteors();
    }

    keyExtractor = (item, index) => index.toString()
    
    renderItem = ({item}) => {
        var meteor = item
        var bg;
        var size
        var speed
        if(meteor.threat_Score <= 30){
           bg = require('../assets/meteor_bg1.png')
           speed = require('../assets/meteor_speed1.gif')
           size = 100
        }
        else if(meteor.threat_Score <= 75){
            bg = require('../assets/meteor_bg2.png')
            speed = require('../assets/meteor_speed2.gif')
            size = 150
        }
        else{
            bg = require('../assets/meteor_bg3.png')
            speed = require('../assets/meteor_speed3.gif')
            size = 200
        }
        return(
            <View>
                <ImageBackground
                source={bg}>
                    <View>
                    <Image 
                    source={speed} />
                    </View>
                    <View>
                        <Text>
                            {item.name}
                        </Text>
                        <Text>
                            Closest to Earth - {item.close_approach_data[0].close_approach_date_full}
                        </Text>
                        <Text>
                            Minimum Diameter - {item.estimated_diameter.kilometers.estimated_diameter_min}
                        </Text>
                        <Text>
                            Maximum Diameter - {item.estimated_diameter.kilometers.estimated_diameter_max}
                        </Text>
                        <Text>
                            Mising Earth - {item.close_approach_data[0].miss_distance.kilometers}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    render() {
        if(Object.keys(this.state.meteors).length === 0){
            return(
                <View>
                 <SafeAreaView style={styles.android}/>   
                <Text style={{fontSize: 30, marginLeft: 50, color:'#FFFFFF'}}> Loading... </Text>
                </View>
            );
        } 
        else{
            var array = Object.keys(this.state.meteors).map(meteor =>{
                return this.state.meteors[meteor] 
            })
            var meteors = [].concat.apply([], array)
            meteors.forEach(function(a){
                var diameter = (a.estimated_diameter.kilometers.estimated_diameter_min+a.estimated_diameter.kilometers.estimated_diameter_max)/2
                var threatScore = (diameter/a.close_approach_data[0].miss_distance.kilometers)*1000000000
                a.threat_Score =  threatScore            
            })
            meteors.sort(function(a,b){
                return b.threat_Score-a.threat_Score
            })
            meteors = meteors.slice(0, 5);
            return (
                <View>
                    <SafeAreaView style={styles.android}/>
                     <FlatList 
                     data={meteors}
                     renderItem={this.renderItem}
                     keyExtractor={this.keyExtractor}
                     horizontal={true} />
            </View>
        )
    }
    }
}

const styles = StyleSheet.create({
    android:{
        marginTop: Platform.OS === 'android'?StatusBar.currentHeight: 0
    },
    Title:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    ig:{
        resizeMode: 'cover',
        flex:0.6
    }
})