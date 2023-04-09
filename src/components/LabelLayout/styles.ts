import styled from "styled-components";
import { theme } from "tailwindcss/defaultConfig";

export const StyledLabel = styled.label`
  border: 2px solid #e0e2e9;
  border-radius: 8px;
  display: flex;
  padding: 16px;
  align-items: center;

  input,
  textarea,
  div + div,
  select {
    border: none;
    margin-left: 12px;
    outline: none;
    width: 100%;

    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;

    letter-spacing: 0.1px;

    &::placeholder {
      color: #969ab8;
    }
  }

  textarea {
    resize: vertical;
  }

  &:focus-within {
    border: 2px solid #0062ff;
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.18);
    transition: all ease-in-out 200ms;
  }

  &:hover {
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.18);
    transition: all ease-in-out 200ms;
  }

  @media (max-width: 640px) {
    input,
    textarea,
    div + div,
    select {
      font-size: 12px;
      line-height: 19px;

      &::placeholder {
        font-size: 12px;
        line-height: 19px;
      }
    }
  }
`;
