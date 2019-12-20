import { AsyncStorage } from 'react-native';
import _ from 'lodash';

export const fetchVideos = () => {
  return AsyncStorage.getItem('@GoProGoalsStore:videos')
    .then(videosAsString => {
      return _.isEmpty(videosAsString) ? [] : JSON.parse(videosAsString);
    });
}


export const saveVideo = (videoURL) => {
  return fetchVideos()
    .then((videosArr) => {
      const newVideos = [...videosArr, videoURL];
      const newVideosStr = JSON.stringify(newVideos);
      return AsyncStorage.setItem('@GoProGoalsStore:videos', newVideosStr);
    });
}
