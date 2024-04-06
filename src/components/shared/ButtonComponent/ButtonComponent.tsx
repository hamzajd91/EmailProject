import React from 'react';
import './button.scss';

export interface Props {
  id?: string;
  className?: string;
  label: string;
  backgroundColor: string;
  color: string;
  size?: string;
  marginRight?: string;
  width?: string;
  height?: string;
  float?: string;
  clickHandler?: () => void;
}

const ButtonComponent = (props: Props) => {
  const {
    id,
    backgroundColor,
    color,
    label,
    marginRight,
    width,
    height,
    clickHandler,
  } = props;

  return (
    <button
      id={id}
      onClick={clickHandler}
      style={{
        color,
        backgroundColor,
        marginRight,
        width,
        height,
      }}
      type="submit"
      className="btn"
    >
      {label}
    </button>
  );
};
export default ButtonComponent;
