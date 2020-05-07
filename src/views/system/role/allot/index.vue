<template>
  <el-dialog title="批量分配" :visible.sync="allotVisible" :before-close="cancelDialog">
    <el-form ref="dataForm" :rules="rules" :model="formObj" label-position="left" label-width="100px"
             style="width: 400px; margin-left:50px;">
      <el-form-item label="员工id">
        <el-select v-model="formObj.admin_id" placeholder="请选择员工" clearable style="width: 400px">
          <el-option v-for="(item,index) in userList" :key="index" :label="item.username" :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">
        取消
      </el-button>
      <el-button type="primary" @click="createData()">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "index.vue",
    data() {
      return {
        rules: {
          address: [
            { required: true, message: "请输入地址信息", trigger: "blur" }
          ],
          address_desc: [
            { required: true, message: "请输入地址详细信息", trigger: "blur" }
          ],
          name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          town: [{ required: true, message: "请输入乡镇", trigger: "blur" }],
          mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }]
        },
        props: {
          value: 'id',
          children: 'children'
        },
        formObj: {
          admin_id: ""
        }
      }
    },
    computed: {
      ...mapState({
        allotVisible: state => state.auth_role.allotVisible,
        userList: state => state.user.userList,
        multipleSelection: state => state.auth_role.multipleSelection,
      }),
    },
    methods: {
      cancelDialog() {
        this.$store.commit("auth_role/SET_ALLOTVISIBLE", false);
      },
      createData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid) {
            const data = {};
            data.admin_id = this.formObj.admin_id;
            data.order_ids = this.multipleSelection.map((item) => {
              let obj = {};
              obj.id = item.id;
              obj.mobile = item.mobile;
              return obj;
            });
            console.log(data, "data");
            console.log(this.multipleSelection, "data");
            this.$store.dispatch("order/createOrder", data).then((e) => {
              if(e.success) {
                that.$notify({
                  title: '分配订单成功',
                  type: 'success',
                  duration: 2000
                });
                that.formObj = {
                  admin_id: ""
                };
                that.$store.commit("auth_role/RESET_LISTQUERY");
                that.$store.dispatch("auth_role/getAuthRoleList");
              } else {
                that.$notify({
                  title: '分配订单失败',
                  message: e.data.errmsg,
                  type: 'fail',
                  duration: 2000
                });
              }
            });
          }
        })
      }
    }

  }
</script>

<style scoped>

</style>
