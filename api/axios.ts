import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

instance.interceptors.request.use((config) => {
  // localStorage를 못 찾는 이유와 해결 방안을 알고 싶습니다.
  // addboard/[id]에 접근할 때마다 Not Found 페이지로 이동하여
  // 삽질을 3시간 이상해보고, 에러를 확인해보니 localStorage를 못 찾는다는
  // 에러 메시지를 찾게 되었고, 다른 localStorage를 건들여봐도 똑같아,
  // 하기 부분을 주석 처리하니, 정상적으로 동작이 됩니다.
  // 스택 버퍼오버플로우 (https://stackoverflow.com/questions/65801026/localstorage-not-defined-using-axios-interceptor-in-nextjs)에 따르면
  // SWR 문제라고 하며, 다른 예제를 살펴보면 제가 작성한 코드와 큰 변동 사항이 없어 (잘못된 예제를 본 것일지도 모르네요... )
  // 왜 못 찾는지 알고 싶습니다.

  // let token = localStorage?.getItem("accessToken");
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  return config;
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      const res = await instance.post("/auth/refresh-token", {
        refreshToken: localStorage.getItem("accessToken"),
      });
      localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
      originalRequest._retry = true;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
