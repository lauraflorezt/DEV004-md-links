import  existPath  from './';

describe("existPath", () => {
  it("Debe ser una función", () => {
    expect(typeof existPath).toBe("function");
  });
  it("Debe validar cuando el path existe", () => {
    existPath("testing/archivo.md");
    expect(existPath("testing/archivo.md")).toEqual(true);
  });
  it("Debe validar cuando el path no existe", () => {
    existPath("./Laura/test1.md");
    expect(existPath("./Laura/test1.md")).toEqual(false);
  });
});
