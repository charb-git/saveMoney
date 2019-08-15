<view class="weui-search-bar">
  <view class="weui-search-bar__form">
    <view class="weui-search-bar__box">
      <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
      <input type="text" class="weui-search-bar__input" placeholder="搜索" value="{{inputVal}}" focus="{{inputShowed}}" bindconfirm="search" bindinput="inputTyping" confirm-type='search' />
      <view class="weui-icon-clear" wx:if="{{inputVal.length > 0}}" bindtap="clearInput">
        <icon type="clear" size="14"></icon>
      </view>
    </view>
  </view>
  <view class="weui-search-bar__cancel-btn" bindtap="hideInput" style='color:{{inputVal.length>0?"#333":"#999"}}'>{{inputVal.length > 0?"搜索":"取消"}}</view>
</view>
<view class='view_h' wx:if="{{historyList.length>0}}">
  <view class='search_title' style='flex-grow: 1; border-bottom:0 '>最近搜索</view>
  <text class='text_del' catchtap='clean'>清空</text>
</view>
<view class='drawer_view_lable' wx:if="{{historyList.length>0}}">
  <view class="drawer_lable" hover-class='drawer_lable_select' hover-start-time='0' hover-stay-time='200' wx:for="{{historyList}}" wx:key="{{index}}" id='{{index}}' catchtap='lableItemClick' catchlongpress='lableLongClick' data-key='{{item}}'>{{item}}</view>
</view>
 <view class='view_like'>
    <view class='view_short_line'></view>
    <text>猜你喜欢</text>
    <view class='view_short_line'></view>
  </view>
  <view class='short_line_h'></view>
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
