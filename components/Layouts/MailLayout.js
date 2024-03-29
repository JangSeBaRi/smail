import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

import { Tooltip, IconButton, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import TuneIcon from "@material-ui/icons/Tune";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import AppsIcon from "@material-ui/icons/Apps";
import InboxIcon from "@material-ui/icons/Inbox";
import StarIcon from "@material-ui/icons/Star";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import SendIcon from "@material-ui/icons/Send";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DeleteIcon from "@material-ui/icons/Delete";
import { useRouter } from "next/router";
import { logout } from "../../reducers/store/user";
import MinimizeIcon from "@material-ui/icons/Minimize";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import { createNewThread } from "../../reducers/store/mailThread";
import { CallReceived } from "@material-ui/icons";

const MailLayout = ({ children, onClick, mailOption }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const loginUser = useSelector(({ user }) => user.loginUser);
    const userList = useSelector(({ user }) => user.userList);
    const inputRef = useRef();
    const mailcontentRef = useRef();
    const [leftPanelWidth, setLeftPanelWidth] = useState(256);
    const [searchValue, setSearchValue] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [showUserInf, setShowUserInf] = useState(false);
    const [showNewMail, setShowNewMail] = useState(false);
    const [mailReceiver, setMailReceiver] = useState("");
    const [mailTitle, setMailTitle] = useState("");
    const [mailcontent, setMailcontent] = useState("");
    const [receiver, setReceiver] = useState([]);

    const resizeHeight = () => {
        if (showNewMail) {
            if (mailcontentRef === null || mailcontentRef.current === null) {
                return;
            }
            mailcontentRef.current.style.height = 10 + "px";
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
    }, [mailcontent]);

    const leftPanelOption = [
        {
            label: "받은편지함",
            uid: "inbox",
            icon: <InboxIcon style={{ color: "#5f6368" }} />,
        },
        {
            label: "별표편지함",
            uid: "starred",
            icon: <StarIcon style={{ color: "#5f6368" }} />,
        },
        {
            label: "중요편지함",
            uid: "important",
            icon: <LabelImportantIcon style={{ color: "#5f6368" }} />,
        },
        {
            label: "보낸편지함",
            uid: "sent",
            icon: <SendIcon style={{ color: "#5f6368" }} />,
        },
        {
            label: "임시보관함",
            uid: "drafts",
            icon: <InsertDriveFileIcon style={{ color: "#5f6368" }} />,
        },
        {
            label: "휴지통",
            uid: "delete",
            icon: <DeleteIcon style={{ color: "#5f6368" }} />,
        },
    ];

    const rightPanelOption = [
        {
            label: "캘린더",
            src: "/google-calender.png",
        },
        {
            label: "Keeps",
            src: "/google-keep.png",
        },
        {
            label: "Tasks",
            src: "/google-tasks.png",
        },
        {
            label: "연락처",
            src: "/google-contacts.png",
        },
    ];

    const header = () => {
        return (
            <div
                className="flex items-center border-b px-2 w-full"
                style={{
                    borderBottom: "1px solid #bfbfbf",
                    height: 65,
                }}
            >
                <div className="flex items-center" style={{ minWidth: 250 }}>
                    <Tooltip
                        title="기본 메뉴"
                        style={{ marginRight: 5 }}
                        onClick={() => {
                            if (leftPanelWidth === 256) {
                                setLeftPanelWidth("auto");
                            } else if (leftPanelWidth === "auto") {
                                setLeftPanelWidth(256);
                            }
                        }}
                    >
                        <IconButton size="medium">
                            <MenuIcon
                                style={{
                                    color: "#5F6368",
                                    // fontSize: "45px",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Image
                        src={"/mailIcon.png"}
                        width="36px"
                        height="28px"
                        alt="mailIcon"
                    />
                    <span
                        style={{
                            color: "#5f6368",
                            fontSize: 22,
                            letterSpacing: -1,
                        }}
                        className="ml-4 font-serif font-medium"
                    >
                        Smail
                    </span>
                </div>
                <div className="flex-auto">
                    <div
                        className={`flex rounded-lg items-center justify-between px-3.5 py-2.5 ${
                            isFocus && "border"
                        }`}
                        style={{
                            maxWidth: 800,
                            transition: "all 0.1s linear",
                            boxShadow: isFocus && "0px 1px 1px #eeeeee",
                            backgroundColor: isFocus ? "white" : "#F1F3F4",
                        }}
                    >
                        <div className="flex flex-auto items-center">
                            <Tooltip title="검색">
                                <IconButton size="small">
                                    <SearchIcon
                                        style={{
                                            color: "#5F6368",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="메일 검색"
                                className=" w-full bg-transparent outline-none px-2 "
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                                onFocus={() => {
                                    setIsFocus(true);
                                }}
                                onBlur={() => {
                                    setIsFocus(false);
                                }}
                            />
                        </div>
                        <div className="flex">
                            {searchValue && (
                                <Tooltip
                                    title="검색어 지우기"
                                    onClick={() => {
                                        setSearchValue("");
                                        inputRef.current.focus();
                                    }}
                                >
                                    <IconButton size="small">
                                        <ClearIcon
                                            style={{
                                                color: "#5F6368",
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            )}
                            <Tooltip title="검색옵션 표시">
                                <IconButton size="small">
                                    <TuneIcon
                                        style={{
                                            color: "#5F6368",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className="flex items-center pl-6 pr-2">
                    <Tooltip title="지원" style={{ marginRight: 15 }}>
                        <IconButton size="small">
                            <HelpOutlineOutlinedIcon
                                style={{
                                    color: "#5F6368",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="설정" style={{ marginRight: 15 }}>
                        <IconButton size="small">
                            <SettingsOutlinedIcon
                                style={{
                                    color: "#5F6368",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Segle 앱" style={{ marginRight: 10 }}>
                        <IconButton size="small">
                            <AppsIcon
                                style={{
                                    color: "#5F6368",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    {loginUser.profile && (
                        <span
                            className={`h-10 w-10 rounded-full flex justify-center items-center relative ${
                                showUserInf ? "bg-gray-300" : "bg-transparent"
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowUserInf((prev) => !prev);
                            }}
                        >
                            <IconButton size="small">
                                <Image
                                    src={loginUser.profile}
                                    width="35px"
                                    height="35px"
                                    alt="profileImage"
                                    className="rounded-full"
                                />
                                {showUserInf && (
                                    <div className="absolute top-11 -right-2 pt-5 pb-3 border bg-white rounded-md z-30 w-72 flex flex-col items-center">
                                        <Image
                                            src={loginUser.profile}
                                            width="70px"
                                            height="70px"
                                            alt="profileImage"
                                            className="rounded-full"
                                        />
                                        <p className="text-sm mt-3 text-black">
                                            {loginUser.displayName}
                                        </p>
                                        <p className="text-sm text-gray-500 -mt-1">
                                            {loginUser.email}
                                        </p>
                                        <div className="border-t w-full my-3"></div>
                                        <div
                                            className="border rounded text-xs text-black px-5 py-2 hover:bg-gray-100"
                                            onClick={() => {
                                                router.push("/");
                                                dispatch(logout());
                                            }}
                                        >
                                            로그아웃
                                        </div>
                                        <div className="border-t w-full my-3"></div>
                                        <p className="text-xs text-gray-500">
                                            개인정보처리방침 • 서비스 약관
                                        </p>
                                    </div>
                                )}
                            </IconButton>
                        </span>
                    )}
                </div>
            </div>
        );
    };

    const leftPanel = () => {
        return (
            <div style={{ minWidth: 256 }}>
                <div className="pl-2 my-4">
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: "white",
                            borderRadius: "9999px",
                            height: "48px",
                        }}
                        onClick={(e) => {
                            setShowNewMail(true);
                            e.stopPropagation();
                        }}
                    >
                        <Image
                            src="/mailComposeIcon.png"
                            height="32px"
                            width="32px"
                            alt="mailComposeIcon"
                            className="rounded-full"
                        />
                        <span className="pr-3 ml-2 text-gray-600">
                            편지쓰기
                        </span>
                    </Button>
                </div>
                {leftPanelOption.map(({ label, uid, icon }, i) => {
                    return (
                        <div
                            className={`w-11/12 pl-7 rounded-r-full py-1.5 flex items-center cursor-pointer hover:bg-gray-100 ${
                                mailOption === uid
                                    ? "bg-gray-200 hover:bg-gray-200"
                                    : ""
                            }`}
                            onClick={() => {
                                router.push(`/mail/${uid}`);
                            }}
                            key={uid}
                        >
                            {icon}
                            <span className="pr-3 ml-2 text-gray-600">
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const rightPanel = () => {
        return (
            <div
                className="flex flex-col items-center py-2 space-y-2 border-l"
                style={{
                    borderLeft: "1px solid #bfbfbf",
                    minWidth: 55,
                }}
            >
                {rightPanelOption.map(({ label, src }, i) => {
                    return (
                        <Tooltip title={label} key={i}>
                            <IconButton size="medium" label={label}>
                                <Image
                                    src={src}
                                    width="20px"
                                    height="20px"
                                    alt="icon"
                                    className="z-20"
                                />
                            </IconButton>
                        </Tooltip>
                    );
                })}
            </div>
        );
    };

    const newMail = () => {
        return (
            <div
                className="absolute rounded-t-lg bottom-0 border shadow-2xl bg-white"
                onClick={(e) => {
                    e.stopPropagation();
                }}
                style={{ width: 540, minHeight: 500, right: 70 }}
            >
                <div
                    className="w-full  flex justify-between items-center pl-4 pr-2 py-2 rounded-t-lg"
                    style={{ backgroundColor: "#404040" }}
                >
                    <div className="text-white text-sm">새 메일</div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 flex justify-center items-center text-gray-400 hover:text-white hover:bg-gray-500 cursor-pointer">
                            <Tooltip title="최소화">
                                <MinimizeIcon
                                    style={{
                                        fontSize: 20,
                                    }}
                                />
                            </Tooltip>
                        </div>
                        <div className="w-6 h-6 flex justify-center items-center text-gray-400 hover:text-white hover:bg-gray-500 cursor-pointer">
                            <Tooltip title="전체 화면으로 보기">
                                <ZoomOutMapIcon
                                    style={{
                                        fontSize: 17,
                                    }}
                                />
                            </Tooltip>
                        </div>
                        <div
                            className="w-6 h-6 flex justify-center items-center text-gray-400 hover:text-white hover:bg-gray-500 cursor-pointer"
                            onClick={(e) => {
                                setShowNewMail((prev) => !prev);
                                e.stopPropagation();
                            }}
                        >
                            <Tooltip title="저장 및 닫기">
                                <ClearIcon
                                    style={{
                                        fontSize: 17,
                                    }}
                                />
                            </Tooltip>
                        </div>
                    </div>
                </div>

                <div className="px-4 flex flex-col">
                    <div className="flex py-2 items-center border-b">
                        <span
                            className="mr-2 text-sm text-gray-500"
                            style={{ minWidth: 60 }}
                        >
                            받는사람
                        </span>
                        <div className="flex flex-auto flex-wrap items-center">
                            {receiver.map((re) => {
                                return (
                                    <div
                                        key={re}
                                        className="flex h-5 items-center justify-center px-2 mr-1.5 text-sm text-gray-500 border rounded-full hover:bg-gray-100"
                                    >
                                        <span className="mr-1">{re}</span>
                                        <ClearIcon
                                            size="15px"
                                            color="rgb(107, 114, 128)"
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setReceiver(
                                                    [...receiver].filter(
                                                        (v) => {
                                                            return v !== re;
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
                                        setMailReceiver(e.target.value)
                                    }
                                    onKeyPress={(e) => {
                                        if (e.code === "Space") {
                                            handleReceiver();
                                        }
                                    }}
                                    onBlur={() => handleReceiver()}
                                    className="w-full h-full text-sm outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="py-2 flex border-b text-sm">
                        <input
                            type="text"
                            placeholder="제목"
                            className="outline-none placeholder-gray-500 flex-auto"
                            value={mailTitle}
                            onChange={(e) => {
                                setMailTitle(e.target.value);
                            }}
                        />
                    </div>
                    <div
                        className="py-2 flex text-xs pb-16"
                        style={{
                            minHeight: 280,
                        }}
                        onClick={() => {
                            mailcontentRef.current.focus();
                        }}
                    >
                        <textarea
                            ref={mailcontentRef}
                            className="outline-none flex-auto resize-none"
                            value={mailcontent}
                            onChange={(e) => {
                                setMailcontent(e.target.value);
                            }}
                            style={{ maxHeight: 500 }}
                        />
                    </div>
                    <div
                        className="py-3 flex absolute bottom-0 justify-end items-center"
                        style={{ width: "93%" }}
                    >
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
                                    for (var i = 0; i < receiver.length; i++) {
                                        num = Object.keys(userList).indexOf(
                                            receiver[i]
                                        );
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
                                if (!mailTitle) {
                                    alert("제목을 입력해주세요.");
                                    return;
                                }
                                if (!mailcontent) {
                                    alert("메세지를 입력해주세요.");
                                    return;
                                }
                                dispatch(
                                    createNewThread({
                                        mailSender: loginUser.email,
                                        mailReceiver: receiver,
                                        mailTitle: mailTitle,
                                        mailcontent: mailcontent,
                                        userList: userList,
                                    })
                                );
                                setShowNewMail(false);
                                setMailReceiver("");
                                setMailTitle("");
                                setMailcontent("");
                                setReceiver([]);
                                alert("메일을 성공적으로 보냈습니다.");
                            }}
                        >
                            보내기
                        </Button>
                        <div
                            className="w-7 h-7 flex justify-center items-center rounded text-gray-500 hover:text-black hover:bg-gray-100 ml-2 cursor-pointer"
                            onClick={() => {
                                setShowNewMail(false);
                                setMailReceiver("");
                                setMailTitle("");
                                setMailcontent("");
                                setReceiver([]);
                            }}
                        >
                            <Tooltip title="임시보관 메일 삭제">
                                <DeleteIcon style={{ fontSize: 24 }} />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        //bg-background
        <div
            className="flex flex-col w-screen max-h-screen min-h-screen bg-cover bg-background"
            onClick={() => {
                setShowUserInf(false);
                onClick();
            }}
        >
            {header()}
            <div className="flex flex-1">
                {leftPanel()}
                <div className="flex flex-col flex-auto overflow-y-auto min-h-list">
                    {children}
                </div>
                {rightPanel()}
            </div>
            {showNewMail && newMail()}
        </div>
    );
};

export default MailLayout;
