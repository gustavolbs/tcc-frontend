import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  h2 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 45px;
    width: 100%; /* identical to box height */

    text-align: center;
    letter-spacing: 0.1px;

    color: #171725;
  }

  @media only screen and (max-width: 640px) {
    h2 {
      font-size: 24px;
      line-height: 32px;
    }
  }
`;
