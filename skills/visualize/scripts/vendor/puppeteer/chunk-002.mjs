// Generated readable vendor code. See ../manifest.json and ../LICENSES.txt.
import { b as requireConstants, c as requireRe, d as requireIdentifiers, g as getDefaultExportFromCjs, o as once, f as commonjsGlobal } from './chunk-000.mjs';
import { r as requireParse, a as requireCompareBuild, b as requireSemver$1, c as requireRange, d as requireGt, e as requireComparator, f as requireLt, g as requireLte, h as requireGte, i as requireCompare, j as requireClean, k as requireInc, l as requireDiff, m as requireMajor, n as requireMinor, o as requirePatch, p as requirePrerelease, q as requireRcompare, s as requireCompareLoose, t as requireRsort, u as requireEq, v as requireNeq, w as requireCmp, x as requireCoerce } from './chunk-001.mjs';
import require$$0 from 'events';
import 'fs';
import 'path';

var valid_1;
var hasRequiredValid$1;

function requireValid$1 () {
	if (hasRequiredValid$1) return valid_1;
	hasRequiredValid$1 = 1;

	const parse = requireParse();
	const valid = (version, options) => {
	  const v = parse(version, options);
	  return v ? v.version : null
	};
	valid_1 = valid;
	return valid_1;
}

var sort_1;
var hasRequiredSort;

function requireSort () {
	if (hasRequiredSort) return sort_1;
	hasRequiredSort = 1;

	const compareBuild = requireCompareBuild();
	const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
	sort_1 = sort;
	return sort_1;
}

var truncate_1;
var hasRequiredTruncate;

function requireTruncate () {
	if (hasRequiredTruncate) return truncate_1;
	hasRequiredTruncate = 1;

	const parse = requireParse();
	const constants = requireConstants();
	const SemVer = requireSemver$1();

	const truncate = (version, truncation, options) => {
	  if (!constants.RELEASE_TYPES.includes(truncation)) {
	    return null
	  }

	  const clonedVersion = cloneInputVersion(version, options);
	  return clonedVersion && doTruncation(clonedVersion, truncation)
	};

	const cloneInputVersion = (version, options) => {
	  const versionStringToParse = (
	    version instanceof SemVer ? version.version : version
	  );

	  return parse(versionStringToParse, options)
	};

	const doTruncation = (version, truncation) => {
	  if (isPrerelease(truncation)) {
	    return version.version
	  }

	  version.prerelease = [];

	  switch (truncation) {
	    case 'major':
	      version.minor = 0;
	      version.patch = 0;
	      break
	    case 'minor':
	      version.patch = 0;
	      break
	  }

	  return version.format()
	};

	const isPrerelease = (type) => {
	  return type.startsWith('pre')
	};

	truncate_1 = truncate;
	return truncate_1;
}

var satisfies_1;
var hasRequiredSatisfies;

function requireSatisfies () {
	if (hasRequiredSatisfies) return satisfies_1;
	hasRequiredSatisfies = 1;

	const Range = requireRange();
	const satisfies = (version, range, options) => {
	  try {
	    range = new Range(range, options);
	  } catch (er) {
	    return false
	  }
	  return range.test(version)
	};
	satisfies_1 = satisfies;
	return satisfies_1;
}

var toComparators_1;
var hasRequiredToComparators;

function requireToComparators () {
	if (hasRequiredToComparators) return toComparators_1;
	hasRequiredToComparators = 1;

	const Range = requireRange();

	// Mostly just for testing and legacy API reasons
	const toComparators = (range, options) =>
	  new Range(range, options).set
	    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '));

	toComparators_1 = toComparators;
	return toComparators_1;
}

var maxSatisfying_1;
var hasRequiredMaxSatisfying;

function requireMaxSatisfying () {
	if (hasRequiredMaxSatisfying) return maxSatisfying_1;
	hasRequiredMaxSatisfying = 1;

	const SemVer = requireSemver$1();
	const Range = requireRange();

	const maxSatisfying = (versions, range, options) => {
	  let max = null;
	  let maxSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      // satisfies(v, range, options)
	      if (!max || maxSV.compare(v) === -1) {
	        // compare(max, v, true)
	        max = v;
	        maxSV = new SemVer(max, options);
	      }
	    }
	  });
	  return max
	};
	maxSatisfying_1 = maxSatisfying;
	return maxSatisfying_1;
}

var minSatisfying_1;
var hasRequiredMinSatisfying;

function requireMinSatisfying () {
	if (hasRequiredMinSatisfying) return minSatisfying_1;
	hasRequiredMinSatisfying = 1;

	const SemVer = requireSemver$1();
	const Range = requireRange();
	const minSatisfying = (versions, range, options) => {
	  let min = null;
	  let minSV = null;
	  let rangeObj = null;
	  try {
	    rangeObj = new Range(range, options);
	  } catch (er) {
	    return null
	  }
	  versions.forEach((v) => {
	    if (rangeObj.test(v)) {
	      // satisfies(v, range, options)
	      if (!min || minSV.compare(v) === 1) {
	        // compare(min, v, true)
	        min = v;
	        minSV = new SemVer(min, options);
	      }
	    }
	  });
	  return min
	};
	minSatisfying_1 = minSatisfying;
	return minSatisfying_1;
}

