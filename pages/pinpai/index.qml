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
  <view class="view_item" wx:for="{{list}}" wx:key="{{index}}">
    <view class="view_mall_msg">
      <image class="img_mall" src="{{mallImgobj[item.goods_detail_vo_list[0].mall_id]}}"></image>
      <view class="view_mall_dsc">
        <view class="text_mall_name">
          <text class="text_mall_type">{{mallType[item.goods_detail_vo_list[0].merchant_type]}}</text>
          <text>{{item.goods_detail_vo_list[0].mall_name}}</text>
          <text class="text_mall_s">{{item.goods_detail_vo_list[0].category_name}}</text>
        </view>
        <view class="text_mall_p">
          <text>{{item.sales_tip}}</text>
        </view>
      </view>
      <text class="text_look" catchtap="toMall" id="{{index}}">进店</text>
    </view>
    <view class="view_goods">
      <view class="view_item_goods" wx:for="{{item.goods_detail_vo_list.length>3?3:item.goods_detail_vo_list}}" wx:for-item="goods" wx:for-index="posi" wx:key="{{posi}}">
        <image class="img_goods" src="{{item.goods_detail_vo_list[posi].goods_thumbnail_url}}" catchtap="onItemClickListener" id="{{item.goods_detail_vo_list[posi].goods_id}}"></image>
        <text class="text_item_price">¥{{item.goods_detail_vo_list[posi].min_group_price/100}}</text>
      </view>
    </view>
    <view class="text_mall_p" style="margin-top: 30rpx">
      <text style="margin-right: 30rpx;">描述相符：{{item.desc_txt}}</text>
      <text>物流评分：{{item.lgst_txt}}</text>
    </view>
  </view>
  <text class="text_change" catchtap='changeMall'>不感兴趣，换一批</text>
  <view class="view_100"></view>
</view>