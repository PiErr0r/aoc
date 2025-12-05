
/**
 * Class extending built-in Map to support object as keys 
 * @extends Map
 */
class GMap extends Map {
	/**
	 * Initialize GMap
	 * @param {undefined|Iterable} value - value to initialize Map with
	 */
	/**
	 * Private object containing additional props
	 * @access private
	 */
	#props;  
	constructor(value) {
		super(value);
		this.#props = {};
	}

	delete(k) {
		super.delete( GMap.unparse(k) );
	}

	get(k) {
		return super.get( GMap.unparse(k) );
	}

	has(k) {
		return super.has( GMap.unparse(k) );
	}

	set(k, v) {
		super.set( GMap.unparse(k), v );
	}

	keys() {
		return super.keys().map(k => GMap.parse(k));
	}

	setProp(k, v) {
		this.#props[k] = v;
	}

	getProp(k) {
		return this.#props[k];
	}

	setProps(props) {
		Object.keys(props).forEach(k => {
			this.#props[k] = props[k];
		})
	}

	getProps() {
		return this.#props;
	}

	/**
	 * parse string (key) to initial objet
	 * @param {string} v - string representing object
	 * @return {object} initial object used as key for GMap
	 */
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

  /**
   * unparse object used as key to string used as key in GMap
   * @param {object} v - Array or primitive used as key
   * @return {string|primitive} Value used as key in GMap
   */
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
    for (const k of this.keys()) {
      yield [GMap.parse(k), this.get(k)];
    }
    return null;
  }
}

module.exports = {
	GMap
}