import React, { ReactElement } from "react";

import { OperationIOGroup } from "api/operation";
import SVGContext from './SVGContext'
import IOBar from "./IOBar";

export interface OutputBarProps {
    outputGroups: OperationIOGroup[];
}

export default function OutputBar({ outputGroups }: OutputBarProps): ReactElement {
    return (
        <SVGContext.Consumer>
            {({ svgHeight, svgWidth }) => (
                <IOBar
                    translate={{x: svgWidth - 5 - 5, y: 5}}
                    ioGroups={outputGroups}
                    height={svgHeight - 10}
                    width="5"
                />
            )}
        </SVGContext.Consumer>
    );
}
