import React from "react";
import styled from "styled-components";

const PageLoading = ({ error, pastDelay }) => {
	if (error) {
		console.log(error, 'ee')
		return <CenterSpin>
			项目更新，请刷新。谢谢！
		</CenterSpin>;
	} else if (pastDelay) {
		return null;
	} else {
		return null;
	}
};

export default PageLoading;

const CenterSpin = styled.div`// styled
  & {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
