import React, { ReactElement } from "react";
import { Async, PromiseFn } from "react-async";
import { DndProvider } from "react-dnd";
import DndBackend from "react-dnd-mouse-backend";

import { ID, OperationProperties, OperationDefinition } from "api/operation";
import { getOperation } from "api/storage";
import InputBar from "./InputBar";
import OutputBar from "./OutputBar";
import SVGContext from "./SVGContext";
import Connection from "./Connection";
import Operation from "./Operation";

export interface OperationEditorProps {
    opId: ID;
}

const getOperationWithProps: PromiseFn<OperationDefinition> = ({ opId }) => getOperation(opId);


function renderOperationEditor(def: OperationDefinition) {
    const operations = Object.entries(def.definition?.operations || {})
        .map<OperationProperties & {id: string}>(([opKey, op])=>({
            id: opKey,
            ...op
        }));
    return (
        <SVGContext.Consumer>
            {({ svgWidth, svgHeight }) => (
                <svg
                    height={svgHeight}
                    width={svgWidth}
                    style={{ outline: "1px solid black", margin: "auto", display: "block" }}
                >
                    <InputBar inputGroups={{ 'in': def.inputIDs }} />
                    <OutputBar outputGroups={{ 'out': def.outputIDs }} />
                    <Connection />
                    {
                        operations.map((def)=>(
                            <Operation opCode={def.opCode} position={def.position!} key={def.id}/>
                        ))
                    }
                </svg>)
            }
        </SVGContext.Consumer>
    );
}

export default function OperationEditor({ opId }: OperationEditorProps): ReactElement {
    return (
        <DndProvider backend={DndBackend}>
            <SVGContext.Provider value={{ svgWidth: 500, svgHeight: 300 }}>
                <Async promiseFn={getOperationWithProps} opId={opId} watch="opId">
                    <Async.Pending>...Loading</Async.Pending>
                    <Async.Rejected>{(err) => <div>{err.message}</div>}</Async.Rejected>
                    <Async.Fulfilled>{renderOperationEditor}</Async.Fulfilled>
                </Async>
            </SVGContext.Provider>
        </DndProvider>
    );
}
