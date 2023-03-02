import styled from "styled-components";

const InputBoxStyled = styled.div`
    .input-box {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 12px;
        
        &-title {
            width: 38.2%;
            min-width: 200px;
            font-size: 24px;
            margin-bottom: 12px;
        }
        &-controls {
            margin-bottom: 12px;
            display: flex;
            width: 61.8%; 
            align-items: center;
            justify-content: flex-end;
            &-button {
                border: none;
                background-color: transparent;
                font-size: 36px;
                margin: 0;
                display: flex;
            }
            &-field {
                border: none;
                border-bottom: 3px solid #666;
                font-size: 24px;
                line-height: 48px;
                margin: 0 12px;
                text-align: center;
                width: 24%;
            }
        }
    }
`;

export default InputBoxStyled