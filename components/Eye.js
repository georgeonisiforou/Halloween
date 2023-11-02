import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/gifs/eye.gif");
  background-size: cover;
  background-position: center;
`;

const Eye = () => {
  return <Container></Container>;
};

export default Eye;
