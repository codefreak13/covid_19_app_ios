import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';

class Treatment extends React.Component {
  static navigationOptions = {headerShown: false};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.head}>
          What treatment are you receiving or did you receive at the hospital?
        </Text>
        <TouchableNativeFeedback>
          <View style={[styles.signupbox, {marginBottom: 20}]}>
            <Text style={styles.signuptext}>None</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.inputDiv}>
          <TouchableNativeFeedback>
            <View style={styles.signupbox}>
              <Text style={styles.signuptext}>Oxygen and fluids</Text>
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.buttonText}>
            Breathing support administered through an oxygen mask, which pushes
            oxygen into lungs.
          </Text>
        </View>
        <View style={styles.inputDiv}>
          <TouchableNativeFeedback>
            <View style={styles.signupbox}>
              <Text style={styles.signuptext}>Non-invasive ventilation</Text>
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.buttonText}>
            Breathing support administered through an inserted tube. People are
            usually asleep for this procedure.
          </Text>
        </View>
        <View style={styles.inputDiv}>
          <TouchableNativeFeedback>
            <View style={styles.signupbox}>
              <Text style={styles.signuptext}>Invasive ventilation</Text>
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.buttonText}>
            Breathing support administered through an oxygen mask, no pressure
            applied.
          </Text>
        </View>
        <TouchableNativeFeedback>
          <View style={styles.signupbox}>
            <Text style={styles.signuptext}>Other treatment</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export default Treatment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#564FF5',
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: 'column',
    paddingVertical: 52,
    justifyContent: 'flex-start',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 5,
  },
  head: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    fontStyle: 'normal',
    fontFamily: 'SF Pro Display',
    lineHeight: 21,
    marginBottom: 42,
    textAlign: 'center',
  },
  inputDiv: {
    marginBottom: 20,
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: 'normal',
    fontSize: 12,
    fontStyle: 'normal',
    fontFamily: 'SF Pro Display',
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  signupbox: {
    backgroundColor: '#fff',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signuptext: {
    color: '#595959',
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 17,
    fontStyle: 'normal',
  },
});
