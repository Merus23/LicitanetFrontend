"use client";
import React, { useEffect, useState } from "react";
import { Product } from "./Interfaces/IProducts";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAllProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/produtos`, {
        method: "GET",
      });

      if (response.ok) {
        const responseData = await response.json();
        setProducts(responseData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <main className="flex flex-col gap-8 md:w-11/12  mx-auto pt-4">
      <h1 className="text-3xl">Lista de produtos</h1>
      <div className="flex">
        <div className="flex-1 flex flex-col gap-10">
          <h2 className="text-2xl ">Produtos:</h2>
          {isLoading ? (
            <div
              className="inline-block h-48 w-48 animate-spin rounded-full border-4 border-solid border-black border-e-transparent align-[-0.125em] text-black dark:text-white"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <ol>
              {products.map((product) => (
                <li key={product.cod_produto}>
                  <article>
                    <details>
                      <summary className="text-lg font-bold">
                        Nome: {product.nome_produto}
                      </summary>

                      <div className="pl-4 flex flex-col">
                        <ol>
                          <li>Valor: {product.valor_produto}</li>
                          <li>Estoque: {product.estoque}</li>
                          <li>Cidade: {product.cidade.nome_cidade}</li>
                          <li>Marca: {product.marca.nome_marca}</li>
                        </ol>
                      </div>
                    </details>
                  </article>
                </li>
              ))}
            </ol>
          )}
        </div>

        <details className="text-black w-1/5" name="">
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
