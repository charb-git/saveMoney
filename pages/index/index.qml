<view class="view-no-use" style='height:{{height}}px' wx:if="{{loadingState!=1}}">
  <view class='view_loading' wx:if="{{loadingState==0}}">
    <text class="icon-open-new icon"></text>
    <text>加载中</text>
  </view>
  <image class="img-no-data" wx:if="{{loadingState>1}}" src="{{loadIngStateImg[loadingState]}}"></image>
  <text class="text_no_data" wx:if="{{loadingState>1}}">{{loadIngStateText[loadingState]}}</text>
  <text class="text_no_data_dsc" wx:if="{{loadingState>1}}">{{loadIngStateTextDsc[loadingState]}}</text>
  <text class='view_no_data_reload' wx:if="{{loadingState==3}}" catchtap='reLoadPageData'>刷新</text>
</view>
<!--在此添加页面布局  -->
<view class=" page-bg " wx:else>
  <view class="view_top">
    <swiper class="view_img_s" indicator-dots="{{false}}" autoplay="{{true}}" bindchange="currentIndexChange" circular="true">
      <block wx:for="{{adList}}" wx:key="{{index}}">
        <swiper-item>
          <image src="{{item.image_url}}" class="view_img_s" catchtap="onAdItemClickListener" id="{{index}}" />
        </swiper-item>
      </block>
    </swiper>
    <view class='view_dian' wx:if="{{adList.length>1}}">
      <view class='{{index==currentIndex?"dian2":"dian1"}}' wx:for="{{adList.length}}" wx:key="{{index}}"></view>
    </view>
  </view>
  <view class="view_search_bg" style='background: rgba(255, 255, 255, {{topTitleOpacity}}); border-bottom:{{topTitleOpacity==1?2:0}}rpx solid #f8f8f8;'>
    <view class="view_search" bindtap="toSearch" style='width:{{450+200*topTitleOpacity}}rpx;'>
      <icon type="search" size="15" color="#666" style='margin-left:30rpx; margin-right:10rpx;' />
      <text>请输入搜索内容</text>
    </view>
  </view>
  <view class="view_z">
    <view class="view_zb">
      <view class="view_z1" catchtap="toAction" id="1">
        <text class="text_z_title">今日爆款</text>
        <text class="title_z_dsc">看看大家都在买什么</text>
        <image class="img_z1" src="../../images/s3.png"></image>
      </view>
      <view class="view_z_left">
        <view class="view_left_item" catchtap="toAction" id="0">
          <view class="text_z_left">
            <text class="text_z_title">1.9包邮</text>
            <text class="title_z_dsc">全民疯抢 低价包邮</text>
          </view>
          <image class="img_z_left" src="../../images/s2.png"></image>
        </view>
        <view class="view_left_item" catchtap="toAction" id="2">
          <view class="text_z_left">
            <text class="text_z_title">品牌清仓</text>
            <text class="title_z_dsc">旗舰好货百，百万优惠券</text>
          </view>
          <image class="img_z_left" src="../../images/s1.png"></image>
        </view>
      </view>
    </view>
    <view class="view_zr">
      <view class="view_left_item" style=" height: 160rpx;" catchtap="toRed">
        <image class="img_z_r" src="../../images/s5.png"></image>
        <view class="text_z_left">
          <text class="text_z_title">天天拆红包</text>
          <text class="title_z_dsc">红包专场会场，巨额福利优惠</text>
        </view>

      </view>

    </view>
  </view>
  <view class='view_hot'>热门推荐</view>
  <view class='view_goods'>
    <view class='view_item' wx:for="{{list}}" wx:key="{{index}}" catchtap='onItemClickListener' id="{{item.goods_id}}">
      <image class='img_goods' src="{{item.goods_thumbnail_url}}" lazy-load="true"></image>
      <text class='text_title'>{{item.goods_name}}</text>
      <view class='view_bottom'>
        <view class='view_price'>
          <text style='color:#999;font-size:24rpx;'>优惠价</text>
          <text style='font-size:24rpx;margin-left:5rpx'>¥</text>
          <text>{{(item.min_group_price-item.coupon_discount)/100}}</text>
        </view>
        <text class='view_quan'>{{item.coupon_discount/100}}元</text>
      </view>
    </view>
  </view>
</view>