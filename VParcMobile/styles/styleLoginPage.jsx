import { StyleSheet } from 'react-native';
import colors from './colors';



const styles = StyleSheet.create({

    titulo:{
      marginBottom:100,
      color:'white',
      fontWeight:'bold',
      fontSize:30,
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
      colo:'black',
      textAlign:"center",
      paddingRight:20,
      placeholderTextColor:'white',
      backgroundColor:colors.tertiary,
      width:'90%',
      borderColor:colors.tertiary,
      placeholderTextColor:'white',
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
      marginTop: 60,
      backgroundColor: colors.primary,
      justifyContent:'center'
    },
  });


export default styles;