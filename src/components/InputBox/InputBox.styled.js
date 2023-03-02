import styled from "styled-components";

const InputBoxStyled = styled.div`
    .input-box {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: ${props => props.baseValue}px;
        
        &-title {
            width: 38.2%;
            min-width: 200px;
            font-size: ${props => props.baseValue * 2}px;
            margin-bottom: ${props => props.baseValue}px;
        }
        &-controls {
            margin-bottom: ${props => props.baseValue}px;
            display: flex;
            width: 61.8%; 
            align-items: center;
            &-button {
                max-width: 19.1%;
                border: none;
                background-color: transparent;
                font-size: ${props => props.baseValue * 3}px;
                margin: 0;
                display: flex;
            }
            &-field {
                border: none;
                border-bottom: 2px solid #666;
                flex-grow: 3;
                font-size: ${props => props.baseValue * 2}px;;
                line-height: ${props => props.baseValue * 4}px;
                margin: 0 ${props => props.baseValue}px;
                max-width: 40%;
            }
        }
    }
`;

export default InputBoxStyled