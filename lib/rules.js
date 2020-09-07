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
        ins[k].getRules = () => {
            return rules
        }
        ins[k].getRule = (vid) => {
            return rules.find((r) => r.vid == vid)
        }
    })

    return ins
}
