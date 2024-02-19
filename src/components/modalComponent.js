import {Modal, StyleSheet, View} from 'react-native';
import useThemedStyles from '../services/useThemedStyles';

const ModalComponent = ({
  modalChildren,
  isModalVisible,
  modalStyle,
  onRequestClose,
}) => {
  const styles = useThemedStyles(style);
  return (
    <View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        style={[styles.modalStyle, modalStyle]}
        onRequestClose={() => onRequestClose()}>
        {modalChildren != undefined && modalChildren}
      </Modal>
    </View>
  );
};

const style = themeMode =>
  StyleSheet.create({
    modalStyle: {
      color: themeMode.whiteNoTheme,
      width: 'auto',
      height: 'auto',
    },
  });

export default ModalComponent;
