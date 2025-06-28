import { Link } from "react-router-dom";

export default function Comment({ title, author, date }) {
  return (
    <div className="comment-box- title flex justify-start gap-[15px] mb-1">
      {/* blog post vote */}
      <div className="container-vote">
        <div className="flex justify-center flex-col">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"
              fill="black"
              fill-opacity="0.38"
            />
          </svg>

          <span className="number__" style={{ fontSize: "12px" }}>
            13k
          </span>

          <svg
            width="18"
            height="18"
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
      <div className="container-title-txt flex justify-start gap-1 flex-col">
        <p className="text-sm text-black">{title}</p>
        <div className="__container">
          <p className="font-grey" style={{ fontSize: "11.5px" }}>
            {author} <Link>{date}</Link>
          </p>
        </div>
        {/* <Link className="load-more__ mt-2">Load more 6 comments...</Link> */}
      </div>
    </div>
  );
}
