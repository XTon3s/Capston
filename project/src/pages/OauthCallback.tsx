import { useEffect, useState } from 'react';

function OauthCallback() {
  const [accessToken, setAccessToken] = useState('');
  const [userInfo, setUserInfo] = useState<any>(null);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [likedVideos, setLikedVideos] = useState<any[]>([]);

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
      fetch('https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=20', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setSubscriptions(data.items || []));

      // 좋아요한 영상 요청
      fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&myRating=like&maxResults=10', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setLikedVideos(data.items || []));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">OAuth 인증 완료 🎉</h1>

      {userInfo && (
        <div className="mb-8">
          <img src={userInfo.picture} alt="Profile" className="rounded-full w-24 h-24 mx-auto mb-4" />
          <p className="text-lg font-medium">👤 {userInfo.name}</p>
          <p className="text-sm text-gray-600">📧 {userInfo.email}</p>
        </div>
      )}

      <div className="mb-10 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-3">📺 구독 중인 채널</h2>
        <ul className="list-disc text-left ml-6 space-y-1">
          {subscriptions.length > 0 ? (
            subscriptions.map((sub, index) => (
              <li key={index}>{sub.snippet.title}</li>
            ))
          ) : (
            <p className="text-gray-500">구독 채널이 없습니다.</p>
          )}
        </ul>
      </div>

      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-3">👍 좋아요한 영상</h2>
        <ul className="list-disc text-left ml-6 space-y-1">
          {likedVideos.length > 0 ? (
            likedVideos.map((video, index) => (
              <li key={index}>{video.snippet.title}</li>
            ))
          ) : (
            <p className="text-gray-500">좋아요한 영상이 없습니다.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default OauthCallback;
