import { Button, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAppDispatch } from '../redux/store'
import { login } from '../redux/authSlice'
import authService from '../services/AuthService'
import { UserModel } from '../models/UserModel'

export default function Registration() {
  const { register, handleSubmit } = useForm<UserModel>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  async function submit(user: UserModel) {
    try {
      const token = await authService.register(user)
      // The backend currently registers AND returns a token. We auto-login:
      dispatch(login(token))
      navigate('/', { replace: true })
    } catch (err: any) {
      alert(err.response?.data || 'Registration failed')
    }
  }

  return (
    <div>
      <div className='col-sm-6 col-md-5 col-lg-4 rounded-4 shadow px-4 py-1 m-4 text-start page-container-green mx-auto'>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group as={Row} className='mt-4' controlId='first-name'>
            <Form.Label column md={4}>First Name</Form.Label>
            <Col>
              <Form.Control type='text' {...register('firstName', { required: true, minLength: 2 })} className='py-2 fs-3'></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mt-4' controlId='last-name'>
            <Form.Label column md={4}>Last Name</Form.Label>
            <Col>
              <Form.Control type='text' {...register('lastName', { required: true, minLength: 2 })} className='py-2 fs-3'></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mt-4' controlId='user-name'>
            <Form.Label column md={4}>User Name</Form.Label>
            <Col>
              <Form.Control type='text' {...register('username', { required: true, minLength: 4 })} className='py-2 fs-3'></Form.Control>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mt-4 mb-3' controlId='password'>
            <Form.Label column md={4}>Password</Form.Label>
            <Col>
              <Form.Control type='password' {...register('password', { required: true, minLength: 4 })} className='py-2 fs-3'></Form.Control>
            </Col>
          </Form.Group>

          <div className='d-grid my-3'><Button type="submit" variant='primary block py-3 my-2'><h3>Continue</h3></Button></div>
        </Form>
        <p className='text-center lh-1'>Already have an account?</p>
        <div className='d-grid mb-3'><NavLink to="/login" className="btn btn-success block py-3 my-2"><h3>Login</h3></NavLink></div>
      </div>
    </div>
  )
}
