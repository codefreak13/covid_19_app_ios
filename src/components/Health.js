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

class Health extends React.Component {
  state = {
    sliderValue: 43,
    loading: false,
  };

  static navigationOptions = {headerShown: false};

  render() {
    return (
      <Formik
        initialValues={{
          daily: 'No',
          heart: 'No',
          diabetes: 'No',
          asthma: 'No',
          smoker: 'No',
          cancer: 'No',
          suppresant: 'No',
          ibuprofen: 'No',
          pril: 'No',
          covid: 'No',
          cough: 'No',
          home: 'No',
        }}
        onSubmit={async (values) => {
          const token = await AsyncStorage.getItem('token');
          const id = firestore().collection('healths').doc().id;
          this.setState({loading: true});
          try {
            await firestore().collection('healths').doc(id).set({
              uid: id,
              userId: token,
              created_at: new Date(),
              has_any_health_condition_that_requires_to_stay_at_home:
                values.home,
              has_classic_symptoms_for_the_past_3_days: values.cough,
              has_diabetes: values.diabetes,
              has_heart_diesease: values.heart,
              has_lung_diesease_or_asthma: values.asthma,
              has_pre_existing_health_conditions: values.daily,
              has_taken_antipyretics_in_the_past_3_days: values.ibuprofen,
              has_undergo_chemotherapy_radiotherapy_or_immunotherapy_for_cancer:
                values.cancer,
              is_a_smoker: values.smoker,
              is_currently_taking_immunosuppressant: values.suppresant,
              is_taking_blood_pressure_medications_ending_in_pril: values.pril,
              think_you_have_COVID19_but_not_been_tested: values.covid,
            });

            await firestore().collection('users').doc(token).update({
              healthId: id,
              updated_at: new Date(),
            });

            this.setState({loading: false});
            this.props.navigation.navigate('Covid');
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
                  onValueChange={(sliderValue) => this.setState({sliderValue})}
                />
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you have any pre existing health condition that limits
                    your daily activities?
                  </Text>
                  <View style={styles.rnPicker}>
                    <RNPickerSelect
                      selectedValue={values.daily}
                      onBlur={handleBlur('daily')}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('daily', itemValue);
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
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you have any heart disease?
                  </Text>
                  <View style={styles.rnPicker}>
                    <RNPickerSelect
                      selectedValue={values.heart}
                      onBlur={handleBlur('heart')}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('heart', itemValue);
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
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Do you have diabetes?</Text>
                  <View style={styles.rnPicker}>
                    <RNPickerSelect
                      selectedValue={values.diabetes}
                      onBlur={handleBlur('diabetes')}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('diabetes', itemValue);
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
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you have any lung disease or asthma?
                  </Text>
                  <View style={styles.rnPicker}>
                    <RNPickerSelect
                      selectedValue={values.asthma}
                      onBlur={handleBlur('asthma')}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('asthma', itemValue);
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
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Are you a smoker?</Text>
                  <View style={styles.rnPicker}>
                    <RNPickerSelect
                      selectedValue={values.smoker}
                      onBlur={handleBlur('smoker')}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('smoker', itemValue);
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
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you undergo chemotherapy, radiotherapy or immunotherapy
                    for cancer?
                  </Text>
                  <View style={styles.rnPicker}>
                    <RNPickerSelect
                      selectedValue={values.cancer}
                      onBlur={handleBlur('cancer')}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('cancer', itemValue);
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
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Are you currently taking immunosuppressant?
                  </Text>
                  <View style={styles.rnPicker}>
                    <RNPickerSelect
                      selectedValue={values.suppresant}
                      onBlur={handleBlur('suppresant')}
                      onValueChange={(itemValue, itemIndex) => {
                        setFieldValue('suppresant', itemValue);
                      }}
                      Icon={() => {
                        return <Icon />;
                      }}
                      placeholder={{label: 'No', value: 'No'}}
                      items={[{label: 'Yes', value: 'Yes', color: '#323232'}]}
                      style={{...pickerSelectStyles}}
                    />
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Have you taken antipyretics(e.g Paracetamol , Ibuprofen or
                      Diclofenac) in the past 3 days?
                    </Text>
                    <View style={styles.rnPicker}>
                      <RNPickerSelect
                        selectedValue={values.ibuprofen}
                        onBlur={handleBlur('ibuprofen')}
                        onValueChange={(itemValue, itemIndex) => {
                          setFieldValue('ibuprofen', itemValue);
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
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Are you regularly taking blood pressure medications ending
                      in “-pril”, such as enalapril, ramipril, perindopril?
                    </Text>
                    <View style={styles.rnPicker}>
                      <RNPickerSelect
                        selectedValue={values.pril}
                        onBlur={handleBlur('pril')}
                        onValueChange={(itemValue, itemIndex) => {
                          setFieldValue('pril', itemValue);
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
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Do you think you have COVID-19, but you’ve not been
                      tested?
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
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Have you been having the classic symptoms(high grade fever
                      and persistent cough) for the past 3 days or more?
                    </Text>
                    <View style={styles.rnPicker}>
                      <RNPickerSelect
                        selectedValue={values.cough}
                        onBlur={handleBlur('cough')}
                        onValueChange={(itemValue, itemIndex) => {
                          setFieldValue('cough', itemValue);
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
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      In general, do you have any health condition that requires
                      you to stay at home?
                    </Text>
                    <View style={styles.rnPicker}>
                      <RNPickerSelect
                        selectedValue={values.home}
                        onBlur={handleBlur('home')}
                        onValueChange={(itemValue, itemIndex) => {
                          setFieldValue('home', itemValue);
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

export default Health;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 50,
    justifyContent: 'center',
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
    width: '85%',
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
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  calendarStyle: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Helvetica Neue',
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
    fontFamily: 'Helvetica Neue',
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
    fontFamily: 'Helvetica Neue',
    fontStyle: 'normal',
    fontWeight: 'normal',
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
    color: '#979797',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'Helvetica Neue',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
});
