import { createContext, useReducer, useCallback } from 'react'

const notificationReducer = (state = "", action) => {
    console.log({
        from: "notificationReducer",
        state,
        action
    });
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.payload;
        case "CLEAR_NOTIFICATION":
            return "";
        default:
            return state;
    }
};

const NotificationContext = createContext();

// eslint-disable-next-line react/prop-types
const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, "");

    const pushNotification = useCallback((data) => {
        console.log("pushing notification", data);
        dispatch({ type: "SET_NOTIFICATION", payload: data });
        setTimeout(() => {
            dispatch({ type: "CLEAR_NOTIFICATION" });
        }, 2500);
    }, []);

    return (
        <NotificationContext.Provider value={{ notification, pushNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}

export { NotificationProvider, NotificationContext };
