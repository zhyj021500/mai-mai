<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div v-if="imglist.length!=0" class="pic-box">

                                <ProductZoomer :baseImages="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <!-- is-disabled -->
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease " :class="{'is-disabled':goodsNum==1}">
                                                        <i @click="goodsNum==1?1:goodsNum--" class="el-icon-minus"></i>
                                                    </span>
                                                    <span :class="{'is-disabled':goodsNum==goodsinfo.stock_quantity}" role="button" class="el-input-number__increase">
                                                        <i @click="goodsNum<goodsinfo.stock_quantity?goodsNum++:goodsinfo.stock_quantity" class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="goodsNum" autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>

                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>

                                            </div>

                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!-- 图钉 -->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="isShowDesc =true" :class="{'selected':isShowDesc}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="isShowDesc =false" :class="{'selected': !isShowDesc}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div v-html="goodsinfo.content" class="tab-content entry" v-show="isShowDesc">
                                内容
                            </div>
                            <div class="tab-content" v-show="!isShowDesc">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="message" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" @click="submitConmens" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="conmensMessage.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in conmensMessage" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time|cuttime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="totalCount" :page-size='pagesize' @on-change="getPage" @on-page-size-change="getPageSize" placement="top" :page-size-opts='[5, 10,15,20]' show-elevator show-sizer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/goodsInfo/`+item.id">
                                                <img :src="item.img_url">
                                            </router-link>

                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="`/goodsInfo/`+item.id">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time |cuttime }}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 回到顶部 -->
        <BackTop></BackTop>
        <!-- 陪伴他的图片 -->
        <img class="moveImg" v-if="imglist.length!=0" style="display:none" :src="imglist[0].original_path" alt="">
    </div>
</template>
<script>
//导入放大镜插件
import ProductZoomer from "vue-product-zoomer";
import $ from 'jquery';
export default {
  name: "goodinfo",
  data: function() {
    return {
      //商品详情
      goodsinfo: {},
      //热点商品
      hotgoodslist: [],
      //商品图片
      imglist: [],
      //购买的商品数
      goodsNum: 1,
      // 记录显示哪个区域的变量
      isShowDesc: true,
      //放大镜配置
      images: {
        normal_size: []
      },
      zoomerOptions: {
        zoomFactor: 4,
        pane: "container",
        hoverDelay: 300,
        namespace: "container-zoomer",
        move_by_click: true,
        scroll_items: 4,
        choosed_thumb_border_color: "#ff3d00"
      },
      //分页的数据
      totalCount: 0,
      //
      pagesize: 5,
      pageIndex: 1,
      conmensMessage: [],
      message: ""
    };
  },
  methods: {
    //获取商品详情数据
    getGoodsInfo() {
      // 强制初始化
      this.imglist = [];
      // 清空预览图片的数组
      this.images.normal_size = [];
      this.axios
        .get(`/site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(response => {
          // console.log(response);
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          //获取轮播图数据
          this.imglist.forEach((v, i) => {
            this.images.normal_size.push({
              id: v.id,
              url: v.original_path
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    //获取评论
    getComment() {
      this.axios
        .get(
          `/site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pagesize}`
        )
        .then(response => {
          //console.log(response);
          this.conmensMessage = response.data.message;
          this.totalCount = response.data.totalcount;
          // console.log( this.conmensMessage);
        })
        .catch(error => {});
    },
    //获取页码
    getPage(page) {
      // console.log(page);
      this.pageIndex = page;
      //获取评论
      this.getComment();
    },
    //获取页容量
    getPageSize(size) {
      //console.log(size);
      this.pagesize = size;
      //获取评论
      this.getComment();
    },

    //提交评论
    submitConmens() {
      if (this.message == "") {
        this.$Message.error("评论不能为空");
      }
      this.axios
        .post(`/site/validate/comment/post/goods/${this.$route.params.id}`, {
          commenttxt: this.message
        })
        .then(response => {
          console.log(response);
          if (response.data.status == 0) {
            this.$Message.success("评论提交成功☺");
            this.pageIndex = 1;
            this.getComment();
          }
        })
        .catch(error => {});

      // 清空评论
      this.message = "";
    },
    //添加购物车
    cartAdd() {

       let offset = $('#buyButton .add').offset();
          // 获取购物车的位置
        let cartOffset = $('.icon-cart').offset();
        // console.log(offset);// top left
        $('.moveImg').show().addClass('move').css(offset).animate(cartOffset,1000,()=>{
            $('.moveImg').removeClass('move').hide();
        });
         // 修改vuex中的数据值 
    
      this.$store.commit("buyGoods", {goodId:this.$route.params.id,goodNum:this.goodsNum});
    }
  },
  created() {
 
    //获取商品详情
    this.getGoodsInfo();
    //获取评论
    this.getComment();
  },

  // 观察属性 属性值改变时自动调用
  watch: {
    // to 新值  from 老值
    $route(to, from) {
      // 对路由变化作出响应...
      this.getGoodsInfo();
      //   重新获取评论数据
      this.getComment();
    }
  },
  components: {
    //注册组件
    ProductZoomer
  }
};
</script>
<style>
/* 导入字体图标的样式 */
@import url("../../node_modules/font-awesome/css/font-awesome.min.css");
.container-zoomer-zoomer-box {
  width: 368px;
}

.thumb-list img {
  height: 78px;
  width: 78px;
  margin: 5px;
}
.control i {
  text-align: center;
}

.moveImg {
  width: 40px;
  position: absolute;
  top: 0;
  right: 50px;
}
.moveImg.move {
  transform: scale(0.5, 0.5) rotateZ(3600deg);
  opacity: 0.4;
  transition: transform 1s, opacity 1s;
}
</style>