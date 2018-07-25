import React, { Component } from 'react';
import {
   View,
   Text,
   ScrollView,
   TouchableOpacity,
   ViewPropTypes
} from 'react-native';

import TextInput from '../textInput/TextInput';
import PropTypes from 'prop-types';

import styles from './SelectorWithSearchStyle';

export default class SelectorWithSearch extends Component {
   static propTypes = {
      // Search items
      data: PropTypes.array.isRequired,
      onChooseMaterialType: PropTypes.func,
      wrongValue: PropTypes.bool
   };

   constructor (props) {
      super (props);

      this.state = {
         items: this.props.data || null,
         filteredItems: null,
         chooseVariant: null,
         showVariants: false
      }
   }

   /**
    * Find variant by text filter
    * @param text
    */
   changeInputText (text) {
      if (text) {
         text = text.toLowerCase();
         let resultItems = this.state.items.filter((item) => {
            if (item.name.indexOf(text) === 0) {
               return item;
            }
         });
         this.setState({
            chooseVariant: null,
            filteredItems: resultItems
         });
      } else {
         this.setState({
            filteredItems: null
         });
      }
   }

   /**
    * find variant by id
    * @param id
    */
   itemFinder (id) {
      let result = null;
      this.state.items.some((item) => {
         if (item.id === id) {
            result = item;
            return true;
         }
      });
      return result;
   }

   /**
    * Set new item name to state, that will send by props to input component
    * @param index
    */
   onChooseVariant (index) {
      let item = this.itemFinder(index);

      if (item) {
         this.props.onChooseMaterialType(item);
      }

      this.setState({
         chooseVariant: item ? item.name : null,
         showVariants: false
      });
   }

   /**
    * render variables
    * @returns {Array}
    */
   makeVariants () {
      let result = [];
      const variants = this.state.filteredItems || this.state.items;

      variants.map((item, index) => {
         result.push(
            <TouchableOpacity key={ index } onPress={ this.onChooseVariant.bind(this, item.id) }>
               <View style={ styles.oneVariant }>
                  <Text>
                     { item.name }
                  </Text>
               </View>
            </TouchableOpacity>
         );
      });

      return result;
   }

   /**
    * On focus input - show variants
    */
   changeVariantsVisibility () {
      this.setState({
         showVariants: !this.state.showVariants
      });
   }

   /**
    * main render method
    * @returns {*}
    */
   render () {
      let mainViewSelector = this.state.showVariants ? styles.selectorViewHeight : {};
      return (
         <View style={ [styles.selectorView, mainViewSelector] }>
            <View style={ styles.textInputView }>
               <TextInput
                  inputStyle={ this.props.wrongValue ? styles.validateForm : {} }
                  value={ this.state.chooseVariant }
                  editable={ true }
                  placeHolder={ 'Выберите материал' }
                  onChangeInputText={ this.changeInputText.bind(this) }
                  onFocusInput={ this.changeVariantsVisibility.bind(this) }
                  iconRight={ 'arrow_right' }
                  onPressRightIcon={ this.changeVariantsVisibility.bind(this) }>
               </TextInput>
            </View>

            {
               this.state.showVariants &&
               <ScrollView
                  style={ styles.variants }
                  showsHorizontalScrollIndicator={ true }>
                  { this.makeVariants() }
               </ScrollView>
            }
         </View>
      );
   }
}