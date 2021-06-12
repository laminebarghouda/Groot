import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView, Alert
} from "react-native";
import Slider from "react-native-slider";

import {Divider, Button, Block, Text, Switch} from "../components";
import { theme, mocks } from "../constants";

class UpdatePlant extends Component {
  state = {
    _id: '',
    name: '',
    zone: '',
    wateringPeriod: 1,
    notify: true,
    editing: null,
    profile: {},
    loading: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    const plant = navigation.getParam('plant')
    this.setState({ loading: false });
    this.setState({ _id: plant._id });
    this.setState({ name: plant.name });
    this.setState({ zone: plant.zone });
    this.setState({ wateringPeriod: plant.wateringPeriod });
    this.setState({ notify: plant.notify });
  }


  toggleEdit(name) {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  }

  renderEdit(name) {
    const { editing } = this.state;

    if (editing === name) {
      return (
          <TextInput
              defaultValue=""
              onChangeText={text => this.setState({ name: text })}
          />
      );
    }

    return <Text bold>{this.state.name}</Text>;
  }

  updatePlant() {
    const { navigation } = this.props;
    fetch('http://192.168.1.140:3000/plants/' + this.state._id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        wateringPeriod: this.state.wateringPeriod,
        notify: this.state.notify,
        zone: this.state.zone,
        image: "",
      })
    }).then((res) => {
      if(res.status === 200) {
        Alert.alert(
            "Success",
            "Plant successfully updated",
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
            "An error occurred",
            [
              {
                text: "Try Again",
                onPress: () => {
                  navigation.navigate("AddPlant");
                }
              }
            ],
            {cancelable: true}
        );
      }
    })
  }

  render() {
    const { profile, editing } = this.state;
    const { loading } = this.state;
    return (
        <Block>
          <Block flex={false} row center space="between" style={styles.header}>
            <Text h1 bold>
              Update Plant
            </Text>
          </Block>
          <Image source={profile.avatar} style={styles.avatar} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.inputs}>
              <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                <Block>
                  <Text gray2 style={{ marginBottom: 10 }}>
                    Plant Name
                  </Text>
                  {this.renderEdit("username")}
                </Block>
                <Text
                    medium
                    secondary
                    onPress={() => this.toggleEdit("username")}
                >
                  {editing === "username" ? "Save" : "Edit"}
                </Text>
              </Block>
            </Block>

            <Block style={styles.sliders}>
              <Block margin={[10, 0]}>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Watering Period
                </Text>
                <Slider
                    minimumValue={1}
                    maximumValue={14}
                    step={1}
                    style={{ height: 19 }}
                    thumbStyle={styles.thumb}
                    trackStyle={{ height: 6, borderRadius: 6 }}
                    minimumTrackTintColor={theme.colors.secondary}
                    maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                    value={this.state.wateringPeriod}
                    onValueChange={value => this.setState({ wateringPeriod: value })}
                />
                <Text caption gray right>
                  {this.state.wateringPeriod} Days
                </Text>
              </Block>
            </Block>

            <Divider />

            <Block style={styles.toggles}>
              <Block
                  row
                  center
                  space="between"
                  style={{ marginBottom: theme.sizes.base * 2 }}
              >
                <Text gray2>Notifications</Text>
                <Switch
                    value={this.state.notify}
                    onValueChange={value => this.setState({ notify: this.state.notify })}
                />
              </Block>
            </Block>
            <KeyboardAvoidingView style={styles.addPlant} behavior="padding">
              <Block padding={[0, theme.sizes.base * 2]}>
                <Block middle>
                  <Button gradient onPress={() => this.updatePlant()}>
                    {loading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text bold white center>
                          Save
                        </Text>
                    )}
                  </Button>
                </Block>
              </Block>
            </KeyboardAvoidingView>
          </ScrollView>
        </Block>
    );
  }
}

UpdatePlant.defaultProps = {
  profile: mocks.profile
};

export default UpdatePlant;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2
  },
  avatar: {
    height: theme.sizes.base * 10,
    width: theme.sizes.base * 10,
    marginTop : 20,
    left: '28%'
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  inputRow: {
    alignItems: "flex-end"
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: theme.colors.secondary
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2
  },
  addPlant: {
    flex: 1,
    justifyContent: "center"
  },
});
