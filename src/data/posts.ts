import { Post, CurrentUser } from "@/types";

export const currentUser: CurrentUser = {
  id: "user123",
  name: "Me",
  username: "me",
  profileImage: "https://picsum.photos/40/40?random=99",
  verified: false,
};

export const mockPosts: Post[] = [
  {
    id: 1,
    author: {
      id: "kimdev",
      name: "김개발",
      username: "kimdev",
      profileImage: "https://picsum.photos/40/40?random=1",
      verified: true,
    },
    content:
      "오늘 React 18의 새로운 기능들을 공부했습니다! Concurrent Features가 정말 흥미롭네요 🚀 #React #개발자 @nextjs",
    images: ["https://picsum.photos/500/300?random=1"],
    createdAt: "2024-01-15T10:30:00Z",
    likes: 42,
    retweets: 12,
    comments: 8,
    isLiked: false,
    isRetweeted: false,
  },
  {
    id: 2,
    author: {
      id: "leedesign",
      name: "이디자인",
      username: "leedesign",
      profileImage: "https://picsum.photos/40/40?random=2",
      verified: false,
    },
    content:
      "새로운 디자인 시스템을 만들고 있어요. 일관성 있는 컴포넌트 라이브러리의 중요성을 다시 한번 느낍니다 ✨",
    images: [],
    createdAt: "2024-01-15T09:15:00Z",
    likes: 28,
    retweets: 5,
    comments: 3,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 3,
    author: {
      id: "parkpm",
      name: "박프로젝트매니저",
      username: "parkpm",
      profileImage: "https://picsum.photos/40/40?random=3",
      verified: false,
    },
    content:
      "애자일 스프린트를 성공적으로 마쳤습니다! 팀워크의 힘을 다시 한번 느껴요 💪 #애자일 #스크럼 @팀장님",
    images: ["https://picsum.photos/500/300?random=3"],
    createdAt: "2024-01-15T08:45:00Z",
    likes: 15,
    retweets: 3,
    comments: 2,
    isLiked: false,
    isRetweeted: true,
  },
  {
    id: 4,
    author: {
      id: "choiux",
      name: "최유엑스",
      username: "choiux",
      profileImage: "https://picsum.photos/40/40?random=4",
      verified: true,
    },
    content:
      "사용자 중심 디자인의 중요성에 대해 생각해봤어요. 기능보다 사용성이 우선이죠! 🎨",
    images: [],
    createdAt: "2024-01-15T07:30:00Z",
    likes: 67,
    retweets: 18,
    comments: 12,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 5,
    author: {
      id: "jungdev",
      name: "정백엔드",
      username: "jungdev",
      profileImage: "https://picsum.photos/40/40?random=5",
      verified: false,
    },
    content:
      "Node.js 최신 버전으로 마이그레이션 완료! 성능이 20% 향상되었네요 🚀",
    images: ["https://picsum.photos/500/300?random=5"],
    createdAt: "2024-01-14T16:20:00Z",
    likes: 89,
    retweets: 25,
    comments: 7,
    isLiked: false,
    isRetweeted: false,
  },
  {
    id: 6,
    author: {
      id: "limqa",
      name: "임큐에이",
      username: "limqa",
      profileImage: "https://picsum.photos/40/40?random=6",
      verified: false,
    },
    content:
      "테스트 커버리지 95% 달성! 버그 없는 안정적인 서비스를 만들어가고 있어요 ✅ #테스트 #품질 #QA @개발팀",
    images: [],
    createdAt: "2024-01-14T15:10:00Z",
    likes: 34,
    retweets: 8,
    comments: 4,
    isLiked: true,
    isRetweeted: true,
  },
  {
    id: 7,
    author: {
      id: "handata",
      name: "한데이터",
      username: "handata",
      profileImage: "https://picsum.photos/40/40?random=7",
      verified: true,
    },
    content:
      "머신러닝 모델 정확도 92% 달성! 데이터의 힘을 다시 한번 느꼈습니다 📊 #머신러닝 #데이터사이언스",
    images: ["https://picsum.photos/500/300?random=7"],
    createdAt: "2024-01-14T14:05:00Z",
    likes: 156,
    retweets: 43,
    comments: 19,
    isLiked: false,
    isRetweeted: false,
  },
  {
    id: 8,
    author: {
      id: "godevops",
      name: "고데브옵스",
      username: "godevops",
      profileImage: "https://picsum.photos/40/40?random=8",
      verified: false,
    },
    content:
      "Docker와 Kubernetes를 활용한 마이크로서비스 아키텍처 구축 완료! 🐳 ⚡ #DevOps #Container",
    images: [],
    createdAt: "2024-01-14T13:30:00Z",
    likes: 78,
    retweets: 22,
    comments: 9,
    isLiked: true,
    isRetweeted: false,
  },
  {
    id: 9,
    author: {
      id: "shinmobile",
      name: "신모바일",
      username: "shinmobile",
      profileImage: "https://picsum.photos/40/40?random=9",
      verified: false,
    },
    content:
      "React Native로 크로스플랫폼 앱 개발 중이에요. 네이티브 성능에 근접한 결과가 나와서 만족스럽네요! 📱",
    images: ["https://picsum.photos/500/300?random=9"],
    createdAt: "2024-01-14T12:15:00Z",
    likes: 45,
    retweets: 11,
    comments: 6,
    isLiked: false,
    isRetweeted: true,
  },
  {
    id: 10,
    author: {
      id: "seosecurity",
      name: "서보안",
      username: "seosecurity",
      profileImage: "https://picsum.photos/40/40?random=10",
      verified: true,
    },
    content:
      "웹 보안 감사 결과 모든 취약점 해결 완료! 안전한 서비스 운영의 기반이 마련되었습니다 🔒 #보안 #웹보안",
    images: [],
    createdAt: "2024-01-14T11:40:00Z",
    likes: 92,
    retweets: 27,
    comments: 14,
    isLiked: true,
    isRetweeted: false,
  },
];

const generateMorePosts = (): Post[] => {
  const additionalPosts: Post[] = [];
  let currentId = 11;

  for (let i = 0; i < 5; i++) {
    mockPosts.forEach((post) => {
      additionalPosts.push({
        ...post,
        id: currentId++,
        createdAt: new Date(
          new Date(post.createdAt).getTime() -
            i * 24 * 60 * 60 * 1000 -
            Math.random() * 12 * 60 * 60 * 1000
        ).toISOString(),
        likes: post.likes + Math.floor(Math.random() * 50),
        retweets: post.retweets + Math.floor(Math.random() * 20),
        comments: post.comments + Math.floor(Math.random() * 10),
      });
    });
  }

  return additionalPosts;
};

const allPosts = [...mockPosts, ...generateMorePosts()];

export const fetchPosts = async (page = 1, limit = 10): Promise<Post[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 로딩 시뮬레이션
  const start = (page - 1) * limit;
  const end = start + limit;
  return allPosts.slice(start, end);
};

export const toggleLike = async (
  postId: number
): Promise<{ success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { success: true };
};

export const toggleRetweet = async (
  postId: number
): Promise<{ success: boolean }> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { success: true };
};

export const createPost = async (
  content: string,
  images: string[]
): Promise<Post> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newPost: Post = {
    id: Date.now(),
    author: currentUser,
    content,
    images,
    createdAt: new Date().toISOString(),
    likes: 0,
    retweets: 0,
    comments: 0,
    isLiked: false,
    isRetweeted: false,
  };
  return newPost;
};
