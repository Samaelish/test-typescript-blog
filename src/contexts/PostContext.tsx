import { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react'
import { PostType } from '../types/post'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export interface PostContextType {
  posts: PostType[]
  isLoading: boolean
  error: string | null
  reactions: Record<number, 'like' | 'dislike' | null>
  handleLike: (postId: number) => void
  handleDislike: (postId: number) => void
  // поиск не реализован, потому что jsonplaceholder не поддерживает поиск по title
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
  const [error, setError] = useState<string | null>(null)
  const [reactions, setReactions] = useState<Record<number, 'like' | 'dislike' | null>>({})
  const [searchQuery, setSearchQuery] = useState('')

  const handleLike = useCallback((postId: number) => {
    setReactions(prev => ({
      ...prev,
      [postId]: prev[postId] === 'like' ? null : 'like',
    }))
  }, [])

  const handleDislike = useCallback((postId: number) => {
    setReactions(prev => ({
      ...prev,
      [postId]: prev[postId] === 'dislike' ? null : 'dislike',
    }))
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // в jsonplaceholder нет поиска по title, но с другим апи могу попробовать это реализовать
        const url = new URL(`${BASE_URL}/posts`)
        url.searchParams.append('_limit', '5')
        if (searchQuery) {
          url.searchParams.append('q', searchQuery)
        }

        const response = await fetch(url.toString(), { signal })

        if (!response.ok) {
          throw new Error(`Ошибка при загрузке постов. Статус: ${response.status}`)
        }

        const data = (await response.json()) as PostType[]
        setPosts(data)
      } catch (err) {
        if (signal.aborted) return
        setError(err instanceof Error ? err.message : 'Не получилось загрузить посты')
      } finally {
        if (!signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchPosts()

    return () => controller.abort()
  }, [searchQuery])

  const value: PostContextType = {
    posts,
    isLoading,
    error,
    reactions,
    handleLike,
    handleDislike,
    // поиск не реализован, потому что jsonplaceholder не поддерживает поиск по title
    searchQuery,
    setSearchQuery,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
