import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAppDispatch } from '../redux/store'
import { login } from '../redux/authSlice'
import authService from '../services/AuthService'
import { CredentialsModel } from '../models/CredentialsModel'

export default function Login() {
  const { register, handleSubmit } = useForm<CredentialsModel>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  async function submit(credentials: CredentialsModel) {
    try {
      const token = await authService.login(credentials)
      dispatch(login(token))

      // You could parse the token here, or simply navigate to / and let App root decide.
      navigate('/', { replace: true })
    } catch (err: any) {
      alert(err.response?.data || 'Login failed')
    }
  }

  return (
    <div>
      <div className='col-sm-6 col-md-5 col-lg-4 rounded-4 shadow p-4 mt-4 mb-0 text-start page-container-green mx-auto'>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className='mt-3' controlId='user-name'>
            <Form.Label>User Name</Form.Label>
            <Form.Control type='text' {...register('username', { required: true })} className='py-2 fs-3'></Form.Control>
          </Form.Group>
          <Form.Group className='my-4' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' {...register('password', { required: true })} className='py-2 fs-3'></Form.Control>
          </Form.Group>

          <div className='d-grid my-3'><Button type="submit" variant='primary block py-3 my-2'><h3>Sign in</h3></Button></div>
        </Form>
        <p className='text-center lh-1'>Don't have an account?</p>
        <div className='d-grid mb-4'><NavLink to="/register" className="btn btn-success block py-3 my-2"><h3>Register</h3></NavLink></div>
      </div>
    </div>
  )
}
