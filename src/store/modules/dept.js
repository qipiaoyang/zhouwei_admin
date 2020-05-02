import {getDeptList, createDept, getDeptInfo, updateDept } from "@/api/dept.js";

const state = {

  editVisible: false, // 编辑弹窗状态
  addVisible: false, // 编辑弹窗状态
  list: [], // 用户列表
  total: 0,
  id: "",
  listQuery: {
    page: 1,
    size: 10,
    name: undefined,
    order: "update_time desc",
  },
  datainfo: {
    username: "",
    mobile: "",
    email: "",
  }, // 用户信息
  listLoading: false,
}

const mutations = {
  SET_EDITVISIBLE: (state, editVisible) => {
    state.editVisible = editVisible;
  },
  SET_ADDVISIBLE: (state, addVisible) => {
    state.addVisible = addVisible;
  },
  SET_LIST: (state, list) => {
    state.list = list;
  },
  SET_LISTQUERY: (state, listQuery) => {
    state.listQuery = listQuery;
  },
  SET_TOTAL: (state, total) => {
    state.total = total;
  },
  SET_LISTLOADING: (state, listLoading) => {
    state.listLoading = listLoading
  },
  SET_DATAINFO: (state, datainfo) => {
    state.datainfo = datainfo;
  },
  SET_ID: (state, id) => {
    state.id = id;
  },
  RESET_LISTQUERY: (state, listQuery) => {
    state.listQuery = {
      page: 1,
      size: 10,
      name: undefined,
      order: "update_time desc",
    }
  }
}

const actions = {
  // 获取列表
  async getDeptList({commit, state}) {
    commit("SET_LISTLOADING", true);
    await getDeptList(state.listQuery).then(response => {
      if (response.errno === 0) {
        commit("SET_LIST", response.data.data);
        commit("SET_TOTAL", response.data.count);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 获取用户信息
  async getDeptInfo({commit, state}, id) {
    commit("SET_LISTLOADING", true);
    await getDeptInfo(id).then(response => {
      if (response.errno === 0) {
        commit("SET_DATAINFO", {
          username: response.data.username,
          mobile: response.data.mobile,
          email: response.data.email,
        });
        commit("SET_ID", response.data.id);
        commit("SET_EDITVISIBLE", true);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 新建用户
  async createDept({commit, dispatch}, data) {
    var that = this;
    const result = await createDept(data).then((e) => {
      if (e.errno === 0) {
        commit("SET_ADDVISIBLE", false);

        return {success: true};
      } else {
        return {success: false};
      }
    })
    return result;
  },
  // 编辑用户
  async updateDept({commit, dispatch, state}, data) {
    var that = this;
    const result = await updateDept({ id: state.id, data: data }).then((e) => {
      if (e.errno === 0) {
        commit("SET_EDITVISIBLE", false);
        commit("SET_ID", "");

        commit("SET_DATAINFO",{
          username: "",
          mobile: "",
          email: "",
        })

        return {success: true};
      } else {
        return {success: false};
      }
    })
    return result;
  },
  // 启用禁用状态
  async changeVisibleDept({ commit, dispatch, state }, data) {
    const result = await dispatch("updateDept", data);
    return result;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

