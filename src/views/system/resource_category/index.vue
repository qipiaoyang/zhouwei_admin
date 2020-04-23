<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery">
        <el-form-item label="角色名" class="filter-item">
          <el-input v-model="listQuery.desc" placeholder="请输入角色名" style="width: 200px;" class="filter-item"
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
            添加角色
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
      :data="resourceCategoryList"
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
      <el-table-column label="角色名"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="{row}">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status | userstatus }}</span>
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
  import { mapState } from "vuex";

  import Pagination from '@/components/Pagination';
  import EditComponent from './edit/index.vue';
  import AddComponent from './add/index.vue';


  export default {
    name: 'resource_category_list',

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
      this.$store.dispatch("resource_category/getResourceCategoryList");
    },
    computed: {
      ...mapState({
        token: state => state.resource_category.token,
        resourceCategoryList: state => state.resource_category.resourceCategoryList,
        listQuery: state => state.resource_category.listQuery,
        total: state => state.resource_category.total,
        listLoading: state => state.resource_category.listLoading,
      })
    },
    methods: {
      // 重置功能
      resetList() {
        this.$store.commit("resource_category/RESET_LISTQUERY")
        this.$store.dispatch("resource_category/getResourceCategoryList");
      },
      // 获取列表
      getList() {
        this.$store.dispatch("resource_category/getResourceCategoryList");
      },
      // 创建角色
      handleCreate() {
        this.$store.commit("resource_category/SET_ADDVISIBLE", true);
      },
      //编辑角色
      handleUpdate(row) {
        this.$store.dispatch("resource_category/getResourceCategoryInfo", row.id);
      },
      // 启用禁用
      handleVisible(row) {
        var that = this;
        this.$store.commit("resource_category/SET_ID", row.id);
        this.$store.dispatch("resource_category/changeVisibleResourceCategory", {status: row.status ? 0 : 1}).then((e) => {
          if(e.success) {
            that.$notify({
              title: row.status ? '禁用成功' : "启用成功",
              type: 'success',
              duration: 2000
            });
            that.$store.dispatch("resource_category/getResourceCategoryList");
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
        this.$store.commit("resource_category/SET_LISTQUERY", this.listQuery)
        this.$store.dispatch("resource_category/getResourceCategoryList");
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
          this.$store.commit("resource_category/SET_LISTQUERY", this.listQuery)
          this.$store.dispatch("resource_category/getResourceCategoryList");
        }
      },
      getSortClass: function (key) {
        const sort = this.listQuery.sort
        return sort === `+${key}` ? 'ascending' : 'descending'
      }
    }
  };
</script>
