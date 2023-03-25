import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        text: "Initial notification (End-user should not see this)",
        toShow: false
    },
    reducers: {
        setNotification: (state, action) => {
            return {
                text: action.payload,
                toShow: true
            };
        },
        removeNotification: (state, action) => {
            return {
                ...state,
                toShow: false
            };
        }
    }
});

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;