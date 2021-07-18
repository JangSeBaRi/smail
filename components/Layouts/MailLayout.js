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
                style={{ height: 65 }}
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
                    {loginUser.profileImageUrl && (
                        <span
                            className={`h-10 w-10 rounded-full flex justify-center items-center relative ${
                                showUserInf ? "bg-gray-300" : "bg-white"
                            }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowUserInf((prev) => !prev);
                            }}
                        >
                            <IconButton size="small">
                                <Image
                                    src={loginUser.profileImageUrl}
                                    width="35px"
                                    height="35px"
                                    alt="profileImage"
                                    className="rounded-full"
                                />
                                {showUserInf && (
                                    <div className="absolute top-11 -right-2 pt-5 pb-3 border bg-white rounded-md z-30 w-72 flex flex-col items-center">
                                        <Image
                                            src={loginUser.profileImageUrl}
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
                            className={`w-11/12 pl-7 rounded-r-full py-1.5 flex items-center hover:bg-gray-100 ${
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
                style={{ minWidth: 55 }}
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
                style={{ minWidth: 540, minHeight: 500, right: 70 }}
            >
                <div
                    className="w-full  flex justify-between items-center pl-4 pr-2 py-2 rounded-t-lg"
                    style={{ backgroundColor: "#404040" }}
                >
                    <div className="text-white text-sm">새 메일</div>
                    <div className="flex items-center">
                        <div className="w-6 h-6 flex justify-center items-center text-gray-400 hover:text-white hover:bg-gray-500">
                            <Tooltip title="최소화">
                                <MinimizeIcon
                                    style={{
                                        fontSize: 20,
                                    }}
                                />
                            </Tooltip>
                        </div>
                        <div className="w-6 h-6 flex justify-center items-center text-gray-400 hover:text-white hover:bg-gray-500">
                            <Tooltip title="전체 화면으로 보기">
                                <ZoomOutMapIcon
                                    style={{
                                        fontSize: 17,
                                    }}
                                />
                            </Tooltip>
                        </div>
                        <div
                            className="w-6 h-6 flex justify-center items-center text-gray-400 hover:text-white hover:bg-gray-500"
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
                    <div className="py-2 flex border-b text-sm">
                        <span className="text-gray-500">받는사람</span>
                        <input
                            type="text"
                            className="outline-none placeholder-gray-500 flex-auto ml-2"
                            value={mailReceiver}
                            onChange={(e) => {
                                setMailReceiver(e.target.value);
                            }}
                        />
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
                                dispatch(createNewThread({
                                    mailSender: loginUser.email,
                                    mailReceiver: mailReceiver.split(" "),
                                    mailTitle: mailTitle,
                                    mailcontent: mailcontent,
                                    userList: userList
                                }));
                                setShowNewMail(false);
                                setMailReceiver("");
                                setMailTitle("");
                                setMailcontent("");
                                alert("메일을 성공적으로 보냈습니다.");
                            }}
                        >
                            보내기
                        </Button>
                        <div
                            className="w-7 h-7 flex justify-center items-center rounded text-gray-500 hover:text-black hover:bg-gray-100 ml-2"
                            onClick={() => {
                                setShowNewMail(false);
                                setMailReceiver("");
                                setMailTitle("");
                                setMailcontent("");
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
            className="w-screen h-screen overflow-y-hidden"
            onClick={() => {
                setShowUserInf(false);
                onClick();
            }}
        >
            {header()}
            <div className="flex flex-1 min-h-screen">
                {leftPanel()}
                <div className="flex-auto">{children}</div>
                {rightPanel()}
            </div>
            {showNewMail && newMail()}
        </div>
    );
};

export default MailLayout;
