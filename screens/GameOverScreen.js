import React from "react";
import {View,Text,StyleSheet, Button,Image } from 'react-native';
import MainButton from '../Components/MainButton'
import Colors from '../constants/colors'
const GameOverScreen = props=>{
    return(
        <View style={styles.screen}>
            <Text style={styles.title}>Game Over</Text>
            <View style={styles.imgContainer}>
            <Image source = {require('../assets/success.png')} style={styles.image}/>
            </View>
            <View style={styles.resultCont}>
    <Text style={styles.bodyText}>Your phone needed{' '} 
    <Text style={styles.highlight}>{props.rounds}</Text>
    {' '}rounds to guess the number 
     <Text style={styles.highlight}> {props.number}</Text>
    </Text>
    </View>
    <View style={styles.btn}>
     <MainButton onPress={props.onRestart}>
     NEW GAME
     </MainButton>
   
    </View>
        </View>
    )
}
const styles = StyleSheet.create({
screen:{
flex:1,
justifyContent:'center',
alignItems:'center'

},
btn:{
 marginVertical:15
},
bodyText:{
fontFamily:'open-sans',
textAlign:'center',
fontSize:20
},
title:{
    fontFamily:'open-sans-bold',
    fontSize:18
},
image:{
    width:"100%",
    height:"100%" 
},
resultCont:{
marginHorizontal:30,
marginVertical:15
},
highlight:{
 color:Colors.primary,
 fontFamily:'open-sans-bold'
},
imgContainer:{
    borderRadius:150,
    borderWidth:3,
    width:300,
    height:300,
    borderColor:'black',
    overflow:"hidden",
    marginVertical:30,

}
})
export default GameOverScreen