import React, { ReactElement } from "react";
import Async, { FulfilledChildren, PromiseFn } from "react-async";

import { ID, OperationDefinition } from "api/operation";
import { getOperation } from "api/storage";
import { XYCoord } from "react-dnd";

interface OperationComponentProps {
    position: XYCoord;
    opCode: string;
    inputs?: ID[];
    outputs?: ID[];
}

function OperationComponent(props: OperationComponentProps) {
    return (
        <g transform={`translate(${props.position.x},${props.position.y})`}>
            <rect width="20" height="20"></rect>
            <text x="10" y="10">{props.opCode}</text>
            <circle cy="5" r="5"></circle>
            <circle cy="10" r="5"></circle>
            <circle cy="15" r="5"></circle>
            <circle cy="20" r="5"></circle>
        </g>
    );
}

export interface OperationProps {
    opId: ID;
}

const getOperationFn: PromiseFn<OperationDefinition> = ({ opId }) => getOperation(opId);

const renderFulfilled: FulfilledChildren<OperationDefinition> = ({id}, state) => (
    <OperationComponent opCode={id} position={{x: 150, y:150}}/>
);

export default function Operation({ opId }: OperationProps): ReactElement {
    return (
        <Async promiseFn={getOperationFn} opId={opId}  >
            <Async.Loading>Loading...</Async.Loading>
            <Async.Fulfilled>{renderFulfilled}</Async.Fulfilled>
        </Async>
    );
}
