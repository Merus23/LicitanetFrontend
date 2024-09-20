import { Marca } from "./IBrand";
import { Cidade } from "./ICIty";

export interface Product {
  cidade: Cidade;
  cod_produto: number;
  created_at: string;
  estoque: number;
  marca: Marca;
  nome_produto: string;
  updated_at: string;
  valor_produto: number;
}

export interface ProductInput {
  nome_produto: string;
  valor_produto: number;
  marca_produto: number;
  estoque: number;
  cidade: number;
}
