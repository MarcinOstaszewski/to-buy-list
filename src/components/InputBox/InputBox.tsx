import React from 'react';
import { BsFillPlusCircleFill, BsFillDashCircleFill} from "react-icons/bs";
import InputBoxStyled from './InputBox.styled';

interface Props {
    title: string,
    baseValue: number,
    value: number,
    change: number,
    handleBoxValueChange: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const InputBox = (props: Props)  => {
    const { title, change, baseValue, value, handleBoxValueChange } = props;

    return (
        <InputBoxStyled baseValue={baseValue}>
            <div className="input-box">
                <label className="input-box-title">{title}</label>
                <div className="input-box-controls">
                    <button 
                        className="input-box-controls-button"
                        data-change={-change}
                        onClick={handleBoxValueChange}
                    >
                        <BsFillDashCircleFill />
                    </button>
                    
                    <p className="input-box-controls-field"> {value} </p>
                    
                    <button 
                        className="input-box-controls-button"
                        data-change={change}
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