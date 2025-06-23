import { Link, useLocation } from "react-router-dom";

import logo from "../../../../assets/images/reddit-1.png";
import { useEffect, useState } from "react";

export default function Nav() {
  const [homepage, setIsHome] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location]);

  return (
    <div className="__container-navbar w-[100%]">
      <nav>
        <div className="container-top-navbar-mobile flex justify-between pl-5 pr-5 pt-5 pb-5">
          <div className="container-mobile-left flex justify-start gap-6">
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
                  d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
                  fill="black"
                />
              </svg>
            </button>
            <img src={logo} alt="logo" />
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
        <div className="container-top-navbar flex justify-between pl-5 pr-5 pt-5 pb-5">
          <div className="flex justify-start gap-4 align-middle">
            {homepage ? (
              <p>All subreddits</p>
            ) : (
              <>
                <Link to={-1}>
                  <button className="cursor-pointer">
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
                <p>Today I Learned</p>
              </>
            )}
            <div className="container_sub_subscribe flex justify-start gap-3">
              Subreddit subscribed
              <button className="cursor-pointer">
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
            </div>
          </div>
          <div className="flex justify-end gap-4 pr-4">
            <button className="cursor-pointer">
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
        </div>

        <div className="container-mobile-display flex justify-between pl-5 pr-5 pt-5 pb-5">
          <div className="flex justify-start gap-4 align-middle">
            <Link to={-1}>
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
            </Link>

            <div className="container_sub_subscribe flex justify-start gap-3">
              Today I Learned
              <button className="cursor-pointer">
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
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button className="cursor-pointer">
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
        </div>

        {homepage && (
          <div className="category_list_for_navbar">
            <div className="container-filter-mobile flex justify-start gap-15">
              <p>
                Filter by <span>Hot</span>
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

            <ul className="flex justify-items-start">
              <li className="active-link">
                <Link>HOT</Link>
              </li>
              <li>
                <Link>NEW</Link>
              </li>
              <li>
                <Link>RISING</Link>
              </li>
              <li>
                <Link>CONTROVERSIAL</Link>
              </li>
              <li>
                <Link>TOP</Link>
              </li>
              <li>
                <Link>GUIDED</Link>
              </li>
              <li>
                <Link>PROMOTED</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
