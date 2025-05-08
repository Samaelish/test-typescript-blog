// Интерфейс для описания структуры поста
export interface PostType {
  id: number // Уникальный идентификатор поста
  title: string // Заголовок поста
  body: string // Основное содержимое поста
  userId: number // ID автора поста
  likes: number // Количество лайков
  dislikes: number // Количество дизлайков
}

export interface PostContextType {
  posts: PostType[] // Массив постов
  isLoading: boolean // Флаг загрузки данных
  error: string | null // Ошибка при загрузке данных
  reactions: { [key: number]: 'like' | 'dislike' | null } // Объект реакций
  handleLike: (postId: number) => void // Функция для лайка
  handleDislike: (postId: number) => void // Функция для дизлайка
  searchQuery: string // Строка поиска
  setSearchQuery: (query: string) => void // Функция для изменения строки поиска
}
