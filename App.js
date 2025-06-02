import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import Colors from './constants/colors';
import { StyleSheet, ImageBackground, View, SafeAreaView ,Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import StartGame from './screens/StartGame';
import MainScreen from './screens/MainScreen';
import GameOver from './screens/GameOver';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);
  const [showAttribution, setShowAttribution] = useState(true);

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAttribution(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameOver(false); // Start the game
  }

  function gameOverHandler(numberOfRounds) {
    setGuessRounds(numberOfRounds);
    setGameOver(true); // End the game
  }

function startNewGameHandler(){
  setUserNumber(null);
  setGuessRounds(0);
}

  let screen = <StartGame onPickNumber={pickNumberHandler} />;
  if (userNumber) {
    screen = <MainScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNumber) {
    screen = <GameOver userNumber={userNumber} roundNumber={guessRounds} onStartNewGame={startNewGameHandler} />;
  }


  return (
    <LinearGradient colors={[Colors.primary800, Colors.accent500]} style={styles.rootscreen}>
      <ImageBackground
        source={require('./assets/images/backgroundimg.jpg')}
        resizeMode="cover"
        style={styles.rootscreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootscreen}>
          {showAttribution && (
            <Animatable.View 
              animation="fadeIn"
              duration={1000}
              style={styles.attributionContainer}
            >
              <Text style={styles.attributionText}>Created by Muhammad Talha</Text>
            </Animatable.View>
          )}
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootscreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  attributionContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  attributionText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'open-sans-bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});