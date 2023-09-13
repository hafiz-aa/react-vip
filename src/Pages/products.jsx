import { Fragment, useState, useEffect, useRef } from "react";
import CardProduct from "../components/Fragments/CardProducts";
import Button from "../components/Elements/Button";
import { getProducts } from "../services/service.page";
// import Counter from "../components/Fragments/Counter";

const products = [
  {
    id: 1,
    name: "Sepatu Abu",
    price: 1000000,
    image: "/images/shoes-1.jpg",
    description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia quaerat sit voluptatum. Iure, voluptates maxime.`,
  },
  {
    id: 2,
    name: "Sepatu Biru",
    price: 1200000,
    image: "/images/shoes-2.jpg",
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut quidem sed veritatis fugiat assumenda, explicabo deleniti nulla quisquam cumque molestias?`,
  },
  {
    id: 3,
    name: "Sepatu Putih",
    price: 700000,
    image: "/images/shoes-3.jpg",
    description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit.`,
  },
];

/**
 * Render the ProductsPage component.
 */

const email = localStorage.getItem("email");

const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [products, cart]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };

  const handleAddToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      setCart(cart.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
    } else {
      setCart([...cart, { id, qty: 1 }]);
    }
  };

  // useRef
  // const cartRef = useRef(JSON.parse(localStorage.getItem("cart")));

  // const handleAddToCartRef = (id) => {
  //   cartRef.current = [...cartRef.current, { id, qty: 1 }];
  //   localStorage.setItem("cart", JSON.stringify(cartRef.current));
  // };

  const totalPriceRef = useRef(null);
  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart, products]);

  return (
    <Fragment>
      <div className="flex justify-end h-20 bg-blue-600 text-white items-center px-10">
        {email}{" "}
        <Button className="ml-5 bg-black" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="flex justify-center py-5">
        <div className="w-3/4 flex flex-wrap">
          {products.length > 0 &&
            products.map((product) => (
              <CardProduct key={product.id}>
                <CardProduct.Header image={product.image} />
                <CardProduct.Body name={product.title}>{product.description}</CardProduct.Body>
                <CardProduct.Footer price={product.price} id={product.id} handleAddToCart={handleAddToCart} />
              </CardProduct>
            ))}
        </div>
        <div className="w-1/4">
          <h1 className="text-3xl font-bold text-blue-600">Cart</h1>
          <table className="text-left table-auto border-separate border-spacing-x-5">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                cart.map((item) => {
                  const product = products.find((product) => product.id === item.id);
                  return (
                    <tr key={item.id}>
                      <td>{product.title.substring(0, 20)}...</td>
                      <td>$ {product.price.toLocaleString("id-ID")}</td>
                      <td>{item.qty}</td>
                      <td>$ {(product.price * item.qty).toLocaleString("id-ID")}</td>
                    </tr>
                  );
                })}
              <tr ref={totalPriceRef}>
                <td colSpan={3}>
                  <b>Total Price</b>
                </td>
                <td>
                  <b>$ {totalPrice.toLocaleString("id-ID")}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="mt-5 flex justify-center">
        {" "}
        <Counter />
      </div> */}
    </Fragment>
  );
};

export default ProductsPage;
