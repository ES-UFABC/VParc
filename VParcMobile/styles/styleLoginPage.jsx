import { StyleSheet } from 'react-native';
import colors from './colors';



const styles = StyleSheet.create({
    loginTxt:{
      color:'white', 
      fontWeight:'bold', 
      fontSize:17, 
      fontFamily:'Nunito_800ExtraBold'
    },
    titulo:{
      textAlign:'center',
      color:'white',
      fontWeight:'bold',
      fontSize:50,
      fontFamily:'Nunito_800ExtraBold'
    },
    container: {
      flex:1,
      backgroundColor: colors.secundary,
      alignItems: "center",
      justifyContent: "center",
      alignSelf:'stretch',
      flexDirection:'column'
    },
    inputView: {
      backgroundColor: colors.tertiary,
      borderRadius: 30,
      height: 50,
      marginBottom: 20,
      width: "80%",
      alignItems: "center",
      borderWidth:2,
      borderColor:'white'
    },
    inputText: {
      height: 45,
      color:'black',
      textAlign:"center",
      paddingRight:20,
      backgroundColor:colors.tertiary,
      width:'90%',
      borderColor:colors.tertiary,
      fontFamily:'Nunito_800ExtraBold',
    },
    forgot_btn:{
      marginTop:20,
    },
    forgot_txt:{
      fontWeight:'bold', 
      fontSize:12, 
      fontFamily:'Nunito_800ExtraBold'
    },
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      marginTop: 25,
      backgroundColor: colors.primary,
      justifyContent:'center'
    },
  });


export default styles;