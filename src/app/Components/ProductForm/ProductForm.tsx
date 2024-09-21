import { ProductInput } from "@/app/Interfaces/IProducts";
import React, { useState } from "react";

interface ProductFormProps {
  productInput: ProductInput;
  setProductInput: (input: ProductInput) => void;
  handleAddProduct: () => void;
  handleCloseModal: () => void;
}

export default function ProductForm({
  productInput,
  setProductInput,
  handleAddProduct,
  handleCloseModal,
}: ProductFormProps) {
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        handleAddProduct();
        handleCloseModal();
        setProductInput({} as ProductInput); // Reseta o formulário após adicionar
      }}
    >
      <h1 className="text-xl font-medium">Adicione seu produto</h1>
      <h6 className="text-red-600">
        Infelizmente, ainda não é possível adicionar a marca do produto pelo
        nome (isso também se aplica para a cidade). Pedimos desculpas pelo
        transtorno.
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
        Adicionar
      </button>
    </form>
  );
}
