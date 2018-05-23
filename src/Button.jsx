// @flow
import React from 'react';

const Button = (props: {
  classname?: string,
  action?: Function,
  text: string
}) => {
  const { classname, action, text } = props;
  return (
    <button
      type="button"
      className={`button ${classname ? classname : ''}`}
      onClick={action}
    >
      {text}
    </button>
  );
};

export default Button;
