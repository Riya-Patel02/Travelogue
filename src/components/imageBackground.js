import {ImageBackground, StyleSheet} from 'react-native';
import useThemedStyles from '../services/useThemedStyles';

const ImageBackgroundComponent = ({
  children,
  imageStyle,
  imageSrc,
  resizeMode,
  uri,
  containerStyle,
}) => {
  const styles = useThemedStyles(style);
  return (
    <ImageBackground
      source={imageSrc != undefined ? imageSrc : {uri: uri}}
      resizeMode={'cover'}
      imageStyle={[styles.imageStyle, imageStyle]}
      style={[styles.containerStyle, containerStyle]}>
      {children}
    </ImageBackground>
  );
};

const style = themeMode =>
  StyleSheet.create({
    containerStyle: {
      // flex:1,
      width: '100%',
      height: '100%',
      shadowColor: themeMode.blackNoTheme,
    },
    imageStyle: {},
  });

export default ImageBackgroundComponent;
