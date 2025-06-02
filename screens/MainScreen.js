import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';
import * as Animatable from 'react-native-animatable';

// Global boundaries for guess range
let minBoundary = 1;
let maxBoundary = 100;

// Random number generator
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

function MainScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([
    { id: Math.random().toString(), value: initialGuess }
  ]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds(prev => [
      { id: Math.random().toString(), value: newRndNumber },
      ...prev
    ]);
  }

return (
  <View style={styles.screen}>
    <Animatable.View animation="fadeInDown" duration={1000}>
      <Title>Opponent's Guess</Title>
    </Animatable.View>
    
    <Animatable.View animation="bounceIn" duration={1500}>
      <NumberContainer>{currentGuess}</NumberContainer>
    </Animatable.View>

    <Animatable.View animation="fadeInUp" duration={1000}>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="remove-sharp" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="add-sharp" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </Animatable.View>

    <Animatable.View 
      style={styles.listContainer}
      animation="fadeInUp"
      duration={1200}
    >
      <FlatList
        data={guessRounds}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <GuessLogItem
            roundNumber={guessRounds.length - index}
            guess={item.value}
          />
        )}
      />
    </Animatable.View>
  </View>
);
}

export default MainScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 35,
  },
  instructionText: {
    marginBottom: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    marginTop: 20,
      padding: 18
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
   
});