var minVersion_1;
var hasRequiredMinVersion;

function requireMinVersion () {
	if (hasRequiredMinVersion) return minVersion_1;
	hasRequiredMinVersion = 1;

	const SemVer = requireSemver$1();
	const Range = requireRange();
	const gt = requireGt();

	const minVersion = (range, loose) => {
	  range = new Range(range, loose);

	  let minver = new SemVer('0.0.0');
	  if (range.test(minver)) {
	    return minver
	  }

	  minver = new SemVer('0.0.0-0');
	  if (range.test(minver)) {
	    return minver
	  }

	  minver = null;
	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];

	    let setMin = null;
	    comparators.forEach((comparator) => {
	      // Clone to avoid manipulating the comparator's semver object.
	      const compver = new SemVer(comparator.semver.version);
	      switch (comparator.operator) {
	        case '>':
	          if (compver.prerelease.length === 0) {
	            compver.patch++;
	          } else {
	            compver.prerelease.push(0);
	          }
	          compver.raw = compver.format();
	          /* fallthrough */
	        case '':
	        case '>=':
	          if (!setMin || gt(compver, setMin)) {
	            setMin = compver;
	          }
	          break
	        case '<':
	        case '<=':
	          /* Ignore maximum versions */
	          break
	        /* istanbul ignore next */
	        default:
	          throw new Error(`Unexpected operation: ${comparator.operator}`)
	      }
	    });
	    if (setMin && (!minver || gt(minver, setMin))) {
	      minver = setMin;
	    }
	  }

	  if (minver && range.test(minver)) {
	    return minver
	  }

	  return null
	};
	minVersion_1 = minVersion;
	return minVersion_1;
}

var valid;
var hasRequiredValid;

function requireValid () {
	if (hasRequiredValid) return valid;
	hasRequiredValid = 1;

	const Range = requireRange();
	const validRange = (range, options) => {
	  try {
	    // Return '*' instead of '' so that truthiness works.
	    // This will throw if it's invalid anyway
	    return new Range(range, options).range || '*'
	  } catch (er) {
	    return null
	  }
	};
	valid = validRange;
	return valid;
}

var outside_1;
var hasRequiredOutside;

function requireOutside () {
	if (hasRequiredOutside) return outside_1;
	hasRequiredOutside = 1;

	const SemVer = requireSemver$1();
	const Comparator = requireComparator();
	const { ANY } = Comparator;
	const Range = requireRange();
	const satisfies = requireSatisfies();
	const gt = requireGt();
	const lt = requireLt();
	const lte = requireLte();
	const gte = requireGte();

	const outside = (version, range, hilo, options) => {
	  version = new SemVer(version, options);
	  range = new Range(range, options);

	  let gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
	    case '>':
	      gtfn = gt;
	      ltefn = lte;
	      ltfn = lt;
	      comp = '>';
	      ecomp = '>=';
	      break
	    case '<':
	      gtfn = lt;
	      ltefn = gte;
	      ltfn = gt;
	      comp = '<';
	      ecomp = '<=';
	      break
	    default:
	      throw new TypeError('Must provide a hilo val of "<" or ">"')
	  }

	  // If it satisfies the range it is not outside
	  if (satisfies(version, range, options)) {
	    return false
	  }

	  // From now on, variable terms are as if we're in "gtr" mode.
	  // but note that everything is flipped for the "ltr" function.

	  for (let i = 0; i < range.set.length; ++i) {
	    const comparators = range.set[i];

	    let high = null;
	    let low = null;

	    comparators.forEach((comparator) => {
	      if (comparator.semver === ANY) {
	        comparator = new Comparator('>=0.0.0');
	      }
	      high = high || comparator;
	      low = low || comparator;
	      if (gtfn(comparator.semver, high.semver, options)) {
	        high = comparator;
	      } else if (ltfn(comparator.semver, low.semver, options)) {
	        low = comparator;
	      }
	    });

	    // If the edge version comparator has a operator then our version
	    // isn't outside it
	    if (high.operator === comp || high.operator === ecomp) {
	      return false
	    }

	    // If the lowest version comparator has an operator and our version
	    // is less than it then it isn't higher than the range
	    if ((!low.operator || low.operator === comp) &&
	        ltefn(version, low.semver)) {
	      return false
	    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
	      return false
	    }
	  }
	  return true
	};

	outside_1 = outside;
	return outside_1;
}

var gtr_1;
var hasRequiredGtr;

function requireGtr () {
	if (hasRequiredGtr) return gtr_1;
	hasRequiredGtr = 1;

	// Determine if version is greater than all the versions possible in the range.
	const outside = requireOutside();
	const gtr = (version, range, options) => outside(version, range, '>', options);
	gtr_1 = gtr;
	return gtr_1;
}

var ltr_1;
var hasRequiredLtr;

