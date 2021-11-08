import {useState, useCallback} from 'react'

export const useAuth = () => {
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const login = () => {
    
  }

  const logout = () => {
    
  }

return {login,logout}
}