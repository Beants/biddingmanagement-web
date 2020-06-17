<template>
    <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '2', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>数据管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="jump('1-1')">企业列表</el-menu-item>
                        <el-menu-item index="1-2" @click="jump('1-2')">工程列表</el-menu-item>
                        <el-menu-item index="1-3" @click="jump('1-3')">归档列表</el-menu-item>
                    </el-menu-item-group>

                </el-submenu>

                <el-submenu index="2" v-if="super_ === '1'">
                    <template slot="title"><i class="el-icon-menu"></i>高级功能</template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1" @click="jump('2-1')">管理员列表</el-menu-item>
                        <el-menu-item index="2-2" @click="jump('2-2')">数据备份</el-menu-item>
                        <el-menu-item index="2-3" @click="jump('2-3')">数据恢复</el-menu-item>
                    </el-menu-item-group>

                </el-submenu>

            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{userInfo}}</span>
            </el-header>
            <el-main>
                <div v-if="page === '1-1'">
                    <CompanyManageList></CompanyManageList>
                </div>
                <div v-else-if="page === '1-2'">
                    <ProjectManageList></ProjectManageList>
                </div>
                <div v-else-if="page === '1-3'">
                    <project-store-manage-list></project-store-manage-list>
                </div>
                <div v-else-if="page === '2-1'">
                    <management-manage-list></management-manage-list>
                </div>
                <div v-else-if="page === '2-2'">
                    <data-backup></data-backup>
                </div>
                <div v-else-if="page === '2-3'">
                    <data-recover></data-recover>
                </div>
                <div v-else>
                    Not A/B/C
                </div>


            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<script>
    import CompanyManageList from "@/components/Management/companyManageList";
    import ProjectManageList from "@/components/Management/ProjectManageList";
    import ProjectStoreManageList from "@/components/Management/ProjectStoreManageList";
    import ManagementManageList from "@/components/Management/ManagementManageList";
    import DataBackup from "@/components/Management/DataBackup";
    import DataRecover from "@/components/Management/DataRecover";

    export default {
        name: "Management",
        components: {
            DataRecover,
            DataBackup, ManagementManageList, ProjectStoreManageList, ProjectManageList, CompanyManageList
        },
        data() {
            return {
                userInfo: sessionStorage.getItem('name'),
                page: '1-1',
                super_: sessionStorage.getItem('super'),

            }
        },
        methods: {
            logout() {
                var that = this;
                this.$ajax({
                    method: "post",
                    url: "http://127.0.0.1:5000/logout",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                }).then((res) => {
                    that.$message({
                        message: res.data.msg(),
                        type: 'success'
                    });
                    sessionStorage.clear();
                    that.$router.push("/");


                }).catch(() => {
                    sessionStorage.clear();
                    that.$router.push("/");
                    this.$message.error('请检查网络连接！');


                });
            },
            jump(opt) {
                this.page = opt;
                console.log(this.page);
            }

        }
        , mounted() {   //页面初始化方法

            console.log(sessionStorage.getItem('super'))

        },


    }
</script>

<style>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        /*line-height: 160px;*/
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    html, body, #app, .el-container {
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
        /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }

    .el-table .cell {
        white-space: pre-line;
    }
</style>