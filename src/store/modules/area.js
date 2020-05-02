import { getAreaTree, getTownList, getDeptList } from "@/api/area.js";

const state = {
  tree: [],
  townList: [],
  type: 1,
  pid: 0,
  deptList: []
}

const mutations = {
  SET_TREE: (state, tree) => {
    state.tree = tree;
  },
  SET_TYPE: (state, type) => {
    state.type = type;
  },
  SET_PID: (state, pid) => {
    state.pid = pid;
  },
  SET_TOWNLIST: (state, townList) => {
    state.townList = townList;
  },
  SET_DEPTLIST: (state, deptList) => {
    state.deptList = deptList;
  }
}

const actions = {
  // 获取列表
  async getAreaTree({commit, state}, {type, pid}) {
    await getAreaTree().then(response => {
      if (response.errno === 0) {
        commit("SET_TREE", response.data);
      }
    })
  },

  async getTownList({commit, state}, {pid}) {
    await getTownList({
      type: 4,
      pid: pid
    }).then(response => {
      if (response.errno === 0) {
        commit("SET_TOWNLIST", response.data);
      }
    })
  },
  async getDeptList({commit, state}) {
    await getDeptList().then(response => {
      if (response.errno === 0) {
        commit("SET_DEPTLIST", response.data);
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