function requireLtr () {
	if (hasRequiredLtr) return ltr_1;
	hasRequiredLtr = 1;

	const outside = requireOutside();
	// Determine if version is less than all the versions possible in the range
	const ltr = (version, range, options) => outside(version, range, '<', options);
	ltr_1 = ltr;
	return ltr_1;
}

var intersects_1;
var hasRequiredIntersects;

function requireIntersects () {
	if (hasRequiredIntersects) return intersects_1;
	hasRequiredIntersects = 1;

	const Range = requireRange();
	const intersects = (r1, r2, options) => {
	  r1 = new Range(r1, options);
	  r2 = new Range(r2, options);
	  return r1.intersects(r2, options)
	};
	intersects_1 = intersects;
	return intersects_1;
}

var simplify;
var hasRequiredSimplify;

function requireSimplify () {
	if (hasRequiredSimplify) return simplify;
	hasRequiredSimplify = 1;

	// given a set of versions and a range, create a "simplified" range
	// that includes the same versions that the original range does
	// If the original range is shorter than the simplified one, return that.
	const satisfies = requireSatisfies();
	const compare = requireCompare();
	simplify = (versions, range, options) => {
	  const set = [];
	  let first = null;
	  let prev = null;
	  const v = versions.sort((a, b) => compare(a, b, options));
	  for (const version of v) {
	    const included = satisfies(version, range, options);
	    if (included) {
	      prev = version;
	      if (!first) {
	        first = version;
	      }
	    } else {
	      if (prev) {
	        set.push([first, prev]);
	      }
	      prev = null;
	      first = null;
	    }
	  }
	  if (first) {
	    set.push([first, null]);
	  }

	  const ranges = [];
	  for (const [min, max] of set) {
	    if (min === max) {
	      ranges.push(min);
	    } else if (!max && min === v[0]) {
	      ranges.push('*');
	    } else if (!max) {
	      ranges.push(`>=${min}`);
	    } else if (min === v[0]) {
	      ranges.push(`<=${max}`);
	    } else {
	      ranges.push(`${min} - ${max}`);
	    }
	  }
	  const simplified = ranges.join(' || ');
	  const original = typeof range.raw === 'string' ? range.raw : String(range);
	  return simplified.length < original.length ? simplified : range
	};
	return simplify;
}

var subset_1;
var hasRequiredSubset;

