import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { AssignTempleAdminForm } from '../../types/assignTempleAdmin';
import { CreateTempleForm } from '../../types/createTemple';

interface TempleUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  temple_id: number;
  status: number; // ✅ REQUIRED
  created_at: string;
}

const AssignTempleAdmin = () => {
  const [form, setForm] = useState<AssignTempleAdminForm>({
    name: '',
    email: '',
    phone: '',
    password: '',
    temple_id: 0,
  });

  const [temples, setTemples] = useState<CreateTempleForm[]>([]);
  const [users, setUsers] = useState<TempleUser[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchTemples();
    fetchTempleUsers();
  }, []);

  // ---------------- FETCH ----------------

  const fetchTemples = async () => {
    const res = await api.get('/super/temple');
    setTemples(res.data);
  };

  const fetchTempleUsers = async () => {
    const res = await api.get('/super/temple-users');
    setUsers(res.data);
  };

  // ---------------- FORM ----------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      temple_id: name === 'temple_id' ? Number(value) : prev.temple_id,
      ...(name !== 'temple_id' ? { [name]: value } : {}),
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: '',
      email: '',
      phone: '',
      password: '',
      temple_id: 0,
    });
  };

  // ---------------- SUBMIT ----------------

  const submit = async () => {
    try {
      if (editingId) {
        await api.put(`/super/temple-admin/${editingId}`, form);
        alert('Temple Admin updated');
      } else {
        await api.post('/super/assign-temple-admin', form);
        alert('Temple Admin assigned');
      }

      resetForm();
      fetchTempleUsers();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  // ---------------- ACTIONS ----------------

  const editUser = (u: TempleUser) => {
    setEditingId(u.id);
    setForm({
      name: u.name,
      email: u.email,
      phone: u.phone,
      password: '',
      temple_id: u.temple_id,
    });
  };

  const deleteUser = async (id: number) => {
    if (!window.confirm('Delete this admin?')) return;
    await api.delete(`/super/temple-admin/${id}`);
    fetchTempleUsers();
  };

  const toggleStatus = async (id: number) => {
    await api.patch(`/super/temple-admin-toggle/${id}`);
    fetchTempleUsers();
  };

  // ---------------- UI ----------------

  return (
    <>
      <h2>{editingId ? 'Edit Temple Admin' : 'Assign Temple Admin'}</h2>

      <form style={formStyles.form} onSubmit={e => e.preventDefault()}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled={!!editingId}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        {!editingId && (
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        )}

        <select
          name="temple_id"
          value={form.temple_id || ''}
          onChange={handleChange}
        >
          <option value="">Select Temple</option>
          {temples.map(t => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <button onClick={submit}>
          {editingId ? 'Update Admin' : 'Assign Admin'}
        </button>

        {editingId && (
          <button onClick={resetForm} type="button">
            Cancel
          </button>
        )}
      </form>

      <h2>All Temple Admins</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border={1} cellPadding={10} cellSpacing={0} style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Temple</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.temple_id}</td>
                <td>{u.status ? 'Active' : 'Inactive'}</td>
                <td>
                  <button onClick={() => editUser(u)}>Edit</button>
                  <button onClick={() => deleteUser(u.id)} style={{ marginLeft: 6 }}>
                    Delete
                  </button>
                  <button onClick={() => toggleStatus(u.id)} style={{ marginLeft: 6 }}>
                    {u.status ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
                <td>{new Date(u.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

// ---------------- STYLES ----------------

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    marginTop: '20px',
  },
};

const formStyles = {
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    maxWidth: '400px',
    marginBottom: '20px',
  },
};

export default AssignTempleAdmin;
