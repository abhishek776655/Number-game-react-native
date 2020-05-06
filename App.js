import React ,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './Components/Header'
import GameStartScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen';
import { AppLoading } from "expo";
import GameOverScreen from './screens/GameOverScreen'
import * as Font from 'expo-font'
const fetchFont = ()=>{
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [userNumber,setUserNumber] = useState()
  const [guessRounds,setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)

  if(!dataLoaded){
    return <AppLoading startAsync={fetchFont} onFinish={()=>setDataLoaded(true)}/>
  }
  const gameOverHandler=(numOfROunds)=>{
    setGuessRounds(numOfROunds)
 }
  const startGameHandler = (selectedNumber)=>{
    setUserNumber(selectedNumber)
    setGuessRounds(0)
  }
  const configureNewGameHandler = ()=>{
    setGuessRounds(0)
    setUserNumber(null)
  }
  console.log(guessRounds)
  let content = <GameStartScreen onStartGame = {startGameHandler}/>
  if(userNumber&&guessRounds<=0){
    content = <GameScreen userChoice={userNumber} onGameOver = {gameOverHandler} />
  }
  else if(guessRounds>0){
    content = <GameOverScreen rounds={guessRounds} number = {userNumber} onRestart = {configureNewGameHandler}/>
  }
 
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1
  }
});
