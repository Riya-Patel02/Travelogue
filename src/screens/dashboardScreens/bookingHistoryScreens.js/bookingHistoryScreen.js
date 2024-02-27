import {
  StatusBar,
  View
} from 'react-native';

import { useEffect } from 'react';
import { style } from './styles';

import {
  iconNames, strings
} from '../../../theme/index';

import useThemedStyles from '../../../services/useThemedStyles';
import HeaderComponent from '../../../components/headerComponent';
import IconComponent from '../../../components/iconComponent';
import TextComponent from '../../../components/textComponent';
import { FocusAwareStatusBar } from '../../../components/statusbarComponent';
import ValidationUtils from '../../../utils/validationUtils';

const validation = new ValidationUtils();

const headerTopMargin = StatusBar.currentHeight;

const BookingHistoryScreen = ({navigation, route}) => {
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
              iconName={iconNames.menu}
              iconSize={25}
              onIconPress={() => navigation.toggleDrawer()}
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
              text={strings.bookScreen}
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
      
    </View>
  );
};

export default BookingHistoryScreen;
