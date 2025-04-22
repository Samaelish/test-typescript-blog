import { PostType } from '../types/post'

// Базовый URL JSONPlaceholder API
const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const getPosts = async (): Promise<PostType[]> => {
  const response = await fetch(`${BASE_URL}/posts?_limit=5`)

  // Проверка на ошибки HTTP (статусы 4xx/5xx)
  if (!response.ok) {
    throw new Error(`Ошибка загрузки постов. Код: ${response.status}`)
  }

  return await response.json()
}

export const searchPosts = async (query: string): Promise<PostType[]> => {
  // Кодируем поисковый запрос для безопасной передачи в URL
  const encodedQuery = encodeURIComponent(query)

  const response = await fetch(`${BASE_URL}/posts?q=${encodedQuery}`)

  // Обработка ошибок сети и HTTP
  if (!response.ok) {
    throw new Error(`Ошибка поиска. Код: ${response.status}`)
  }

  return await response.json()
}
