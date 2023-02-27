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

  const onSnapshotChange = (e: any) => {
    if (!categories.length) {
      return;
    }

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
    getCategories(onSnapshotChange)
    .then(res => {
      setCategories(res);
    })
  }

  useEffect(() => {
    getData();
  }, []);

  const moveProduct = (e: React.MouseEventHandler<HTMLSpanElement> | any) => {
    let {category, product, isToBuy} = e.target.dataset;
    console.log('moveProduct runs:___', category, product, isToBuy);
    reverseProductState({category, product, isToBuy});
  }
  
  return (
    <div className="App">
      <CategoryList 
        categories={categories} 
        moveProduct={moveProduct}
      />
      {/* <button onClick={queryCategories} data-query-text="pasta" data-path="category.name"> Make a query </button> */}
      {/* <button onClick={resetCategoriesArray} data-query="aaa" data-path="capital"> Reset Categories ARRAY </button> */}
    </div>
  );
}

export default App;
