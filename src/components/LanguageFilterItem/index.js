// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, isActive, changeLanguageId} = props
  const {language, id} = languageDetails
  const buttonClassName = isActive ? 'active-language' : 'language'

  const changeLanguage = () => {
    changeLanguageId(id)
  }
  return (
    <li className="language-list-item">
      <button
        type="button"
        className={buttonClassName}
        onClick={changeLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
