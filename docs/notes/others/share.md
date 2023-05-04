---
outline: deep
---

# 前端开发中组件的重要性

## 组件的分类

一般来说，Vue.js 组件主要分成三类：

- 路由组件

  由 `vue-router` 产生的每个页面，它本质上也是一个组件（`.vue`），主要承载当前页面的 HTML 结构，会包含数据获取、数据整理、数据可视化等常规业务。整个文件相对较大，但一般不会有 props 选项和 自定义事件，因为它作为路由的渲染，不会被复用，因此也不会对外提供接口。

  在项目开发中，我们写的大部分代码都是这类的组件（页面），协同开发时，每人维护自己的页面，很少有交集。这类组件相对是最好写的，因为主要是还原设计稿，完成需求，不需要太多模块和架构设计上的考虑。

- 不包含业务，独立、具体功能的基础组件。

  比如日期选择器、模态框等。这类组件作为项目的基础控件，会被大量使用，因此组件的 `API` 进行过高强度的抽象，可以通过不同配置实现不同的功能。比如开源的 `ElementUI` ，就是包含了 50 多个这样基础组件的 UI 组件库。

  每个公司都有自己的组件使用规范或组件库，但要开发和维护一套像 iView 这样的组件库，投入的人力和精力还是很重的，所以出于成本考虑，很多项目都会使用已有的开源组件库。

  独立组件的开发难度要高于第一类组件，因为它的侧重点是 `API` 的设计、兼容性、性能、以及复杂的功能。这类组件对 `JavaScript` 的编程能力有一定要求，也会包含非常多的技巧，比如在不依赖 `Vuex` 和 `Bus` （因为独立组件，无法依赖其它库）的情况下，各组件间的通信，还会涉及很多脑壳疼的逻辑，比如日期选择器要考虑不同时区、国家的日历习惯，支持多种日期格式。

- 业务组件。

  它不像第二类独立组件只包含某个功能，而是在业务中被多个页面复用的，它与独立组件的区别是，业务组件只在当前项目中会用到，不具有通用性，而且会包含一些业务，比如数据请求；而独立组件不含业务，在任何项目中都可以使用，功能单一，比如一个具有数据校验功能的输入框。

  业务组件更像是介于第一类和第二类之间，在开发上也与独立组件类似，但寄托于项目，你可以使用项目中的技术栈，比如 `Vuex`、`axios`、`echarts` 等，所以它的开发难度相对独立组件要容易点，但也有必要考虑组件的可维护性和复用性。

## 组件的构成

一个再复杂的组件，都是由三部分组成的：`prop`、`event`、`slot`，它们构成了 Vue.js 组件的 API。如果你开发的是一个通用组件，那一定要事先设计好这三部分，因为组件一旦发布，后面再修改 API 就很困难了，使用者都是希望不断新增功能，修复 bug，而不是经常变更接口。

## 组件封装原则

1. 单一原则：负责单一的页面渲染
2. 多重职责：负责多重职责，获取数据，复用逻辑，页面渲染等
3. 明确接受参数：必选，非必选，参数尽量设置以\_开头，避免变量重复
4. 可扩展：需求变动能够及时调整，不影响之前代码
5. 代码逻辑清晰
6. 封装的组件必须具有高性能，低耦合的特性
7. 组件具有单一职责：封装业务组件或者基础组件，如果不能给这个组件起一个有意义的名字，证明这个组件承担的职责可能不够单一，需要继续抽组件，直到它可以是一个独立的组件即可。

### 可维护性 可扩展性

1. 活用组件继承
2. 活用 slot
3. 使用 props 灵活表现界面元素
4. 父子拆分

### 让代码更加简洁、逻辑更加清晰的组件——业务组件

下面结合具体的代码简单的做一下剖析：

页面结构：

