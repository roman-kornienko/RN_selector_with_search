import {StyleSheet} from "react-native";
import generalStyles from "../../config/style";

const styles = {
   selectorView: {
      flex: 1,
      flexWrap: 'wrap',
   },
   selectorViewHeight: {
      height: 150
   },
   textInputView: {
      height: 40
   },
   variants: {
      borderWidth: 1,
      borderTopWidth: 0,
      borderRadius: generalStyles.sizes.one,
      borderColor: generalStyles.colors.steel
   },
   oneVariant: {
      paddingVertical: generalStyles.sizes.one / 2,
      paddingHorizontal: generalStyles.sizes.one,
      borderBottomWidth: 1,
      borderBottomColor: generalStyles.colors.silver
   },
   validateForm: {
      borderColor: generalStyles.colors.red
   }
};

export default StyleSheet.create(styles);