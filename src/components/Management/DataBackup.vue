<template>
    <el-row>
        <el-col :span="8">
            <el-button @click="downloadCompany">备份企业数据</el-button>
        </el-col>
        <el-col :span="8">
            <el-button @click="downloadProject">备份工程数据</el-button>
        </el-col>
        <el-col :span="8">
            <el-button @click="downloadManagement">备份管理员数据</el-button>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "DataBackup",
        data() {
            return {}
        }, methods: {

            downloadCompany() {
                let a = document.createElement('a');
                a.href = "http://127.0.0.1:5000/backup/company";
                a.click();
            },
            downloadProject() {
                let a = document.createElement('a');
                a.href = "http://127.0.0.1:5000/backup/project";
                a.click();

            },
            downloadManagement() {
                let a = document.createElement('a');
                a.href = "http://127.0.0.1:5000/backup/management";
                a.click();
            }
        }
    }
</script>

<style scoped>

</style>