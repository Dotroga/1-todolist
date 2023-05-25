import styled, {css} from "styled-components";

export const WrapperInput = styled.div<{
  color: string;
  filled: boolean
  error: string | false | undefined;
}>`
  position: relative;
  display: flex;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid ${({ error }) => (error ? "red" : "#fbbc48")};
    border-radius: 8px;
    outline: none;
    background: none;
    transition: 0.5s;
    font-family: "Montserrat", sans-serif;
    color: white;
   
  }

  span {
    position: absolute;
    left: 5px;
    padding: 10px;
    pointer-events: none;
    font-size: 1em;
    color: ${({ error }) => (error ? "red" : "#697594")};
    transition: 0.5s;
    ${({ filled }) => filled &&  css`
      transform: translateX(10px) translateY(-7px);
      font-size: 0.9em;
      padding: 0 10px;
    `}
  }
  input:focus ~ span {
    color: ${({ error }) => (error ? "red" : "#f9bb47")};
    background-color: ${({ color }) => (color ? color : "#424d6b")};
    transform: translateX(10px) translateY(-7px);
    font-size: 0.9em;
    padding: 0 10px;
  }
`;
