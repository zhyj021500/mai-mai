<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link>
                &gt;
                <a href="/cart.html">购物车</a>
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
                                <li>
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
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="buyCarMessage&&buyCarMessage.length ==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(item, index) in buyCarMessage" :key="item.id">
                                    <td width="48" align="center">
                                        <!-- v-model="item.isSelected"  -->
                                        <el-switch v-model="item.isSelected" active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <!-- v-model="item.buycount"  @change="countChange($event,index)"-->
                                        <el-input-number size="mini" v-model="item.buycount" @change="countChange($event,index)" :min="1" :max="20" label="描述文字"></el-input-number>
                                        <!-- 使用自己的组件进行替代 -->
                                        <!-- <numControl @change="change($event,index)" :count="item.buycount" :max="10" :min="1"></numControl> -->
                                    </td>
                                    <td width="104" align="left">{{item.buycount*item.sell_price}}</td>
                                    <td width="54" align="center">
                                        <a @click="delIndex=index;showModal=true;" href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                            <button class="button" >继续购物</button>

                            </router-link>
                            <router-link to="/payOrder">
                            <button >立即结算</button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
            <!-- 对话框 -->
            <Modal v-model="showModal" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>警告</span>
                </p>
                <div style="text-align:center">
                    <p>你确定要删掉他</p>
                </div>
                <div slot="footer">
                    <Row>
                        <Col span="12">
                        <Button type="success" size="large" long @click="showModal=false">取消</Button>
                        </Col>
                        <Col span="12">
                        <Button type="error" size="large" long @click="del">删除</Button>
                        </Col>
                    </Row>

                </div>
            </Modal>
        </div>
    </div>

</template>
<script>
export default {
  data: function() {
    return {
      //购物车数据
      buyCarMessage: undefined,
      //删除的索引
      delIndex: 0,
      //是否显示对话框
      showModal: false
    };
  },
  created() {
    // 进来加载框显示
      this.$Spin.show();
    //获取公共的数据

    let buyCar = this.$store.state.buyList;
    let ids = "";
    for (const key in buyCar) {
      ids += key;
      ids += ",";
    }
     // 判断是否有数据
    if (ids == "") {
      setTimeout(() => {
        this.buyCarMessage = [];
        this.$Spin.hide();
      }, 500);
      return;
    }
    ids = ids.slice(0, -1);
    //获取购物车数据
    this.axios
      .get(`site/comment/getshopcargoods/${ids}`)
      .then(response => {
        //console.log(response);
        //自己把购买的数量匹配到 返回的数据中
        //先处理数据 保证最后绑定的值 都是被跟踪的
        let message = response.data.message;
        message.forEach((v, i) => {
          // 通过id 获取购物车数据中的 加入购物车的数量
          v.buycount = buyCar[v.id];
          // 是否选中
          v.isSelected = true;
        });

        // vue 开始跟踪 {id,价格,图片,buycount}
        this.buyCarMessage = response.data.message;
        // 进来加载框隐藏
        setInterval(()=> {
          this.$Spin.hide();
        }, 500);
      })
      .catch(error => {});
  },
  methods: {
    // 改变
    countChange(count, index) {
      // 修改当前这个组件中的数据
      this.buyCarMessage[index].buycount = count;
      // 修改保存在 Vuex中的数据
      this.$store.commit("changeCount", {
        goodId: this.buyCarMessage[index].id,
        goodNum: count
      });
    },
    //删除
    del() {
      // console.log(this);

      // 删除Vuex中的数据 根据索引 去获取id 如果先删除 对应的元素已经没有了 获取到的id 不是对应的那个了
      this.$store.commit("delGoodById", this.buyCarMessage[this.delIndex].id);
      // 获取当前这条数据的 index 删除当前这个组件中的 这一条数据
      this.buyCarMessage.splice(this.delIndex, 1);
      //关闭对话框
      this.showModal = false;
    }
  },
  computed:{
      //选中的数量
      selectCount(){
          let count = 0;
          this.buyCarMessage.forEach(v=>{
              if(v.isSelected){

                  count += v.buycount;
              }
          })
          return count;
      },
    //总金额
    totalPrice(){
            let totalPrice = 0;
          this.buyCarMessage.forEach(v=>{
              if(v.isSelected){

                  totalPrice += v.buycount * v.sell_price;
              }
          })
          return totalPrice;
    }
  }
};
</script>
<style scoped>
</style>

