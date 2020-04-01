import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Picker,
  ScrollView,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';
import CalendarPicker from 'react-native-calendar-picker';
import Cal from '../assets/calendar.svg';
import csc from 'country-state-city';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import ShowMessage, {type} from '../toster/ShowMessage';

class Basic extends React.Component {
  state = {
    dueDate: '',
    weight: '',
    feet: '',
    inches: '',
    contact: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    visible: false,
    sliderValue: 13,
    countries: [],
    states: [],
    cities: [],
    pageLoad: false,
    loading: false,
  };

  static navigationOptions = {headerShown: false};

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

  handleChange(name) {
    return text => {
      this.setState({[name]: text});
    };
  }

  componentDidMount() {
    this.setState({pageLoad: true});
    let data = csc.getAllCountries();
    this.setState({countries: data, pageLoad: false});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.country != this.state.country) {
      const {countries} = this.state;
      let countryObj = countries.filter(
        country => country.name == this.state.country,
      );
      let countryId = countryObj[0]['id'];

      let data = csc.getStatesOfCountry(countryId);
      this.setState({states: data});
    }

    if (prevState.state != this.state.state) {
      const {states} = this.state;
      let stateObj = states.filter(state => state.name == this.state.state);
      let stateId = stateObj[0]['id'];

      let data = csc.getCitiesOfState(stateId);
      this.setState({cities: data});
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
      weight !== '' &&
      feet !== '' &&
      inches !== '' &&
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
          .set({
            uid: token,
            date_of_birth: dueDate.toString().slice(0, 16),
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
      ShowMessage(type.ERROR, 'Please fill all fields');
      return;
    }
  };

  render() {
    const date = this.state.dueDate
      ? this.state.dueDate.toString().slice(0, 16)
      : '';
    const genders = ['male', 'female'];
    return (
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps={'handled'}>
          {this.state.pageLoad ? (
            <ActivityIndicator
              size="large"
              color="#564FF5"
              style={{flex: 1, alignSelf: 'center'}}
            />
          ) : (
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
                    selectedValue={this.state.gender}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({gender: itemValue})
                    }>
                    <Picker.Item
                      label="Choose gender"
                      value=""
                      color="#979797"
                    />
                    {genders.map(gender => (
                      <Picker.Item
                        key={gender}
                        label={gender}
                        value={gender}
                        color="#979797"
                      />
                    ))}
                  </Picker>
                </View>
                {/* {touched.gender && errors.gender && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.gender}
                    </Text>
                  )} */}
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionText}>Weight</Text>
                <View style={styles.picker}>
                  <TextInput
                    keyboardType="number-pad"
                    placeholderTextColor="#979797"
                    value={this.state.weight}
                    onChangeText={this.handleChange('weight')}
                    placeholder="Kg"
                    name="weight"
                  />
                </View>
                {/* {touched.weight && errors.weight && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.weight}
                    </Text>
                  )} */}
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
                        keyboardType="number-pad"
                        placeholderTextColor="#979797"
                        value={this.state.feet}
                        onChangeText={this.handleChange('feet')}
                        placeholder="Feet"
                        name="feet"
                      />
                    </View>
                    {/* {touched.feet && errors.feet && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                          {errors.feet}
                        </Text>
                      )} */}
                  </View>
                  <View style={{width: '48%'}}>
                    <View style={styles.picker1}>
                      <TextInput
                        keyboardType="number-pad"
                        placeholderTextColor="#979797"
                        value={this.state.inches}
                        onChangeText={this.handleChange('inches')}
                        placeholder="Inches"
                        name="inches"
                      />
                    </View>
                    {/* {touched.inches && errors.inches && (
                        <Text style={{fontSize: 10, color: 'red'}}>
                          {errors.inches}
                        </Text>
                      )} */}
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
                    value={this.state.contact}
                    onChangeText={this.handleChange('contact')}
                    placeholder="No"
                    name="contact"
                  />
                </View>
                {/* {touched.contact && errors.contact && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.contact}
                    </Text>
                  )} */}
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionText}>Country</Text>
                <View style={styles.picker}>
                  <Picker
                    name="country"
                    selectedValue={this.state.country}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({country: itemValue})
                    }>
                    <Picker.Item
                      label="Choose country"
                      value=" "
                      color="#979797"
                    />
                    {this.state.countries &&
                      this.state.countries.map(country => {
                        return (
                          <Picker.Item
                            key={country.id}
                            label={country.name}
                            value={country.name}
                            color="#979797"
                          />
                        );
                      })}
                  </Picker>
                </View>
                {/* {touched.country && errors.country && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.country}
                    </Text>
                  )} */}
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionText}>State</Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={this.state.state}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({state: itemValue})
                    }>
                    <Picker.Item
                      label="Choose state"
                      value=" "
                      color="#979797"
                    />
                    {this.state.states &&
                      this.state.states.map(state => {
                        return (
                          <Picker.Item
                            key={state.id}
                            label={state.name}
                            value={state.name}
                            color="#979797"
                          />
                        );
                      })}
                  </Picker>
                </View>
                {/* {touched.state && errors.state && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.state}
                    </Text>
                  )} */}
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionText}>City</Text>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={this.state.city}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({city: itemValue})
                    }>
                    <Picker.Item
                      label="Choose city"
                      value=" "
                      color="#979797"
                    />
                    {this.state.cities &&
                      this.state.cities.map(city => {
                        return (
                          <Picker.Item
                            key={city.id}
                            label={city.name}
                            value={city.name}
                            color="#979797"
                          />
                        );
                      })}
                  </Picker>
                </View>
                {/* {touched.city && errors.city && (
                    <Text style={{fontSize: 10, color: 'red'}}>
                      {errors.city}
                    </Text>
                  )} */}
              </View>
              <Text style={styles.footerText}>
                We use this to predict which places or areas are likely to soon
                see a spike in Covid-19 cases
              </Text>
              <TouchableNativeFeedback onPress={this.handleSubmit}>
                <View style={styles.signupbox}>
                  {this.state.loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.signuptext}>Next</Text>
                  )}
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
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
    width: '110%',
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
