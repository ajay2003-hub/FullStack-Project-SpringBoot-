import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../../api/axiosConfig';
import './Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const extractToken = (data) => {
    if (!data) return null;
    return data.token || data.accessToken || data.jwt || data.authToken || null;
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post('/api/v1/auth/login', { username, password });
      const token = extractToken(res.data) || (res.headers && (res.headers.authorization || res.headers.Authorization));
      if (!token) {
        setError('Login succeeded but no token returned by server');
        return;
      }

      // token may include 'Bearer ' prefix
      const normalized = token.startsWith('Bearer ') ? token.substring(7) : token;
      localStorage.setItem('authToken', normalized);
      // save username for UI
      localStorage.setItem('authUsername', username);

      // redirect to home
      navigate('/');
      // optional: reload to update header state
      window.location.reload();
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-logo">𝓑έ𝐒𝕥𝐌➃ย</div>
          <p>Watch trailers, add reviews and build your watchlist.</p>
          <div className="social-row">
            <button className="social-btn">Sign in with Google</button>
            <button className="social-btn">Sign in with GitHub</button>
          </div>
          <div className="divider">OR</div>
        </div>

        <div className="auth-right">
          <h3>Welcome back</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword" style={{display:'flex', alignItems:'center', gap:8}}>
              <div style={{flex:1}}>
                <Form.Label>Password</Form.Label>
                <Form.Control type={showPassword? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>
              <div style={{alignSelf:'end'}}>
                <button type="button" className="show-pass-btn" onClick={()=>setShowPassword(s=>!s)}>{showPassword? 'Hide' : 'Show'}</button>
              </div>
            </Form.Group>

            {error && <div className="text-danger mb-2">{error}</div>}

            <div className="helper-row">
              <div className="form-text-muted"><Link to="/register">Need an account?</Link></div>
              <Button type="submit" variant="primary">Login</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;
