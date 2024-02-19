import { StatusBar, View } from 'react-native';

import { useEffect } from 'react';
import HeaderComponent from '../../../../../components/headerComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextComponent from '../../../../../components/textComponent';
import { FocusAwareStatusBar } from '../../../../../components/statusbarComponent';
import useThemedStyles from '../../../../../services/useThemedStyles';
import { style } from './styles';
import { strings } from '../../../../../utils/strings';

const headerTopMargin= StatusBar.currentHeight;

const RecommendedScreen = ({navigation}) => {
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
            marginTop:headerTopMargin,
            padding:0,
            justifyContent: 'center',
          }}
          headerLeftChildren={
            <Ionicons
              name="arrow-back"
              size={25}
              color={styles.whiteIcon}
              onPress={() => navigation.goBack()}
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
              text={strings.recommendedPlaces}
              textStyle={styles.headerTitle}
            />
          }
        />
      ),
    });
  }, []);

  return (
    <View>
      <FocusAwareStatusBar
        barStyle="light-content"
        backgroundColor={styles.statusBg}
        translucent={true}
      />
    </View>
  );
};

export default RecommendedScreen;
