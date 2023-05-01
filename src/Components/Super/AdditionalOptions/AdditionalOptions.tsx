import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";

type PropsType = {
    isOpen: boolean
    onClick: (v: boolean)=>void
}

export const AdditionalOptions: React.FC<PropsType> = (
    {isOpen, onClick}) => {
    console.log(isOpen)
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
    useOutsideClick(ref, onClick, isOpen)


    return (<Wrapper className='options'>
        {isOpen && <div ref={ref}>Доп опции</div>}
    </Wrapper>)
};
 const Wrapper = styled.div`
     div{
       position: absolute;
     }
 `

