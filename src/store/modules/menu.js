import {getMenuList, createMenu, getMenuInfo, updateMenu, getParentOptionsList} from "@/api/menu.js";

const state = {

  editVisible: false, // 编辑弹窗状态
  addVisible: false, // 编辑弹窗状态
  menuList: [], // 用户列表
  parentOptions: [], // 一级菜单
  total: 0,
  id: "",
  listQuery: {
    page: 1,
    size: 10,
    title: undefined,
    order: "id asc",
  },
  datainfo: {
    parent_id: 0,
    title: "",
    sort: 0,
    name: "",
    icon: "",
    hidden: 0,
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
  SET_ROLELIST: (state, menuList) => {
    state.menuList = menuList;
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
  SET_PARENTOPTIONS: (state, parentOptions) => {
    state.parentOptions = parentOptions;
  },
  RESET_LISTQUERY: (state, listQuery) => {
    state.listQuery = {
      page: 1,
      size: 10,
      title: undefined,
      order: "id asc",
    }
  }
}

const actions = {
  // 获取列表
  async getMenuList({commit, state}) {
    commit("SET_LISTLOADING", true);
    await getMenuList(state.listQuery).then(response => {
      if (response.errno === 0) {
        commit("SET_ROLELIST", response.data.data);
        commit("SET_TOTAL", response.data.count);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 获取列表
  async getParentOptionsList({commit, state}) {
    commit("SET_LISTLOADING", true);
    await getParentOptionsList().then(response => {
      if (response.errno === 0) {
        let optionsArr = response.data;
        optionsArr.unshift({
          id: 0,
          parent_id: 0,
          create_time: 1586402223298,
          title: "无上级分类",
          level: 0,
          sort: 0,
          name: "system",
          icon: "system",
          hidden: 0,
          reg_time: 0,
        });

        commit("SET_PARENTOPTIONS", optionsArr);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 获取用户信息
  async getMenuInfo({commit, state}, id) {
    commit("SET_LISTLOADING", true);
    await getMenuInfo(id).then(response => {
      if (response.errno === 0) {
        commit("SET_DATAINFO", {
          parent_id: response.data.parent_id,
          title: response.data.title,
          name: response.data.name,
          icon: response.data.icon,
          sort: response.data.sort,
          hidden: response.data.hidden,
        });
        commit("SET_ID", response.data.id);
        commit("SET_EDITVISIBLE", true);
        commit("SET_LISTLOADING", false);
      }
    })
  },
  // 新建用户
  async createMenu({commit, dispatch}, data) {
    var that = this;
    const result = await createMenu(data).then((e) => {
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
  async updateMenu({commit, dispatch, state}, data) {
    var that = this;
    const result = await updateMenu({id: state.id, data: data}).then((e) => {
      if (e.errno === 0) {
        commit("SET_EDITVISIBLE", false);
        commit("SET_ID", "");

        commit("SET_DATAINFO", {
          parent_id: 0,
          title: "",
          sort: 0,
          name: "",
          icon: "",
          hidden: 0,
        })

        return {success: true};
      } else {
        return {success: false};
      }
    })
    return result;
  },
  // 启用禁用状态
  async changeVisibleMenu({commit, dispatch, state}, data) {
    const result = await dispatch("updateMenu", data);
    return result;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

