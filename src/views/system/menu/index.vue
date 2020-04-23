<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="菜单名称" class="filter-item">
          <el-input v-model="listQuery.title" placeholder="请输入菜单名" style="width: 200px;" class="filter-item"
                    @keyup.enter.native="handleFilter"/>
        </el-form-item>
        <el-form-item  class="filter-item">
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
          </el-button>
        </el-form-item>
        <el-form-item  class="filter-item">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="handleCreate">
            添加菜单
          </el-button>
        </el-form-item>
        <el-form-item  class="filter-item">
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
      :data="menuList"
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
      <el-table-column label="菜单名称"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单级数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="前端名称"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="前端名称"  align="center">
        <template slot-scope="{row}">
          <span><i :class="`el-icon-${row.icon}`" style="font-size: 20px;"></i></span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.hidden | menustatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button :type="row.hidden ? 'success' : 'danger'" size="mini" @click="handleVisible(row)">
            {{ row.hidden ? "启用" : "禁用" }}
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
  import { mapState } from "vuex";

  import Pagination from '@/components/Pagination';
  import EditComponent from './edit/index.vue';
  import AddComponent from './add/index.vue';


  export default {
    name: 'menu_list',

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
      this.$store.dispatch("menu/getMenuList");
    },
    computed: {
      ...mapState({
        token: state => state.menu.token,
        menuList: state => state.menu.menuList,
        listQuery: state => state.menu.listQuery,
        total: state => state.menu.total,
        listLoading: state => state.menu.listLoading,
      })
    },
    methods: {
      // 重置功能
      resetList() {
        this.$store.commit("menu/RESET_LISTQUERY")
        this.$store.dispatch("menu/getMenuList");
      },
      // 获取列表
      getList() {
        this.$store.dispatch("menu/getMenuList");
      },
      // 创建角色
      handleCreate() {
        this.$store.commit("menu/SET_ADDVISIBLE", true);
        this.$store.dispatch("menu/getParentOptionsList");
      },
      //编辑角色
      handleUpdate(row) {
        this.$store.dispatch("menu/getParentOptionsList");
        this.$store.dispatch("menu/getMenuInfo", row.id);
      },
      // 启用禁用
      handleVisible(row) {
        var that = this;
        this.$store.commit("menu/SET_ID", row.id);
        this.$store.dispatch("menu/changeVisibleMenu", {status: row.status ? 0 : 1}).then((e) => {
          if(e.success) {
            that.$notify({
              title: row.status ? '禁用成功' : "启用成功",
              type: 'success',
              duration: 2000
            });
            that.$store.dispatch("menu/getMenuList");
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
        this.$store.commit("menu/SET_LISTQUERY", this.listQuery)
        this.$store.dispatch("menu/getMenuList");
      },
      sortChange(data) {
        const {prop, order} = data
        if (prop === 'id') {
          if(order === "ascending") {
            this.listQuery.order = "asc"
          } else if(order === "descending") {
            this.listQuery.order = "desc";
          } else {
            this.listQuery.order = null;
          }
          this.$store.commit("menu/SET_LISTQUERY", this.listQuery)
          this.$store.dispatch("menu/getMenuList");
        }
      },
      getSortClass: function (key) {
        const sort = this.listQuery.sort
        return sort === `+${key}` ? 'ascending' : 'descending'
      }
    }
  };
</script>
