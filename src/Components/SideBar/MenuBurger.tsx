import React from 'react';
import menuBurger from "../../Icons/menuBurger.svg";
import menuArrow from "../../Icons/menuArrow.svg";
import styled from "styled-components";

type MenuBurgerType = {
  isOpen: boolean
  toggle: (isOpen: boolean)=>void
}

export const MenuBurger: React.FC<MenuBurgerType> = ({isOpen, toggle}) => {
  const toggleHandler = () => toggle(!isOpen)
  return<Wrapper>
    <MenuBurgerImg
    src={isOpen ? menuArrow : menuBurger}
    onClick={toggleHandler}
    alt='menu'/>
    </Wrapper>
};

const MenuBurgerImg = styled.img` 
  width: 40px;
  cursor: pointer;
  user-select: none;
  transition: 0.2s;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
`


