import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Slider from '@react-native-community/slider';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import ShowMessage, {type} from '../toster/ShowMessage';
import Icon from '../assets/downArrow.svg';

class Location extends React.Component {
  state = {
    sliderValue: 66,
    loading: false,
  };

  static navigationOptions = {headerShown: false};

  render() {
    return (
      <Formik
        initialValues={{
          risk: 'No',
        }}
        onSubmit={async (values) => {
          const token = await AsyncStorage.getItem('token');
          this.setState({loading: true});

          try {
            await firestore().collection('users').doc(token).update({
              'location.is_a_returning_traveller_from_a_high_risk_COVID19_country':
                values.risk,
              updated_at: new Date(),
            });
            this.setState({loading: false});
            this.props.navigation.navigate('Location2');
          } catch (e) {
            this.setState({loading: false});
            let err = e.message.split(' ');
            err.shift();
            ShowMessage(type.ERROR, err.join(' '));
            console.log(err.join(' '));
          }
        }}>
        {({
          values,
          handleChange,
          errors,
          setFieldValue,
          setFieldTouched,
          touched,
          isValid,
          handleBlur,
          handleSubmit,
        }) => (
          <View style={styles.main}>
            <Text style={styles.head}>Travel history </Text>
            <Slider
              style={styles.slider}
              thumbTintColor="#2560FB"
              minimumTrackTintColor="#2560FB"
              maximumValue={100}
              minimumValue={0}
              step={1}
              value={this.state.sliderValue}
              onValueChange={(sliderValue) => this.setState({sliderValue})}
            />
            <View style={styles.section}>
              <Text style={styles.sectionText}>
                Are you a returning traveller from any of the COVID-19 high risk
                countries?
              </Text>
              <View style={styles.rnPicker}>
                <RNPickerSelect
                  onValueChange={(itemValue, itemIndex) => {
                    setFieldValue('risk', itemValue);
                  }}
                  Icon={() => {
                    return <Icon />;
                  }}
                  selectedValue={values.risk}
                  placeholder={{label: 'No', value: 'No'}}
                  items={[{label: 'Yes', value: 'Yes', color: '#323232'}]}
                  style={{...pickerSelectStyles}}
                />
              </View>
            </View>
            <TouchableWithoutFeedback onPress={handleSubmit}>
              <View style={styles.signupbox}>
                {this.state.loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.signuptext}>Next</Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </Formik>
    );
  }
}

export default Location;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 97,
  },
  head: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 18,
    fontStyle: 'normal',
    fontFamily: 'Helvetica Neue',
    marginTop: 6,
    lineHeight: 29,
    width: '90%',
    marginHorizontal: 19,
  },
  slider: {
    width: '100%',
  },
  section: {
    width: '100%',
    marginTop: 28,
  },
  sectionText: {
    letterSpacing: 0.0646154,
    color: '#373C3C',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: '500',
    width: '80%',
    marginBottom: 27,
  },
  signupbox: {
    backgroundColor: '#564FF5',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 38,
  },
  signuptext: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    alignSelf: 'center',
    lineHeight: 18,
    fontStyle: 'normal',
  },
  rnPicker: {
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#DADADA',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 20,
    paddingRight: 30,
    lineHeight: 17,
    fontFamily: 'Helvetica Neue',
    color: '#323232',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  iconContainer: {
    marginVertical: 25,
  },
  placeholder: {
    color: '#323232',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
});
