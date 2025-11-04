



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "./products";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Shop() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        toast.info(`Increased quantity of ${product.name}`);
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success(`${product.name} added to cart!`);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    const removed = cart.find((item) => item.id === productId);
    toast.warn(`${removed.name} removed from cart`);
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const changeQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const checkout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    toast.success(`Thank you for your purchase! Total: $${totalPrice.toFixed(2)}`);
    setCart([]);
  };

  const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  navigate("/");
  window.location.reload(); 
};


  return (
    <div className="app-container">
      <header className="header">
        <h1>🛍️ LuxuryCart</h1>
        <div className="cart-status">
          Cart: {cart.length} items
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <h2>Products</h2>
      <div className="products-grid">
        {products
          .filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product) => (
            <div key={product.id} className="product-card">
              {product.name === "Smart Watch" && (
                <span className="badge">🔥 Best Seller</span>
              )}
              <img
                src={product.image}
                alt={product.name}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/150x150.png?text=Image+Not+Found")
                }
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
      </div>

      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-table-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        changeQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>
                  Total:
                </td>
                <td colSpan="2" style={{ fontWeight: "bold" }}>
                  ${totalPrice.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <button className="checkout-btn" onClick={checkout}>
        Checkout
      </button>

      <ToastContainer />
    </div>
  );
}

export default Shop;
