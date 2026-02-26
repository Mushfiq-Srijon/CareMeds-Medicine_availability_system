import { useEffect, useState } from "react";
import ApiClient from "../api";
import { Table, Spinner, Button, InputGroup, FormControl } from "react-bootstrap";
import toast from "react-hot-toast";

const apiClient = new ApiClient();

interface CartItem {
  cart_id: number;
  quantity: number;
  medicine_id: number;
  name: string;
  price: number;
  company: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await apiClient.getCart();
      setCartItems(res || []);
    } catch {
      toast.error("Failed to fetch cart");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (cartId: number, quantity: number) => {
    if (quantity < 1) return;
    setUpdatingId(cartId);
    try {
      await apiClient.updateCart(cartId, quantity);
      toast.success("Quantity updated");
      setCartItems(prev =>
        prev.map(item =>
          item.cart_id === cartId ? { ...item, quantity } : item
        )
      );
    } catch {
      toast.error("Failed to update quantity");
    }
    setUpdatingId(null);
  };

  const removeItem = async (cartId: number) => {
    setUpdatingId(cartId);
    try {
      await apiClient.removeCartItem(cartId);
      toast.success("Item removed");
      setCartItems(prev => prev.filter(item => item.cart_id !== cartId));
    } catch {
      toast.error("Failed to remove item");
    }
    setUpdatingId(null);
  };

  const checkout = () => {
    if (cartItems.length === 0) return toast.error("Cart is empty");
    toast.success("Proceeding to checkout...");
  };

  return (
    <>
      <h2 className="text-center mb-4">Your Cart</h2>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}

      {!loading && cartItems.length === 0 && (
        <p className="text-center text-muted">Cart is empty</p>
      )}

      {cartItems.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Company</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.cart_id}>
                  <td>{item.name}</td>
                  <td>{item.company}</td>
                  <td>{item.price}</td>
                  <td>
                    <InputGroup>
                      <Button
                        variant="outline-secondary"
                        onClick={() => updateQuantity(item.cart_id, item.quantity - 1)}
                        disabled={updatingId === item.cart_id || item.quantity <= 1}
                      >
                        -
                      </Button>
                      <FormControl
                        value={item.quantity}
                        readOnly
                        style={{ maxWidth: "60px", textAlign: "center" }}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
                        disabled={updatingId === item.cart_id}
                      >
                        +
                      </Button>
                    </InputGroup>
                  </td>
                  <td>{item.price * item.quantity}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeItem(item.cart_id)}
                      disabled={updatingId === item.cart_id}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end mt-3">
            <Button variant="success" onClick={checkout}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </>
  );
}