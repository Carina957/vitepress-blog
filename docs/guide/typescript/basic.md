---
outline: deep
---

# 基础

## 定义接口

### interface

```ts
interface Props extends FormComponentProps {
  loading: boolean;
  dispatch: Dispatch;
  deviceInstance: any;
  location: Location;
}
// or
interface State {
  data: any;
  searchParam: any;
  addVisible: boolean;
  currentItem: Partial<DeviceInstance>;
  processVisible: boolean;
  importLoading: boolean;
  action: string;
  deviceCount: any;
  productList: DeviceProduct[];
  deviceIdList: any[];
}
```

### type

```ts
type Props = FormComponentProps & {
  loading: boolean;
  dispatch: Dispatch;
  deviceInstance: any;
  location: Location;
}

tpye State = {
  data: any;
  searchParam: any;
  addVisible: boolean;
  currentItem: Partial<DeviceInstance>;
  processVisible: boolean;
  importLoading: boolean;
  action: string;
  deviceCount: any;
  productList: DeviceProduct[];
  deviceIdList: any[];
}
```
