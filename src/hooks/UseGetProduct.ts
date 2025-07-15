import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export const UseGetAllProduct = () => {
  const [product, setDetailProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        // console.log("isi data", response.data);
        setDetailProduct(response.data);
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
          `https://fakestoreapi.com/products/${id}`
        );
        // console.log("isi data", response.data);
        setDetailProduct(response.data);
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
