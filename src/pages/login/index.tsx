import { useNavigate } from 'react-router-dom'
import { Form, message } from 'antd'
import styles from './styles.module.less'

const Login = () => {
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    const { username, password } = values
    if (username === 'yuhanbaobao' && password === '20220427') {
      navigate('../memorial')
    } else {
      message.error('用户名或密码错误！')
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.login_cad}>
        <Form
          name='basic'
          onFinish={onFinish}
          autoComplete='off'
          className={styles.form}
        >
          <Form.Item noStyle name='username'>
            <input className={styles.input} maxLength={15} />
          </Form.Item>

          <Form.Item noStyle name='password'>
            <input className={styles.input} maxLength={15} type='password' />
          </Form.Item>

          <Form.Item noStyle>
            <button className={styles.button} type='submit'>
              i am here 🐶
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
