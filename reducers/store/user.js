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
        profile: "",
    },
    userList: {
        "sejin@smail.com": {
            displayName: "세진",
            email: "sejin@smail.com",
            profile: "/profile.png",
        },
        "kanglim@smail.com": {
            displayName: "강림",
            email: "kanglim@smail.com",
            profile: "/profile.png",
        },
        "jinyoung@smail.com": {
            displayName: "진영",
            email: "jinyoung@smail.com",
            profile: "/profile.png",
        },
        "sungPha@smail.com": {
            displayName: "성파님",
            email: "sungPha@smail.com",
            profile: "/profile.png",
        },
    },
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
                    profile: "",
                },
            };
        }

        default:
            return state;
    }
};

export default user;
