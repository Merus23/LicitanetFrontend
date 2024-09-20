"use client";
import React, { useEffect, useState } from "react";
import { Product, ProductInput } from "./Interfaces/IProducts";
import { IPopupControl } from "./Interfaces/IGeneralInterfaces";
import Popup from "./Components/Popup/Popup";
import Modal from "./Components/Modal/Modal";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [popupControl, setPopupControl] = useState<IPopupControl>();
  const [modalControl, setModalControl] = useState<boolean>(false);
  const [isAddOrEdit, setIsAddOrEdit] = useState<string>();

  //FILTER STATES
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);
  const [cidadeFilter, setCidadeFilter] = useState<string>("");
  const [marcaFilter, setMarcaFilter] = useState<string>("");

  //ADD PRODUCT STATES
  const [productInput, setProductInput] = useState<ProductInput>(
    {} as ProductInput
  );

  const handleGetAllProducts = async (filter?: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/api/produtos${filter ? `${filter}` : ""}`,
        {
          method: "GET",
        }
      );

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

  const handleDeleteProduct = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/produto/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPopupControl({
          status: true,
          message: "Produto deletado com sucesso!",
        });
      }
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao excluir o item.");
      }

      setPopupControl({ status: true, message: "Item excluído com sucesso!" });
    } catch (error: any) {
      setPopupControl({
        status: false,
        message: error.message || "Erro desconhecido",
      });
    } finally {
      handleGetAllProducts();
      setIsLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      setIsLoading(true);
      console.log("Product input: ", productInput);
      const response = await fetch(`http://127.0.0.1:8000/api/produto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productInput),
      });
      if (response.ok) {
        setPopupControl({
          status: true,
          message: "Produto adicionado com sucesso!",
        });
      }
    } catch (error: any) {
      setPopupControl({
        status: false,
        message: error.message || "Erro desconhecido",
      });
    } finally {
      handleGetAllProducts();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  //Logger
  useEffect(() => {}, []);

  return (
    <>
      {popupControl && (
        <Popup status={popupControl.status} message={popupControl.message} />
      )}

      {modalControl && isAddOrEdit == "add" && (
        <Modal
          handleCloseModal={() => setModalControl(false)}
          innerDivClassName="h-4/5 w-11/12"
        >
          <form
            className="flex flex-col gap-2"
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              handleAddProduct();
              setModalControl(false);
              setProductInput({} as ProductInput);
            }}
          >
            <h1 className="text-xl font-medium">Adicione seu produto</h1>
            <h6 className="text-red-600">
              Infelizmente, ainda não é possível adicionar a marca do produto
              pelo nome (isso também se aplica para a cidade). Pedimos desculpas
              pelo transtorno.
            </h6>
            <div className="flex flex-col">
              <label htmlFor="nomeProduto">Nome do produto:</label>
              <textarea
                id="nomeProduto"
                className="resize-none border-2 border-black rounded-xl p-1 w-1/4"
                placeholder="Nome do produto"
                value={productInput.nome_produto || ""}
                onChange={(e) =>
                  setProductInput({
                    ...productInput,
                    nome_produto: e.target.value,
                  })
                }
              ></textarea>
              <label htmlFor="valorProduto">Valor do produto:</label>
              <input
                type="number"
                id="valorProduto"
                className="border-2 border-black rounded-xl p-1 w-1/4"
                placeholder="Valor do produto"
                value={productInput.valor_produto || 0}
                onChange={(e) =>
                  setProductInput({
                    ...productInput,
                    valor_produto: Number(e.target.value),
                  })
                }
              />

              <label htmlFor="valorProduto">Marca do produto </label>
              <input
                type="number"
                id="marcaProduto"
                className="border-2 border-black rounded-xl p-1 w-1/4"
                placeholder="Marca do produto"
                value={productInput.marca_produto || 0}
                onChange={(e) =>
                  setProductInput({
                    ...productInput,
                    marca_produto: Number(e.target.value),
                  })
                }
              />
              <label htmlFor="estoqueProduto">Estoque:</label>
              <input
                type="number"
                id="estoqueProduto"
                className="border-2 border-black rounded-xl p-1 w-1/4"
                placeholder="Estoque"
                value={productInput.estoque || 0}
                onChange={(e) =>
                  setProductInput({
                    ...productInput,
                    estoque: Number(e.target.value),
                  })
                }
              />
              <label htmlFor="cidadeProduto">Cidade:</label>
              <input
                type="1"
                id="cidadeProduto"
                className="border-2 border-black rounded-xl p-1 w-1/4"
                placeholder="Código da cidade"
                value={productInput.cidade || 0}
                onChange={(e) =>
                  setProductInput({
                    ...productInput,
                    cidade: Number(e.target.value),
                  })
                }
              />
            </div>

            <button className="bg-blue-600 text-white w-40 rounded-xl p-1">
              Adicionar
            </button>
          </form>
        </Modal>
      )}

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

                        <div className="flex gap-4">
                          <button className="w-40 bg-blue-600 text-white rounded-xl flex gap-2 p-1 justify-center items-center ">
                            Editar
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pencil"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg>
                          </button>
                          <button
                            className="w-40 bg-red-500 text-white rounded-xl p-1 flex gap-2 justify-center items-center"
                            onClick={() =>
                              handleDeleteProduct(product.cod_produto)
                            }
                          >
                            Deletar
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                          </button>
                        </div>
                      </details>

                      {/*Delete button*/}
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
                value={minValue}
                onChange={(e) => setMinValue(Number(e.target.value))}
              />

              <label htmlFor="maxValue">Valor máximo:</label>
              <input
                type="number"
                id="maxValue"
                className="border-2 border-black rounded-xl w-36"
                value={maxValue}
                onChange={(e) => setMaxValue(Number(e.target.value))}
              />

              <label htmlFor="cidadeFilter">Cidade:</label>
              <input
                type="text"
                id="cidadeFilter"
                className="border-2 border-black rounded-xl w-36"
                value={cidadeFilter}
                onChange={(e) => setCidadeFilter(e.target.value)}
              />

              <label htmlFor="marcaFilter" className="">
                Marca:
              </label>
              <input
                type="text"
                id="marcaFilter"
                className="border-2 border-black rounded-xl w-36"
                value={marcaFilter}
                onChange={(e) => setMarcaFilter(e.target.value)}
              />

              <button
                id="filterButton"
                className="bg-blue-600 w-28 text-white rounded-xl"
                onClick={() => {
                  let filter = "";

                  if (minValue) filter += `?min_valor=${minValue}`;
                  if (maxValue)
                    filter += `${filter ? "&" : "?"}max_valor=${maxValue}`;
                  if (cidadeFilter)
                    filter += `${filter ? "&" : "?"}cidade=${cidadeFilter}`;
                  if (marcaFilter)
                    filter += `${
                      filter ? "&" : "?"
                    }marca_produto=${marcaFilter}`;

                  handleGetAllProducts(filter);
                }}
              >
                Filtrar
              </button>
            </div>
          </details>
        </div>

        <button
          className="bg-blue-600 w-60 p-2 rounded-xl text-white"
          onClick={() => {
            setIsAddOrEdit("add");
            setModalControl(true);
          }}
        >
          Adicionar um novo produto
        </button>
      </main>
    </>
  );
}
