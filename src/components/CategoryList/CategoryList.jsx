import React, { useEffect, useState } from "react";
import { subscribeToDB } from "../../helpers/firebase";
import StyledCategoryList from "./CategoryList.styled";

const CategoryList = props => {
	const { categories, moveProduct, onSnapshotChange, toggleModal, baseValue, waitingListOpacity } = props;
	const [productsToBuy, setProductsToBuy] = useState([]);
	const [productsWaiting , setProductsWaiting] = useState([]);

	const createProductsList = ({category, isToBuy, style}) => {
		const products = category.products;
		return products.map((product, i) => {
			const isLast = (i + 1 === products.length) ? ' is-last' : '';
			
			return (
				<span key={`${category.name}-${i}`}
					className={`product${isLast}`}
					onClick={e => moveProduct(e)}
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
		const productsList = [];
		categoriesData.forEach((category, i) => {
			const bgColor = `hsl(${category.hue}, 70%, 30%)`;
			const style = {backgroundColor: bgColor};
			const categoryLength = category.products.length;
			const isCategoryEmpty = categoryLength === 0 ? ' is-empty': '';
			const categoryProducts = categoryLength ? createProductsList({category, isToBuy, style}) : [];
			productsList.push(
				<span key={i} style={style}
					className={`category${isCategoryEmpty}`}
					data-category={category.name}
					data-category-index={i}
					onClick={toggleModal}>
					{category.name.toUpperCase()}
				</span>,
				...categoryProducts
			)
		});
		return productsList;
	}

	const createCategoryObject = (catData, products) => { 
		return {
			name: catData.name,
			hue: catData.hue,
			products
		}
	}

	const divideProductsList = (categories) => {
		const productsToBuy = [];
		const productsWaiting = [];
		Object.keys(categories).forEach(category => {
			const _ToBuy = [];
			const _Waiting = [];
			const catData = categories[category];
			Object.keys(categories[category].products).forEach(prod => {
				if (parseInt(catData.products[prod]) === 1) {
					_ToBuy.push(prod);
				} else {
					_Waiting.push(prod);
				}
			});
			productsToBuy.push(createCategoryObject(catData, _ToBuy));
			productsWaiting.push(createCategoryObject(catData, _Waiting));
		});
		return [productsToBuy, productsWaiting];
	};

	useEffect(() => { subscribeToDB(onSnapshotChange); }, []);

	useEffect(() => {
		const [filteredToBuy, filteredWaiting] = divideProductsList(categories);
		setProductsToBuy(createCategoriesList(filteredToBuy, 1));
		setProductsWaiting(createCategoriesList(filteredWaiting, 0));
	}, [categories]);
	
	return (
		<StyledCategoryList 
			baseValue={baseValue} 
			waitingListOpacity={waitingListOpacity}
		>
			<div className="to-buy-list">
				<div className="list-name">To buy list</div>
				{productsToBuy}
			</div>
			<div className="waiting-list">
				<div className="list-name">other products</div>
				{productsWaiting}
			</div>
		</StyledCategoryList>
	);
};

export default CategoryList;
