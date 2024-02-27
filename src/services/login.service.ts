// @scripts
import User from '../models/user.model'

class LoginService {
  async findOne (username: string) {
    const user = await User.findOne({ username })

    return user
  }
}

export default LoginService
