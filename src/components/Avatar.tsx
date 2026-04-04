import React from "react";

interface AvatarProps {
  name?: string;
  src?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name = "User", src, size = 40 }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "#ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        overflow: "hidden",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        initials
      )}
    </div>
  );
};

export default Avatar;