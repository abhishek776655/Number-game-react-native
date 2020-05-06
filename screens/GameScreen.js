import React ,{useState,useRef,useEffect} from "react";
import { View,Text,StyleSheet,Button,Alert, TouchableWithoutFeedback,Keyboard, ScrollView } from "react-native";
import { Ionicons} from '@expo/vector-icons'
import NumberContainer from '../Components/NumberContainer'
import MainButton from "../Components/MainButton";
import Card from '../Components/Card'
const generateRandomBetween = (min,max,exclude)=>{
    min=Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random()*(max-min))+min;
    if(rndNum===exclude){
        return generateRandomBetween(min,max,exclude)
    }
    else{
        return rndNum;
    }
}

const GameScreen = props =>{
    const initialguess = generateRandomBetween(1,100,props.userChoice)
    const [currentGuess,setCurrentGuess] = useState(initialguess)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    const [pastGuess,setPastGuess] = useState([initialguess])
    const {userChoice,onGameOver} = props
    useEffect(()=>{
        if(currentGuess===props.userChoice){
            props.onGameOver(pastGuess.length)
        }
    },[currentGuess,userChoice,onGameOver]);
    const nextGuessHandler = (direction)=>{
        if(
            (direction==="lower" && currentGuess<props.userChoice)||
            (direction==="greater" && currentGuess>props.userChoice)
        )
        {
            Alert.alert("Don\'t lie!", "Beta Masti Nahi",[
                { text:"Sorry!",style:'cancel'}
            ])
            return;
        }
        if(direction==="lower"){
            currentHigh.current = currentGuess
        }
        else{
            currentLow.current=currentGuess+1
        }
        const nextNumber = generateRandomBetween(currentLow.current,currentHigh.current,currentGuess)
        setCurrentGuess(nextNumber)
        // setRounds(curRounds=>curRounds+1)
        setPastGuess(curPastGuesses=>[nextNumber, ...curPastGuesses])

    }
    return(
        <View style={styles.screen}>
            <Text>Opponent Guess</Text>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card style={styles.buttonContainer}>
        <MainButton  onPress={nextGuessHandler.bind(this,'lower')}>
            <Ionicons name="md-remove" size={24} color="white"/>
         </MainButton>
        
         <MainButton  onPress={nextGuessHandler.bind(this,'greater')}>
         <Ionicons name="md-add" size={24} color="white"/>
         </MainButton>
     
         
    </Card>
    <View style={styles.listContainer}>
    <ScrollView>
        {pastGuess.map((guess,count)=><View style={styles.list} key={guess}>
        <Text style={styles.bodyText}>#{pastGuess.length-count}</Text>
        <Text style={styles.bodyText}> 
            {guess}
        </Text>
        </View>
        )}
       
    </ScrollView>
    </View>
        </View>
    )
}
const styles = StyleSheet.create({
screen:{
    flex:1,
    padding:10,
    alignItems:'center'
},
buttonContainer:{
    flexDirection:'row',
    justifyContent:"space-around",
    marginTop:20,
    width:300,
    maxWidth:"80%"

},
bodyText:{
    fontFamily:'open-sans',
 
},
list:{
    borderColor:"#ccc",
    padding:15,
    marginVertical:10,
    backgroundColor:"white",
    borderWidth:1,
    flexDirection:'row',
    justifyContent:'space-between'
},
listContainer:{
    flex:1,
    width:"80%",

}
})
export default GameScreen;