import React, { ReactElement } from "react";

import { OperationIOGroup } from "api/operation";
import SVGContext from './SVGContext';
import IOBar from "./IOBar";

export interface InputBarProps {
    inputGroups: OperationIOGroup;
}

export default function InputBar({ inputGroups }: InputBarProps): ReactElement {
    return (
        <SVGContext.Consumer>
            {({ svgHeight }) => (
                <IOBar
                    translate={{x: 5, y: 5}}
                    ioGroups={inputGroups}
                    height={svgHeight - 10}
                    width="5"
                />
            )}
        </SVGContext.Consumer>
    );
}
