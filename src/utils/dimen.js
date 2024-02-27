import {
  Dimensions,
  PixelRatio,
  Platform,
  useWindowDimensions,
} from 'react-native';

// Dimen.js
export const useDimensions = () => {
  const {height, width, scale, fontScale} = useWindowDimensions();

  return {
    windowHeight: height,
    windowWidth: width,
    pixelRatio: scale,
    fontScale,
  };
};

 const screenWidth = Dimensions.get('screen').width;
 const screenHeight = Dimensions.get('screen').height;

///scale factor based on device width
const scaleHorizontal = screenWidth / 375;

///scale factor based on device height
const scaleVertical = screenHeight / 812;

///function to get normal horizontal size according to platform
 function getNormalisedSizeWithPlatformOffset(size) {
  const newSize = size * scaleHorizontal;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
}

///function to get normal vertical size according to platform
 function getNormalisedVerticalSizeWithPlatformOffset(size) {
  const newSize = size * scaleVertical;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
}

 const widthPercentageToDP  = widthPercent => {
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

 const heightPercentageToDP = heightPercent => {
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};



export {
  heightPercentageToDP,
  widthPercentageToDP,
  getNormalisedSizeWithPlatformOffset,
  getNormalisedVerticalSizeWithPlatformOffset


}