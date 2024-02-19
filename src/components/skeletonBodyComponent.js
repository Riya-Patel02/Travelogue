import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonBodyComponent = ({children}) => {
  return (
    <SkeletonPlaceholder
      speed={1500}
      backgroundColor="#f5f5f5"
      highlightColor="#c0c0c0">
      {children}
    </SkeletonPlaceholder>
  );
};

export default SkeletonBodyComponent;
