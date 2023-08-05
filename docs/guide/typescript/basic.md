---
outline: deep
---

# 基础

## 定义接口

### interface

```ts
interface Props extends FormComponentProps {
  loading: boolean
  dispatch: Dispatch
  deviceInstance: any
  location: Location
}
// or
interface State {
  data: any
  searchParam: any
  addVisible: boolean
  currentItem: Partial<DeviceInstance>
  processVisible: boolean
  importLoading: boolean
  action: string
  deviceCount: any
  productList: DeviceProduct[]
  deviceIdList: any[]
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

### Axios 的返回值类型

在 `data.d.ts` 文件下(这个文件一般用来存放各个接口的类型)定义好 `axios` 返回值的类型的类型:

```ts
/* 定义 `fetch_profile` 接口返回类型 */
export interface IApiFetchProfileResponse<T> {
  /* 根据接口响应数据统一封装接口 */
  message: string
  data: T
}

export interface IUserProfile {
  id: number
  name: string
  avatar: string
  mobile_phone: number
  birthday: string
  intro: string
}
```

**Usage:**

```ts
import {
  IApiFetchProfileResponse,
  IUserProfile,
} from '@/types/api-response.data.d.ts'
import { fetchProfile } from '@/api/fetch-profile.ts'

const fetchProfile = async () => {
  const { message, data } = await fetchProfile<
    IApiFetchProfileResponse<IUserProfile>
  >()

  profiles = data
  Message.success(message)
}
```
