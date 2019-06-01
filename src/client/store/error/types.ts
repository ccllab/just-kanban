export interface ErrorState {
    error: string
}

export const types =  {
    // getters
    ERROR: "error",

    // action
    SHOW_ERROR: 'showError',

    // mutations
    SET_ERROR_MSG: 'setErrorMsg'
};
