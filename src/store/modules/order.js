import {getOrderList, createOrder, getOrderInfo, updateOrder } from "@/api/order.js";

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
    mobile: "",
    admin_id: ""
  },
  datainfo: {
    role_name: "",
    role_desc: "",
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
  RESET_LISTQUERY: (state, listQuery) => {
    state.listQuery = {
      page: 1,
      size: 10,
      name: undefined,
      order: "id desc",
      time: [],
      mobile: "",
      admin_id: ""
    }
  }
}

const actions = {
  // 获取列表
  async getOrderList({commit, state}, adminId) {
    commit("SET_LISTLOADING", true);
    const data = {
      page: state.listQuery.page,
      size: state.listQuery.size,
      name: state.listQuery.name,
      order: state.listQuery.order,
      start_time: state.listQuery.time.length > 0 ? new Date(state.listQuery.time[0]).getTime() : "",
      end_time: state.listQuery.time.length > 0 ?  new Date(state.listQuery.time[1]).getTime() : "",
      admin_id: adminId,
      mobile: state.listQuery.mobile,
    }
    await getOrderList(data).then(response => {
      if (response.errno === 0) {
        commit("SET_ROLELIST", response.data.data);
        commit("SET_TOTAL", response.data.count);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 获取用户信息
  async getOrderInfo({commit, state}, id) {
    commit("SET_LISTLOADING", true);
    await getOrderInfo(id).then(response => {
      if (response.errno === 0) {
        commit("SET_DATAINFO", {
          role_name: response.data.role_name,
          role_desc: response.data.role_desc,
        });
        commit("SET_ID", response.data.id);
        commit("SET_EDITVISIBLE", true);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 新建用户
  async createOrder({commit, dispatch}, data) {
    var that = this;
    const result = await createOrder(data).then((e) => {
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
  async updateOrder({commit, dispatch, state}, data) {
    var that = this;
    const result = await updateOrder({ id: state.id, data: data }).then((e) => {
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
  async changeVisibleOrder({ commit, dispatch, state }, data) {
    const result = await dispatch("updateOrder", data);
    return result;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

