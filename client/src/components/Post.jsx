import React from "react";
import moment from "moment"

export const Post = ({post}) => {
  return (
    <div
      className="bg-[#242424] p-4 border-b-[1px] w-full"
    >
      <div className="flex gap-2 items-center">
        <img
          src={post.img}
          width={40}
          height={40}
          className="rounded-full bg-contain border-[1px]"
          alt="avatar"
          loading="lazy"
        />
        <h3 className="text-sm text-green-300 tracking-widest">{post.name}</h3>
      </div>
      <p className=" break-words mx-10">{post.post}</p>
      <small className="text-gray-400 mx-10">
        {moment(post.createdAt).fromNow()}
      </small>
    </div>
  );
};
