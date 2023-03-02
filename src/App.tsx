import React, { useEffect, useState } from 'react';
import { getCategories, queryCategories, resetCategoriesArray, reverseProductState } from './helpers/firebase';
import CategoryList from './components/CategoryList/CategoryList';
import SettingsModal from './components/SettingsModal/SettingsModal';
import { CgMenu } from "react-icons/cg";

import './App.css';

function App() {
  interface categoryInterface {
    name?: string,
    hue?: number,
    products?: {}
  }

  type mouseEvent = React.MouseEventHandler<HTMLSpanElement> | any;

  const categoryArray: categoryInterface[] = [];
  const [categories, setCategories] = useState(categoryArray);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [baseValue, setBaseValue] = useState(12);
  const [currentSettingsTab, setCurrentSettingsTab] = useState(0);
  const settingsTabsCount = 2;

  const changeSettingsTab = (e: mouseEvent) => {
    console.log(currentSettingsTab, e.currentTarget.dataset.tabChange);
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

  const toggleModal = (e: mouseEvent) => {
    console.log(e.target.dataset.category);
    if (e.target.dataset.category) {
      setCurrentSettingsTab(1);
    }
    setShowSettingsModal(!showSettingsModal);
  }

  const moveProduct = (e: mouseEvent) => {
    reverseProductState(e.target.dataset);
  }

  const handleBoxValueChange = (e: mouseEvent) => {
    let newBaseValue = baseValue + parseInt(e.currentTarget.dataset.change);
    newBaseValue = newBaseValue < 4 ? 4 : newBaseValue;
    newBaseValue = newBaseValue > 48 ? 48 : newBaseValue;
    setBaseValue(newBaseValue);
  }

  return (
    <div className="App">
      {(categories.length && <CategoryList
        categories={categories} 
        moveProduct={moveProduct}
        toggleModal={toggleModal}
        onSnapshotChange={onSnapshotChange}
        baseValue={baseValue}
      />)}

      <SettingsModal
          isVisible={showSettingsModal}
          baseValue={baseValue}
          currentSettingsTab={currentSettingsTab}
          changeSettingsTab={changeSettingsTab}
          toggleModal={toggleModal}
          handleBoxValueChange={handleBoxValueChange}
      />

      <div className="modal-switch" onClick={toggleModal}><CgMenu/></div>
      
      {/* <button onClick={queryCategories} data-query-text="pasta" data-path="category.name"> Make a query </button> */}
      {/* <button onClick={resetCategoriesArray} data-query="aaa" data-path="capital"> Reset Categories ARRAY </button> */}
    </div>
  );
}

export default App;
