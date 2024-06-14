import { useRouter } from "next/router";
import axios from "../api/axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthProviderProps = {
  children: ReactNode;
};

type UserType = {
  id: number;
  nickname: string;
  image: File;
  createdAt: Date;
  updateAt: Date;
  email: string;
};

type valuesType = { user: UserType | null; isPending: Boolean };

type ContextPropsType = {
  user: UserType | null;
  isPending: Boolean;
  // login: ({ email, password }: { email: string; password: string }) => void;
  login: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
  // updateMe: () => void;
};

const AuthContext = createContext<ContextPropsType>({
  user: null,
  isPending: true,
  login: () => {},
  logout: () => {},
  // updateMe: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [values, setValues] = useState<valuesType>({
    user: null,
    isPending: true,
  });

  async function getMe() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: false,
    }));

    let nextUser: UserType;

    try {
      const res = await axios.get("/users/me");
      nextUser = res.data;
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const res = await axios.post("/auth/signIn", {
      email,
      password,
    });
    localStorage.setItem("accessToken", res.data.accessToken);
    // await getMe();
  }

  async function logout() {
    /** @TODO 로그아웃 구현하기*/
    await axios.delete("/auth/logout");
    setValues((prevValues) => ({
      ...prevValues,
      user: null,
    }));
  }

  // async function updateMe(formData) {
  //   const res = await axios.patch("/users/me", formData);
  //   const nextUser = res.data;
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     user: nextUser,
  //   }));
  // }

  // useEffect(() => {
  //   getMe();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        logout,
        // updateMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required: boolean) {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (required && !context.user && !context.isPending) {
      router.push("/signin");
    }
  }, [context.user, context.isPending, router, required]);

  return context;
}