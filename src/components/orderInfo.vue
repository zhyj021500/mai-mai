<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <!-- <a href="/index.html">首页</a> -->
                <router-link to="/index">首页</router-link>
                &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment" v-for="(item, index) in orderinfo" :key="item.id">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{item.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{item.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{item.area}},{{item.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{item.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{item.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{item.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <VueQrcode v-if="codeUrl" :value="codeUrl" :options="{ size: 200 }"></VueQrcode>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VueQrcode from "@xkeshi/vue-qrcode";
export default {
  name: "orderInfo",
  data: function() {
    return {
      orderinfo: [],
      codeUrl: ""
    };
  },
  created() {
    //获取传过来的id
    let id = this.$route.params.orderid;
    //console.log(id);
    this.axios
      .get("/site/validate/order/getorder/" + id)
      .then(response => {
        this.orderinfo = response.data.message;
        //console.log(this.orderinfo);
      })
      .catch(error => {
        console.log(error);
      });

    this.codeUrl = `http://47.106.148.205:8899/site/validate/pay/alipay/${id}`;
    //使用定时器轮回调用接口判断是否支付成功
    let timeid = setInterval(function() {
      this.axios
        .get("/site/validate/order/getorder/" + id)
        .then(response => {
          
          if (response.data.message[0].status == 2) {
            this.$Mssage.success("支付成功");
            //调页面
            this.$route.push("/paySuccess");
            //清除定时器
            clearInterval(timeid);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }, 500);
  },
  components: {
    VueQrcode
  }
};
</script>
<style scoped>
</style>


