# Other

> <a href="https://github.com/pipat2468/copy-paste-grid">grid</a> with Vue.js

## Development

mpm install @copy-paste/validate

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

```bash
# validate only rule
```

```html
<input v-model="fname" v-rule="rules.fname" ref="fname" />
```

```js
this.$refs.fname.validate()
```

```bash
# force error
```

```html
<input v-model="fname" v-rule="rules.fname" ref="fname" />
```

```js
this.$refs.fname.error('force') //force

this.$refs.fname.error() //un force
```

```bash
# add css on element then error
```

```html
<input v-model="fname" v-rule="rules.fname" rule-error-css="input-error" />
```

```css
.input-error {
    border: 1px solid red;
}
```

## 📑 License

[MIT License](./LICENSE)
