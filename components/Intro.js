import React from "react";
import styled from "styled-components";
import LottieAnimation from "@/components/LottieAnimation";
import pumkin from "../public/lotties/bat.json";
import spider from "../public/lotties/witch.json";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin: 1rem 0rem;
`;

const Title = styled.div`
  font-family: "IM Fell English SC";
  font-size: clamp(32px, 3vw, 4rem);
  width: clamp(300px, 100vw, 1000px);

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Subtitle = styled.h3`
  font-family: "IM Fell English SC";
  font-size: 2.5rem;

  text-align: center;
`;

const Intro = () => {
  return (
    <Container>
      <Title>
        {" "}
        {/* <LottieAnimation lottie={pumkin} width={200} height={200} /> */}
        Halloween night party{" "}
        {/* <LottieAnimation lottie={spider} width={200} height={200} /> */}
      </Title>
      <Subtitle>The night is dark and full of terrors.</Subtitle>
    </Container>
  );
};

export default Intro;
