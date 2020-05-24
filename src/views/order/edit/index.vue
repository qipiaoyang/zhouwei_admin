<template>
  <el-dialog title="编辑前端订单" :visible.sync="editVisible" :before-close="cancelDialog">
    <el-form ref="dataForm" :rules="rules" :model="formObj" label-position="left" label-width="100px"
             style="width: 400px; margin-left:50px;">
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
      <el-button type="primary" @click="updateData()">
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
          mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }]
        },
        props: {
          value: 'id',
          children: 'children'
        },
      }
    },
    computed: {
      ...mapState({
        editVisible: state => state.auth_role.editVisible,
        formObj: state => state.auth_role.datainfo,
        options: state => state.area.tree,
        townList: state => state.auth_role.townList,
        userList: state => state.user.userList,
      }),
    },
    methods: {
      addressChange(e) {
        this.formObj.town = "";
        this.$store.dispatch("auth_role/getTownList", { pid: e[2] })
      },
      cancelDialog() {
        this.$store.commit("auth_role/SET_EDITVISIBLE", false);
      },
      updateData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid) {
            // console.log(that.formObj);
            that.formObj.admin_id = that.formObj.ids.split(",")[0];
            that.formObj.dept_id = that.formObj.ids.split(",")[1];
            delete that.formObj.ids;
            if(!that.formObj.town) {
              that.formObj.town = 0;
            }
            this.$store.dispatch("auth_role/updateAuthRole", that.formObj).then((e) => {
              if(e.success) {
                that.$notify({
                  title: '编辑角色成功',
                  type: 'success',
                  duration: 2000
                });
                that.$store.commit("auth_role/RESET_LISTQUERY");
                that.$store.dispatch("auth_role/getAuthRoleList");
              } else {
                that.$notify({
                  title: '编辑角色失败',
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
