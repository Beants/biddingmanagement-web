<template>
    <div>
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
            <h3 class="login-title">欢迎登录招投标管理平台</h3>
            <el-form-item label="账号" prop="username">
                <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
            </el-form-item>
            <el-form-item label="分类" prop="account_type">
                <template>
                    <el-radio v-model="form.account_type" :label="1">管理员</el-radio>
                    <el-radio v-model="form.account_type" :label="2">企业</el-radio>
                </template>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
            </el-form-item>
        </el-form>

        <el-dialog
                title="温馨提示"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <span>请输入账号和密码</span>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>


    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    account_type: 2,


                },

                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                rules: {
                    username: [
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                },

                // 对话框显示和隐藏
                dialogVisible: false
            }
        },
        mounted() {   //页面初始化方法
            if (sessionStorage.getItem('account_type') === 1) {
                this.$router.push("/management");


            } else if (sessionStorage.getItem('account_type') === 2) {
                this.$router.push("/company");

            }


        },
        methods: {
            onSubmit(formName) {
                var that = this;
                // 为表单绑定验证功能
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                            // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
                            // this.$router.push("/main");
                            /* formData格式提交： */

                            let formData = JSON.stringify(this.form);

                            this.$ajax({
                                method: "post",
                                url: "http://127.0.0.1:5000/login",
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


                                    sessionStorage.setItem('name', res.data.data.name);
                                    sessionStorage.setItem('account_type', that.form.account_type);
                                    sessionStorage.setItem('username', res.data.data.username);
                                    // TODO： 跳转
                                    if (that.form.account_type === 1) {
                                        sessionStorage.setItem('super', res.data.data.super);

                                        that.$router.push("/management");
                                    } else {
                                        that.$router.push("/company");

                                    }

                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            }).catch(() => {

                                this.$message.error('请检查网络连接！');


                            });
                        } else {
                            this.dialogVisible = true;
                            return false;
                        }
                    }
                );
            }


        }
    }
</script>

<style lang="scss" scoped>
    .login-box {
        border: 1px solid #DCDFE6;
        width: 350px;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px #909399;
    }

    .login-title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #303133;
    }
</style>