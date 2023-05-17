// import { h } from 'vue'
import Theme from 'vitepress/theme'
import './styles/vars.css'
import './styles/demo.css'
import DemoContainer from './components/DemoContainer.vue'

export default {
  ...Theme,
  // Layout() {
  //   return h(Theme.Layout, null, {
  //     'demo-container': () => h(DemoContainer),
  //   })
  // },
  enhanceApp({ app }) {
    app.component('SvgImage', DemoContainer)
  },
}
