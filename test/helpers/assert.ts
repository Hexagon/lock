function assertTruthy(isTrue: boolean) {
  if (!isTrue) throw new Error("Should be true");
}

function assertFalsy(isTrue: boolean) {
  if (!isTrue) throw new Error("Should be false");
}

function assertEqual(a: unknown, b: unknown) {
  if (a !== b) {
    if (typeof a === "string" && typeof b === "string") {
      throw new Error(a.toString() + " should equal " + b.toString());
    } else {
      throw new Error("Should equal");
    }
  }
}

export { assertEqual, assertFalsy, assertTruthy };
