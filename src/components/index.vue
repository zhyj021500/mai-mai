<template>
    <div class="index">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(itemson, i) in item.subcates" :key="itemson.id">
                                                {{itemson.title}}&nbsp;
                                            </span>

                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(itemSon, i) in item.subcates" :key="itemSon.id" href="/goods/43.html">手机通讯</a>

                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel height="341px" indicator-position="outside">
                            <el-carousel-item v-for="(item, index) in sliderlist" :key="item.id">
                                <img :src="item.img_url" alt="item.title">
                            </el-carousel-item>
                        </el-carousel>

                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time|cuttime}}</span>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="(item, index) in goodslist" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="(itemson, i) in item.level2catelist " :key="itemson.subcateid">手机通讯</a>

                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(itemson, i) in item.datas " :key="itemson.artID">
                            <router-link :to="'/goodsinfo/'+itemson.artID">
                                <div class="img-box">
                                    <img v-lazy="itemson.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemson.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemson.sell_price}}</b>元</p>
                                    <p>
                                        <strong>{{itemson.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemson.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    //引入axios

    import moment from "moment";
    //http://47.106.148.205:8899/site/goods/gettopdata/goods
    export default {
        //数据
        data: function () {
            return {
                catelist: [],
                sliderlist: [],
                toplist: [],
                goodslist: []
            };
        },
        //过滤
        filters: {
            cuttime(value) {
                return moment(value).format("YYYY-MM-DD");
            }
        },
        beforeMount() {
            //获取首页的上部做的的数据
            this.axios
                .get("/site/goods/gettopdata/goods")
                .then(response => {
                    // handle success
                    //console.log(response.data.message.catelist);
                    this.catelist = response.data.message.catelist;
                    this.sliderlist = response.data.message.sliderlist;
                    this.toplist = response.data.message.toplist;
                    // console.log(this.sliderlist);
                    // console.log(this.toplist);
                })
                .catch(error => {
                    // handle error
                    //console.log(error);
                });
            // 获取底部的商品列表数据
            this.axios
                .get("/site/goods/getgoodsgroup")
                .then(response => {
                    // handle success
                    //console.log(response );
                    this.goodslist = response.data.message;
                    // console.log(this.goodslist );
                })
                .catch(error => {
                    // handle error
                    //console.log(error);
                });
        }
    };
</script>
<style scoped>
    .el-carousel__item img {
        width: 100%;
        height: 100%;
    }
</style>