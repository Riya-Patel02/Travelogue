import {FlatList, StyleSheet} from 'react-native';
import useThemedStyles from '../services/useThemedStyles';

const CustomFlatListComponent = ({
  data,
  keyExtractor,
  itemSeperator,
  renderItem,
  isHorizontal,
  showsHorizontalScrollIndicator,
  showsVerticalScrollIndicator,
  numColumns,
  columnWrapperStyle,
  contentContainerStyle,
  onEndReached,
  onEndReachedThreshold
}) => {
  const styles = useThemedStyles(style);
  return (
    <FlatList
      data={data}
      horizontal={isHorizontal}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      contentContainerStyle={contentContainerStyle}
      columnWrapperStyle={
        numColumns ? [styles.columnWrapperStyle, columnWrapperStyle] : null
      }
      // initialNumToRender={10}
      ItemSeparatorComponent={itemSeperator}
      pagingEnabled={true}
      renderItem={renderItem}
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={onEndReached} 
      onScrollEndDrag={() => console.log("end")}
    />
  );
};

const style = themeMode =>
  StyleSheet.create({
    columnWrapperStyle: {
      justifyContent: 'space-between',
      alignContent: 'center',
      width: '100%',
      flex: 1,
    },
  });

export default CustomFlatListComponent;
