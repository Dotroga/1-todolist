import styled, {css} from "styled-components";

export const WrapperInput = styled.div<{
  color: string;
  filled: boolean
  error: string | false | undefined;
}>`
  position: relative;
  display: flex;
  
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 1px solid ${({error, theme}) => (error ? "red" : theme.colors.color)};
    -webkit-text-fill-color: ${({theme}) => theme.colors.font};
    transition: background-color 5000s ease-in-out 0s;
  }


  input {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    outline: none;
    border: 1px solid ${({error, theme}) => (error ? "red" : theme.colors.color)};
    transition: 0.5s;
    background: none;
    font-family: "Montserrat", sans-serif;
    color: ${({theme}) => theme.colors.font};
  }

  span {
    position: absolute;
    left: 5px;
    padding: 10px;
    pointer-events: none;
    font-size: 1em;
    color: ${({error}) => (error ? "red" : "#697594")};
    transition: 0.5s;
    ${({filled}) => filled && css<{ error: string | false | undefined; color: string }>`
      background-color: ${({theme, color}) => color ? color : theme.colors.topColor};
      color: ${({error, theme}) => (error ? "red" : theme.colors.color)};
      transform: translateX(10px) translateY(-7px);
      font-size: 0.9em;
      padding: 0 10px;
    `}
  }
  input:focus ~ span {
    color: ${({error, theme}) => (error ? "red" : theme.colors.color)};
    background-color: ${({theme, color}) => color ? color : theme.colors.topColor};
    transform: translateX(10px) translateY(-7px);
    font-size: 0.9em;
    padding: 0 10px;
  }

`;
