<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" @submit.native.prevent>
        <el-form-item label="用户名" class="filter-item">
          <el-input v-model="listQuery.name" placeholder="请输入用户名" style="width: 200px;" class="filter-item"
                    @keyup.enter.native="handleFilter"/>
        </el-form-item>
        <el-form-item class="filter-item">
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
          </el-button>
        </el-form-item>
        <el-form-item class="filter-item">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="handleCreate">
            添加用户
          </el-button>
        </el-form-item>
        <el-form-item class="filter-item">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh"
                     @click="resetList">
            重置
          </el-button>
        </el-form-item>

      </el-form>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="userList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center"
                       :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" align="center">
        <template slot-scope="{row}">
          <span>{{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="业绩" align="center">
        <template slot-scope="{row}">
          <span>{{ row.num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="小组名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dept_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status | userstatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" class-name="status-col">
        <template slot-scope="{row}">
          <span>{{ row.update_time  | timeStampToYMRHMS }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button :type="row.status ? 'danger' : 'success'" size="mini" @click="handleVisible(row)">
            {{ row.status ? "禁用" : "启用" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
                @pagination="getList"/>
    <EditComponent></EditComponent>
    <AddComponent></AddComponent>

  </div>
</template>

<script>
  import {mapState} from "vuex";

  import Pagination from '@/components/Pagination';
  import EditComponent from './edit/index.vue';
  import AddComponent from './add/index.vue';


  export default {
    name: 'user_list',

    components: {
      Pagination,
      EditComponent,
      AddComponent
    },
    data() {
      return {
        tableKey: 0,
      }
    },
    created() {
      this.$store.dispatch("user/getUserList");
    },
    computed: {
      ...mapState({
        token: state => state.user.token,
        userList: state => state.user.userList,
        listQuery: state => state.user.listQuery,
        total: state => state.user.total,
        listLoading: state => state.user.listLoading,
      })
    },
    methods: {
      // 重置功能
      resetList() {
        this.$store.commit("user/RESET_LISTQUERY")
        this.$store.dispatch("user/getUserList");
      },
      // 获取列表
      getList() {
        this.$store.dispatch("user/getUserList");
      },
      // 创建用户
      handleCreate() {
        this.$store.dispatch("area/getDeptList");
        this.$store.commit("user/SET_ADDVISIBLE", true);
      },
      //编辑用户
      handleUpdate(row) {
        this.$store.dispatch("area/getDeptList");
        this.$store.dispatch("user/getUserInfo", row.id);
      },
      // 启用禁用
      handleVisible(row) {
        var that = this;
        this.$store.commit("user/SET_ID", row.id);
        this.$store.dispatch("user/changeVisibleUser", {status: row.status ? 0 : 1}).then((e) => {
          if (e.success) {
            that.$notify({
              title: row.status ? '禁用成功' : "启用成功",
              type: 'success',
              duration: 2000
            });
            that.$store.dispatch("user/getUserList");
          } else {
            that.$notify({
              title: row.staus ? '禁用失败' : "启用失败",
              type: 'success',
              duration: 2000
            });
          }
        });
      },
      // 过滤
      handleFilter() {
        this.listQuery.page = 1;
        this.$store.commit("user/SET_LISTQUERY", this.listQuery)
        this.$store.dispatch("user/getUserList");
      },
      sortChange(data) {
        const {prop, order} = data
        if (prop === 'id') {
          if (order === "ascending") {
            this.listQuery.sortOrder = "asc"
          } else if (order === "descending") {
            this.listQuery.sortOrder = "desc";
          } else {
            this.listQuery.sortOrder = null;
          }
          this.$store.commit("user/SET_LISTQUERY", this.listQuery)
          this.$store.dispatch("user/getUserList");
        }
      },
      getSortClass: function (key) {
        const sort = this.listQuery.sort
        return sort === `+${key}` ? 'ascending' : 'descending'
      }
    }
  };
</script>
