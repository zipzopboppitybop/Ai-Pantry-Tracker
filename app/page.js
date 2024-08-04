"use client";
import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Image from "next/image";
import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore"; 
import { db } from "./firebase";
import ItemComponent from "./Components/ItemComponent";

export default function Home() {
  // get items from database
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "items"), orderBy("timestamp"));

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
      timestamp: new Date().toISOString()
    };

    await addDoc(collection(db, "items"), item);

    setNewItem({ name: "", quantity: "" });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-xl w-full items-center justify-between font-mono text-sm ">
        <h1 className="text-5xl text-center">Ai Pantry Tracker</h1>
        <div className="flex justify-center">
          <input 
          className=" rounded-lg h-10 p-3 w-96 mt-5 text-black justify-center text-lg" placeholder="Search for an item"
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <div className="bg-gray-800 items-center rounded-lg mt-6 min-h-fit ">
          <form className="grid grid-cols-5 grid-rows-1 gap-4 p-5 m-0">
            <input 
            className="col-span-2 h-10 font-bold rounded-lg p-3 text-black text-lg" 
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input 
            className="col-span-2 col-start-3 font-bold rounded-lg text-black h-10 p-3 text-lg"
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
            <ul>
              {search ? (
                <>
                  {items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())).map((item, id) => (
                    <li key={id} className="pb-2 px-5 text-lg">
                      <ItemComponent item={item} />
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {items.map((item, id) => (
                    <li key={id} className="pb-2 px-5 text-lg">
                      <ItemComponent item={item} />
                    </li>
                ))}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
