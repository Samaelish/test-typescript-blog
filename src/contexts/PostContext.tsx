import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { PostType } from '../types/post'

export interface PostContextType {
  posts: PostType[]
  addToFavorites: (post: PostType) => void
  removeFromFavorites: (postId: number) => void
  isFavorite: (postId: number) => boolean
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export const usePostContext = () => {
  const context = useContext(PostContext)
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider')
  }
  return context
}

interface PostProviderProps {
  children: ReactNode
}

export const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<PostType[]>([])

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts')
    if (storedPosts) {
      try {
        const parsedPosts = JSON.parse(storedPosts) as PostType[]
        setPosts(parsedPosts)
      } catch (error) {
        console.error('Error parsing posts from localStorage:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  const addToFavorites = (post: PostType) => {
    setPosts(prev => [...prev, post])
  }

  const removeFromFavorites = (postId: number) => {
    setPosts(prev => prev.filter(post => post.id !== postId))
  }

  const isFavorite = (postId: number) => {
    return posts.some(post => post.id === postId)
  }

  const value: PostContextType = {
    posts,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