function requireSubset () {
	if (hasRequiredSubset) return subset_1;
	hasRequiredSubset = 1;

	const Range = requireRange();
	const Comparator = requireComparator();
	const { ANY } = Comparator;
	const satisfies = requireSatisfies();
	const compare = requireCompare();

	// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
	// - Every simple range `r1, r2, ...` is a null set, OR
	// - Every simple range `r1, r2, ...` which is not a null set is a subset of
	//   some `R1, R2, ...`
	//
	// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
	// - If c is only the ANY comparator
	//   - If C is only the ANY comparator, return true
	//   - Else if in prerelease mode, return false
	//   - else replace c with `[>=0.0.0]`
	// - If C is only the ANY comparator
	//   - if in prerelease mode, return true
	//   - else replace C with `[>=0.0.0]`
	// - Let EQ be the set of = comparators in c
	// - If EQ is more than one, return true (null set)
	// - Let GT be the highest > or >= comparator in c
	// - Let LT be the lowest < or <= comparator in c
	// - If GT and LT, and GT.semver > LT.semver, return true (null set)
	// - If any C is a = range, and GT or LT are set, return false
	// - If EQ
	//   - If GT, and EQ does not satisfy GT, return true (null set)
	//   - If LT, and EQ does not satisfy LT, return true (null set)
	//   - If EQ satisfies every C, return true
	//   - Else return false
	// - If GT
	//   - If GT.semver is lower than any > or >= comp in C, return false
	//   - If GT is >=, and GT.semver does not satisfy every C, return false
	//   - If GT.semver has a prerelease, and not in prerelease mode
	//     - If no C has a prerelease and the GT.semver tuple, return false
	// - If LT
	//   - If LT.semver is greater than any < or <= comp in C, return false
	//   - If LT is <=, and LT.semver does not satisfy every C, return false
	//   - If LT.semver has a prerelease, and not in prerelease mode
	//     - If no C has a prerelease and the LT.semver tuple, return false
	// - Else return true

	const subset = (sub, dom, options = {}) => {
	  if (sub === dom) {
	    return true
	  }

	  sub = new Range(sub, options);
	  dom = new Range(dom, options);
	  let sawNonNull = false;

	  OUTER: for (const simpleSub of sub.set) {
	    for (const simpleDom of dom.set) {
	      const isSub = simpleSubset(simpleSub, simpleDom, options);
	      sawNonNull = sawNonNull || isSub !== null;
	      if (isSub) {
	        continue OUTER
	      }
	    }
	    // the null set is a subset of everything, but null simple ranges in
	    // a complex range should be ignored.  so if we saw a non-null range,
	    // then we know this isn't a subset, but if EVERY simple range was null,
	    // then it is a subset.
	    if (sawNonNull) {
	      return false
	    }
	  }
	  return true
	};

	const minimumVersionWithPreRelease = [new Comparator('>=0.0.0-0')];
	const minimumVersion = [new Comparator('>=0.0.0')];

	const simpleSubset = (sub, dom, options) => {
	  if (sub === dom) {
	    return true
	  }

	  if (sub.length === 1 && sub[0].semver === ANY) {
	    if (dom.length === 1 && dom[0].semver === ANY) {
	      return true
	    } else if (options.includePrerelease) {
	      sub = minimumVersionWithPreRelease;
	    } else {
	      sub = minimumVersion;
	    }
	  }

	  if (dom.length === 1 && dom[0].semver === ANY) {
	    if (options.includePrerelease) {
	      return true
	    } else {
	      dom = minimumVersion;
	    }
	  }

	  const eqSet = new Set();
	  let gt, lt;
	  for (const c of sub) {
	    if (c.operator === '>' || c.operator === '>=') {
	      gt = higherGT(gt, c, options);
	    } else if (c.operator === '<' || c.operator === '<=') {
	      lt = lowerLT(lt, c, options);
	    } else {
	      eqSet.add(c.semver);
	    }
	  }

	  if (eqSet.size > 1) {
	    return null
	  }

	  let gtltComp;
	  if (gt && lt) {
	    gtltComp = compare(gt.semver, lt.semver, options);
	    if (gtltComp > 0) {
	      return null
	    } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
	      return null
	    }
	  }

	  // will iterate one or zero times
	  for (const eq of eqSet) {
	    if (gt && !satisfies(eq, String(gt), options)) {
	      return null
	    }

	    if (lt && !satisfies(eq, String(lt), options)) {
	      return null
	    }

	    for (const c of dom) {
	      if (!satisfies(eq, String(c), options)) {
	        return false
	      }
	    }

	    return true
	  }

	  let higher, lower;
	  let hasDomLT, hasDomGT;
	  // if the subset has a prerelease, we need a comparator in the superset
	  // with the same tuple and a prerelease, or it's not a subset
	  let needDomLTPre = lt &&
	    !options.includePrerelease &&
	    lt.semver.prerelease.length ? lt.semver : false;
	  let needDomGTPre = gt &&
	    !options.includePrerelease &&
	    gt.semver.prerelease.length ? gt.semver : false;
	  // exception: <1.2.3-0 is the same as <1.2.3
	  if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
	      lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
	    needDomLTPre = false;
	  }

	  for (const c of dom) {
	    hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
	    hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';
	    if (gt) {
	      if (needDomGTPre) {
	        if (c.semver.prerelease && c.semver.prerelease.length &&
	            c.semver.major === needDomGTPre.major &&
	            c.semver.minor === needDomGTPre.minor &&
	            c.semver.patch === needDomGTPre.patch) {
	          needDomGTPre = false;
	        }
	      }
	      if (c.operator === '>' || c.operator === '>=') {
	        higher = higherGT(gt, c, options);
	        if (higher === c && higher !== gt) {
	          return false
	        }
	      } else if (gt.operator === '>=' && !c.test(gt.semver)) {
	        return false
	      }
	    }
	    if (lt) {
	      if (needDomLTPre) {
	        if (c.semver.prerelease && c.semver.prerelease.length &&
	            c.semver.major === needDomLTPre.major &&
	            c.semver.minor === needDomLTPre.minor &&
	            c.semver.patch === needDomLTPre.patch) {
	          needDomLTPre = false;
	        }
	      }
	      if (c.operator === '<' || c.operator === '<=') {
	        lower = lowerLT(lt, c, options);
	        if (lower === c && lower !== lt) {
	          return false
	        }
	      } else if (lt.operator === '<=' && !c.test(lt.semver)) {
	        return false
	      }
	    }
	    if (!c.operator && (lt || gt) && gtltComp !== 0) {
	      return false
	    }
	  }

	  // if there was a < or >, and nothing in the dom, then must be false
	  // UNLESS it was limited by another range in the other direction.
	  // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
	  if (gt && hasDomLT && !lt && gtltComp !== 0) {
	    return false
	  }

	  if (lt && hasDomGT && !gt && gtltComp !== 0) {
	    return false
	  }

	  // we needed a prerelease range in a specific tuple, but didn't get one
	  // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
	  // because it includes prereleases in the 1.2.3 tuple
	  if (needDomGTPre || needDomLTPre) {
	    return false
	  }

	  return true
	};

	// >=1.2.3 is lower than >1.2.3
	const higherGT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare(a.semver, b.semver, options);
	  return comp > 0 ? a
	    : comp < 0 ? b
	    : b.operator === '>' && a.operator === '>=' ? b
	    : a
	};

	// <=1.2.3 is higher than <1.2.3
	const lowerLT = (a, b, options) => {
	  if (!a) {
	    return b
	  }
	  const comp = compare(a.semver, b.semver, options);
	  return comp < 0 ? a
	    : comp > 0 ? b
	    : b.operator === '<' && a.operator === '<=' ? b
	    : a
	};

	subset_1 = subset;
	return subset_1;
}

