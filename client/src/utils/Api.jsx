import axios from "axios";

const api = axios.create({
  baseURL: "api/community/",
});

// getting community, users community and members of the community
const communityMembers = async () => {
  const token = localStorage.getItem("access");

  if (token) {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/community/community-user/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(
        "Fetched Reddit data: ",
        error.response?.data || error.message
      );
      return [];
    }
  } else {
    return false;
  }
};

export { communityMembers };
