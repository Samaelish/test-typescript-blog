import { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react'
import { PostType } from '../types/post'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export interface PostContextType {
  posts: PostType[]
  isLoading: boolean
  error: string | null
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
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLike = useCallback((postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          // Если уже есть лайк - убираем
          if (post.likes > 0) {
            return { ...post, likes: post.likes - 1 }
          }
          // Если есть дизлайк - убираем его и добавляем лайк
          return {
            ...post,
            likes: post.likes + 1,
            dislikes: post.dislikes > 0 ? post.dislikes - 1 : 0,
          }
        }
        return post
      }),
    )
  }, [])

  const handleDislike = useCallback((postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          // Если уже есть дизлайк - убираем
          if (post.dislikes > 0) {
            return { ...post, dislikes: post.dislikes - 1 }
          }
          // Если есть лайк - убираем его и добавляем дизлайк
          return {
            ...post,
            dislikes: post.dislikes + 1,
            likes: post.likes > 0 ? post.likes - 1 : 0,
          }
        }
        return post
      }),
    )
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)

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
        // Инициализируем счётчики если их нет в ответе API
        const initializedData = data.map(post => ({
          ...post,
          likes: post.likes || 0,
          dislikes: post.dislikes || 0,
        }))
        setPosts(initializedData)
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
    handleLike,
    handleDislike,
    searchQuery,
    setSearchQuery,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
