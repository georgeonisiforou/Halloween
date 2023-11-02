import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  @media (max-width: 768px) {
    height: unset;
  }
`;

const Text = styled.div`
  padding: 2rem 1rem;
  width: 800px;
  text-align: justify;
  font-size: 1.5rem;
  font-family: "IM Fell English";
`;

const Description = () => {
  return (
    <Container>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Tortor id aliquet
        lectus proin nibh nisl. Vel eros donec ac odio tempor orci dapibus
        ultrices. Erat nam at lectus urna duis convallis convallis. Est velit
        egestas dui id ornare arcu odio. Etiam non quam lacus suspendisse
        faucibus interdum. Malesuada fames ac turpis egestas. Auctor eu augue ut
        lectus arcu bibendum at varius vel. Fermentum dui faucibus in ornare.
        Lacus vestibulum sed arcu non odio euismod lacinia at quis. Platea
        dictumst quisque sagittis purus sit amet volutpat consequat mauris.
        Scelerisque purus semper eget duis at tellus at. Quis eleifend quam
        adipiscing vitae proin. Morbi tincidunt augue interdum velit euismod in
        pellentesque massa placerat. Ultrices dui sapien eget mi proin sed.
      </Text>
    </Container>
  );
};

export default Description;
