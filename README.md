# Other

> <a href="https://github.com/pipat2468/copy-paste-grid">grid</a> with Vue.js

> <a href="https://github.com/pipat2468/copy-paste-loading">loading</a> with Vue.js

## Development

npm install @copy-paste/validate

## Config

```js
import validate from '@copy-paste/validate'

Vue.use(validate)

//validate inline
Vue.use(validate, {
    inline: true
})
```

## Usage

```html
<template>
    <div>
        <input v-model="fname" v-rule="rules.fname" />
        <input v-model="lname" v-rule="rules.lname" />
        <button @click="submit">submit</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fname: '',
                lname: '',
                rules: this.$rules({
                    fname({ el }) {
                        if (!el.value) {
                            return 'fname is require'
                        }
                        if (el.value == 'ss') {
                            return 'duplicate fname'
                        }
                    },
                    lname({ el }) {
                        if (!el.value) {
                            return 'lname is require'
                        }
                    }
                })
            }
        },
        methods: {
            submit() {
                const errors = this.rules.validate()
                if (errors.length) return
                //--
            }
        }
    }
</script>
```

### event usage

```html
<input v-model="fname" v-rule="rules.fname" ref="fname" />
```

```js
//validate
this.$refs.fname.validate()

//force error
this.$refs.fname.error('force') //force

this.$refs.fname.error() //un force

//clear
this.$refs.fname.clear()
```

### add css on element when error

```html
<input v-model="fname" v-rule="rules.fname.options({ css: 'input-error' })" />
```

```css
.input-error {
    border: 1px solid red;
}
```

### custom error

```html
<input v-model="fname" v-rule="rules.fname.options({ ref: 'err' })" />
<v-rule ref="err" style="color: red;" />

<!-- or -->

<input v-model="fname" v-rule="rules.fname.options({ ref: 'err' })" />
<v-rule ref="err" class="error-custom">
    <template #default="e">
        <v-rule-icon inline width="16" style="margin-right: 5px;" /> {{e.error}}
    </template>
</v-rule>
```

```css
.error-custom {
    color: red;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
```

### multiple element with one rule

```html
<!-- need key -->

<div v-for="(item, i) in items" :key="i">
    <input v-rule="rules.empty.options({ key: 'item' + i })" />
</div>
```

```js
export default {
    data() {
        return {
            items: [{ id: 1 }, { id: 2 }],
            rules: this.$rules({
                empty({ el, options }) {
                    if (!el.value) {
                        return `${options.key} is require`
                    }
                }
            })
        }
    }
}
```

## Options

| name | value          |
| ---- | -------------- |
| css  | String         |
| ref  | String         |
| key  | String, Number |

## Events

| name     | params | default   |
| -------- | ------ | --------- |
| validate | -      | undefined |
| error    | String | undefined |
| clear    | -      | undefined |

## 📑 License

[MIT License](./LICENSE)
