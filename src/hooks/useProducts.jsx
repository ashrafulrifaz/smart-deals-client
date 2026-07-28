import { useQuery } from '@tanstack/react-query'

const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/products')
      return res.json()
    }
  })
}

export default useProducts