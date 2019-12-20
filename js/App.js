import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView
} from 'react-native';
import {
  startRecording,
  stopRecording,
  getLastVideoURL,
  getVideoDuration,
  trimVideo,
  deleteVideo,
  delay,
  deleteFromCache,
} from './utils/camera';
import MainView from "./components/MainView";
import LoadingView from './components/LoadingView';
import LogView from "./components/LogView";
import TaskManager from "./utils/TaskManager";
import Logger from './utils/Logger';
import KeepAwake from 'react-native-keep-awake';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mode: 'NOT_STARTED',
    };

    this.renderView = this.renderView.bind(this);
  }

  startRecording() {
    this.setState({ mode: 'LOADING' });
    startRecording()
      .then(() => { this.setState({ mode: 'READY' }); })
      .catch(e => {
        this.setState({ mode: 'READY' });
        Logger.addLog(`error: ${e}`)
      });
  }

  componentWillMount() {
    KeepAwake.activate();
  }

  componentWillUnmount() {
    KeepAwake.deactivate();
  }

  onGoal() {
    if (this.state.mode !== 'READY') {
      return;
    }

    this.setState({ mode: 'LOADING' });

    getLastVideoURL()
      .then((video) => {
        return stopRecording()
          .then(delay(1500))
          .then(startRecording)
          .then(() => {
            this.setState({ mode: 'READY' });

            TaskManager.scheduleTask(`extracting goal from video ${video}`, () => {
              return getVideoDuration(video)
                .then(duration => {
                  const maxLen = 18;
                  const twoDecimalsTrunc = (n) => Math.floor(n*100)/100;
                  const start = twoDecimalsTrunc(duration > maxLen ? duration - maxLen : 0);

                  return trimVideo(video, start, twoDecimalsTrunc(duration));
                })
                .then((url) => deleteFromCache(url))
                .then(delay(5000))
                .then(() => deleteVideo(video))
                .then(delay(5000))
                .catch(e => {
                  Logger.addLog(`error: ${e}`);
                });
            })
          });
      });
  }

  stopRecording() {
    this.setState({ mode: 'LOADING' });
    stopRecording()
      .then(() => {
        this.setState({ mode: 'NOT_STARTED' });
      })
      .catch((e) => { this.setState({ mode: 'ERROR', error: e }); })
  }

  renderView() {
    // console.warn(this.state.mode);
    switch (this.state.mode) {
      case 'LOADING':
        return <LoadingView/>;
      case 'NOT_STARTED':
      case 'READY':
        return <MainView
          isRecording={this.state.mode === 'READY'}
          onGoal={() => this.onGoal()}
          onRecord={() => this.startRecording()}
          onStop={() => this.stopRecording()}
          goToLogs={() => this.setState({ mode: 'LOG'})}/>;
      case 'LOG':
        return <LogView goBack={() => this.setState({ mode: 'READY'})}/>;
      default:
        throw new Error('invalid view');
    }
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <View style={styles.innerView}>{this.renderView()}</View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(13, 23, 40, 1.00)'
  },
  innerView: {
    flexDirection: 'row',
    marginHorizontal: 10,
    flex: 1,
  },
});
