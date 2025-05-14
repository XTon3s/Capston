import { useEffect, useState } from 'react';

function OauthCallback() {
  const [accessToken, setAccessToken] = useState('');
  const [userInfo, setUserInfo] = useState<any>(null);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const token = params.get('access_token');

    if (token) {
      setAccessToken(token);

      // 사용자 정보 요청
      fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setUserInfo(data));

      // 유튜브 구독 목록 요청
      fetch('https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setSubscriptions(data.items || []));
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">OAuth 인증 완료 🎉</h1>
      {userInfo && (
        <div className="mb-6">
          <p><strong>이름:</strong> {userInfo.name}</p>
          <p><strong>이메일:</strong> {userInfo.email}</p>
          <img src={userInfo.picture} alt="Profile" className="rounded-full w-24 h-24 mt-2" />
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">구독 중인 유튜브 채널</h2>
      <ul className="list-disc ml-6">
        {subscriptions.map((sub, index) => (
          <li key={index}>{sub.snippet.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default OauthCallback;
