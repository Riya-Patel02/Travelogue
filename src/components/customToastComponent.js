import Toast from 'react-native-simple-toast';

const CustomToastComponent = ({message, gravity, options}) => {
  if (gravity) {
    return Toast.showWithGravity(message, Toast.SHORT, gravity, options);
  } else {
    return Toast.show(message, Toast.SHORT, options);
  }
};

export default CustomToastComponent;
