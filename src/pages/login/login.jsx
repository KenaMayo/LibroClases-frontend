import './login.css';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

const DEMO_CREDENTIALS = [
  {
    role: 'Docente',
    email: 'profesor@colegio.cl'
  },
  {
    role: 'Estudiante',
    email: 'estudiante@colegio.cl'
  },
  {
    role: 'Administrador',
    email: 'admin@colegio.com'
  },
  {
    role: 'Apoderado',
    email: 'apoderado@colegio.cl'
  },
];

export default function LoginPage() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');

    setLoading(true);

    try {

      const result = await login(
        email,
        password
      );

      if (!result.success) {

        setError(result.error);

        return;
      }

      // ADMIN
      if (email === 'admin@colegio.com') {

        navigate('/app/admin/panel');

      } else {

        navigate('/app/dashboard');
      }

    } catch (err) {

      console.error(err);

      setError(
        'Error al iniciar sesión'
      );

    } finally {

      setLoading(false);
    }
  };

  const fillDemo = (demoEmail) => {

    setEmail(demoEmail);

    setPassword('1234');
  };

  return (

    <div className="login-page">

      {/* NAVBAR */}
      <nav className="login-navbar">

        <div className="login-navbar-left">

          <i className="bi bi-book-half"></i>

          <span>
            Colegio Bernardo O'Higgins
          </span>
        </div>

        <a href="#">
          <i className="bi bi-question-circle"></i>

          Ayuda
        </a>
      </nav>

      {/* CONTENIDO */}
      <main className="login-main">

        <div className="login-container">

          {/* LOGO */}
          <div className="login-logo">

            <div className="login-logo-circle">

              <i className="bi bi-mortarboard-fill"></i>
            </div>

            <h1>
              Libro de Clases Digital
            </h1>

            <p>
              Sistema de Gestión Académica
            </p>
          </div>

          {/* CARD LOGIN */}
          <div className="login-card">

            <div className="login-card-body">

              <h2>
                Iniciar sesión
              </h2>

              {error && (

                <div className="login-error">

                  <i className="bi bi-exclamation-circle-fill"></i>

                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* EMAIL */}
                <div className="login-group">

                  <label>
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    placeholder="usuario@colegio.cl"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>

                {/* PASSWORD */}
                <div className="login-group">

                  <div className="login-password-header">

                    <label>
                      Contraseña
                    </label>

                    <a href="#">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <div className="login-password-box">

                    <input
                      type={
                        showPass
                          ? 'text'
                          : 'password'
                      }
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPass(!showPass)
                      }
                    >

                      <i
                        className={`bi ${
                          showPass
                            ? 'bi-eye-slash'
                            : 'bi-eye'
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                {/* BOTON */}
                <button
                  type="submit"
                  className="login-button"
                  disabled={loading}
                >

                  {loading
                    ? 'Ingresando...'
                    : 'Ingresar'}
                </button>
              </form>
            </div>
          </div>

          {/* DEMO */}
          <div className="demo-card">

            <div className="demo-card-body">

              <p>

                <i className="bi bi-info-circle"></i>

                Acceso de demostración

                <span>(contraseña: 1234)</span>
              </p>

              <div className="demo-grid">

                {DEMO_CREDENTIALS.map((c) => (

                  <button
                    key={c.role}
                    onClick={() =>
                      fillDemo(c.email)
                    }
                  >
                    {c.role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="login-footer">

            <div className="login-footer-links">

              <a href="#">
                Términos de uso
              </a>

              <a href="#">
                Política de privacidad
              </a>

              <a href="#">
                Contacto
              </a>
            </div>

            <p>
              © 2026 Colegio Bernardo O'Higgins
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}