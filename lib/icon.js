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
    render(c) {
        const src = this.inline ? this.iconInline : this.icon
        return c('img', {
            attrs: {
                src
            },
            on: this.$parent.$listeners
        })
    }
}