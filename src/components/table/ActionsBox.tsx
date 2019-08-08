import React from 'react'
import styled from "styled-components";

const ActionsBox = styled.div`// styled
  & {
    position: relative;
    display: block;
    > a:not(:last-child) {
      margin-right: 16px;
    }
  }
`;

export default ActionsBox;