var semver$1;
var hasRequiredSemver;

function requireSemver () {
	if (hasRequiredSemver) return semver$1;
	hasRequiredSemver = 1;

	// just pre-load all the stuff that index.js lazily exports
	const internalRe = requireRe();
	const constants = requireConstants();
	const SemVer = requireSemver$1();
	const identifiers = requireIdentifiers();
	const parse = requireParse();
	const valid = requireValid$1();
	const clean = requireClean();
	const inc = requireInc();
	const diff = requireDiff();
	const major = requireMajor();
	const minor = requireMinor();
	const patch = requirePatch();
	const prerelease = requirePrerelease();
	const compare = requireCompare();
	const rcompare = requireRcompare();
	const compareLoose = requireCompareLoose();
	const compareBuild = requireCompareBuild();
	const sort = requireSort();
	const rsort = requireRsort();
	const gt = requireGt();
	const lt = requireLt();
	const eq = requireEq();
	const neq = requireNeq();
	const gte = requireGte();
	const lte = requireLte();
	const cmp = requireCmp();
	const coerce = requireCoerce();
	const truncate = requireTruncate();
	const Comparator = requireComparator();
	const Range = requireRange();
	const satisfies = requireSatisfies();
	const toComparators = requireToComparators();
	const maxSatisfying = requireMaxSatisfying();
	const minSatisfying = requireMinSatisfying();
	const minVersion = requireMinVersion();
	const validRange = requireValid();
	const outside = requireOutside();
	const gtr = requireGtr();
	const ltr = requireLtr();
	const intersects = requireIntersects();
	const simplifyRange = requireSimplify();
	const subset = requireSubset();
	semver$1 = {
	  parse,
	  valid,
	  clean,
	  inc,
	  diff,
	  major,
	  minor,
	  patch,
	  prerelease,
	  compare,
	  rcompare,
	  compareLoose,
	  compareBuild,
	  sort,
	  rsort,
	  gt,
	  lt,
	  eq,
	  neq,
	  gte,
	  lte,
	  cmp,
	  coerce,
	  truncate,
	  Comparator,
	  Range,
	  satisfies,
	  toComparators,
	  maxSatisfying,
	  minSatisfying,
	  minVersion,
	  validRange,
	  outside,
	  gtr,
	  ltr,
	  intersects,
	  simplifyRange,
	  subset,
	  SemVer,
	  re: internalRe.re,
	  src: internalRe.src,
	  tokens: internalRe.t,
	  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
	  RELEASE_TYPES: constants.RELEASE_TYPES,
	  compareIdentifiers: identifiers.compareIdentifiers,
	  rcompareIdentifiers: identifiers.rcompareIdentifiers,
	};
	return semver$1;
}

var semverExports = requireSemver();
const semver = /*@__PURE__*/getDefaultExportFromCjs(semverExports);

var tarFs = {};

var tarStream = {};

var _default;
var hasRequired_default;

function require_default () {
	if (hasRequired_default) return _default;
	hasRequired_default = 1;
	_default = require$$0;
	return _default;
}

var fixedSize;
var hasRequiredFixedSize;

function requireFixedSize () {
	if (hasRequiredFixedSize) return fixedSize;
	hasRequiredFixedSize = 1;
	fixedSize = class FixedFIFO {
	  constructor (hwm) {
	    if (!(hwm > 0) || ((hwm - 1) & hwm) !== 0) throw new Error('Max size for a FixedFIFO should be a power of two')
	    this.buffer = new Array(hwm);
	    this.mask = hwm - 1;
	    this.top = 0;
	    this.btm = 0;
	    this.next = null;
	  }

	  clear () {
	    this.top = this.btm = 0;
	    this.next = null;
	    this.buffer.fill(undefined);
	  }

	  push (data) {
	    if (this.buffer[this.top] !== undefined) return false
	    this.buffer[this.top] = data;
	    this.top = (this.top + 1) & this.mask;
	    return true
	  }

	  shift () {
	    const last = this.buffer[this.btm];
	    if (last === undefined) return undefined
	    this.buffer[this.btm] = undefined;
	    this.btm = (this.btm + 1) & this.mask;
	    return last
	  }

	  peek () {
	    return this.buffer[this.btm]
	  }

	  isEmpty () {
	    return this.buffer[this.btm] === undefined
	  }
	};
	return fixedSize;
}

var fastFifo;
var hasRequiredFastFifo;

