<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" @submit.native.prevent>
        <el-form-item label="用户名" class="filter-item">
          <el-input v-model="listQuery.name" placeholder="请输入用户名" style="width: 200px;" class="filter-item"
                    @keyup.enter.native="handleFilter"/>
        </el-form-item>
        <el-form-item label="客服人员">
          <el-select v-model="listQuery.admin_id" placeholder="请选择前端人员" clearable style="width: 300px">
            <el-option v-for="(item,index) in userList" :key="index" :label="item.username" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="用户手机号" class="filter-item">
          <el-input v-model="listQuery.mobile" placeholder="请输入用户手机号" style="width: 200px;" class="filter-item"
                    @keyup.enter.native="handleFilter"/>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="listQuery.status" placeholder="请选择订单状态" clearable style="width: 300px">
            <el-option v-for="(item,index) in allotStatus" :key="index" :label="item.label" :value="item.value"/>
          </el-select>
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
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="handleAllot">
            批量分配
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
        <el-form-item class="filter-item">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                     @click="handleImport">
            导入快递码
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      class="table"
      :key="tableKey"
      v-loading="listLoading"
      ref="multipleTable"
      :data="roleList"
      @selection-change="handleSelectionChange"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        type="selection"
        width="40">
      </el-table-column>
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
      <el-table-column label="快递单号"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.courier_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.mark }}</span>
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
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="primary" size="mini" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size"
                @pagination="getList"/>
    <EditComponent></EditComponent>
    <AddComponent></AddComponent>
    <AllotComponent></AllotComponent>
    <ImportComponent></ImportComponent>


  </div>
</template>

<script>
  import {mapState} from "vuex";
  import FileSaver from "file-saver";
  import XLSX from "xlsx";


  import Pagination from '@/components/Pagination';
  import EditComponent from './edit/index.vue';
  import AddComponent from './add/index.vue';
  import AllotComponent from './allot/index.vue';
  import ImportComponent from './import/index.vue';


  export default {
    name: 'auth_role_list',

    components: {
      Pagination,
      EditComponent,
      AddComponent,
      AllotComponent,
      ImportComponent
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
        bookType: 'xlsx',
        allotStatus: [
          {
            value: "",
            label: "全部"
          },
          {
            value: "0",
            label: "已发货"
          },
          {
            value: 2,
            label: "已签收"
          },
          {
            value: 3,
            label: "已退回"
          },
          {
            value: 4,
            label: "异常"
          },
          {
            value: 5,
            label: "其他"
          },{
            value: 6,
            label: "完成"
          },
        ]
      }
    },
    created() {
      this.$store.commit("auth_role/RESET_LISTQUERY");
      this.$store.dispatch("auth_role/getAuthRoleList");
      this.$store.dispatch("area/getDeptList");
      this.$store.dispatch("user/getfrontUserList");
    },
    computed: {
      ...mapState({
        token: state => state.auth_role.token,
        multipleSelection: state => state.auth_role.multipleSelection,
        roleList: state => state.auth_role.roleList,
        listQuery: state => state.auth_role.listQuery,
        total: state => state.auth_role.total,
        listLoading: state => state.auth_role.listLoading,
        deptList: state => state.area.deptList,
        userList: state => state.user.userList
      })
    },
    methods: {
      handleImport() {
        this.$store.commit("auth_role/SET_IMPORTVISIBLE", true);
      },
      // 批量分配
      handleAllot() {
        this.$store.commit("auth_role/SET_ALLOTVISIBLE", true);
        this.$store.dispatch("user/getendUserList");
      },
      handleSelectionChange(val) {
        this.$store.commit("auth_role/SET_MULTIPLESELECTION", val);
      },
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
      //删除订单
      handleDelete(row) {
        var that = this;
        this.$store.dispatch("auth_role/deleteAuthRole", { id: row.id, data: {visible: 0} }).then((e) => {
          if(e.success) {
            that.$notify({
              title: '删除订单成功',
              type: 'success',
              duration: 2000
            });
            that.$store.commit("auth_role/RESET_LISTQUERY");
            that.$store.dispatch("auth_role/getAuthRoleList");
          } else {
            that.$notify({
              title: '删除订单失败',
              message: e.data.errmsg,
              type: 'fail',
              duration: 2000
            });
          }
        });;
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
