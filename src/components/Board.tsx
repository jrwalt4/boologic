import React, { useState } from "react";
import { DndProvider, useDrop } from "react-dnd";
import DndBackend from "react-dnd-mouse-backend";
import { useTheme } from "@material-ui/core/styles";

import Connection from "components/Connection";
import { ItemTypes } from "./ItemTypes";
import SVGContext from "./SVGContext";
import Operation from "./Operation";

function Box() {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CIRCLE,
    drop(item, monitor) {
      return { point: [125, 125] };
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver()
      };
    }
  });
  const { palette } = useTheme();
  return (
    <rect
      ref={drop}
      x={100}
      y={100}
      width={50}
      height={50}
      fill={isOver ? palette.success.main : palette.info.main}
      stroke={isOver ? palette.success.dark : palette.info.dark}
    />
  );
}

export default function Board() {
  const [position, movePoint] = useState([50, 50] as [number, number]);
  return (
    <DndProvider backend={DndBackend}>
      <SVGContext.Provider value={{ svgWidth: 200, svgHeight: 300 }}>
        <SVGContext.Consumer>
          {({ svgWidth, svgHeight }) => (
            <svg
              height={svgHeight}
              width={svgWidth}
              style={{ outline: "1px solid black", margin: "auto", display: "block" }}
            >
              <Connection />
              <Operation opId="NOT" />
            </svg>)
          }
        </SVGContext.Consumer>
      </SVGContext.Provider>
    </DndProvider>
  );
  /*
  <Box />
        <Point initPosition={position} movePoint={movePoint} />
  */
}
