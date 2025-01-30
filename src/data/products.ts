export const products = [
  // Colección Cuco (Hombres)
  {
    id: 1,
    nombre: 'Remera Essential Cuco',
    precio: 15000,
    descripcion: 'Remera de algodón premium con diseño minimalista de la colección Cuco.',
    tallas: ['S', 'M', 'L', 'XL'],
    imagenes: ['/images/cuco-remera.jpg'],
    coleccion: 'Cuco',
    categoria: 'Remeras',
    genero: 'Hombre',
    variantes: [
      { id: '1-S', talla: 'S', stock: 10 },
      { id: '1-M', talla: 'M', stock: 15 },
      { id: '1-L', talla: 'L', stock: 12 },
      { id: '1-XL', talla: 'XL', stock: 8 }
    ]
  },
  {
    id: 2,
    nombre: 'Pantalón Classic Cuco',
    precio: 25000,
    descripcion: 'Pantalón clásico de corte recto de la colección Cuco.',
    tallas: ['28', '30', '32', '34'],
    imagenes: ['/images/cuco-pantalon.jpg'],
    coleccion: 'Cuco',
    categoria: 'Pantalones',
    genero: 'Hombre',
    variantes: [
      { id: '2-28', talla: '28', stock: 8 },
      { id: '2-30', talla: '30', stock: 12 },
      { id: '2-32', talla: '32', stock: 10 },
      { id: '2-34', talla: '34', stock: 6 }
    ]
  },
  {
    id: 3,
    nombre: 'Buzo Oversize Cuco',
    precio: 35000,
    descripcion: 'Buzo oversize con capucha de la colección Cuco.',
    tallas: ['S', 'M', 'L', 'XL'],
    imagenes: ['/images/cuco-buzo.jpg'],
    coleccion: 'Cuco',
    categoria: 'Buzos',
    genero: 'Hombre',
    variantes: [
      { id: '3-S', talla: 'S', stock: 10 },
      { id: '3-M', talla: 'M', stock: 15 },
      { id: '3-L', talla: 'L', stock: 12 },
      { id: '3-XL', talla: 'XL', stock: 8 }
    ]
  },
  // Colección Lusmi (Mujeres)
  {
    id: 4,
    nombre: 'Remera Crop Lusmi',
    precio: 12000,
    descripcion: 'Remera crop de algodón premium de la colección Lusmi.',
    tallas: ['XS', 'S', 'M', 'L'],
    imagenes: ['/images/lusmi-remera.jpg'],
    coleccion: 'Lusmi',
    categoria: 'Remeras',
    genero: 'Mujer',
    variantes: [
      { id: '4-XS', talla: 'XS', stock: 10 },
      { id: '4-S', talla: 'S', stock: 15 },
      { id: '4-M', talla: 'M', stock: 12 },
      { id: '4-L', talla: 'L', stock: 8 }
    ]
  },
  {
    id: 5,
    nombre: 'Pantalón Wide Leg Lusmi',
    precio: 28000,
    descripcion: 'Pantalón wide leg de tiro alto de la colección Lusmi.',
    tallas: ['XS', 'S', 'M', 'L'],
    imagenes: ['/images/lusmi-pantalon.jpg'],
    coleccion: 'Lusmi',
    categoria: 'Pantalones',
    genero: 'Mujer',
    variantes: [
      { id: '5-XS', talla: 'XS', stock: 8 },
      { id: '5-S', talla: 'S', stock: 12 },
      { id: '5-M', talla: 'M', stock: 10 },
      { id: '5-L', talla: 'L', stock: 6 }
    ]
  },
  {
    id: 6,
    nombre: 'Chaqueta Oversize Lusmi',
    precio: 45000,
    descripcion: 'Chaqueta oversize estilo boyfriend de la colección Lusmi.',
    tallas: ['XS', 'S', 'M', 'L'],
    imagenes: ['/images/lusmi-chaqueta.jpg'],
    coleccion: 'Lusmi',
    categoria: 'Chaquetas',
    genero: 'Mujer',
    variantes: [
      { id: '6-XS', talla: 'XS', stock: 10 },
      { id: '6-S', talla: 'S', stock: 15 },
      { id: '6-M', talla: 'M', stock: 12 },
      { id: '6-L', talla: 'L', stock: 8 }
    ]
  }
];

export function getProductById(id: number) {
  return products.find(product => product.id === id);
}

export function getProductVariant(productId: number, talla: string) {
  const product = getProductById(productId);
  return product?.variantes.find(variant => variant.talla === talla);
}
