import { useQuery } from '@tanstack/react-query'

const useBids = () => {
  return useQuery({
    queryKey: ['bids'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/bids')
      return res.json()
    }
  })
}

export default useBids