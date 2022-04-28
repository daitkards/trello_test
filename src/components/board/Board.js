import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './baseStyle.css';
import { MdAddCircle } from 'react-icons/md';
import Category from '../category/Category';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const Board = (props) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);


    const getUniqueCategory = () => {
        return `New ${Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}`;
    }
    const handleAddNewCategory = () => {
        dispatch({
            type: 'add_category',
            payload: {
                title: getUniqueCategory()
            }
        })
    }

    const swapElements = (inputArray, from, to)=> {
        inputArray.splice(from, 1, inputArray.splice(to, 1, inputArray[from])[0]);
    }

    const handleCategorySwap = (destination, source, draggableId, type)=> {
        const updatedCategories = [...categories];
        swapElements(updatedCategories, source.index, destination.index);
        
        dispatch({
            type: 'set_categories',
            payload: updatedCategories
        });
    }

    const getTargetCard =(categoryArray, index) => {

    }
    const handleDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        if (!destination) { return }
        if (destination.droppableId === source.droppableId && destination.index === source.index) { return }

        switch(type) {
            case 'category':
                handleCategorySwap(destination, source, draggableId, type);
                break
            case 'card':
                //check if swapping is required in same category
                const destinationCategory = categories.filter(category => category.id+'' === destination.droppableId);
                if (destinationCategory.length > 0) {
                if (destination.droppableId === source.droppableId) {
                        const cards = [...destinationCategory[0].cards];
                        swapElements(cards, source.index, destination.index);
                        dispatch({
                            type: 'set_cards',
                            payload: {
                                categoryId:destination.droppableId,
                                cards
                            }
                        });
                        return;
                    }

                    // drag in different category
                    //1. delete card from source category 
                    //2. add selected card to destination
                    const sourceCategory = categories.filter(category => category.id+'' === source.droppableId);
                    if (sourceCategory.length > 0) {
                        let card = sourceCategory[0].cards[source.index];
                        dispatch({
                            type: 'delete_card',
                            payload: {
                                categoryId: sourceCategory[0].id,
                                id:card.id
                            }
                        });
                        dispatch({
                            type: 'add_card_at_pos',
                            payload: {
                                categoryId: destinationCategory[0].id,
                                card,
                                index:destination.index
                            }
                        });
                    }
                    return;
                }
        }
        
    }
    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div>
                <Droppable droppableId='all-columns' direction='horizontal' type='category'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className='categories'>
                            {categories.map((category, index) => {
                                return (
                                    <Category index={index} categoryData={category} title="" key={category.id} />
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>
                <MdAddCircle title='Add new category' className='addNewCategory actionable' onClick={handleAddNewCategory}></MdAddCircle>
                </div>
            </DragDropContext>
        </>
    )
}

export default Board;