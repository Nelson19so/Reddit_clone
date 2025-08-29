import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BlogPostDetailsApi } from "../../utils/Api";
import { formatDistanceToNow } from "date-fns";

import Layout from "../../components/layouts/Layout";
import Comment from "../../components/layouts/comment";

function BlogpostDetails() {
  const [blogPost, setBlogPost] = useState(null);

  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const BlogPostApi = async (slug) => {
      const response = await BlogPostDetailsApi(slug);

      if (response.ok) {
        setBlogPost(response.data);
      } else {
        navigate("/404");
      }
    };

    BlogPostApi(slug);
  }, [slug, location.pathname]);

  return (
    <Layout>
      <div className="container-articles border-b border-gray-300 md:pl-[130px] pl-[10px] pr-[10px] md:pr-[130px] pt-7 pb-7">
        <div className="title flex justify-start gap-[30px]">
          <div className="container-vote">
            {/* blog post vote */}
            <div className="flex justify-center flex-col">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
              >
                <path
                  d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"
                  fill="black"
                  fill-opacity="0.38"
                />
              </svg>

              <span className="number__ text-center">
                {blogPost && <>{blogPost.total_votes}</>}
              </span>

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
              >
                <path
                  d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z"
                  fill="black"
                  fill-opacity="0.38"
                />
              </svg>
            </div>
          </div>
          <div className="container-title-txt flex justify-start gap-1 flex-col">
            <p className="text-xl text-black">{blogPost && blogPost.title}</p>
            <div className="__container">
              <p className="font-grey">
                {blogPost && (
                  <>
                    {formatDistanceToNow(new Date(blogPost.created_at), {
                      addSuffix: true,
                    })}
                  </>
                )}{" "}
                by
                <Link className="ml-1">{blogPost && blogPost.author}</Link>
              </p>
            </div>

            {/* share link */}
            <div className="__post-detail-container">
              <Link>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 10.72C11.4933 10.72 11.04 10.92 10.6933 11.2333L5.94 8.46667C5.97333 8.31333 6 8.16 6 8C6 7.84 5.97333 7.68667 5.94 7.53333L10.64 4.79333C11 5.12667 11.4733 5.33333 12 5.33333C13.1067 5.33333 14 4.44 14 3.33333C14 2.22667 13.1067 1.33333 12 1.33333C10.8933 1.33333 10 2.22667 10 3.33333C10 3.49333 10.0267 3.64667 10.06 3.8L5.36 6.54C5 6.20667 4.52667 6 4 6C2.89333 6 2 6.89333 2 8C2 9.10667 2.89333 10 4 10C4.52667 10 5 9.79333 5.36 9.46L10.1067 12.2333C10.0733 12.3733 10.0533 12.52 10.0533 12.6667C10.0533 13.74 10.9267 14.6133 12 14.6133C13.0733 14.6133 13.9467 13.74 13.9467 12.6667C13.9467 11.5933 13.0733 10.72 12 10.72Z"
                    fill="black"
                    fill-opacity="0.38"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* img */}
        <div className="container-post-img mt-8 pl-14">
          {blogPost && (
            <>
              {blogPost.image && (
                <img
                  src={blogPost.image}
                  alt="image"
                  style={{ width: "80%" }}
                />
              )}
            </>
          )}
        </div>
      </div>

      <div className="container-blog-details-comment w-[100%] md:pl-[130px] pl-[10px] pr-[10px] md:pr-[130px] pt-7 pb-7">
        <div
          className="flex justify-between md:flex-row flex-col gap-5 w-[100%]"
          style={{ alignItems: "center" }}
        >
          <div>
            <p className="text-sm text-black">
              {blogPost && (
                <>
                  {blogPost.comments_count === 0 ? (
                    <>No comments yet</>
                  ) : (
                    <>{blogPost.comments_count} comments</>
                  )}
                </>
              )}
            </p>
          </div>
          <div className="right-container flex justify-end gap-5">
            <div
              className="bg-white pl-4 pr-4 p-2 gap-3 flex justify-between"
              style={{ alignItems: "center" }}
            >
              <p className="font-dark">
                Filter by <span>Best</span>
              </p>

              <button className="cursor-pointer">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 10.2334H17L12 15.2334L7 10.2334Z"
                    fill="black"
                    fill-opacity="0.87"
                  />
                </svg>
              </button>
            </div>

            <div
              className="bg-white pl-4 pr-4 p-2 gap-3 flex justify-between"
              style={{ alignItems: "center" }}
            >
              <p className="font-dark">
                Showing top <span>200</span>
              </p>

              <button className="cursor-pointer">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 10.2334H17L12 15.2334L7 10.2334Z"
                    fill="black"
                    fill-opacity="0.87"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="container_main-comment shadow-sm bg-white w-[100%] mt-5 p-5">
          <Comment
            key={"1"}
            title={
              "The biggest scam are chocolate diamonds. No I don't want your low quality mud gems bro fuck off."
            }
            author={"the_big_mothergoose"}
            date={"3 hours ago"}
          />

          {/* recursive comment */}
          <div className="pl-5">
            <Comment
              title={"Totally. They don't even taste like chocolate."}
              author={"TorontoPolarBear"}
              date={"3 hours ago"}
            />

            {/* recursive comment */}
            <div className="pl-5">
              <Comment
                title={
                  "And chocolate coins aren't real money either. There's just no winning."
                }
                author={"AnExplosiveMonkey"}
                date={"3 hours ago"}
              />
            </div>
          </div>

          <Comment
            title={
              "And chocolate coins aren't real money either. There's just no winning."
            }
            author={"AnExplosiveMonkey"}
            date={"3 hours ago"}
          />
        </div>

        <div className="container_main-comment shadow-sm bg-white w-[100%] mt-5 p-5">
          <Comment
            title={
              "And chocolate coins aren't real money either. There's just no winning."
            }
            author={"AnExplosiveMonkey"}
            date={"3 hours ago"}
          />
        </div>
      </div>

      {/* comment float button */}
      <button className="__add-or-comment fixed bottom-5 right-5 cursor-pointer">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H18L22 22V4C22 2.9 21.1 2 20 2ZM18 14H6V12H18V14ZM18 11H6V9H18V11ZM18 8H6V6H18V8Z"
            fill="white"
          />
        </svg>
      </button>
    </Layout>
  );
}

export default BlogpostDetails;
