import React from 'react';
import styled from "styled-components";
import {ThreeDotsButton} from "Components/Super/AdditionalOptionsList/ThreeDotsButton";
import {ModalWindow} from "Components/Super/AdditionalOptionsList/ModalWindow";

type  PropsType = {
  opened: () => void
  isOpen: boolean
  listId: string
  title: string;
  color: string;
  index: number
  onCloses: (v: boolean) => void;
  isLoading: boolean | undefined;
}

export const AdditionalOptionsLists:React.FC<PropsType> = ({opened, ...restProps}) => {
  return (
    <Wrapper className='AdditionalOptions'  isOpen={restProps.isOpen}>
        <ThreeDotsButton opened={opened} isOpen={restProps.isOpen}/>
        <ModalWindow{...restProps}/>
    </Wrapper>
  );
};
const Wrapper = styled.div<{isOpen: boolean}>`
  display: none;
    align-items: center;
    justify-content: center;
    width: 30px;
    color: #979ea6;

  .threePoints {
    display: ${({isOpen})=> isOpen ? 'flex' : 'none'};
    opacity: 0.5;
    transition: 0.3s;
    &:hover {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`

