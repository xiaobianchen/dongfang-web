import React from "react";
import styled from "styled-components";

class ModalFooter extends React.Component<any, any> {

	public render() {
		return (
			<Footer>
				{this.props.children}
			</Footer>
		);
	}
}

export default ModalFooter;

const Footer = styled.div`// styled
  & {
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    margin: 24px -24px -24px -24px;
    text-align: right;
    border-radius: 0 0 4px 4px;
    button + button {
      margin-left: 8px;
    }
  }
`;
