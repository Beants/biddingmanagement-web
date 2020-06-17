<template>
    <el-container>

        <el-header style="background-color: transparent">
            <el-row :gutter="20">
                <el-col :span="12"><p>招投标管理员数量：&#160;&#160;&#160;&#160;{{tableData.length}}</p>
                </el-col>
                <el-col :span="12">
                    <el-button size="small" style="margin-top: 30px" @click="openNewCompanyDialog">新增管理员
                    </el-button>
                </el-col>
            </el-row>


        </el-header>


        <el-main>
            <el-dialog
                    :title="companyDialogTitle"
                    :visible.sync="newCompanyDialogVisible"
                    center>

                <el-form :model="form" :visible.sync="dialogFormVisible">
                    <el-form-item label="用户名" :label-width="formLabelWidth" required>
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth" required>
                        <el-input v-model="form.password" autocomplete="off"></el-input>

                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth" required>
                        <el-input v-model="form.name" autocomplete="off"></el-input>

                    </el-form-item>


                    <el-form-item label="超级管理员" :label-width="formLabelWidth" required>

                        <el-select v-model="form.super" placeholder="超级管理员">


                            <el-option v-for="item in isSuper"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="联系方式" :label-width="formLabelWidth" required>
                        <el-input v-model="form.phone" autocomplete="off"></el-input>

                    </el-form-item>
                    <el-form-item label="备注" :label-width="formLabelWidth" required>
                        <el-input v-model="form.note" autocomplete="off" type="textarea" :row="3"></el-input>

                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
    <el-button @click="cancelNewManagement">取 消</el-button>
    <el-button type="primary" @click="network">确 定</el-button>
  </span>
            </el-dialog>

            <el-table
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    stripe
                    border
                    :header-cell-style="{'text-align':'center'}"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="ID"

                        width="50"
                ></el-table-column>

                <el-table-column
                        prop="username"
                        label="用户名"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="password"
                        label="密码"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        width="180"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="supername"
                        width="100"
                        label="超级管理员">
                </el-table-column>

                <el-table-column
                        prop="phone"
                        width="110"

                        label="联系方式">
                </el-table-column>
                <el-table-column
                        prop="note"
                        width="280"

                        label="备注">
                </el-table-column>
                <el-table-column width="230"
                                 align="center"
                                 fixed="right">
                    <template slot="header">
                        <el-input
                                v-model="search"
                                size="mini"
                                weight="100"
                                placeholder="输入姓名搜索"/>


                    </template>
                    <template slot-scope="scope">
                        <el-button size="mini"

                                   @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>


                    </template>
                </el-table-column>

            </el-table>
        </el-main>

    </el-container>

</template>

<script>
    export default {
        name: "ManagementManageList",
        data() {
            return {
                search: '',
                newCompanyDialogVisible: false,
                dialogFormVisible: false,
                companyDialogTitle: "新增管理员",
                formLabelWidth: '120px',
                form: {
                    id: '',
                    username: '',
                    password: '',
                    name: '',
                    super: '',
                    phone: '',
                    note: '',
                },
                tableData: []
                , isSuper: [{
                    value: 0,
                    label: '否'
                }, {
                    value: 1,
                    label: '是'
                }],
            }
        }, methods: {
            getList() {
                var that = this;
                this.$ajax({
                    method: "post",
                    url: "http://127.0.0.1:5000/management/management/list",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                }).then((res) => {
                    console.log(res);
                    if (res.data.code === 200) {
                        that.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        that.tableData = res.data.data;

                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(() => {

                    this.$message.error('请检查网络连接！');


                });
            },
            openNewCompanyDialog() {
                this.newCompanyDialogVisible = true;
                this.companyDialogTitle = '新增管理员'

            },
            cancelNewManagement() {
                this.newCompanyDialogVisible = false;
                this.form.id = '';
                this.form.name = '';
                this.form.username = '';
                this.form.password = '';
                this.form.phone = '';
                this.form.note = '';
                this.form.super = '';
                this.form.supername = '';

            },
            network() {
                if (this.companyDialogTitle === '新增管理员') {
                    this.doNewCompany();
                } else {
                    this.doChangeCompany();
                }
            },
            doNewCompany() {
                let formData = JSON.stringify(this.form);
                var that = this;
                this.$ajax({
                    method: "post",
                    url: "http://127.0.0.1:5000/management/management/new",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                    data: formData
                }).then((res) => {
                    console.log(res);
                    if (res.data.code === 200) {
                        that.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        that.newCompanyDialogVisible = false;
                        that.getList();
                        that.cancelNewManagement();


                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(() => {

                    this.$message.error('请检查网络连接！');


                });

            },
            doChangeCompany() {
                let formData = JSON.stringify(this.form);
                var that = this;
                this.$ajax({
                    method: "post",
                    url: "http://127.0.0.1:5000/management/management/change",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                    data: formData
                }).then((res) => {
                    console.log(res);
                    if (res.data.code === 200) {
                        that.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        that.newCompanyDialogVisible = false;
                        that.getList();
                        that.cancelNewManagement();


                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(() => {

                    this.$message.error('请检查网络连接！');


                });

            },
            doDeleteManagement() {
                let formData = JSON.stringify(this.form);
                var that = this;
                this.$ajax({
                    method: "post",
                    url: "http://127.0.0.1:5000/management/management/delete",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                    data: formData
                }).then((res) => {
                    console.log(res);
                    if (res.data.code === 200) {
                        that.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                        that.newCompanyDialogVisible = false;
                        that.getList();
                        that.cancelNewManagement();


                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(() => {

                    this.$message.error('请检查网络连接！');


                });

            },
            handleEdit(index, row) {
                console.log(index, row);
                this.companyDialogTitle = '修改管理员信息';

                this.newCompanyDialogVisible = true;


                this.form.id = row.id;
                this.form.name = row.name;
                this.form.username = row.username;
                this.form.password = row.password;
                this.form.super = row.super;
                this.form.phone = row.phone;
                this.form.note = row.note;

            },
            handleDelete(index, row) {
                console.log(index, row);
                this.form.id = row.id;

                this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.doDeleteManagement();

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                    this.cancelNewManagement();
                });


            }
        }, mounted() {
            this.getList()
        }
    }
</script>

<style scoped>
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        /*line-height: 50px;*/
    }

    .item {
        margin-top: 10px;
        margin-right: 40px;
    }

    .el-table-column {
        height: 10px;
        text-align: center;
    }
</style>