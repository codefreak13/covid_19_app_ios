import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import Arrow from '../assets/arrow.svg';
import ShowMessage, {type} from '../toster/ShowMessage';
import auth from '@react-native-firebase/auth';

export default class ForgotPassword extends React.Component {
  state = {
    loading: false,
    email: '',
  };

  static navigationOptions = {headerShown: false};

  render() {
    const validationSchema = yup.object().shape({
      email: yup.string().required().email(),
    });
    return (
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async (values) => {
          this.setState({loading: true});
          try {
            await auth().sendPasswordResetEmail(values.email.toLowerCase());
            this.setState({loading: false});
            ShowMessage(type.DONE, 'Mail sent, Please check your mailbox.');
            values.email = '';
          } catch (e) {
            this.setState({loading: false});
            let err = e.message.split(' ');
            err.shift();
            ShowMessage(type.ERROR, err.join(' '));
            console.log(err.join(' '));
          }
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
              <View style={styles.container}>
                <View>
                  <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.goBack()}>
                    <View>
                      <Arrow />
                    </View>
                  </TouchableWithoutFeedback>
                  <Text style={styles.head}>Forgot Password</Text>
                  <Text style={styles.subText}>
                    To reset your password, enter your email address below and
                    follow the instructions inthe reset link we’ll send to you.
                  </Text>
                </View>
                <View>
                  <View style={styles.inputDiv}>
                    <TextInput
                      keyboardType="email-address"
                      style={styles.input}
                      placeholderTextColor="#979797"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder="Enter email address"
                      name="email"
                    />
                    {touched.email && errors.email && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.email}
                      </Text>
                    )}
                  </View>
                  <View>
                    <TouchableWithoutFeedback onPress={handleSubmit}>
                      <View style={styles.signupbox}>
                        {this.state.loading ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text style={styles.signuptext}>Reset</Text>
                        )}
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '85%',
    paddingVertical: 75,
    flexDirection: 'column',
    marginLeft: 27,
    marginRight: 27,
  },
  input1: {
    width: '70%',
    color:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           