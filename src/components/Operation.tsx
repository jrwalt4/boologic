import React from "react";

import { ID } from "api/operation";
import { XYCoord } from "react-dnd";

interface OperationComponentProps {
    position: XYCoord;
    opCode: string;
    inputs?: ID[];
    outputs?: ID[];
}

export default function OperationComponent(props: OperationComponentProps) {
    const {inputs, outputs} = props;
    const rectHeight = Math.max((inputs?.length || 1) * 10, 40);
    return (
        <g transform={`translate(${props.position.x},${props.position.y})`}>
            <rect width="40" height={rectHeight} fill="red"></rect>
            <text x="20" y={rectHeight/2} fill="black" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">{props.opCode}</text>
            {inputs?.map((inpId, i) => <circle key={inpId} cy={i*10 + 5} r="5" />)}
            {outputs?.map((outId, i) => <circle key={outId} cy={i*10 + 5} cx="40" r="5" />)}
        </g>
    );
}
