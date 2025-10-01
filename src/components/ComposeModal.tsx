"use client";

import { useState, useEffect } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { currentUser } from "@/data/posts";
import LazyImage from "./LazyImage";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, images: string[]) => void;
}

export default function ComposeModal({
  isOpen,
  onClose,
  onSubmit,
}: ComposeModalProps) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const maxLength = 280;

  const handleClose = () => {
    setContent("");
    setImages([]);
    setIsDragOver(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isSubmitting) {
      setIsSubmitting(true);
      await onSubmit(content, images);
      setIsSubmitting(false);
      handleClose();
    }
  };

  const handleImageAdd = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        handleFiles(files);
      }
    };

    input.click();
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFiles = (files: FileList) => {
    const remainingSlots = 4 - images.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImages((prev) => {
            if (prev.length < 4) {
              return [...prev, result];
            }
            return prev;
          });
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-[70] flex flex-col">
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button
            onClick={handleClose}
            className="text-gray-900 text-lg font-medium hover:text-gray-700"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!content.trim() || isSubmitting}
            className={`px-4 py-1.5 rounded-full font-bold text-sm transition-colors ${
              content.trim() && !isSubmitting
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "게시 중..." : "게시하기"}
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex space-x-3 h-full">
            <div className="flex-shrink-0">
              <LazyImage
                src={currentUser.profileImage}
                alt="내 프로필"
                width={40}
                height={40}
                className="rounded-full"
                priority={true}
              />
            </div>

            <div className="flex-1 flex flex-col">
              <div
                className={`relative flex-1 ${
                  isDragOver
                    ? "bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg"
                    : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="무슨 일이 일어나고 있나요?"
                  className="w-full h-full min-h-[200px] text-xl text-gray-900 placeholder-gray-600 resize-none border-none outline-none bg-transparent"
                  maxLength={maxLength}
                  autoFocus
                />
                {isDragOver && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-blue-500 text-center">
                      <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">
                        여기에 이미지를 드롭하세요
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {images.length > 0 && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50"
                    >
                      <LazyImage
                        src={image}
                        alt={`업로드된 이미지 ${index + 1}`}
                        width={300}
                        height={150}
                        className="w-full h-auto max-h-32 object-contain rounded-2xl"
                        priority={true}
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleImageAdd}
                disabled={images.length >= 4}
                className={`p-2 rounded-full transition-colors ${
                  images.length >= 4
                    ? "text-gray-500 cursor-not-allowed"
                    : "text-blue-500 hover:bg-gray-100"
                }`}
                title={
                  images.length >= 4
                    ? "최대 4개까지 업로드 가능"
                    : "이미지 추가"
                }
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              {images.length > 0 && (
                <span className="text-xs text-gray-600 font-medium">
                  {images.length}/4
                </span>
              )}
            </div>

            <div className="text-sm font-medium text-gray-600">
              {content.length}/{maxLength}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
