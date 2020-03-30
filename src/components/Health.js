import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  ScrollView,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Formik} from 'formik';

class Health extends React.Component {
  state = {
    daily: '',
    heart: '',
    diabetes: '',
    asthma: '',
    smoker: '',
    cancer: '',
    suppresant: '',
    ibuprofen: '',
    pril: '',
    covid: '',
    cough: '',
    home: '',
    sliderValue: 43,
  };

  render() {
    return (
      <Formik
        initialValues={{
          daily: '',
          heart: '',
          diabetes: '',
          asthma: '',
          smoker: '',
          cancer: '',
          suppresant: '',
          ibuprofen: '',
          pril: '',
          covid: '',
          cough: '',
          home: '',
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
                <Text style={styles.head}>
                  Now, let’s talk about your health
                </Text>
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
                    Do you have any pre existing health condition that limits
                    your daily activities?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('daily')}
                      selectedValue={values.daily}
                      onBlur={handleBlur('daily')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('daily', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#979797" />
                      <Picker.Item label="Yes" value="Yes" color="#979797" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you have any heart disease?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('heart')}
                      selectedValue={values.heart}
                      onBlur={handleBlur('heart')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('heart', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#979797" />
                      <Picker.Item label="Yes" value="Yes" color="#979797" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Do you have diabetes?</Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('diabetes')}
                      selectedValue={values.diabetes}
                      onBlur={handleBlur('diabetes')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('diabetes', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#979797" />
                      <Picker.Item label="Yes" value="Yes" color="#979797" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you have any lung disease or asthma?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('asthma')}
                      selectedValue={values.asthma}
                      onBlur={handleBlur('asthma')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('asthma', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#979797" />
                      <Picker.Item label="Yes" value="Yes" color="#979797" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Are you a smoker?</Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('smoker')}
                      selectedValue={values.smoker}
                      onBlur={handleBlur('smoker')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('smoker', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#979797" />
                      <Picker.Item label="Yes" value="Yes" color="#979797" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you undergo chemotherapy, radiotherapy or immunotherapy
                    for cancer?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('cancer')}
                      selectedValue={values.cancer}
                      onBlur={handleBlur('cancer')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('cancer', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#979797" />
                      <Picker.Item label="Yes" value="Yes" color="#979797" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Are you currently taking immunosuppressant?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('suppresant')}
                      selectedValue={values.suppresant}
                      onBlur={handleBlur('suppresant')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('suppresant', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#979797" />
                      <Picker.Item label="Yes" value="Yes" color="#979797" />
                    </Picker>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Have you taken antipyretics(e.g Paracetamol , Ibuprofen or
                      Diclofenac) in the past 3 days?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        onChangeText={handleChange('ibuprofen')}
                        selectedValue={values.ibuprofen}
                        onBlur={handleBlur('ibuprofen')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('ibuprofen', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#979797" />
                        <Picker.Item label="Yes" value="Yes" color="#979797" />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Are you regularly taking blood pressure medications ending
                      in “-pril”, such as enalapril, ramipril, perindopril?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        onChangeText={handleChange('pril')}
                        selectedValue={values.pril}
                        onBlur={handleBlur('pril')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('pril', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#979797" />
                        <Picker.Item label="Yes" value="Yes" color="#979797" />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Do you think you have COVID-19, but you’ve not been
                      tested?
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
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Have you been having the classic symptoms(high grade fever
                      and persistent cough) for the past 3 days or more?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        onChangeText={handleChange('cough')}
                        selectedValue={values.cough}
                        onBlur={handleBlur('cough')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('cough', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#979797" />
                        <Picker.Item label="Yes" value="Yes" color="#979797" />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      In general, do you have any health condition that requires
                      you to stay at home?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        onChangeText={handleChange('home')}
                        selectedValue={values.home}
                        onBlur={handleBlur('home')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('home', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#979797" />
                        <Picker.Item label="Yes" value="Yes" color="#979797" />
                      </Picker>
                    </View>
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

export default Health;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 30,
    justifyContent: 'center',
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
    width: '80%',
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
  picker1: {
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#DADADA',
    color: '#979797',
  },
  section: {
    width: '100%',
    marginTop: 25,
  },
  sectionText: {
    marginBottom: 6,
    letterSpacing: 0.0646154,
    color: '#373C3C',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  calendarStyle: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#979797',
  },
  signupbox: {
    backgroundColor: '#564FF5',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 56,
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
  footerText: {
    marginTop: 21,
    marginBottom: 38,
    color: '#373C3C',
    fontSize: 10,
    lineHeight: 12,
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
});
