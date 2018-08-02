<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link>
                &gt;
                <router-link to="/buyCar">购物车</router-link>
                <!-- <a href="/cart.html">购物车</a> -->
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <el-form :model="orderInfo" :rules="rules" ref="orderInfo" label-width="100px" class="demo-ruleForm">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <div id="orderForm" name="orderForm" url="">
                                <!-- 自己新增的表单元素 element-ui中的 -->
                                <el-form-item label="收货人姓名:" prop="accept_name">
                                    <el-input style="width:500px" v-model="orderInfo.accept_name"></el-input>
                                </el-form-item>
                                <!-- 入口 -->
                                <el-form-item label="所属地区:" prop="">
                                    <VDistpicker @selected="selected($event)" :province="orderInfo.area.province.value" :city="orderInfo.area.city.value" :area="orderInfo.area.area.value"></VDistpicker>
                                </el-form-item>
                                <el-form-item label="收货人地址:" prop="address">
                                    <el-input style="width:500px" v-model="orderInfo.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号:" prop="mobile">
                                    <el-input style="width:500px" v-model="orderInfo.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱:" prop="email">
                                    <el-input style="width:500px" v-model="orderInfo.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮编:" prop="post_code">
                                    <el-input style="width:200px" v-model="orderInfo.post_code"></el-input>
                                </el-form-item>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <!-- <input name="payment_id" type="radio" onclick="paymentAmountTotal(this);" value="1">
                                            <input name="payment_price" type="hidden" value="0.00">在线支付 -->
                                            <el-radio v-model="orderInfo.payment_id" label="6">在线支付</el-radio>
                                            <em>手续费：0.00元</em>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio-group v-model="orderInfo.express_id" @change='expressChange($event)'>
                                                <el-radio :label="1">顺丰快递(20元)</el-radio>
                                                <el-radio :label="2">圆通快递(15元)</el-radio>
                                                <el-radio :label="3">申通快递(14元)</el-radio>
                                            </el-radio-group>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item, index) in goodsList" :key="item.id">
                                            <td width="68">

                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    {{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    {{item.sell_price*item.buycount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea v-model="orderInfo.message" name="message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{orderInfo.expressMoment}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{orderInfo.goodsAmount}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link to="/buyCar">
                                                <button class="btn button" href="/cart.html">返回购物车</button>
                                            </router-link>
                                            <!-- <a class="btn button" href="/cart.html">返回购物车</a> -->
                                            <a @click="submitForm('orderInfo')" id="btnSubmit" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//导入三级联动
import VDistpicker from "v-distpicker";
export default {
  name: "payOrder",
  data: function() {
    // value 输入的值
    // rule 规则
    // callback 回调
    //手机号
    let validateMobile = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        // 定义正则规则
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        //验证
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }
    };
    //邮箱
    let validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        // 定义正则规则
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        //验证
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱"));
        }
      }
    };
    //邮编
    let validatePostCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮编"));
      } else {
        // 定义正则规则
        let reg = /^[1-9]\d{5}(?!\d)$/;
        //验证
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮编"));
        }
      }
    };
    return {
      //商品信息
      goodsList: [],
      orderInfo: {
        //总金额
        goodsAmount: 0,
        //快递费
        expressMoment: 0,
        accept_name: "小明",
        area: {
          province: {
            code: "430000",
            value: "湖南省"
          },
          city: {
            code: "430400",
            value: "衡阳市"
          },
          area: {
            code: "430422",
            value: "衡南县"
          }
        },
        address: "中粮大厦2栋3楼305",
        mobile: "18912344321",
        email: "xiaoming@163.com",
        post_code: "430422",

        //支付方式id
        payment_id: "6",
        //配送方式id
        express_id: 0,

        //订单备注
        message: "",
        //商品的ids
        goodsids: "",
        cargoodsobj: "" // id 跟数量的关系
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
          { min: 2, message: "长度在2 到 10 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入收货人地址", trigger: "blur" },
          { min: 2, message: "请输入的详细一些哦", trigger: "blur" }
        ],
        mobile: [{ validator: validateMobile, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "change" }],
        post_code: [{ validator: validatePostCode, trigger: "change" }]
      }
    };
  },
  methods: {
    //三级联动选择的地区
    selected($event) {
      // console.log($event);
      this.orderInfo.area = $event;
    },
    //快递的选择
    expressChange(value) {
      // console.log(value);
      switch (value) {
        case 1:
          this.orderInfo.expressMoment = 20;
          break;
        case 2:
          this.orderInfo.expressMoment = 15;
          break;
        case 3:
          this.orderInfo.expressMoment = 14;
          break;
      }
      // console.log(this.orderInfo.expressMoment);
      //计算总金额
      this.orderInfo.goodsAmount =
        this.totalPrice + this.orderInfo.expressMoment;
    },
    //提交数据
    submitForm(formName) {
      //重新校验一次 参数是校验返回结果
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/site/validate/order/setorder", this.orderInfo)
            .then(response => {
                //console.log(response);
                 // 订单创建成功之后 删除买了的商品
                 console.log(this.orderInfo.goodsids);
                 let ids = this.orderInfo.goodsids.split(',');
                 console.log(ids);
                 ids.forEach(v=>{
                     // 通知vuex删除对应的数据
                     this.$store.commit('delGoodById',v);
                 })
                  // 代码跳转
                  this.$router.push('/orderInfo/'+response.data.message.orderid)
            })
            .catch(error => {
                console.log(error);
                
            });
        } else {
          this.$Message.error("哥们,有数据没填呢,检查一下呗!");
          return;
        }
      });
    }
  },
  created() {
    //拿到传过来的商品id
    let ids = this.$route.params.ids;
    // console.log(ids);
    this.axios
      .get("/site/validate/order/getgoodslist/" + ids)
      .then(response => {
        // console.log(response);
        let goodsList = response.data.message;
        let buylist = this.$store.state.buyList;
        //console.log(buylist);
        goodsList.forEach(v => {
          v.buycount = buylist[v.id];
        });

        this.goodsList = goodsList;
        //计算总金额
        this.orderInfo.goodsAmount =
          this.totalPrice + this.orderInfo.expressMoment;
        //商品的ids
        this.orderInfo.goodsids = this.$route.params.ids;
        //获取商品的id和数量
        let temobj = {};
        this.goodsList.forEach(v => {
          temobj[v.id] = v.buycount;
        });
        this.orderInfo.cargoodsobj = temobj;
        //console.log(temobj);
      })
      .catch(error => {});
  },
  //计算属性
  computed: {
    //商品总金额
    totalPrice() {
      let price = 0;
      this.goodsList.forEach(v => {
        price += v.buycount * v.sell_price;
      });
      return price;
    },
    //总商品数量
    totalCount() {
      let count = 0;
      this.goodsList.forEach(v => {
        count += v.buycount;
      });
      return count;
    }
  },
  components: {
    VDistpicker
  }
};
</script>
<style scoped>
</style>
