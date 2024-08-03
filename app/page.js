"use client";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc, getDocs, doc, deleteDoc, QuerySnapshot, query, onSnapshot } from "firebase/firestore"; 
import { db } from "./firebase";

export default function Home() {
  // get items from database
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
    });
  }, []);
  
  // add item to database
  const [newItem, setNewItem] = useState({ name: "", quantity: "" });

  const addItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.quantity) return;

    const item = {
      name: newItem.name.trim(),
      quantity: newItem.quantity.trim(),
    };

    await addDoc(collection(db, "items"), item);

    setNewItem({ name: "", quantity: "" });
  }

  // delete item from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-xl w-full items-center justify-between font-mono text-sm ">
        <h1 className="text-5xl text-center">Ai Pantry Tracker</h1>
        <div className="bg-gray-800 items-center rounded-lg mt-6 min-h-fit ">
          <form className="grid grid-cols-5 grid-rows-1 gap-4 p-5 m-0">
            <input 
            className="col-span-2 h-10 font-bold rounded-lg p-3 text-black" 
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input 
            className="col-span-2 col-start-3 font-bold rounded-lg text-black h-10 p-3"
            placeholder="Quantity" 
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            />
            <button 
            onClick={addItem}
            className="col-start-5 bg-slate-950 rounded-lg  h-11 text-2xl p-1">
              +
            </button>
          </form>
          <div className="my-0 ">
            {items.map((item, id) => (
              <ul>
                <li key={id} className="pb-2 px-5 text-lg">
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
                </li>
              </ul>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
