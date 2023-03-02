import React from 'react';
import StyledSettingsModal from './SettingsModal.styles';
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import InputBox from '../InputBox/InputBox';

interface Props {
  isVisible: boolean,
  baseValue: number,
  currentSettingsTab: number,
  changeSettingsTab: React.MouseEventHandler<SVGElement> | undefined,
  handleBoxValueChange: 
    React.MouseEventHandler<HTMLButtonElement> | 
    undefined,
  toggleModal: React.MouseEventHandler<HTMLDivElement> | undefined
}

const CategoryModal = (props: Props) => {
  const { 
    isVisible, 
    baseValue, 
    currentSettingsTab, 
    changeSettingsTab, 
    toggleModal, 
    handleBoxValueChange 
  } = props;
  const className =  isVisible ? " show" : "";
  const tabNamesArray = ['General', 'Category', 'Other'];

  return (
    <StyledSettingsModal 
      baseValue={baseValue}
      className={className}
      currentSettingsTab={currentSettingsTab} >
      <div className="category-modal">
        <div className="category-modal-switch" onClick={toggleModal}>
          &times;
        </div>
        <div className="category-modal-body">
          <div className="category-modal-header">
            {tabNamesArray[currentSettingsTab]} settings
          </div>

          <div className="category-modal-content">
            <div className="horizontal-tabs-container">
              <CgChevronLeft className="chevron left" data-tab-change={-1} onClick={changeSettingsTab}/>
              
              <div className="horizontal-tabs-content">
                <div className="tab">
                  <InputBox 
                    title="Base font size"
                    change={2}
                    value={baseValue}
                    baseValue={baseValue}
                    handleBoxValueChange={handleBoxValueChange}
                  />
                </div>
                <div className="tab">Category</div>
                <div className="tab">Other</div>
              </div>

              <CgChevronRight className="chevron right" data-tab-change={1} onClick={changeSettingsTab}/>
            </div>
          </div>

          <div className="category-modal-footer">
            <button className="reset-button">
              Reset to defaults
            </button>
          </div>
        </div>
      </div>
    </StyledSettingsModal>
  )
}

export default CategoryModal