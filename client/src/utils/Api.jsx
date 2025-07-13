import axios from "axios";

const api = axios.create({
  baseURL: "api/community/",
});

// getting community, users community and members of the community
const communityMembers = async () => {
  const token = localStorage.getItem("access");

  if (token) {
    try {
      await api.get(`community-user/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export { communityMembers };
