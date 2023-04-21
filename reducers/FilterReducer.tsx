type FilterStateType = {
	allProducts: any;
	filteredProducts: any;
	filters: { text: string };
};

type UpdateFiltersAction = {
	type: "UPDATE_FILTERS";
	payload: {
		name: string;
		value: string;
	};
};

type FilterProductsAction = {
	type: "FILTER_PRODUCTS";
};

type FilterActionType = UpdateFiltersAction | FilterProductsAction;

const filterReducer = (state: FilterStateType, action: FilterActionType) => {
	if (action.type === "UPDATE_FILTERS") {
		const { name, value } = action.payload;
		return { ...state, filters: { ...state.filters, [name]: value } };
	}

	if (action.type === "FILTER_PRODUCTS") {
		const { allProducts } = state;
		const { text } = state.filters;
		let tempProducts = [...allProducts];

		if (text) {
			tempProducts = tempProducts.filter((product) =>
				product.name.toLowerCase().includes(text.toLowerCase())
			);
		}
		return { ...state, filteredProducts: tempProducts };
	}

	return state;
};

export default filterReducer;