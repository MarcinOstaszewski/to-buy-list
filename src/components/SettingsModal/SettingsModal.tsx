import React from 'react';
import StyledSettingsModal from './SettingsModal.styles';
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import InputBox from '../InputBox/InputBox';
import { categoryInterface, inputChangeHandler, mouseEventButton, mouseEventDiv, mouseEventSVG } from "../../helpers/typesAndInterfaces";
import EditCategoryTab from './EditCategoryTab/EditCategoryTab';

interface Props {
  isVisible: boolean,
  baseValue: number,
  currentSettingsTab: number,
  waitingListOpacity: number,
  changeSettingsTab: mouseEventSVG,
  handleBoxValueChange: mouseEventButton,
  toggleModal: mouseEventDiv,
  categories: categoryInterface[]
  chosenCategoryIndex: number,
  handleValueChange: inputChangeHandler
}

const CategoryModal = (props: Props) => {
  const { 
    isVisible,
    baseValue,
    currentSettingsTab,
    waitingListOpacity,
    changeSettingsTab,
    toggleModal,
    handleBoxValueChange,
    categories,
    chosenCategoryIndex,
    handleValueChange
  } = props;
  const className =  isVisible ? " show" : "";
  const tabNamesArray = ['General', 'Category', 'Other'];

  return (
    <StyledSettingsModal 
      baseValue={baseValue}
      className={className}
      currentSettingsTab={currentSettingsTab} >
      <div className="settings-modal">
        <div className="settings-modal-switch" onClick={toggleModal}>
          &times;
        </div>
        <div className="settings-modal-body">
          <div className="settings-modal-header">
            {tabNamesArray[currentSettingsTab]} settings
          </div>

          <div className="settings-modal-content">
            <div className="horizontal-tabs-container">
              <CgChevronLeft className="chevron left" data-tab-change={-1} onClick={changeSettingsTab}/>
              
              <div className="horizontal-tabs-content">
                <div className="tab">
                  <InputBox 
                    title="Base font size"
                    change={2}
                    value={baseValue}
                    minValue={4}
                    maxValue={48}
                    setter="base"
                    baseValue={baseValue}
                    handleBoxValueChange={handleBoxValueChange}
                  />
                  <InputBox 
                    title="Waiting list opacity"
                    change={1}
                    value={waitingListOpacity}
                    minValue={1}
                    maxValue={10}
                    setter="opacity"
                    baseValue={baseValue}
                    handleBoxValueChange={handleBoxValueChange}
                  />
                </div>

                <div className="tab">
                  <EditCategoryTab
                    index={chosenCategoryIndex}
                    categories={categories}
                    handleValueChange={handleValueChange} />
                </div>

                <div className="tab">Other</div>
              </div>

              <CgChevronRight className="chevron right" data-tab-change={1} onClick={changeSettingsTab}/>
            </div>
          </div>

          <div className="settings-modal-footer">
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