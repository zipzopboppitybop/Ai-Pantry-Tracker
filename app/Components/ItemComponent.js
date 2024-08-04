import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ItemComponent = ({ item }) => {
  const [showInput, setShowInput] = useState(true);
  const [editedItem, setEditedItem] = useState({ name: item.name, quantity: item.quantity });

  // edit item in database
  const editItem = async (e) => {
    e.preventDefault();
    if (!editedItem.name || !editedItem.quantity) {
        setEditedItem({ name: item.name, quantity: item.quantity });
        return setShowInput(!showInput);
    };

    await updateDoc(doc(db, "items", item.id), {
        name: editedItem.name,
        quantity: editedItem.quantity,
    });
    

    setShowInput(!showInput);
    setEditedItem({ name: item.name, quantity: item.quantity });
  };



  // delete item from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  }

  return (
    <>
        <div className="bg-slate-950 rounded-lg grid grid-cols-6 grid-rows-0 gap-4 p-3">
            {showInput ? (
                <>
                    <input 
                    className="col-span-3 bg-slate-950 font-bold rounded-lg" 
                    value={item.name[0].toUpperCase() + item.name.slice(1).toLowerCase()} 
                    onChange={(e) => setEditedItem({ ...editedItem, quantity: e.target.value })}
                    disabled={showInput}
                    />
                    <input 
                    className="col-start-4 bg-slate-950 font-bold rounded-lg" 
                    value={item.quantity}
                    onChange={(e) => setEditedItem({ ...editedItem, quantity: e.target.value })}
                    disabled={showInput}
                    />
                    <button 
                    className="bg-green-500 rounded-lg text-white col-start-5"
                    onClick={() => {setShowInput(!showInput), setEditedItem({ name: item.name, quantity: item.quantity })}}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} className="fas fa-pen-to=square"></FontAwesomeIcon>
                    </button>
                </>
            ) : (
                <>
                <input 
                className="col-span-3 bg-white font-bold rounded-lg text-black" 
                value={editedItem.name} 
                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                disabled={showInput}
                />
                <input 
                className="col-start-4 bg-white font-bold rounded-lg text-black" 
                value={editedItem.quantity}
                onChange={(e) => setEditedItem({ ...editedItem, quantity: e.target.value })}
                disabled={showInput}
                />
                <button 
                className="bg-green-500 rounded-lg text-white col-start-5"
                onClick={editItem}
                >
                    <FontAwesomeIcon icon={faPenToSquare} className="fas fa-pen-to=square"></FontAwesomeIcon>
                </button>
                </>
            )}
            <button 
            className="bg-red-500 rounded-lg text-white col-start-6"
            onClick={() => deleteItem(item.id)}
            >
                <FontAwesomeIcon icon={faTrashCan} className="fas fa-trash-can"></FontAwesomeIcon>
            </button>
        </div>
    </>
  )
}

export default ItemComponent;