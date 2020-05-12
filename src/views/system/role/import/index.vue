<template>
  <el-dialog title="批量分配" :visible.sync="importVisible" :before-close="cancelDialog">
    <upload-excel-component :on-success="handleSuccess" />
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
  import UploadExcelComponent from '@/components/UploadExcel';


  export default {
    name: "index.vue",
    components: {
      UploadExcelComponent
    },
    data() {
      return {
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
        importVisible: state => state.auth_role.importVisible,
      }),
    },
    methods: {
      // 导入excel
      handleSuccess({ results, header }) {
        console.log(results, header)
      },
      cancelDialog() {
        this.$store.commit("auth_role/SET_IMPORTVISIBLE", false);
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
