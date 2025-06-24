import { Link } from "react-router-dom";

export default function Post({ title, subreddit, author, img, slug }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          img,
          title,
          url: `${window.location.origin}/blogpost/${slug}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((err) => console.error("Error sharing:", err));
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <div className="__grid-item reddit_post shadow-sm bg-white">
      {img && (
        <img src={img} alt={author} className="w-full h-auto object-cover" />
      )}
      <article className="p-4">
        <Link to={`/blogpost_details/${slug}`}>
          <p className="title">{title}</p>
        </Link>
        <span className="__post-about">
          6 hours ago by{" "}
          <p className="author">
            <Link>{author}</Link>
          </p>
        </span>
        <p className="group-name">
          <span>/r/</span>
          <Link>{subreddit}</Link>
        </p>

        <div className="__post-detail-container flex justify-around mt-1">
          <div className="flex justify-center flex-col">
            <svg
              width="20"
              height="20"
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

            <span className="number__">13k</span>

            <svg
              width="20"
              height="20"
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
          <div className="flex justify-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.99 4C21.99 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H18L22 22L21.99 4Z"
                fill="black"
                fill-opacity="0.38"
              />
            </svg>
            <span className="number__">1281</span>
          </div>
          <div>
            <Link onClick={handleShare}>
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
      </article>
    </div>
  );
}
