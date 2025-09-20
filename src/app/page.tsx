"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import TextPressure from "./(ui)/text-pressure";
import { Button } from "@/components/ui/button";

export default function App(): React.JSX.Element {
  useEffect(() => {
    const interBubble = document.querySelector(".interactive"); //* Selects the DOM element with the class 'interactive'
    let curX = 0; //* Initializing the current X coordinate to 0
    let curY = 0; //* Initializing the current Y coordinate to 0
    let tgX = 0; //* Initializing the target X coordinate to 0
    let tgY = 0; //* Initializing the target Y coordinate to 0
    //? Function: smoothly move interactive bubble towards the target coordinates.
    function move() {
      curX += (tgX - curX) / 20; //* Update current X by moving fraction of distance towards target X
      curY += (tgY - curY) / 20; //* Update current Y by moving fraction of distance towards target Y
      //* Check if the interactive element is found
      if (interBubble) {
        // @ts-expect-error - CSS Transform
        //* Apply a CSS transform to move the element
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      //* Request the next animation frame & call move function again
      requestAnimationFrame(() => {
        move();
      });
    }
    //* Add an event listener to the window object to listen for mouse movements
    window.addEventListener("mousemove", (event) => {
      tgX = event.clientX; //* Update the target X coordinate to the current mouse X position
      tgY = event.clientY; //* Update the target Y coordinate to the current mouse Y position
    });
    move(); //* Start the move function when the component mounts
  }, []); //? Empty dependency array means this effect runs once, when component mounts

  return (
    <main>
      <div className="landing-text__container relative z-0">
      <TextPressure
        text="#PROJECT"
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={true}
        textColor="#ffffff"
        strokeColor="#ff0000"
        minFontSize={30}
        maxFontSize={150}
      />
        <Link className="mt-5" href="/#"><Button className="btn-theme tracking-in-expand" variant="ghost">Coming Soon!</Button></Link>
      </div>
      <div className="gradient-background__container"> {/* Container with a gradient background */}
        <svg xmlns="http://www.w3.org/2000/svg"> {/* SVG element for filter effects */}
          <defs> {/* Definitions for reusable elements within the SVG */}
            <filter id="goo"> {/* Filter with id 'goo' */}
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /> {/* Apply a Gaussian blur to the source graphic */}
              {/* Apply a color matrix to create a 'gooey' effect */}
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo"/>
              <feBlend in="SourceGraphic" in2="goo" /> {/* Blend the original graphic with the goo effect */}
            </filter>
          </defs>
        </svg>
        <div> {/* Placeholder divs, for graphicS elements */}
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive"></div> {/* Interactive div that will follow the mouse movements */}
        </div>
      </div>
    </main>
  );
}
