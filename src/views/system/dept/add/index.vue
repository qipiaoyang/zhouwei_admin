<template>
  <el-dialog title="新增用户" :visible.sync="addVisible" :before-close="cancelDialog">
    <el-form ref="dataForm" :rules="rules" :model="formObj" label-position="left" label-width="100px"
             style="width: 400px; margin-left:50px;">

      <el-form-item label="小组名称" prop="deptname">
        <el-input v-model="formObj.name" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item label="排序" prop="mobile">
        <el-input v-model="formObj.sort" placeholder="请输入排序"/>
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
          type: [{required: true, message: 'type is required', trigger: 'change'}],
          timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
          title: [{required: true, message: 'title is required', trigger: 'blur'}]
        },
        formObj: {
          name: "",
          sort: 0,
        }
      }
    },
    computed: {
      ...mapState({
        addVisible: state => state.dept.addVisible,
      }),
    },
    methods: {
      cancelDialog() {
        this.$store.commit("dept/SET_ADDVISIBLE", false);
      },
      createData() {
        let that = this;
        this.$refs['dataForm'].validate((valid) => {
          if(valid) {
            this.$store.dispatch("dept/createDept", this.formObj).then((e) => {
              if(e.success) {
                that.$notify({
                  title: '添加用户成功',
                  type: 'success',
                  duration: 2000
                });
                that.formObj = {
                    name: "",
                    sort: 0,
                };
                that.$store.commit("dept/RESET_LISTQUERY");
                that.$store.dispatch("dept/getDeptList");
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
