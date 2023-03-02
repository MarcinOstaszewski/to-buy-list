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

    .settings-modal {
        position: relative;
        height: 61.8%;
        width: 61.8%;
        background-color: #ffffffdd;
        padding: 24px;
        border: 5px solid #666;
        border-radius: 6px;

        &-switch {
            cursor: pointer;
            font-size: 36px;
            line-height: 24px;
            padding: 24px;
            position: absolute;
            right: 6px;
            top: 6px;
        }
        &-body {
            height: 100%;
        }
        &-header {
            height: 10%;
            font-size: 32px;
            font-weight: bold;
            margin-left: 32px;
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
                padding: 12px 24px;
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
                font-size: 36px;
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
                margin: 32px;
            }
        }
    }
`;

export default StyledSettingsModal;
