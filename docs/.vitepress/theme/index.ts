import { nextTick, watch, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import 'uno.css'

import Theme from 'vitepress/theme'
import './styles/font/index.css'
import './styles/base.css'
import './styles/vars.css'
import './styles/demo.css'
import './styles/scrollbar.css'
import './styles/sliding-enter-animation.css'
import './styles/piece-meal.css'

import mediumZoom from 'medium-zoom'

export default {
  ...Theme,
  setup() {
    const route = useRoute()
    const initMediumZoom = () =>
      mediumZoom('.content img', { background: 'var(--vp-c-bg)' })

    onMounted(() => initMediumZoom())

    watch(
      () => route.path,
      () => nextTick(() => initMediumZoom())
    )
  },
}
