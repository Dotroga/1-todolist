import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, memo, useState} from "react";
import { WrapperInput } from "./SuperInputStyled";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type PropsType = Omit<DefaultInputPropsType, "type"> & {
  name: string;
  type?: "text" | "number" | "email" | "password";
  color?: string;
  error: string | false | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
};
export const SuperInput: React.FC<PropsType> = memo((
  { name, color, error, type, onChange, ...restProps }) => {
  const upperName = name.charAt(0).toUpperCase() + name.slice(1);

  const [filled, setFilled] = useState(false)

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e)
    setFilled(!!e.currentTarget.value)
  }

  return (
    <WrapperInput color={color!} error={error} filled={filled}>
      <input name={name} type={type} {...restProps} onChange={handler} required={true}/>
      <span>{error ? error : upperName}</span>
    </WrapperInput>
  );
});
