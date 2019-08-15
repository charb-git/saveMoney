<view class="view-no-use" style='height:{{height}}px' qq:if="{{loadingState!=1}}">
  <view class='view_loading' qq:if="{{loadingState==0}}">
    <text class="icon-open-new icon"></text>
    <text>加载中</text>
  </view>
  <image class="img-no-data" qq:if="{{loadingState>1}}" src="{{loadIngStateImg[loadingState]}}"></image>
  <text class="text_no_data" qq:if="{{loadingState>1}}">{{loadIngStateText[loadingState]}}</text>
  <text class="text_no_data_dsc" qq:if="{{loadingState>1}}">{{loadIngStateTextDsc[loadingState]}}</text>
  <text class='view_no_data_reload' qq:if="{{loadingState==3}}" catchtap='reLoadPageData'>刷新</text>
</view>
<!--在此添加页面布局-->
<view class=" page-bg " qq:else>
  <view class="view_top">
    <image src="{{topImg}}" class="view_img_s" />
    <image class="img_tb" src="../../images/tb.png"></image>
  </view>
  <view class="view_hint">
    <image class="img_icon" src="../../images/ti.png"></image>
    <text class="text_hint">限量好券</text>
    <image class="img_icon" src="../../images/ti2.png"></image>
  </view>
  <!-- <view class='view_item_l' qq:for="{{list}}" qq:key="{{index}}" catchtap='onItemClickListener' id="{{item.goods_id}}">
    <image class='img_goods_l' src="{{item.goods_thumbnail_url}}"></image>
    <view class='view_right_l'>
      <view class='view_title_l'>
        <text class='view_by_l'>包邮</text>
        <text>{{item.goods_name}}</text>
      </view>
      <view class='view_price_and_c_l'>
        <view class='view_price_l'>
          <text>{{item.coupon_discount>0?"券后价":"优惠价"}}：</text>
          <text style='color:#FA231D;font-size:30rpx;font-weight:400; line-height: 30rpx;'>¥{{item.coupon_discount>0?(item.min_group_price-item.coupon_discount)/100:item.min_group_price/100}}</text>
        </view>
        <view class='view_c' qq:if="{{item.coupon_discount>0}}">
          <text class='text_c'>优惠券</text>
          <text class='text_c' style='color:white;width:100rpx;'>{{item.coupon_discount/100}}元</text>
        </view>
      </view>
      <text class='text_sell_l'>{{item.sales_tip}}人已购买</text>
    </view>
  </view> -->
  <view class='view_goods'>
    <view class='view_item' qq:for="{{list}}" qq:key="{{index}}" catchtap='onItemClickListener' id="{{item.goods_id}}">
      <image class='img_goods' src="{{item.goods_thumbnail_url}}"  lazy-load="true"></image>
      <text class='text_title'>{{item.goods_name}}</text>
      <text class='view_quan' style="align-self: flex-start">{{item.coupon_discount/100}}元</text>
      <view class='view_bottom'>
        <view class='view_price'>
          <text style='font-size:20rpx;margin-left:5rpx'>券后¥</text>
          <text>{{(item.min_group_price-item.coupon_discount)/100}}</text>
          <text style='color:#999;font-size:20rpx; text-decoration: line-through;margin-left:10rpx'>¥{{item.min_group_price/100}}</text>
        </view>
      </view>
    </view>
  </view>
</view>