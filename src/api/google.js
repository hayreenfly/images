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
      scope:
        "https://www.googleapis.com/auth/photoslibrary.readonly https://www.googleapis.com/auth/photoslibrary.appendonly https://www.googleapis.com/auth/photoslibrary.readonly.appcreateddata https://www.googleapis.com/auth/photoslibrary.edit.appcreateddata https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.sharing",
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
  uploadImages(images, token) {
    const promises = Array.from(images).map((image) => {
      return new Promise((r) => {
        axios
          .post("https://photoslibrary.googleapis.com/v1/uploads", image, {
            headers: {
              "Content-Type": "application/octet-stream",
              "X-Goog-Upload-File-Name": image.name,
              "X-Goog-Upload-Protocol": "raw",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            r({
              description: "item-description",
              simpleMediaItem: {
                fileName: image.name,
                uploadToken: response.data,
              },
            });
          });
      });
    });
    return Promise.all(promises).then((e) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate",
            JSON.stringify({ newMediaItems: e }),
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(resolve)
          .catch(reject);
      });
    });
  },
};
