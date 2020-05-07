<template>
  <el-dialog title="新增前端订单" :visible.sync="addVisible" :before-close="cancelDialog">
    <el-form ref="dataForm" :rules="rules" :model="formObj" label-position="left" label-width="100px"
             style="width: 400px; margin-left:50px;">
      <el-form-item label="员工id">
        <el-select v-model="formObj.admin_id" placeholder="请选择员工" clearable style="width: 400px">
          <el-option v-for="(item,index) in userList" :key="index" :label="item.username" :value="[item.id, item.dept_id]"/>
        </el-select>
      </el-form-item>
      <el-form-item label="地址信息" prop="address">
        <el-cascader
          :options="options"
          :props="props"
          v-model="formObj.address"
          style="width: 400px;"
          @change="addressChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="乡镇" prop="town">
        <el-select v-model="formObj.town" placeholder="请选择乡镇" clearable style="width: 400px">
          <el-option v-for="(item,index) in townList" :key="index" :label="item.label" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="address_desc">
        <el-input v-model="formObj.address_desc" placeholder="请输入详细地址" style="width: 400px;"/>
      </el-form-item>
      <el-form-item label="收货人姓名" prop="name">
        <el-input v-model="formObj.name" placeholder="请输入姓名" style="width: 400px;"/>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="formObj.mobile" placeholder="请输入手机号码" style="width: 400px;"/>
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
          address: [],
          address_desc: "",
          mobile: "",
          name: "",
          town: "",
          admin_id: []
        }
      }
    },
    computed: {
      ...mapState({
        addVisible: state => state.auth_role.addVisible,
        options: state => state.area.tree,
        townList: state => state.area.townList,
        userList: state => state.user.userList,
      }),
    },
    methods: {
      addressChange(e) {
        this.formObj.town = "";
        this.$store.dispatch("area/getTownList", { pid: e[2] })
      },
      cancelDialog() {
        this.$store.commit("auth_role/SET_ADDVISIBLE", false);
      },
      createData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid) {
            const data = this.formObj.admin_id;
            this.formObj.admin_id = data[0];
            this.formObj.dept_id = data[1];
            this.$store.dispatch("auth_role/createAuthRole", this.formObj).then((e) => {
              if(e.success) {
                that.$notify({
                  title: '添加用户成功',
                  type: 'success',
                  duration: 2000
                });
                that.formObj = {
                  address: [],
                  address_desc: "",
                  mobile: "",
                  name: "",
                  town: "",
                  admin_id: []
                };
                that.$store.commit("auth_role/RESET_LISTQUERY");
                that.$store.dispatch("auth_role/getAuthRoleList");
              } else {
                that.$notify({
                  title: '添加用户失败',
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
