---
title: 微信小程序自定义tabbar
categories: 前端
date: 2022-03-15 14:34:56
tags: [微信小程序]
---
<script type="text/javascript" src="/js/bai.js"></script>

# 自定义tabbar使用场景
当小程序的`用户类型不止一种`时，不同类型的用户登录之后进入到看到的场景一般也会有所不同，如关于学校的小程序，学生和老师登录进入的界面肯定是不一样的；关于医院的小程序，普通用户和医生进入的界面也是不一样的，这种场景是比较常见的，就不一一列举了。
<!-- more -->
# 自定义tabbar的步骤
一、首先在`app.json`进行配置，配置如下：
- tabBar：tabBar 组件的具体配置
    - custom：设为 true，表示使用自定义组件
    - list：tab 页列表，在列表中的页面将被设置为 tab 页，自动加载 tabBar

要将自定义的tabbar的列表定义一下。如：  
```js
  "tabBar": {
    "custom": true,
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "images/park.png",
        "selectedIconPath": "images/park1.png"
      },
      {
        "pagePath": "pages/appointment/appointment",
        "text": "预约就诊",
        "iconPath": "images/appoint.png",
        "selectedIconPath": "images/appoint1.png"
      },
      {
        "pagePath": "pages/coronavirus/coronavirus",
        "text": "肺炎疫情",
        "iconPath": "images/announce.png",
        "selectedIconPath": "images/announce1.png"
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的",
        "iconPath": "images/my2.png",
        "selectedIconPath": "images/my.png"
      }
    ]
  },
```


二、创建一个与`page`文件夹同级的目录，名称为`custom-tab-bar`。注意：文件名一定要用这个才可以。  
在`custom-tab-bar`中的`index.json`文件中进行配置：   
```json
{
  "component": true,
  "usingComponents": {}
}
```
在`custom-tab-bar`中的`index.js`文件中配置如下：
```js
const app = getApp();
Component({
  data: {
    selected: 0, // 当前选择的tab页的下标值
    color: "#000000",
    selectedColor: "#1396DB",
    allList: [{
      list1: [
        {
          "pagePath": "/pages/coronavirus/coronavirus",
          "text": "肺炎疫情",
          "iconPath": "../images/announce.png",
          "selectedIconPath": "../images/announce1.png"
        },
        {
          "pagePath": "/pages/my/my",
          "text": "我的",
          "iconPath": "../images/my2.png",
          "selectedIconPath": "../images/my.png"
        }
      ],

      list2: [
        {
          "pagePath": "pages/index/index",
          "text": "首页",
          "iconPath": "../images/park.png",
          "selectedIconPath": "../images/park1.png"
        },
        {
          "pagePath": "pages/appointment/appointment",
          "text": "预约就诊",
          "iconPath": "../images/appoint.png",
          "selectedIconPath": "../images/appoint1.png"
        },
      ],
    }],
    <!--最终展示出来的tab页的集合-->
    list: []
  },
  /**
  * 通过获取userType类型展示出不同的界面
  */
  attached() {
    const {
      userType
    } = app.globalData;
    this.setData({
      list: userType==='user'? this.data.allList[0].list1: this.data.allList[0].list2
    })
  },
  methods: {
    /*
    * 切换tab页时触发
    */
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  },
})
```
在`custom-tab-bar`中的`index.wxml`文件中配置如下：
```html
<cover-view class="tab-bar">
  <cover-view class="tab-bar-border"></cover-view>
  <cover-view wx:for="{{list}}" wx:key="index" class="tab-bar-item" data-path="{{item.pagePath}}" data-index="{{index}}" bindtap="switchTab">
    <cover-image class="cover-image" src="{{selected === index ? item.selectedIconPath : item.iconPath}}"></cover-image>
    <cover-view class="cover-view" style="color: {{selected === index ? selectedColor : color}}">{{item.text}}</cover-view>
  </cover-view>
</cover-view>
```

三、 在每一个tabbar中onShow生命周期中都要规定一下当前的tab页的下标值。如tabbar页中的`我的`：  
```js
onShow:function(){
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
}
```


# 注意事项
在`custom-tab-bar`中的`index.js`文件如上述的`allList`字段中列举的tabbar的信息中`pagePath`字段要以`/page`开始才能切换的时候找到索引位置，否则会出现点击tabbar失效，不会跳转的情况，如下图:
<img src='/微信小程序自定义tabbar/0.png' height='500'/>
正确例子:  
```js
"pagePath": "/pages/index/index",
```
错误例子：
```js
"pagePath": "../pages/index/index",
```