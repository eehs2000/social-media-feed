"use client";

import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import { Heart, MessageCircle, Repeat2, Share, Check } from "lucide-react";
import { Post } from "@/types";
import HighlightedText from "./HighlightedText";
import LazyImage from "./LazyImage";

interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
  onRetweet: (postId: number) => void;
}

export default function PostCard({ post, onLike, onRetweet }: PostCardProps) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="border-b border-gray-200 p-3 sm:p-4 hover:bg-gray-50/50 transition-colors">
      <div className="flex space-x-2 sm:space-x-3">
        <div className="flex-shrink-0">
          <LazyImage
            src={post.author.profileImage}
            alt={`${post.author.name} 프로필`}
            width={40}
            height={40}
            className="rounded-full"
            priority={true}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1">
            <h3 className="font-bold text-gray-900 truncate">
              {post.author.name}
            </h3>
            {post.author.verified && (
              <Check className="w-4 h-4 text-blue-500 fill-current" />
            )}
            <span className="text-gray-500 truncate">
              @{post.author.username}
            </span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-sm">{timeAgo}</span>
          </div>

          <div className="mt-1">
            <div className="text-gray-900 whitespace-pre-wrap break-words">
              <HighlightedText text={post.content} />
            </div>
          </div>

          {post.images.length > 0 && (
            <div className="mt-3">
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden border border-gray-200"
                >
                  <LazyImage
                    src={image}
                    alt="게시물 이미지"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between max-w-sm sm:max-w-md">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-50">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-sm">{post.comments}</span>
            </button>

            <button
              onClick={() => onRetweet(post.id)}
              className={`flex items-center space-x-2 transition-colors group ${
                post.isRetweeted
                  ? "text-green-500"
                  : "text-gray-500 hover:text-green-500"
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-green-50">
                <Repeat2 className="w-4 h-4" />
              </div>
              <span className="text-sm">{post.retweets}</span>
            </button>

            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-2 transition-colors group ${
                post.isLiked
                  ? "text-red-500"
                  : "text-gray-500 hover:text-red-500"
              }`}
            >
              <div className="p-2 rounded-full group-hover:bg-red-50">
                <Heart
                  className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`}
                />
              </div>
              <span className="text-sm">{post.likes}</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-50">
                <Share className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
