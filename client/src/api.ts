import axios, { AxiosInstance } from 'axios';
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

 async getMedicines() {
  try {
    const res = await this.client.get('/api/medicines');
    return res.data; // returns array
  } catch (error) {
    this.handleError(error);
  }
}


  async addMedicine(data: any) {
    try {
      const res = await this.client.post('/api/medicines', data);
      return res.data;
    } catch (error) {
      this.handleError(error);
    }
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
