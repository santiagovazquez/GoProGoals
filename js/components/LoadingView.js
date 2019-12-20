import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


class LoadingView extends Component {
  render() {
    return (
      <View style={styles.loadingView}>
        <Text style={styles.loadingText}>Espere...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: 'white',
    fontSize: 40,
  },
});

export default LoadingView;
