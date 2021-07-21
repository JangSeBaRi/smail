import { CodeSharp } from "@material-ui/icons";
import { uuid } from "uuidv4";

export const SET_THREAD_LIST = "SET_THREAD_LIST";
export const SET_CURRENT_THREAD = "SET_CURRENT_THREAD";
export const CREATE_NEW_THREAD = "CREATE_NEW_THREAD";
export const MODIFY_THREAD = "MODIFY_THREAD";
export const MODIFY_MAIL = "MODIFY_MAIL";
export const DELETE_THREAD = "DELETE_THREAD";
export const SEND_MAIL = "SEND_MAIL";

export const setThreadList = (threadList) => ({
    type: SET_THREAD_LIST,
    payload: threadList,
});

export const setCurrentThreads = (currentThread) => ({
    type: SET_CURRENT_THREAD,
    payload: currentThread,
});

export const createNewThread = (data) => ({
    type: CREATE_NEW_THREAD,
    mailSender: data.mailSender,
    mailReceiver: data.mailReceiver,
    mailTitle: data.mailTitle,
    mailcontent: data.mailcontent,
    userList: data.userList,
});

export const modifyThread = (data) => ({
    type: MODIFY_THREAD,
    email: data.email,
    threadUid: data.threadUid,
    modifyProps: data.modifyProps,
});

export const modifyMail = (data) => ({
    type: MODIFY_MAIL,
    email: data.email,
    threadUid: data.threadUid,
    mailUid: data.mailUid,
    modifyProps: data.modifyProps,
});

export const deleteThread = (data) => ({
    type: DELETE_THREAD,
    email: data.email,
    threadUid: data.threadUid,
});

export const sendMail = (data) => ({
    type: SEND_MAIL,
    mailSender: data.mailSender,
    mailReceiver: data.mailReceiver,
    mailTitle: data.mailTitle,
    mailcontent: data.mailcontent,
    userList: data.userList,
    senderThreadUid: data.senderThreadUid,
    receiverThreadUid: data.receiverThreadUid,
});

const initialState = {
    threadList: {
        "sejin@smail.com": [],
        "kanglim@smail.com": [],
        "jinyoung@smail.com": [],
        "sungPha@smail.com": [],
    },
    currentThread: {},
};

