<template>
    <el-container>

        <el-header style="background-color: transparent">
            <el-row :gutter="20">
                <el-col :span="12"><p>项目数量：&#160;&#160;&#160;&#160;{{tableData.length}}</p>
                </el-col>
                <el-col :span="12">

                </el-col>
            </el-row>


        </el-header>


        <el-main>
            <el-dialog
                    :title="companyDialogTitle"
                    :visible.sync="newCompanyDialogVisible"
                    center>

                <el-form :model="form" :visible.sync="dialogFormVisible">
                    <el-form-item label="招标公司名称" :label-width="formLabelWidth" required>
                        <el-select v-model="form.zhaob" placeholder="招标公司名称">


                            <el-option v-for="item in companyList"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="招标状态" :label-width="formLabelWidth" required>
                        <el-select v-model="form.status" placeholder="招标状态">


                            <el-option v-for="item in statusList"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="中标公司名称" :label-width="formLabelWidth">
                        <el-select v-model="form.zhongb" placeholder="中标公司名称">


                            <el-option v-for="item in companyList"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item label="开始时间" :label-width="formLabelWidth" required>
                        <el-date-picker
                                v-model="form.time"
                                type="datetime"
                                placeholder="选择日期时间"
                                align="right"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="金额" :label-width="formLabelWidth" required>
                        <el-input v-model="form.money" autocomplete="off" type="number">
                            <template slot="append">￥</template>

                        </el-input>

                    </el-form-item>

                    <el-form-item label="预中标公司" :label-width="formLabelWidth" required>

                        <el-input v-model="form.note" autocomplete="off" type="textarea"
                                  :rows="5"

                        ></el-input>

                    </el-form-item>
                    <el-form-item label="" :label-width="formLabelWidth" required>
                        <el-button @click="getCompanyRange"
                        >随机抽取预中标公司
                        </el-button>

                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
    <el-button @click="cancelNewCompany">取 消</el-button>
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
                        prop="zhaobname"
                        label="招标公司名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="statusname"
                        width="100"
                        label="招标状态">
                </el-table-column>
                <el-table-column
                        prop="note"
                        width="280"

                        label="预中标公司名称">
                </el-table-column>
                <el-table-column
                        prop="zhongbname"
                        label="中标公司名称"
                        width="180"
                >
                </el-table-column>

                <el-table-column
                        prop="time"
                        width="100"
                        label="时间">
                </el-table-column>
                <el-table-column
                        prop="money"
                        width="100"
                        label="金额">
                </el-table-column>


                <el-table-column width="230"
                                 align="center"
                                 fixed="right">
                    <template slot="header">

                        <el-input
                                v-model="search"
                                size="mini"
                                weight="100"
                                placeholder="输入招标公司名搜索"/>


                    </template>

                </el-table-column>

            </el-table>
        </el-main>

    </el-container>

</template>

<script>
    export default {
        name: "ProjectStoreManageList",
        data() {
            return {
                search: '',
                newCompanyDialogVisible: false,
                dialogFormVisible: false,
                companyDialogTitle: "新增企业",
                formLabelWidth: '120px',
                form: {
                    id: '',
                    zhongb: '',
                    zhaob: '',
                    zhongbname: '',
                    zhaobname: '',
                    time: '',
                    money: '',
                    status: '',
                    statusname: '',
                    note: '',

                },
                tableData: [],
                companyList: [],
                statusList: [{
                    value: 0,
                    label: '招标中'
                }, {
                    value: 1,
                    label: '公示中'
                }, {
                    value: 2,
                    label: '归档'
                },],
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        }, methods: {
            getList() {
                var that = this;
                this.$ajax({
                    method: "post",
                    url: "http://127.0.0.1:5000/management/project/store",
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
            getCompanyList() {
                var that = this;
                this.$ajax({
                    method: "post",
                    url: "http://127.0.0.1:5000/management/company/list",
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
                        that.companyList = res.data.data;
                        console.log(res.data.data)

                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(() => {

                    this.$message.error('请检查网络连接！');


                });
            },
            getCompanyRange() {
                var that = this;
                this.$ajax({
                    method: "post",
                    url: "http://127.0.0.1:5000/management/company/range",
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
                        that.form.note = res.data.data;
                        console.log('res.data.data')
                        console.log(res.data.data)

                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(() => {

                    this.$message.error('请检查网络连接！');


                });
            },
            openNewCompanyDialog() {
                this.newCompanyDialogVisible = true;
                this.companyDialogTitle = '新增项目'

            },
            cancelNewCompany() {
                this.newCompanyDialogVisible = false;


                this.form.id = '';
                this.form.zhongb = '';
                this.form.zhaob = '';
                this.form.zhongbname = '';
                this.form.zhaobname = '';
                this.form.time = '';
                this.form.money = '';
                this.form.status = '';
                this.form.statusname = '';
                this.form.note = '';

            },
            network() {
                if (this.companyDialogTitle === '新增项目') {
                    this.doNewProject();
                } else {
                    this.doChangeProject();
                }
            },
            doNewProject() {
                let formData = JSON.stringify(this.form);
                var that = this;
                this.$ajax({
                    method: "post",
                    url: "http://127.0.0.1:5000/management/project/new",
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
                        that.cancelNewCompany();


                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(() => {

                    this.$message.error('请检查网络连接！');


                });

            },
            doChangeProject() {
                let formData = JSON.stringify(this.form);
                var that = this;
                this.$ajax({
                    method: "post",
                    url: "http://127.0.0.1:5000/management/project/change",
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
                        that.cancelNewCompany();


                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(() => {

                    this.$message.error('请检查网络连接！');


                });

            },
            doDeleteProject() {
                let formData = JSON.stringify(this.form);
                var that = this;
                this.$ajax({
                    method: "post",
                    url: "http://127.0.0.1:5000/management/project/delete",
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
                        that.cancelNewCompany();


                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(() => {

                    this.$message.error('请检查网络连接！');


                });

            },
            handleEdit(index, row) {
                console.log(index, row);
                this.companyDialogTitle = '修改项目信息';

                this.newCompanyDialogVisible = true;


                this.form.id = row.id;
                this.form.zhongb = row.zhongb;
                this.form.zhaob = row.zhaob;
                this.form.zhongbname =row.zhongbname;
                this.form.zhaobname = row.zhaobname;
                this.form.time = row.time;
                this.form.money = row.money;
                this.form.status = row.status;
                this.form.statusname = row.statusname;
                this.form.note = row.note;



            },
            handleDelete(index, row) {
                console.log(index, row);
                this.form.id = row.id;

                this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.doDeleteProject();

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                    this.cancelNewCompany();
                });


            }
        }, mounted() {
            this.getList();
            this.getCompanyList();
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
        /*white-space: pre-line;*/

    }
    .el-table .cell {
        white-space: pre-line;
    }
</style>