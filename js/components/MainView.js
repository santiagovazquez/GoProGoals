import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import Button from './Button';

class MainView extends Component {
  render() {
    const { onGoal, onRecord, onStop, isRecording, goToLogs } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          {
            isRecording ?
              <Button style={styles.playBtn} onPress={onStop}>DETENER</Button>
              : <Button style={styles.playBtn} onPress={onRecord}>FILMAR</Button>
          }
          <Button style={styles.playBtn} onPress={goToLogs}>LOGS</Button>
        </View>
        <View style={styles.goalBtnContainer}>
          <Button
            textStyle={styles.goalBtnText}
            style={styles.goalBtn}
            isDisabled={!isRecording}
            onPress={onGoal}>GOL</Button>
        </View>
      </View>
    );
  }
}

MainView.propTypes = {
  onGoal: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  isRecording: PropTypes.bool.isRequired,
  goToLogs: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'row'
  },
  playBtn: {
    marginTop: 30,
    height: 60,
    flex: 1,
  },
  goalBtnContainer: {
    flexDirection: 'column',
    flex: 1
  },
  goalBtn: {
    flex: 1
  },
  goalBtnText: {
    fontSize: 120,
    fontWeight: 'bold'
  },
});

export default MainView;
