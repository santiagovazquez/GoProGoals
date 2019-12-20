# GoProGoals

An app to record your goals!

It is required:

- A GoPro Hero3 Cam
- An Iphone (not tested on Android) 
- Xcode on your computer

## How it works

This app is just a big button that waits to be pressed. 

Cam should be always be recording your game. When a goal happens, press the button.

The app will make the cam to stop recording and make a video from its last 16 seconds. All videos are stored on your cell Camroll.     
   
![alt text](assets/capture.jpeg)


## How can i use it

```
# clone this repo
git clone git@github.com:santiagovazquez/GoProGoals.git && cd GoProGoals && npm install
# edit constants.js file and put your cam wifi password on CAMARA_PASSWORD 
vim js/constants.js
# Open GoProGoals.xcworkspace 
open ios/GoProGoals.xcworkspace
# Hit Run
```

Your cell must be connected to Cam's wifi. 


