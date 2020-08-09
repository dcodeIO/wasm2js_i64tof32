const F32 = new Float32Array(1);
const U32 = new Uint32Array(F32.buffer);

function reinterpret_f32(x) {
  U32[0] = x;
  return F32[0];
}

exports.i64tof32_wasm2js = function i64tof32_wasm2js(a) {
  a %= 0x10000000000000000n;
  let s = a >> 63n;
  let b = (a ^ s) - s;
  if (b <= 1n << 53n) {
    return Math.fround(Number(a));
  } else {
    return reinterpret_f32((Number(s) << 31) | u64tof32_wasm2js_impl(b));
  }
}

exports.u64tof32_wasm2js = function u64tof32_wasm2js(a) {
  a %= 0x10000000000000000n;
  if (a <= 1n << 53n) {
    return Math.fround(Number(a));
  } else {
    return reinterpret_f32(u64tof32_wasm2js_impl(a));
  }
}

function clz64(n) {
  let lo = Number(n & 0xFFFFFFFFn) | 0;
  let hi = Number(n >> 32n) | 0;
  let mask = (hi ^ (hi - 1)) >>> 31;
  return Math.clz32((hi & ~mask) | (lo & mask)) + (mask & 32);
}

function u64tof32_wasm2js_impl(a) {
  // see: llvm/compiler-rt/lib/builtins/floatundisf.c
  const FLT_MANT_DIG = 24;
  let sd = 64 - clz64(a);
  let e = sd - 1;
  let m = Number(a >> BigInt(sd - (FLT_MANT_DIG + 2)))
        | Number((a & (0xFFFFFFFFFFFFFFFFn >> BigInt((64 + FLT_MANT_DIG + 2) - sd))) != 0);
  m |= (m & 4) >>> 2;
  ++m;
  m >>>= 2;
  if (m & 1 << FLT_MANT_DIG) {
    m >>>= 1;
    ++e;
  }
  return (e + 127) << 23 | (m & 0x007FFFFF);
}
