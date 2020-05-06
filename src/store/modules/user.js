import {getUserList, createUser, getUserInfo, updateUser } from "@/api/auth_user.js";

const state = {

  editVisible: false, // 编辑弹窗状态
  addVisible: false, // 编辑弹窗状态
  userList: [], // 用户列表
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
    dept_id: ""
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
  SET_USERLIST: (state, userList) => {
    state.userList = userList;
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
  async getUserList({commit, state}) {
    commit("SET_LISTLOADING", true);
    await getUserList(state.listQuery).then(response => {
      if (response.errno === 0) {
        commit("SET_USERLIST", response.data.data);
        commit("SET_TOTAL", response.data.count);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  async getAllUserList({commit, state}) {
    commit("SET_LISTLOADING", true);
    await getUserList().then(response => {
      if (response.errno === 0) {
        commit("SET_USERLIST", response.data);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 获取用户信息
  async getUserInfo({commit, state}, id) {
    commit("SET_LISTLOADING", true);
    await getUserInfo(id).then(response => {
      if (response.errno === 0) {
        commit("SET_DATAINFO", {
          username: response.data.username,
          mobile: response.data.mobile,
          email: response.data.email,
          dept_id: response.data.dept_id
        });
        commit("SET_ID", response.data.id);
        commit("SET_EDITVISIBLE", true);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 新建用户
  async createUser({commit, dispatch}, data) {
    var that = this;
    const result = await createUser(data).then((e) => {
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
  async updateUser({commit, dispatch, state}, data) {
    var that = this;
    const result = await updateUser({ id: state.id, data: data }).then((e) => {
      if (e.errno === 0) {
        commit("SET_EDITVISIBLE", false);
        commit("SET_ID", "");

        commit("SET_DATAINFO",{
          username: "",
          mobile: "",
          email: "",
          dept_id: ""
        })

        return {success: true};
      } else {
        return {success: false};
      }
    })
    return result;
  },
  // 启用禁用状态
  async changeVisibleUser({ commit, dispatch, state }, data) {
    const result = await dispatch("updateUser", data);
    return result;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

