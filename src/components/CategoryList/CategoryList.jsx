import React, { useEffect, useState } from "react";
import StyledCategoryList from "./CategoryList.styled";

const CategoryList = props => {
  const { categories } = props;
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [productsWaiting , setProductsWaiting] = useState([]);

  const createProductsList = ({category, isToBuy, style}) => {
    const products = category.products;
    return products.map((product, i) => {
      const isLast = i + 1 === products.length ? ' is-last' : '';
      return (
        <span key={`${category}-${i}`}
          className={`product${isLast}`}
          onClick={e => props.moveProduct(e)}
          data-category={category.name}
          data-product={product}
          data-is-to-buy={isToBuy}
          style={style}>
          {product}
        </span>
      )
    })
  }

  const createCategoriesList = (categoriesData, isToBuy) => {
    return categoriesData.map((category, i) => {
      const bgColor = `hsl(${category.hue}, 40%, 40%)`;
      const style = {backgroundColor: bgColor};
      const categoryLength = category.products.length;
      const isCategoryEmpty = categoryLength === 0 ? ' is-empty': '';
      const categoryProducts = categoryLength ? createProductsList({category, isToBuy, style}) : '';
      return <>
        <span key={i} style={style}
          className={`category${isCategoryEmpty}`}>
          {category.name.toUpperCase()}
        </span>
        {categoryProducts}
      </>
    });
  }

  const divideProductsList = (categories) => {
    let tempToBuy = [];
    let tempWaiting = [];
    Object.keys(categories).forEach(category => {
      const tempProductsToBuy = [];
      const tempProductsWaiting = [];
      const categoryData = categories[category];
      Object.keys(categories[category].products).forEach(prod => {
        if (categoryData.products[prod]) {
          tempProductsToBuy.push(prod);
        } else {
          tempProductsWaiting.push(prod);
        }
      });
      tempToBuy.push({
        name: category,
        hue: categoryData.hue,
        products: tempProductsToBuy
      });
      tempWaiting.push({
        name: category,
        hue: categoryData.hue,
        products: tempProductsWaiting
      });
    });

    tempToBuy = createCategoriesList(tempToBuy, true);
    tempWaiting = createCategoriesList(tempWaiting, false);
    setProductsToBuy(tempToBuy);
    setProductsWaiting(tempWaiting);
  }

  useEffect(() => {
    divideProductsList(categories);
  }, []);
  
  return (
    <StyledCategoryList>
      <div className="to-buy-list">
        {productsToBuy}
      </div>
      <div className="waiting-list">
        {productsWaiting}
      </div>
    </StyledCategoryList>
  );
};

export default CategoryList;
