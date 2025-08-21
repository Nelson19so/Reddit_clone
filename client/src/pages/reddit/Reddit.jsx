import Masonry from "react-masonry-css";

import UseAccessToken from "../../components/layouts/authlayout/UseAccessToken";
import Post from "../../components/layouts/mianlayout/Post";
import Layout from "../../components/layouts/Layout";

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ListBlogPostApi, ListCommunityBlogPostApi } from "../../utils/Api";

function Reddit() {
  const [blogPost, setBlogPost] = useState([]);
  const [loadingPost, setLoadingPost] = useState(false);

  document.title = "Reddit blog list";

  const [access] = UseAccessToken();

  const location = useLocation();

  const { slug } = useParams();

  useEffect(() => {
    if (!access) return;

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

    if (location.pathname === `/community/${slug}/`) {
      fetchCommunityReddit(slug);
    } else {
      fetchRedditPost();
    }
  }, [access, location.pathname, slug]);

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
        className="__reddit-container-main md:pl-[130px] pl-[10px] pr-[10px] 
                    md:pr-[130px] pt-7 pb-7"
      >
        <h1 className="text-[20px] text-center">
          Find something interesting to discuss
        </h1>
        <div className="w-[100%] mt-10">
          {loadingPost ? (
            <p className="text-center mt-40">loading...</p>
          ) : (
            <>
              {blogPost.length > 0 && (
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
                    />
                  ))}
                </Masonry>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Reddit;
