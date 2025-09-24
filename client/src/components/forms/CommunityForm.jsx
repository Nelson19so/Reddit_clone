import { useState } from "react";
import { createCommunityApi } from "../../utils/Api";
import Message from "../layouts/mianlayout/Message";
import { useNavigate } from "react-router-dom";

export default function CommunityForm({
  communityForm,
  _handleCommunityBlogForm,
}) {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    const access = localStorage.getItem("access");

    if (!access) {
      navigate("/login");
    }

    const response = await createCommunityApi(formData);

    if (response.data.ok) {
      setSuccess(response.data.message.message);

      setTimeout(() => {
        setSuccess(null);
      }, 5000);

      setFormData({ name: "", description: "" });

      _handleCommunityBlogForm();
    } else {
      setError(response.data.error);

      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const renderErrors = () => {
    return (
      error &&
      Object.entries(error).map(([field, messages], i) => {
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
      <div className="message-container__">
        {success && (
          <Message showSuccess={true} showError={false} success={success} />
        )}
        {error && <>{renderErrors()}</>}
      </div>
      <div className={`overall-container ${communityForm && "active-form"}`}>
        <div className="container-blogpost-form bg-white ">
          <div className="container-blogpost-form-wrapper w-[100%]">
            <header className="flex justify-between p-5">
              <div className="left-blogpost">
                <h1 className="text-lg">Create your own Community</h1>
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
                <div className="input-container flex justify-between flex-col gap-2.5">
                  <label htmlFor="name">Community Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name for community"
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>

                <div className="input-container flex justify-between flex-col gap-2.5 w-[100%] mt-5">
                  <label htmlFor="description">Community Description</label>
                  <textarea
                    name="description"
                    id="description"
                    placeholder="Write your community Description"
                    onChange={handleChange}
                    value={formData.description}
                  ></textarea>
                </div>

                <div className="mt-5 w-[100%]">
                  <button type="submit" className="base_btn text-center">
                    Create community
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
