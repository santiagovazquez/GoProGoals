import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Button from './Button';
import Logger from '../utils/Logger';

class LogView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logs: Logger.logs
    };

    this.onLogChange = this.onLogChange.bind(this);
    Logger.onLogsChange(this.onLogChange);
  }

  onLogChange(logs) {
    this.setState({ logs });
  }

  render() {
    const { goBack } = this.props;
    return (
      <View style={styles.container}>
        <Button style={styles.backButton} onPress={goBack}>VOLVER</Button>
        <ScrollView style={styles.logsView}>
          {
            this.state.logs.map((l, idx) => <Text key={idx} style={styles.errorText}>{l}</Text>)
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'column',
    flex: 1,
  },
  backButton: {
    marginHorizontal: 10,
    // flex: 1,
    marginTop: 40,
    marginBottom: 20,
  },
  logsView: {

    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  errorText: {
    color: 'white'
  },
  loadingText: {
    color: 'white',
    fontSize: 40,
  },
});

export default LogView;

