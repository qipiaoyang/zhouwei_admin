<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" @submit.native.prevent>
        <el-form-item label="用户名" class="filter-item">
          <el-input v-model="listQuery.name" placeholder="请输入用户名" style="width: 200px;" class="filter-item"
                    @keyup.enter.native="handleFilter"/>
        </el-form-item>
        <el-form-item label="用户手机号" class="filter-item">
          <el-input v-model="listQuery.mobile" placeholder="请输入用户手机号" style="width: 200px;" class="filter-item"
                    @keyup.enter.native="handleFilter"/>
        </el-form-item>
        <el-form-item label="订单状态" class="filter-item">
          <el-select v-model="listQuery.status" placeholder="请选择后端人员" clearable style="width: 200px">
            <el-option v-for="(item,index) in orderStatus" :key="index" :label="item.label" :value="item.value"/>
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
        <el-form-item  class="filter-item">
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            搜索
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
      :data="roleList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户手机号"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="员工id"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.admin_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户地址" align="center">
        <template slot-scope="{row}">
          <span v-if="row.province_num != row.city_num">{{ row.province }}{{ row.city }}{{ row.county}}{{row.town}}{{row.addr}}</span>
          <span v-else>{{ row.province }}{{ row.county}}{{row.addr}}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.mark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="快递单号"  align="center">
        <template slot-scope="{row}">
          <span>{{ row.courier_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" min-width="110">
        <template slot-scope="{row}">
          <span>{{ row.create_time | timeStampToYMRHMS }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.status | payStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="500" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="info" size="mini" @click="handleVisible(row, 2)">
            签收
          </el-button>
          <el-button type="warning" size="mini" @click="handleVisible(row, 3)">
            退回
          </el-button>
          <el-button type="danger" size="mini" @click="handleVisible(row, 4)">
            异常
          </el-button>
          <el-button type="success" size="mini" @click="handleVisible(row, 6)">
            完成
          </el-button>
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

  </div>
</template>

<script>
  import { mapState } from "vuex";

  import Pagination from '@/components/Pagination';
  import EditComponent from './edit/index.vue';
  import AddComponent from './add/index.vue';


  export default {
    name: 'order_list',

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
        orderStatus: [
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
      this.$store.commit("auth_role/SET_LISTQUERY", {
          page: 1,
          size: 10,
          name: undefined,
          order: "id desc",
          time: [],
          dept_id: this.dept_id,
          mobile: "",
          status: "",
          admin_id: this.adminId
      });
      this.$store.dispatch("auth_role/getAuthRoleList");
    },
    computed: {
      ...mapState({
        roleList: state => state.auth_role.roleList,
        listQuery: state => state.auth_role.listQuery,
        total: state => state.auth_role.total,
        listLoading: state => state.auth_role.listLoading,
        adminId: state => state.app.admin_id,
        userList: state => state.user.userList,
        dept_id: state => state.app.dept_id,
      }),
    },
    methods: {
      // 重置功能
      resetList() {
        this.$store.commit("auth_role/SET_LISTQUERY", {
          page: 1,
          size: 10,
          name: undefined,
          order: "id desc",
          time: [],
          dept_id: this.dept_id,
          mobile: "",
          status: "",
          admin_id: this.adminId
        });
        this.$store.dispatch("auth_role/getAuthRoleList");
      },
      // 获取列表
      getList() {
        this.$store.dispatch("auth_role/getAuthRoleList");
      },
      // 启用禁用
      handleVisible(row, status) {
        var that = this;
        this.$store.commit("auth_role/SET_ID", row.id);
        this.$store.dispatch("auth_role/changeVisibleAuthRole", {status: status}).then((e) => {
          if(e.success) {
            that.$notify({
              title: "修改成功",
              type: 'success',
              duration: 2000
            });
            this.$store.commit("auth_role/SET_LISTQUERY", {
              page: 1,
              size: 10,
              name: undefined,
              order: "id desc",
              time: [],
              dept_id: this.dept_id,
              mobile: "",
              status: "",
              admin_id: this.adminId
            });
            this.$store.dispatch("auth_role/getAuthRoleList");
          } else {
            that.$notify({
              title: "修改失败",
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
        });
      },
    }
  };
</script>
