import axios from "axios";
import React, { useState, useEffect } from "react";
import {RotatingLines} from "react-loader-spinner"
import { Post } from "./components/Post";
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
    if(!post)return;
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
              <Post post={post}  key={post._id}/>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default App;
