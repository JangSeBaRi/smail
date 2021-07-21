import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Image from "next/image";
import CircularProgress from "@material-ui/core/CircularProgress";
import { setUserList } from "../reducers/store/user";
import { setThreadList } from "../reducers/store/mailThread";
import { initialUserList, initialThreadList } from "../lib/api";

const Home = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const loginUser = useSelector(({ user }) => user.loginUser);
    const delay = (ms) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    };

    useEffect(() => {
        (async () => {
            if (!loginUser.email) {
                await delay(500);
                router.push("/login");
            } else {
                await delay(500);
                router.push("/mail/inbox");
            }
        })();
    }, []);

    const userList = useSelector(({ user }) => user.userList);
    const threadList = useSelector(({ mailThread }) => mailThread.threadList);

    // useEffect(() => {
    //     dispatch(setThreadList({ ...initialThreadList() }));
    // }, [dispatch, userList, threadList]);

    // useEffect(() => {
    //     console.log('userList')
    //     console.log(userList)
    //     console.log('threadList')
    //     console.log(threadList)
    // },[])

    return (
        <div>
            <Head>
                <title>Smail</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex justify-center items-center w-screen min-h-screen">
                <div className="text-center">
                    <div>
                        <CircularProgress />
                    </div>
                    <div>
                        <Image
                            src={"/mailIcon.png"}
                            width="200px"
                            height="125px"
                            alt="mailIcon"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
