import axios from "axios";
import React, { useState, useEffect } from "react";
import {RotatingLines} from "react-loader-spinner"
import moment from "moment"
const App = () => {
  const [loading, setLoading] = useState(false);
  const [allPost, setAllPost] = useState([]);
  const [skip, setSkip] = useState(0);

  const getPosts = () => {
    setLoading(true);
    axios
      .get(`https://anonymouschirp-api.vercel.app/?skip=${skip}&limit=${0}`)
      .then((res) => {
        setAllPost(res.data);
        setLoading(false);
      });
  };

  const [post, setPost] = useState("");
  const handleClick = async () => {
    setLoading(true);
    await axios.post("https://anonymouschirp-api.vercel.app/", { post });
    setPost("");
    getPosts();
    setLoading(false);
  };

  useEffect(getPosts, [skip]);
  return (
    <main className="max-w-[800px] mx-auto flex justify-center items-center flex-col p-10 ">
      <div className=" w-[90vw] md:w-[800px]">
        <div>
          <h1 className="text-2xl font-bold  text-center text-green-500 tracking-[2px]">
            ANONYMOUSCHIRP
          </h1>
          <p className="text-center text-orange-200 m-2">
            (UI will be changed soon!)
          </p>
          <div className="flex justify-center items-center mb-4">
            <textarea
              value={post}
              onChange={(e) => {
                setPost(e.target.value);
              }}
              cols="28"
              rows="1"
              placeholder="Share your views anonymously"
              className="text-black rounded p-2 w-full"
            ></textarea>
            <button
              onClick={handleClick}
              className=" border-2 border-white font-bold p-2 px-4 rounded mx-2"
            >
              Post
            </button>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center items-center"><RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
            
          /></div>
        )}
        <div className="flex justify-center items-center flex-col mt-2">
          {allPost.map((post) => {
            return (
              <div
                key={post._id + post.createdAt}
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
                  <h3 className="text-sm text-green-300 tracking-widest">
                    {post.name}
                  </h3>
                </div>
                <p className=" break-words mx-10">{post.post}</p>
                <small className="text-gray-400 mx-10">{moment(post.createdAt).fromNow()}</small>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default App;
