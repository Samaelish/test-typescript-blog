import { ReactElement } from 'react'
import { PostType } from '../types/post'
import { Link } from 'react-router-dom'
import { usePostContext } from '../contexts/PostContext'

interface Props {
  post: PostType
}

const Post = ({ post }: Props): ReactElement => {
  const { handleLike, handleDislike } = usePostContext()

  return (
    <article className='posts__card'>
      <img className='posts__card-image' src='https://placehold.co/1280x720' alt={post.title} />
      <div className='posts__post-content'>
        <h2 className='posts__post-title'>{post.title}</h2>
        <div className='posts__footer'>
          <div className='posts__feedback'>
            <div className='posts__likes'>
              <svg
                width='27'
                height='24'
                viewBox='0 0 32 33'
                xmlns='http://www.w3.org/2000/svg'
                onClick={() => handleLike(post.id)}
              >
                <path
                  d='M2.66667 27.1667H5.33333C6.06667 27.1667 6.66667 26.5667 6.66667 25.8334V13.8334C6.66667 13.1 6.06667 12.5 5.33333 12.5H2.66667V27.1667ZM29.1067 17.6734C29.2533 17.34 29.3333 16.98 29.3333 16.6067V15.1667C29.3333 13.7 28.1333 12.5 26.6667 12.5H19.3333L20.56 6.30002C20.6267 6.00669 20.5867 5.68669 20.4533 5.42002C20.1467 4.82002 19.76 4.27335 19.28 3.79335L18.6667 3.16669L10.12 11.7134C9.61333 12.22 9.33333 12.9 9.33333 13.6067V24.06C9.33333 25.7667 10.7333 27.1667 12.4533 27.1667H23.2667C24.2 27.1667 25.08 26.6734 25.56 25.8734L29.1067 17.6734Z'
                  fill={post.likes > 0 ? '#219653' : '#888'}
                />
              </svg>

              <span>{post.likes}</span>
            </div>
            <div className='posts__dislikes'>
              <svg
                width='27'
                height='24'
                viewBox='0 0 32 33'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                onClick={() => handleDislike(post.id)}
              >
                <path
                  d='M2.66666 5.83331H5.33333C6.06666 5.83331 6.66666 6.43331 6.66666 7.16665V19.1666C6.66666 19.9 6.06666 20.5 5.33333 20.5H2.66666V5.83331ZM29.1067 15.3266C29.2533 15.66 29.3333 16.02 29.3333 16.3933V17.8333C29.3333 19.3 28.1333 20.5 26.6667 20.5H19.3333L20.56 26.7C20.6267 26.9933 20.5867 27.3133 20.4533 27.58C20.1467 28.18 19.76 28.7266 19.28 29.2066L18.6667 29.8333L10.12 21.2866C9.61333 20.78 9.33333 20.1 9.33333 19.3933V8.95331C9.33333 7.23331 10.7333 5.83331 12.4533 5.83331H23.2533C24.2 5.83331 25.0667 6.32665 25.5467 7.12665L29.1067 15.3266Z'
                  fill={post.dislikes > 0 ? '#eb5757' : '#888'}
                />
              </svg>

              <span>{post.dislikes}</span>
            </div>
          </div>
          <Link to={`/post/${post.id}`} className='posts__readmore-link'>
            Читать далее
          </Link>
        </div>
      </div>
    </article>
  )
}

export default Post
