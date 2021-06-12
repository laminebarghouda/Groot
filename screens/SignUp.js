import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

export default class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    errors: [],
    loading: false
  };

  handleSignUp() {
    const { navigation } = this.props;
      fetch('http://192.168.1.140:3000/user/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        })
      })
          .then(() => {
            console.log('sent');
            Alert.alert(
                "Success",
                "Your account has been created",
                [
                  {
                    text: "Continue",
                    onPress: () => {
                      navigation.navigate("Login");
                    }
                  }
                ],
                { cancelable: false }
              );
          })
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Register
          </Text>
          <Block middle>
            <Input
              email
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              label="Username"
              error={hasErrors("username")}
              style={[styles.input, hasErrors("username")]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Register
                </Text>
              )}
            </Button>

            <Button style={{backgroundColor : 'rgba(0, 0, 0, 0)'}} onPress={() => navigation.navigate("Login")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});
