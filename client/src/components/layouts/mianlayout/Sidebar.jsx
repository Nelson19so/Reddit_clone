import { data, Link, useLocation } from "react-router-dom";

import logo from "../../../assets/images/reddit-1.png";
import { useEffect, useState } from "react";
import { communityMembers } from "../../../utils/Api";
import { userProfile } from "../../../utils/accounts/Authservice";
import UseAccessToken from "../authlayout/UseAccessToken";

export default function Sidebar({ displaySidebar }) {
  const [home, setIsHomePage] = useState(false);
  const [reddit, setReddit] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingCommunity, setLoadingCommunity] = useState(false);

  // handles location changes ...
  const location = useLocation();

  const [access] = UseAccessToken();

  // Handles home page location
  useEffect(() => {
    setIsHomePage(location.pathname === "/");
  }, [location]);

  // Handles the apis for fetching user data and community data
  useEffect(() => {
    if (!access) return;

    setLoadingCommunity(true);

    Promise.all([communityMembers(), userProfile()])
      .then(([communityData, userData]) => {
        setReddit(communityData || []);
        setUser(userData);
      })
      .finally(() => {
        setLoadingCommunity(false);
      });
  }, [access, location.pathname]);

  return (
    <div
      className={`container_sidebar w-[256px] ${
        displaySidebar ? "active-sidebar" : "disabled-sidebar"
      }`}
    >
      <aside className="h-[100%] flex justify-baseline flex-col">
        <div className="container-logo p-4">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className="container-article p-4">
          <div className="flex justify-between gap-5">
            {user ? (
              <>
                {user?.email ? (
                  <>
                    <p className="text-[14px]">{user.email}</p>
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
                  </>
                ) : (
                  <p className="text-xs">Loading...</p>
                )}
              </>
            ) : (
              <Link className="cursor-pointer text-sm" to="/signup">
                Register
              </Link>
            )}
          </div>
        </div>

        <div className="container-search-nav-and-links-items">
          <div className="pl-4 pr-4 pt-2 pb-2">
            <div className="wrapper flex justify-between pl-3 pr-3 ">
              <div>
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
              </div>
              <div className="w-[100%] h-[100%]">
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="w-[100%] pt-2 pb-2 pl-1"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>

          <div className="sidebar-items__ flex justify-between flex-col h-[89.2%]">
            <div className="container-links">
              <ul className="flex justify-items-start gap-1 flex-col">
                <li>
                  <Link
                    to="/"
                    className={`pl-4 pr-4 pt-2 pb-2 main-link ${
                      home && "active"
                    }`}
                  >
                    <div className="flex justify-start gap-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
                          fill={home ? "#FF4500" : "black"}
                          fill-opacity={home ? "" : "0.54"}
                        />
                      </svg>
                      Home
                    </div>
                  </Link>
                </li>

                <li>
                  <Link className="pl-4 pr-4 pt-2 pb-2 main-link">
                    <div className="flex justify-items-start gap-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z"
                          fill="black"
                          fill-opacity="0.54"
                        />
                      </svg>
                      Notifications
                    </div>
                  </Link>
                </li>

                <li className="pl-4 pr-3 pt-2 pb-2">
                  <div className="flex justify-items-start gap-4 w-[100%]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
                        fill="black"
                        fill-opacity="0.54"
                      />
                    </svg>
                    <div className="flex justify-between w-[100%]">
                      My subreddits
                      <div className="cursor-pointer">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                            fill="black"
                            fill-opacity="0.38"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <ul className="mt-3 flex justify-items-start gap-3 flex-col">
                    {loadingCommunity ? (
                      <p className="text-sm">loading...</p>
                    ) : (
                      reddit.length > 0 && (
                        <>
                          {reddit.map((redd) => (
                            <li key={redd.id}>
                              <Link
                                to={`/community/${redd.slug}/`}
                                className="pl-9"
                              >
                                {redd.name}
                              </Link>
                            </li>
                          ))}
                        </>
                      )
                    )}
                  </ul>
                </li>
              </ul>
            </div>

            <div className="sidebar-bottom-container pt-2 pb-2">
              <ul>
                <li className="pl-4 pr-3 pt-2 pb-2">
                  <button className="cursor-pointer w-[100%]">
                    <div className="flex justify-items-start gap-4 w-[100%]">
                      <svg
                        width="24"
                        height="20"
                        viewBox="0 0 24 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.95 20C6.03508 20 1.22325 16.8077 1.22325 12.8838C1.22325 12.6127 1.24612 12.3443 1.29096 12.0808C0.896321 11.8385 0.570551 11.4999 0.3446 11.0972C0.11865 10.6944 2.5715e-05 10.2409 4.10527e-08 9.77975C0.000830543 9.06338 0.287373 8.37659 0.796779 7.87C1.30618 7.36341 1.99687 7.07839 2.71733 7.07744C3.3868 7.07744 4.02488 7.32088 4.51858 7.75603C6.37901 6.56873 8.88155 5.82148 11.6424 5.76976L13.4548 0.26974L13.8503 0.362477L13.8597 0.364706L18.0842 1.3536C18.2565 0.952396 18.5435 0.61029 18.9095 0.36968C19.2755 0.12907 19.7045 0.000534104 20.1432 -1.46161e-09C20.7365 0.000708166 21.3053 0.235394 21.7248 0.652568C22.1443 1.06974 22.3802 1.63533 22.3808 2.22524C22.3801 2.81508 22.1441 3.38056 21.7246 3.79763C21.3052 4.21471 20.7365 4.44933 20.1432 4.45004C19.5505 4.44945 18.9821 4.21523 18.5627 3.79871C18.1433 3.38218 17.907 2.81733 17.9057 2.22792L14.0512 1.32552L12.5836 5.77957C15.244 5.88256 17.6465 6.63204 19.4401 7.79348C19.9412 7.33215 20.5993 7.07649 21.2822 7.07789C22.0027 7.07872 22.6935 7.36369 23.203 7.87029C23.7125 8.37689 23.9991 9.06375 24 9.7802C24.0022 10.2595 23.8752 10.7306 23.6323 11.1445C23.3895 11.5585 23.0395 11.9003 22.6189 12.1343C22.6579 12.3808 22.6781 12.6305 22.6781 12.8838C22.6772 16.8077 17.8649 20 11.95 20ZM2.20974 12.0402C2.15012 12.3175 2.12006 12.6002 2.12006 12.8838C2.12006 16.3164 6.52967 19.1083 11.95 19.1083C17.3703 19.1083 21.7799 16.3159 21.7799 12.8838C21.7799 12.6109 21.7521 12.3421 21.6979 12.0781C21.6686 12.0176 21.6534 11.9513 21.6535 11.8842C21.3535 10.7129 20.5351 9.64956 19.3532 8.79263C19.2779 8.76548 19.2115 8.71866 19.1608 8.65709C17.364 7.42877 14.7969 6.65879 11.95 6.65879C9.13176 6.65879 6.58662 7.41362 4.79255 8.62098C4.74361 8.67629 4.68191 8.71897 4.61274 8.74537C3.40519 9.60275 2.56577 10.6732 2.25413 11.8547C2.25319 11.9137 2.24038 11.9719 2.21646 12.0259C2.21422 12.0309 2.21243 12.0358 2.20974 12.0402ZM20.1894 8.33118C21.2293 9.15823 21.9925 10.1431 22.3826 11.2239C22.6073 11.0554 22.7893 10.8372 22.9143 10.5865C23.0392 10.3358 23.1036 10.0595 23.1023 9.77975C23.1018 9.29969 22.9098 8.83943 22.5684 8.49998C22.227 8.16053 21.7641 7.96962 21.2813 7.96915C20.8874 7.9686 20.5041 8.09569 20.1894 8.33118ZM2.71733 7.96915C2.2346 7.96974 1.77182 8.1607 1.43053 8.50014C1.08923 8.83958 0.897284 9.29977 0.89681 9.77975C0.89681 10.3206 1.13895 10.823 1.54072 11.1619C1.94383 10.0896 2.71464 9.11276 3.75853 8.29373C3.45293 8.08238 3.08959 7.96912 2.71733 7.96915ZM20.1428 0.891257C19.4038 0.891257 18.8021 1.48959 18.8021 2.2248C18.8021 2.96001 19.4038 3.55789 20.1428 3.55789C20.8818 3.55789 21.4835 2.96001 21.4835 2.2248C21.4835 1.48959 20.8822 0.891257 20.1428 0.891257ZM11.9989 17.4622C10.203 17.4622 8.93761 17.0721 8.13093 16.2696C8.04685 16.1859 7.99963 16.0725 7.99968 15.9542C7.99972 15.8359 8.04701 15.7225 8.13115 15.6389C8.21529 15.5553 8.32938 15.5084 8.44833 15.5084C8.56728 15.5084 8.68134 15.5555 8.76542 15.6391C9.39543 16.2655 10.4528 16.5705 11.9989 16.5705C13.5445 16.5705 14.6028 16.2655 15.2337 15.6391C15.2753 15.5978 15.3247 15.565 15.3791 15.5426C15.4335 15.5202 15.4918 15.5087 15.5506 15.5087C15.6095 15.5087 15.6677 15.5203 15.7221 15.5427C15.7765 15.5651 15.8259 15.598 15.8675 15.6393C15.9091 15.6807 15.9421 15.7299 15.9646 15.784C15.9871 15.838 15.9987 15.896 15.9986 15.9545C15.9986 16.013 15.987 16.071 15.9645 16.125C15.9419 16.1791 15.9089 16.2282 15.8673 16.2696C15.0597 17.0721 13.7947 17.4622 11.9989 17.4622Z"
                          fill="black"
                          fill-opacity="0.54"
                        />
                        <path
                          d="M15.635 9.91798C14.7211 9.91798 13.9539 10.679 13.9539 11.5877C13.9539 12.4959 14.7211 13.232 15.635 13.232C16.5488 13.232 17.2887 12.4959 17.2887 11.5877C17.2887 10.679 16.5484 9.91798 15.635 9.91798ZM8.38966 9.91798C7.47671 9.91798 6.71039 10.6799 6.71039 11.5877C6.71039 12.4954 7.47626 13.232 8.38966 13.232C9.30307 13.232 10.0434 12.4954 10.0434 11.5877C10.0434 10.6799 9.30262 9.91798 8.38966 9.91798Z"
                          fill="black"
                          fill-opacity="0.54"
                        />
                      </svg>

                      <div className="flex justify-between w-[100%]">
                        About
                        <div className="cursor-pointer">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z"
                              fill="black"
                              fill-opacity="0.38"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>

                <li className="pl-4 pr-3 pt-2 pb-2">
                  <button className="cursor-pointer w-[100%]">
                    <div className="flex justify-items-start gap-4 w-[100%]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z"
                          fill="black"
                          fill-opacity="0.54"
                        />
                      </svg>

                      <div className="flex justify-between w-[100%]">
                        Help
                        <div className="cursor-pointer">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z"
                              fill="black"
                              fill-opacity="0.38"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>

                <li className="pl-4 pr-3 pt-2 pb-2">
                  <button className="cursor-pointer w-[100%]">
                    <div className="flex justify-items-start gap-4 w-[100%]">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 0.999997 7.1 0.599997 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z"
                          fill="black"
                          fill-opacity="0.54"
                        />
                      </svg>

                      <div className="flex justify-between w-[100%]">
                        Apps & Tools
                        <div className="cursor-pointer">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.59 8.59L12 13.17L7.41 8.59L6 10L12 16L18 10L16.59 8.59Z"
                              fill="black"
                              fill-opacity="0.38"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
