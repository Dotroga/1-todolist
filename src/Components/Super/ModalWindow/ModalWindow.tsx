import React, {useEffect, useRef} from 'react';
import styled from "styled-components";
import edit from "../../../Icons/edit.svg";
import arrowUp from "../../../Icons/arrowUp.svg";
import arrowDown from "../../../Icons/arrowDown.svg";
import deleteUrn from "../../../Icons/deleteUrn.svg";
import {editingListTK} from "../../../redux/listsReducer";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../../../redux/store";
import {
    changeColorAC,
    changeModeAddListAC,
    changeTitleNewListAC,
    toggleAddListFormAC
} from "../../../redux/statusOffWindowsReducer";


type PropsType = {
    listId?: string | undefined
    title: string
    color: string
    isOpen: boolean
    onCloses: (v: boolean)=>void
}

export const ModalWindow: React.FC<PropsType> = (props) => {
    const {listId, title, color, isOpen, onCloses} = props
    const dispatch = useAppDispatch()
    const ref = useRef<HTMLDivElement>(null)
    const useOutsideClick = (ref: React.RefObject<any>, handler: (v: boolean) => void, attached = true) => {
        useEffect(()=> {
            if (!attached) return;
            const handleClick = (e: MouseEvent) => {
                if (!ref.current) return
                if (!ref.current.contains(e.target as Node)) {
                    setTimeout(()=>{
                        handler(false)
                    }, )
                }
            }
            document.addEventListener('mousedown', handleClick)

            return () => {
                document.removeEventListener('mousedown', handleClick)
            }
        }, [ref, handler, attached])
    }
    useOutsideClick(ref, onCloses, isOpen)

    const editingModeList = () => {
        dispatch(toggleAddListFormAC(true))
        dispatch(changeTitleNewListAC(title))
        dispatch(changeColorAC(color))
        dispatch(changeModeAddListAC(listId!, false))
    }

    return (<Wrapper ref={ref}>
        <div className={`options ${isOpen ? 'active' : 'inActive'}`}>
            <div onClick={editingModeList}>
                <img src={edit} alt=""/>
                <p>Edit</p>
            </div>
            <div>
                <img src={arrowUp} alt=""/>
                <p>Move up</p>
            </div>
            <div>
                <img src={arrowDown} alt=""/>
                <p>Move down</p>
            </div>
            <div>
                <img src={deleteUrn} alt=""/>
                <p>Delete</p>
            </div>
        </div>
    </Wrapper>)
};
 const Wrapper = styled.div`
   position: absolute;
   z-index: 99;
   margin-left: 13em;
   .options {
     background-color: #2e384b;
     box-shadow: 0 0 15px 1px #1a2434;
     display: flex;
     flex-direction: column;
     border-radius: 6px;
     gap: 2px;
     padding: 6px;
     top: -5px;
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
   }
   .options.inActive {
     opacity: 0;
     visibility: visible;
     transform: translateX(30px);
     transition: 0.4s;
   }
 `

