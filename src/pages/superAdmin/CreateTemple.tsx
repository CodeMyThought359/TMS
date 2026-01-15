
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { CreateTempleForm } from '../../types/createTemple';

type Temple = CreateTempleForm & { id: number };

const CreateTemple = () => {
  const [form, setForm] = useState<CreateTempleForm>({
    name: '',
    city: '',
    state: '',
    address: '',
    pincode: 0,
    is_active: true
  });

  const [temples, setTemples] = useState<Temple[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      pincode: name === 'pincode' ? Number(value) : prev.pincode,
      ...(name !== 'pincode' ? { [name]: value } : {}),
    }));
  };

  // Fetch temples
  const fetchTemples = async () => {
    const res = await api.get('/super/temple');
    setTemples(res.data);
  };

  useEffect(() => {
    fetchTemples();
  }, []);

  // CREATE or UPDATE
  const submit = async () => {
    try {
      if (editingId) {
        await api.put(`/super/temple/${editingId}`, form);
        alert('Temple updated successfully');
      } else {
        await api.post('/super/temple', form);
        alert('Temple created successfully');
      }

      resetForm();
      fetchTemples();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  // EDIT
  const editTemple = (temple: Temple) => {
    setEditingId(temple.id);
    setForm({
      name: temple.name,
      city: temple.city,
      state: temple.state,
      address: temple.address,
      pincode: temple.pincode,
      is_active: temple.is_active,
    });
  };

  // DELETE
  const deleteTemple = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this temple?')) return;

    await api.delete(`/super/temple/${id}`);
    fetchTemples();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: '',
      city: '',
      state: '',
      address: '',
      pincode: 0, 
      is_active: true,
    });
  };
const InActiveTemple = async (id: number) => {
  if (!window.confirm('Change temple status?')) return;

  await api.patch(`/super/temple-toggle/${id}`);
  fetchTemples(); // refresh list
};

  return (
    <>
      <h2>{editingId ? 'Edit Temple' : 'Create Temple'}</h2>

      <input
        name="name"
        placeholder="Temple Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
      />
      <input
        name="state"
        placeholder="State"
        value={form.state}
        onChange={handleChange}
      />
      <textarea
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />
      <input
        name="pincode"
        placeholder="Pincode"
        value={form.pincode || ''}
        onChange={handleChange}
      />

      <button onClick={submit}>
        {editingId ? 'Update Temple' : 'Create Temple'}
      </button>

      {editingId && (
        <button onClick={resetForm} style={{ marginLeft: 10 }}>
          Cancel
        </button>
      )}

      <h2>Temple List</h2>

      {temples.length === 0 ? (
        <p>No temples found.</p>
      ) : (
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>State</th>
              <th>Status</th>

              <th>Address</th>
              <th>Pincode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {temples.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.city}</td>
                <td>{t.state}</td>
                <td>{t.is_active ? 'Active' : 'Inactive'}</td>

                <td>{t.address}</td>
                <td>{t.pincode}</td>
                <td>
                  <button onClick={() => editTemple(t)}>Edit</button>
                  <button
                    onClick={() => deleteTemple(t.id)}
                    style={{ marginLeft: 8 }}
                  >
                    Delete
                  </button>
                  <button
                  onClick={() => InActiveTemple(t.id)}
                  style={{ marginLeft: 8 }}
                >
                  {t.is_active ? 'Deactivate' : 'Activate'}
                </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CreateTemple;
