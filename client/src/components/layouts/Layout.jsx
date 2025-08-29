import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BlogPostDetailsApi, communityDetails } from "../../utils/Api";

import Sidebar from "./mianlayout/Sidebar";
import Navbar from "./mianlayout/navbar/Navbar";
import BlogpostForm from "../forms/BlogpostForm";
import UseAccessToken from "./authlayout/UseAccessToken";
import CommunityForm from "../forms/CommunityForm";
import AboutCommunity from "./AboutComm";

const Layout = ({ children }) => {
  // use State
  const [displaySidebar, setDisplaySideBar] = useState(false);
  const [showModal, SetShowModal] = useState(false);
  const [blogForm, setBlogForm] = useState(false);
  const [communityDetail, setCommunityDetail] = useState(null);
  const [scroll, setScroll] = useState(false);
  const [communityForm, setCommunityForm] = useState(false);
  const [aboutComm, setAboutComm] = useState(false);

  // listens to the website route for to detect slugs
  const { slug } = useParams();

  // handles location changes for the website
  const location = useLocation();

  const [access] = UseAccessToken();

  const navigate = useNavigate();

  // Helps toggle toggle modal for user and also set blog form to false if it is true
  const handleShowModal = () => {
    SetShowModal(!showModal);

    if (blogForm === true || communityForm === true) {
      setBlogForm(false);
      setCommunityForm(false);
    }

    if (showModal === true) {
      setDisplaySideBar(false);
    }
  };

  // Set all use state to false including the sidebar, blog form and modal
  function setAllStateFalse() {
    setDisplaySideBar(false);
    SetShowModal(false);
    setBlogForm(false);
  }

  // This use effect set all state false and helps in smooth -
  // scroll up when clicked on a new page link
  useEffect(() => {
    setAllStateFalse();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    // fetch the community details data for in community page
    const handlesCommunityDetails = async () => {
      setCommunityDetail(null);
      const response = await communityDetails(slug);
      setCommunityDetail(response);
    };

    const handlesBlogPostDetails = async () => {
      setCommunityDetail(null);
      const response = await BlogPostDetailsApi(slug);

      if (response.ok) {
        setCommunityDetail(response.data);
      } else {
        navigate("/404");
      }
    };

    // checks if we are in community page
    if (location.pathname === `/community/${slug}/`) {
      handlesCommunityDetails(slug);
    }
    if (location.pathname === `/blogpost_details/${slug}/`) {
      handlesBlogPostDetails(slug);
    }
  }, [access, slug]);

  useEffect(() => {
    // avoids scroll effect when the model is active for better ui control
    if (showModal) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }, [showModal, displaySidebar]);

  // handles sidebar display with model and de-activate forms for mobile screen mode
  function handleSidebar() {
    setDisplaySideBar(!displaySidebar);
    handleShowModal();
    setBlogForm(false);

    if (aboutComm === true) {
      setAboutComm(false);
    }
  }

  // handles blog form and also toggle the user model
  function _handleCommunityBlogForm() {
    if (location.pathname === "/") setCommunityForm(!communityForm);
    if (location.pathname === `/community/${slug}/`) setBlogForm(!blogForm);
    handleShowModal();

    if (displaySidebar === true) {
      setDisplaySideBar(false);
      SetShowModal(true);
    }
  }

  function handleAboutComm() {
    setAboutComm(!aboutComm);
    handleShowModal();
    setBlogForm(false);
  }

  return (
    <>
      <button
        className="__add-or-comment fixed bottom-5 right-5 cursor-pointer"
        onClick={_handleCommunityBlogForm}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`create ${
            blogForm || (communityForm && "rotate-create-svg")
          }`}
        >
          <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white" />
        </svg>
      </button>

      {/* Blog post form */}
      {location.pathname === `/community/${slug}/` && (
        <BlogpostForm
          _handleCommunityBlogForm={_handleCommunityBlogForm}
          blogForm={blogForm}
        />
      )}

      {location.pathname === "/" && (
        <CommunityForm
          _handleCommunityBlogForm={_handleCommunityBlogForm}
          communityForm={communityForm}
        />
      )}

      <AboutCommunity
        aboutComm={aboutComm}
        setAboutComm={setAboutComm}
        handleAboutComm={handleAboutComm}
      />

      {/* web page side bar */}
      <div className={`__reddit-page ${scroll && "no-scroll hidden"}`}>
        <div className="container-sidebar__">
          <Sidebar displaySidebar={displaySidebar} />
        </div>

        {/* web page nav bar */}
        <div className="container-main-page__">
          <Navbar
            handleSidebar={handleSidebar}
            communityDetail={communityDetail}
            aboutComm={aboutComm}
            setAboutComm={setAboutComm}
            handleAboutComm={handleAboutComm}
          />
          <div className="container-articles-items">{children}</div>
        </div>

        <div
          className={`main-modal_ ${
            showModal ? "modal-active" : "disabled-modal"
          }`}
          onClick={handleSidebar}
        />
      </div>
    </>
  );
};

export default Layout;
