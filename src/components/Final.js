import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from '../assets/thanks.svg';

class Final extends React.Component {
  static navigationOptions = {headerShown: false};

  render() {
    return (
      <View style={styles.container}>
        <Icon style={styles.icon} />
        <Text style={styles.title}>
          Thank you for your help and contribution in the study of
          Covid-19.Please share this app. The more people report their symptoms,
          the more we can help those at risk. If you need advice ,please visit{' '}
          <Text
            style={{textDecorationLine: 'underline'}}
            onPress={() => Linking.openURL('https://www.who.int')}>
            WHO website
          </Text>{' '}
          or talk to a doctor
        </Text>
        <TouchableNativeFeedback>
          <View style={styles.signupbox}>
            <Text style={styles.signuptext}>Share app</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('TalkToADoctor')}>
          <View style={styles.signupbox1}>
            <Text style={styles.signuptext1}>Talk to a doctor</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate('ReturningScreen')}>
          <View style={styles.done}>
            <Text style={styles.signuptext1}>Done</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Final;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#564FF5',
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 65,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 37,
  },
  title: {
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    lineHeight: 17,
    fontStyle: 'normal',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 29,
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
  signupbox1: {
    backgroundColor: '#564FF5',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    borderColor: '#fff',
    borderWidth: 1,
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
  signuptext1: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 17,
    fontStyle: 'normal',
  },
  done: {
    marginTop: 21,
    alignSelf: 'center',
  },
});
