import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-xl w-full items-center justify-between font-mono text-sm ">
        <h1 className="text-5xl text-center">Pantry Tracker</h1>
        <div className="bg-gray-800 items-center rounded-lg mt-6 h-20 min-h-fit">
          <form className="grid grid-cols-5 grid-rows-5 gap-4 p-5 min-h-fit">
            <input 
            className="col-span-2 h-10 font-bold p-3" 
            placeholder="Item Name"
            />
            <input 
            className="col-span-2 col-start-3 font-bold h-10 p-3"
            placeholder="Quantity" 
            />
            <button className="col-start-5 bg-slate-950 h-11 text-2xl p-1">+</button>
          </form>
        </div>
      </div>
    </main>
  );
}
