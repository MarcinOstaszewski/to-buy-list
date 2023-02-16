import React, { useEffect, useState } from 'react';
import { getCategories, reverseProductState } from './helpers/firebase';
import CategoryList from './components/CategoryList/CategoryList';
import './App.css';

function App() {
  let [categories, setCategories] = useState({});

  const getData = () => {
    getCategories()
    .then(res => {
      // console.log(res);
      setCategories(res);
    })
  }

  useEffect(() => {
    getData();
  }, []);

  const moveProduct = (e: React.MouseEventHandler<HTMLSpanElement> | any) => {
    let {category, product, isToBuy} = e.target.dataset;
    isToBuy = isToBuy ? 0 : 1;
    // console.log(category, product, isToBuy);
    reverseProductState(category, product, isToBuy);
    getData();
  }
  
  return (
    <div className="App">
      <CategoryList categories={categories} moveProduct={moveProduct}/>
    </div>
  );
}

export default App;
