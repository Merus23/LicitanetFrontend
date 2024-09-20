import React from "react";
export default function Home() {
  return (
    <main className="flex flex-col gap-8 md:w-11/12  mx-auto pt-4">
      <h1 className="text-3xl">Lista de produtos</h1>
      <div className="flex">
        <div className="flex-1 b">
          <h2 className="text-2xl ">Produtos:</h2>
          <ol></ol>
        </div>

        <details className="text-black flex-1" name="">
          <summary className="text-2xl">Filtros</summary>

          <div className="flex flex-col w-1/2 pl-4 gap-1">
            <label htmlFor="minValue">Valor mínimo:</label>
            <input
              type="number"
              id="minValue"
              className="border-2 border-black rounded-xl w-36"
            />

            <label htmlFor="maxValue">Valor máximo:</label>
            <input
              type="number"
              id="maxValue"
              className="border-2 border-black rounded-xl w-36"
            />

            <label htmlFor="cidadeFilter">Cidade:</label>
            <input
              type="text"
              id="cidadeFilter"
              className="border-2 border-black rounded-xl w-36"
            />

            <label htmlFor="marcaFilter" className="">
              Marca:
            </label>
            <input
              type="text"
              id="marcaFilter"
              className="border-2 border-black rounded-xl w-36"
            />

            <button
              id="filterButton"
              className="bg-blue-700 w-28 text-white rounded-xl"
            >
              Filtrar
            </button>
          </div>
        </details>
      </div>
    </main>
  );
}
