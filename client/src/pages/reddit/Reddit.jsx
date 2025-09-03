import Masonry from "react-masonry-css";

import Post from "../../components/layouts/mianlayout/Post";
import Layout from "../../components/layouts/Layout";

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ListBlogPostApi, ListCommunityBlogPostApi } from "../../utils/Api";

function Reddit() {
  const [blogPost, setBlogPost] = useState([]);
  const [loadingPost, setLoadingPost] = useState(false);

  document.title = "Reddit blog list";

  const location = useLocation();

  const { slug } = useParams();

  useEffect(() => {
    const fetchRedditPost = async () => {
      setLoadingPost(true);

      const response = await ListBlogPostApi().finally(() => {
        setLoadingPost(false);
      });
      setBlogPost(response);
    };

    const fetchCommunityReddit = async (slug) => {
      setLoadingPost(true);

      const response = await ListCommunityBlogPostApi(slug).finally(() => {
        setLoadingPost(false);
      });
      setBlogPost(response);
    };

    if (location.pathname === `/community/${slug}/`) fetchCommunityReddit(slug);
    if (location.pathname === "/") fetchRedditPost();
  }, [location.pathname, slug]);

  const capitalizeCommunitySlug = (str) => {
    return str
      .toLowerCase()
      .split(/(\s+|-)/)
      .map((part) => {
        if (part.length > 0 && !/(\s+|-)/.test(part)) {
          return part.charAt(0).toUpperCase() + part.slice(1);
        }
        return part;
      })
      .join(" ")
      .replace("-", " ");
  };

  const breakpointColumnsObj = {
    default: 3,
    1978: 4,
    1442: 3,
    1100: 3,
    818: 2,
  };
  return (
    <Layout>
      <div
        className="__reddit-container-main h-[100%] md:pl-[130px] pl-[10px] pr-[10px] 
                  md:pr-[130px] pt-7 pb-7 md:pb-15"
      >
        <h1 className="text-[20px] text-center">
          {location.pathname === "/" ? (
            <>Find something interesting to discuss</>
          ) : (
            <>Explore the {capitalizeCommunitySlug(slug)} community</>
          )}
        </h1>
        <div className="w-[100%] mt-10">
          {loadingPost ? (
            <p className="text-center mt-40">loading...</p>
          ) : (
            <>
              {Array.isArray(blogPost) && blogPost.length > 0 ? (
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="flex md:gap-6 gap-4"
                  columnClassName="my-masonry-grid_column"
                >
                  {blogPost.map((post) => (
                    <Post
                      key={post.id}
                      slug={post.slug}
                      img={post.image}
                      title={post.title}
                      author={post.author}
                      subreddit={post.communities}
                      timePosted={post.created_at}
                      communitySlug={post.communities[0]
                        ?.toLowerCase()
                        .replace(/ /g, "-")}
                      commentsCount={post.comments_count}
                      totalVote={post.total_votes}
                    />
                  ))}
                </Masonry>
              ) : (
                <p className="text-center mt-40">No Subreddit was found yet</p>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Reddit;
