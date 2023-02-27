import React, { useEffect, useState } from 'react';
import { getCategories, queryCategories, resetCategoriesArray, reverseProductState } from './helpers/firebase';
import CategoryList from './components/CategoryList/CategoryList';
import './App.css';

function App() {
  interface categoryInterface {
    name?: string,
    hue?: number,
    products?: {}
  } 

  const categoryArray: categoryInterface[] = [];
  const [categories, setCategories] = useState(categoryArray);
  const getCategoriesData = () => categories;

  const onSnapshotChange = (e: any) => {
    const categories = getCategoriesData();
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

  const moveProduct = (e: React.MouseEventHandler<HTMLSpanElement> | any) => {
    reverseProductState(e.target.dataset);
  }
  
  return (
    <div className="App">
      {categories.length && <CategoryList
        categories={categories} 
        moveProduct={moveProduct}
        onSnapshotChange={onSnapshotChange}
      />}
      {/* <button onClick={queryCategories} data-query-text="pasta" data-path="category.name"> Make a query </button> */}
      {/* <button onClick={resetCategoriesArray} data-query="aaa" data-path="capital"> Reset Categories ARRAY </button> */}
    </div>
  );
}

export default App;
