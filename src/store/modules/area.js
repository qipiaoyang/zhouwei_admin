import { getAreaTree } from "@/api/area.js";

const state = {
  tree: []
}

const mutations = {
  SET_TREE: (state, tree) => {
    state.tree = tree;
  },
}

const actions = {
  // 获取列表
  async getAreaTree({commit, state}) {
    await getAreaTree().then(response => {
      if (response.errno === 0) {
        commit("SET_TREE", response.data);
      }
    })
  },
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

