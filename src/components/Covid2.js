import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  ScrollView,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Formik} from 'formik';

class Symptoms extends React.Component {
  state = {
    covid: '',
    sliderValue: 50,
  };

  render() {
    return (
      <Formik
        initialValues={{
          covid: '',
        }}
        onSubmit={values => {
          this.props.navigation.navigate('SignUpName', {
            email: values.email,
          });
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
                  onValueChange={sliderValue => this.setState({sliderValue})}
                />
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Have you been tested for COVID-19?{' '}
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('covid')}
                      selectedValue={values.covid}
                      onBlur={handleBlur('covid')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('covid', itemValue)
                      }>
                      <Picker.Item label="Yes" value="No" color="#979797" />
                      <Picker.Item label="No" value="Yes" color="#979797" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Did you test positive for COVID-19{' '}
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('covid')}
                      selectedValue={values.covid}
                      onBlur={handleBlur('covid')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('covid', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#979797" />
                      <Picker.Item label="Yes" value="Yes" color="#979797" />
                    </Picker>
                  </View>
                </View>
                <TouchableNativeFeedback onPress={handleSubmit}>
                  <View style={styles.signupbox}>
                    <Text style={styles.signuptext}>Next</Text>
                  </View>
                </TouchableNativeFeedback>
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
    marginVertical: 46,
  },
  head: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 18,
    fontStyle: 'normal',
    fontFamily: 'SF Pro Display',
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
    fontFamily: 'SF Pro Display',
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
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 18,
    fontStyle: 'normal',
  },
});
