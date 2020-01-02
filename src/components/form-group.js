import React from 'react';

// import { Container } from './styles';

export default function FormGroup(props) {
  return (
    <div className="form-group">
        <label htmlFor={props.htmlFor}>{props.label}</label>
        {props.children}
    </div>
  );
}
