import { ProductInput } from "@/app/Interfaces/IProducts";
import React, { Dispatch, SetStateAction, useEffect } from "react";

interface ProductFormProps {
  productInput: ProductInput;
  setProductInput: (input: ProductInput) => void;
  handleAddProduct: () => void;
  handleUpdateProduct: (id: number) => void;
  handleCloseModal: () => void;
  productId?: number;
  setProductId?: Dispatch<SetStateAction<string | undefined>>;
}

export default function ProductForm({
  productInput,
  setProductInput,
  handleAddProduct,
  handleUpdateProduct,
  handleCloseModal,
  productId,
  setProductId,
}: ProductFormProps) {
  const handleGetProduct = async (productId: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/produto/${productId}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setProductInput(responseData);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    if (productId) handleGetProduct(productId);
  }, [productId, setProductInput]);

  useEffect(() => {
    if (!productId) setProductInput({} as ProductInput);
  }, [productId]);

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();

        if (productId) {
          handleUpdateProduct(productId);
        } else {
          handleAddProduct();
        }

        handleCloseModal();
        setProductInput({} as ProductInput);
        if (setProductId) setProductId(undefined);
      }}
    >
      <h1 className="text-xl font-medium">
        {productId ? "Editar Produto" : "Adicionar Produto"}
      </h1>
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

        <label htmlFor="marcaProduto">Marca do produto:</label>
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
          type="number"
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
        {productId ? "Salvar Alterações" : "Adicionar Produto"}
      </button>
    </form>
  );
}
