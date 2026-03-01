import { useEffect, useState } from "react";
import { Table, Button, Form, Spinner } from "react-bootstrap";
import ApiClient from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const apiClient = new ApiClient();

interface CartItem {
  cart_id: number;
  medicine_id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"home_delivery" | "pickup">("home_delivery");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await apiClient.getCart();
      setCartItems(res || []);
    } catch {
      toast.error("Failed to load cart");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = deliveryType === "home_delivery" ? 50 : 0;
  const grandTotal = totalPrice + deliveryCharge;

  const placeOrder = async () => {
    if (!customerName || !phone || !address) return toast.error("Fill all fields");
    if (cartItems.length === 0) return toast.error("Cart is empty");

    setPlacingOrder(true);

    try {
      // Backend expects pharmacy_id, delivery_type, items
      await apiClient.post("/orders", {
        pharmacy_id: 1, // For simplicity, we can hardcode a pharmacy ID
        delivery_type: deliveryType,
        items: cartItems.map(item => ({
          medicine_id: item.medicine_id,
          quantity: item.quantity
        }))
      });

      // Clear cart
      await apiClient.clearCart();

      toast.success("Order placed successfully!");
      navigate("/home"); // redirect to home or success page
    } catch (error: any) {
      toast.error(error?.message || "Failed to place order");
    }

    setPlacingOrder(false);
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  if (cartItems.length === 0) return <p className="text-center mt-5">Cart is empty</p>;

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <h4 className="mt-4">Customer Information</h4>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Delivery Address</Form.Label>
          <Form.Control
            as="textarea"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
      </Form>

      <h4 className="mt-4">Cart Items</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.cart_id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="mt-3">
        <h5>Delivery Method</h5>
        <Form.Check
          type="radio"
          label={`Home Delivery (+50 BDT)`}
          checked={deliveryType === "home_delivery"}
          onChange={() => setDeliveryType("home_delivery")}
        />
        <Form.Check
          type="radio"
          label="Pickup (0 BDT)"
          checked={deliveryType === "pickup"}
          onChange={() => setDeliveryType("pickup")}
        />
      </div>

      <h4 className="mt-3">Grand Total: {grandTotal} BDT</h4>

      <Button
        variant="success"
        className="mt-3"
        onClick={placeOrder}
        disabled={placingOrder}
      >
        {placingOrder ? "Placing Order..." : "Place Order"}
      </Button>
    </div>
  );
}