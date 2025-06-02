import { View ,Image, Text, StyleSheet} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";
import * as Animatable from 'react-native-animatable';

function GameOver({ roundNumber, userNumber, onStartNewGame }) {
  return (
    <View style={styles.rootContainer}>
      <Animatable.View animation="bounceIn" duration={1500}>
        <Title>Game Over!</Title>
      </Animatable.View>
      
      <Animatable.View 
        style={styles.imageContainer}
        animation="pulse"
        iterationCount="infinite"
        duration={2000}
      >
        <Image 
          style={styles.image} 
          source={require('../assets/images/success.png')}
        />
      </Animatable.View>

      <Animatable.Text 
        animation="fadeInUp" 
        duration={1000}
        style={styles.summaryText}
      >
        Your phone needed <Text style={styles.highlight}>{roundNumber}</Text> rounds 
        to guess the number <Text style={styles.highlight}>{userNumber}</Text>
      </Animatable.Text>
      
      <Animatable.View animation="fadeInUp" delay={500}>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </Animatable.View>
    </View>
  );
}
export default GameOver;


const styles=StyleSheet.create({
    rootContainer:{
flex: 1,
padding: 25,
justifyContent: 'center',
alignItems:'center'
    },
imageContainer:{
   width: 300,
   height: 300,
   borderRadius: 150,
   borderWidth: 3,
   borderColor: Colors.primary800,
   overflow: 'hidden',
   margin: 36
},
image:{
width: '100%',
height:'100%'
},
summaryText:{
    fontFamily:'open-sans',
    fontSize: 25,
    textAlign:'center',
    marginBottom: 25
},
highlight:{
    fontFamily:'open-sans-bold',
    color:Colors.primary500
}
});
