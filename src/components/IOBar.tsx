import React, { ReactElement } from "react";
import { XYCoord } from "react-dnd";

import { OperationIOGroup } from "api/operation";

export interface IOBarProps {
    ioGroups: OperationIOGroup;
    translate?: XYCoord | undefined;
    height?: number | string | undefined;
    width?: number | string | undefined;
}

export default function IOBar({ ioGroups, translate, height, width }: IOBarProps): ReactElement {
    return (
        <g transform={`translate(${translate?.x || 0} ${translate?.y || 0})`} fill="gray">
            <rect height={height} width={width}/>
            <g  transform="translate(-2)" fill="silver">
            {
                Object.entries(ioGroups).map(
                    ([key, grp], i) => (
                        <>
                    <rect width="10" height="10" y={(i + 1) * 10} key={i} />
                    <text y={((i+1)*10)} dx="5" key={key}>{grp.join(', ')}</text>
                    </>
                    )
                )
            }
            </g>
        </g>
    );
}
