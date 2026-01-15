
import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../auth/AuthContext';
import { useNavigate ,Link} from 'react-router-dom';
import './Login.css';
const Login = () => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', {
        login: loginInput,
        password
      });

      // ✅ correct login call
      login({
        user: res.data.user,
        token: res.data.token
      });

      // ✅ ROLE BASED REDIRECT
      switch (res.data.user.role) {
        case 'SUPER_ADMIN':
          navigate('/super-admin');
          break;
        case 'TEMPLE_ADMIN':
          navigate('/temple-admin');
          break;
        case 'STAFF':
          navigate('/staff');
          break;
        default:
          navigate('/login');
      }

    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>

     <div className="login-wrapper">
    <form onSubmit={handleSubmit} className="login-card">
      <h2>Login</h2>

   

{error && <div className="error">{error}</div>}
      <input
        placeholder="Email or Phone"
        value={loginInput}
        onChange={e => setLoginInput(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        
      />
      

      <button type="submit">Login</button>
<Link to="/forgot" className=" subtitle forgot-link">Forgot Password?</Link>
      

    </form>
    </div>
    </>
   
  );
};

export default Login;
