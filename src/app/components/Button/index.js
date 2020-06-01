import React from 'react';
import {NavLink} from "react-router-dom";
import './style.scss';

export const Button = ({linkPath, className, children, onClick}) => {

  const cN = ['button'];
  if (className) {
    cN.push(className)
  }

  if (linkPath) {
    cN.push('button-link');
    return (
      <NavLink to={linkPath} className={cN.join(' ')}>{children}</NavLink>
    )
  } else {
    return (
      <button className={cN.join(' ')} onClick={onClick}>{children}</button>
    )
  }
};