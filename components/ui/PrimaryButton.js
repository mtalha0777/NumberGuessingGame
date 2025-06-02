import {View, Text, Pressable, StyleSheet } from 'react-native'
import Colors from '../../constants/colors';
function PrimaryButton({children, onPress}){
return (

<View style={styles.buttonOuterContainer}>
<Pressable 
style={({pressed})=> pressed ? 
[styles.buttonInnerContainer, styles.pressed]: styles.buttonInnerContainer} 
onPress={onPress} 
android_ripple={{color: Colors.primary}}
>
    <Text style={styles.buttonText}>{children}</Text>
</Pressable>
</View>
);
}

export default PrimaryButton;
const styles=StyleSheet.create({

buttonOuterContainer:{
     borderRadius: 28,
     margin: 4,
     overflow: 'hidden'
},

buttonInnerContainer: {
  backgroundColor: Colors.primary500,
  paddingVertical: 12,
  paddingHorizontal: 24,
  elevation: 4,
  shadowColor: Colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
},

buttonText: {
  color: Colors.white,
  textAlign: 'center',
  fontSize: 18,
  fontFamily: 'open-sans-bold'
},

pressed:{
opacity:0.75
}
});