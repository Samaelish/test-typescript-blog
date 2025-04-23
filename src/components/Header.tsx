import React from 'react'
import { usePostContext } from '../contexts/PostContext'
import '../css/Header.css'

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = usePostContext()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <header className='header'>
      <div className='container'>
        <h1 className='header__title'>Блог</h1>
        <p className='header__description'>
          1. На JSONPlaceholder нет фильтрации по названию (в требованиях серверный фильтр), могу сделать фильтрацию на
          клиенте просто через рендер тех постов, у которых совпадает title. <br />
          2. Рандомное число лайков <br />
          Остальной функционал по тз сохранён. SCSS, Tailwind не использовал. Redux не нужен, достаточно Context.
        </p>
        <div className='header__search-container'>
          <svg
            className='header__search-icon'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M17.31 15.9L20.71 19.29C20.8993 19.4778 21.0058 19.7334 21.0058 20C21.0058 20.2666 20.8993 20.5222 20.71 20.71C20.5222 20.8993 20.2666 21.0058 20 21.0058C19.7334 21.0058 19.4778 20.8993 19.29 20.71L15.9 17.31C14.5025 18.407 12.7767 19.0022 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11C19.0022 12.7767 18.407 14.5025 17.31 15.9ZM11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5Z'
              fill='#333333'
            />
          </svg>
          <input
            type='text'
            placeholder='Поиск по названию статьи'
            className='header__search'
            id='header__search'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
