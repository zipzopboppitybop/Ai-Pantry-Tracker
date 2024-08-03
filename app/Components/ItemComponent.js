import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const ItemComponent = ({ item }) => {
  // delete item from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  }

  return (
    <>
        <div className="bg-slate-950 rounded-lg grid grid-cols-6 grid-rows-0 gap-4 p-3">
            <span className="col-span-3">{item.name}</span>
            <span className="col-start-4">{item.quantity}</span>
            <button className="bg-green-500 rounded-lg text-white col-start-5">
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