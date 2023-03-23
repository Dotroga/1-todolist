import styled from "styled-components";

export const WrapperInput = styled.div<{color: string, error: string | null}>`
  position: relative;
  display: flex;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid ${({error})=>error ? 'red' : '#fbbd49'};
    border-radius: 10px;
    outline: none;
    background: none;
    transition: 0.5s;
    font-family: 'Montserrat', sans-serif;
    color: white;
  }

  span {
    position: absolute;
    left: 5px;
    padding: 10px;
    pointer-events: none;
    font-size: 1em;
    color: #697594;
    transition: 0.5s;
  }

  input:valid ~ span,
  input:focus ~ span {
    color: ${({error})=>error ? 'red' : '#fbbd49'};
    background-color: ${({color})=>color ? color : '#414c6b'};
    transform: translateX(10px) translateY(-7px);
    font-size: 0.9em;
    padding: 0 10px;
  }

  input:valid,
  input:focus {
    width: 100%;
  }
`
