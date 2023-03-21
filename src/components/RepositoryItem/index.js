// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, imageUrl, starsCount, forksCount, issuesCount} = repoDetails
  return (
    <li className="each-list">
      <img src={imageUrl} alt={name} className="image" />
      <h1 className="name">{name}</h1>
      <div className="star-cont">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p className="text">{starsCount}</p>
      </div>
      <div className="fork-cont">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="text">{forksCount}</p>
      </div>
      <div className="issue-cont">
        <img
          className="icon"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p className="text">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
