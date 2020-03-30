import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Picker,
  ScrollView,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
} from 'react-native';
import Slider from '@react-native-community/slider';
import CalendarPicker from 'react-native-calendar-picker';
import Cal from '../assets/calendar.svg';
import * as yup from 'yup';
import {Formik} from 'formik';

class Basic extends React.Component {
  state = {
    dueDate: null,
    gender: '',
    weight: '',
    feet: '',
    inches: '',
    contact: '',
    country: '',
    state: '',
    city: '',
    visible: false,
    sliderValue: 13,
  };

  toggle = () => {
    return this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  };

  onDateChange = date => {
    return this.setState(prevState => ({
      dueDate: date,
      visible: !prevState.visible,
    }));
  };

  render() {
    const date = this.state.dueDate
      ? this.state.dueDate.toString().slice(0, 16)
      : '';
    const validationSchema = yup.object().shape({
      weight: yup.string().required(),
      feet: yup.string().required(),
      inches: yup.string().required(),
      contact: yup.string().required(),
      country: yup.string().required(),
      state: yup.string().required(),
      city: yup.string().required(),
      dueDate: yup.string().required(),
      gender: yup.string().required(),
    });
    return (
      <Formik
        initialValues={{
          weight: '',
          feet: '',
          inches: '',
          contact: '',
          country: '',
          state: '',
          city: '',
          dueDate: '',
          gender: '',
        }}
        onSubmit={values => {
          this.props.navigation.navigate('SignUpName', {
            email: values.email,
          });
        }}
        validationSchema={validationSchema}>
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
                <Text style={styles.head}>Let’s get to know you</Text>
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
                  <Text style={styles.sectionText}>Date of birth</Text>
                  <TouchableWithoutFeedback onPress={this.toggle}>
                    <View style={styles.bar}>
                      {date ? (
                        <Text
                          style={{
                            fontSize: 18,
                            color: 'grey',
                          }}>
                          {date}
                        </Text>
                      ) : (
                        <Text style={styles.calendarStyle}>DD/MM/YYYY</Text>
                      )}
                      <Cal />
                    </View>
                  </TouchableWithoutFeedback>
                  {this.state.visible && (
                    <View>
                      <CalendarPicker
                        onDateChange={this.onDateChange}
                        minDate={new Date()}
                        todayBackgroundColor="#564FF5"
                        name="dueDate"
                        // selectedDayColor="#7300e6"
                        // selectedDayTextColor="#FFFFFF"
                      />
                    </View>
                  )}
                  {/* {touched.dueDate && errors.dueDate && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.dueDate}
                    </Text>
                  )} */}
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Gender</Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('gender')}
                      selectedValue={values.gender}
                      onBlur={handleBlur('gender')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('gender', itemValue)
                      }>
                      <Picker.Item
                        label="Choose gender"
                        value="Abia"
                        color="#979797"
                      />
                    </Picker>
                  </View>
                  {touched.gender && errors.gender && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.gender}
                    </Text>
                  )}
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Weight</Text>
                  <View style={styles.picker}>
                    <TextInput
                      keyboardType="default"
                      placeholderTextColor="#979797"
                      value={values.weight}
                      onChangeText={handleChange('weight')}
                      onBlur={handleBlur('weight')}
                      placeholder="Kg"
                      name="weight"
                    />
                  </View>
                  {touched.weight && errors.weight && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.weight}
                    </Text>
                  )}
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Height</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: '48%'}}>
                      <View style={styles.picker1}>
                        <TextInput
                          keyboardType="default"
                          placeholderTextColor="#979797"
                          value={values.feet}
                          onChangeText={handleChange('feet')}
                          onBlur={handleBlur('feet')}
                          placeholder="Feet"
                          name="feet"
                        />
                      </View>
                      {touched.feet && errors.feet && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                          {errors.feet}
                        </Text>
                      )}
                    </View>
                    <View style={{width: '48%'}}>
                      <View style={styles.picker1}>
                        <TextInput
                          keyboardType="default"
                          placeholderTextColor="#979797"
                          value={values.inches}
                          onChangeText={handleChange('inches')}
                          onBlur={handleBlur('inches')}
                          placeholder="Inches"
                          name="inches"
                        />
                      </View>
                      {touched.inches && errors.inches && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                          {errors.inches}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Are you a doctor, nurse or paramedic coming in contact with
                    patients?
                  </Text>
                  <View style={styles.picker}>
                    <TextInput
                      keyboardType="default"
                      placeholderTextColor="#979797"
                      value={values.contact}
                      onChangeText={handleChange('contact')}
                      onBlur={handleBlur('contact')}
                      placeholder="No"
                      name="contact"
                    />
                  </View>
                  {touched.contact && errors.contact && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.contact}
                    </Text>
                  )}
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Country</Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('country')}
                      selectedValue={values.country}
                      onBlur={handleBlur('country')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('country', itemValue)
                      }>
                      <Picker.Item
                        label="Choose country"
                        value="Abia"
                        color="#979797"
                      />
                    </Picker>
                  </View>
                  {touched.country && errors.country && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.country}
                    </Text>
                  )}
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>State</Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('state')}
                      selectedValue={values.state}
                      onBlur={handleBlur('state')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('state', itemValue)
                      }>
                      <Picker.Item
                        label="Choose state"
                        value="Abia"
                        color="#979797"
                      />
                    </Picker>
                  </View>
                  {touched.state && errors.state && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.state}
                    </Text>
                  )}
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>City</Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('city')}
                      selectedValue={values.city}
                      onBlur={handleBlur('city')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('city', itemValue)
                      }>
                      <Picker.Item
                        label="Choose city"
                        value="Abia"
                        color="#979797"
                      />
                    </Picker>
                  </View>
                  {touched.city && errors.city && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.city}
                    </Text>
                  )}
                </View>
                <Text style={styles.footerText}>
                  We use this to predict which places or areas are likely to
                  soon see a spike in Covid-19 cases
                </Text>
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

export default Basic;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 30,
    justifyContent: 'center',
  },
  bar: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#DADADA',
    justifyContent: 'space-between',
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
