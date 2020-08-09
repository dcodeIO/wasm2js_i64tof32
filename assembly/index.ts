// reference

export function u64tof32_wasm(v: u64): f32 {
  return <f32>v;
}

export function i64tof32_wasm(v: i64): f32 {
  return <f32>v;
}

// floatunsdisf variant (no more <f32>someI64 below)

export function i64tof32_wasm2js(a: i64): f32 {
  let s = a >> 63;
  let b = (a ^ s) - s;
  if (b <= 1 << 53) {
    return <f32><f64>a;
  } else {
    return reinterpret<f32>(<u32>s << 31 | u64tof32_js_impl(b));
  }
}

export function u64tof32_wasm2js(a: u64): f32 {
  if (a <= 1 << 53) {
    return <f32><f64>a;
  } else {
    return reinterpret<f32>(u64tof32_js_impl(a));
  }
}

function u64tof32_js_impl(a: u64): u32 {
  // see: llvm/compiler-rt/lib/builtins/floatundisf.c
  const FLT_MANT_DIG = 24;
  let sd = 64 - clz(a);
  let e = <u32>sd - 1;
  let m = <u32>(a >> (sd - (FLT_MANT_DIG + 2)))
        | <u32>((a & (~1 >>> ((64 + FLT_MANT_DIG + 2) - sd))) != 0);
  m |= (m & 4) >> 2;
  ++m;
  m >>= 2;
  if (m & 1 << FLT_MANT_DIG) {
    m >>= 1;
    ++e;
  }
  return (e + 127) << 23 | (m & 0x007FFFFF);
}
