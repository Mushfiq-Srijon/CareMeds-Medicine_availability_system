import { useEffect, useState } from 'react';
import ApiClient from '../api';
import { Form, Card, Row, Col, Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';

const apiClient = new ApiClient();

interface Medicine {
  id: number;
  name: string;
  generic_name: string;
  company: string;
  category: string;
  stock: number;
  price: number;
}

export default function Home() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Add to cart
  const handleAddToCart = async (medicineId: number) => {
    try {
      await apiClient.addToCart(medicineId, 1); // quantity 1
      toast.success('Added to cart!');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  // Fetch medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      const res = await apiClient.getMedicines();
      if (Array.isArray(res)) setMedicines(res);
      else console.error('Unexpected API response:', res);
      setLoading(false);
    };
    fetchMedicines();
  }, []);

  const filtered = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.generic_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-center mb-4">Find Your Medicine</h2>

      <Form.Control
        placeholder="Search by medicine or generic name..."
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <Spinner animation="border" className="d-block mx-auto" />}

      <Row>
        {filtered.map((m) => (
          <Col md={4} key={m.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{m.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{m.generic_name}</Card.Subtitle>
                <Card.Text>
                  <b>Company:</b> {m.company} <br />
                  <b>Category:</b> {m.category} <br />
                  <b>Price:</b> {m.price} BDT <br />
                  <b>Stock:</b> {m.stock}
                </Card.Text>
                <button
                  className="btn btn-primary mt-2"
                  disabled={m.stock === 0}
                  onClick={() => handleAddToCart(m.id)}
                >
                  {m.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {!loading && filtered.length === 0 && (
        <p className="text-center text-muted">No medicines found</p>
      )}
    </div>
  );
}