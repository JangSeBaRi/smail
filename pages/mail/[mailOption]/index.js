import Head from "next/head";
import { useEffect, useState } from "react";
import MailLayout from "../../../components/Layouts/MailLayout";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Tooltip, IconButton, Button, Divider } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import RefreshIcon from "@material-ui/icons/Refresh";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DraftsIcon from "@material-ui/icons/Drafts";
import MailIcon from "@material-ui/icons/Mail";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { modifyThread, deleteThread } from "../../../reducers/store/mailThread";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ErrorIcon from "@material-ui/icons/Error";

export default function Mail() {
    const router = useRouter();
    const dispatch = useDispatch();
    const loginUser = useSelector(({ user }) => user.loginUser);
    const [mailOption, setMailOption] = useState("");
    const [headTitle, setHeadTitle] = useState("Smail");
    const [showSortList, setShowSortList] = useState(false);
    const [mailThreadUid, setMailThreadUid] = useState("");
    const [myThread, setMyThread] = useState([]);
    const [checkBoxList, setCheckBoxList] = useState([]);

    useEffect(() => {
        setCheckBoxList(
            myThread.map((v) => {
                return false;
            })
        );
        setMailThreadUid("");
    }, [myThread.length]);
    const threadList = useSelector(({ mailThread }) => mailThread.threadList);

    useEffect(() => {
        const myArray = threadList[loginUser.email];
        if (mailOption === "inbox") {
            setMyThread(
                myArray
                    .filter((v) => {
                        return !v.isDeleted;
                    })
                    .filter((v) => {
                        return v.recentReceivingMailTime != 0;
                    })
                    .sort((a, b) => {
                        return (
                            b.recentReceivingMailTime -
                            a.recentReceivingMailTime
                        );
                    })
            );
        } else if (mailOption === "starred") {
            setMyThread(
                myArray
                    .filter((v) => {
                        return !v.isDeleted;
                    })
                    .filter((v) => {
                        return v.hasStars;
                    })
            );
        } else if (mailOption === "important") {
            setMyThread(
                myArray
                    .filter((v) => {
                        return !v.isDeleted;
                    })
                    .filter((v) => {
                        return v.isImportant;
                    })
            );
        } else if (mailOption === "sent") {
            setMyThread(
                myArray
                    .filter((v) => {
                        return !v.isDeleted;
                    })
                    .filter((v) => {
                        return v.recentSendingMailTime != 0;
                    })
                    .sort((a, b) => {
                        return (
                            b.recentSendingMailTime - a.recentSendingMailTime
                        );
                    })
            );
        } else if (mailOption === "delete") {
            setMyThread(
                myArray.filter((v) => {
                    return v.isDeleted;
                })
            );
        } else {
            setMyThread([]);
        }
    }, [threadList, mailOption]);

    useEffect(() => {
        if (!mailOption) {
            return;
        }
        setHeadTitle(`${mailOption} - 
        ${loginUser.email} -Segle 
        mail.segle.com`);
    }, [mailOption]);

    useEffect(() => {
        setMailOption(router.query.mailOption);
    }, [router.query.mailOption]);

    useEffect(() => {
        if (!loginUser.email) {
            router.push("/");
        }
    }, []);

    // n자리 숫자로 변환해주는 함수 ex) numberPad(1, 2) => return : 01 , ex) numberPad(1, 3) => return : 001
    const numberPad = (n, width) => {
        n = n + "";
        return n.length >= width
            ? n
            : new Array(width - n.length + 1).join("0") + n;
    };

    const headerTool = () => {
        let trueArrayLength = checkBoxList.filter((x) => {
            return x;
        }).length;
        return (
            <div className="flex py-2 px-3 items-center justify-start border-b space-x-2 relative">
                {trueArrayLength === 0 ? (
                    <Tooltip
                        title="선택"
                        onClick={() => {
                            const cp = [...checkBoxList];
                            setCheckBoxList(
                                cp.map((v) => {
                                    return true;
                                })
                            );
                        }}
                    >
                        <IconButton size="small">
                            <CheckBoxOutlineBlankIcon
                                className={`text-gray-500 hover:text-black`}
                            />
                        </IconButton>
                    </Tooltip>
                ) : trueArrayLength === checkBoxList.length ? (
                    <Tooltip
                        title="선택"
                        onClick={() => {
                            const cp = [...checkBoxList];
                            setCheckBoxList(
                                cp.map((v) => {
                                    return false;
                                })
                            );
                        }}
                    >
                        <IconButton size="small">
                            <CheckBoxIcon
                                className={`text-gray-500 hover:text-black`}
                            />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip
                        title="선택"
                        onClick={() => {
                            const cp = [...checkBoxList];
                            setCheckBoxList(
                                cp.map((v) => {
                                    return false;
                                })
                            );
                        }}
                    >
                        <IconButton size="small">
                            <IndeterminateCheckBoxIcon
                                className={`text-gray-500 hover:text-black`}
                            />
                        </IconButton>
                    </Tooltip>
                )}
                <Tooltip
                    title="선택"
                    onClick={(e) => {
                        setShowSortList((prev) => !prev);
                        e.stopPropagation();
                    }}
                    className="relative -left-2"
                >
                    <ArrowDropDownIcon
                        style={{
                            color: "#5F6368",
                            fontSize: 20,
                        }}
                    />
                </Tooltip>
                {trueArrayLength === 0 ? (
                    <div className="flex items-center space-x-4">
                        <Tooltip title="새로고침">
                            <IconButton size="small">
                                <RefreshIcon
                                    className={`text-gray-500 hover:text-black`}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="더보기">
                            <IconButton size="small">
                                <MoreVertIcon
                                    className={`text-gray-500 hover:text-black`}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        {mailOption !== "delete" ? (
                            <div className="flex items-center space-x-4">
                                <Tooltip title="보관처리">
                                    <IconButton size="small">
                                        <ArchiveIcon
                                            className={`text-gray-500 hover:text-black`}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="스팸신고">
                                    <IconButton size="small">
                                        <ErrorIcon
                                            className={`text-gray-500 hover:text-black`}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    title="삭제"
                                    onClick={() => {
                                        checkBoxList.forEach((x, indx) => {
                                            dispatch(
                                                modifyThread({
                                                    email: loginUser.email,
                                                    threadUid:
                                                        myThread[indx]
                                                            .threadUid,
                                                    modifyProps: {
                                                        isDeleted: x,
                                                    },
                                                })
                                            );
                                        });
                                    }}
                                >
                                    <IconButton size="small">
                                        <DeleteIcon
                                            className={`text-gray-500 hover:text-black`}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Tooltip
                                    title="영구삭제"
                                    onClick={() => {
                                        checkBoxList.forEach((x, indx) => {
                                            dispatch(
                                                deleteThread({
                                                    email: loginUser.email,
                                                    threadUid:
                                                        myThread[indx]
                                                            .threadUid,
                                                })
                                            );
                                        });
                                    }}
                                >
                                    <IconButton size="small">
                                        <DeleteForeverIcon
                                            className={`text-gray-500 hover:text-black`}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    title="복구"
                                    onClick={() => {
                                        checkBoxList.forEach((x, indx) => {
                                            dispatch(
                                                modifyThread({
                                                    email: loginUser.email,
                                                    threadUid:
                                                        myThread[indx]
                                                            .threadUid,
                                                    modifyProps: {
                                                        isDeleted: !x,
                                                    },
                                                })
                                            );
                                        });
                                    }}
                                >
                                    <IconButton size="small">
                                        <RestoreFromTrashIcon
                                            className={`text-gray-500 hover:text-black`}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="스팸신고">
                                    <IconButton size="small">
                                        <ErrorIcon
                                            className={`text-gray-500 hover:text-black`}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )}
                        <div className="border-l h-5"></div>
                        {myThread
                            .map((x) => {
                                return x.isRead;
                            })
                            .filter((s, indx) => {
                                return !s && checkBoxList[indx];
                            }).length > 0 ? (
                            <Tooltip
                                title="읽은 상태로 표시"
                                onClick={() => {
                                    checkBoxList.forEach((x, indx) => {
                                        {
                                            x &&
                                                dispatch(
                                                    modifyThread({
                                                        email: loginUser.email,
                                                        threadUid:
                                                            myThread[indx]
                                                                .threadUid,
                                                        modifyProps: {
                                                            isRead: true,
                                                        },
                                                    })
                                                );
                                        }
                                    });
                                }}
                            >
                                <IconButton size="small">
                                    <DraftsIcon
                                        className={`text-gray-500 hover:text-black`}
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip
                                title="읽은 않은 상태로 표시"
                                onClick={() => {
                                    checkBoxList.forEach((x, indx) => {
                                        {
                                            x &&
                                                dispatch(
                                                    modifyThread({
                                                        email: loginUser.email,
                                                        threadUid:
                                                            myThread[indx]
                                                                .threadUid,
                                                        modifyProps: {
                                                            isRead: false,
                                                        },
                                                    })
                                                );
                                        }
                                    });
                                }}
                            >
                                <IconButton size="small">
                                    <MailIcon
                                        className={`text-gray-500 hover:text-black`}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title="다시알림">
                            <IconButton size="small">
                                <WatchLaterIcon
                                    className={`text-gray-500 hover:text-black`}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Tasks에 추가">
                            <IconButton size="small">
                                <AddCircleIcon
                                    className={`text-gray-500 hover:text-black`}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                )}
                {showSortList && (
                    <div className="shadow-xl rounded-md py-2 bg-white absolute top-10 left-0 border z-50">
                        <p
                            className="flex justify-center items-center py-2 px-12 hover:bg-gray-100"
                            onClick={() => {
                                const cp = [...checkBoxList];
                                setCheckBoxList(
                                    cp.map((x) => {
                                        return true;
                                    })
                                );
                            }}
                        >
                            전체선택
                        </p>
                        <p
                            className="flex items-center py-2 px-12 hover:bg-gray-100"
                            onClick={() => {
                                const cp = [...checkBoxList];
                                setCheckBoxList(
                                    cp.map((x) => {
                                        return false;
                                    })
                                );
                            }}
                        >
                            선택안함
                        </p>
                        <p
                            className="flex items-center py-2 px-12 hover:bg-gray-100"
                            onClick={() => {
                                const cp = [...checkBoxList];
                                setCheckBoxList(
                                    cp.map((x, indx) => {
                                        return myThread[indx].isRead;
                                    })
                                );
                            }}
                        >
                            읽음
                        </p>
                        <p
                            className="flex justify-center items-center py-2 px-12 hover:bg-gray-100"
                            onClick={() => {
                                const cp = [...checkBoxList];
                                setCheckBoxList(
                                    cp.map((x, indx) => {
                                        return !myThread[indx].isRead;
                                    })
                                );
                            }}
                        >
                            읽지않음
                        </p>
                        <p
                            className="flex items-center py-2 px-12 hover:bg-gray-100"
                            onClick={() => {
                                const cp = [...checkBoxList];
                                setCheckBoxList(
                                    cp.map((x, indx) => {
                                        return myThread[indx].hasStars;
                                    })
                                );
                            }}
                        >
                            별표
                        </p>
                        <p
                            className="flex items-center py-2 px-12 hover:bg-gray-100"
                            onClick={() => {
                                const cp = [...checkBoxList];
                                setCheckBoxList(
                                    cp.map((x, indx) => {
                                        return !myThread[indx].hasStars;
                                    })
                                );
                            }}
                        >
                            별표없음
                        </p>
                    </div>
                )}
            </div>
        );
    };

    const main = () => {
        const mainThread = myThread.map((v, i) => {
            const sendTime = `${numberPad(
                new Date(v.recentSendingMailTime).getMonth() + 1,
                2
            )}월 ${numberPad(
                new Date(v.recentSendingMailTime).getDate(),
                2
            )}일 ${numberPad(
                new Date(v.recentSendingMailTime).getHours(),
                2
            )}:${numberPad(new Date(v.recentSendingMailTime).getMinutes(), 2)}`;
            const receiveTime = `${numberPad(
                new Date(v.recentReceivingMailTime).getMonth() + 1,
                2
            )}월 ${numberPad(
                new Date(v.recentReceivingMailTime).getDate(),
                2
            )}일 ${numberPad(
                new Date(v.recentReceivingMailTime).getHours(),
                2
            )}:${numberPad(
                new Date(v.recentReceivingMailTime).getMinutes(),
                2
            )}`;
            return (
                <div
                    className={`flex items-center cursor-pointer mailThreadList ${
                        checkBoxList[i]
                            ? "bg-blue-200"
                            : v.isRead
                            ? "bg-gray-200"
                            : "bg-white"
                    }`}
                    style={{
                        borderBottom: "1px solid #bfbfbf",
                        marginBottom: 5,
                    }}
                    onMouseOver={() => {
                        setMailThreadUid(v.threadUid);
                    }}
                    onMouseLeave={() => {
                        setMailThreadUid("");
                    }}
                    key={v.threadUid}
                    onClick={async () => {
                        await router.push(`/mail/${mailOption}/${v.threadUid}`);
                        dispatch(
                            modifyThread({
                                email: loginUser.email,
                                threadUid: v.threadUid,
                                modifyProps: {
                                    isRead: true,
                                },
                            })
                        );
                    }}
                >
                    <div
                        className="flex items-center pl-3 py-1 space-x-1 relative"
                        style={{ minWidth: 300 }}
                    >
                        {mailThreadUid === v.threadUid && (
                            <DragIndicatorIcon
                                style={{
                                    color: "ababab",
                                    fontSize: 20,
                                }}
                                className="absolute left-0"
                            />
                        )}
                        {!checkBoxList[i] ? (
                            <Tooltip
                                title="선택"
                                onClick={(e) => {
                                    let cp = [...checkBoxList];
                                    cp[i] = !cp[i];
                                    setCheckBoxList(cp);
                                    e.stopPropagation();
                                }}
                            >
                                <IconButton size="small">
                                    <CheckBoxOutlineBlankIcon
                                        className={`${
                                            mailThreadUid === v.threadUid
                                                ? "text-gray-500"
                                                : "text-gray-400"
                                        } hover:text-black`}
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip
                                title="선택"
                                onClick={(e) => {
                                    let cp = [...checkBoxList];
                                    cp[i] = !cp[i];
                                    setCheckBoxList(cp);
                                    e.stopPropagation();
                                }}
                            >
                                <IconButton size="small">
                                    <CheckBoxIcon
                                        className={`text-gray-500 hover:text-black`}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}

                        {!v.hasStars && mailOption !== "delete" ? (
                            <Tooltip
                                title="별표없음"
                                onClick={(e) => {
                                    dispatch(
                                        modifyThread({
                                            email: loginUser.email,
                                            threadUid: v.threadUid,
                                            modifyProps: {
                                                hasStars: true,
                                            },
                                        })
                                    );
                                    e.stopPropagation();
                                }}
                            >
                                <IconButton size="small">
                                    <StarOutlineIcon
                                        className={`${
                                            mailThreadUid === v.threadUid
                                                ? "text-gray-500"
                                                : "text-gray-400"
                                        } hover:text-black`}
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : v.hasStars && mailOption !== "delete" ? (
                            <Tooltip
                                title="별표편지함"
                                onClick={(e) => {
                                    dispatch(
                                        modifyThread({
                                            email: loginUser.email,
                                            threadUid: v.threadUid,
                                            modifyProps: {
                                                hasStars: false,
                                            },
                                        })
                                    );
                                    e.stopPropagation();
                                }}
                            >
                                <IconButton size="small">
                                    <StarIcon
                                        style={{
                                            color: "#F7CB4D",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                        {!v.isImportant ? (
                            <Tooltip
                                title="Smail에 이 대화가 중요하다고 알려주려면 클릭하세요"
                                placement="bottom-start"
                                onClick={(e) => {
                                    dispatch(
                                        modifyThread({
                                            email: loginUser.email,
                                            threadUid: v.threadUid,
                                            modifyProps: {
                                                isImportant: true,
                                            },
                                        })
                                    );
                                    e.stopPropagation();
                                }}
                            >
                                <IconButton size="small">
                                    <LabelImportantIcon
                                        className={`${
                                            mailThreadUid === v.threadUid
                                                ? "text-gray-500"
                                                : "text-gray-400"
                                        } hover:text-black`}
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip
                                title="Smail에 이 대화가 중요하지 않다고 알려주려면 클릭하세요"
                                placement="bottom-start"
                                onClick={(e) => {
                                    dispatch(
                                        modifyThread({
                                            email: loginUser.email,
                                            threadUid: v.threadUid,
                                            modifyProps: {
                                                isImportant: false,
                                            },
                                        })
                                    );
                                    e.stopPropagation();
                                }}
                            >
                                <IconButton size="small">
                                    <LabelImportantIcon
                                        style={{
                                            color: "#F7CB4D",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                        {mailOption === "sent" ? (
                            <div className="text-sm flex items-center">
                                <span>{`받는사람: ${v.receiverList
                                    .map((x) => {
                                        return x.displayName;
                                    })
                                    .join()}`}</span>
                            </div>
                        ) : (
                            <div className="text-sm flex items-center">
                                {mailOption === "delete" ? (
                                    <DeleteIcon className={"text-gray-500"} />
                                ) : null}
                                <span
                                    className={`${
                                        v.isRead
                                            ? "font-normal"
                                            : "font-semibold"
                                    }`}
                                >{`나, ${v.receiverList
                                    .map((x) => {
                                        return x.displayName;
                                    })
                                    .join()}`}</span>{" "}
                                <span className="text-xs">
                                    {v.mailList.length}
                                </span>
                            </div>
                        )}
                    </div>
                    <div
                        className="flex-auto text-sm truncate"
                        style={{ width: 0 }}
                    >
                        <span
                            className={`w-max truncate inline-block relative ${
                                v.isRead ? "font-normal" : "font-semibold"
                            }`}
                            style={{ maxWidth: 200, top: 2 }}
                        >
                            {v.mailList[v.mailList.length - 1].subject}
                        </span>
                        <span className="relative" style={{ top: -3 }}>
                            {` - ${v.mailList[v.mailList.length - 1].content}`}
                        </span>
                    </div>
                    {mailThreadUid === v.threadUid ? (
                        <div
                            className="flex justify-end pr-3 py-1 space-x-3"
                            style={{ minWidth: 180 }}
                        >
                            {!v.isDeleted ? (
                                <Tooltip
                                    title="보관처리"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <IconButton size="small">
                                        <ArchiveIcon className="hover:text-black" />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip
                                    title="영구삭제"
                                    onClick={(e) => {
                                        dispatch(
                                            deleteThread({
                                                email: loginUser.email,
                                                threadUid: v.threadUid,
                                            })
                                        );
                                        e.stopPropagation();
                                    }}
                                >
                                    <IconButton size="small">
                                        <DeleteForeverIcon className="hover:text-black" />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {!v.isDeleted ? (
                                <Tooltip
                                    title="삭제"
                                    onClick={(e) => {
                                        dispatch(
                                            modifyThread({
                                                email: loginUser.email,
                                                threadUid: v.threadUid,
                                                modifyProps: {
                                                    isDeleted: true,
                                                },
                                            })
                                        );
                                        e.stopPropagation();
                                    }}
                                >
                                    <IconButton size="small">
                                        <DeleteIcon className="hover:text-black" />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip
                                    title="복구"
                                    onClick={(e) => {
                                        dispatch(
                                            modifyThread({
                                                email: loginUser.email,
                                                threadUid: v.threadUid,
                                                modifyProps: {
                                                    isDeleted: false,
                                                },
                                            })
                                        );
                                        e.stopPropagation();
                                    }}
                                >
                                    <IconButton size="small">
                                        <RestoreFromTrashIcon className="hover:text-black" />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {!v.isRead ? (
                                <Tooltip
                                    title="읽은 상태로 표시"
                                    onClick={(e) => {
                                        dispatch(
                                            modifyThread({
                                                email: loginUser.email,
                                                threadUid: v.threadUid,
                                                modifyProps: {
                                                    isRead: true,
                                                },
                                            })
                                        );
                                        e.stopPropagation();
                                    }}
                                >
                                    <IconButton size="small">
                                        <DraftsIcon className="hover:text-black" />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip
                                    title="읽지 않은 상태로 표시"
                                    onClick={(e) => {
                                        dispatch(
                                            modifyThread({
                                                email: loginUser.email,
                                                threadUid: v.threadUid,
                                                modifyProps: {
                                                    isRead: false,
                                                },
                                            })
                                        );
                                        e.stopPropagation();
                                    }}
                                >
                                    <IconButton size="small">
                                        <MailIcon className="hover:text-black" />
                                    </IconButton>
                                </Tooltip>
                            )}
                            <Tooltip
                                title="다시 알림"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <IconButton size="small">
                                    <WatchLaterIcon className="hover:text-black" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    ) : (
                        <div
                            className="flex text-sm justify-end pr-3"
                            style={{ minWidth: 130 }}
                        >
                            <span
                                className={`${
                                    v.isRead ? "font-normal" : "font-semibold"
                                }`}
                            >
                                {mailOption === "inbox"
                                    ? receiveTime
                                    : mailOption === "inbox"
                                    ? sendTime
                                    : v.recentSendingMailTime <
                                      v.recentReceivingMailTime
                                    ? receiveTime
                                    : sendTime}
                            </span>
                        </div>
                    )}
                </div>
            );
        });
        return mainThread;
    };

    return (
        <div>
            <Head>
                <title>{headTitle}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MailLayout
                onClick={() => {
                    setShowSortList(false);
                }}
                mailOption={mailOption}
            >
                {headerTool()}
                {main()}
            </MailLayout>
        </div>
    );
}
