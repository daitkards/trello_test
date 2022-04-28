import { useState } from 'react';
import './baseStyle.css';
import { useDispatch } from 'react-redux'
import { MdEdit, MdCheck, MdClose } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd'

const Card = ({ cardData, categoryId, index }) => {
    const dispatch = useDispatch();
    const [editedCard, setEditableCard] = useState({
        id: -1,
        title: ''
    });

    const handleDeleteCard = (id) => {
        dispatch({
            type: 'delete_card',
            payload: {
                categoryId,
                id
            }
        })
    }

    const handleEditCard = () => {
        dispatch({
            type: 'edit_card',
            payload: {
                id: editedCard.id,
                title: editedCard.title,
                categoryId
            }
        });
        cancelEdit();
    }
    const cancelEdit = () => {
        setEditableCard({
            id: -1,
            title: '',
            categoryId
        })
    }
    return (<>
        <Draggable draggableId={cardData.id+''} index={index}>
            {(provided, snapshot) => (
                <div
                    className='card'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {editedCard.id === cardData.id ? (<>
                        <div className='cardTile'>
                            <textarea value={editedCard.title} className='cardInput' rows={3} onChange={(e) => setEditableCard({ ...editedCard, title: e.target.value })} >
                            </textarea>
                        </div>
                        <div className='cardActions'>
                            <MdCheck title='Save' className='actionable' onClick={handleEditCard}></MdCheck>
                        </div>
                        <div title='Cancel' onClick={() => {
                            cancelEdit();
                        }} className='cardActions'>
                            <MdClose></MdClose>
                        </div>
                    </>) : (<>
                        <div  className='cardTile'>
                            <textarea style={{ outline: 'none', border: 'none', resize: 'none' }} readOnly value={cardData?.title} rows={3}></textarea>
                        </div>
                        <div className='cardActions' onClick={() => setEditableCard({ ...cardData })}>
                            <MdEdit title='Edit' className='actionable actionable-size'></MdEdit>
                        </div>
                        <div onClick={() => {
                            handleDeleteCard(cardData.id)
                        }} className='cardActions'>
                            <MdClose title='Delete' className='actionable actionable-size'></MdClose>
                        </div>
                    </>)}
                </div>
            )}

        </Draggable>
    </>)
}


export default Card;