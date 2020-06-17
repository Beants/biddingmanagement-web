<template>
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
                prop="zhongbname"
                width="280"

                label="中标公司名称">
        </el-table-column>
        <el-table-column
                prop="note"
                width="280"

                label="预中标公司名称">
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
</template>

<script>
    export default {
        name: "mybiao", data() {
            return {
                tableData: [],
                search: '',

            }
        }, methods: {
            getList() {
                var that = this;
                this.$ajax({
                    method: "post",
                    url: "http://127.0.0.1:5000/management/project/list/my",
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
        }, mounted() {
            this.getList();
        }
    }
</script>

<style scoped>

</style>