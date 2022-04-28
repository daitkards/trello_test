import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Card from '../card/Card';
import './baseStyle.css';
import { MdAdd } from 'react-icons/md';
import { MdEdit, MdCheck, MdClose } from 'react-icons/md';
import { Draggable, Droppable } from 'react-beautiful-dnd';
const Category = ({ categoryData, index }) => {
    const [cardTitle, setCardTitle] = React.useState('');

    const handleAddCard = () => {
        dispatch({
            type: 'add_card',
            payload: {
                id: categoryData.id,
                title: cardTitle
            }
        });
        clearText();
    }

    const [editedCategory, setEditedCategory] = useState({
        categoryId: -1,
        title: ''
    });

    const handleCategoryTitleChange = () => {
        dispatch({
            type: 'update_category_title',
            payload: {
                categoryId: editedCategory.id,
                title: editedCategory.title
            }
        });
        cancelEdit();
    }
    const cancelEdit = () => {
        setEditedCategory({
            categoryId: -1,
            title: ''
        })
    }

    const clearText = () => {
        setCardTitle('');
    }
    const dispatch = useDispatch();

    const handleDeleteCategory = () => {
        dispatch({
            type: 'delete_category',
            payload: {
                id: categoryData.id
            }
        })
    }
    const updateCategoryTitle = ()=> {
        dispatch({
            type: 'update_category_title',
            payload: {
                categoryId: editedCategory.categoryId,
                title: editedCategory.title
            }
        });
        cancelEdit();
    }

    return (<>
        <Draggable draggableId={categoryData.id+''} index={index}>
            {(provided) => (
                <div ref={provided.innerRef}
                {...provided.draggableProps} className='category'>
                    {editedCategory.categoryId > -1 ? (<>
                        <div className='categoryTitle'>
                            <input 
                                type="text"
                                className='categoryTitleTxt'
                                value={editedCategory.title} 
                                onChange={(e)=>{ 
                                    setEditedCategory({...editedCategory, title:e.target.value});
                                  }
                                }
                            ></input>
                            <MdCheck title='Save' className='actionable actionable-size' onClick={updateCategoryTitle}></MdCheck>
                            <MdClose title='Cancel' className='actionable actionable-size' onClick={cancelEdit}></MdClose>
                        </div>
                    </>) : (<>
                        <div{...provided.dragHandleProps} className='titleBox'>
                        <div  className='categoryTitle'>
                            <label title={categoryData.title} className='titleLbl'>
                                {categoryData.title}
                            </label>
                        </div>
                            <MdEdit title='Edit' className='actionable' onClick={() => setEditedCategory({
                                categoryId: categoryData.id,
                                title: categoryData.title
                            })}></MdEdit>
                            </div>
                    </>)}
                    <Droppable droppableId={categoryData.id+''} type='card'>
                        {(provided, snapshot) => (
                            <div
                                className='cardList'
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {categoryData.cards.map((card, index) => <Card key={card.id} index={index} cardData={card} categoryId={categoryData.id}></Card>)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div>
                        <div className='actions'>
                            <textarea placeholder='Enter Task' className='newCardInput' value={cardTitle} onChange={(e) => setCardTitle(e.target.value)}></textarea>
                            <MdAdd title='Add new task' className='actionable actionable-size' onClick={() => {
                                if (cardTitle.trim().length > 0)
                                    handleAddCard();
                            }}></MdAdd>

                        </div>
                        <div className='deleteAction'>
                            <button className='deleteBtn' title='Delete Category' onClick={handleDeleteCategory}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

        </Draggable>
    </>)
}


export default Category;