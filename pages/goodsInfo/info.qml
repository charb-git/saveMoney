<view class="view-no-use" style="height:{{height}}px" wx:if="{{loadingState!=1}}">
  <view class="view_loading" wx:if="{{loadingState==0}}">
    <text class="icon-open-new icon"></text>
    <text>加载中</text>
  </view>
  <image class="img-no-data" wx:if="{{loadingState>1}}" src="{{loadIngStateImg[loadingState]}}"></image>
  <text class="text_no_data" wx:if="{{loadingState>1}}">{{loadIngStateText[loadingState]}}</text>
  <text class="text_no_data_dsc" wx:if="{{loadingState>1}}">{{loadIngStateTextDsc[loadingState]}}</text>
  <text class="view_no_data_reload" wx:if="{{loadingState==3}}" catchtap="reLoadPageData">刷新</text>
</view>
<!--在此添加页面布局  -->
<view class=" page-bg " wx:else>
  <!-- <swiper class='view_top' indicator-dots="{{info. goods_detail.goods_gallery_urls>1}}" autoplay="{{true}}" circular="{{true}}" indicator-active-color="#EB4133">
    <swiper-item wx:for="{{info. goods_detail.goods_gallery_urls}}" wx:key="{{index}}">
      <image class='view_top' src='{{item}}' id='{{index}}' lazy-load='{{true}}' id="{{index}}"></image>
    </swiper-item>
  </swiper> -->
  <image class="view_top" style="height:450rpx;" src="{{info.goods_detail.goods_thumbnail_url}}" mode="aspectFit"></image>
  <view class="view_title">
    <span class="view_by">包邮</span>
    <span>{{info.goods_detail.goods_name}}</span>
  </view>
  <view class="view_price_and_c">
    <view class="view_price">
      <text>{{info.goods_detail.has_coupon?"券后价":"优惠价"}}：</text>
      <text style="color:#FA231D;font-size:30rpx;font-weight:400; line-height: 30rpx;"
        >¥{{info.goods_detail.has_coupon?(info.goods_detail.min_group_price-info.goods_detail.coupon_discount)/100:info.goods_detail.min_group_price/100}}</text
      >
    </view>
    <view class="view_c" wx:if="{{info.goods_detail.has_coupon}}">
      <text class="text_c">优惠券</text>
      <text class="text_c" style="color:white;width:100rpx;">{{info.goods_detail.coupon_discount/100}}元</text>
    </view>
  </view>
  <text class="text_sell">{{info.goods_detail.sales_tip}}人已购买</text>
  <view class="view_like">
    <view class="view_short_line"></view>
    <text>猜你喜欢</text>
    <view class="view_short_line"></view>
  </view>
  <view class="short_line_h"></view>
  <view class="view_item_l" wx:for="{{list}}" wx:key="{{index}}" catchtap="onItemClickListener" id="{{item.goods_id}}">
    <image class="img_goods_l" src="{{item.goods_thumbnail_url}}" lazy-load="true"></image>
    <view class="view_right_l">
      <view class="view_title_l">
        <text class="view_by_l">包邮</text>
        <text>{{item.goods_name}}</text>
      </view>
      <view class="view_price_and_c_l">
        <view class="view_price_l">
          <text>{{item.coupon_discount>0?"券后价":"优惠价"}}：</text>
          <text style="color:#FA231D;font-size:30rpx;font-weight:400; line-height: 30rpx;">¥{{item.coupon_discount>0?(item.min_group_price-item.coupon_discount)/100:item.min_group_price/100}}</text>
        </view>
        <view class="view_c" wx:if="{{item.coupon_discount>0}}">
          <text class="text_c">优惠券</text>
          <text class="text_c" style="color:white;width:100rpx;">{{item.coupon_discount/100}}元</text>
        </view>
      </view>
      <text class="text_sell_l">{{item.sales_tip}}人已购买</text>
    </view>
  </view>
  <image class="view_top" wx:for="{{info.goods_detail.goods_gallery_urls}}" wx:key="{{index}}" src="{{item}}" id="{{index}}" lazy-load="{{true}}" mode="widthFix"></image>
  <view class="view_100"></view>
  <view class="view_bottom">
    <button class="view_share" open-type="share">分享给好友</button>
    <button class="view_share" style="background-color:#FE463C" catchtap="toBuy">{{info.goods_detail.has_coupon?"领券购买":"立即购买"}}</button>
    <!-- <button class='view_share' style='background-color:#FE463C' catchtap='toBuy'>生成多多口令</button> -->
  </view>

  <image class="to_main" src="../../images/to_main.png" catchtap="toMain"></image>
</view>
