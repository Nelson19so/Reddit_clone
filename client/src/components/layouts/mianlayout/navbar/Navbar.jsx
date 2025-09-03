import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { joinCommunityApi, leaveCommunityApi } from "../../../../utils/Api";

import logo from "../../../../assets/images/reddit-1.png";
import Message from "../Message";
import NavbarBlogFilter from "./NavbarBlogFilter";

export default function Navbar({
  handleSidebar,
  communityDetail,
  handleAboutComm,
}) {
  const [reddit, setIsReddit] = useState(false);
  const [listFilter, setListFilter] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [commDetails, setCommDetail] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [joinedGroup, setJoinedGroup] = useState(null);

  const location = useLocation();

  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsReddit(true);
      setCommDetail(false);
    } else {
      setCommDetail(true);
      setIsReddit(false);
    }

    function checksForUrlDisplayFilter() {
      if (
        location.pathname === `/community/${slug}/` ||
        location.pathname === "/"
      ) {
        setListFilter(true);
      } else {
        setListFilter(false);
      }
    }

    if (communityDetail) {
      if (communityDetail.is_member) {
        setIsMember(true);
      } else {
        setIsMember(false);
      }
    }

    checksForUrlDisplayFilter();
    setToggle(false);
  }, [slug, location.pathname, communityDetail]);

  function handleFilterToggle() {
    setToggle(!toggle);
  }

  const handleLeaveCommunity = async () => {
    const access = localStorage.getItem("access");
    setJoinedGroup(null);

    if (!access) navigate("/login");

    const response = await leaveCommunityApi(slug);

    if (response.ok) {
      setIsMember(false);
      setJoinedGroup(response.message.message);

      setTimeout(() => {
        setJoinedGroup(null);
      }, 5000);
    } else {
      return;
    }
  };

  const handleJoinCommunity = async () => {
    const access = localStorage.getItem("access");
    setJoinedGroup(null);

    if (!access) navigate("/login");

    const response = await joinCommunityApi(slug);

    if (response.ok) {
      setIsMember(true);
      setJoinedGroup(response.message.message);

      setTimeout(() => {
        setJoinedGroup(null);
      }, 5000);
    } else {
      return;
    }
  };

  return (
    <>
      {joinedGroup && (
        <Message success={joinedGroup} showSuccess={true} showError={false} />
      )}
      <div className="__container-navbar w-[100%]">
        <nav>
          <div className="container-top-navbar-mobile flex justify-between pl-5 pr-5 pt-5 pb-5">
            <div className="container-mobile-left flex justify-start gap-6">
              {/* harm bugger */}
              <button className="cursor-pointer" onClick={handleSidebar}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.54"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
                    fill="black"
                  />
                </svg>
              </button>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>

            <div className="container-search-mobile">
              <button className="cursor-pointer">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.54"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.502 14H14.708L14.432 13.726C15.407 12.589 16 11.115 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.115 16 12.588 15.408 13.725 14.434L14.001 14.708V15.5L18.999 20.491L20.49 19L15.502 14ZM9.5 14C7.014 14 5 11.986 5 9.5C5 7.015 7.014 5 9.5 5C11.985 5 14 7.015 14 9.5C14 11.986 11.985 14 9.5 14Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            className={`container-top-navbar flex justify-between pl-5 pr-5 pt-5 pb-5 ${
              reddit && "container-mobile-hidden"
            }`}
          >
            <div className="flex justify-start gap-4 align-middle">
              {commDetails ? (
                <>
                  <div
                    className="flex justify-start gap-4 align-middle "
                    style={{ alignItems: "center" }}
                  >
                    <Link to={-1}>
                      <button className="cursor-pointer flex justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
                            fill="black"
                            fill-opacity="0.54"
                          />
                        </svg>
                      </button>
                    </Link>
                    {communityDetail && (
                      <p>
                        {communityDetail.communities || communityDetail.name}
                      </p>
                    )}
                  </div>

                  {communityDetail && (
                    <>
                      {isMember ? (
                        <>
                          <div className="container_sub_subscribe flex justify-start gap-3">
                            Subreddit subscribed
                            {location.pathname === `/community/${slug}/` && (
                              <button
                                className="cursor-pointer"
                                onClick={handleLeaveCommunity}
                              >
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M10 8.6L8.6 10L5 6.4L1.4 10L0 8.6L3.6 5L0 1.4L1.4 0L5 3.6L8.6 0L10 1.4L6.4 5L10 8.6Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="container_sub_subscribe flex justify-start gap-3">
                            Subscribe subreddit
                            {location.pathname === `/community/${slug}/` && (
                              <svg
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                className="cursor-pointer"
                                onClick={handleJoinCommunity}
                              >
                                <g>
                                  <path fill="none" d="M0 0h24v24H0z" />
                                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" />
                                </g>
                              </svg>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <p>All Subreddit</p>
              )}
            </div>
            {commDetails && (
              <div className="flex justify-end gap-4 md:pr-4 ">
                <button className="cursor-pointer" onClick={handleAboutComm}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 15H11V9H9V15ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM9 7H11V5H9V7Z"
                      fill="black"
                      fill-opacity="0.54"
                    />
                  </svg>
                </button>

                <button className="cursor-pointer">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                      fill="black"
                      fill-opacity="0.54"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {listFilter && (
            <NavbarBlogFilter
              handleFilterToggle={handleFilterToggle}
              toggle={toggle}
            />
          )}
        </nav>
      </div>
    </>
  );
}
