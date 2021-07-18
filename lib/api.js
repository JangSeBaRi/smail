export const initialUserList = () => {
    return {
        "sejin@smail.com": {
            displayName: "세진",
            email: "sejin@smail.com",
            profileImageUrl: "/images/profileImageUrl.png",
        },
        "kanglim@smail.com": {
            displayName: "강림",
            email: "kanglim@smail.com",
            profileImageUrl: "/images/profileImageUrl.png",
        },
        "jinyoung@smail.com": {
            displayName: "진영",
            email: "jinyoung@smail.com",
            profileImageUrl: "/images/profileImageUrl.png",
        },
        "sungPha@smail.com": {
            displayName: "성파님",
            email: "sungPha@smail.com",
            profileImageUrl: "/images/profileImageUrl.png",
        },
    };
};

export const initialThreadList = () => {
    return {
        "sejin@smail.com": [],
        "kanglim@smail.com": [],
        "jinyoung@smail.com":[],
        "sungPha@smail.com":[],
    };
};

// const threadApi = () => {
//     return {
//         "sejin@smail.com": [
//             {
//                 threadUid: "thread-0",
//                 receiverList: [
//                     {
//                         threadUid: "thread-1",
//                         displayName: "강림",
//                         email: "kanglim@smail.com",
//                         profileImageUrl: "/images/profileImageUrl.png",
//                     },
//                 ],
//                 mailList: [
//                     {
//                         subject: "해위이잉~~ 뭐하고 있옹ㅋㅋ", //작성
//                         content: "내일 뭐하냥", //작성
//                         sender: {
//                             displayName: "세진",
//                             email: "sejin@smail.com",
//                             profileImageUrl: "/images/profileImageUrl.png",
//                         },
//                         receiver: {
//                             displayName: "강림",
//                             email: "kanglim@smail.com",
//                             profileImageUrl: "/images/profileImageUrl.png",
//                         },
//                         mailUid: "mail-0",
//                         isStarred: false,
//                         time: 1626581952178,
//                     },
//                 ],
//                 isImportant: false,
//                 isDeleted: false,
//                 isRead: false,
//                 hasStars: false,
//                 recentSendingMailUid: "mail-0",
//                 recentSendingMailTime: 1626581952178,
//                 recentReceivingMailUid: "",
//                 recentReceivingMailUid: 0,
//             },
//         ],
//         "kanglim@smail.com": [
//             {
//                 threadUid: "thread-1",
//                 receiverList: [
//                     {
//                         threadUid: "thread-0",
//                         displayName: "세진",
//                         email: "sejin@smail.com",
//                         profileImageUrl: "/images/profileImageUrl.png",
//                     },
//                 ],
//                 mailList: [
//                     {
//                         subject: "해위이잉~~ 뭐하고 있옹ㅋㅋ", //작성
//                         content: "내일 뭐하냥", //작성
//                         sender: {
//                             displayName: "세진",
//                             email: "sejin@smail.com",
//                             profileImageUrl: "/images/profileImageUrl.png",
//                         },
//                         receiver: {
//                             displayName: "강림",
//                             email: "kanglim@smail.com",
//                             profileImageUrl: "/images/profileImageUrl.png",
//                         },
//                         mailUid: "mail-0",
//                         isStarred: false,
//                         time: 1626581952178,
//                     },
//                     {
//                         subject: "Re: 해위이잉~~ 뭐하고 있옹ㅋㅋ", //작성
//                         content: "내일 코딩하지 ㅋㅋㅋㅋ", //작성
//                         sender: {
//                             displayName: "강림",
//                             email: "kanglim@smail.com",
//                             profileImageUrl: "/images/profileImageUrl.png",
//                         },
//                         receiver: {
//                             displayName: "세진",
//                             email: "sejin@smail.com",
//                             profileImageUrl: "/images/profileImageUrl.png",
//                         },
//                         mailUid: "mail-0",
//                         isStarred: false,
//                         time: 1626581952178,
//                     },
//                 ],
//                 isImportant: false,
//                 isDeleted: false,
//                 isRead: false,
//                 hasStars: false,
//                 recentSendingMailUid: "",
//                 recentSendingMailTime: 0,
//                 recentReceivingMailUid: "mail-0",
//                 recentReceivingMailUid: 1626581952178,
//             },
//         ],
//     };
// };
