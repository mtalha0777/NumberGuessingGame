import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
function Card({children}){
return <View style={styles.card}>{children}</View>
}
export default Card;

const styles=StyleSheet.create({
 card:{
        justifyContent:'center',
        alignItems:'center',
    padding: 19,
    marginTop: 36, 
    marginHorizontal: 24,
    backgroundColor: Colors.primary700,
    borderRadius: 12,
    elevation: 6,
    },
})