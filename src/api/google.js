import qs from "qs";
import axios from "axios";

const CLIENT_ID =
  "758922448848-dmoutat9qe9cj9qk2aopbq7sgrrn6377.apps.googleusercontent.com";
const ROOT_URL = "https://accounts.google.com/o/oauth2/v2/auth?";

export default {
  login() {
    const querystring = {
      included_granted_scopes: true,
      response_type: "token",
      scope: "https://www.googleapis.com/auth/photoslibrary",
      client_id: CLIENT_ID,
      redirect_uri: "http://localhost:8080",
    };

    window.location = `${ROOT_URL}?${qs.stringify(querystring)}`;
  },
  fetchImages(token) {
    return axios.get(`https://photoslibrary.googleapis.com/v1/mediaItems`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  upload(images, token) {
    const promises = Array.from(images).map((image) => {
      const formData = new FormData();
      formData.append("image", image);

      return axios.post(
        `https://photoslibrary.googleapis.com/v1/uploads`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    });

    return Promise.all(promises);
  },
};
