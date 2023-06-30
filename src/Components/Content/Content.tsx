import React, {memo} from 'react';
import {Route, Routes} from "react-router-dom";
import styled from "styled-components";
import {useAppSelector} from "redux/store";
import {selectLists} from "redux/lists.selectors";
import {Login} from "Components/Content/Login/Login";
import {List} from "Components/Content/List/List";

export const Content = memo(() => {
  const lists = useAppSelector(selectLists);
  return <Wrapper>
      <Routes>
        <Route
          path={"/"}
          element={lists.map((l, i) => (
            <div key={l.id}>
              <List list={l} index={i}/>
            </div>
          ))}
        />
        {lists.map((l, i) => (
            <Route key={l.id} path={`/${l.title}`} element={<List list={l} index={i}/>}/>
        ))}
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<h1>404</h1>}/>
      </Routes>
    </Wrapper>
})

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: ${({theme})=>theme.colors.bg};
  color: ${({theme})=>theme.colors.font};;
  box-shadow: 0 0 15px 1px ${({theme})=>theme.colors.shadow};
  margin: 40px 40px 40px 20px;
  width: 100%;
  overflow: auto;
  transition: 0.2s;
  ::-webkit-scrollbar {
    width: 22px; /* ширина scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    border: 5px solid  ${({theme})=>theme.colors.bg};
    background-color: ${({theme})=>theme.colors.color}; /* цвет плашки */
    border-radius: 20px; /* закругления плашки */
  }
`;
