import { StyleSheet } from 'react-native';
import { getNormalisedVerticalSizeWithPlatformOffset } from './dimen';

const GlobalStyles = StyleSheet.create({
  forTopBottom: {
    marginTop: getNormalisedVerticalSizeWithPlatformOffset(5),
    marginBottom: getNormalisedVerticalSizeWithPlatformOffset(5),
    paddingTop: getNormalisedVerticalSizeWithPlatformOffset(5),
    paddingBottom: getNormalisedVerticalSizeWithPlatformOffset(5),
  },
  forLeftRight: {
    marginLeft: getNormalisedVerticalSizeWithPlatformOffset(15),
    marginRight: getNormalisedVerticalSizeWithPlatformOffset(15),
    paddingLeft: getNormalisedVerticalSizeWithPlatformOffset(15),
    paddingRight: getNormalisedVerticalSizeWithPlatformOffset(15),
  },
});


export default GlobalStyles;