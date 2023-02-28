import React, { useState } from 'react';
import StyledCategoryModal from './SettingsModal.styles';
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

interface Props {
  isVisible: boolean,
  baseValue: number,
  toggleModal: React.MouseEventHandler<HTMLDivElement> | undefined
}

const CategoryModal = (props: Props) => {
  type mouseEvent = React.MouseEventHandler<HTMLSpanElement> | any;

  const tabsCount = 2;
  const [currentTab, setCurrentTab] = useState(0);

  const changeTab = (e: mouseEvent) => {
    console.log(currentTab, e.currentTarget.dataset.tabChange);
    let newCurrentTab = currentTab + parseInt(e.currentTarget.dataset.tabChange);
    if (newCurrentTab < 0) {
      newCurrentTab = tabsCount;
    } else if (newCurrentTab > tabsCount) {
      newCurrentTab = 0;
    }
    setCurrentTab(newCurrentTab);
  }

  const { isVisible, baseValue, toggleModal } = props;
  const className =  isVisible ? " show" : "";

  return (
    <StyledCategoryModal 
      baseValue={baseValue} 
      className={className} 
      currentTab={currentTab} >
      <div className="category-modal">
        <div className="category-modal-switch" onClick={props.toggleModal}>
          &times;
        </div>
        <div className="category-modal-body">
          <div className="category-modal-header">
            Settings
          </div>
          <div className="category-modal-content">
            <div className="horizontal-tabs-container">
              <CgChevronLeft className="chevron left" data-tab-change="-1" onClick={changeTab}/>
              <div className="horizontal-tabs-content">
                <div className="tab">General</div>
                <div className="tab">Category</div>
                <div className="tab">? ? ?</div>
              </div>
              <CgChevronRight className="chevron right" data-tab-change="1" onClick={changeTab}/>
            </div>
          </div>
          <div className="category-modal-footer">
            <button className="reset-button">
              Reset to defaults
            </button>
          </div>
        </div>
      </div>
    </StyledCategoryModal>
  )
}

export default CategoryModal