import { useQuery } from '@tanstack/react-query'
import { use } from 'react'
import { AuthContext } from '../context/AuthContext'

const useBids = () => {
  const {user} = use(AuthContext)

  return useQuery({
    queryKey: ["bids", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/bids?email=${user?.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      return res.json()
    }
  })
}

export default useBids