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

import {Divider, Button, Block, Text, Switch, Input} from "../components";
import { theme, mocks } from "../constants";

class AddPlant extends Component {
    state = {
        name: '',
        wateringPeriod: 4,
        notify: true,
        editing: null,
        profile: {},
        loading: false
    };

    componentDidMount() {
        this.setState({ profile: this.props.profile });
        this.setState({ loading: false });
    }

    addPlant() {
        const { navigation } = this.props;
        fetch('http://192.168.1.140:3000/plants', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                wateringPeriod: this.state.wateringPeriod,
                notify: this.state.notify,
                zone: navigation.getParam('zone', "General"),
                image: "",
            })
        }).then((res) => {
                if(res.status === 200) {
                    Alert.alert(
                        "Success",
                        "Plant successfully added",
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
        const { profile } = this.state;
        const { loading } = this.state;
        return (
            <Block>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold>
                        Add Plant
                    </Text>
                </Block>
                <Image source={require("../assets/icons/flowers.png")} style={styles.avatar} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Block style={styles.inputs}>
                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                            <Block>
                                <Text gray2 style={{ marginBottom: 10 }}>
                                    Plant Name
                                </Text>
                                <TextInput
                                    defaultValue=""
                                    onChangeText={text => this.setState({ name: text })}
                                />
                            </Block>

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
                                onValueChange={value => this.setState({ notify: value })}
                            />
                        </Block>
                    </Block>
                    <KeyboardAvoidingView style={styles.addPlant} behavior="padding">
                        <Block padding={[0, theme.sizes.base * 2]}>
                            <Block middle>
                                <Button gradient onPress={() => this.addPlant()}>
                                    {loading ? (
                                        <ActivityIndicator size="small" color="white" />
                                    ) : (
                                        <Text bold white center>
                                            Add
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

AddPlant.defaultProps = {
    profile: mocks.profile
};

export default AddPlant;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2
    },
    avatar: {
        height: theme.sizes.base * 3,
        width: theme.sizes.base * 3,
        marginTop : 20,
        left: '40%'
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
