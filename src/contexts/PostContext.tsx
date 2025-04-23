import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { PostType } from '../types/post'

// Базовый URL JSONPlaceholder API, для удобства можно поменять потом на другой юрл
const BASE_URL = 'https://jsonplaceholder.typicode.com'

export interface PostContextType {
  posts: PostType[]
  isLoading: boolean
  error: string | null
  reactions: Record<number, 'like' | 'dislike' | null>
  handleLike: (postId: number) => void
  handleDislike: (postId: number) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('Контекстный хук должен быть в провайдере')
  }
  return context
}

interface PostProviderProps {
  children: ReactNode
}

export const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  // лайк-дизлайк состояние
  const [reactions, setReactions] = useState<Record<number, 'like' | 'dislike' | null>>({})
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Юрл для проверки поиск
        // Вручную прописал лимит в 5, потому что так в макете, но это просто для примера
        const url = `${BASE_URL}/posts?${searchQuery ? `q=${encodeURIComponent(searchQuery)}&` : ''}_limit=5`
        const response = await fetch(url)

        if (!response.ok) throw new Error(`Ошибка загрузки постов. Код: ${response.status}`)

        const data = await response.json()

        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [searchQuery])

  // Хендлеры на реакции
  const handleLike = (postId: number) => {
    setReactions(prev => ({
      ...prev,
      [postId]: prev[postId] === 'like' ? null : 'like',
    }))
  }

  const handleDislike = (postId: number) => {
    setReactions(prev => ({
      ...prev,
      [postId]: prev[postId] === 'dislike' ? null : 'dislike',
    }))
  }

  const value: PostContextType = {
    posts,
    isLoading,
    error,
    reactions,
    handleLike,
    handleDislike,
    searchQuery,
    setSearchQuery,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
