import React, { ReactElement } from "react";

import { ID } from "api/operation";
import SVGContext from "./SVGContext";

export interface OperationEditorProps {
    id: ID;
}

export default function OperationEditor({ }: OperationEditorProps): ReactElement {
    return (
        <SVGContext.Consumer>
            {({ svgWidth, svgHeight }) => (
                <div />
            )}
        </SVGContext.Consumer>
    );
}
