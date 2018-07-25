import React, { Component } from 'react';
import {
   Text,
   View,
   ViewPropTypes,
   TouchableWithoutFeedback,
   TextInput as RNTextInput
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './TextInputStyle';
import generalStyles from '../../config/style';
import Icon, {ICONS} from "../Icon";

export default class TextInput extends Component {
   static propTypes = {
      editable: PropTypes.bool,
      placeHolder: PropTypes.string,
      value: PropTypes.string,
      title: PropTypes.string,
      inputViewStyle: ViewPropTypes.style,
      inputStyle: ViewPropTypes.style,
      onChangeInputText: PropTypes.func,
      onFocusInput: PropTypes.func,
      iconRight: PropTypes.string,
      onPressRightIcon: PropTypes.func,
      iconRightStyle: ViewPropTypes.style,
      linesNumber: PropTypes.number,
      onlyNumbers: PropTypes.bool,
      placeHolderTextColor: PropTypes.string
   };

   constructor (props) {
      super (props);

      this.state = {
         inputText: null
      }
   }

   /**
    * Update input text if it comes from outside
    * @param newProps
    */
   componentWillReceiveProps (newProps) {
      if (newProps.value !== undefined && !this.state.inputText) {
         this.setState({
            inputText: newProps.value
         });
      }
   }

   /**
    * Update state
    * and if it needs call method from props
    * @param text
    */
   onValueChanged (text) {
      this.setState({
         inputText: text
      });
      if (this.props.onChangeInputText) {
         this.props.onChangeInputText.call(this, text);
      }
   }

   /**
    * if it needs - call method from props
    */
   onPressInput () {
      if (this.props.onFocusInput) {
         this.props.onFocusInput();
      }
   }

   /**
    * if it needs - call method from props
    */
   unFocusInput () {
      if (this.props.unFocusInput) {
         this.props.unFocusInput();
      }
   }

   /**
    *
    */
   onPressRightIcon () {
      if (this.props.onPressRightIcon) {
         this.props.onPressRightIcon();
      }
   }

   /**
    * Main render method
    * @returns {*}
    */
   render() {
      return (
         <View style={ [styles.inputView, this.props.inputViewStyle] }>

            { /* Title */
               this.props.title &&
               <Text style={ generalStyles.title }>
                  { this.props.title }
               </Text>
            }

            {/* Input */}
            <RNTextInput
               style={ [styles.input, this.props.inputStyle] }
               value={ this.state.inputText }
               keyboardType={ this.props.onlyNumbers ? 'numeric' : 'default' }
               multiline={ !!this.props.linesNumber }
               numberOfLines={ this.props.linesNumber }
               placeholder={ this.props.placeHolder }
               placeholderTextColor={ this.props.placeHolderTextColor }
               autoCorrect={ false }
               underlineColorAndroid={ 'transparent' }
               editable={ this.props.editable !== undefined ? this.props.editable : true }
               onFocus={ this.onPressInput.bind(this) }
               onChangeText={ this.onValueChanged.bind(this) }
               onEndEditing={ this.unFocusInput.bind(this) }/>

            {
               /* Right icon */
               this.props.iconRight &&
               <TouchableWithoutFeedback
                  onPress={ this.onPressRightIcon.bind(this) }>
                  <View style={ [styles.iconRight, this.props.iconRightStyle] }>
                     <Icon icon={ ICONS[this.props.iconRight] } />
                  </View>
               </TouchableWithoutFeedback>
            }

         </View>
      );
   }
}