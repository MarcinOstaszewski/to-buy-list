import styled from "styled-components";

const StyledSettingsModal = styled.div`
    opacity: 0;
    pointer-events: none;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000000aa;
    transition: all .3s;

    &.show {
        opacity: 1;
        pointer-events: all;
        transition: all .3s;
    }

    .category-modal {
        position: relative;
        height: 61.8%;
        width: 61.8%;
        background-color: #ffffffdd;
        padding: ${props => props.baseValue * 2}px;
        border: 5px solid #666;
        border-radius: ${props => props.baseValue / 2}px;

        &-switch {
            cursor: pointer;
            font-size: ${props => props.baseValue * 3}px;
            line-height: ${props => props.baseValue * 2}px;
            padding: ${props => props.baseValue / 2}px;
            position: absolute;
            right: ${props => props.baseValue / 2}px;
            top: ${props => props.baseValue / 2}px;
        }
        &-body {
            height: 100%;
        }
        &-header {
            height: 10%;
            font-size: ${props => props.baseValue * 2}px;
            font-weight: bold;
            margin-left: ${props => props.baseValue * 3}px;
        }
        &-content {
            height: 80%;
        }
        &-footer {
            height: 10%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .reset-button {
                padding: ${props => props.baseValue}px ${props => props.baseValue * 2}px;
                background-color: #d40;
                border-radius: var(--border-radius);
                border: 0;
                color: #fff;
            }
        }
    }

    .horizontal-tabs {
        &-container {
            position: relative;
            overflow: hidden;
            height: 100%;
            .chevron {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-size: ${props => props.baseValue * 3}px;
                &.left {
                    left: -6px;
                }
                &.right {
                    right: -6px;
                }
            }

        }
        &-content {
            width: 300%;
            height: 100%;
            display: flex;
            margin-left: -${props => props.currentSettingsTab * 100}%;
            transition: all .6s;
            .tab {
                width: 100%;
                margin: ${props => props.baseValue * 3}px;
            }
        }
    }
`;

export default StyledSettingsModal;
