import React from "react";

type NextImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  loading?: "lazy" | "eager";
  quality?: number;
  width?: number | string;
  height?: number | string;
};

export const Image = React.forwardRef<HTMLImageElement, NextImageProps>(
  ({ fill, priority, loading, quality, width, height, ...props }, ref) => {
    const style: React.CSSProperties = {};
    if (fill) {
      Object.assign(style, {
        position: "absolute",
        inset: 0,
      });
    }
    if (width && !fill) {
      style.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height && !fill) {
      style.height = typeof height === "number" ? `${height}px` : height;
    }
    return <img {...props} ref={ref} style={{ ...style, ...props.style }} />;
  },
);

Image.displayName = "Image";

export default Image;
