import axios from 'axios';
import { useRouter } from 'vue-router';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true, // 쿠키를 포함하여 서버에 요청 보냄
});

const router = useRouter();

// Axios 응답 인터셉터 설정
api.interceptors.response.use(
  response => {
    return response; // 응답 성공 시 그대로 반환
  },
  async error => {
    const originalRequest = error.config;

    // 401 오류(Access Token 만료) 처리
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재발급 시도 플래그 설정

      // Refresh Token을 쿠키에서 가져오기
      const refreshToken = getRefreshTokenFromCookie();
      if (refreshToken) {
        try {
          // Access Token 재발급 요청
          const res = await axios.post('http://localhost:8080/api/users/reissue', null, {
            headers: {
              'Authorization': `Bearer ${refreshToken}`, // Refresh Token을 헤더에 추가
            },
            withCredentials: true, // 쿠키와 함께 요청
          });

          // 새로 발급받은 Access Token 저장
          const newAccessToken = res.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          // 원래의 요청에 새로운 Access Token을 넣어서 재시도
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (reissueError) {
          // Refresh Token이 만료되었거나 오류가 발생한 경우
          console.error('Token reissue failed:', reissueError);
          router.push('/login'); // 로그인 페이지로 리다이렉트
        }
      } else {
        // Refresh Token이 없으면 로그인 페이지로 리다이렉트
        router.push('/login');
      }
    }
    return Promise.reject(error); // 다른 에러는 그대로 반환
  }
);

// Refresh Token을 쿠키에서 가져오는 함수
const getRefreshTokenFromCookie = () => {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('refreshToken=')); // 쿠키 이름이 'refreshToken'일 때 찾기
  return cookieValue ? cookieValue.split('=')[1] : null; // 쿠키 값 반환
};

export default api;
