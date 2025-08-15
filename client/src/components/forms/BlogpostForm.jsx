import { useRef, useState } from "react";
import { BlogPostCreateApi } from "../../utils/Api";
import { useLocation, useParams } from "react-router-dom";
import { logout } from "../../utils/accounts/Authservice";

import Message from "../layouts/mianlayout/Message";

export default function BlogpostForm({ handleBlogForm, blogForm }) {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const imageRef = useRef(null);

  const { slug } = useParams();

  const location = useLocation();

  // handles form data changes on input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handles image file access onclick on a button
  const handleClickEventForImageUpload = () => imageRef.current.click();

  // handle image files
  const handleImage = (e) => setImage(e.target.files[0]);

  // handles form submission
  const handleFormSubmission = async (event) => {
    event.preventDefault();

    if (location.pathname === `/community/${slug}/`) {
      if (localStorage.getItem("access") || localStorage.getItem("refresh")) {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("content", formData.content);
        if (image) data.append("image", image);

        const response = await BlogPostCreateApi(data, slug);

        if (response.ok) {
          setSuccessMsg("Blog post successfully posted");

          setTimeout(() => {
            setSuccessMsg(null);
          }, 5000);

          handleBlogForm();

          setFormData({ content: "", title: "" });
        } else {
          setErrorMsg("response.data.error.author");

          setTimeout(() => {
            setErrorMsg(null);
          }, 5000);
        }
      } else {
        // logs the user out if the user doesn't -
        // have access or refresh token
        logout();
      }
    }
  };

  return (
    <>
      {successMsg && (
        <Message showSuccess={true} showError={false} success={successMsg} />
      )}
      {errorMsg && (
        <Message showError={true} showSuccess={false} error={errorMsg} />
      )}
      <div
        className={`container-blogpost-form bg-white ${
          blogForm && "active-form"
        }`}
      >
        <div className="container-blogpost-form-wrapper w-[100%]">
          <header className="flex justify-between p-5">
            <div className="left-blogpost">
              <h1 className="text-lg">Create Blog Post</h1>
            </div>
            <div>
              <button
                type="button"
                className="cursor-pointer"
                onClick={handleBlogForm}
              >
                <svg
                  fill="#000000"
                  width="16px"
                  height="16px"
                  viewBox="0 0 16.001 16.001"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="X-16px" transform="translate(0 0)">
                    <path
                      id="Path_9"
                      data-name="Path 9"
                      d="M33.707,8,40.854.854a.5.5,0,0,0-.708-.708L33,7.293,25.854.146a.5.5,0,0,0-.708.708L32.293,8l-7.147,7.146a.5.5,0,0,0,.708.708L33,8.707l7.146,7.147a.5.5,0,0,0,.708-.708Z"
                      transform="translate(-25 0)"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </header>

          <div className="container-blog-form p-5 pt-5 pb-8">
            <form onSubmit={handleFormSubmission}>
              <div
                className="flex justify-between gap-5 flex-row  w-[100%]"
                style={{ alignItems: "center" }}
              >
                <div className="input-container flex justify-between flex-col gap-2.5 w-[85%]">
                  <label htmlFor="title">Title for blog</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Blog Title"
                    onChange={handleChange}
                    value={formData.title}
                  />
                </div>

                <div className="container-img-upload pt-3">
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    ref={imageRef}
                    onChange={handleImage}
                    hidden
                  />
                  <button
                    type="button"
                    className="btn-upload-img mt-6 cursor-pointer"
                    title="Blog img"
                    onClick={handleClickEventForImageUpload}
                  ></button>
                </div>
              </div>

              <div className="input-container flex justify-between flex-col gap-2.5 w-[100%] mt-5">
                <label htmlFor="content">Content for blog</label>
                <textarea
                  name="content"
                  id="content"
                  placeholder="Blog Content"
                  onChange={handleChange}
                  value={formData.content}
                ></textarea>
              </div>

              <div className="mt-5 w-[100%]">
                <button type="submit" className="base_btn text-center">
                  Post Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