![项目目录](https://raw.githubusercontent.com/Carina957/PicGoCDN/main/path.png)

::: details LiveStreaming.vue

```vue
<template>
  <div class="live_streaming">
    <ul v-if="hasVideo" class="live_streaming_list list_none m p">
      <li
        v-for="d in devices"
        :key="d[channel].id"
        class="item flex align_center justify_between mb_3 cursor_pointer p_3"
      >
        <div class="flex align_center">
          <img
            :src="DEVICE_IMG(d[channel].channelName)"
            width="22"
            height="22"
            alt="device logo"
            class="mr_2"
          />
          <span>{{ d[channel].channelName }}</span>
        </div>
        <img
          v-if="playIndex === 1"
          :src="require('@/assets/images/video-surveillance/play.png')"
          width="22"
          height="22"
          alt="play button"
          @click="handlePlay(d)"
        />
        <template v-else>
          <el-popover
            trigger="hover"
            placement="right"
            title="播放窗口"
            width="90"
            popper-class="el-popover__play-window"
          >
            <ul
              class="play_window list_none flex flex_wrap p m justify_around align_center"
            >
              <li
                v-for="(w, i) in playIndex"
                :key="w"
                :style="playIndex === 4 && windowStyle"
                @click="handlePlay(d, i)"
              >
                {{ w }}
              </li>
            </ul>
            <img
              slot="reference"
              :src="require('@/assets/images/video-surveillance/play.png')"
              width="22"
              height="22"
              alt="play button"
            />
          </el-popover>
        </template>
      </li>
    </ul>
    <div v-else class="flex justify_center align_center">
      <img
        :src="require('@/assets/images/zanwushuju.png')"
        width="209"
        height="205"
        alt="no data"
      />
    </div>
  </div>
</template>

<script>
import { queryByDeviceSerial } from '@/api/mnt/projectVideo'
import { getDepts } from '@/api/mnt/findAllEquipmentMonitorByTenant'
import { mapGetters } from 'vuex'

export default {
  name: 'LiveStreaming',
  props: {
    playIndex: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      hasVideo: false,
      devices: [],
      channel: 'equipmentMonitorChannel',
      windowStyle: {
        width: '50px',
        height: '50px',
        lineHeight: '50px',
      },
    }
  },
  computed: {
    ...mapGetters(['projectName', 'deviceList']),
  },
  watch: {
    projectName: {
      handler(name) {
        this.queryVideoId(name)
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handlePlay(info, window) {
      this.$emit('transfer-aisle', info, window)
    },
    DEVICE_IMG(name, type = 'active') {
      const DEVICE_DICT = {
        球机: require(`@/assets/images/video-surveillance/ball-machine_${type}.png`),
        other: require(`@/assets/images/video-surveillance/monitor_${type}.png`),
      }
      for (const d in DEVICE_DICT) {
        if (name.includes(d)) {
          return DEVICE_DICT[d]
        } else {
          return DEVICE_DICT['other']
        }
      }
    },
    fetchDeviceList(projectInfo) {
      if (projectInfo) {
        const deviceSerial = projectInfo.deviceSerial
        queryByDeviceSerial({ deviceSerial })
          .then(res => {
            if (res.length) {
              this.hasVideo = true
              this.devices = res
              this.$store.commit('project/SET_DEVICELIST', res)
              this.$emit('transfer-aisle', res[0])
            }
          })
          .catch(() => {
            this.devices = []
            this.hasVideo = false
            this.$emit('transfer-aisle', 0, 0, false)
          })
      }
    },
    queryVideoId(projectName) {
      getDepts({ projectName }).then(
        res => res.length && this.fetchDeviceList(res[0])
      )
    },
  },
}
</script>
```

:::

::: details PlayContainer.vue

```vue
<template>
  <div>
    <div :id="`play-container_${index}`" class="play_container" />
  </div>
</template>

<script>
export default {
  name: 'PlayContainer',
  props: {
    index: {
      type: Number,
      default: 0,
    },
  },
}
</script>
```

:::

::: details Index.vue

```vue
<template>
  <div class="no-child-title m_20">
    <el-row :gutter="20" class="flex">
      <el-col :span="6" style="min-width: 475px">
        <el-card shadow="always" class="relative">
          <el-tabs
            v-model="activeName"
            class="w_100"
            @tab-click="handleSwitchTabs"
          >
            <el-tab-pane label="直播" name="liveStreaming">
              <LiveStreaming
                :play-index="playIndex"
                @transfer-aisle="playVideo"
              />
            </el-tab-pane>
            <el-tab-pane label="回放" name="playBack">
              <PlayBack />
            </el-tab-pane>
          </el-tabs>
          <div class="qr_code absolute flex align_center cursor_pointer">
            <span>视频接入二维码</span>
            <img
              class="ml_1"
              :src="require('@/assets/images/video-surveillance/QRCode.svg')"
              width="20"
              height="20"
              alt="QRCode"
            />
            <el-popover
              placement="bottom-end"
              trigger="hover"
              title="分屏播放"
              width="84"
              popper-class="el-popover__custom"
            >
              <div class="split_screen_play">
                <img
                  v-for="s in splits"
                  :key="s.id"
                  :src="s.img"
                  width="30"
                  height="30"
                  class="split_item"
                  @click="handleSplit(s.id)"
                />
              </div>
              <img
                slot="reference"
                :src="
                  require('@/assets/images/video-surveillance/split-screen.png')
                "
                width="25"
                height="25"
                alt="split screen"
                class="cursor_pointer ml_1"
              />
            </el-popover>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <div
          class="video_container"
          :class="{
            play_container_4: playIndex === 4,
            play_container_9: playIndex === 9,
            play_container_6: playIndex === 6,
          }"
        >
          <div v-if="playIndex === 0" class="flex justify_center align_center">
            <img
              :src="require('@/assets/images/zanwushuju.png')"
              alt="no data"
            />
          </div>
          <template v-for="(p, i) in Number(playIndex)">
            <div
              v-if="!hasVideo"
              :key="Date.now() + p"
              class="flex justify_center align_center"
            >
              <img
                :src="require('@/assets/images/zanwushuju.png')"
                width="209"
                height="205"
                alt="no data"
              />
            </div>
            <PlayContainer
              v-else
              :key="Date.now() + p"
              :index="i"
              :class="{
                play_container_6_1: playIndex === 6 && i === 0,
              }"
            />
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LiveStreaming from './components/LiveStreaming.vue'
import PlayContainer from './components/PlayContainer.vue'
import { mapGetters } from 'vuex'
import EZUIKit from 'ezuikit-js'
import themeData from './models/ezuikit.theme'

export default {
  name: 'VideoSurveillance',
  components: {
    LiveStreaming,
    PlayContainer
  },
  computed: {
    ...mapGetters(['deviceList'])
  },
  methods: {
    playVideo(info, index = 0, hasVideo = true) {
      this.playerList[index].player = null

      if (!hasVideo) {
        this.hasVideo = hasVideo
        return
      }
      this.hasVideo = hasVideo
      if (!info) return

      this.$nextTick(() => {
        const PLAY_CONTAINER = document.querySelector(`#play-container_${index}`)

        this.playerList[index].player = new EZUIKit.EZUIKitPlayer({
          id: `play-container_${index}`,
          accessToken: info.token,
          url: info[this.channel].channelUrl
          themeData,
          width: PLAY_CONTAINER.clientWidth,
          height: PLAY_CONTAINER.clientHeight,
          plugin: ['talk'],
          audio: false
        })
      })
    }
  }
}
</script>
```

:::

### 根据需求对组件的基础组件进行二次封装

::: details Dialog.vue

```vue
<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisiable"
      :append-to-body="isAppendToBody"
      :title="title"
      :width="width"
      custom-class="rounded"
    >
      <slot></slot>
      <span slot="footer">
        <slot name="footer"></slot>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    title: {
      type: String,
      default: '提示',
    },
    width: {
      type: String,
      default: '30%',
    },
    isAppendToBody: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisiable: false,
    }
  },
  methods: {
    open() {
      this.dialogVisiable = true
    },
    close() {
      this.dialogVisiable = false
    },
  },
}
</script>
```

:::

::: details Table.vue

```vue
<template>
  <div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="data"
      ref="table"
      :stripe="stripe"
      :border="border"
      :max-height="maxHeight"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="selectionChange"
      class="rounded"
    >
      <template v-for="col in columns">
        <el-table-column
          v-if="col.slot"
          :key="col.prop + ' ' + col.name"
          :type="col.type || ''"
          :prop="col.prop"
          :label="col.name"
          :width="col.width"
          :fiexd="col.fixed || false"
          :align="col.align || 'center'"
          :sortable="col.sortable"
        >
          <template #default="{ row, column, $index }">
            <slot
              :row="row"
              :column="column"
              :$index="$index"
              :name="col.slot"
            ></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="col.prop + ' ' + col.name"
          :type="col.type || ''"
          :prop="col.prop"
          :label="col.name"
          :width="col.width"
          :fiexd="col.fixed || false"
          :align="col.align || 'center'"
          :sortable="col.sortable"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'STable',
  props: {
    data: {
      type: Array,
      required: true,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: Number || String,
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true,
    },
    selectionChange: {
      type: Function,
      default: () => {},
    },
    sortable: {
      type: Boolean || String,
      default: false,
    },
  },
  methods: {
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection()
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
  },
}
</script>
```

:::

::: details MineFab.vue

```vue
<template>
  <uni-fab
    horizontal="right"
    :popMenu="false"
    @fabClick="handleFabClick"
  ></uni-fab>
</template>

<script>
import { objToUrl } from '@/common/utils/index.js'

export default {
  name: 'MineFab',
  props: {
    path: String,
    params: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
```

:::
