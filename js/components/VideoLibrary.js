import React, { Component } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { fetchVideos } from '../utils/videos';
import _ from 'lodash';
import Button from 'apsl-react-native-button';

export default class VideoLibrary extends Component {

  constructor(props) {
    super(props);
    this.state = { videos : [] };
  }

  loadVideos() {
    fetchVideos()
      .then((videos) => this.setState({ videos }));
  }

  handleClick(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  }

  componentDidMount() {
   this.loadVideos();
  }

  render() {
    const buttons = _.map(this.state.videos, (el, idx) => {
      return <Button
        style={styles.btn}
        key={idx}
        onPress={() => this.handleClick(el)}>{_.last(el.split('/'))}</Button>;
    });

    return <View style={styles.btnContainer}>
      {buttons}
      <Button
        style={styles.btn}
        onPress={() => this.props.onBack()}>VOLVER</Button>
    </View>;
  }
}


const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    //flexDirection: 'column',
    //flex: 1
  },
  btn: {
    height: 60,
    borderColor: '#16a085',
    backgroundColor: '#1abc9c'
  }
});
