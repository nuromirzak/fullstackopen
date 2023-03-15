import '../index.css'
import PropTypes from 'prop-types'

const Notification = (props) => {
  const { message, cssClass } = props

  if (!message) {
    return null
  }

  return <div className={'notification ' + cssClass}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string,
}

export default Notification
