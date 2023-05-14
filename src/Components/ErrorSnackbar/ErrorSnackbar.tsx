import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {DeleteButton} from "../DeleteButton/DeleteButton";
import {setErrorSnackbar} from "../../redux/statusOffWindowsReducer";

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false)
    const error = useAppSelector((state) => state.StatusOffWindows.errorSnackbar)

    useEffect(()=> {
        if (error) {
            setShow(true)
            setTimeout(()=>{
                closeSnackbar()
            }, 3000)
        }
    },[error])

    const  closeSnackbar = () => {
        setShow(false)
        dispatch(setErrorSnackbar(null))
    }
    console.log(show)
    console.log()
     return (
        <Wrapper show={show}>
            <p>{error}</p>
            <DeleteButton callBack={closeSnackbar}/>
        </Wrapper>
    );
};

const Wrapper = styled.div<{show: boolean}>`
  opacity:  ${({show})=>!show ? 0 : 1};
  transition: 0.3s;
  display: flex;
  align-items: center;
  background-color: #aa2929;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 20px 2px #1a2434;
  position: absolute;
  bottom: 60px;
  right: 60px;
`