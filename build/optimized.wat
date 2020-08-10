(module
 (type $i64_=>_f32 (func (param i64) (result f32)))
 (type $i64_=>_i32 (func (param i64) (result i32)))
 (memory $0 0)
 (export "memory" (memory $0))
 (export "u64tof32_wasm" (func $assembly/index/u64tof32_wasm))
 (export "i64tof32_wasm" (func $assembly/index/i64tof32_wasm))
 (export "i64tof32_wasm2js" (func $assembly/index/i64tof32_wasm2js))
 (export "u64tof32_wasm2js" (func $assembly/index/u64tof32_wasm2js))
 (func $assembly/index/u64tof32_wasm (param $0 i64) (result f32)
  local.get $0
  f32.convert_i64_u
 )
 (func $assembly/index/i64tof32_wasm (param $0 i64) (result f32)
  local.get $0
  f32.convert_i64_s
 )
 (func $assembly/index/u64tof32_wasm2js_impl (param $0 i64) (result i32)
  (local $1 i32)
  (local $2 i64)
  (local $3 i32)
  local.get $0
  i64.const 64
  local.get $0
  i64.clz
  i64.sub
  local.tee $2
  i64.const 26
  i64.sub
  i64.shr_u
  i32.wrap_i64
  local.get $0
  i64.const -2
  i64.const 90
  local.get $2
  i64.sub
  i64.shr_u
  i64.and
  i64.const 0
  i64.ne
  i32.or
  local.tee $1
  local.get $1
  i32.const 4
  i32.and
  i32.const 2
  i32.shr_u
  i32.or
  i32.const 1
  i32.add
  i32.const 2
  i32.shr_u
  local.tee $1
  i32.const 16777216
  i32.and
  i32.const 0
  i32.ne
  local.tee $3
  local.get $2
  i32.wrap_i64
  i32.add
  i32.const 126
  i32.add
  i32.const 23
  i32.shl
  local.get $1
  local.get $3
  i32.shr_u
  i32.const 8388607
  i32.and
  i32.or
 )
 (func $assembly/index/i64tof32_wasm2js (param $0 i64) (result f32)
  (local $1 i64)
  (local $2 i64)
  local.get $0
  local.get $0
  i64.const 63
  i64.shr_s
  local.tee $1
  i64.xor
  local.get $1
  i64.sub
  local.tee $2
  i64.const 9007199254740992
  i64.le_s
  if (result f32)
   local.get $0
   f64.convert_i64_s
   f32.demote_f64
  else
   local.get $2
   call $assembly/index/u64tof32_wasm2js_impl
   local.get $1
   i32.wrap_i64
   i32.const 31
   i32.shl
   i32.or
   f32.reinterpret_i32
  end
 )
 (func $assembly/index/u64tof32_wasm2js (param $0 i64) (result f32)
  local.get $0
  i64.const 9007199254740992
  i64.le_u
  if (result f32)
   local.get $0
   f64.convert_i64_u
   f32.demote_f64
  else
   local.get $0
   call $assembly/index/u64tof32_wasm2js_impl
   f32.reinterpret_i32
  end
 )
)
