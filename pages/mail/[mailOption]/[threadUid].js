import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import MailLayout from "../../../components/Layouts/MailLayout";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
    modifyMail,
    modifyThread,
    sendMail,
} from "../../../reducers/store/mailThread";
import { Tooltip, IconButton, Button } from "@material-ui/core";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import PrintIcon from "@material-ui/icons/Print";
import LaunchIcon from "@material-ui/icons/Launch";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import StarIcon from "@material-ui/icons/Star";
import ReplyIcon from "@material-ui/icons/Reply";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteIcon from "@material-ui/icons/Delete";
import MailIcon from "@material-ui/icons/Mail";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ErrorIcon from "@material-ui/icons/Error";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ForwardIcon from "@material-ui/icons/Forward";
import ClearIcon from "@material-ui/icons/Clear";

export default function Mail() {
    const router = useRouter();
    const dispatch = useDispatch();
    const mailcontentRef = useRef();
    const [mailOption, setMailOption] = useState("");
    const [headTitle, setHeadTitle] = useState("Smail");
    const [showSortList, setShowSortList] = useState(false);
    const [myThread, setMyThread] = useState({});
    const [mailList, setMailList] = useState([]);
    const [mailUid, setMailUid] = useState("");
    const [checkBoxList, setCheckBoxList] = useState([]);
    const [receiver, setReceiver] = useState([]);
    const [mailReceiver, setMailReceiver] = useState("");
    const [mailcontent, setMailcontent] = useState("");
    const [isVisibleSendMail, setIsVisibleSendMail] = useState(false);

    const loginUser = useSelector(({ user }) => user.loginUser);
    const userList = useSelector(({ user }) => user.userList);
    const threadList = useSelector(({ mailThread }) => mailThread.threadList);

    const resizeHeight = () => {
        if (isVisibleSendMail) {
            mailcontentRef.current.style.height = 70 + "px";
            mailcontentRef.current.style.height =
                mailcontentRef.current.scrollHeight + "px";
        }
    };

    const handleReceiver = () => {
        const email = mailReceiver.trim();
        const index = receiver.findIndex((v) => {
            return v === email;
        });

        if (index === -1 && email !== "") {
            const cp = [...receiver];
            cp.push(email);
            setReceiver(cp);
        }

        setMailReceiver("");
    };

    useEffect(() => {
        resizeHeight();
    }, [mailcontent, isVisibleSendMail]);

    useEffect(() => {
        setCheckBoxList(
            mailList.map((v) => {
                return false;
            })
        );
    }, [myThread.length]);

    useEffect(() => {
        const index = threadList[loginUser.email].findIndex((v) => {
            return v.threadUid === router.query.threadUid;
        });
        if (index === -1) {
            return;
        }
        setMailList(
            threadList[loginUser.email][index].mailList.sort((a, b) => {
                return a.time - b.time;
            })
        );
        setMyThread(threadList[loginUser.email][index]);
    }, [threadList, router.query.mailOption]);

    useEffect(() => {
        if (mailList.length === 0) {
            return;
        }
        setHeadTitle(`${mailList[0].subject} - 
        ${loginUser.email} -Segle 
        mail.segle.com`);
    }, [mailList]);

    // n자리 숫자로 변환해주는 함수 ex) numberPad(1, 2) => return : 01 , ex) numberPad(1, 3) => return : 001
    const numberPad = (n, width) => {
        n = n + "";
        return n.length >= width
            ? n
            : new Array(width - n.length + 1).join("0") + n;
    };

    const headerTool = () => {
        return (
            <div
                className="flex py-2 px-3 items-center justify-start space-x-4"
                style={{
                    borderBottom: "1px solid #bfbfbf",
                }}
            >
                <span
                    className="mr-3"
                    onClick={() => {
                        router.back();
                    }}
                >
                    <Tooltip title="보낸편지함으로 돌아가기">
                        <IconButton size="small">
                            <ArrowBackIcon
                                className={`text-gray-500 hover:text-black`}
                            />
                        </IconButton>
                    </Tooltip>
                </span>
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
                        dispatch(
                            modifyThread({
                                email: loginUser.email,
                                threadUid: myThread.threadUid,
                                modifyProps: {
                                    isDeleted: true,
                                },
                            })
                        );
                        router.back();
                    }}
                >
                    <IconButton size="small">
                        <DeleteIcon
                            className={`text-gray-500 hover:text-black`}
                        />
                    </IconButton>
                </Tooltip>
                <div className="border-l h-5"></div>
                <Tooltip
                    title="읽은 않은 상태로 표시"
                    onClick={() => {
                        dispatch(
                            modifyThread({
                                email: loginUser.email,
                                threadUid: myThread.threadUid,
                                modifyProps: {
                                    isRead: false,
                                },
                            })
                        );
                        router.back();
                    }}
                >
                    <IconButton size="small">
                        <MailIcon
                            className={`text-gray-500 hover:text-black`}
                        />
                    </IconButton>
                </Tooltip>
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
        );
    };

    const threadTitle = () => {
        return (
            <div className="flex items-center justify-between pt-2 pl-16 pr-8">
                <div className="flex items-center">
                    <span className="text-2xl w-max">
                        {mailList.length > 0 &&
                            mailList[mailList.length - 1].subject}
                    </span>
                    {!myThread.isImportant ? (
                        <Tooltip
                            title="Smail에 이 대화가 중요하다고 알려주려면 클릭하세요"
                            placement="bottom-start"
                            onClick={() => {
                                dispatch(
                                    modifyThread({
                                        email: loginUser.email,
                                        threadUid: myThread.threadUid,
                                        modifyProps: {
                                            isImportant: true,
                                        },
                                    })
                                );
                            }}
                        >
                            <IconButton size="medium">
                                <LabelImportantIcon className="text-gray-500 hover:text-black" />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip
                            title="Smail에 이 대화가 중요하지 않다고 알려주려면 클릭하세요"
                            placement="bottom-start"
                            onClick={() => {
                                dispatch(
                                    modifyThread({
                                        email: loginUser.email,
                                        threadUid: myThread.threadUid,
                                        modifyProps: {
                                            isImportant: false,
                                        },
                                    })
                                );
                            }}
                        >
                            <IconButton size="medium">
                                <LabelImportantIcon
                                    style={{
                                        color: "#F7CB4D",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
                <div className="flex items-center space-x-3">
                    <Tooltip title="모두 펼치기">
                        <IconButton size="small">
                            <UnfoldMoreIcon className="text-gray-500 hover:text-black" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="모두 인쇄">
                        <IconButton size="small">
                            <PrintIcon className="text-gray-500 hover:text-black" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="새 창">
                        <IconButton size="small">
                            <LaunchIcon className="text-gray-500 hover:text-black" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        );
    };
    const main = () => {
        return mailList.map((v, i) => {
            const now = new Date().getTime();
            const sendTime = `${new Date(v.time).getFullYear()}년 ${numberPad(
                new Date(v.time).getMonth() + 1,
                2
            )}월 ${numberPad(new Date(v.time).getDate(), 2)}일 ${numberPad(
                new Date(v.time).getHours(),
                2
            )}:${numberPad(new Date(v.time).getMinutes(), 2)}`;
            const diffTime = () => {
                if (new Date(now - v.time - 32400000).getDate() > 1) {
                    return `${
                        new Date(now - v.time - 32400000).getDate() - 1
                    }일 전`;
                } else if (new Date(now - v.time - 32400000).getHours() > 0) {
                    return `${new Date(
                        now - v.time - 32400000
                    ).getHours()}시간 전`;
                } else {
                    return `${new Date(
                        now - v.time - 32400000
                    ).getMinutes()}분 전`;
                }
            };
            return (
                <div key={i}>
                    <div
                        className="py-5 pl-16 pr-8 flex flex-col"
                        style={{
                            borderBottom:
                                i === mailList.length - 1
                                    ? undefined
                                    : "1px solid #bfbfbf",
                        }}
                        onClick={() => {
                            if (mailUid === v.mailUid) {
                                return;
                            } else {
                                const cp = [...checkBoxList];
                                cp[i] = !cp[i];
                                setCheckBoxList(cp);
                            }
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 relative">
                                <span
                                    className="absolute top-0"
                                    style={{ left: -52 }}
                                >
                                    <Image
                                        src={v.sender.profile}
                                        width="42px"
                                        height="42px"
                                        alt="profileImage"
                                        className="rounded-full"
                                    />
                                </span>
                                <span className="font-semibold relative -left-1 w-max">
                                    {v.sender.displayName}
                                </span>
                                {checkBoxList[i] ||
                                mailList.length - 1 === i ? (
                                    <span className="text-xs text-gray-600">
                                        {`<${v.sender.email}>`}
                                    </span>
                                ) : null}
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="mr-2 text-xs text-gray-600 w-max">
                                    {`${sendTime} (${diffTime()})`}
                                </span>
                                {!v.isStarred ? (
                                    <Tooltip
                                        title="별표표시 없음"
                                        onClick={(e) => {
                                            dispatch(
                                                modifyMail({
                                                    email: loginUser.email,
                                                    threadUid:
                                                        myThread.threadUid,
                                                    mailUid: v.mailUid,
                                                    modifyProps: {
                                                        isStarred: true,
                                                    },
                                                })
                                            );
                                            e.stopPropagation();
                                        }}
                                    >
                                        <IconButton size="small">
                                            <StarOutlineIcon className="text-gray-500" />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip
                                        title="별표편지함"
                                        onClick={(e) => {
                                            dispatch(
                                                modifyMail({
                                                    email: loginUser.email,
                                                    threadUid:
                                                        myThread.threadUid,
                                                    mailUid: v.mailUid,
                                                    modifyProps: {
                                                        isStarred: false,
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
                                )}
                                {checkBoxList[i] ||
                                mailList.length - 1 === i ? (
                                    <Tooltip
                                        title="답장"
                                        onClick={(e) => {
                                            setIsVisibleSendMail(true);
                                            e.stopPropagation();
                                        }}
                                    >
                                        <IconButton size="small">
                                            <ReplyIcon className="text-gray-500 hover:text-black" />
                                        </IconButton>
                                    </Tooltip>
                                ) : null}
                                {checkBoxList[i] ||
                                mailList.length - 1 === i ? (
                                    <Tooltip
                                        title="더보기"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <IconButton size="small">
                                            <MoreVertIcon className="text-gray-500 hover:text-black" />
                                        </IconButton>
                                    </Tooltip>
                                ) : null}
                            </div>
                        </div>
                        {checkBoxList[i] || mailList.length - 1 === i ? (
                            <div className="flex items-center -mt-2 w-max">
                                {v.receiver.map((x, indx) => {
                                    return (
                                        <span
                                            className="text-xs text-gray-500"
                                            key={indx}
                                        >
                                            {indx !== v.receiver.length - 1
                                                ? `${x.displayName}, `
                                                : `${x.displayName}에게`}
                                        </span>
                                    );
                                })}
                                <Tooltip
                                    title="세부정보 표시"
                                    onClick={(e) => {
                                        if (mailUid) {
                                            setMailUid("");
                                        } else {
                                            setMailUid(v.mailUid);
                                        }
                                        e.stopPropagation();
                                    }}
                                >
                                    <IconButton size="small">
                                        <ArrowDropDownIcon className="text-gray-500 hover:text-black" />
                                    </IconButton>
                                </Tooltip>
                                {v.mailUid === mailUid ? (
                                    <div
                                        className="relative"
                                        style={{ minWidth: 500 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <div className="border border-gray-400 py-4 pl-5 pr-7 bg-white shadow-xl absolute top-2 -left-6 z-40">
                                            <div className="flex items-center">
                                                <div
                                                    style={{
                                                        width: 70,
                                                    }}
                                                    className="text-right mr-4 text-gray-400"
                                                >
                                                    보낸사람:
                                                </div>
                                                <div className="font-semibold">
                                                    {v.sender.displayName}
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <div
                                                    style={{
                                                        width: 70,
                                                    }}
                                                    className="text-right mr-4"
                                                ></div>
                                                <div className="text-gray-600">{`<${v.sender.email}>`}</div>
                                            </div>
                                            {v.receiver.map((x, indx) => {
                                                return (
                                                    <div
                                                        className="flex items-center"
                                                        key={indx}
                                                    >
                                                        <div
                                                            style={{
                                                                width: 70,
                                                            }}
                                                            className="text-right mr-4 text-gray-400"
                                                        >
                                                            {indx === 0
                                                                ? "받는사람:"
                                                                : ""}
                                                        </div>
                                                        <div>{`${x.displayName} <${x.email}>`}</div>
                                                    </div>
                                                );
                                            })}
                                            <div className="flex items-center">
                                                <div
                                                    style={{
                                                        width: 70,
                                                    }}
                                                    className="text-right mr-4 text-gray-400"
                                                >
                                                    날짜:
                                                </div>
                                                <div>{sendTime}</div>
                                            </div>
                                            <div className="flex items-center">
                                                <div
                                                    style={{
                                                        width: 70,
                                                    }}
                                                    className="text-right mr-4 text-gray-400"
                                                >
                                                    제목:
                                                </div>
                                                <div>{v.subject}</div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        ) : null}
                        <div
                            className={`${
                                checkBoxList[i] || mailList.length - 1 === i
                                    ? "mt-0"
                                    : "-mt-1"
                            } w-max`}
                        >
                            {v.content}
                        </div>
                    </div>
                    {!isVisibleSendMail && i === mailList.length - 1 ? (
                        <div className="flex items-center space-x-4 mt-8 pl-16 pr-8 w-max">
                            <div
                                className="px-6 py-2 flex items-center space-x-2 border rounded text-gray-500 hover:bg-gray-100"
                                onClick={() => {
                                    if (v.sender.email === loginUser.email) {
                                        setReceiver(
                                            v.receiver.map((x) => {
                                                return x.email;
                                            })
                                        );
                                    } else {
                                        setReceiver([v.sender.email])
                                    }
                                    
                                    setIsVisibleSendMail(true);
                                }}
                            >
                                <ReplyIcon />
                                <span>답장</span>
                            </div>
                            <div
                                className="px-6 py-2 flex items-center space-x-2 border rounded text-gray-500 hover:bg-gray-100"
                                onClick={() => {
                                    setIsVisibleSendMail(true);
                                }}
                            >
                                <ForwardIcon />
                                <span>전달</span>
                            </div>
                        </div>
                    ) : isVisibleSendMail && i === mailList.length - 1 ? (
                        <div className="pl-16 pr-8 relative mt-8 ">
                            <span
                                className="absolute top-2"
                                style={{ left: 12 }}
                            >
                                <Image
                                    src={v.sender.profile}
                                    width="42px"
                                    height="42px"
                                    alt="profileImage"
                                    className="rounded-full"
                                />
                            </span>
                            <div
                                className="border rounded-lg p-4"
                                style={{ boxShadow: "0px 1px 1px #c1c1c1" }}
                            >
                                <div className="flex items-center">
                                    <div className="flex items-center text-gray-500">
                                        <ReplyIcon />
                                        <ArrowDropDownIcon />
                                        <div className="flex flex-auto flex-wrap items-center">
                                            {receiver.map((re) => {
                                                return (
                                                    <div
                                                        key={re}
                                                        className="flex h-5 items-center justify-center px-2 mr-1.5 text-sm text-gray-500 border rounded-full hover:bg-gray-100"
                                                    >
                                                        <span className="mr-1">
                                                            {re}
                                                        </span>
                                                        <ClearIcon
                                                            size="15px"
                                                            color="rgb(107, 114, 128)"
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                setReceiver(
                                                                    [
                                                                        ...receiver,
                                                                    ].filter(
                                                                        (v) => {
                                                                            return (
                                                                                v !==
                                                                                re
                                                                            );
                                                                        }
                                                                    )
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            })}
                                            <div className="flex-auto">
                                                <input
                                                    value={mailReceiver}
                                                    onChange={(e) =>
                                                        setMailReceiver(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) => {
                                                        if (
                                                            e.code === "Space"
                                                        ) {
                                                            handleReceiver();
                                                        }
                                                    }}
                                                    onBlur={() =>
                                                        handleReceiver()
                                                    }
                                                    className="w-full h-full text-sm outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="py-2 flex text-sm"
                                    onClick={() => {
                                        mailcontentRef.current.focus();
                                    }}
                                    style={{ cursor: "text" }}
                                >
                                    <textarea
                                        ref={mailcontentRef}
                                        className="outline-none flex-auto resize-none"
                                        value={mailcontent}
                                        onChange={(e) => {
                                            setMailcontent(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="py-3 flex absolute bottom-0 right-10 justify-end items-center">
                                <Button
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#1A73E8",
                                        borderRadius: "5px",
                                        height: "36px",
                                        color: "white",
                                    }}
                                    onClick={() => {
                                        let num = 0;
                                        if (receiver.length === 0) {
                                            alert("받는사람을 입력해 주세요.");
                                            return;
                                        } else {
                                            for (
                                                var i = 0;
                                                i < receiver.length;
                                                i++
                                            ) {
                                                num = Object.keys(
                                                    userList
                                                ).indexOf(receiver[i]);
                                                if (num === -1) {
                                                    break;
                                                }
                                            }
                                        }
                                        if (num === -1) {
                                            alert(
                                                "이메일이 존재하지 않습니다. 가입한 사용자의 메일을 입력해주세요."
                                            );
                                            return;
                                        }
                                        if (!mailcontent) {
                                            alert("메세지를 입력해주세요.");
                                            return;
                                        }
                                        dispatch(
                                            sendMail({
                                                mailSender: loginUser.email,
                                                mailReceiver: receiver,
                                                mailTitle: v.subject,
                                                mailcontent: mailcontent,
                                                userList: userList,
                                                senderThreadUid: myThread.threadUid,
                                                receiverThreadUid: myThread.receiverList[0].threadUid,
                                            })
                                        );
                                        setIsVisibleSendMail(false);
                                        setMailcontent("");
                                        alert("메일을 성공적으로 보냈습니다.");
                                    }}
                                >
                                    보내기
                                </Button>
                                <div
                                    className="w-7 h-7 flex justify-center items-center rounded text-gray-500 hover:text-black hover:bg-gray-100 ml-2 cursor-pointer"
                                    onClick={() => {
                                        setIsVisibleSendMail(false);
                                        setMailcontent("");
                                    }}
                                >
                                    <Tooltip title="임시보관 메일 삭제">
                                        <DeleteIcon style={{ fontSize: 24 }} />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            );
        });
    };
    return (
        <div>
            <Head>
                <title>{headTitle}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MailLayout
                mailOption={mailOption}
                onClick={() => {
                    setShowSortList(false);
                    setMailUid("");
                }}
            >
                {headerTool()}
                <div className="bg-white pb-8">
                    {threadTitle()}
                    <div className="overflow-y-auto max-h-mail-list">
                        {main()}
                    </div>
                </div>
            </MailLayout>
        </div>
    );
}
