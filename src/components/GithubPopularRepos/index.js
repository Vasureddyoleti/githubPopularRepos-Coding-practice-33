/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConsts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    languageItems: [],
    apiStatus: apiStatusConsts.initial,
  }

  componentDidMount() {
    this.getLanguageItems()
  }

  changeLanguageId = id => {
    this.setState({activeLanguageId: `${id}`}, this.getLanguageItems)
  }

  getLanguageItems = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiStatus: apiStatusConsts.inProgress})

    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`,
    )
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        name: eachRepo.name,
        imageUrl: eachRepo.avatar_url,
        starsCount: eachRepo.stars_count,
        forksCount: eachRepo.forks_count,
        issuesCount: eachRepo.issues_count,
      }))
      this.setState({
        languageItems: updatedData,
        apiStatus: apiStatusConsts.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConsts.failure})
    }
  }

  getLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  getFailureView = () => (
    <div className="failure-cont">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-message">Something Went Wrong</h1>
    </div>
  )

  getSuccessView = () => {
    const {languageItems} = this.state

    return (
      <ul className="repo-cont">
        {languageItems.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repoDetails={eachRepo} />
        ))}
      </ul>
    )
  }

  renderRepos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConsts.success:
        return this.getSuccessView()
      case apiStatusConsts.failure:
        return this.getFailureView()
      case apiStatusConsts.inProgress:
        return this.getLoadingView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="main-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="unorder-list">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              languageDetails={eachItem}
              isActive={activeLanguageId === eachItem.id}
              changeLanguageId={this.changeLanguageId}
            />
          ))}
        </ul>
        {this.renderRepos()}
      </div>
    )
  }
}

export default GithubPopularRepos
