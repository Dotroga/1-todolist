import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";
import styled, {css} from "styled-components";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, "type"> & {
  color?: string;
}
export const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({children,color, ...restProps}) => {
  const {checked} = restProps
  return (
    <Wrapper checked={checked!} color={color}>
      <div className='checkbox'>
        <input type="checkbox" {...restProps}/>
        <svg viewBox="0 0 24 24">
          <path d="M6 12L10.2426 16.2426L18.727 7.75732"/>
        </svg>
      </div>
      {children}
    </Wrapper>
  )
};

const Wrapper = styled.label<{ checked: boolean , color: string | undefined}>`
  display: flex;
  gap: 5px;

  .checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 22px;
    width: 22px;
    min-width: 22px;
    border: 1px solid ${({theme, color}) => color ? color : theme.colors.color};
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    transition: .2s;
    &:hover {
      box-shadow: 0 0 1px 1px ${({theme, color}) => color ? color : theme.colors.color};
    }
  }
  input {
    display: none;
  }
  svg {
    position: absolute;
    width: 0;
    height: 0;
    fill: none;
    stroke: white;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0;
    transition: .3s;
  }

  ${({checked}) => checked && css<{color: string | undefined}>`
    svg {
      opacity: 1;
      width: 22px;
      height: 22px;
    }
    .checkbox {
      background-color:${({theme, color}) => color ? color : theme.colors.color};
    }
  `}
 
`
