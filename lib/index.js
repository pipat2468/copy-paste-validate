import rules from '@copy-paste/validate/lib/rules.js'
import rule from '@copy-paste/validate/lib/rule.js'
import { bind, update, unbind } from '@copy-paste/validate/lib/directive.js'
import '@copy-paste/validate/css/validate.css'

export default (Vue, options = { inline: false }) => {
    Vue.prototype.$rules = rules

    Vue.component('vRule', rule)

    Vue.directive('rule', {
        bind(...params) {
            return bind(...params, options)
        },
        update,
        unbind
    })
}
