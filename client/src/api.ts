import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { secrets } from './secrets';
import toast from 'react-hot-toast';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: secrets.backendEndpoint,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async delete(endpoint: string, config?: AxiosRequestConfig) {
  try {
    const res = await this.client.delete(endpoint, { ...config, ...this.getAuthConfig() });
    return res.data;
  } catch (error) {
    this.handleError(error);
  }
}

  // Get auth headers with token
  private getAuthConfig() {
    const token = localStorage.getItem('auth_token');
    if (!token) return {};
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  async get(endpoint: string, config?: AxiosRequestConfig) {
    try {
      const res = await this.client.get(endpoint, { ...config, ...this.getAuthConfig() });
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(endpoint: string, data: any, config?: AxiosRequestConfig) {
    try {
      const res = await this.client.post(endpoint, data, { ...config, ...this.getAuthConfig() });
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Medicines
  async getMedicines() {
    return this.get('/api/medicines');
  }

  // Add to cart
  async addToCart(medicineId: number, quantity: number = 1) {
    return this.post('/api/cart/add', { medicine_id: medicineId, quantity });
  }
 
async getCart() {
  return this.get("/api/cart/list");
}
// Update quantity
async updateCart(cartId: number, quantity: number) {
  return this.client.put(
    "/api/cart/update",
    { cart_id: cartId, quantity },
    this.getAuthConfig()
  );
}

// Remove item
async removeCartItem(cartId: number) {
  return this.client.delete(
    `/api/cart/remove/${cartId}`,
    this.getAuthConfig()
  );
}
// Clear entire cart
async clearCart() {
    return this.delete("/cart/clear");
}

  handleError(error: any) {
    if (error.response) {
      console.error(`API Error: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      console.error('API Error: No response received');
    } else {
      console.error('API Error:', error.message);
    }
    toast.error(error.message || 'Something went wrong');
  }
}

export default ApiClient;