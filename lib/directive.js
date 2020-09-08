import { createPopper } from '@popperjs/core'

function __GEN_VID__(binding) {
    let vid = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < 20; i++) {
        vid += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    const rule = binding.value.getRule(vid)
    if (rule) {
        return __GEN_VID__(binding)
    } else {
        return vid
    }
}

export const bind = function (el, binding, vnode) {
    if (!el.vid) {
        vnode.context.$nextTick(() => {
            setTimeout(() => {
                const vid = __GEN_VID__(binding)
                Object.defineProperty(el, 'vid', {
                    value: vid
                })
                const rules = binding.value.getRules()

                const tooltip = document.createElement('div')
                tooltip.classList.add('copy-paste--validate')
                const arrow = document.createElement('div')

                arrow.classList.add('data-popper-arrow')
                tooltip.appendChild(arrow)

                const text = document.createElement('span')
                tooltip.appendChild(text)
                tooltip.text = text
                document.body.appendChild(tooltip)

                const popper = createPopper(el, tooltip, {
                    modifiers: [
                        {
                            name: 'arrow',
                            options: {
                                element: arrow
                            }
                        },
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 1]
                            }
                        }
                    ]
                })

                const errorCss = vnode.elm.attributes['rule-error-css']

                const rule = {
                    vid,
                    popper,
                    value: '',
                    force_error: '',
                    errorCss: errorCss && errorCss.value,
                    validate() {
                        const error = this.force_error || binding.value(el, binding, vnode)
                        if (error) {
                            tooltip.text.innerHTML = error
                            tooltip.setAttribute('data-show', true)
                            if (this.errorCss) {
                                el.classList.add(this.errorCss)
                            }
                            popper.update()
                        } else {
                            tooltip.removeAttribute('data-show')
                            if (this.errorCss) {
                                el.classList.remove(this.errorCss)
                            }
                            tooltip.text.innerHTML = ''
                        }
                        this.value = el.value
                        return error
                    }
                }

                Object.defineProperties(el, {
                    validate: {
                        value: rule.validate
                    },
                    error: {
                        value(error = '') {
                            rule.force_error = error
                            rule.validate()
                        }
                    }
                })

                rules.push(rule)
            }, 100)
        })
    }
}

export const update = function (el, binding) {
    const rule = binding.value.getRule(el.vid)
    if (rule && rule.value != el.value) {
        rule.validate()
    }
}

export const unbind = function (el, binding) {
    binding.value.removeRule(el.vid)
}
