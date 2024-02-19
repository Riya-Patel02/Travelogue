import {FlatList, StatusBar, TouchableOpacity, View} from 'react-native';

import {useCallback, useEffect, useState} from 'react';
import HeaderComponent from '../../../../../components/headerComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TextComponent from '../../../../../components/textComponent';
import {FocusAwareStatusBar} from '../../../../../components/statusbarComponent';
import useThemedStyles from '../../../../../services/useThemedStyles';
import {style} from './styles';
import ImageBackgroundComponent from '../../../../../components/imageBackground';
import CustomRatingsBar from '../../../../../components/customRatingsBar';

import {useFocusEffect} from '@react-navigation/native';
import IconComponent from '../../../../../components/iconComponent';

import LinearGradientComponent from '../../../../../components/linearGradientComponent';
import {handleAsyncReadData} from '../../../../../services/storeAsyncData';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  constants,
  iconNames,
  routeKeys,
  hp,
  spacing,
  strings
} from '../../../../../theme';

const headerTopMargin = StatusBar.currentHeight;

const MountainScreen = ({navigation}) => {
  const styles = useThemedStyles(style);
  const userJson = require('../../../../../data/jsonData/resort.json');

  const [favList, setFavList] = useState([]);



  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <HeaderComponent
          colorList={styles.headerBg}
          containerStyle={{
            justifyContent: 'center',
            alignSelf: 'center',
            height: 'auto',
          }}
          headerStyle={{
            height: 'auto',
          }}
          headerLeftViewStyle={{
            width: 'auto',
            padding: 0,
            marginTop: headerTopMargin,
            justifyContent: 'center',
          }}
          headerLeftChildren={
            <Ionicons
              name="arrow-back"
              size={25}
              color={styles.whiteIcon}
              onPress={() => {
                navigation.goBack();
              }}
            />
          }
          headerMiddleViewStyle={{
            width: '85%',
            marginTop: headerTopMargin,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          headerMiddleChildren={
            <TextComponent
              text={strings.mountains}
              textStyle={styles.headerTitle}
            />
          }
        />
      ),
    });
  }, [navigation]);

  return (
    <View styles={styles.viewContainer}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={styles.statusBg}
        translucent={true}
      />
    </View>
  );
};

export default MountainScreen;
