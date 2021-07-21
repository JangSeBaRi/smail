import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import MailLayout from "../../../components/Layouts/MailLayout";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
    modifyMail,
    modifyThread,
    deleteThread,
} from "../../../reducers/store/mailThread";
import { Tooltip, IconButton } from "@material-ui/core";
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

export default function Mail() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [mailOption, setMailOption] = useState("");
    const [headTitle, setHeadTitle] = useState("Smail");
    const [showSortList, setShowSortList] = useState(false);
    const [myThread, setMyThread] = useState({});
    const [mailList, setMailList] = useState([]);
    const [mailUid, setMailUid] = useState("");
    const [checkBoxList, setCheckBoxList] = useState([]);

    const loginUser = useSelector(({ user }) => user.loginUser);
    const threadList = useSelector(({ mailThread }) => mailThread.threadList);

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
            <div className="flex py-2 px-3 items-center justify-start border-b space-x-4">
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
                    <div className="flex items-center justify-between pt-2 pl-16 pr-8">
                        <div className="flex items-center">
                            <span className="text-2xl">{v.subject}</span>
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
                    <div
                        className="py-5 pl-16 mr-8 border-b flex flex-col"
                        onClick={() => {
                            const cp = [...checkBoxList];
                            cp[i] = !cp[i];
                            setCheckBoxList(cp);
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 relative">
                                <span className="absolute top-0 -left-14">
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
                                {checkBoxList[i] ? (
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
                                {checkBoxList[i] ? (
                                    <Tooltip
                                        title="답장"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <IconButton size="small">
                                            <ReplyIcon className="text-gray-500 hover:text-black" />
                                        </IconButton>
                                    </Tooltip>
                                ) : null}
                                {checkBoxList[i] ? (
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
                        {checkBoxList[i] ? (
                            <div className="flex items-center">
                                {v.receiver.map((x, indx) => {
                                    return (
                                        <span className="text-xs text-gray-500" key={indx}>
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
                                    >
                                        <div className="border border-gray-400 py-4 pl-5 pr-7 bg-white shadow-xl absolute top-2 -left-6">
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
                                                    <div className="flex items-center" key={indx}>
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
                        <div className="mt-2">{v.content}</div>
                    </div>
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
                {main()}
            </MailLayout>
        </div>
    );
}
