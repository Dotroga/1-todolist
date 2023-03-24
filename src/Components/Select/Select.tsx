import React, {useState} from 'react';
import styled, {css} from "styled-components";
import arrow from './../../Icons/arrow.svg'


type PropsType = {
    arr: string[]
    width?: string
}

export const Select: React.FC<PropsType> = ({arr, width= '240px'}) => {
    const [active, setActive] = useState<string>(arr[0])
    const [visiblePopUp, setVisiblePopUp] = useState(false)
    const changeVisibility = () => setVisiblePopUp(!visiblePopUp)
    const selectingActive = (i: string) => {
        setActive(i)
        setVisiblePopUp(false)
    }
    return <Wrapper width={width}>
        <Visible onClick={changeVisibility} visible={visiblePopUp}>
            {active}
            <img src={arrow} alt="arrow"/>
        </Visible>
        {visiblePopUp &&
            <PopUp visible={visiblePopUp} >{arr.map((i, index)=>
                <div key={index} onClick={()=>selectingActive(i)} >
                    {i}
                </div>)}
            </PopUp>}
    </Wrapper>
}


const Wrapper = styled.div<{width: string}>`
  position: absolute;
  width: ${({width})=>width};
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  
`
const Visible = styled.div<{ visible: boolean }>`
  display: flex; 
  justify-content: space-between;
  background-color: #414c6a;
  padding: 10px;
  border: 1px solid #fbbd49;
  color: white;
  ${({visible}) => visible
          ? css`
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
            border-bottom: none;
          `
          : css`border-radius: 10px;`
  }
  img {
    transition: 0.4ms;
    width: 20px;
    transform:${({visible}) => visible ? `rotate(90deg)` : `rotate(-90deg)`};
  }
  
`
const PopUp = styled.div<{visible: boolean}>`
  background-color: #414c6a;
  padding: 4px 0;
  border: 1px solid #fbbd49;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  color: white;
  div {
    font-size: 16px;
    padding: 2px 10px;
    &:hover {
      background-color: #5a6687;
    }
  }
`