function requireFastFifo () {
	if (hasRequiredFastFifo) return fastFifo;
	hasRequiredFastFifo = 1;
	const FixedFIFO = requireFixedSize();

	fastFifo = class FastFIFO {
	  constructor (hwm) {
	    this.hwm = hwm || 16;
	    this.head = new FixedFIFO(this.hwm);
	    this.tail = this.head;
	    this.length = 0;
	  }

	  clear () {
	    this.head = this.tail;
	    this.head.clear();
	    this.length = 0;
	  }

	  push (val) {
	    this.length++;
	    if (!this.head.push(val)) {
	      const prev = this.head;
	      this.head = prev.next = new FixedFIFO(2 * this.head.buffer.length);
	      this.head.push(val);
	    }
	  }

	  shift () {
	    if (this.length !== 0) this.length--;
	    const val = this.tail.shift();
	    if (val === undefined && this.tail.next) {
	      const next = this.tail.next;
	      this.tail.next = null;
	      this.tail = next;
	      return this.tail.shift()
	    }

	    return val
	  }

	  peek () {
	    const val = this.tail.peek();
	    if (val === undefined && this.tail.next) return this.tail.next.peek()
	    return val
	  }

	  isEmpty () {
	    return this.length === 0
	  }
	};
	return fastFifo;
}

var b4a;
var hasRequiredB4a;

function requireB4a () {
	if (hasRequiredB4a) return b4a;
	hasRequiredB4a = 1;
	function isBuffer(value) {
	  return Buffer.isBuffer(value) || value instanceof Uint8Array
	}

	function isEncoding(encoding) {
	  return Buffer.isEncoding(encoding)
	}

	function alloc(size, fill, encoding) {
	  return Buffer.alloc(size, fill, encoding)
	}

	function allocUnsafe(size) {
	  return Buffer.allocUnsafe(size)
	}

	function allocUnsafeSlow(size) {
	  return Buffer.allocUnsafeSlow(size)
	}

	function byteLength(string, encoding) {
	  return Buffer.byteLength(string, encoding)
	}

	function compare(a, b) {
	  return Buffer.compare(a, b)
	}

	function concat(buffers, totalLength) {
	  return Buffer.concat(buffers, totalLength)
	}

	function copy(source, target, targetStart, start, end) {
	  return toBuffer(source).copy(target, targetStart, start, end)
	}

	function equals(a, b) {
	  return toBuffer(a).equals(b)
	}

	function fill(buffer, value, offset, end, encoding) {
	  return toBuffer(buffer).fill(value, offset, end, encoding)
	}

	function from(value, encodingOrOffset, length) {
	  return Buffer.from(value, encodingOrOffset, length)
	}

	function includes(buffer, value, byteOffset, encoding) {
	  return toBuffer(buffer).includes(value, byteOffset, encoding)
	}

	function indexOf(buffer, value, byfeOffset, encoding) {
	  return toBuffer(buffer).indexOf(value, byfeOffset, encoding)
	}

	function lastIndexOf(buffer, value, byteOffset, encoding) {
	  return toBuffer(buffer).lastIndexOf(value, byteOffset, encoding)
	}

	function swap16(buffer) {
	  return toBuffer(buffer).swap16()
	}

	function swap32(buffer) {
	  return toBuffer(buffer).swap32()
	}

	function swap64(buffer) {
	  return toBuffer(buffer).swap64()
	}

	function toBuffer(buffer) {
	  if (Buffer.isBuffer(buffer)) return buffer
	  return Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength)
	}

	function toString(buffer, encoding, start, end) {
	  return toBuffer(buffer).toString(encoding, start, end)
	}

	function toHex(buffer, start, end) {
	  return toBuffer(buffer).toString('hex', start, end)
	}

	function write(buffer, string, offset, length, encoding) {
	  return toBuffer(buffer).write(string, offset, length, encoding)
	}

	function readDoubleBE(buffer, offset) {
	  return toBuffer(buffer).readDoubleBE(offset)
	}

	function readDoubleLE(buffer, offset) {
	  return toBuffer(buffer).readDoubleLE(offset)
	}

	function readFloatBE(buffer, offset) {
	  return toBuffer(buffer).readFloatBE(offset)
	}

	function readFloatLE(buffer, offset) {
	  return toBuffer(buffer).readFloatLE(offset)
	}

	function readInt32BE(buffer, offset) {
	  return toBuffer(buffer).readInt32BE(offset)
	}

	function readInt32LE(buffer, offset) {
	  return toBuffer(buffer).readInt32LE(offset)
	}

	function readUInt32BE(buffer, offset) {
	  return toBuffer(buffer).readUInt32BE(offset)
	}

	function readUInt32LE(buffer, offset) {
	  return toBuffer(buffer).readUInt32LE(offset)
	}

	function writeDoubleBE(buffer, value, offset) {
	  return toBuffer(buffer).writeDoubleBE(value, offset)
	}

	function writeDoubleLE(buffer, value, offset) {
	  return toBuffer(buffer).writeDoubleLE(value, offset)
	}

	function writeFloatBE(buffer, value, offset) {
	  return toBuffer(buffer).writeFloatBE(value, offset)
	}

	function writeFloatLE(buffer, value, offset) {
	  return toBuffer(buffer).writeFloatLE(value, offset)
	}

	function writeInt32BE(buffer, value, offset) {
	  return toBuffer(buffer).writeInt32BE(value, offset)
	}

	function writeInt32LE(buffer, value, offset) {
	  return toBuffer(buffer).writeInt32LE(value, offset)
	}

	function writeUInt32BE(buffer, value, offset) {
	  return toBuffer(buffer).writeUInt32BE(value, offset)
	}

	function writeUInt32LE(buffer, value, offset) {
	  return toBuffer(buffer).writeUInt32LE(value, offset)
	}

	b4a = {
	  isBuffer,
	  isEncoding,
	  alloc,
	  allocUnsafe,
	  allocUnsafeSlow,
	  byteLength,
	  compare,
	  concat,
	  copy,
	  equals,
	  fill,
	  from,
	  includes,
	  indexOf,
	  lastIndexOf,
	  swap16,
	  swap32,
	  swap64,
	  toBuffer,
	  toString,
	  toHex,
	  write,
	  readDoubleBE,
	  readDoubleLE,
	  readFloatBE,
	  readFloatLE,
	  readInt32BE,
	  readInt32LE,
	  readUInt32BE,
	  readUInt32LE,
	  writeDoubleBE,
	  writeDoubleLE,
	  writeFloatBE,
	  writeFloatLE,
	  writeInt32BE,
	  writeInt32LE,
	  writeUInt32BE,
	  writeUInt32LE
	};
	return b4a;
}

