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

class Location extends React.Component {
  state = {
    risk: '',
    sliderValue: 66,
  };

  static navigationOptions = {headerShown: false};

  render() {
    return (
      <Formik
        initialValues={{
          risk: '',
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
              onValueChange={sliderValue => this.setState({sliderValue})}
            />
            <View style={styles.section}>
              <Text style={styles.sectionText}>
                Are you a returning traveller from any of the COVID-19 high risk
                countries?{' '}
              </Text>
              <View style={styles.picker}>
                <Picker
                  onChangeText={handleChange('risk')}
                  selectedValue={values.risk}
                  onBlur={handleBlur('risk')}
                  onValueChange={(itemValue, itemIndex) =>
                    setFieldValue('risk', itemValue)
                  }>
                  <Picker.Item label="No" value="No" color="#979797" />
                  <Picker.Item label="Yes" value="Yes" color="#979797" />
                </Picker>
              </View>
            </View>
            {/* <TouchableNativeFeedback onPress={handleSubmit}>
                  <View style={styles.signupbox}>
                    <Text style={styles.signuptext}>Next</Text>
                  </View>
                </TouchableNativeFeedback> */}
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
    fontFamily: 'SF Pro Display',
    marginTop: 6,
    lineHeight: 29,
    width: '90%',
    marginHorizontal: 19,
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
    marginVertical: 27,
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
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: '500',
  },
});
