import React, { Component } from 'react';
import { default as APSLButton } from 'apsl-react-native-button';
import {
  StyleSheet,
} from 'react-native';

class Button extends Component {
  render() {
    const { textStyle, style, children, isDisabled = false, ...rest } = this.props;
    const textStyles = textStyle ? [styles.btnText, textStyle] : [styles.btnText];

    if (isDisabled) {
      textStyles.push(styles.disabledText);
    }

    return (
      <APSLButton
        textStyle={textStyles}
        isDisabled={isDisabled}
        style={style ? [styles.btn, style] : styles.btn}
        disabledStyle={styles.btnDisabled}
        {...rest}>{children}</APSLButton>
    )
  }
}

const styles = StyleSheet.create({
  btnText: {
    color: 'white'
  },
  btn: {
    borderColor: 'rgba(153, 9, 22, 1.00)',
    backgroundColor: 'rgba(249, 46, 71, 1.00)',
    borderWidth: 2
  },
  btnDisabled: {
    borderColor: 'rgba(153, 9, 22, 0.5)',
    backgroundColor: 'rgba(249, 46, 71, 0.5)'
  },
  disabledText: {
    color: 'rgba(255, 255, 255, 0.5)'
  },
});

export default Button;
