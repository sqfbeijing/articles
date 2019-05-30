在  /Users/shaoqianfei/Desktop/work-zhihu/doctor-strange/src/components/Invoice/InvoiceFormQualification.js  文件中,  希望当选择 营业执照(可选)时候， 税务登记证变为 可选，  而没选择 营业执照(可选)得时候， 税务登记证变为 必选。



**税务登记证：** 

我的做法是， constructor中 初始化是否 必选， 当props变动(上层组件传递下来时) 时， 在componentWillReceiveProps 中需要进行对比, 然后 再次初始化是否必选。  当营业执照onChange时候再次更改必选状态， 并且要利用validateFields消除红色警告， 不然点击提交按钮， 红色警告 税务登记证 标红， 上传营业执照之后， 提示不消失。



![](http://owbd0ue91.bkt.clouddn.com/WX20180623-115458@2x.png) 







**发票文件**

/Users/shaoqianfei/Desktop/work-zhihu/doctor-strange/src/components/Invoice/InvoiceFormInvoiceInfo.js

**发票文件**中，我现在只是onChange 的时候去更新 必选状态， 没有在constructor和componentWillReceiveProps 进行初始化，  由于初始我设置了 `isInvoiceMoreInfoRequired: false`,   所以每次进来 不管专票、普票 默认都是没有 红色标记的， 这个是个问题， 要想完美显示， 那么需要在constructor和componentWillReceiveProps 根据props进行初始化。 





###  是否太麻烦？

觉得此种做法的确太麻烦了， 尝试 后端校验 ，或者 最终全局提示。  并且，最外层应改为只有数据ok的情况下 才加载此组件， 这样就杜绝使用 componentWillReceiveProps了， 减少代码量。