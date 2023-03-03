import React, { useEffect, useState } from 'react';
import { getCategories, queryCategories, resetCategoriesArray, reverseProductState } from './helpers/firebase';
import CategoryList from './components/CategoryList/CategoryList';
import SettingsModal from './components/SettingsModal/SettingsModal';
import { CgMenu } from "react-icons/cg";
import { categoryInterface, inputChangeEvent, mouseEventSpan } from './helpers/typesAndInterfaces';

import './App.css';

function App() {

  const categoryArray: categoryInterface[] = [];
  const [categories, setCategories] = useState(categoryArray);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [baseValue, setBaseValue] = useState(10);
  const [waitingListOpacity, setWaitingListOpacity] = useState(7);
  const [currentSettingsTab, setCurrentSettingsTab] = useState(0);
  const [chosenCategoryIndex, setChosenCategoryIndex] = useState(-1);
  const settingsTabsCount = 2;

  const changeSettingsTab = (e: mouseEventSpan) => {
    let newValue = currentSettingsTab + parseInt(e.currentTarget.dataset.tabChange);
    if (newValue < 0) {
      newValue = settingsTabsCount;
    } else if (newValue > settingsTabsCount) {
      newValue = 0;
    }
    setCurrentSettingsTab(newValue);
  }

  const onSnapshotChange = (e: any) => {
    const changedCategoryName = e.data().name;
    const newCategoriesData: categoryInterface[] = [...categories];
    newCategoriesData.forEach( (category, index) => {
      if (category.name === changedCategoryName) { 
        newCategoriesData[index] = e.data();
      }
    })
    setCategories(newCategoriesData);
  }

  const getData = () => {
    getCategories()
    .then(res => {
      setCategories(res);
    });
  }

  useEffect(() => { getData(); }, []);

  const toggleModal = (e: mouseEventSpan) => {
    const categoryIndex = e.target.dataset.categoryIndex;
    if (categoryIndex) {
      setChosenCategoryIndex(categoryIndex);
      setCurrentSettingsTab(1);
    } else {
      setCurrentSettingsTab(0);
    }
    setShowSettingsModal(!showSettingsModal);
  }

  const moveProduct = (e: mouseEventSpan) => {
    reverseProductState(e.target.dataset);
  }

  const handleBoxValueChange = (e: mouseEventSpan) => {
    const { setter, minValue, maxValue, change, currentValue } = e.currentTarget.dataset;
    let newValue = +currentValue + +change;
    newValue = newValue < minValue ? minValue : newValue;
    newValue = newValue > maxValue ? maxValue : newValue;
    if (setter === "base") {
      setBaseValue(newValue);
    }
    if (setter === "opacity") {
      setWaitingListOpacity(newValue);
    }
  }

  const handleValueChange = (e: inputChangeEvent) => {
    console.log(e);
  }

  return (
    <div className="App">
      {(categories.length && <CategoryList
        categories={categories} 
        moveProduct={moveProduct}
        toggleModal={toggleModal}
        onSnapshotChange={onSnapshotChange}
        baseValue={baseValue}
        waitingListOpacity={waitingListOpacity}
      />)}

      <SettingsModal
        isVisible={showSettingsModal}
        baseValue={baseValue}
        currentSettingsTab={currentSettingsTab}
        changeSettingsTab={changeSettingsTab}
        toggleModal={toggleModal}
        handleBoxValueChange={handleBoxValueChange}
        waitingListOpacity={waitingListOpacity}
        categories={categories}
        chosenCategoryIndex={chosenCategoryIndex}
        handleValueChange={handleValueChange}
      />

      <div className="modal-switch" onClick={toggleModal}><CgMenu/></div>
      
      {/* <button onClick={queryCategories} data-query-text="pasta" data-path="category.name"> Make a query </button> */}
      {/* <button onClick={resetCategoriesArray} data-query="aaa" data-path="capital"> Reset Categories ARRAY </button> */}
    </div>
  );
}

export default App;
