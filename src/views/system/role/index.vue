<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" @submit.native.prevent>
        <el-form-item label="用户名" class="filter-item">
          <el-input v-model="listQuery.name" placeholder="请输入用户名" style="width: 200px;" class="filter-item"
                    @keyup.enter.native="handleFilter"/>
        </el-form-item>
        <el-form-item label="小组">
          <el-select v-model="listQuery.dept_id" placeholder="请选择小组" clearable style="width: 300px">
            <el-option v-for="(item,index) in deptList" :key="index" :label="item.name" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="用户手机号" class="filter-item">
          <el-input v-model="listQuery.mobile" placeholder="请输入用户手机号" style="width: 200px;" class="filter-item"
                    @keyup.enter.native="handleFilter"/>
        </el-form-item>
        <el-form-item label="开始结束时间" class="filter-item">
          <el-date-picker
            v-model="listQuery.time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @keyup.enter.native="handleFilter"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="filter-item">
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
          </el-button>
        </el-form-item>
        <el-form-item class="filter-item">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="handleCreate">
            添加订单
          </el-button>
        </el-form-item>
        <el-form-item class="filter-item">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh"
                     @click="resetList">
            重置
          </el-button>
        </el-form-item>
        <el-form-item class="filter-item">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh"
                     @click="exportExcel">
            导出Excel
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      class="table"
      :key="tableKey"
      v-loading="listLoading"
      :data="roleList"
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
      <el-table-column label="员工ID" align="center">
        <template slot-scope="{row}">
          <span>{{ row.admin_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="小组名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.dept_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户手机号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户地址" align="center">
        <template slot-scope="{row}">
          <span v-if="row.province_num != row.city_num">{{ row.province }}{{ row.city }}{{ row.county}}{{row.town}}{{row.addr}}</span>
          <span v-else>{{ row.province }}{{ row.county}}{{row.addr}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.create_time | timeStampToYMRHMS }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status | payStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="success" size="mini" @click="handleVisible(row, 2)">
            签收
          </el-button>
          <el-button type="danger" size="mini" @click="handleVisible(row, 3)">
            退回
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
  import FileSaver from "file-saver";
  import XLSX from "xlsx";


  import Pagination from '@/components/Pagination';
  import EditComponent from './edit/index.vue';
  import AddComponent from './add/index.vue';


  export default {
    name: 'auth_role_list',

    components: {
      Pagination,
      EditComponent,
      AddComponent
    },
    data() {
      return {
        tableKey: 0,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        autoWidth: true,
        bookType: 'xlsx'
      }
    },
    created() {
      this.$store.dispatch("auth_role/getAuthRoleList");
      this.$store.dispatch("area/getDeptList");
    },
    computed: {
      ...mapState({
        token: state => state.auth_role.token,
        roleList: state => state.auth_role.roleList,
        listQuery: state => state.auth_role.listQuery,
        total: state => state.auth_role.total,
        listLoading: state => state.auth_role.listLoading,
        deptList: state => state.area.deptList
      })
    },
    methods: {
      //导出excel
      exportExcel() {

        const time  = new Date();
        const name = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
        var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
        /* get binary string as output */
        var wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          //  name+'.xlsx'表示导出的excel表格名字
          FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            name + ".xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      },
      // 重置功能
      resetList() {
        this.$store.commit("auth_role/RESET_LISTQUERY")
        this.$store.dispatch("auth_role/getAuthRoleList");
      },
      // 获取列表
      getList() {
        this.$store.dispatch("auth_role/getAuthRoleList");
      },
      // 创建订单
      handleCreate() {
        this.$store.dispatch("area/getAreaTree", 0);
        this.$store.commit("auth_role/SET_ADDVISIBLE", true);
        this.$store.dispatch("user/getAllUserList");
      },
      //编辑订单
      handleUpdate(row) {
        this.$store.dispatch("area/getAreaTree", 0);
        this.$store.dispatch("auth_role/getAuthRoleInfo", row.id);
        this.$store.dispatch("user/getAllUserList");
      },
      // 启用禁用
      handleVisible(row, status) {
        var that = this;
        this.$store.commit("auth_role/SET_ID", row.id);
        this.$store.dispatch("auth_role/changeVisibleAuthRole", {status: status}).then((e) => {
          if (e.success) {
            that.$notify({
              title: row.status ? '禁用成功' : "启用成功",
              type: 'success',
              duration: 2000
            });
            that.$store.dispatch("auth_role/getAuthRoleList");
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
        this.$store.commit("auth_role/SET_LISTQUERY", this.listQuery)
        this.$store.dispatch("auth_role/getAuthRoleList");
      },
      sortChange(data) {
        const {prop, order} = data
        if (prop === 'id') {
          if (order === "ascending") {
            this.listQuery.order = "asc"
          } else if (order === "descending") {
            this.listQuery.order = "desc";
          } else {
            this.listQuery.order = null;
          }
          this.$store.commit("auth_role/SET_LISTQUERY", this.listQuery)
          this.$store.dispatch("auth_role/getAuthRoleList");
        }
      },
      getSortClass: function (key) {
        const sort = this.listQuery.sort
        return sort === `+${key}` ? 'ascending' : 'descending'
      }
    }
  };
</script>
