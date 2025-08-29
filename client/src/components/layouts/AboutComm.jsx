export default function AboutCommunity({ aboutComm, setAboutComm }) {
  return (
    <div
      className={`container-about-community w-[256px] h-[100vh] ${
        aboutComm && "active-container-about-community"
      }`}
    >
      <header>
        <p>About</p>
      </header>

      <article>
        <p>
          16.687.254 subscribers 8.551 <span>online now</span>
        </p>

        <h6 className="mt-3">
          You learn something new every day; what did you learn today?
        </h6>

        <h6 className="mt-3">
          Submit interesting and specific facts that you just found out (not
          broad information you looked up, TodayILearned is not{" "}
          <span>/r/wikipedia)</span>.
        </h6>
      </article>

      <div className="container-drop-down mt-2 w-[100%]">
        <button className="w-[100%]">
          <div className="flex justify-between w-[100%]">
            <div className="flex justify-between gap-7">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z"
                  fill="black"
                  fill-opacity="0.38"
                />
              </svg>

              <span>Moderators</span>
            </div>

            <div>
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
          </div>
        </button>

        <button className="w-[100%]">
          <div className="flex justify-between w-[100%]">
            <div className="flex justify-between gap-7">
              <svg
                width="20"
                height="20"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3332 2H6.99984C5.7165 2 4.67817 2.9 4.67817 4L4.6665 20C4.6665 21.1 5.70484 22 6.98817 22H20.9998C22.2832 22 23.3332 21.1 23.3332 20V8L16.3332 2ZM18.6665 18H9.33317V16H18.6665V18ZM18.6665 14H9.33317V12H18.6665V14ZM15.1665 9V3.5L21.5832 9H15.1665Z"
                  fill="black"
                  fill-opacity="0.38"
                />
              </svg>

              <span>Posting Rules</span>
            </div>

            <div>
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
            </div>
          </div>
        </button>

        <div class="content-rules">
          <div className="flex justify-items-start">
            <div>
              <h1 className="w-[20px]">1</h1>
            </div>
            <p>
              <strong>Submissions must be verifiable.</strong> Please link
              directly to a reliable source that supports every claim in your
              post title.{" "}
              <strong>Images alone do not count as valid references</strong>.
              Videos are fine so long as they come from reputable sources (e.g.
              BBC, Discovery, etc).
            </p>
          </div>

          <div className="flex justify-items-start mt-1">
            <div>
              <h1 className="w-[20px]">2</h1>
            </div>
            <p>
              <strong>
                No personal opinions, anecdotes or subjective statements
              </strong>{" "}
              (e.g "TIL xyz is a great movie").
            </p>
          </div>

          <div className="flex justify-items-start mt-1">
            <div>
              <h1 className="w-[20px]">3</h1>
            </div>

            <div>
              <p>No submissions regarding or related to the following</p>
              <ul>
                <li>Recent politics/politicians</li>
                <li>Police misconduct</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
