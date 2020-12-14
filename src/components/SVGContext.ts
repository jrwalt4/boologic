import { createContext } from "react";

export interface SVGContextValue {
    svgWidth: number;
    svgHeight: number;
}

export const SVGContext = createContext<SVGContextValue>({
    svgWidth: 0,
    svgHeight: 0
});

SVGContext.displayName = 'SVGContext';

export default SVGContext;
