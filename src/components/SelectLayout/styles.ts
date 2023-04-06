import styled from "styled-components";

export const StyledSelect = styled.select`
  border: 2px solid #e0e2e9;
  border-radius: 8px;
  display: flex;
  padding: 16px;
  align-items: center;
  width: 100%;

  & option {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.1px;
  }

  &::placeholder {
    color: #969ab8;
  }

  &:focus {
    border: 2px solid #0062ff;
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.18);
    transition: all ease-in-out 200ms;
    outline: none;
  }

  &:hover {
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.18);
    transition: all ease-in-out 200ms;
  }

  @media only screen and (max-width: 640px) {
    font-size: 12px;
    line-height: 19px;

    &::placeholder {
      font-size: 12px;
      line-height: 19px;
    }
  }
`;
