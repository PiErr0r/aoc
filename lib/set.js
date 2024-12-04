class set extends Set {

  constructor(value) {
    if (typeof value === 'string') {
      super(value);
    } else if (Array.isArray(value)) {
      super(value.map( v => set.unparse(v) ));
    } else if (value instanceof set) {
      super(value.values().map( v => set.unparse(v) ));
    } else if (value === undefined || value === null) {
      super();
    } else {
      super([value])
    }
  }

  add(v) {
    super.add( set.unparse(v) );
  }

  has(v) {
    return super.has( set.unparse(v) );
  }

  delete(v) {
    return super.delete( set.unparse(v) );
  }

  items() {
    return [...this];
  }

  copy() {
    return new set([...this]);
  }

  static disjoint(setA, setB) {
    return setA.isDisjointFrom(setB);
  }

  static isSubset(subset, set) {
    return subset.isSubsetOf(set);
  }

  static isSuperset(set, subset) {
    return set.isSupersetOf(subset);
  }

  static DEPRECATED_isSuperset(set, subset) {
    for (let elem of subset) {
      if (!set.has(elem)) {
        return false
      }
    }
    return true
  }

  static or(setA, setB) {
    return setA.union(setB);
  }

  // A = {1, 2}, B = {2, 3}
  // A | B = {1, 2, 3}
  static DEPRECATED_or(setA, setB) {
    let _union = new set(setA)
    for (let elem of new set(setB)) {
      _union.add(elem)
    }
    return _union
  }

  static and(setA, setB) {
    return setA.intersection(setB);
  }

  // A = {1, 2}, B = {2, 3}
  // A & B = {2}
  static DEPRECATED_and(setA, setB) {
    setA = new set(setA);
    let _intersection = new set()
    for (let elem of new set(setB)) {
      if (setA.has(elem)) {
        _intersection.add(elem)
      }
    }
    return _intersection
  }

  static xor(setA, setB) {
    return setA.symmetricDifference(setB);
  }

  // A = {2, 3}, B = {1, 2}
  // A ^ B = { 1, 3 }
  static DEPRECATED_xor(setA, setB) {
    let _difference = new set(setA)
    for (let elem of new set(setB)) {
      if (_difference.has(elem)) {
        _difference.delete(elem)
      } else {
        _difference.add(elem)
      }
    }
    return _difference
  }

  static sub(setA, setB) {
    return setA.difference(setB);
  }

  // A = {1, 2, 3}, B = {2, 3}
  // A - B = { 1 }
  static DEPRECATED_sub(setA, setB) {
    let _difference = new set(setA)
    for (let elem of new set(setB)) {
      _difference.delete(elem)
    }
    return _difference
  }

  static parse(v) {
    if (typeof v === 'string' && v.startsWith('[] ')) {
      return v.slice(3).split(',').map(el => 
        el.startsWith('#') && el.length > 1 ? 
          Number(el.slice(1))
        : el.startsWith('$') ? 
          el.slice(1)
        : el
      );
    } else {
      return v;
    }
  }

  static unparse(v) {
    if (Array.isArray(v)) {
      return ('[] ' + v.map(el => (
        typeof el === 'number' ? 
          '#' + el
        : typeof el === 'string' ? 
          '$' + el
        : el.toString()
      )).toString());
    } else {
      return v;
    }
  }

  *[Symbol.iterator]() {
    for (const el of this.values()) {
      yield set.parse(el);
    }
    return null;
  }
}

module.exports.set = set;