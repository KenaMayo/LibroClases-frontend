import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DEMO_CREDENTIALS = [
  { role: 'Docente', email: 'profesor@colegio.cl' },
  { role: 'Estudiante', email: 'estudiante@colegio.cl' },
  { role: 'Administrador', email: 'admin@colegio.com' },
  { role: 'Apoderado', email: 'apoderado@colegio.cl' },
];

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {

  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');

    if (!email || !password) {

      setError('Por favor, completa todos los campos.');

      return;
    }

    setLoading(true);

    try {

      const response = await fetch(`${API_URL}/auth/login`, {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const text = await response.text();

      let data;

      try {

        data = JSON.parse(text);

      } catch {

        data = { message: text };
      }

      if (response.ok) {

        // TOKEN
        if (data.token) {

          localStorage.setItem(
            'token',
            data.token
          );
        }

        // USER
        if (data.user) {

          localStorage.setItem(
            'user',
            JSON.stringify(data.user)
          );
        }

        // AUTH CONTEXT
        if (login) {

          try {

            await login(email, password);

          } catch (err) {

            console.log(err);
          }
        }

        // REDIRECCION ADMIN
        if (email === 'admin@colegio.com') {

          navigate('/app/admin/panel');

        } else {

          navigate('/app/dashboard');
        }

      } else {

        setError(
          data.message ||
          data.error ||
          'Correo o contraseña incorrectos'
        );
      }

    } catch (err) {

      console.error(err);

      setError(
        'No se pudo conectar con el servidor'
      );

    } finally {

      setLoading(false);
    }
  };

  const fillDemo = (demoEmail) => {

    setEmail(demoEmail);

    setPassword('1234');

    setError('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f0f4f8',
        display: 'flex',
        flexDirection: 'column'
      }}
    >

      {/* NAVBAR */}
      <nav
        className="d-flex align-items-center justify-content-between px-4 py-0"
        style={{
          backgroundColor: '#002855',
          height: 56,
          flexShrink: 0
        }}
      >

        <div className="d-flex align-items-center gap-2 text-white">

          <i className="bi bi-book-half fs-5"></i>

          <span
            className="fw-semibold"
            style={{
              fontSize: '0.9rem',
              letterSpacing: '0.02em'
            }}
          >
            Colegio Bernardo O&apos;Higgins
          </span>
        </div>

        <a
          href="#"
          className="text-white-50 text-decoration-none small"
          style={{ fontSize: '0.8rem' }}
          onClick={(e) => e.preventDefault()}
        >
          <i className="bi bi-question-circle me-1"></i>

          Ayuda
        </a>
      </nav>

      {/* MAIN */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center px-3 py-5">

        <div
          style={{
            width: '100%',
            maxWidth: 440
          }}
        >

          {/* LOGO */}
          <div className="text-center mb-4">

            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
              style={{
                width: 72,
                height: 72,
                backgroundColor: '#002855'
              }}
            >

              <i
                className="bi bi-mortarboard-fill text-white"
                style={{ fontSize: '1.9rem' }}
              ></i>
            </div>

            <h1
              className="h5 fw-bold mb-1"
              style={{ color: '#002855' }}
            >
              Libro de Clases Digital
            </h1>

            <p
              className="text-muted mb-0"
              style={{ fontSize: '0.83rem' }}
            >
              Sistema de Gestión Académica
            </p>
          </div>

          {/* CARD LOGIN */}
          <div className="card border-0 shadow rounded-3">

            <div className="card-body p-4">

              <h2
                className="h6 fw-semibold mb-4"
                style={{ color: '#002855' }}
              >
                Iniciar sesión
              </h2>

              {error && (

                <div
                  className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3"
                  role="alert"
                  style={{ fontSize: '0.85rem' }}
                >

                  <i className="bi bi-exclamation-circle-fill flex-shrink-0"></i>

                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
              >

                {/* EMAIL */}
                <div className="mb-3">

                  <label
                    htmlFor="login-email"
                    className="form-label small fw-semibold mb-1"
                  >
                    Correo electrónico
                  </label>

                  <input
                    id="login-email"
                    type="email"
                    className="form-control"
                    placeholder="usuario@colegio.cl"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="email"
                    autoFocus
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-4">

                  <div className="d-flex justify-content-between align-items-center mb-1">

                    <label
                      htmlFor="login-password"
                      className="form-label small fw-semibold mb-0"
                    >
                      Contraseña
                    </label>

                    <a
                      href="#"
                      className="small text-decoration-none"
                      style={{
                        color: '#005eb8',
                        fontSize: '0.8rem'
                      }}
                      onClick={(e) =>
                        e.preventDefault()
                      }
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <div className="input-group">

                    <input
                      id="login-password"
                      type={
                        showPass
                          ? 'text'
                          : 'password'
                      }
                      className="form-control border-end-0"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      autoComplete="current-password"
                    />

                    <button
                      type="button"
                      className="btn btn-outline-secondary border-start-0"
                      onClick={() =>
                        setShowPass((p) => !p)
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
                  className="btn w-100 text-white fw-semibold"
                  style={{
                    backgroundColor: '#002855',
                    borderColor: '#002855'
                  }}
                  disabled={loading}
                >

                  {loading ? (

                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>

                      Ingresando...
                    </>

                  ) : (

                    'Ingresar'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* DEMO */}
          <div className="card border-0 bg-light mt-3">

            <div className="card-body p-3">

              <p className="small fw-semibold text-muted mb-2">

                <i className="bi bi-info-circle me-1"></i>

                Acceso de demostración

                <span className="fw-normal">
                  (contraseña:
                  <code>1234</code>)
                </span>
              </p>

              <div className="row g-2">

                {DEMO_CREDENTIALS.map((c) => (

                  <div
                    className="col-6"
                    key={c.role}
                  >

                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm w-100"
                      style={{
                        fontSize: '0.8rem'
                      }}
                      onClick={() =>
                        fillDemo(c.email)
                      }
                    >
                      {c.role}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div
            className="text-center mt-4"
            style={{ fontSize: '0.78rem' }}
          >

            <a
              href="#"
              className="text-muted text-decoration-none me-3"
              onClick={(e) =>
                e.preventDefault()
              }
            >
              Términos de uso
            </a>

            <a
              href="#"
              className="text-muted text-decoration-none me-3"
              onClick={(e) =>
                e.preventDefault()
              }
            >
              Política de privacidad
            </a>

            <a
              href="#"
              className="text-muted text-decoration-none"
              onClick={(e) =>
                e.preventDefault()
              }
            >
              Contacto
            </a>
          </div>

          <p
            className="text-center text-muted mt-2 mb-0"
            style={{ fontSize: '0.75rem' }}
          >
            © 2026 Colegio Bernardo O&apos;Higgins
          </p>
        </div>
      </main>
    </div>
  );
}