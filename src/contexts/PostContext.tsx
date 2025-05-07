// PostContext.tsx
import { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react'
import { PostType } from '../types/post'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export interface PostContextType {
  posts: PostType[]
  isLoading: boolean
  error: string | null
  reactions: { [key: number]: 'like' | 'dislike' | null }
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
  const [reactions, setReactions] = useState<{ [key: number]: 'like' | 'dislike' | null }>({})

  const updateReaction = (postId: number, newReaction: 'like' | 'dislike' | null) => {
    setReactions(prev => ({ ...prev, [postId]: newReaction }))
  }

  const handleLike = useCallback(
    (postId: number) => {
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            const currentReaction = reactions[postId]

            let likes = post.likes
            let dislikes = post.dislikes

            if (currentReaction === 'like') {
              likes -= 1
            } else {
              if (currentReaction === 'dislike') dislikes -= 1
              likes += 1
            }

            return { ...post, likes, dislikes }
          }
          return post
        }),
      )
      updateReaction(postId, reactions[postId] === 'like' ? null : 'like')
    },
    [reactions],
  )

  const handleDislike = useCallback(
    (postId: number) => {
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            const currentReaction = reactions[postId]

            let likes = post.likes
            let dislikes = post.dislikes

            if (currentReaction === 'dislike') {
              dislikes -= 1
            } else {
              if (currentReaction === 'like') likes -= 1
              dislikes += 1
            }

            return { ...post, likes, dislikes }
          }
          return post
        }),
      )
      updateReaction(postId, reactions[postId] === 'dislike' ? null : 'dislike')
    },
    [reactions],
  )

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
        // Добавляем генерацию случайных значений
        const initializedData = data.map(post => ({
          ...post,
          likes: Math.floor(Math.random() * 51), // Генерация от 0 до 50
          dislikes: Math.floor(Math.random() * 51),
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
    reactions,
    handleLike,
    handleDislike,
    searchQuery,
    setSearchQuery,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
