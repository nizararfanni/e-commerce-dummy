import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  images: string;
  description: string;
  category: string;

  rate: number;
  count: number;
};

export const UseGetAllProduct = () => {
  const [product, setDetailProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:4000/products");
        console.log("isi data", response.data.products);
        setDetailProduct(response.data.products);
      } catch (error) {
        console.log("error cuy", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProducts();
  }, []);

  return { product, isLoading };
};

export const UseDetailProduct = (id: number) => {
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getDDetailProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:4000/products/${id}`
        );
        // console.log("isi data", response.data);
        setDetailProduct(response.data.data);
      } catch (error) {
        console.log("error cuy", error);
      } finally {
        setIsLoading(false);
      }
    };
    getDDetailProduct();
  }, [id]);

  return { detailProduct, isLoading };
};
