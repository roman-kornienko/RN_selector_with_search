import {StyleSheet} from "react-native";
import generalStyles from "../../config/style";

const styles = {
   inputView: {
      minWidth: 60,
   },
   input: {
      color: generalStyles.colors.black,
      borderColor: generalStyles.colors.steel,
      borderWidth: 1,
      borderRadius: generalStyles.sizes.one,

      paddingVertical: generalStyles.sizes.one / 2,
      paddingHorizontal: generalStyles.sizes.one,

      zIndex: 0
   },
   title: {
      ...generalStyles.fonts.normal_bold,
      color: generalStyles.colors.black,
      marginBottom: generalStyles.sizes.one / 2
   },
   iconRight: {
      position: 'absolute',
      right: 5,
      top: 8,
      zIndex: 10
   }
};

export default StyleSheet.create(styles);