var passThroughDecoder;
var hasRequiredPassThroughDecoder;

function requirePassThroughDecoder () {
	if (hasRequiredPassThroughDecoder) return passThroughDecoder;
	hasRequiredPassThroughDecoder = 1;
	const b4a = requireB4a();

	passThroughDecoder = class PassThroughDecoder {
	  constructor(encoding) {
	    this.encoding = encoding;
	  }

	  get remaining() {
	    return 0
	  }

	  decode(data) {
	    return b4a.toString(data, this.encoding)
	  }

	  flush() {
	    return ''
	  }
	};
	return passThroughDecoder;
}

var errors;
var hasRequiredErrors;

function requireErrors () {
	if (hasRequiredErrors) return errors;
	hasRequiredErrors = 1;
	errors = class StreamError extends Error {
	  constructor(msg, code, fn = StreamError) {
	    super(msg);

	    this.code = code;

	    if (Error.captureStackTrace) {
	      Error.captureStackTrace(this, fn);
	    }
	  }

	  static isStreamDestroyed(err) {
	    return err && err.code === 'STREAM_DESTROYED'
	  }

	  static isPrematureClose(err) {
	    return err && err.code === 'PREMATURE_CLOSE'
	  }

	  static isAborted(err) {
	    return err && err.code === 'ABORTED'
	  }

	  static isBadArgument(err) {
	    return err && err.code === 'BAD_ARGUMENT'
	  }

	  get name() {
	    return 'StreamError'
	  }

	  static STREAM_DESTROYED() {
	    return new StreamError('Stream was destroyed', 'STREAM_DESTROYED', StreamError.STREAM_DESTROYED)
	  }

	  static PREMATURE_CLOSE(msg = 'Premature close') {
	    return new StreamError(msg, 'PREMATURE_CLOSE', StreamError.PREMATURE_CLOSE)
	  }

	  static ABORTED() {
	    return new StreamError('Stream aborted', 'ABORTED', StreamError.ABORTED)
	  }

	  static BAD_ARGUMENT(msg = 'Bad argument') {
	    return new StreamError(msg, 'BAD_ARGUMENT', StreamError.BAD_ARGUMENT)
	  }
	};
	return errors;
}

var wrappy_1;
var hasRequiredWrappy;

function requireWrappy () {
	if (hasRequiredWrappy) return wrappy_1;
	hasRequiredWrappy = 1;
	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	wrappy_1 = wrappy;
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)

	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')

	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k];
	  });

	  return wrapper

	  function wrapper() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    var ret = fn.apply(this, args);
	    var cb = args[args.length-1];
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k];
	      });
	    }
	    return ret
	  }
	}
	return wrappy_1;
}

var hasRequiredOnce;

function requireOnce () {
	if (hasRequiredOnce) return once.exports;
	hasRequiredOnce = 1;
	var wrappy = requireWrappy();
	once.exports = wrappy(once$1);
	once.exports.strict = wrappy(onceStrict);

	once$1.proto = once$1(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once$1(this)
	    },
	    configurable: true
	  });

	  Object.defineProperty(Function.prototype, 'onceStrict', {
	    value: function () {
	      return onceStrict(this)
	    },
	    configurable: true
	  });
	});

	function once$1 (fn) {
	  var f = function () {
	    if (f.called) return f.value
	    f.called = true;
	    return f.value = fn.apply(this, arguments)
	  };
	  f.called = false;
	  return f
	}

	function onceStrict (fn) {
	  var f = function () {
	    if (f.called)
	      throw new Error(f.onceError)
	    f.called = true;
	    return f.value = fn.apply(this, arguments)
	  };
	  var name = fn.name || 'Function wrapped with `once`';
	  f.onceError = name + " shouldn't be called more than once";
	  f.called = false;
	  return f
	}
	return once.exports;
}

var endOfStream;
var hasRequiredEndOfStream;

