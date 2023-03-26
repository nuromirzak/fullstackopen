import { createContext, useReducer } from 'react'

const initialState = {
    message: null,
    toShow: false
}

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return { ...state, message: action.message, toShow: true }
        case 'HIDE':
            return { ...state, toShow: false }
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState)

    return (
        <NotificationContext.Provider value={[ state, dispatch ]}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext