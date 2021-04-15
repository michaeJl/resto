const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    total: 0
}
const  reducer = (state = initialState,action)=>{
    switch (action.type) {
        case 'MENU_LOADED':
                return {
                    ...state,
                    menu: action.payload,
                    loading: false,
                    error: false
                };
        case 'MENU_REQUESTED':
            return {
                    ...state,
                menu: state.menu,
                loading: true,
                error: false,
            };
        case 'MENU_ERROR':
            return {
                menu: state.menu,
                loading: false,
                error: true
            };
        case 'ITEM_ADD_TO_CART': 
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            let newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id
            };
            let str = ((newItem.id+'')[0]);
            let iter = 0;
            
            for(let i = 0; i < state.items.length ;i++){
                if ( ( ((newItem.id+'')[0]) === ((state.items[i].id+'')[0]) )) {
                    iter++
                }
            }  
            newItem.id = `${str}_${iter}`;
            const itemInd = state.items.findIndex(item => item.id === newItem.id);
            
            if (itemInd >= 0){
                console.log("object");
                iter = (iter * iter)+1;
                newItem.id = `${str}_${iter}`;

                for (let i =0;i <(state.items).length-1; i++ ) {
                    for (let j =0; j <(state.items).length ;j++) {
                        if (newItem.id === state.items[j].id ) {
                            newItem.id = `${str}_${++iter}`;
                        }
                    }
                }
            }
            
            console.log(newItem.id);
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                total: state.total + newItem.price
            };
            
        case 'DELETE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            
            return {
                ...state,
                items: [
                    ...state.items.slice(0,itemIndex),
                    ...state.items.slice(itemIndex+1)
                ],
                total: state.total - state.items[itemIndex].price
            }
        default: return state;
    }
}

export default reducer;