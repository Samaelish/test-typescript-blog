import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePostContext } from '../contexts/PostContext'
import '../css/PostDetail.css'

const PostDetail: React.FC = () => {
  const { posts, isLoading, error, reactions, handleLike, handleDislike } = usePostContext()
  const { id } = useParams<{ id: string }>()

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>

  const post = posts.find(post => post.id === Number(id))

  if (!post) return <div>Пост не найден</div>

  const reaction = reactions[post.id] || null

  return (
    <div className='container'>
      <header className='current'>
        <Link className='current__return-link' to='/'>
          <svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <g clipPath='url(#clip0_1_3069)'>
              <path d='M21 11H6.83L10.41 7.41L9 6L3 12L9 18L10.41 16.59L6.83 13H21V11Z' />
            </g>
            <defs>
              <clipPath id='clip0_1_3069'>
                <rect width='24' height='24' fill='white' />
              </clipPath>
            </defs>
          </svg>
          <span>Вернуться к статьям</span>
        </Link>
        <div className='current__feedback'>
          <div className='current__likes'>
            <svg
              width='27'
              height='24'
              viewBox='0 0 32 33'
              xmlns='http://www.w3.org/2000/svg'
              onClick={() => handleLike(post.id)}
              role='button'
              tabIndex={0}
            >
              <path
                d='M2.66667 27.1667H5.33333C6.06667 27.1667 6.66667 26.5667 6.66667 25.8334V13.8334C6.66667 13.1 6.06667 12.5 5.33333 12.5H2.66667V27.1667ZM29.1067 17.6734C29.2533 17.34 29.3333 16.98 29.3333 16.6067V15.1667C29.3333 13.7 28.1333 12.5 26.6667 12.5H19.3333L20.56 6.30002C20.6267 6.00669 20.5867 5.68669 20.4533 5.42002C20.1467 4.82002 19.76 4.27335 19.28 3.79335L18.6667 3.16669L10.12 11.7134C9.61333 12.22 9.33333 12.9 9.33333 13.6067V24.06C9.33333 25.7667 10.7333 27.1667 12.4533 27.1667H23.2667C24.2 27.1667 25.08 26.6734 25.56 25.8734L29.1067 17.6734Z'
                fill={reaction === 'like' ? '#219653' : '#888'}
              />
            </svg>
            <span>254</span>
          </div>
          <div className='current__dislikes'>
            <svg
              width='27'
              height='24'
              viewBox='0 0 32 33'
              xmlns='http://www.w3.org/2000/svg'
              onClick={() => handleDislike(post.id)}
              role='button'
              tabIndex={0}
            >
              <path
                d='M2.66666 5.83331H5.33333C6.06666 5.83331 6.66666 6.43331 6.66666 7.16665V19.1666C6.66666 19.9 6.06666 20.5 5.33333 20.5H2.66666V5.83331ZM29.1067 15.3266C29.2533 15.66 29.3333 16.02 29.3333 16.3933V17.8333C29.3333 19.3 28.1333 20.5 26.6667 20.5H19.3333L20.56 26.7C20.6267 26.9933 20.5867 27.3133 20.4533 27.58C20.1467 28.18 19.76 28.7266 19.28 29.2066L18.6667 29.8333L10.12 21.2866C9.61333 20.78 9.33333 20.1 9.33333 19.3933V8.95331C9.33333 7.23331 10.7333 5.83331 12.4533 5.83331H23.2533C24.2 5.83331 25.0667 6.32665 25.5467 7.12665L29.1067 15.3266Z'
                fill={reaction === 'dislike' ? '#eb5757' : '#888'}
              />
            </svg>
            <span>12</span>
          </div>
        </div>
      </header>
      <h1 className='current__title'>{post.title}</h1>
      <div className='current__content'>
        <img className='current__post-image' src='https://placehold.co/1920x1080' alt={post.title} />
        <p className='current__post-description'>{post.body}</p>
      </div>
    </div>
  )
}

export default PostDetail
