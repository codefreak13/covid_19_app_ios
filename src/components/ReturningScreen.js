import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Icon from '../assets/health-icon.svg';
import Arrow from '../assets/right-arrow.svg';
import TopBackground from '../assets/top-background.svg';
import RightBackground from '../assets/right-background.svg';

class ReturningScreen extends React.Component {
  static navigationOptions = {headerShown: false};

  render() {
    return (
      <View style={styles.container}>
        <TopBackground style={styles.topBackground} />
        <RightBackground style={styles.rightBackground} />
        <Text style={styles.head}>Symptom checker COVID-19 </Text>
        <Text style={styles.title}>
          Carry out a daily self-report, help identify high-risk areas and track
          how fast the virus is spreading.
        </Text>
        <Icon />
        <Text style={styles.bodyText}>
          This app allows you track if you have Covid-19, but does not give
          health advice. If you need advice please visit WHO website or speak to
          a doctor.
        </Text>
        <TouchableNativeFeedback>
          <View style={styles.signupbox}>
            <Text style={styles.signuptext}>Track Symptoms</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export default ReturningScreen;

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  rightBackground: {
    position: 'absolute',
    right: 0,
    top: 100,
  },
  topBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#564FF5',
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  head: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 18,
    fontStyle: 'normal',
    fontFamily: 'SF Pro Display',
    lineHeight: 36,
    width: '90%',
  },
  title: {
    fontWeight: 'normal',
    fontSize: 16,
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 19,
    fontStyle: 'normal',
    color: '#fff',
    marginVertical: 10,
  },
  bodyText: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 17,
    fontStyle: 'normal',
    marginVertical: 10,
  },
  signupbox: {
    backgroundColor: '#fff',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
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
