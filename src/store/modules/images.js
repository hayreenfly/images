const state = {
  images: [],
};

const getters = {
  allImages: (state) => state.images,
};

const actions = {
  fetchImages() {
    console.log("fetch images!");
  },
};

const mutations = {
  setImages: (state, images) => {
    state.images = images;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
