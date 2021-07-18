export const SET_USER_LIST = "SET_USER_LIST";
export const SET_LOGIN_USER = "SET_LOGIN_USER";
export const LOGOUT = "LOGOUT";

export const setUserList = (users) => ({
    type: SET_USER_LIST,
    payload: users,
});

export const setLoginUser = (user) => ({
    type: SET_LOGIN_USER,
    payload: user,
});

export const logout = () => ({
    type: LOGOUT,
});

const initialState = {
    loginUser: {
        email: "",
        displayName: "",
        profileImageUrl: "",
    },
    userList: {},
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LIST: {
            return {
                ...state,
                userList: action.payload,
            };
        }

        case SET_LOGIN_USER: {
            return {
                ...state,
                loginUser: action.payload,
            };
        }

        case LOGOUT: {
            return {
                ...state,
                loginUser: {
                    email: "",
                    displayName: "",
                    profileImageUrl: "",
                },
            };
        }

        default:
            return state;
    }
};

export default user;
