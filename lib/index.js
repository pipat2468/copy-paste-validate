import rules from './rules.js'
import { bind, update } from './directive.js'
import '../css/validate.css'

export default (Vue) => {
    Vue.prototype.$create_rules = rules

    Vue.directive('rule', {
        bind,
        update
    })
}
