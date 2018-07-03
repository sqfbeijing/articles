ZoneMap: 是store中 的zone.entities;



```
 getInventories = ad => {
    const {zonesMap, inventories} = this.props
    const zone = zonesMap[ad.adZoneId] //zone获取不到导致bug
    if (!zone) {
      console.log('下午1:14:32', zonesMap, ad)
      debugger
    }
    
    
    
     // 是由于ad 不存在导致的
     
           <Table fields={this.getScrollInfoFields()} data={ads} />
此处传了ads , getInventories那里取到ad
```

