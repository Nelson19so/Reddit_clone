import { useRef, useState } from "react";
import { BlogPostCreateApi } from "../../utils/Api";
import { useLocation, useParams } from "react-router-dom";
import { logout } from "../../utils/accounts/Authservice";

import Message from "../layouts/mianlayout/Message";

export default function BlogpostForm({ _handleCommunityBlogForm, blogForm }) {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState({});
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
  const handleImage = (e) => {
    const image = e.target.files[0];

    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(image);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);

    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

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

        if (response.data.ok) {
          setSuccessMsg(response.data.message);

          setTimeout(() => {
            setSuccessMsg(null);
          }, 5000);

          _handleCommunityBlogForm();

          setFormData({ content: "", title: "" });
          handleRemoveImage();
        } else {
          setErrorMsg(response.data.error);

          setTimeout(() => {
            setErrorMsg({});
          }, 5000);
        }
      } else {
        // logs the user out if the user doesn't -
        // have access or refresh token
        logout();
      }
    }
  };

  const renderErrors = () => {
    return (
      errorMsg &&
      Object.entries(errorMsg).map(([field, messages], i) => {
        const messageText = Array.isArray(messages)
          ? messages.join(", ")
          : String(messages);

        return (
          <Message
            key={i}
            error={`${messageText}`}
            showError={true}
            showSuccess={false}
          />
        );
      })
    );
  };

  return (
    <>
      {successMsg && (
        <Message showSuccess={true} showError={false} success={successMsg} />
      )}
      {errorMsg && <>{renderErrors()}</>}
      <div className={`overall-container ${blogForm && "active-form"}`}>
        <div className="container-blogpost-form bg-white ">
          <div className="container-blogpost-form-wrapper w-[100%]">
            <header className="flex justify-between p-5">
              <div className="left-blogpost">
                <h1 className="text-lg">Create Blog Post</h1>
              </div>
              <div>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={_handleCommunityBlogForm}
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
                {image && (
                  <div className="relative">
                    <button
                      className="absolute top-[-10px] right-[-10px] cursor-pointer"
                      onClick={handleRemoveImage}
                    >
                      <svg
                        fill="red"
                        width="20px"
                        height="20px"
                        viewBox="0 0 36 36"
                        version="1.1"
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                      >
                        <title>remove image</title>
                        <path
                          class="clr-i-outline clr-i-outline-path-1"
                          d="M19.41,18l8.29-8.29a1,1,0,0,0-1.41-1.41L18,16.59,9.71,8.29A1,1,0,0,0,8.29,9.71L16.59,18,8.29,26.29a1,1,0,1,0,1.41,1.41L18,19.41l8.29,8.29a1,1,0,0,0,1.41-1.41Z"
                        ></path>
                        <rect
                          x="0"
                          y="0"
                          width="36"
                          height="36"
                          fill-opacity="0"
                        />
                      </svg>
                    </button>
                    <img src={image} alt="blog-image" />
                  </div>
                )}

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
                      className="btn-upload-img mt-6 cursor-pointer flex justify-center"
                      style={{ alignItems: "center" }}
                      title="Blog img"
                      onClick={handleClickEventForImageUpload}
                    >
                      <svg
                        fill="#cfcfcf"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h7a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21ZM22.71,4.29l-3-3a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-3,3a1,1,0,0,0,1.42,1.42L18,4.41V10a1,1,0,0,0,2,0V4.41l1.29,1.3a1,1,0,0,0,1.42,0A1,1,0,0,0,22.71,4.29Z" />
                      </svg>
                    </button>
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
      </div>
    </>
  );
}
