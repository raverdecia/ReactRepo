import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPost, getSimilarPost } from "../services";
import { DEV_MIDDLEWARE_MANIFEST } from "next/dist/shared/lib/constants";

const PostWidget = ({ categories, slug }) => {
  const [realtedPost, setRelatedPost] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPost(categories, slug).then((result) => {
        setRelatedPost(result);
      });
    } else {
      getRecentPost().then((result) => {
        setRelatedPost(result);
      });
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? "Related Post" : "Recent Post"}</h3>
      {realtedPost.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              alt={post.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              src={post.featureImage.url}
            />
          </div>
          <div className="flex-grow ml-4 ">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).format("MMM DD, YYYY")}</p>
            <Link href={`/post/${post.slug}`} key={post.title} className="text-md">
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
