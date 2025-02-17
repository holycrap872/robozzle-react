import React from "react";
import { DragInfo } from "./baseTypes";


const functionClasses = (func: string, pos: number, functions) => {
  const funcObj = functions[func];
  if (!funcObj) return "";
  const obj = funcObj[pos];
  if (!obj) return "";
  const { command, color } = obj;
  const paint = command && command.indexOf("paint") > -1;
  return `command ${paint ? "paint" : ""} ${command} ${color ? `${color} color` : ""
    }`;
};


interface CommandsProps {
  SubLengths: number[],
  dragging: DragInfo,
  functions: any,
  onMouseDown,
}


const Controls = ({ SubLengths, dragging, functions, onMouseDown }: CommandsProps) => {
  return (
    <div className={`game-controls ${dragging ? "dragging" : ""}`}>
      {SubLengths.map(
        (s, i) =>
          s > 0 && (
            <div key={`f${i + 1}`} className="function-holder">
              <img
                draggable="false"
                src={require(`./img/f${i + 1}.svg`)}
                alt={`F${i + 1}`}
              />
              <div className="function-area">
                {Array(s)
                  .fill(0)
                  .map((f, fi) => (
                    <div
                      key={`f${i + 1}-${fi}`}
                      className={`function-block ${functionClasses(
                        `f${i + 1}`,
                        fi,
                        functions
                      )}`}
                      data-funcnum={`f${i + 1}`}
                      data-position={fi}
                      onMouseDown={onMouseDown}
                    />
                  ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Controls;
