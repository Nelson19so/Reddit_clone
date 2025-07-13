import React from "react";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";

import Layout from "../../components/layouts/Layout";
import maskGroup from "../../assets/images/Mask_Group.png";
import maskGroup2 from "../../assets/images/Mask_Group2.png";
import maskGroup3 from "../../assets/images/Mask_Group3.png";
import maskGroup4 from "../../assets/images/Mask_Group4.png";
import Post from "../../components/layouts/mianlayout/Post";

function Reddit() {
  document.title = "Reddit blog list";

  // localStorage.removeItem("access");
  // localStorage.removeItem("refresh");
  // const token = localStorage.getItem("refresh");

  // console.log(token);

  const posts = [
    {
      id: 1,
      img: maskGroup,
      title:
        "13 years ago today, a true patriot lost his life. Rest in Peace big guy.",
      author: "the_big_mothergoose",
      subreddit: "MURICA",
    },
    {
      id: 2,
      title: "My cousin playing around with talk box.",
      img: maskGroup2,
      author: "bwa_ahki",
      subreddit: "Music",
    },
    {
      id: 3,
      title:
        "IamA (Jörg Sprave, the bald crazy German who runs 'The Slingshot Channel' on YouTube.) AMA!",
      author: "JoergS",
      subreddit: "IAmA",
    },
    {
      id: 4,
      title:
        "Angela Merkel reportedly had to explain the 'fundamentals' of EU trade to Trump 11 times",
      author: "satosaison",
      subreddit: "worldnews",
    },
    {
      id: 5,
      title: "Nice set!",
      img: maskGroup3,
      author: "IHaeTypos",
      subreddit: "whitepeoplegifs",
    },
    {
      id: 6,
      img: maskGroup4,
      title:
        "PocketDerm lets you see a dermatologist online for prescription acen treatment. Redditors get their FIRST MONTH FREE!",
      author: "promoted by ashwin_3beauty",
      subreddit: "Ads",
    },
  ];

  const breakpointColumnsObj = {
    default: 3,
    1978: 4,
    1442: 3,
    1100: 3,
    818: 2,
  };
  return (
    <Layout>
      <div className="__reddit-container-main md:pl-[130px] pl-[10px] pr-[10px] md:pr-[130px] pt-7 pb-7">
        <h1 className="text-[20px] text-center">
          Find something interesting to discuss
        </h1>
        <div className="w-[100%] mt-10">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex md:gap-6 gap-4"
            columnClassName="my-masonry-grid_column"
          >
            {posts.map((post) => (
              <Post
                key={post.id}
                slug={post.title}
                img={post.img}
                title={post.title}
                author={post.author}
                subreddit={post.subreddit}
              />
            ))}
          </Masonry>
        </div>
      </div>

      <button className="__add-or-comment fixed bottom-5 right-5 cursor-pointer">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white" />
        </svg>
      </button>
    </Layout>
  );
}

export default Reddit;
