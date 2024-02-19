import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {ho, vo} from '../../theme';

const SkeletonBodyComponent = ({children}) => {
  // console.log('in compo');
  return (
    <SkeletonPlaceholder
      speed={1500}
      backgroundColor="#f5f5f5"
      highlightColor="#c0c0c0">
      {children}
    </SkeletonPlaceholder>
  );
};

const SkeletonBlock = () => {
  return (
    <SkeletonPlaceholder.Item
      flexDirection="row"
      justifyContent="flex-start"
      width={'auto'}
      height={'auto'}
      margin={5}
      padding={10}
      marginHorizontal={10}
      backgroundColor={'#adadad'}
      borderWidth={1}
      borderColor={'#adadad'}
      borderRadius={10}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        justifyContent="flex-start"
        width={'100%'}
        height={'100%'}
        backgroundColor={'white'}
        marginHorizontal={10}>
        <SkeletonPlaceholder.Item
          height={vo(80)}
          width={ho(80)}
          borderRadius={40}
          alignSelf="center"
          backgroundColor={'#adadad'}
        />
        <SkeletonPlaceholder.Item
          flex={1}
          marginLeft={10}
          justifyContent="center">
          <SkeletonPlaceholder.Item
            backgroundColor={'#adadad'}
            width={'90%'}
            height={15}
            marginBottom={3}
          />
          <SkeletonPlaceholder.Item
            backgroundColor={'#adadad'}
            width={'80%'}
            height={10}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder.Item>
  );
};

// const ProfileSkeleton = () => (
//   <SkeletonBodyComponent
//     children={
//       Array.from({length: 7}).map(item => (
//         <SkeletonPlaceholder.Item
//         key={}
//         flexDirection="row"
//         justifyContent="flex-start"
//         width={'auto'}
//         height={'auto'}
//         margin={5}
//         padding={10}
//         marginHorizontal={10}
//         backgroundColor={'#adadad'}
//         borderWidth={1}
//         borderColor={'#adadad'}
//         borderRadius={10}>
//         <SkeletonPlaceholder.Item
//           flexDirection="row"
//           justifyContent="flex-start"
//           width={'100%'}
//           height={'100%'}
//           backgroundColor={'white'}
//           marginHorizontal={10}>
//           <SkeletonPlaceholder.Item
//             height={vo(80)}
//             width={ho(80)}
//             borderRadius={40}
//             alignSelf="center"
//             backgroundColor={'#adadad'}
//           />
//           <SkeletonPlaceholder.Item
//             flex={1}
//             marginLeft={10}
//             justifyContent="center">
//             <SkeletonPlaceholder.Item
//               backgroundColor={'#adadad'}
//               width={'90%'}
//               height={15}
//               marginBottom={3}
//             />
//             <SkeletonPlaceholder.Item
//               backgroundColor={'#adadad'}
//               width={'80%'}
//               height={10}
//             />
//           </SkeletonPlaceholder.Item>
//         </SkeletonPlaceholder.Item>
//       </SkeletonPlaceholder.Item>
//       ))
//     }>
//     {/* <SkeletonBlock />
//     <SkeletonBlock />
//     <SkeletonBlock /> */}
//   </SkeletonBodyComponent>
// );
const ProfileSkeleton = () => (
  <SkeletonBodyComponent>
    {Array.from({ length: 7 }).map((item, index) => (
      <SkeletonPlaceholder.Item
        key={index} // Unique key added here
        flexDirection="row"
        justifyContent="flex-start"
        width={'auto'}
        height={'auto'}
        margin={5}
        padding={10}
        marginHorizontal={10}
        backgroundColor={'#adadad'}
        borderWidth={1}
        borderColor={'#adadad'}
        borderRadius={10}>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="flex-start"
          width={'100%'}
          height={'100%'}
          backgroundColor={'white'}
          marginHorizontal={10}>
          <SkeletonPlaceholder.Item
            height={vo(80)}
            width={ho(80)}
            borderRadius={40}
            alignSelf="center"
            backgroundColor={'#adadad'}
          />
          <SkeletonPlaceholder.Item
            flex={1}
            marginLeft={10}
            justifyContent="center">
            <SkeletonPlaceholder.Item
              backgroundColor={'#adadad'}
              width={'90%'}
              height={15}
              marginBottom={3}
            />
            <SkeletonPlaceholder.Item
              backgroundColor={'#adadad'}
              width={'80%'}
              height={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    ))}
  </SkeletonBodyComponent>
);

export default ProfileSkeleton;
