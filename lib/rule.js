export default {
    props: {
        tag: {
            type: String,
            default: 'div'
        }
    },
    data() {
        return {
            error: ''
        }
    },
    render(c) {
        if (this.error) {
            const sdf = this.$scopedSlots.default
            return c(
                this.$parent.tag,
                {
                    on: this.$parent.$listeners
                },
                sdf
                    ? [
                          sdf({
                              error: this.error
                          })
                      ]
                    : this.error
            )
        }
    },
    methods: {
        show(error) {
            this.error = error
        },
        hide() {
            this.error = ''
        }
    }
}
