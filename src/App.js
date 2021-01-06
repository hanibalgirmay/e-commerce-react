import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce"; //for backend
import { NavBar, Products, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [erroMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const res = await commerce.cart.retrieve();
    setCart(res);
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  const handleRemoveItemFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  const handleAddCart = async (productID, quantity) => {
    const response = await commerce.cart.add(productID, quantity);

    setCart(response.cart);
  };

  const refershCart = async () => {
    const newCart = await commerce.cart.refersh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incommingOrder = await commerce.checkout(checkoutTokenId, newOrder);
      setOrder(incommingOrder);
      refershCart();
    } catch (error) {
      console.log("erro: ", error);
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); //run @the start when render

  console.log(products);
  console.log("cart: ", cart);
  return (
    <Router>
      <div>
        <NavBar totalCart={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddCart} />
          </Route>
          <Route exact path="/cart">
            <Cart
              Cart={cart}
              handleEmptyCart={handleEmptyCart}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItemFromCart={handleRemoveItemFromCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              order={order}
              error={erroMessage}
              onCaptureCheckout={handleCaptureCheckout}
              cart={cart}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
