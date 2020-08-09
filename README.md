# Imprecise i64 to f32 in JS

```js
Math.fround(Number(18446743523953737727n));
```

!=

```c
(float)18446743523953737727ULL;
```

For full context, see: https://github.com/WebAssembly/binaryen/pull/3024

## Instructions

- `git clone https://github.com/dcodeIO/wasm2js_i64tof32.git`
- `cd wasm2js_i64tof32`
- `npm install`
- `npm test`
- Improve [assembly/index.ts](./assembly/index.ts)
- `npm test` again
