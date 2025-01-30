import { NextResponse } from 'next/server';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mldgndan'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, total, cliente } = body;

    // Crear el contenido del email
    const itemsList = items.map((item: any) => `
      - ${item.nombre}
      Talla: ${item.talla}
      Cantidad: ${item.cantidad}
      Precio: $${(item.precio * item.cantidad).toLocaleString()}
    `).join('\n');

    const formData = {
      _subject: `Nuevo pedido de ${cliente.nombre}`,
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      ciudad: cliente.ciudad,
      provincia: cliente.provincia,
      codigoPostal: cliente.codigoPostal,
      notas: cliente.notas,
      items: itemsList,
      total: `$${total.toLocaleString()}`
    };

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Error al enviar el formulario');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending form:', error);
    return NextResponse.json(
      { error: 'Error al procesar el pedido' },
      { status: 500 }
    );
  }
} 