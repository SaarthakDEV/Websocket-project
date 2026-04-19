
import { useSelector } from 'react-redux'
import Friends from '../Friends'
import Login from '../Login'

const Lower = () => {
    const isLoggedIn: boolean = useSelector((state: any) => state.auth.isLoggedIn)
  return isLoggedIn ? <Friends /> : <Login />
}

export default Lower