import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { villains } from "@/config/villains";
import VillainCard from "./VillainCard";

const BigContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: unset;
  }
`;

const Container = styled.div`
  width: clamp(320px, 100%, 750px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 50px;
  padding: 0 60px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Prev = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 50%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  z-index: 5;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 768px) {
    right: 0;
    top: 0;
  }
`;

const Next = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 50%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  z-index: 5;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 768px) {
    right: 0;
    top: 0;
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  font-family: "IM Fell English";
`;

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const handleKeyDown = (event) => {
    if (event.keyCode === 37) {
      // Left arrow key
      handlePrev();
    } else if (event.keyCode === 39) {
      // Right arrow key
      handleNext();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [current]); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  useEffect(() => {
    if (start - end > 70) {
      handleNext();
    } else if (end - start > 70) {
      handlePrev();
    }
  }, [end]);

  const handlePrev = () => {
    if (current === 0) {
      setCurrent(villains.length - 1);
    } else setCurrent(current - 1);
  };

  const handleNext = () => {
    if (current === villains.length - 1) {
      setCurrent(0);
    } else setCurrent(current + 1);
  };

  return (
    <BigContainer>
      <Title>Need some inspiration (for dressing up)?</Title>
      <Container>
        <Prev onClick={handlePrev}>
          <IoIosArrowBack />
        </Prev>
        <Next onClick={handleNext}>
          <IoIosArrowForward />
        </Next>

        <CardContainer
          onTouchStart={(e) => {
            setStart(e.changedTouches[0].clientX);
          }}
          onTouchEnd={(e) => {
            setEnd(e.changedTouches[0].clientX);
          }}
        >
          <VillainCard
            key={current}
            current={current}
            name={villains[current].name}
            img={villains[current].pic}
            movie={villains[current].movie}
            quote={villains[current].quote}
          />
        </CardContainer>
      </Container>
    </BigContainer>
  );
};

export default Carousel;
