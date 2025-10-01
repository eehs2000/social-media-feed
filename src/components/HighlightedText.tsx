import React from "react";

interface HighlightedTextProps {
  text: string;
  className?: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  className = "",
}) => {
  const hashtagRegex = /#[a-zA-Z0-9가-힣_]+/g;
  const mentionRegex = /@[a-zA-Z0-9가-힣_]+/g;

  const processText = (text: string) => {
    const parts: Array<{ text: string; type: "text" | "hashtag" | "mention" }> =
      [];
    let lastIndex = 0;

    const matches: Array<{
      match: string;
      index: number;
      type: "hashtag" | "mention";
    }> = [];

    let match;
    while ((match = hashtagRegex.exec(text)) !== null) {
      matches.push({
        match: match[0],
        index: match.index,
        type: "hashtag",
      });
    }

    while ((match = mentionRegex.exec(text)) !== null) {
      matches.push({
        match: match[0],
        index: match.index,
        type: "mention",
      });
    }

    matches.sort((a, b) => a.index - b.index);

    matches.forEach((match) => {
      if (match.index > lastIndex) {
        const normalText = text.slice(lastIndex, match.index);
        if (normalText) {
          parts.push({ text: normalText, type: "text" });
        }
      }

      parts.push({
        text: match.match,
        type: match.type,
      });

      lastIndex = match.index + match.match.length;
    });

    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      if (remainingText) {
        parts.push({ text: remainingText, type: "text" });
      }
    }

    if (matches.length === 0) {
      parts.push({ text, type: "text" });
    }

    return parts;
  };

  const parts = processText(text);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.type === "hashtag") {
          return (
            <span
              key={index}
              className="text-blue-500 hover:text-blue-600 cursor-pointer font-medium"
            >
              {part.text}
            </span>
          );
        } else if (part.type === "mention") {
          return (
            <span
              key={index}
              className="text-blue-500 hover:text-blue-600 cursor-pointer font-medium"
            >
              {part.text}
            </span>
          );
        } else {
          return <span key={index}>{part.text}</span>;
        }
      })}
    </span>
  );
};

export default HighlightedText;
