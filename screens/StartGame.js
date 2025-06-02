import {useState} from 'react'
import {TextInput, Alert,Text, View, StyleSheet} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
function StartGame({onPickNumber}){
const[enteredNumber, setEnterNumber] = useState('');
function numberInputHandler(enteredText){
setEnterNumber(enteredText);
}

function resetInputHandler(){
    setEnterNumber('');
}

function confirmInputHandler(){
const chosenNumber = parseInt(enteredNumber);
if(isNaN(chosenNumber)|| chosenNumber<=0|| chosenNumber>99){
  
    Alert.alert('Invalid Number',
        'Number has to be a number between 1 and 99',
        [{text:'Okay', style:'destructive',onPress: resetInputHandler}]
    );
    return;
}
onPickNumber(chosenNumber);
}


return (
    <View style={styles.rootContainer}>
        <Title>Guess Your Number</Title>
    <Card>
        <InstructionText >Enter a Number</InstructionText>
<TextInput 
style={styles.numberInput} 
maxLength={2} 
keyboardType="number-pad"  // Primary solution 
autoCapitalize='none'
autoCorrect={false}
onChangeText={numberInputHandler}
value={enteredNumber}
/>
<View style={styles.buttonContainer}>
    <View style={styles.buttonsContainer}>
         <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
         </View>
    <View style={styles.buttonsContainer}>
        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
</View>
</Card>
</View>
);
}
export default StartGame;


const styles=StyleSheet.create({

rootContainer:{
flex: 1,
marginTop: 100,
alignItems:'center'
},
   
    instructionText:{
        fontSize: 25,
color: Colors.accent500
    },
    numberInput:{
        height: 70,
        width: 50,
        fontSize:35,
        borderColor:Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight:'bold',
        textAlign:'center'
    },
    buttonContainer:{
    flexDirection:'row'    
    },
    buttonsContainer:{
flex:1,
    }
})  