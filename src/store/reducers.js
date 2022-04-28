
const baseReducer = (state= {
    categories:[
        
    ]
}, action)=> {
    let cards;
    let category;
  switch(action.type) {
    case 'add_card':
        category = state.categories.filter(category=> category.id === action.payload.id);
        if (category.length > 0) {
            category[0].cards.push({
                id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())),
                title:action.payload.title 
            })
        }
        return state;
    case 'edit_card':
        category = state.categories.filter(category=> category.id === action.payload.categoryId);
        if (category.length > 0) {
            let card = category[0].cards.filter(card => card.id === action.payload.id);
            if (card.length > 0)
                card[0].title = action.payload.title;
        }
        return state;

    case 'set_cards':
        category = state.categories.filter(category=> category.id+'' === action.payload.categoryId);
        if (category.length > 0) {
            category[0].cards = action.payload.cards;
        }
        return state;
    case 'delete_card':
         category = state.categories.filter(category=> category.id === action.payload.categoryId);
         if (category.length > 0) {
            category[0].cards = category[0].cards.filter(card => card.id !== action.payload.id);;
        }
         return {...state, categories:[...state.categories]};
    case 'add_category':
         return {...state, categories: [...state.categories, {id:Math.floor(Math.random() * Math.floor(Math.random() * Date.now())), title: action.payload.title, cards: []}]};
    case 'delete_category':
         return {...state, categories: state.categories.filter(category=> category.id !== action.payload.id)}
    case 'set_categories':
         return {...state, categories:[...action.payload]}
    case 'update_category_title':
        category = state.categories.filter(category=> category.id === action.payload.categoryId);
        if (category.length > 0) {
            category[0].title = action.payload.title
        }
        return {...state, categories:[...state.categories]};

    case 'add_card_at_pos':
        category = state.categories.filter(category=> category.id === action.payload.categoryId);
        if (category.length > 0) {
            category[0].cards.splice(action.payload.index, 0, action.payload.card);
        }
        return {...state, categories:[...state.categories]};
    default:
        return state;
  }

}

export default baseReducer;