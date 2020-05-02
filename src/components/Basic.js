import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Slider from '@react-native-community/slider';
import csc from 'country-state-city';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import ShowMessage, {type} from '../toster/ShowMessage';
import {countries} from './countries';
import Icon from '../assets/downArrow.svg';

class Basic extends React.Component {
  state = {
    dueDate: '',
    weight: '',
    feet: '',
    inches: '',
    contact: 'No',
    country: '',
    state: '',
    city: '',
    gender: '',
    visible: false,
    sliderValue: 13,
    states: [],
    loading: false,
  };

  static navigationOptions = {headerShown: false};

  handleChange(name) {
    return (text) => {
      this.setState({[name]: text});
    };
  }

  componentDidUpdate(prevProps, prevState) {
    let datar = csc.getAllCountries();

    if (prevState.country != this.state.country && this.state.country != ' ') {
      let countryObj = datar.filter(
        (country) => country.name == this.state.country,
      );
      let countryId = countryObj[0]['id'];

      let data = csc.getStatesOfCountry(countryId);
      this.setState({states: data});
    }
  }

  handleSubmit = async () => {
    const {
      dueDate,
      weight,
      feet,
      inches,
      contact,
      country,
      state,
      city,
      gender,
    } = this.state;

    if (
      dueDate !== '' &&
      contact !== '' &&
      country !== '' &&
      state !== '' &&
      city !== '' &&
      gender !== ''
    ) {
      const token = await AsyncStorage.getItem('token');
      this.setState({loading: true});
      try {
        await firestore()
          .collection('users')
          .doc(token)
          .update({
            uid: token,
            date_of_birth: dueDate,
            height: {
              feet: feet,
              inches: inches,
            },
            is_a_doctor_nurse_or_paramedic: contact,
            gender,
            weight,
            city,
            state,
            country,
            created_at: new Date(),
          });
        this.setState({loading: false});
        this.props.navigation.navigate('Health');
      } catch (e) {
        this.setState({loading: false});
        let err = e.message.split(' ');
        err.shift();
        ShowMessage(type.ERROR, err.join(' '));
        console.log(err.join(' '));
      }
    } else {
      ShowMessage(type.ERROR, 'Please fill required fields');
      return;
    }
  };

  render() {
    return (
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
              onValueChange={(sliderValue) => this.setState({sliderValue})}
            />

            <View style={styles.section}>
              <Text style={[styles.sectionText]}>Age range</Text>
              <View style={styles.rnPicker}>
                <RNPickerSelect
                  onValueChange={(value) => this.setState({dueDate: value})}
                  Icon={() => {
                    return <Icon />;
                  }}
                  value={this.state.dueDate}
                  placeholder={{label: 'Choose age range', value: ' '}}
                  items={[
                    {label: '16-18', value: '16-18', color: '#323232'},
                    {label: '18-25', value: '18-25', color: '#323232'},
                    {label: '25-45', value: '45-60', color: '#323232'},
                    {
                      label: '60 and above',
                      value: '60 and above',
                      color: '#323232',
                    },
                  ]}
                  style={{...pickerSelectStyles}}
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionText}>Gender</Text>
              <View style={styles.rnPicker}>
                <RNPickerSelect
                  onValueChange={(value) => this.setState({gender: value})}
                  Icon={() => {
                    return <Icon />;
                  }}
                  value={this.state.gender}
                  placeholder={{label: 'Choose gender', value: ' '}}
                  items={[
                    {label: 'Male', value: 'Male', color: '#323232'},
                    {label: 'Female', value: 'Female', color: '#323232'},
                  ]}
                  style={{...pickerSelectStyles}}
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={[styles.sectionText]}>Weight</Text>
              <View style={styles.picker}>
                <TextInput
                  style={{height: 50}}
                  keyboardType="number-pad"
                  placeholderTextColor="#979797"
                  value={this.state.weight}
                  onChangeText={this.handleChange('weight')}
                  placeholder="Kg"
                  name="weight"
                />
              </View>
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
                      style={{height: 50}}
                      keyboardType="number-pad"
                      placeholderTextColor="#979797"
                      value={this.state.feet}
                      onChangeText={this.handleChange('feet')}
                      placeholder="Feet"
                      name="feet"
                    />
                  </View>
                </View>
                <View style={{width: '48%'}}>
                  <View style={styles.picker1}>
                    <TextInput
                      style={{height: 50}}
                      keyboardType="number-pad"
                      placeholderTextColor="#979797"
                      value={this.state.inches}
                      onChangeText={this.handleChange('inches')}
                      placeholder="Inches"
                      name="inches"
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionText}>
                Are you a doctor, nurse or paramedic coming in contact with
                patients?
              </Text>
              <View style={styles.rnPicker}>
                <RNPickerSelect
                  onValueChange={(value) => this.setState({contact: value})}
                  Icon={() => {
                    return <Icon />;
                  }}
                  value={this.state.contact}
                  placeholder={{label: 'No', value: 'No'}}
                  items={[{label: 'Yes', value: 'Yes', color: '#323232'}]}
                  style={{...pickerSelectStyles1}}
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionText}>Country</Text>
              <View style={styles.rnPicker}>
                <RNPickerSelect
                  onValueChange={(value) => this.setState({country: value})}
                  Icon={() => {
                    return <Icon />;
                  }}
                  value={this.state.country}
                  placeholder={{label: 'Choose country', value: ' '}}
                  items={countries.map((country) => {
                    return {
                      // key: country,
                      label: country,
                      value: country,
                      color: '#323232',
                    };
                  })}
                  style={{...pickerSelectStyles}}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionText}>State</Text>
              <View style={styles.rnPicker}>
                <RNPickerSelect
                  onValueChange={(value) => this.setState({state: value})}
                  Icon={() => {
                    return <Icon />;
                  }}
                  value={this.state.state}
                  placeholder={{label: 'Choose state', value: ' '}}
                  items={
                    this.state.states &&
                    this.state.states.map((state) => {
                      return {
                        // key: state.name,
                        label: state.name,
                        value: state.name,
                        color: '#323232',
                      };
                    })
                  }
                  style={{...pickerSelectStyles}}
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionText}>City</Text>
              <View style={styles.picker}>
                <TextInput
                  style={{height: 50}}
                  keyboardType="default"
                  placeholderTextColor="#979797"
                  value={this.state.city}
                  onChangeText={this.handleChange('city')}
                  placeholder="Enter city"
                  name="city"
                />
              </View>
            </View>
            <Text style={styles.footerText}>
              We use this to predict which places or areas are likely to soon
              see a spike in COVID-19 cases
            </Text>
            <TouchableWithoutFeedback onPress={this.handleSubmit}>
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
    );
  }
}

export default Basic;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 50,
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
    fontFamily: 'Helvetica Neue',
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
    color: '#323232',
    paddingVertical: 5,
  },
  picker1: {
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#DADADA',
    color: '#323232',
    paddingVertical: 5,
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

const pickerSelectStyles1 = StyleSheet.create({
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
