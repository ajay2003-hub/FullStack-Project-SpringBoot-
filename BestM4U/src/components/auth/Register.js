import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../../api/axiosConfig';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if(password !== confirmPassword){
      setError('Passwords do not match');
      return;
    }
    try {
      await api.post('/api/v1/auth/register', { username, password });
      setSuccess('Registration successful — please login.');
      // navigate to login after short delay
      setTimeout(()=> navigate('/login'), 900);
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <div className="auth-logo">𝓑έ𝐒𝕥𝐌➃ย</div>
          <p>Create an account to keep your watchlist and reviews.</p>
          <div className="social-row">
            <button className="social-btn">Continue with Google</button>
            <button className="social-btn">Continue with GitHub</button>
          </div>
          <div className="divider">OR</div>
        </div>

        <div className="auth-right">
          <h3>Create account</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="regUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="regPassword" style={{display:'flex', alignItems:'center', gap:8}}>
              <div style={{flex:1}}>
                <Form.Label>Password</Form.Label>
                <Form.Control type={showPassword? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>
              <div style={{alignSelf:'end'}}>
                <button type="button" className="show-pass-btn" onClick={()=>setShowPassword(s=>!s)}>{showPassword? 'Hide' : 'Show'}</button>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="regPasswordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type={showPassword? 'text' : 'password'} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
            </Form.Group>

            {error && <div className="text-danger mb-2">{error}</div>}
            {success && <div className="text-success mb-2">{success}</div>}

            <div className="helper-row">
              <div className="form-text-muted">Already have an account? <Link to="/login">Login</Link></div>
              <Button type="submit" variant="primary">Register</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register;
