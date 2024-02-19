import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import ProfileSkelton from './profileScreen';

const BookedScreens = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  });


  
  return (
    <View style={{flex:1,backgroundColor:'black'}}>
      {isLoading ? (
        <ProfileSkelton />
      ) : (
        <View style={{flex: 1}}>
          <Text style={{color:'white'}}>{'Design here what you want to design in your screen'}</Text>
        </View>
      )}
    </View>
  );
};





export default BookedScreens;
