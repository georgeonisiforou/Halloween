import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import styled from "styled-components";

const Container = styled.div`
  width: ${({ width }) => `clamp(300px, ${width}px, 700px)`};
  height: ${({ height }) => `${height}`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    max-width: 320px;
  }
`;

const LottieAnimation = ({ lottie, width, height }) => {
  const ref = useRef();
  useEffect(() => {
    const lottieAnimation = Lottie.loadAnimation({
      container: ref.current, // the dom element that will contain the animation
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: lottie, // the path to the animation json
    });

    return () => {
      lottieAnimation.destroy();
    };
  }, []);

  return <Container ref={ref} width={width} height={height}></Container>;
};

export default LottieAnimation;
