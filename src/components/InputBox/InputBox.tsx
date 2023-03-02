import React from 'react';
import { BsFillPlusCircleFill, BsFillDashCircleFill} from "react-icons/bs";
import InputBoxStyled from './InputBox.styled';

interface InputBoxProps {
    title: string,
    baseValue: number,
    minValue: number,
    maxValue: number,
    setter: string,
    value: number,
    change: number,
    handleBoxValueChange: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const InputBox = (props: InputBoxProps)  => {
    const { 
        title,
        change,
        baseValue,
        minValue,
        maxValue,
        setter,
        value,
        handleBoxValueChange 
    } = props;

    return (
        <InputBoxStyled baseValue={baseValue}>
            <div className="input-box">
                <label className="input-box-title">{title}</label>
                <div className="input-box-controls">
                    <button 
                        className="input-box-controls-button"
                        data-change={-change}
                        data-current-value={value}
                        data-min-value={minValue}
                        data-max-value={maxValue}
                        data-setter={setter}
                        onClick={handleBoxValueChange}
                    >
                        <BsFillDashCircleFill />
                    </button>
                    
                    <p className="input-box-controls-field"> {value * 10}% </p>
                    
                    <button 
                        className="input-box-controls-button"
                        data-change={change}
                        data-current-value={value}
                        data-min-value={minValue}
                        data-max-value={maxValue}
                        data-setter={setter}
                        onClick={handleBoxValueChange}
                    >
                        <BsFillPlusCircleFill />
                    </button>

                </div>
            </div>
        </InputBoxStyled>
    )
}

export default InputBox