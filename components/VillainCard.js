import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";

const pulse = keyframes`
  0%{
    scale: 1;
  }
  50%{
    scale: 1.05;
  }
  100%{
    scale: 1;
  }
`;

const Container = styled.div`
  width: clamp(300px, 800px, 800px);
  height: 700px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 1rem;

  font-family: "Oswald", cursive;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
  z-index: 2;
  &:hover::before {
    animation: ${pulse} 0.8s ease-in-out;
  }
  &::before {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
    background-image: ${({ img }) => `url(${img})`};
    background-size: cover;
    background-position: center;
    z-index: -1;
    filter: url("#noise");
  }
`;

const TextContainer = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const Name = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
  font-family: "IM Fell English";
`;

const Movie = styled.p`
  font-size: 1.5rem;
  font-family: "IM Fell English";
`;

const Quote = styled.div`
  font-family: "Shadows Into Light", cursive;
  font-size: 2rem;
`;

const VillainCard = ({ img, name, movie, quote, current }) => {
  const [turbulence, setTurbulence] = useState({ seed: 0, scale: 0 });

  useEffect(() => {
    let myInt = setInterval(() => {
      setTurbulence({ seed: Math.floor(Math.random() * 1000), scale: 80 });
    }, 10);
    setTimeout(() => {
      clearInterval(myInt);
      setTurbulence({ seed: 0, scale: 0 });
    }, 800);
  }, [current]);

  return (
    <Container
      id="card"
      // onMouseEnter={() => {
      //   let myInt = setInterval(() => {
      //     setTurbulence({ seed: Math.floor(Math.random() * 1000), scale: 20 });
      //   }, 10);
      //   setTimeout(() => {
      //     clearInterval(myInt);
      //     setTurbulence({ seed: 0, scale: 0 });
      //   }, 800);
      // }}
      img={img}
    >
      <svg style={{ display: "none" }}>
        <defs>
          <filter id="noise">
            <feTurbulence
              baseFrequency="0.7,0.8"
              seed={turbulence.seed}
              type="fractalNoise"
              result="static"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="static"
              scale={turbulence.scale}
            >
              <animate
                attributeName="seed"
                values="0;100"
                dur="800ms"
                repeatCount="1"
                // begin="card.mouseenter"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      <TextContainer>
        <Name>{name}</Name>

        <Movie>As seen in: {movie}</Movie>
        <Quote>{quote === "..." ? "Silent killer" : quote}</Quote>
      </TextContainer>
    </Container>
  );
};

export default VillainCard;
