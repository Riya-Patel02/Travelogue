import TopTabNavigator from '../../../../../components/navigators/topTabNavigator';
import DetailsScreen from './detailsScreen';

const DetailFragment = ({navigation, route}) => {
  return (
    <>
      <DetailsScreen navigation={navigation} route={route} />

      <TopTabNavigator route={route} navigation={navigation} />
    </>
  );
};

export default DetailFragment;
