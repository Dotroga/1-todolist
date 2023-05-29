import styled, {css} from "styled-components";

type SelectStyledType = {
  visible?: boolean;
  color?: string;
  item: boolean
};

export const SelectWrapper = styled.div<SelectStyledType>`
  height: 43px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  z-index: 2;

  .visible {
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    color: ${({theme}) => theme.colors.font};
    border: 1px solid ${({theme}) => theme.colors.color};

    .arrow-icon {
      height: 22px;
      display: flex;
      align-items: center;
      position: relative;
      top: 8px;
      right: 20px;
      cursor: pointer;
    }

    .left-bar {
      position: absolute;
      background-color: transparent;
      transform: rotate(35deg);
      right: -15px;

      &:after {
        transition: 0.3s;
        content: "";
        background-color: ${({theme}) => theme.colors.color};
        border-radius: 2px;
        width: 12px;
        height: 2px;
        float: left;
      }
    }

    .right-bar {
      position: absolute;
      background-color: transparent;
      transform: rotate(-35deg);

      &:after {
        transition: 0.3s;
        content: "";
        background-color: ${({theme}) => theme.colors.color};
        border-radius: 2px;
        width: 12px;
        height: 2px;
        float: right;
      }
    }

    ${({visible}) =>
  visible
    ? css`
                      border-top-right-radius: 8px;
                      border-top-left-radius: 8px;
                      border-bottom: none;

                      .left-bar:after {
                        transform-origin: center center;
                        transform: rotate(-70deg);
                      }

                      .right-bar:after {
                        transform-origin: center center;
                        transform: rotate(70deg);
                      }
                    `
    : css`
                      border-radius: 8px;
                    `}
    div {
      display: flex;
      align-items: center;
    }

    span {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-right: 10px;
      border-radius: 5px;
      background-color: ${({color}) => color};
    }

    img {
      transition: 0.4s;
      width: 20px;
      transform: rotate(${({visible}) => (visible ? `90deg` : `-90deg`)});
    }

    .title {
      position: absolute;
      color: ${({theme}) => theme.colors.font};
      pointer-events: none;
      font-size: 1em;
      transition: 0.5s;
      ${({item}) =>
  item &&
  css`
                color: ${({theme}) => theme.colors.color};
                background-color: ${({theme}) => theme.colors.topColor};
                transform: translateX(10px) translateY(-20px);
                font-size: 0.9em;
                padding: 0 10px;
              `}
    }
  }
  .popup {
    background-color: ${({theme}) => theme.colors.topColor};
    padding: 4px 0;
    border: 1px solid ${({theme}) => theme.colors.color};
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    color: ${({theme}) => theme.colors.font};
  }
  .icon {
    
  }
`