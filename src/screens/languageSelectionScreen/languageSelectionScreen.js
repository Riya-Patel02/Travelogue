import {Image, TouchableOpacity, View} from 'react-native';
import useThemedStyles from '../../services/useThemedStyles';
import {style} from './styles';
import {constants, iconNames, images, routeKeys, strings} from '../../theme';
import {FocusAwareStatusBar} from '../../components/statusbarComponent';
import TextComponent from '../../components/textComponent';

import ButtonComponent from '../../components/buttonComponent';

import {
  handleAsyncReadData,
  handleAsyncSaveData,
} from '../../services/storeAsyncData';
import {useEffect, useState} from 'react';
import IconComponent from '../../components/iconComponent';

const LanguageSelectionScreen = ({navigation}) => {
  const styles = useThemedStyles(style);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const fetchCurrentLang = async () => {
      const lang = await handleAsyncReadData(
        constants.storageKeys.SAVEDLANGUAGE,
      );
      if (lang != null) {
        strings.setLanguage(lang);
      }
    };

    fetchCurrentLang();
  }, [navigation]);

  const handleEnglishSelection = async () => {
    strings.setLanguage('en');
    const langSet = await handleAsyncSaveData(
      constants.storageKeys.SAVEDLANGUAGE,
      'en',
    );

    if (langSet) {
      setTimeout(() => navigation.navigate(routeKeys.LOGINKEY));
    }
  };

  const handleFrenchSelection = async () => {
    strings.setLanguage('fr');
    const langSet = await handleAsyncSaveData(
      constants.storageKeys.SAVEDLANGUAGE,
      'fr',
    );

    if (langSet) {
      setTimeout(() => navigation.navigate(routeKeys.LOGINKEY));
    }
  };
  return (
    <View style={styles.viewContainer}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={styles.statusBg}
        translucent={true}
      />
      <Image source={images.appIcon} style={styles.imageStyle} />
      <TextComponent text={strings.travelogue} textStyle={styles.titleStyle} />
      <TextComponent
        text={strings.travelMess}
        textStyle={styles.subTitleStyle}
      />

      <TextComponent
        text={strings.selectLang}
        textStyle={styles.selectionTitle}
      />

      <View
        style={{
          flexDirection: 'row',

          justifyContent: 'space-evenly',
          //   alignSelf: 'center',
          flex: 1,
          marginTop: 10,
        }}>
        <ButtonComponent
          btnTitle={strings.English}
          btnTitleStyle={[styles.btnTitle, {width: '45%'}]}
          btnStyle={[styles.btnStyle]}
          btnOnPress={handleEnglishSelection}
        />
        <ButtonComponent
          btnTitle={strings.French}
          btnTitleStyle={[styles.btnTitle, {width: '45%'}]}
          btnStyle={styles.btnStyle}
          btnOnPress={handleFrenchSelection}
        />
      </View>
      <TouchableOpacity
        style={styles.skipButtonStyle}
        onPress={() => navigation.navigate(routeKeys.LOGINKEY)}>
        <TextComponent text={strings.skip} textStyle={styles.skipButtontitle} />
        <IconComponent
          iconName={iconNames.right}
          iconColor={'black'}
          iconViewStyle={{
            justifyContent: 'center',
            height: 'auto',
            width: 'auto',
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
      {/* <ButtonComponent
        btnTitle={'Skip'}
        btnTitleStyle={[styles.skipButtontitle, {width: 'auto'}]}
        btnStyle={styles.skipButtonStyle}
        btnOnPress={() => navigation.navigate(routeKeys.LOGINKEY)}
        
      /> */}
    </View>
  );
};

export default LanguageSelectionScreen;
