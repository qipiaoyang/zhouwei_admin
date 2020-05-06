import {getAuthRoleList, createAuthRole, getAuthRoleInfo, updateAuthRole } from "@/api/auth_role.js";
import { getTownList } from "@/api/area.js";
const state = {

  editVisible: false, // 编辑弹窗状态
  addVisible: false, // 编辑弹窗状态
  roleList: [], // 用户列表
  total: 0,
  id: "",
  listQuery: {
    page: 1,
    size: 10,
    name: undefined,
    order: "id desc",
    time: [],
    dept_id: "",
    mobile: "",
  },
  datainfo: {
    role_name: "",
    role_desc: "",
  }, // 用户信息
  listLoading: false,
  townList: []
}

const mutations = {
  SET_EDITVISIBLE: (state, editVisible) => {
    state.editVisible = editVisible;
  },
  SET_ADDVISIBLE: (state, addVisible) => {
    state.addVisible = addVisible;
  },
  SET_ROLELIST: (state, roleList) => {
    state.roleList = roleList;
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
  SET_TOWNLIST: (state, townList) => {
    state.townList = townList;
  },
  RESET_LISTQUERY: (state, listQuery) => {
    state.listQuery = {
      page: 1,
      size: 10,
      name: undefined,
      order: "id desc",
      time: [],
      dept_id: "",
      mobile: "",
    }
  }
}

const actions = {
  // 获取列表
  async getAuthRoleList({commit, state}) {
    commit("SET_LISTLOADING", true);
    const data = {
      page: state.listQuery.page,
      size: state.listQuery.size,
      name: state.listQuery.name,
      order: state.listQuery.order,
      start_time: state.listQuery.time.length > 0 ? new Date(state.listQuery.time[0]).getTime() : "",
      end_time: state.listQuery.time.length > 0 ?  new Date(state.listQuery.time[1]).getTime() : "",
      dept_id: state.listQuery.dept_id,
      mobile: state.listQuery.mobile,
    }
    await getAuthRoleList(data).then(response => {
      if (response.errno === 0) {
        commit("SET_ROLELIST", response.data.data);
        commit("SET_TOTAL", response.data.count);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 获取用户信息
  async getAuthRoleInfo({commit, state, dispatch}, id) {
    commit("SET_LISTLOADING", true);
    await getAuthRoleInfo(id).then(response => {
      if (response.errno === 0) {
        commit("SET_DATAINFO", {
          ids: response.data.admin_id + "," +response.data.dept_id,
          address: [response.data.province, response.data.city, response.data.county],
          town: response.data.town,
          address_desc: response.data.addr,
          name: response.data.name,
          mobile: response.data.mobile,
        });
        dispatch("getTownList", { pid: response.data.county })
        commit("SET_ID", response.data.id);
        commit("SET_EDITVISIBLE", true);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 获取乡镇列表
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
  // 新建用户
  async createAuthRole({commit, dispatch}, data) {
    var that = this;
    const result = await createAuthRole(data).then((e) => {
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
  async updateAuthRole({commit, dispatch, state}, data) {
    var that = this;
    const result = await updateAuthRole({ id: state.id, data: data }).then((e) => {
      if (e.errno === 0) {
        commit("SET_EDITVISIBLE", false);
        commit("SET_ID", "");

        commit("SET_DATAINFO",{
          role_name: "",
          role_desc: "",
        })

        return {success: true};
      } else {
        return {success: false};
      }
    })
    return result;
  },
  // 启用禁用状态
  async changeVisibleAuthRole({ commit, dispatch, state }, data) {
    const result = await dispatch("updateAuthRole", data);
    return result;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

