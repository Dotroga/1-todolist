import React, {useEffect, useRef} from 'react';
import styled from "styled-components";

export type ModalIconType = {
    svg: string
    title: string
}

type PropsType = {
    isOpen: boolean
    onCloses: (v: boolean)=>void
    arr: ModalIconType[]
}

export const ModalWindow: React.FC<PropsType> = (
    {isOpen, onCloses, arr}) => {
    const ref = useRef<HTMLDivElement>(null)
    const useOutsideClick = (ref: React.RefObject<any>, handler: (v: boolean) => void, attached = true) => {
        useEffect(()=> {
            if (!attached) return;
            const handleClick = (e: MouseEvent) => {
                if (!ref.current) return
                if (!ref.current.contains(e.target as Node)) {
                    setTimeout(()=>{
                        handler(false)
                    }, 100)
                }
            }
            document.addEventListener('mousedown', handleClick)
            return () => {
                document.removeEventListener('mousedown', handleClick)
            }
        }, [ref, handler, attached])
    }
    useOutsideClick(ref, onCloses, isOpen)

    if (!isOpen) {
        return null
    }
    console.log(arr)
    return (<Wrapper className='options' ref={ref}>
            {arr.map((i, index)=>
                <div key={index}>
                    <img src={i.svg} alt=""/>
                    <p>{i.title}</p>
                </div>
            )}
    </Wrapper>)
};
 const Wrapper = styled.div`
   margin-left: 12em;
   display: flex;
   flex-direction: column;
   z-index: 99;
   position: absolute;
   background-color: #2e384b;
   box-shadow: 0 0 15px 1px #1a2434;
   border-radius: 6px;
   gap: 2px;
   padding: 6px;
   div {
     display: flex;
     align-items: center;
     gap: 5px;
     padding: 4px;
     border-radius: 6px;
     &:hover {
       background-color: #424d6b;
     }
     img {
       width: 24px;
     }
   }
 `

