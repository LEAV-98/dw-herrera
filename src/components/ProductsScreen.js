import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase-config";
import { Header } from "./Header";
import { ProductList } from "./products/ProductList";

export const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  useEffect(() => {
    db.collection("products").onSnapshot((snapshot) => {
      const newProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(newProducts);
      setLoading(true);
    });
    return () => {
      setProducts([]);
    };
  }, []);
  useEffect(() => {
    // console.log(shoppingCart);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);
  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <>
            <h1>Productos</h1>
            <ProductList products={products} />
          </>
        ) : (
          <h1>Cargando</h1>
        )}
      </div>
    </>
  );
};
