import React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import TextComponent from './textComponent';
import IconComponent from './iconComponent';
import iconNames from '../utils/iconNames';

const AlertComponent = ({
  displayAlert,
  displayAlertIcon,
  alertTitleText,
  alertMessageText,
  displayPositiveButton,
  positiveButtonText,
  displayNegativeButton,
  negativeButtonText,
  onPressPositiveButton,
  onPressNegativeButton,
}) => {
  onNegativeButtonPress = () => {
    onPressNegativeButton();
  };

  onPositiveButtonPress = () => {
    onPressPositiveButton();
  };

  return (
    <Modal
      visible={displayAlert}
      transparent={true}
      animationType={'fade'}>
      <View style={styles.mainOuterComponent}>
        <View style={styles.mainContainer}>
          {/* First ROw - Alert Icon and Title */}
          <View style={styles.topPart}>
            {displayAlertIcon && (
              <IconComponent 
              iconName={iconNames.notifications}
              iconSize={25}
              iconColor={'black'} />
              // <Image
              //   source={require('./images/ic_notification.png')}
              //   resizeMode={'contain'}
              //   style={styles.alertIconStyle}
              // />
            )}
            <Text style={styles.alertTitleTextStyle}>
              {`${alertTitleText}`}
            </Text>
          </View>
          {/* Second Row - Alert Message Text */}
          <View style={styles.middlePart}>
            <Text style={styles.alertMessageTextStyle}>
              {`${alertMessageText}`}
            </Text>
          </View>
          {/* Third Row - Positive and Negative Button */}
          <View style={styles.bottomPart}>
            {displayPositiveButton && (
              <TouchableOpacity
                onPress={onPositiveButtonPress}
                style={styles.alertMessageButtonStyle}>
                <Text style={styles.alertMessageButtonTextStyle}>
                  {positiveButtonText}
                </Text>
              </TouchableOpacity>
            )}
            {displayNegativeButton && (
              <TouchableOpacity
                onPress={onNegativeButtonPress}
                style={styles.alertMessageButtonStyle}>
                <TextComponent
                  text={negativeButtonText}
                  textStyle={styles.alertMessageButtonTextStyle}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainOuterComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000088',
  },
  mainContainer: {
    flexDirection: 'column',
    height: '25%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#404040',
    // borderWidth: 2,
    // borderColor: '#FF0000',
    borderRadius: 10,
    padding: 4,
  },
  topPart: {
    flex: 0.5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#00FF00',
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  middlePart: {
    flex: 1,
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#FF6600',
    padding: 4,
    color: '#FFFFFF',
    fontSize: 16,
    marginVertical: 2,
  },
  bottomPart: {
    flex: 0.5,
    width: '100%',
    // borderWidth: 1,
    // borderColor: '#0066FF',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-evenly',
  },
  alertIconStyle: {
    // borderWidth: 1,
    // borderColor: '#cc00cc',
    height: 35,
    width: 35,
  },
  alertTitleTextStyle: {
    flex: 1,
    textAlign: 'justify',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    // borderWidth: 1,
    // borderColor: '#660066',
    padding: 2,
    marginHorizontal: 2,
  },
  alertMessageTextStyle: {
    color: '#FFFFFF',
    textAlign: 'justify',
    fontSize: 16,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  alertMessageButtonStyle: {
    width: '30%',
    paddingHorizontal: 6,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: '#80BFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertMessageButtonTextStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default AlertComponent;