function requireEndOfStream () {
	if (hasRequiredEndOfStream) return endOfStream;
	hasRequiredEndOfStream = 1;
	var once = requireOnce();

	var noop = function() {};

	var qnt = commonjsGlobal.Bare ? queueMicrotask : process.nextTick.bind(process);

	var isRequest = function(stream) {
		return stream.setHeader && typeof stream.abort === 'function';
	};

	var isChildProcess = function(stream) {
		return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
	};

	var eos = function(stream, opts, callback) {
		if (typeof opts === 'function') return eos(stream, null, opts);
		if (!opts) opts = {};

		callback = once(callback || noop);

		var ws = stream._writableState;
		var rs = stream._readableState;
		var readable = opts.readable || (opts.readable !== false && stream.readable);
		var writable = opts.writable || (opts.writable !== false && stream.writable);
		var cancelled = false;

		var onlegacyfinish = function() {
			if (!stream.writable) onfinish();
		};

		var onfinish = function() {
			writable = false;
			if (!readable) callback.call(stream);
		};

		var onend = function() {
			readable = false;
			if (!writable) callback.call(stream);
		};

		var onexit = function(exitCode) {
			callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
		};

		var onerror = function(err) {
			callback.call(stream, err);
		};

		var onclose = function() {
			qnt(onclosenexttick);
		};

		var onclosenexttick = function() {
			if (cancelled) return;
			if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));
			if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));
		};

		var onrequest = function() {
			stream.req.on('finish', onfinish);
		};

		if (isRequest(stream)) {
			stream.on('complete', onfinish);
			stream.on('abort', onclose);
			if (stream.req) onrequest();
			else stream.on('request', onrequest);
		} else if (writable && !ws) { // legacy streams
			stream.on('end', onlegacyfinish);
			stream.on('close', onlegacyfinish);
		}

		if (isChildProcess(stream)) stream.on('exit', onexit);

		stream.on('end', onend);
		stream.on('finish', onfinish);
		if (opts.error !== false) stream.on('error', onerror);
		stream.on('close', onclose);

		return function() {
			cancelled = true;
			stream.removeListener('complete', onfinish);
			stream.removeListener('abort', onclose);
			stream.removeListener('request', onrequest);
			if (stream.req) stream.req.removeListener('finish', onfinish);
			stream.removeListener('end', onlegacyfinish);
			stream.removeListener('close', onlegacyfinish);
			stream.removeListener('finish', onfinish);
			stream.removeListener('exit', onexit);
			stream.removeListener('end', onend);
			stream.removeListener('error', onerror);
			stream.removeListener('close', onclose);
		};
	};

	endOfStream = eos;
	return endOfStream;
}

var pump_1;
var hasRequiredPump;

function requirePump () {
	if (hasRequiredPump) return pump_1;
	hasRequiredPump = 1;
	var once = requireOnce();
	var eos = requireEndOfStream();
	var fs;

	try {
	  fs = require('fs'); // we only need fs to get the ReadStream and WriteStream prototypes
	} catch (e) {}

	var noop = function () {};
	var ancient = typeof process === 'undefined' ? false : /^v?\.0/.test(process.version);

	var isFn = function (fn) {
	  return typeof fn === 'function'
	};

	var isFS = function (stream) {
	  if (!ancient) return false // newer node version do not need to care about fs is a special way
	  if (!fs) return false // browser
	  return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close)
	};

	var isRequest = function (stream) {
	  return stream.setHeader && isFn(stream.abort)
	};

	var destroyer = function (stream, reading, writing, callback) {
	  callback = once(callback);

	  var closed = false;
	  stream.on('close', function () {
	    closed = true;
	  });

	  eos(stream, {readable: reading, writable: writing}, function (err) {
	    if (err) return callback(err)
	    closed = true;
	    callback();
	  });

	  var destroyed = false;
	  return function (err) {
	    if (closed) return
	    if (destroyed) return
	    destroyed = true;

	    if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks
	    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

	    if (isFn(stream.destroy)) return stream.destroy()

	    callback(err || new Error('stream was destroyed'));
	  }
	};

	var call = function (fn) {
	  fn();
	};

	var pipe = function (from, to) {
	  return from.pipe(to)
	};

	var pump = function () {
	  var streams = Array.prototype.slice.call(arguments);
	  var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop;

	  if (Array.isArray(streams[0])) streams = streams[0];
	  if (streams.length < 2) throw new Error('pump requires two streams per minimum')

	  var error;
	  var destroys = streams.map(function (stream, i) {
	    var reading = i < streams.length - 1;
	    var writing = i > 0;
	    return destroyer(stream, reading, writing, function (err) {
	      if (!error) error = err;
	      if (err) destroys.forEach(call);
	      if (reading) return
	      destroys.forEach(call);
	      callback(error);
	    })
	  });

	  return streams.reduce(pipe)
	};

	pump_1 = pump;
	return pump_1;
}

export { requireFastFifo as a, requirePump as b, tarFs as c, requirePassThroughDecoder as d, require_default as e, requireErrors as f, requireB4a as r, semver as s, tarStream as t };
