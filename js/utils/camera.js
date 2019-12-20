// GoProHacks https://github.com/KonradIT/goprowifihack
import _ from 'lodash';
import {CAMARA_IP, CAMARA_PORT, CAMARA_PASSWORD} from '../constants';
import {ProcessingManager} from 'react-native-video-processing';
import Logger from './Logger';
import RNFS from 'react-native-fs';

export const delay = millis => {
  return (...args) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(...args);
      }, millis);
    });
};

export const startRecording = () => {
  Logger.addLog(`start recording at: ${new Date()}`);
  return fetch(`http://${CAMARA_IP}/bacpac/SH?t=${CAMARA_PASSWORD}&p=%01`)
};

export const stopRecording = () => {
  Logger.addLog(`stop recording at: ${new Date()}`);
  return fetch(`http://${CAMARA_IP}/bacpac/SH?t=${CAMARA_PASSWORD}&p=%00`)
};

export const deleteAllFromCamara = () => {
  Logger.addLog('delete all files from camera');
  return fetch(`http://${CAMARA_IP}/camera/DA?t=${CAMARA_PASSWORD}`);
};

export const deleteFromCache = filepath => {
  Logger.addLog(`deleteFromCache ${filepath}`);
  return RNFS.unlink(filepath);
};

export const deleteVideo = (video) => {
  Logger.addLog(`delete video ${video}`);
  return fetch(`http://${CAMARA_IP}/camera/DF?t=${CAMARA_PASSWORD}&p=%15100GOPRO/${video}`);
};

export const getLastVideoURL = () => {
  Logger.addLog(`fetching video list from camera`);
  return fetch(`http://${CAMARA_IP}:${CAMARA_PORT}/gp/gpMediaList`)
    .then(response => response.json())
  	.then((jsonResponse) => {
  		const videoName = _.chain(jsonResponse.media)
        .find((mediaObj) => mediaObj.d === "100GOPRO")
        .get('fs')
        .last()
        .get('n')
        .value();

      Logger.addLog(`last video url: http://${CAMARA_IP}:${CAMARA_PORT}/videos/DCIM/100GOPRO/${videoName}`);
  		return `http://${CAMARA_IP}:${CAMARA_PORT}/videos/DCIM/100GOPRO/${videoName}`;
  	});
};

// returns the duration of the video as float
export const getVideoDuration = (videoURL) => {
  Logger.addLog(`getting video duration`);
  return ProcessingManager.getVideoInfo(videoURL)
    .then(({ duration }) => duration);
};

// returns the path of the result file
export const trimVideo = (videoURL, startTime, endTime) => {
  Logger.addLog(`trimming ${videoURL}, from ${startTime}s to ${endTime}s`);
  return ProcessingManager.trim(videoURL, { startTime, endTime, saveToCameraRoll: true });
};
