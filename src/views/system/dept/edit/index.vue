<template>
  <el-dialog title="编辑用户" :visible.sync="editVisible" :before-close="cancelDialog">
    <el-form ref="dataForm" :rules="rules" :model="datainfo" label-position="left" label-width="100px"
             style="width: 400px; margin-left:50px;">

      <el-form-item label="用户名" prop="deptname">
        <el-input v-model="datainfo.deptname" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="datainfo.mobile" placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="mobile">
        <el-input v-model="datainfo.email" placeholder="请输入邮箱"/>
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
          type: [{required: true, message: 'type is required', trigger: 'change'}],
          timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
          title: [{required: true, message: 'title is required', trigger: 'blur'}]
        },
      }
    },
    computed: {
      ...mapState({
        editVisible: state => state.dept.editVisible,
        datainfo: state => state.dept.datainfo,
      }),
    },
    methods: {
      cancelDialog() {
        this.$store.commit("dept/SET_EDITVISIBLE", false);
      },
      updateData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid) {
            this.$store.dispatch("dept/updateUser", that.datainfo).then((e) => {
              if(e.success) {
                that.$notify({
                  title: '编辑用户成功',
                  type: 'success',
                  duration: 2000
                });
                that.$store.commit("dept/RESET_LISTQUERY");
                that.$store.dispatch("dept/getUserList");
              } else {
                that.$notify({
                  title: '编辑用户失败',
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
