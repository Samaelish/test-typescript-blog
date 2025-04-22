// Интерфейс для описания структуры поста
export interface PostType {
  id: number // Уникальный идентификатор поста
  title: string // Заголовок поста
  body: string // Основное содержимое поста
  userId: number // ID автора поста
}
