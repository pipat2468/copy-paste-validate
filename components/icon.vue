<template>
    <img :src="src" />
</template>

<script>
import icon from '@copy-paste/validate/icons/exclamation-circle-solid.svg'
import iconInline from '@copy-paste/validate/icons/exclamation-circle-solid-inline.svg'

export default {
    props: {
        inline: Boolean
    },
    data() {
        return {
            icon,
            iconInline
        }
    },
    computed: {
        src() {
            return this.inline ? this.iconInline : this.icon
        }
    }
}
</script>
