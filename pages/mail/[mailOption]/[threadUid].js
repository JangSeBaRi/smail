import Head from "next/head";
import { useEffect, useState } from "react";
import MailLayout from "../../../components/Layouts/MailLayout";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

export default function Mail() {
    const router = useRouter();
    const [mailOption, setMailOption] = useState("");
    const [headTitle, setHeadTitle] = useState("Smail");
    const [showSortList, setShowSortList] = useState(false);
    const [mailList, setMailList] = useState([]);
    const loginUser = useSelector(({ user }) => user.loginUser);
    const threadList = useSelector(({ mailThread }) => mailThread.threadList);

    useEffect(() => {
        setMailOption(router.query.mailOption);
    }, [router.query.mailOption]);

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
    }, [threadList, router.query.mailOption]);

    useEffect(() => {
        if (mailList.length === 0) {
            return;
        }
        setHeadTitle(`${mailList[0].subject} - 
        ${loginUser.email} -Segle 
        mail.segle.com`);
    }, [mailList]);

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
                }}
            >
                오우
            </MailLayout>
        </div>
    );
}
