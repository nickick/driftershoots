import { keyframes } from "@emotion/react";

export const fadeOutLeftFromCenter = keyframes`
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
            opacity: 1;
  }
  100% {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
            opacity: 0;
  }
`;

export const fadeOutRightFromCenter = keyframes`
  0% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
            opacity: 1;
  }
  100% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
            opacity: 0;
  }
`;

export const fadeInRightToCenter = keyframes`
  0% {
    -webkit-transform: translateX(100%);
            transform: translateX(100%);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
            opacity: 1;
  }
`;

export const fadeInLeftToCenter = keyframes`
  0% {
    -webkit-transform: translateX(-100%);
            transform: translateX(-100%);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0%);
            transform: translateX(0%);
            opacity: 1;
  }
`;
