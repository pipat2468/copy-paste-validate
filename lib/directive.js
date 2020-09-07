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
                el.vid = __GEN_VID__(binding)
                const rules = binding.value.getRules()

                const tooltip = document.createElement('div')
                tooltip.classList.add('copy-paste--validate')
                const arrow = document.createElement('div')

                arrow.classList.add('data-popper-arrow')
                tooltip.appendChild(arrow)

                const text = document.createElement('span')
                tooltip.appendChild(text)
                tooltip.text = text
                vnode.elm.parentElement.appendChild(tooltip)

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

                const rule = {
                    vid: el.vid,
                    popper,
                    value: '',
                    validate() {
                        const error = binding.value(el, binding, vnode)
                        if (error) {
                            tooltip.text.innerHTML = error
                            tooltip.setAttribute('data-show', true)
                            popper.update()
                        } else {
                            tooltip.removeAttribute('data-show')
                            tooltip.text.innerHTML = ''
                        }
                        this.value = el.value
                        return error
                    }
                }

                Object.defineProperty(el, 'validate', {
                    value: rule.validate
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
    binding.value.remove(el.vid)
}
