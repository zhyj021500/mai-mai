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
                            <div class="pic-box"></div>
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
                                                    <span role="button" class="el-input-number__decrease " :class="{'is-disabled':goodsNum==1}" >
                                                        <i  @click="goodsNum==1?1:goodsNum--" class="el-icon-minus"></i>
                                                    </span>
                                                    <span :class="{'is-disabled':goodsNum==goodsinfo.stock_quantity}" role="button" class="el-input-number__increase">
                                                        <i  @click="goodsNum<goodsinfo.stock_quantity?goodsNum++:goodsinfo.stock_quantity"  class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="goodsNum" autocomplete="off" size="small" type="text" rows="2" max="60"
                                                            min="1" validateevent="true" class="el-input__inner" role="spinbutton"
                                                            aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
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
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="isShowDesc =true"  :class="{'selected':isShowDesc}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="isShowDesc =false" :class="{'selected': !isShowDesc}" >商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div v-html="goodsinfo.content" class="tab-content entry" v-show="isShowDesc">
                                内容
                            </div>
                            <div class="tab-content" v-show="!isShowDesc">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:58:59</span>
                                                </div>
                                                <p>testtesttest</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>2017/10/23 14:59:36</span>
                                                </div>
                                                <p>很清晰调动单很清晰调动单</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <span class="disabled">« 上一页</span>
                                            <span class="current">1</span>
                                            <span class="disabled">下一页 »</span>
                                        </div>
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
    </div>
</template>
<script>
export default {
    name:"goodinfo",
    data:function(){
        return{
            goodsinfo:{},
            hotgoodslist:[],
            imglist:[],
            //购买的商品数
            goodsNum:1,
            // 记录显示哪个区域的变量
            isShowDesc:true
        }
    },
    methods:{
        //获取商品详情数据
        getGoodsInfo(){
            this.axios
            .get(`/site/goods/getgoodsinfo/${this.$route.params.id}`)
            .then((response)=>{
               // console.log(response);
               this.goodsinfo = response.data.message.goodsinfo;
               this.hotgoodslist = response.data.message.hotgoodslist;
               this.imglist = response.data.message.imglist;
                
            })
            .catch((error)=>{
                console.log(error);
                
            });
        }
    },
    created(){
        console.log(this.$route.params.id);
       // console.log(this);
        this.getGoodsInfo();
    },
    mounted() {
        
    },
    // 观察属性 属性值改变时自动调用
    watch:{
          // to 新值  from 老值
        $route(to, from) {
        // 对路由变化作出响应...
        this.getGoodsInfo();
        }
    }
}
</script>
<style scoped>
 
</style>