const mailThread = (state = initialState, action) => {
    switch (action.type) {
        case SET_THREAD_LIST: {
            return {
                ...state,
                threadList: action.payload,
            };
        }

        case SET_CURRENT_THREAD: {
            return {
                ...state,
                currentThread: action.payload,
            };
        }

        case MODIFY_THREAD: {
            let newObj = { ...state.threadList };
            const index = newObj[action.email].findIndex((v) => {
                return v.threadUid === action.threadUid;
            });
            newObj[action.email][index] = {
                ...newObj[action.email][index],
                ...action.modifyProps,
            };
            return {
                ...state,
                threadList: newObj,
            };
        }

        case MODIFY_MAIL: {
            let newObj = { ...state.threadList };
            const index = newObj[action.email].findIndex((v) => {
                return v.threadUid === action.threadUid;
            });
            const mailIndex = newObj[action.email][index].mailList.findIndex(
                (v) => {
                    return v.mailUid === action.mailUid;
                }
            );
            newObj[action.email][index].mailList[mailIndex] = {
                ...newObj[action.email][index].mailList[mailIndex],
                ...action.modifyProps,
            };
            return {
                ...state,
                threadList: newObj,
            };
        }

        case DELETE_THREAD: {
            let newObj = { ...state.threadList };
            const filterArray = newObj[action.email].filter((v) => {
                return v.threadUid != action.threadUid;
            });
            newObj[action.email] = filterArray;
            return {
                ...state,
                threadList: newObj,
            };
        }

        case SEND_MAIL: {
            const mailUid = uuid();
            const time = new Date().getTime();
            let newObj = { ...state.threadList };
            const index = newObj[action.mailSender].findIndex((v) => {
                return v.threadUid === action.senderThreadUid;
            });
            const receiverIndex = newObj[action.mailReceiver[0]].findIndex(
                (v) => {
                    return v.threadUid === action.receiverThreadUid;
                }
            );
            newObj[action.mailSender][index].mailList = [
                ...newObj[action.mailSender][index].mailList,
                {
                    subject: `Re: ${
                        newObj[action.mailSender][index].mailList[0].subject
                    }`,
                    content: action.mailcontent,
                    sender: {
                        displayName:
                            action.userList[action.mailSender].displayName,
                        email: action.userList[action.mailSender].email,
                        profile: action.userList[action.mailSender].profile,
                    },
                    receiver: action.mailReceiver.map((v, i) => {
                        return {
                            displayName: action.userList[v].displayName,
                            email: action.userList[v].email,
                            profile: action.userList[v].profile,
                        };
                    }),
                    mailUid: mailUid,
                    isStarred: false,
                    time: time,
                },
            ];
            newObj[action.mailSender][index].recentSendingMailUid = mailUid;
            newObj[action.mailSender][index].recentSendingMailTime = time;
            newObj[action.mailSender][index].isRead = true;
            newObj[action.mailReceiver[0]][receiverIndex].mailList = [
                ...newObj[action.mailReceiver[0]][receiverIndex].mailList,
                {
                    subject: `Re: ${
                        newObj[action.mailReceiver[0]][receiverIndex].mailList[0].subject
                    }`,
                    content: action.mailcontent,
                    sender: {
                        displayName:
                            action.userList[action.mailSender].displayName,
                        email: action.userList[action.mailSender].email,
                        profile: action.userList[action.mailSender].profile,
                    },
                    receiver: action.mailReceiver.map((v, i) => {
                        return {
                            displayName: action.userList[v].displayName,
                            email: action.userList[v].email,
                            profile: action.userList[v].profile,
                        };
                    }),
                    mailUid: mailUid,
                    isStarred: false,
                    time: time,
                },
            ];
            newObj[action.mailReceiver[0]][
                receiverIndex
            ].recentReceivingMailUid = mailUid;
            newObj[action.mailReceiver[0]][
                receiverIndex
            ].recentReceivingMailTime = time;
            newObj[action.mailReceiver[0]][receiverIndex].isRead = false;
            return {
                ...state,
                threadList: newObj,
            };
        }

        case CREATE_NEW_THREAD: {
            let newObj = { ...state.threadList };
            const senderThreadUid = uuid();
            const receiverThreadUid = action.mailReceiver.map((v) => {
                return uuid();
            });
            const mailUid = uuid();
            const time = new Date().getTime();
            newObj[action.mailSender] = [
                ...newObj[action.mailSender],
                {
                    threadUid: senderThreadUid,
                    receiverList: receiverThreadUid.map((v, i) => {
                        return {
                            threadUid: v,
                            displayName:
                                action.userList[action.mailReceiver[i]]
                                    .displayName,
                            email: action.userList[action.mailReceiver[i]]
                                .email,
                            profile:
                                action.userList[action.mailReceiver[i]].profile,
                        };
                    }),
                    mailList: [
                        {
                            subject: action.mailTitle,
                            content: action.mailcontent,
                            sender: {
                                displayName:
                                    action.userList[action.mailSender]
                                        .displayName,
                                email: action.userList[action.mailSender].email,
                                profile:
                                    action.userList[action.mailSender].profile,
                            },
                            receiver: action.mailReceiver.map((v, i) => {
                                return {
                                    displayName: action.userList[v].displayName,
                                    email: action.userList[v].email,
                                    profile: action.userList[v].profile,
                                };
                            }),
                            mailUid: mailUid,
                            isStarred: false,
                            time: time,
                        },
                    ],
                    isImportant: false,
                    isDeleted: false,
                    isRead: true,
                    hasStars: false,
                    recentSendingMailUid: mailUid,
                    recentSendingMailTime: time,
                    recentReceivingMailUid: "",
                    recentReceivingMailTime: 0,
                },
            ];
            action.mailReceiver.forEach((v, i) => {
                newObj[v] = [
                    ...newObj[v],
                    {
                        threadUid: receiverThreadUid[i],
                        receiverList: [
                            {
                                threadUid: senderThreadUid,
                                displayName:
                                    action.userList[action.mailSender]
                                        .displayName,
                                email: action.userList[action.mailSender].email,
                                profile:
                                    action.userList[action.mailSender].profile,
                            },
                        ],
                        mailList: [
                            {
                                subject: action.mailTitle,
                                content: action.mailcontent,
                                sender: {
                                    displayName:
                                        action.userList[action.mailSender]
                                            .displayName,
                                    email: action.userList[action.mailSender]
                                        .email,
                                    profile:
                                        action.userList[action.mailSender]
                                            .profile,
                                },
                                receiver: action.mailReceiver.map((v, i) => {
                                    return {
                                        displayName:
                                            action.userList[v].displayName,
                                        email: action.userList[v].email,
                                        profile: action.userList[v].profile,
                                    };
                                }),
                                mailUid: mailUid,
                                isStarred: false,
                                time: time,
                            },
                        ],
                        isImportant: false,
                        isDeleted: false,
                        isRead: false,
                        hasStars: false,
                        recentSendingMailUid: "",
                        recentSendingMailTime: 0,
                        recentReceivingMailUid: mailUid,
                        recentReceivingMailTime: time,
                    },
                ];
            });
            return {
                ...state,
                threadList: newObj,
            };
        }

        default:
            return state;
    }
};

export default mailThread;
