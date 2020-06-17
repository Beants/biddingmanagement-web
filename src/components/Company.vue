<template>
    <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '2', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>项目信息</template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="jump('1-1')">招标列表</el-menu-item>
                        <el-menu-item index="1-2" @click="jump('1-2')">我的中标项目</el-menu-item>
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
                    <zhaobiao></zhaobiao>
                </div>
                <div v-else-if="page === '1-2'">
                    <mybiao></mybiao>
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
    import Zhaobiao from "@/components/Company/zhaobiao";
    import Mybiao from "@/components/Company/mybiao";

    export default {
        name: "Company",
        components: {Mybiao, Zhaobiao},
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
    }
</script>

<style scoped>

</style>