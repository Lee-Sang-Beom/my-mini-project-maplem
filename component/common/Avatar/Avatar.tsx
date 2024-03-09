"use client";
import React from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLImageElement> {
  alt: string;
  src: string;
  style: React.CSSProperties;
}

const Avatar = React.forwardRef(
  (
    { alt, src, className, style, ...props }: AvatarProps,
    ref: React.Ref<HTMLImageElement>
  ) => {
    return (
      <img
        className={className}
        ref={ref}
        alt={alt}
        src={src}
        style={style}
        {...props}
      />
    );
  }
);

Avatar.displayName = "Avatar";
export default Avatar;
