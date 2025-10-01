"use client";

import { useState, useEffect, useCallback } from "react";
import { Edit } from "lucide-react";
import PostCard from "@/components/PostCard";
import ComposeModal from "@/components/ComposeModal";
import { Post } from "@/types";
import {
  fetchPosts,
  toggleLike,
  toggleRetweet,
  createPost,
} from "@/data/posts";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    loadInitialPosts();
  }, []);

  const loadInitialPosts = async () => {
    try {
      const initialPosts = await fetchPosts(1, 10);
      setPosts(initialPosts);
      setPage(2);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const morePosts = await fetchPosts(page, 10);
      if (morePosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...morePosts]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to load more posts:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [page, loadingMore, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMorePosts, lastScrollY]);

  const handleLike = async (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );

    try {
      await toggleLike(postId);
    } catch (error) {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes + 1 : post.likes - 1,
              }
            : post
        )
      );
      console.error("Failed to toggle like:", error);
    }
  };

  const handleRetweet = async (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isRetweeted: !post.isRetweeted,
              retweets: post.isRetweeted
                ? post.retweets - 1
                : post.retweets + 1,
            }
          : post
      )
    );

    try {
      await toggleRetweet(postId);
    } catch (error) {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                isRetweeted: !post.isRetweeted,
                retweets: post.isRetweeted
                  ? post.retweets + 1
                  : post.retweets - 1,
              }
            : post
        )
      );
      console.error("Failed to toggle retweet:", error);
    }
  };

  const handleCreatePost = async (content: string, images: string[]) => {
    try {
      const newPost = await createPost(content, images);
      setPosts((prev) => [newPost, ...prev]);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="border-b border-gray-200 p-4">
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto sm:border-l sm:border-r border-gray-200 min-h-screen">
        <div
          className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-3 sm:p-4 z-50 transition-transform duration-300 ${
            isHeaderVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div className="w-8"></div>
            </div>
            <div className="flex items-center justify-center mt-2">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">홈</h1>
            </div>
          </div>
        </div>

        <div className="pt-24">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onRetweet={handleRetweet}
            />
          ))}
        </div>

        {loadingMore && (
          <div className="p-4 text-center">
            <div className="inline-block w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="p-4 text-center text-gray-500">
            모든 게시물을 확인했습니다.
          </div>
        )}
      </div>

      <button
        onClick={() => setIsComposeOpen(true)}
        className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center z-[60] ${
          isHeaderVisible ? "opacity-100" : "opacity-30"
        }`}
        title="새 게시물 작성"
      >
        <Edit className="w-6 h-6" />
      </button>

      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}
