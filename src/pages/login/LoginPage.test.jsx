import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import LoginPage from './login.jsx'

// Mock navigate
const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

// Mock AuthContext
const mockLogin = vi.fn()

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}))

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza los campos y botón de login', () => {
    render(<LoginPage />)

    expect(
      screen.getByPlaceholderText(
        'usuario@colegio.cl'
      )
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText(
        '••••••••'
      )
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Ingresar',
      })
    ).toBeInTheDocument()
  })

  it('permite escribir en los inputs', async () => {
    const user = userEvent.setup()

    render(<LoginPage />)

    const email =
      screen.getByPlaceholderText(
        'usuario@colegio.cl'
      )

    const password =
      screen.getByPlaceholderText(
        '••••••••'
      )

    await user.type(
      email,
      'admin@colegio.com'
    )

    await user.type(
      password,
      '1234'
    )

    expect(email).toHaveValue(
      'admin@colegio.com'
    )

    expect(password).toHaveValue(
      '1234'
    )
  })

  it('llama a login al enviar el formulario', async () => {
    mockLogin.mockResolvedValue({
      success: true,
      user: { rol: 'ADMIN' },
    })

    const user = userEvent.setup()

    render(<LoginPage />)

    await user.type(
      screen.getByPlaceholderText(
        'usuario@colegio.cl'
      ),
      'admin@colegio.com'
    )

    await user.type(
      screen.getByPlaceholderText(
        '••••••••'
      ),
      '1234'
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Ingresar',
      })
    )

    expect(mockLogin).toHaveBeenCalledWith(
      'admin@colegio.com',
      '1234'
    )

    expect(mockNavigate).toHaveBeenCalledWith(
      '/app/admin/panel'
    )
  })

  it('muestra un error cuando el login falla', async () => {
    mockLogin.mockResolvedValue({
      success: false,
      error: 'Credenciales inválidas',
    })

    const user = userEvent.setup()

    render(<LoginPage />)

    await user.type(
      screen.getByPlaceholderText(
        'usuario@colegio.cl'
      ),
      'admin@colegio.com'
    )

    await user.type(
      screen.getByPlaceholderText(
        '••••••••'
      ),
      '1234'
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Ingresar',
      })
    )

    expect(
      screen.getByText(
        'Credenciales inválidas'
      )
    ).toBeInTheDocument()
  })
})