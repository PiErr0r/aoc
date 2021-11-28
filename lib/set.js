class set extends Set {

  add(arr) {
    super.add(arr.toString());
  }

  has(arr) {
    return super.has(arr.toString());
  }

  static isSuperset(set, subset) {
    for (let elem of subset) {
      if (!set.has(elem)) {
        return false
      }
    }
    return true
  }

  // A = {1, 2}, B = {2, 3}
  // A | B = {1, 2, 3}
  static or(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
      _union.add(elem)
    }
    return _union
  }

  // A = {1, 2}, B = {2, 3}
  // A & B = {2}
  static and(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
      if (setA.has(elem)) {
        _intersection.add(elem)
      }
    }
    return _intersection
  }

  // A = {2, 3}, B = {1, 2}
  // A ^ B = { 1, 3 }
  static xor(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
      if (_difference.has(elem)) {
        _difference.delete(elem)
      } else {
        _difference.add(elem)
      }
    }
    return _difference
  }

  // A = {1, 2, 3}, B = {2, 3}
  // A - B = { 1 }
  static sub(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
      _difference.delete(elem)
    }
    return _difference
  }
}

module.exports.set = set;