import React from "react";
import styled from "styled-components";

const ContentBox = (props) => {
	return <SContent>
		{props.children}
	</SContent>
};

export default ContentBox;

const SContent = styled.div`// styled
  & {
    margin: 24px 24px 0 24px;
		padding: 0 24px;
		background: white;
  }
`;
