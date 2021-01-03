import React, { ReactElement } from "react";
import { XYCoord } from "react-dnd";

import { OperationIOGroup } from "api/operation";

export interface IOBarProps {
    ioGroups: OperationIOGroup[];
    translate?: XYCoord | undefined;
    height?: number | string | undefined;
    width?: number | string | undefined;
}

export default function IOBar({ ioGroups, translate, height, width }: IOBarProps): ReactElement {
    return (
        <g transform={`translate(${translate?.x || 0} ${translate?.y || 0})`}>
            <rect height={height} width={width}/>
            <g  transform="translate(-2)">
            {
                ioGroups.map(
                    (g, i) => <rect width="10" height="10" y={(i + 1) * 10} key={i} />
                )
            }
            </g>
        </g>
    );
}
