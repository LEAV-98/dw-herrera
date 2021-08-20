import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItem,
  deleteProduct,
  increaseItem,
  initDeleteAll,
} from "../actions/shoppingCart";
import { Header } from "./Header";

export const ShoppingCartScreen = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const handleDeleteAll = () => {
    dispatch(initDeleteAll());
  };
  const handleDecrease = (id) => {
    console.log("c disminuye*");
    dispatch(decreaseItem(id));
  };
  const handleIncrease = (id) => {
    console.log("c aumenta**");
    dispatch(increaseItem(id));
  };
  const handleDeleteProduct = (id) => {
    console.log("c elimina*");
    dispatch(deleteProduct(id));
  };
  useEffect(() => {
    // console.log(shoppingCart);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);
  return (
    <>
      <Header />
      <div className="container mt-2 ">
        {shoppingCart.length !== 0 && (
          <button className="btn btn-danger mb-2" onClick={handleDeleteAll}>
            Eliminar Todo
          </button>
        )}

        {shoppingCart.map((product, i) => (
          <div key={i} className="card">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-4 col-sm-12 text-center">
                <img className="img-fluid" src={product.imagenUrl} alt="img" />
              </div>
              <div className="col-md-4 col-sm-12">
                <h2 className="text-center">{product.title}</h2>
                <div className="my-0 text-center">
                  <p>Cantidad</p>
                  <div className="my-1">
                    <button
                      className="btn btn-primary mr-1"
                      onClick={() => {
                        handleDecrease(product.id);
                      }}
                      disabled={product.cantidad === 1 && "disabled"} //solucion a nivel de diseño porque me dio perecita hacer la logica ajio ajio
                    >
                      -
                    </button>
                    <p className="d-inline"> {product.cantidad}</p>
                    <button
                      className="btn btn-primary ml-2"
                      onClick={() => {
                        handleIncrease(product.id);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 text-center">
                <button
                  className="btn btn-danger "
                  onClick={() => {
                    handleDeleteProduct(product.id);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
