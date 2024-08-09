export function Notification({ notification }) {
    if (!notification) return null;

    const notificationStyle = (notification) => {
        return {
            color: notification.success ? 'green' : 'red',
            background: 'lightgrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            borderColor: notification.success ? 'green' : 'red',
        };
    };

    return (
        <p style={notificationStyle(notification)}>
            {notification.message}
        </p>
    );
}