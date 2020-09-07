# Other

> <a href="https://github.com/pipat2468/copy-paste-grid">grid</a> with Vue.js

## Development

mpm install @copy-paste/validate

## Usage

```html
<template>
    <div>
        <input v-model="fname" v-rule="rules.fname" style="width: 100%;" />
        <input v-model="lname" v-rule="rules.lname" style="width: 100%;" />
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

## 📑 License

[MIT License](./LICENSE)
