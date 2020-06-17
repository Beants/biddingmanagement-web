<template>

    <el-row>
        <el-col :span="24" style="margin-bottom: 30px">

            <el-alert
                    title="注意！恢复数据即覆盖现有数据！！请谨慎操作！！"
                    type="error"

                    effect="dark">
            </el-alert>
        </el-col>
        <el-col :span="24">
            <el-upload
                    class="upload-demo"
                    drag
                    action="http://127.0.0.1:5000/recover"
                    multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">恢复数据,请上传文件名为 company.backup 或 project.backup 或 management.backup 的文件</div>
            </el-upload>
        </el-col>

    </el-row>
</template>

<script>
    export default {
        name: "DataRecover",
        data() {
            return {}
        }, methods: {

            RecoverCompany() {
                let a = document.createElement('a');
                a.href = "http://127.0.0.1:5000/backup/company";
                a.click();
            },
            RecoverProject() {
                let a = document.createElement('a');
                a.href = "http://127.0.0.1:5000/backup/project";
                a.click();

            },
            RecoverManagement() {
                let a = document.createElement('a');
                a.href = "http://127.0.0.1:5000/backup/management";
                a.click();
            }
        }
    }
</script>

<style scoped>

</style>