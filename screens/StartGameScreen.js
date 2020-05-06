import React ,{useState}from "react";
import { View,Text,StyleSheet,Button,Alert, TouchableWithoutFeedback,Keyboard } from "react-native";
import Card from "../Components/Card";
import colors from "../constants/colors";
import Input from '../Components/Input'
import MainButton from "../Components/MainButton";
import NumberContainer from '../Components/NumberContainer'
const StartGameScreen = props=>{
    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber,setSelectedNumber] = useState('')

    const numberInputHandler = inputText=>{
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }
    const resetInputHandler = ()=>{
        setEnteredValue("")
        setConfirmed(false)
    }
    const confirmInputHandler = ()=>{
        const chosenNumber = parseInt(enteredValue)
        if(isNaN(chosenNumber)|| chosenNumber<=0){
            Alert.alert('Invalid Number!','Number should be between 1 and 99.',[{text:'Okay',style:'destructive'}])
            return
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber)
        Keyboard.dismiss()
    }  
    let confirmedOutput;
    if(confirmed){
    confirmedOutput=(<Card style={Styles.summaryCont}><Text>You selected</Text>
    <NumberContainer>{selectedNumber}</NumberContainer>
    <MainButton onPress={()=>props.onStartGame(selectedNumber)}>
    START GAME
    </MainButton>
 
    </Card>)
    }
    return(
        <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss(); 
        }}> 
        <View style={Styles.screen}> 
    <Text style={Styles.title}>Start a New Game!</Text>
    <Card style={Styles.inputContainer}>
        <Text >Select a Number</Text>
        <Input style={Styles.input} blueOnSubmit autoCaptalize='none' autoCorrct={false} keyboardType="number-pad" maxLength={2} onChangeText={numberInputHandler} value={enteredValue}/> 
        <View style={Styles.buttonContainer}>
          <View style={Styles.button}><Button title="Reset" color={colors.accent} onPress={resetInputHandler}/></View> 
          <View style={Styles.button}><Button title = "Confirm"  color={colors.primary} onPress={confirmInputHandler}/></View>
        </View>

        </Card>
       { confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    )
}
const Styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'

    },
    title:{
        fontSize:20,
        marginVertical:10,
        fontFamily:'open-sans-bold'
    },
    inputContainer:{
        width:300,
        maxWidth:"80%",
        alignItems:'center',
     
    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15      
    },
    button:{
        width:100
    },
    input:{
        width:50,
        textAlign:'center'
    },
    summaryCont:{
        marginTop:20,
        alignItems:'center',

    }
})
export default StartGameScreen