<script type="text/javasscript">
    // 定义一些公共的属性和方法
    const UrlLogin = 'http://127.0.0.1:5000/';

    function commonFun() {
        console.log("公共方法")
    }

    // 暴露出这些属性和方法
    export default {
        UrlLogin,
        commonFun
    }
</script>