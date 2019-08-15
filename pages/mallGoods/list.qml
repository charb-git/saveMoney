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
<!--在此添加页面布局-->
<view class=" page-bg " wx:else>
  <view class='view_item_l' wx:for="{{list}}" wx:key="{{index}}" catchtap='onItemClickListener' id="{{item.goods_id}}">
    <image class='img_goods_l' src="{{item.goods_thumbnail_url}}"  lazy-load="true"></image>
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
        <view class='view_c' wx:if="{{item.coupon_discount>0}}">
          <text class='text_c'>优惠券</text>
          <text class='text_c' style='color:white;width:100rpx;'>{{item.coupon_discount/100}}元</text>
        </view>
      </view>
      <text class='text_sell_l'>{{item.sales_tip}}人已购买</text>
    </view>
  </view>
</view>
<!--列表结束  -->
<view class=" loading_box " wx:if="{{loadMore}}">
  <view class="pulse pulse_1 "></view>
  <view class="pulse pulse_2 "></view>
  <view class="pulse pulse_3 "></view>
  <view class="pulse pulse_4 "></view>
</view>