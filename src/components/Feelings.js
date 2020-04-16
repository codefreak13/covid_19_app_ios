import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from '../assets/feelings.svg';

class Feelings extends React.Component {
  static navigationOptions = {headerShown: false};

  render() {
    return (
      <View style={styles.container}>
        <Icon style={styles.icon} />
        <Text style={styles.head}>How do you feel today?</Text>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate('Final')}>
          <View style={styles.signupbox}>
            <Text style={styles.signuptext}>I feel great!</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate('Symptoms')}>
          <View style={styles.signupbox}>
            <Text style={styles.signuptext}>I feel sick</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Feelings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#564FF5',
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: 'column',
    paddingVertical: 100,
    justifyContent: 'flex-start',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 5,
  },
  head: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    fontStyle: 'normal',
    fontFamily: 'Helvetica Neue',
    lineHeight: 29,
    marginBottom: 24,
    alignSelf: 'center',
  },
  signupbox: {
    backgroundColor: '#fff',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signuptext: {
    color: '#595959',
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'Helvetica Neue',
    alignSelf: 'center',
    lineHeight: 17,
    fontStyle: 'normal',
  },
});
