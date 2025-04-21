// Базовый URL JSONPlaceholder API
const BASE_URL = 'https://jsonplaceholder.typicode.com'

// Интерфейс для описания структуры поста
export interface Post {
  id: number // Уникальный идентификатор поста
  title: string // Заголовок поста
  body: string // Основное содержимое поста
  userId: number // ID автора поста
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`)

  // Проверка на ошибки HTTP (статусы 4xx/5xx)
  if (!response.ok) {
    throw new Error(`Ошибка загрузки постов. Код: ${response.status}`)
  }

  return await response.json()
}

export const searchPosts = async (query: string): Promise<Post[]> => {
  // Кодируем поисковый запрос для безопасной передачи в URL
  const encodedQuery = encodeURIComponent(query)

  const response = await fetch(`${BASE_URL}/posts?q=${encodedQuery}`)

  // Обработка ошибок сети и HTTP
  if (!response.ok) {
    throw new Error(`Ошибка поиска. Код: ${response.status}`)
  }

  return await response.json()
}
