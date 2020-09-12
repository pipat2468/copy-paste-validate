# Other

> <a href="https://github.com/pipat2468/copy-paste-grid">grid</a> with Vue.js

## Development

npm install @copy-paste/validate

## Config

```js
import validate from '@copy-paste/validate'

Vue.use(validate)
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
                rules: this.$create_rules({
                    fname(el) {
                        if (!el.value) {
                            return 'fname is require'
                        }
                        if (el.value == 'ss') {
                            return 'duplicate fname'
                        }
                    },
                    lname(el) {
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

# validate only rule

```html
<input v-model="fname" v-rule="rules.fname" ref="fname" />
```

```js
this.$refs.fname.validate()
```

# force error

```html
<input v-model="fname" v-rule="rules.fname" ref="fname" />
```

```js
this.$refs.fname.error('force') //force

this.$refs.fname.error() //un force
```

# add css on element when error

```html
<input v-model="fname" v-rule="rules.fname.options({ css: 'input-error' })" />
```

```css
.input-error {
    border: 1px solid red;
}
```

# custom error

```html
<input v-model="fname" v-rule="rules.fname.options({ ref: 'err' })" />
<v-rule ref="err" style="color: red;" />

<!-- or -->

<input v-model="fname" v-rule="rules.fname.options({ ref: 'err' })" />
<v-rule ref="err" style="color: red;">
    <template #default="e"> Error: {{e.error}} </template>
</v-rule>
```

## Options

| name | value  |
| ---- | ------ |
| css  | String |
| ref  | String |

## 📑 License

[MIT License](./LICENSE)
