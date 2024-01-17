import React from "react";
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const TextAnimation = styled.span`
  display: inline;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out forwards;
  animation-delay: ${(props) => props.delay}s;
`;

export default function Text({ text }) {
  const lines = [`Hello ${text}!, Have a fantastic day!`];

  return (
    <Wrapper>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex}>
          {[...line].map((item, index) => (
            <TextAnimation key={index} delay={lineIndex + index * 0.1}>
              {item}
            </TextAnimation>
          ))}
        </div>
      ))}
    </Wrapper>
  );
}
