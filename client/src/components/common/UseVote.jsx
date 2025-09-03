import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogPostVoteApiCreate } from "../../utils/Api";

export default function UseVote() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleBlogPostVote = async (slug, voteType) => {
    const access = localStorage.getItem("access");

    if (!access) navigate("/login");

    const response = await blogPostVoteApiCreate(slug, voteType);

    if (response.data.ok) {
      setSuccess(response.data.message.message);
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } else {
      console.log("data not ok");
    }
  };

  return { handleBlogPostVote, setSuccess, success };
}
