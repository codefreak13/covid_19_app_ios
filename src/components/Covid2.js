import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import ShowMessage, {type} from '../toster/ShowMessage';
import RNPickerSelect from 'react-native-picker-select';
import Icon from '../assets/downArrow.svg';

class Symptoms extends React.Component {
  state = {
    sliderValue: 50,
    loading: false,
  };

  static navigationOptions = {headerShown: false};

  render() {
    return (
      <Formik
        initialValues={{
          test: 'Yes',
          covid: 'No',
        }}
        onSubmit={async (values) => {
          const token = await AsyncStorage.getItem('token');
          this.setState({loading: true});

          try {
            await firestore().collection('users').doc(token).update({
              'covid19_status.is_tested_positive': values.covid,
              updated_at: new Date(),
            });
            this.setState({loading: false});
            this.props.navigation.navigate('Symptoms');
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
          <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps={'handled'}>
              <View style={styles.main}>
                <Text style={styles.head}>COVID-19 Status </Text>
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
                    Have you been tested for COVID-19?
                  </Text>
                  <View style={styles.rnPicker}>
                    <RNPickerSelect
                      disabled
                      selectedValue={values.test}
                      onBlur={handleBlur('test')}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('test', itemValue);
                      }}
                      Icon={() => {
                        return <Icon />;
                      }}
                      placeholder={{label: 'Yes', value: 'No'}}
                      items={[{label: 'Yes', value: 'Yes', color: '#323232'}]}
                      style={{...pickerSelectStyles}}
                    />
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Did you test positive for COVID-19
                  </Text>
                  <View style={styles.rnPicker}>
                    <RNPickerSelect
                      selectedValue={values.covid}
                      onBlur={handleBlur('covid')}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('covid', itemValue);
                      }}
                      Icon={() => {
                        return <Icon />;
                      }}
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
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    );
  }
}

export default Symptoms;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 50,
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
    textAlign: 'center',
    width: '90%',
  },
  slider: {
    width: '100%',
  },
  picker: {
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#DADADA',
    color: '#979797',
  },
  section: {
    width: '100%',
    marginTop: 33,
  },
  sectionText: {
    marginBottom: 18,
    letterSpacing: 0.0646154,
    color: '#373C3C',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: '500',
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
