import { existPath, 
  existMdFile, 
  convertToAbsolute, 
  getAllFilesDirectory, 
  validateDirectory, 
  analyzeMdFilesArray, 
  getStatsResult,
  getResultValidateStats,
  getLinksDocument,
  getHttpResponse,
} from '../function.js';

// Metodo process.cwd = devuelve el directorio de trabajo actual del proceso Node.js
const currentDir = `${process.cwd()}`;

 describe("existPath", () => {
 it("Debe ser una función", () => {
  //typeof para encontrar el tipo de dato de una variable de JS
    expect(typeof existPath).toBe("function");
   });
   it("Debe validar cuando el path existe", () => {
    expect(existPath("../DEV004-md-links/README.md")).toEqual(true);
  });
  it("Debe validar cuando el path no existe", () => {
    expect(existPath("../testing/test1.md")).toEqual(false);
  });
});

// Test para validar si el archivo es tipo .md
describe("existMdFile", () => {
  it("Debe ser una función", () => {
    expect(typeof existMdFile).toBe("function");
  });
  it("Debe devolver true si el archivo es tipo .md", () => {
    expect(existMdFile("./README.md")).toBe(true);
  });
  it("Debe devolver false si el archivo no es tipo .md", () => {
    expect(existMdFile("./package.json")).toBe(false);
  });
});

// Test validacion si la ruta es absoluta o relativa
describe('convertToAbsolute', () => {
  it('Debe cambiar la ruta a absoluta si es relativa', () => {
    convertToAbsolute(`${currentDir}\\README.md`);
    expect(convertToAbsolute(`${currentDir}\\README.md`)).toBe(`${currentDir}\\README.md`);
  });
});

// Test para validar si es un directorio
describe("validateDirectory", () => {
  it("Debe ser una función", () => {
    expect(typeof validateDirectory).toBe("function");
  });
  it('Debe validar si la ruta es directorio', () => {
    expect(validateDirectory('./Testing'))
  })
});

// Test para leer los archivos
describe("getAllFilesDirectory", () => {
  it('Debe devolver los archivos del directorio', () => {
    const expectedFiles = [
      "./testing/archivo.md",
    "./testing/linkerroneo.md",
    "./testing/prueba.txt",
    ];

    expect(getAllFilesDirectory('./testing')).toEqual(expectedFiles);
  });
});

// Test para recorrer el array
const arrayObjects = [
  {
    href: "https://www.google.com/?hl=es",
    path: "./testing/archivo.md",
    text: "Google.com"
  },
  {
    href: "https://github.com/lauraflorezt/DEV004-md-links/blob/main/functions.js",
    path: "./testing/archivo.md",
    text: "Link en git"
  },
]
describe('analyzeMdFilesArray, entrega el array de objetos luego de leer cada archivo', () => {
  it('debe ser una función', () => {
    expect(typeof analyzeMdFilesArray).toBe('function')
  });
  it('retorna una promesa', () => {
    expect(typeof analyzeMdFilesArray([]).then).toBe('function')
  });
  it('retorna un array de objetos', () => {
    expect(analyzeMdFilesArray(['./testing/archivo.md'])).resolves.toStrictEqual(arrayObjects)
  });
  it('debe rechazar la promesa con el mensaje de error', () => {
    const mdFilesArray = ['./testing/prueba.txt'];
    return analyzeMdFilesArray(mdFilesArray).catch((err) => {
      expect(err).toEqual('------ ERROR: Analizar archivos md. ------'); 
    });  
  });
  it('debe rechazar la promesa con el mensaje de error si ocurre un error al leer un archivo', () => {
  const mdFilesArray1 = ['./testing/readme.md'];

  return analyzeMdFilesArray(mdFilesArray1)
    .catch((err) => {
      expect(err).toMatch('------ ERROR: Analizar archivos md. ------'); // se utiliza para comprobar que un valor coincida con un patrón de expresión regular
    });
  });

  // Test para validar --stats
describe('getStatsResult, entrega un objeto con dos propiedades total y unique', () => {
  it('debe ser una función', () => {
    expect(typeof getStatsResult).toBe('function')
  });
  it('retorna un objeto con dos propiedades', () => {
    expect(getStatsResult([arrayObjects])).toStrictEqual({Total: 1, Unique: 1})
  });
});

// Test para validar --Validate --stats
describe('getResultValidateStats, entrega un objeto con tres propiedadess total, unique, broken', () => {
  it('debe ser una función', () => {
    expect(typeof getResultValidateStats).toBe('function')
  });
  it('retorna un objeto con tres propiedades', () => {
    expect(getResultValidateStats([arrayObjects])).toStrictEqual({Total: 1, Unique: 1, Broken: 0})
  });
});
});

const content = `
[Google.com](https://www.google.com/?hl=es)
[Link en git](https://github.com/lauraflorezt/DEV004-md-links/blob/main/functions.js)`

describe('getLinksDocument, entrega el array de objetos luego de hacer match con los links', () => {
  it('debe ser una función', () => {
    expect(typeof getLinksDocument).toBe('function')
  });
  it('debe devolver un array vacío si no hay enlaces', () => {
    const file = './testing/linkerroneo.md';
    const content = 'Este es un contenido sin enlaces.';
    expect(getLinksDocument(file, content)).toEqual([]);
  });

  it('retorna un array de objetos', () => {
    expect(getLinksDocument('./testing/archivo.md', content)).toStrictEqual(arrayObjects)
  });
});

// Test para validar --validate
const validateObjects = [
  {
    href: 'https://www.google.com/?hl=es',
    path: './testing/archivo.md',
    text: 'Google.com',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://github.com/lauraflorezt/DEV004-md-links/blob/main/functions.js',
    path: './testing/archivo.md',
    text: 'Link en git',
    status: 404,
    ok: 'fail'
  },
]

describe('getHttpResponse, entrega el array de objetos sumando el status y statustext', () => {
  it('debe ser una función', () => {
    expect(typeof getHttpResponse).toBe('function')
  });
  it('retorna una promesa', () => {
    expect(typeof getHttpResponse([]).then).toBe('function')
  });
  it('retorna un array de objetos', () => {
    expect(getHttpResponse(arrayObjects)).resolves.toStrictEqual(validateObjects)
  });
  it('debe contar la cantidad de valores "fail" en ok', () => {

    return getHttpResponse(validateObjects)
    .then((result) => {
      const failCount = result.filter((item) => item.ok === 'fail').length;
      expect(failCount).toEqual(1);
    });
  });
});
