import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoginUser } from "../reducers/store/user";
const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userList = useSelector(({ user }) => user.userList);
    const loginUser = useSelector(({ user }) => user.loginUser);

    useEffect(() => {
        if (loginUser.email) {
            router.push("/");
        }
    }, []);

    const login = (uid) => {
        dispatch(setLoginUser(userList[uid]));
        router.push("/");
    };

    return (
        <div>
            <Head>
                <title>Smail</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex items-center justify-center bg-white w-screen min-h-screen">
                <div
                    className="px-10 pt-12 rounded-md border bg-white border-gray-300"
                    style={{ width: "448px", paddingBottom: 150 }}
                >
                    <div className="text-center font-semibold text-2xl">
                        <span className="text-blue-500">S</span>
                        <span className="text-red-500">e</span>
                        <span className="text-yellow-400">g</span>
                        <span className="text-green-500">l</span>
                        <span className="text-red-500">e</span>
                    </div>
                    <div className="text-center text-2xl mt-3">계정 선택</div>
                    <div className="mt-5">
                        {Object.keys(userList).map((uid) => {
                            const { displayName, email, profileImageUrl } =
                                userList[uid];
                            return (
                                <div key={uid} className="-mt-1">
                                    <div
                                        className="flex items-center mt-1 -mx-10 px-10 hover:bg-blue-50 py-2"
                                        onClick={() => login(uid)}
                                    >
                                        <Image
                                            src={profileImageUrl}
                                            height="30px"
                                            width="30px"
                                            alt="profileImage"
                                            className="rounded-full"
                                        />
                                        <div className="ml-3 ">
                                            <p className="text-md text-gray-600">
                                                {displayName}
                                            </p>
                                            <p className="text-sm text-gray-500 -mt-1">
                                                {email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border-b"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
