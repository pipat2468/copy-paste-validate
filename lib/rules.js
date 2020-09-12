export default (objects) => {
    if ('validate' in objects) {
        throw 'rules ไม่สามารถตั้ง property ชื่อ validate ได้'
        return {}
    }
    const rules = []
    const ins = {}

    Object.defineProperty(ins, 'validate', {
        value() {
            const errors = []
            rules.forEach((rule) => {
                const error = rule.validate()
                if (error) {
                    errors.push(error)
                }
            })
            return errors
        }
    })

    for (const k in objects) {
        Object.defineProperty(ins, k, {
            value: objects[k],
            writable: true
        })
    }

    Object.keys(objects).forEach((k) => {
        ins[k].opts = []
        ins[k].options = function (options = {}) {
            this.opt = options
            this.opts.push(options)
            return this
        }
        ins[k].getRules = function () {
            return rules
        }
        ins[k].getRule = function (vid) {
            return rules.find((r) => r.vid == vid)
        }
        ins[k].remove = function (vid) {
            return rules.splice(rules.indexOf(this.getRule(vid)), 1)
        }
    })

    return ins
}
