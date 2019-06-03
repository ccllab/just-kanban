export interface MessageState {
    message: string
}

export const types =  {
    // getters
    MESSAGES: "message",

    // action
    SHOW_MESSAGE: 'socket_notificationMessage',

    // mutations
    SET_MESSAGE: 'SOCKET_NOTIFICATION_MESSAGE'
};