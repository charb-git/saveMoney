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
  <view class='view_item' wx:for="{{list}}" wx:key="{{index}}" catchtap="onAdItemClickListener" id="{{index}}">
    <image class="view_img_s" src="{{item.image_url}}" lazy-load="true"> </image>

 <text class="text_title">{{item.name}}</text>
  </view>
  <view class="view_100"></view>
</view>