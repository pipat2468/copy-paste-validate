import { createPopper } from '@popperjs/core'
import icon from '@copy-paste/validate/icons/exclamation-circle-solid.svg'
import iconInline from '@copy-paste/validate/icons/exclamation-circle-solid-inline.svg'

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

export const bind = function (el, binding, vnode, vnode1, what, defaultOptions) {
    if (!el.vid) {
        vnode.context.$nextTick(() => {
            setTimeout(() => {
                let key = binding.expression.match(/key:(.*)/)
                if (key) {
                    key = key[1].split(',')[0].replace(/ |'|"|\}|\)/g, '')
                }
                if (binding.value.getRule(key)) {
                    throw `v-rule duplicate key: ${key}`
                }
                const vid = key || __GEN_VID__(binding)
                Object.defineProperty(el, 'vid', {
                    value: vid
                })
                const rules = binding.value.getRules()

                const opt = binding.value.opts.find((opt) => opt.key == vid)

                const options = {
                    css: '',
                    ref: null,
                    ...(opt || binding.value.opt || {})
                }

                delete binding.value.opt
                binding.value.opts.splice(binding.value.opts.indexOf(opt), 1)

                const ref = options.ref && vnode.context.$refs[options.ref]

                const rule = {
                    vid,
                    value: '',
                    force_error: '',
                    validate() {
                        const error =
                            this.force_error || binding.value({ el, binding, vnode, options })
                        if (error) {
                            if (ref) {
                                ref.show(error)
                            } else {
                                this.tooltip.text.innerHTML = error
                                this.tooltip.setAttribute('data-show', true)
                                if (this.popper) this.popper.update()
                            }
                            if (options.css) {
                                el.classList.add(options.css)
                            }
                        } else {
                            this.clear()
                        }
                        this.value = el.value
                        return error
                    },
                    clear() {
                        if (ref) {
                            ref.hide()
                        } else {
                            this.tooltip.removeAttribute('data-show')
                            this.tooltip.text.innerHTML = ''
                        }
                        if (options.css) {
                            el.classList.remove(options.css)
                        }
                    }
                }

                if (!ref) {
                    const tooltip = document.createElement('div')

                    const image = new Image()
                    image.classList.add('icon-error-rule')
                    tooltip.appendChild(image)

                    const text = document.createElement('span')
                    tooltip.appendChild(text)
                    tooltip.text = text

                    if (defaultOptions.inline) {
                        image.src = iconInline
                        tooltip.classList.add('copy-paste--validate-inline')
                        el.parentElement.appendChild(tooltip)
                        rule.tooltip = tooltip
                    } else {
                        image.src = icon
                        tooltip.classList.add('copy-paste--validate')
                        const arrow = document.createElement('div')

                        arrow.classList.add('data-popper-arrow')
                        tooltip.appendChild(arrow)

                        el.parentElement.appendChild(tooltip)
                        rule.tooltip = tooltip

                        rule.popper = createPopper(el, tooltip, {
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
                                        offset: [0.5, 1]
                                    }
                                }
                            ]
                        })
                    }
                }

                Object.defineProperties(el, {
                    validate: {
                        value() {
                            rule.validate()
                        }
                    },
                    error: {
                        value(error = '') {
                            rule.force_error = error
                            rule.validate()
                        }
                    },
                    clear: {
                        value() {
                            rule.clear()
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
