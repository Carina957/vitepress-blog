---
outline: deep
---

# 拓展

## JSX

JSX 是一种 JavaScript 的语法拓展

一个简单的 JSX ：

```jsx
const element = (
  <div>
    <h1>Hi there 👋</h1>
    <h2>Good to see you here.</h2>
  </div>
)
```

### 优点

- JXS 执行更快，因为它在编译成 JavaScript 代码后进行了优化。

  `Babel` 会把 JSX 转译为一个名为 `React.createElement()` 函数调用。
  以下两种示例代码完全等效:

  ```jsx
  const element = (
    <div>
      <h1 className="greeting">Hi there 👋</h1>
    </div>
  )

  const elementR = React.createElement(
    'h1',
    {
      className: 'greeting',
    },
    'Hi there 👋'
  )
  ```

  `React.createElement()` 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象:

  ```jsx
  // ! 注意这是简化后的结构
  const element = {
    type: 'h1',
    props: {
      className: 'greeting',
      children: 'Hi there 👋',
    },
  }
  ```

  如果有变量的话：

  ```jsx
  ReactDOM.render(
    <div>
      <h1>{1 + 1}</h1>
    </div>,
    document.getElementById('examle')
  )
  ```

- JSX 是类型安全的，因为它在编译过程中就能发现错误。
- 使用 JSX 编写模版更简单快速。

## React 动态表单

::: details 使用`函数式组件(React.FC)`写法时：

```tsx
import { Form, Input, Radio, Icon, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React, { useState, useEffect } from 'react'

interface Props extends FormComponentProps {
  close: Function
  save: Function
  data: Partial<any>
}

interface State {}

let id = 0

const SaveData: React.FC<Props> = props => {
  const initState: State = {}

  const [loading, setLoading] = useState<boolean>(false)
  const [forwardType, setForwardType] = useState<object>({ label: 'HTTP', value: 'HTTP' })

  const {
    form,
    form: { getFieldDecorator, getFieldValue },
  } = props

  const add = () => {
    const keys = getFieldValue('keys')
    const nextKeys = keys.concat(id++)

    form.setFieldsValue({ keys: nextKeys })
  }

  const remove = (k: number) => {
    const keys = getFieldValue('keys')

    form.setFieldsValue({
      keys: keys.filter((key: number) => key !== k),
    })
  }

  const submit = () => {
    form.validateFields((errors, values) => {
      if (errors) return

      props.data.id && (values.id = props.data.id)

      const { keys, params, ...others } = values
      const { forwardType } = values

      if (forwardType === 'HTTP') {
        !!params && params.forEach((p: {}) => delete p.HEADER)
      }

      const data = { ...others, params: JSON.stringify(params) }

      props.save(data)
    })
  }

  // initial dynamic form
  const dynamicFormItemStyle = {
    flex: 1,
  }
  getFieldDecorator('keys', { initialValue: [] })
  const keys = getFieldValue('keys')
  const dynamicFormItem = keys.map((k: number, index: number) => (
    <Form
      layout='inline'
      labelAlign='left'
      style={{ display: 'flex' }}
    >
      <Form.Item
        key={`params[${index}].key`}
        label='参数名'
        style={{ ...dynamicFormItemStyle }}
      >
        {getFieldDecorator(`params[${index}].key`, {
          validateTrigger: ['change', 'onBlur'],
          rules: [
            {
              required: true,
              message: '请填写参数名',
            },
          ],
          initialValue:
            (props.data.params && JSON.parse(props.data.params)[index]['key']) ||
            '',
        })(<Input placeholder='请输入参数名' />)}
      </Form.Item>
      <Form.Item
        key={`params[${index}].value`}
        label='参数值'
        style={{ ...dynamicFormItemStyle }}
      >
        {getFieldDecorator(`params[${index}].value`, {
          validateTrigger: ['change', 'onBlur'],
          rules: [
            {
              required: true,
              message: '请填写参数值',
            },
          ],
          initialValue:
            (props.data.params && JSON.parse(props.data.params)[index]['value']) ||
            '',
        })(<Input placeholder='请输入参数值' />)}
      </Form.Item>
      {forwardType.value === 'HTTP' && (
        <Form.Item
          key={`params[${index}].HEADER`}
          label="是否HEADER"
          style={{ ...dynamicFormItemStyle }}
        >
          {getFieldDecorator(`params[${index}].HEADER`, {
            initialValue: (
              props.data.params &&
                JSON.parse(props.data.params)[index]['HEADER']
              ) || 1,
          })(
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>
          )}
        </Form.Item>
      )}
      <Icon
        type="minus-circle-o"
        style={{ fontSize: 18 }}
        onClick={() => removeParams(k)}
      ></Icon>
    </Form.Item>
  ))

  useEffect(() => {
    if (props.data.id) {
      setForwardType(
        [
          { label: 'HTTP', value: 'HTTP' },
          { label: 'PULSAR', value: 'PULSAR' },
          { label: 'MQTT', value: 'MQTT' },
        ].find(f => f.value === props.data.forwardType),
      )

      !!props.data.params && JSON.parse(props.data.params).forEach(() => add())
    }
  })
}

export default Form.create<Props>()(SaveDate)
```

:::

::: details 当你使用`类组件(class)`时：

```jsx
import { Form, Input, Icon, Button } from 'antd'

let id = 0

class DynamicFieldSet extends React.Component {
  remove = k => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')

    if (keys.length === 1) return

    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    })
  }

  add = () => {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(id++)

    form.setFieldsValue({
      keys: nextKeys,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values
        console.log('Received values of form:', values)
        console.log('Merged values: ', keys.map(key => names[key]))
      }
    })
  }

  render () {
    const { getFieldDecrator, getFieldValue } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4 }，
      },
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    }
    getFieldDecrator('keys', { initialValue: [] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => {
      <Form.Item
        {...(index) === 0 ? formItemLayout : formItemLayoutWithOutLable}
        label={index !== 0 ? 'Passengers' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['change', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field.",
            },
          ],
        })(<Input placehodler="passagenger name" style={{ width: '60%', marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          ></Icon>
        ) : null}
      </Form.Item>
    })

    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button
            type="primary"
            htmlType="submit"
          >Submit</Button>
        </Form.Item>
      </Form.Item>
    )
  }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet)

ReactDOM.render(<WrappedDynamicFieldSet />, mountNode)
```

:::

### 参考

- [Ant-design (3.x)](https://3x.ant.design/components/form-cn/#components-form-demo-dynamic-form-item)
- [Ant-design (5.2.3)](https://ant.design/components/form-cn#components-form-demo-dynamic-form-item)
