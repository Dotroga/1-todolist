import React, { memo } from "react";
import styled, { css } from "styled-components";
import { Loader } from "../Loader/Loader";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  title: string;
  loading?: 'normal' | 'loading',
  color?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const SuperButton: React.FC<ButtonProps> = memo(({ title, loading, color, ...restProps }) => {
  return (
    <Button title={title} loading={loading} color={color} {...restProps}>
      {loading === 'loading' && <Loader />}
      {title}
    </Button>
  );
});

const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;
      &:hover {
        filter: brightness(90%);
      }
      &:active {
        filter: brightness(110%);
      }
    `};
  opacity: ${({ disabled }) => disabled && "0.6"};
  height: 37px;
  min-width: 60px;
  padding: 5px;
  color: ${({ loading, theme}) => (loading === 'loading' ? theme.colors.color : "white")};
  background-color: ${({theme})=>theme.colors.color};
  border-radius: 8px;
  border: none;
  transition: 0.3s;
`;
