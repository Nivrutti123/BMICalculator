import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Switch,
  Dimensions,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SwitchSelector from "react-native-switch-selector";


const options = [
  { label: "Is units", value: false },
  { label: "USunits", value: true},
]
 


export default class App extends React.Component{

 
  constructor(props){
    super(props);
    this.state = {
      weight: 0, 
      height: 0, 
      bmi: 0, 
      isUSunits:false, 
      weightLBS:0, 
      heightFT:0, 
      heightInch:0,
      
    };


  }

 
 

  changeUnits(isUSunits){
    this.setState({isUSunits:isUSunits}, this.updateBMI);
  }
  changeWeight(value){
    value = parseInt(value);
   
    if(this.state.isUSunits) this.setState({weightLBS:value}, this.updateBMI);
    else this.setState({weight:value}, this.updateBMI);
  }
  changeHeightSI(value){
    value = parseInt(value);
  
    this.setState({height:value}, this.updateBMI);
  }

 
  changeHeightFTUS(value){
    value = parseInt(value);
 
    this.setState({heightFT:value}, this.updateBMI);
  }
  changeHeightInUS(value){
    value = parseInt(value);
    
    this.setState({heightInch:value}, this.updateBMI);
  }


  updateBMI(){
    let bmi, height, weight;

    if(this.state.isUSunits){
      height = this.state.heightFT * 12 + this.state.heightInch;
      weight = this.state.weightLBS * 703;
    }else{
      height = this.state.height/100;
      weight = this.state.weight;
    }

    
    if(!height || !weight ){
      this.setState({bmi:0});
      return;
    }

    bmi = weight / (height * height);

    bmi = bmi || 0;
    this.setState({bmi:bmi});
  }

  changeAge(age){
    age = parseInt(age) || 0;
    this.setState({age:age});
  }

  getRemark(bmi){
    if(bmi == 0) return "";
    if(bmi < 18.5) return "Underweight";
    if(bmi < 24.9) return "Normal";
    if(bmi < 29.9) return "Overweight";

    return "Obesity"
  }
  


  render(){
    return  (
    
    <ScrollView style={styles.container}>

    <Text style={styles.title}>BMI Calculator</Text>

      <SwitchSelector
        options ={options}
        initial ={0}
        onPress ={value => this.changeUnits(value)}
        backgroundColor="#DCDCDC"
        style={styles.toggle}
      />

      <Text style= {styles.label}>
        Height: 
      </Text>
      {
        this.state.isUSunits?(
          <View style={styles.inVeiew}>
            <TextInput
              onChangeText={text => this.changeHeightFTUS(text)}
              placeholder="feet"
              keyboardType="numeric"
              style ={styles.inFeet}
            />
            
            <TextInput
              onChangeText={text => this.changeHeightInUS(text)}
              placeholder="inches"
              keyboardType="numeric"
              style={styles.inFeet}
            />
          </View>
        ):(
        <TextInput
          onChangeText={text => this.changeHeightSI(text)}
          placeholder="cm"
          keyboardType="numeric"
          style = {styles.input}
        />)
      }

        <Text style= {styles.label}>
          Weight:
        </Text>
        <TextInput
          onChangeText={text => this.changeWeight(text)}
          placeholder={this.state.isUSunits?"lbs":"kg"}
          keyboardType="numeric"
          style = {styles.input}
        />
         <Text style={styles.output}> Your BMI is: {this.state.bmi.toFixed(2)}</Text>
        <Text style={styles.outputRemark}> Remark: {this.getRemark(this.state.bmi)}</Text>
        

    </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:23
  },
  input: {
    margin: 15,
    height: 40,
    borderWidth: 1,
    padding: 10,
 },
 
  title:{
    paddingTop:20,
    paddingBottom:10,
    textAlign: "center",
    fontSize: 30,
    fontWeight:"bold",
 },
 label:{
  marginLeft: 15,
  fontSize:18,
  fontFamily:"Ubuntu"
  },
  output:{
    textAlign: "center",
    fontSize: 30,
  },
  inFeet:{
    height:40,
    borderWidth:1,
    padding:10,
    width:'40%',
    margin:15,
    position:'relative',

  },
  inVeiew:{
    flexDirection:'row',
  },
  toggle:{
    margin:5,
  },
  outputRemark:{
    textAlign: "center",
    fontSize: 30,
    margin:15,
    color:"orange",
    marginBottom: 40,
  }

});