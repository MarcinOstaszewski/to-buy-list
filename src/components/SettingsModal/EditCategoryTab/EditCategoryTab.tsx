import React from 'react';
import { categoryInterface, inputChangeHandler } from '../../../helpers/typesAndInterfaces';

interface categoryTabInterface {
    index: number, 
    categories: categoryInterface[],
    handleValueChange: inputChangeHandler
}

const EditCategoryTab = (props: categoryTabInterface) => {
    const { index, categories, handleValueChange } = props;
    if  (index > -1) {
        let elements: any[] = [];
        const chosenCategory: categoryInterface = categories[index];
        const products = chosenCategory.products;
        if (products) {
            elements = Object.keys(products).map((name, i) => {
                return (
                    <div className="product-input" key={i}>
                        <input name="product" value={name} onChange={handleValueChange}/>
                        <input name="value" value={products[name]} onChange={handleValueChange}/>
                    </div>
                );
            });
        }
        
        return (
            <div className="category-input">
                <input name="category-name" 
                    value={ chosenCategory.name } onChange={handleValueChange}/>
                {elements}
            </div>
        );

    } 
    else {
        return null;
    }
};


export default EditCategoryTab;