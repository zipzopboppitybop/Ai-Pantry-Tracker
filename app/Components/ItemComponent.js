import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const ItemComponent = ({ item }) => {
    const [showInput, setShowInput] = useState(true);
  // edit item in database
    const editItem = async (id) => {
        await updateDoc(doc(db, "items", id), {
            name: "edited name",
            quantity: "edited quantity",
        });
    }

  // delete item from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  }

  return (
    <>
        <div className="bg-slate-950 rounded-lg grid grid-cols-6 grid-rows-0 gap-4 p-3">
            <input 
            className="col-span-3 bg-slate-950 font-bold rounded-lg" 
            value={item.name} 
            disabled={showInput}
            />
            <input 
            className="col-start-4 bg-slate-950 font-bold rounded-lg" 
            value={item.quantity}
            disabled={showInput}
            />
            <button 
            className="bg-green-500 rounded-lg text-white col-start-5"
            onClick={() => setShowInput(!showInput)}
            >
                <FontAwesomeIcon icon={faPenToSquare} className="fas fa-pen-to=square"></FontAwesomeIcon>
            </button>
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