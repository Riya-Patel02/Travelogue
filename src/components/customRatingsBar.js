import {StyleSheet, TouchableOpacity, View} from 'react-native';
import useThemedStyles from '../services/useThemedStyles';
import {useState} from 'react';
import IconComponent from './iconComponent';
import { iconNames } from '../theme';

const CustomRatingsBar = ({isDisabled, onPress, ratings}) => {
  const styles = useThemedStyles(style);
  const [defaultRating, setDefaultRating] = useState(1);
  const [maxRatings, setMaxRatings] = useState([1, 2, 3, 4, 5]);

  const currentRatings = Math.floor(ratings);
  const clampedRatings = Math.max(0, Math.min(ratings, 5));

  const halfRatings = ratings % 1 !== 0;

  return (
    <View style={styles.viewContainer}>
      {maxRatings.map((maxRating, index) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            disabled={isDisabled}
            key={maxRating}
            style={{
              marginTop: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onPress}>
            <IconComponent
              iconViewStyle={{}}
              iconColor={styles.ratingsIcon}
              iconName={
                index < currentRatings
                  ? iconNames.star
                  : index <= currentRatings && halfRatings
                  ? iconNames.half_star
                  : iconNames.star_outline
              }
              iconSize={20}
              isDisabled={isDisabled}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const style = themeMode =>
  StyleSheet.create({
    viewContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 5,
    },
    ratingsIcon: themeMode.yellow,
  });
export default CustomRatingsBar;
