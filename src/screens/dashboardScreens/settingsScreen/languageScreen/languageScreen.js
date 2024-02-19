import {StatusBar, TouchableOpacity, View} from 'react-native';

import {useEffect, useState} from 'react';
import {style} from './styles';

import {
    constants,
  iconNames,
  routeKeys,
  spacing,
  strings,
  wp,
} from '../../../../theme/index';

import useThemedStyles from '../../../../services/useThemedStyles';
import HeaderComponent from '../../../../components/headerComponent';
import IconComponent from '../../../../components/iconComponent';
import TextComponent from '../../../../components/textComponent';
import {FocusAwareStatusBar} from '../../../../components/statusbarComponent';
import LinearGradientComponent from '../../../../components/linearGradientComponent';
import CustomFlatListComponent from '../../../../components/customFlatListComponent';
import { handleAsyncSaveData } from '../../../../services/storeAsyncData';

const headerTopMargin = StatusBar.currentHeight;

const LanguageBody = ({navigation}) => {
  const currentLangCode = strings.getLanguage();
  const [currentLang, setCurrentLang] = useState(currentLangCode);

  const languageData = [
    {
      langName: 'English',
      code: 'en',
    },
    {
      langName: 'French',
      code: 'fr',
    },
    {
      langName: 'Gujarati',
      code: 'gu',
    },
  ];
  const styles = useThemedStyles(style);

  const handleChangeLanguage = async ({code}) => {
    console.log(code);
    strings.setLanguage(code);
    setCurrentLang(code);
    const langSet = await handleAsyncSaveData(
      constants.storageKeys.SAVEDLANGUAGE,
     code
    );
    if (langSet) {
      setTimeout(() => navigation.navigate(routeKeys.SETTINGSSTACK));
    }
  };
  return (
    <View
      style={{
        marginTop: 10,
        marginHorizontal: spacing.r,
      }}>
      <CustomFlatListComponent
        data={languageData}
        isHorizontal={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        itemSeperator={() => (
          <View
            style={{
              padding: spacing.xxs,
            }}
          />
        )}
        renderItem={({item, index}) => {
          return (
            <LinearGradientComponent
              colorList={styles.headerBg}
              linearStyle={styles.linearStyle}
              children={
                <TouchableOpacity
                  onPress={() => handleChangeLanguage({code: item.code})}>
                  <View style={styles.cardBg}>
                    <TextComponent
                      text={item.langName}
                      textStyle={
                        currentLang === item.code
                          ? styles.cardSubTitle
                          : [styles.cardSubTitle, {width: wp(87)}]
                      }
                    />

                    {currentLang === item.code && (
                      <IconComponent
                        iconName={iconNames.check}
                        iconColor={styles.whiteIcon}
                        iconSize={18}
                        iconViewStyle={{
                          justifyContent: 'flex-end',
                          marginLeft: 10,
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              }
            />
          );
        }}
      />
    </View>
  );
};

const LanguageScreen = ({navigation}) => {
  const styles = useThemedStyles(style);

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
            <IconComponent
              iconColor={styles.whiteIcon}
              iconName={iconNames.leftArrow}
              iconSize={25}
              onIconPress={() => navigation.goBack()}
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
              text={strings.language}
              textStyle={styles.headerTitle}
            />
          }
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.viewContainer}>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={styles.statusBg}
        translucent={true}
      />
      <LanguageBody navigation={navigation} />
    </View>
  );
};

export default LanguageScreen;
