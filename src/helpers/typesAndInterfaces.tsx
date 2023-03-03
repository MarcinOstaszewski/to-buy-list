import React from 'react'

interface categoryInterface {
    name?: string,
    hue?: number,
    products?: {
        [key: string]: number
    }
}

type mouseEventSpan = React.MouseEventHandler<HTMLSpanElement> | any;
type mouseEventButton = React.MouseEventHandler<HTMLButtonElement> | any;
type mouseEventDiv = React.MouseEventHandler<HTMLDivElement> | any;
type mouseEventSVG = React.MouseEventHandler<SVGElement> | undefined;
type inputChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
 type inputChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type { 
    categoryInterface, 
    mouseEventSpan,
    mouseEventButton,
    mouseEventDiv,
    mouseEventSVG,
    inputChangeHandler,
    inputChangeEvent
}