import React, {memo} from 'react';
import menuBurger from "../../Icons/menuBurger.svg";
import arrow from "../../Icons/arrow.svg";
import styled from "styled-components";

type MenuBurgerType = {
  isOpen: boolean
  toggle: (isOpen: boolean)=>void
}

export const MenuBurger: React.FC<MenuBurgerType> = memo(({isOpen, toggle}) => {
  const toggleHandler = () => toggle(!isOpen)
  return<Wrapper>
    <MenuBurgerImg
    src={isOpen ? arrow : menuBurger}
    onClick={toggleHandler}
    alt='menu'/>
    </Wrapper>
});

const MenuBurgerImg = styled.img` 
  width: 40px;
  cursor: pointer;
  user-select: none;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
`


