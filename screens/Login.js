import React, { Component } from "react";
import {
  ActivityIndicator, Alert,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  };

  handleLogin() {
    const { navigation } = this.props;
    fetch('http://192.168.1.140:3000/user/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
        .then((res) => {
          if(res.status === 200) {
            Alert.alert(
                "Success",
                "You are now logged in",
                [
                  {
                    text: "Continue",
                    onPress: () => {
                      navigation.navigate("Browse");
                    }
                  }
                ],
                {cancelable: false}
            );
          }
          else {
            Alert.alert(
                "Error",
                "Email or Password incorrect",
                [
                  {
                    text: "Try Again",
                    onPress: () => {
                      navigation.navigate("Login");
                    }
                  }
                ],
                {cancelable: true}
            );
          }
        })
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Login
          </Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Login
                </Text>
              )}
            </Button>
            <Button style={{backgroundColor : 'rgba(0, 0, 0, 0)'}} onPress={() => navigation.navigate("Forgot")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline"}}
              >
                Forgot your password?
              </Text>
            </Button>

            <Button style={{backgroundColor : 'rgba(0, 0, 0, 0)'}} shadow onPress={() => navigation.navigate("SignUp")}>
              <Text center semibold>
                No account yet? {" "}
                <Text center semibold style={{ textDecorationLine: "underline"}}>
                  Register
                </Text>
              </Text>

            </Button>
          </Block>
        </Block>
    );
  }
}

const styles = StyleSheet.create({
  login: {
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
