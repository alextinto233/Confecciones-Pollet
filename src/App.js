import React, { useState, useEffect } from 'react';

// Helper para construir nombres de clases de forma condicional
const cn = (...classes) => classes.filter(Boolean).join(' ');

// ===== DATOS DE IMÁGENES Y PRODUCTOS =====
// Para cambiar las imágenes, simplemente reemplaza las rutas (ej: './vestido-huasa-01.jpg')
// con la nueva ubicación de tus archivos o un enlace URL.

const initialProducts = [
    { 
        id: 1, 
        title: 'Vestidos de Huasa', 
        description: 'Confección a medida de hermosos vestidos para Fiestas Patrias y eventos.', 
        longDescription: 'Confección a medida de hermosos vestidos para Fiestas Patrias y eventos. Telas y diseños tradicionales de alta calidad.', 
        imageUrl: './foto-vestido.jpeg', // <-- CAMBIA AQUÍ LA IMAGEN DEL PRODUCTO
        placeholder: 'https://placehold.co/600x700/e11d48/ffffff?text=Vestido+de+Huasa' 
    },
    { 
        id: 2, 
        title: 'Falsos para Vestidos', 
        description: 'El complemento ideal para dar el volumen perfecto a tus vestidos de huasa.', 
        longDescription: 'El complemento ideal para dar el volumen perfecto a tus vestidos de huasa. Hechos con Cancan gala mexicano, material firme y liviano.', 
        imageUrl: './foto-falso.jpeg', // <-- CAMBIA AQUÍ LA IMAGEN DEL PRODUCTO
        placeholder: 'https://placehold.co/600x700/ffffff/333333?text=Falso+de+Vestido' 
    },
    { 
        id: 3, 
        title: 'Mochilas y Bolsos', 
        description: 'Diseños únicos y prácticos para el día a día, hechos a mano con amor.', 
        longDescription: 'Diseños únicos y prácticos para el día a día, hechos a mano con amor. Materiales impermeables y diseños hermosos.', 
        imageUrl: './foto-bolso.jpeg', // <-- CAMBIA AQUÍ LA IMAGEN DEL PRODUCTO
        placeholder: 'https://placehold.co/600x700/f97316/ffffff?text=Mochilas+y+Bolsos' 
    },
];

const initialGalleryImages = [
    { id: 'gal1', src: './cliente-1.jpeg', alt: 'Cliente Satisfecho 1', placeholder: 'https://placehold.co/600x700/fbcfe8/333333?text=Cliente+Feliz+1' }, // <-- CAMBIA AQUÍ
    { id: 'gal2', src: './cliente-2.jpeg', alt: 'Cliente Satisfecho 2', placeholder: 'https://placehold.co/600x700/fbcfe8/333333?text=Cliente+Feliz+2' }, // <-- CAMBIA AQUÍ
    { id: 'gal3', src: './cliente-3.jpeg', alt: 'Cliente Satisfecho 3', placeholder: 'https://placehold.co/600x700/fbcfe8/333333?text=Cliente+Feliz+3' }, // <-- CAMBIA AQUÍ
    { id: 'gal4', src: './cliente-4.jpeg', alt: 'Cliente Satisfecho 4', placeholder: 'https://placehold.co/600x700/fbcfe8/333333?text=Cliente+Feliz+4' }, // <-- CAMBIA AQUÍ
    { id: 'gal5', src: './cliente-5.jpeg', alt: 'Cliente Satisfecho 5', placeholder: 'https://placehold.co/600x700/fbcfe8/333333?text=Cliente+Feliz+5' }, // <-- CAMBIA AQUÍ
    { id: 'gal6', src: './cliente-6.jpeg', alt: 'Cliente Satisfecho 6', placeholder: 'https://placehold.co/600x700/fbcfe8/333333?text=Cliente+Feliz+6' }, // <-- CAMBIA AQUÍ
];

const faqs = [
    { question: '¿Cuánto tiempo se demora la confección una vez hecho el pedido?', answer: 'El tiempo de confección depende de la complejidad del pedido y la demanda actual. Generalmente, un vestido de huasa toma entre 1 a 2 semanas. Te daremos un tiempo estimado más preciso al momento de hacer tu pedido.' },
    { question: '¿Realizas envíos a todo Chile? ¿Cuáles son los costos aproximados?', answer: 'Sí, realizo envíos a todo Chile a través de Starken o Chilexpress, por pagar. El costo del envío dependerá del tamaño, peso del paquete y la ciudad de destino.' },
    { question: '¿Qué métodos de pago aceptas?', answer: 'Acepto pagos a través de transferencia bancaria o efectivo. Para confirmar un pedido, se solicita un abono del 50% del total.' },
    { question: '¿Hay política de cambios si la talla no me queda bien?', answer: 'Como las prendas se confeccionan a medida, no se realizan cambios por talla. Por eso es muy importante que te tomes las medidas siguiendo nuestra guía para asegurar un calce perfecto.' },
];

// ===== COMPONENTES REUTILIZABLES =====

const ImageWithFallback = ({ src, fallbackSrc, alt, className }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const handleError = () => setImgSrc(fallbackSrc);
    useEffect(() => { setImgSrc(src); }, [src]);
    return <img src={imgSrc} alt={alt} className={className} onError={handleError} />;
};

const ProductModal = ({ product, onClose, onNavigate }) => {
    if (!product) return null;
    const phoneNumber = '56992470789';
    const message = `Hola! Me interesa el producto "${product.title}" del catálogo de Pollet Bags.`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-full overflow-y-auto relative fade-in" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl z-10">&times;</button>
                <div className="md:flex">
                    <div className="md:w-1/2"><ImageWithFallback src={product.imageUrl} fallbackSrc={product.placeholder} alt={`Detalle de ${product.title}`} className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" /></div>
                    <div className="p-8 md:w-1/2 flex flex-col">
                        <h2 className="text-3xl font-display mb-4">{product.title}</h2>
                        <p className="text-gray-600 mb-6 flex-grow">{product.longDescription}</p>
                        <p className="text-sm text-gray-500 mt-2">Si el producto es una prenda de vestir, consulta nuestra <a href="#tallas" onClick={(e) => { e.preventDefault(); onClose(); onNavigate('tallas'); }} className="text-[#E5739D] underline">guía de tallas</a>.</p>
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-6 w-full bg-[#E5739D] text-white font-bold py-3 px-6 rounded-full hover:bg-[#D46A8F] transition transform hover:scale-105 inline-block text-center">Pedir este producto</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FaqItem = ({ faq, isOpen, onClick }) => (
    <div className="bg-pink-50 rounded-lg shadow-sm">
        <button onClick={onClick} className="faq-question w-full flex justify-between items-center text-left p-4 font-semibold">
            <span>{faq.question}</span>
            <span className={cn("text-xl transform transition-transform", isOpen && "rotate-180")}>{isOpen ? '-' : '+'}</span>
        </button>
        <div className={cn("faq-answer px-4 text-gray-600 overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-40 pb-4" : "max-h-0")}><p>{faq.answer}</p></div>
    </div>
);

// ===== SECCIONES PARA LA PÁGINA DE INICIO =====

const HeroSection = ({ onNavigate }) => (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-logo-style text-gray-800 mb-4 fade-in">Confecciones Pollet</h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8 fade-in" style={{ animationDelay: '0.2s' }}>Diseños únicos y hechos a mano, con la dedicación de un trabajo artesanal.</p>
        <button onClick={() => onNavigate('catalogo')} className="bg-[#E5739D] text-white font-bold py-3 px-8 rounded-full hover:bg-[#D46A8F] transition transform hover:scale-105 inline-block fade-in" style={{ animationDelay: '0.4s' }}>Ver Catálogo</button>
    </section>
);

const AboutSummary = ({ onNavigate }) => (
    <section className="py-16 sm:py-20 bg-pink-50">
        <div className="container mx-auto px-4 sm:px-6 md:flex md:items-center md:gap-12">
            <div className="md:w-1/3 mb-8 md:mb-0">
                {/* CAMBIA AQUÍ LA FOTO DE "SOBRE MÍ" */}
                <ImageWithFallback src="./sobre-mi.jpeg" fallbackSrc="https://placehold.co/600x700/fbcfe8/333333?text=Foto+de+Lilian" alt="Foto de la fundadora de Pollet Bags" className="rounded-lg shadow-xl w-full h-auto" />
            </div>
            <div className="md:w-2/3">
                <h2 className="text-3xl sm:text-4xl font-display text-gray-800 mb-4">Mi Historia, Mi Pasión</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">Hola, soy Lilian. Lo que empezó como una necesidad para cuidar de mi familia, se convirtió en mi más grande pasión. Cada tela y cada puntada lleva una parte de mi historia de esfuerzo y amor por la costura.</p>
                <button onClick={() => onNavigate('sobre-mi')} className="text-[#E5739D] font-bold hover:underline">Leer mi historia completa &rarr;</button>
            </div>
        </div>
    </section>
);

const FeaturedProducts = ({ onNavigate }) => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-display text-center text-gray-800 mb-12">Nuestras Creaciones Populares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {initialProducts.map(product => (
                    <div key={product.id} className="bg-pink-50 rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-2 transition duration-300">
                        <ImageWithFallback src={product.imageUrl} fallbackSrc={product.placeholder} alt={product.title} className="w-full h-80 object-cover" />
                        <div className="p-6 flex flex-col">
                            <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                            <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                            <button onClick={() => onNavigate('catalogo')} className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition mt-auto">Ver en el Catálogo</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const FeaturedGallery = ({ onNavigate }) => (
    <section className="py-16 sm:py-20 bg-pink-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-display text-gray-800 mb-4">Clientes Felices</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">La mayor alegría es ver la sonrisa de mis clientes.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {initialGalleryImages.slice(0, 4).map((image) => (
                    <div key={image.id} className="rounded-lg shadow-md overflow-hidden"><ImageWithFallback src={image.src} fallbackSrc={image.placeholder} alt={image.alt} className="w-full h-64 object-cover" /></div>
                ))}
            </div>
            <button onClick={() => onNavigate('galeria')} className="mt-12 bg-[#E5739D] text-white font-bold py-3 px-8 rounded-full hover:bg-[#D46A8F] transition transform hover:scale-105 inline-block">Ver toda la galería</button>
        </div>
    </section>
);

const HowToOrder = ({ onNavigate }) => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-display text-gray-800 mb-8">¿Cómo hacer un pedido?</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
                <div className="text-center max-w-xs"><div className="bg-[#E5739D] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div><h3 className="text-xl font-bold mb-2">Elige tu diseño</h3><p className="text-gray-600">Explora nuestro <button onClick={() => onNavigate('catalogo')} className="text-[#E5739D] underline">catálogo</button> y encuentra el producto que te enamore.</p></div>
                <div className="text-center max-w-xs"><div className="bg-[#E5739D] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div><h3 className="text-xl font-bold mb-2">Revisa los detalles</h3><p className="text-gray-600">Si es una prenda, consulta nuestra <button onClick={() => onNavigate('tallas')} className="text-[#E5739D] underline">guía de tallas</button>.</p></div>
                <div className="text-center max-w-xs"><div className="bg-[#E5739D] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div><h3 className="text-xl font-bold mb-2">Contáctanos</h3><p className="text-gray-600">Haz clic en el botón de WhatsApp y envíanos tu pedido. ¡Te atenderemos personalmente!</p></div>
            </div>
        </div>
    </section>
);

// ===== PÁGINAS COMPLETAS =====

const HomePage = ({ onNavigate }) => (
    <>
        <HeroSection onNavigate={onNavigate} />
        <AboutSummary onNavigate={onNavigate} />
        <FeaturedProducts onNavigate={onNavigate} />
        <FeaturedGallery onNavigate={onNavigate} />
        <HowToOrder onNavigate={onNavigate} />
    </>
);

const CatalogPage = ({ onNavigate }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => { document.body.style.overflow = selectedProduct ? 'hidden' : 'auto'; return () => { document.body.style.overflow = 'auto'; }; }, [selectedProduct]);

    return (
        <>
            <section id="catalogo" className="py-16 bg-white min-h-screen">
                <div className="container mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl font-display text-center text-gray-800 mb-12">Nuestro Catálogo</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {initialProducts.map(product => (
                            <div key={product.id} className="bg-pink-50 rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-2 transition duration-300">
                                <ImageWithFallback src={product.imageUrl} fallbackSrc={product.placeholder} alt={product.title} className="w-full h-80 object-cover" />
                                <div className="p-6 flex flex-col"><h3 className="text-xl font-bold mb-2">{product.title}</h3><p className="text-gray-600 mb-4 flex-grow">{product.description}</p><button onClick={() => setSelectedProduct(product)} className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition mt-auto">Ver Detalles</button></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onNavigate={onNavigate} />
        </>
    );
};

const AboutPage = () => (
    <section id="sobre-mi" className="py-16 sm:py-20 bg-pink-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6"><div className="md:flex md:items-center md:gap-12"><div className="md:w-1/3 mb-8 md:mb-0">
            {/* CAMBIA AQUÍ LA FOTO DE "SOBRE MÍ" (PÁGINA COMPLETA) */}
            <ImageWithFallback src="./sobre-mi.jpeg" fallbackSrc="https://placehold.co/600x700/fbcfe8/333333?text=Foto+de+Lilian" alt="Foto de la fundadora de Pollet Bags" className="rounded-lg shadow-xl w-full h-auto" />
        </div><div className="md:w-2/3"><h2 className="text-3xl sm:text-4xl font-display text-gray-800 mb-4">Mi Historia, Mi Pasión</h2><p className="text-gray-600 mb-4 leading-relaxed">Hola, soy Lilian, la creadora detrás de cada diseño que ves aquí. Mi viaje en el mundo de la costura no comenzó en una escuela de diseño, sino en mi hogar, hace ya 14 años.</p><p className="text-gray-600 mb-4 leading-relaxed">Antes me dedicaba a trabajar de nana, pero cuando mi hijo se enfermaba, me encontraba en la difícil situación de tener que pedir permisos en mi trabajo, algo que no siempre era bien recibido. Fue en ese momento que tomé una de las decisiones más importantes de mi vida: dedicarme a la costura desde casa, sin tener ningún conocimiento previo, pero con toda la motivación para aprender y salir adelante por mi familia.</p><p className="text-gray-600 mb-4 leading-relaxed">Lo que empezó como una necesidad, con el tiempo se convirtió en mi más grande pasión. Cada tela, cada puntada y cada vestido que confecciono lleva una parte de esa historia de esfuerzo y dedicación.</p><p className="text-gray-600 leading-relaxed">Mi filosofía siempre ha sido la misma: mi objetivo principal es que cada cliente se vaya no solo con una prenda de calidad, sino completamente satisfecho y feliz. Nada me llena más que ver esa sonrisa en sus caras cuando ven el resultado final. Esa felicidad es el verdadero motor de mi trabajo.</p><p className="text-gray-600 leading-relaxed">Gracias por confiar en mis manos para crear algo especial para ti.</p></div></div></div>
    </section>
);

const SizingGuidePage = () => {
    return (
        <section id="tallas" className="py-16 bg-white min-h-screen">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-3xl sm:text-4xl font-display text-center text-gray-800 mb-4">Guía de Tallas</h2>
                <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">Para asegurar un calce perfecto, te recomendamos medirte usando esta guía visual y luego comparar con nuestras tablas.</p>
                
                <div className="max-w-xs mx-auto mb-12 text-center">
                    {/* CAMBIA AQUÍ LA IMAGEN DE LA GUÍA DE TALLAS */}
                    <ImageWithFallback 
                        src={'./guia-tallas.png'} 
                        fallbackSrc="https://placehold.co/400x550/fbcfe8/333333?text=Guía+de+Medidas" 
                        alt="Guía para tomar medidas" 
                        className="rounded-lg shadow-lg w-full mb-4" 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <div className="bg-pink-50 p-4 sm:p-6 rounded-lg shadow-md"><h3 className="text-xl font-bold mb-4 text-center text-[#E5739D]">Tallas </h3><table className="size-chart"><thead><tr><th>TALLA (CM)</th><th>BUSTO (CM)</th><th>CINTURA (CM)</th><th>FALDA (CM)</th></tr></thead><tbody><tr><td>00</td><td>40</td><td>40</td><td>18</td></tr><tr><td>0</td><td>42</td><td>42</td><td>20</td></tr><tr><td>3M</td><td>48</td><td>48</td><td>22</td></tr><tr><td>6M</td><td>50</td><td>50</td><td>23</td></tr><tr><td>9M</td><td>52</td><td>52</td><td>24</td></tr><tr><td>12M</td><td>54</td><td>54</td><td>25</td></tr><tr><td>18M</td><td>56</td><td>56</td><td>26</td></tr><tr><td>24M</td><td>58</td><td>58</td><td>27</td></tr></tbody></table></div>
                    <div className="bg-pink-50 p-4 sm:p-6 rounded-lg shadow-md"><h3 className="text-xl font-bold mb-4 text-center text-[#E5739D]">Tallas Niña</h3><table className="size-chart"><thead><tr><th>TALLA (CM)</th><th>BUSTO (CM)</th><th>CINTURA (CM)</th><th>FALDA (CM)</th></tr></thead><tbody><tr><td>3</td><td>60</td><td>60</td><td>38</td></tr><tr><td>4</td><td>62</td><td>62</td><td>40</td></tr><tr><td>6</td><td>66</td><td>66</td><td>45</td></tr><tr><td>8</td><td>70</td><td>70</td><td>48</td></tr><tr><td>10</td><td>74</td><td>74</td><td>52</td></tr><tr><td>12</td><td>78</td><td>78</td><td>55</td></tr><tr><td>14</td><td>82</td><td>82</td><td>58</td></tr><tr><td>16</td><td>86</td><td>86</td><td>60</td></tr></tbody></table></div>
                    <div className="bg-pink-50 p-4 sm:p-6 rounded-lg shadow-md"><h3 className="text-xl font-bold mb-4 text-center text-[#E5739D]">Tallas (Numérico)</h3><table className="size-chart"><thead><tr><th>TALLA (CM)</th><th>BUSTO (CM)</th><th>CINTURA (CM)</th><th>FALDA (CM)</th></tr></thead><tbody><tr><td>38</td><td>90</td><td>78</td><td>60</td></tr><tr><td>40</td><td>94</td><td>82</td><td>62</td></tr><tr><td>42</td><td>98</td><td>86</td><td>62</td></tr><tr><td>44</td><td>102</td><td>90</td><td>62</td></tr><tr><td>46</td><td>106</td><td>94</td><td>62</td></tr><tr><td>48</td><td>110</td><td>98</td><td>62</td></tr><tr><td>50</td><td>114</td><td>102</td><td>62</td></tr><tr><td>52</td><td>118</td><td>106</td><td>62</td></tr><tr><td>54</td><td>122</td><td>110</td><td>62</td></tr><tr><td>56</td><td>126</td><td>114</td><td>62</td></tr></tbody></table></div>
                    <div className="bg-pink-50 p-4 sm:p-6 rounded-lg shadow-md"><h3 className="text-xl font-bold mb-4 text-center text-[#E5739D]">Tallas (Letras)</h3><table className="size-chart"><thead><tr><th>TALLA (CM)</th><th>BUSTO (CM)</th><th>CINTURA (CM)</th><th>FALDA (CM)</th></tr></thead><tbody><tr><td>S</td><td>92</td><td>78</td><td>60</td></tr><tr><td>M</td><td>100</td><td>86</td><td>62</td></tr><tr><td>L</td><td>110</td><td>96</td><td>62</td></tr><tr><td>XL</td><td>115</td><td>106</td><td>62</td></tr><tr><td>XXL</td><td>120</td><td>116</td><td>62</td></tr></tbody></table></div>
                </div>
                <p className="text-center text-gray-500 mt-12 text-sm"><strong>¡IMPORTANTE!</strong> Las medidas debes tomarlas con 2 dedos dentro de la huincha, para que no te quede apretado tu vestido.</p>
            </div>
        </section>
    );
};

const GalleryPage = () => {
    return (
        <section id="galeria" className="py-16 sm:py-20 bg-pink-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-3xl sm:text-4xl font-display text-center text-gray-800 mb-4">Mi Trabajo y Clientes Felices</h2>
                <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">Aquí hay una muestra de algunas confecciones que he realizado con mucho cariño para mis clientes.</p>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                    {initialGalleryImages.map((image) => (
                        <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                            <ImageWithFallback src={image.src} fallbackSrc={image.placeholder} alt={image.alt} className="w-full h-64 sm:h-96 object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FaqPage = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const handleToggle = (index) => setOpenIndex(openIndex === index ? null : index);
    const phoneNumber = '56992470789';
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hola! Tengo una consulta sobre los productos de Pollet Bags.')}`;

    return (
        <section id="preguntas-frecuentes" className="py-16 sm:py-20 bg-white min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                <h2 className="text-3xl sm:text-4xl font-display text-center text-gray-800 mb-12">Preguntas Frecuentes</h2>
                <div className="space-y-4">{faqs.map((faq, index) => (<FaqItem key={index} faq={faq} isOpen={openIndex === index} onClick={() => handleToggle(index)} />))}</div>
                <div className="mt-12 text-center bg-pink-50 p-6 rounded-lg">
                    <p className="text-gray-700">
                        ¿Tienes otra duda o quieres saber más detalles sobre alguna pregunta?
                    </p>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-4 bg-[#25d366] text-white font-bold py-3 px-6 rounded-full hover:bg-[#1da851] transition transform hover:scale-105 inline-block">
                        Hablemos por WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

// ===== COMPONENTES DE LAYOUT =====

const Header = ({ onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = [
        { name: 'Inicio', page: 'home' },
        { name: 'Catálogo', page: 'catalogo' },
        { name: 'Sobre Mí', page: 'sobre-mi' },
        { name: 'Galería', page: 'galeria' },
        { name: 'Guía de Tallas', page: 'tallas' },
        { name: 'Preguntas', page: 'preguntas-frecuentes' },
    ];

    const handleNavClick = (page) => { onNavigate(page); setIsMenuOpen(false); window.scrollTo(0, 0); };
    useEffect(() => { document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'; }, [isMenuOpen]);

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
                    {/* CAMBIA AQUÍ EL LOGO */}
                    <button onClick={() => handleNavClick('home')} className="cursor-pointer">
                        <ImageWithFallback src="./mi-logo-pollet.png" fallbackSrc="https://placehold.co/200x80/fdf2f8/e11d48?text=Pollet+Bags" alt="Pollet Bags Logo" className="h-16 sm:h-20 w-auto" />
                    </button>
                    <button onClick={() => setIsMenuOpen(true)} className="text-gray-800 hover:text-[#E5739D] focus:outline-none z-50 lg:hidden"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
                    <nav className="hidden lg:flex items-center space-x-6">
                        {navLinks.slice(1).map(link => (<button key={link.page} onClick={() => handleNavClick(link.page)} className="text-gray-800 hover:text-[#E5739D] transition font-medium">{link.name}</button>))}
                    </nav>
                </div>
            </header>
            <div className={cn("fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-opacity duration-300 lg:hidden", isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible")}>
                 <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6 text-gray-800 hover:text-[#E5739D] focus:outline-none"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                 <nav className="flex flex-col items-center space-y-8">{navLinks.map(link => (<button key={link.page} onClick={() => handleNavClick(link.page)} className="text-2xl text-gray-800 hover:text-[#E5739D] transition">{link.name}</button>))}
                 </nav>
            </div>
        </>
    );
};

const Footer = () => (
    <footer id="contacto-footer" className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-display mb-4">¿Lista para hacer tu pedido?</h2>
            <p className="mb-6">Hablemos directamente. Estaré feliz de tomar tu pedido y resolver tus dudas.</p>
            <a href="https://wa.me/56992470789?text=Hola!%20Me%20interesa%20un%20producto%20de%20tu%20catálogo%20Pollet%20Bags." target="_blank" rel="noopener noreferrer" className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition transform hover:scale-105 inline-block">Contactar por WhatsApp</a>
            <div className="mt-8"><p>&copy; {new Date().getFullYear()} Pollet Bags. Todos los derechos reservados.</p></div>
        </div>
    </footer>
);

const WhatsAppFloat = () => (
    <a
        href="https://wa.me/56992470789?text=Hola!%20Quisiera%20hacer%20una%20consulta%20sobre%20Pollet%20Bags."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir chat de WhatsApp con Pollet Bags"
    >
        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="whatsapp" className="w-8 h-8 m-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 .9c60.3 0 115.6 23.3 157.4 65.2 41.8 41.9 67.1 97.2 67.1 157.1 0 109.8-89.2 199-199 199-.1 0-.1 0-.2 0-34.9 0-68.9-9.2-99.2-26.3l-7-4.1-71.6 18.8 19.1-69.8-4.6-7.4c-18.7-30.6-29.9-66.3-29.9-103.3 0-109.8 89.2-199 199-199zm101.9 148.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
        <span className="sr-only">Abrir chat de WhatsApp con Pollet Bags</span>
    </a>
);

// ===== COMPONENTE PRINCIPAL DE LA APP =====

export default function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home': return <HomePage onNavigate={setCurrentPage} />;
            case 'catalogo': return <CatalogPage onNavigate={setCurrentPage} />;
            case 'sobre-mi': return <AboutPage />;
            case 'galeria': return <GalleryPage />;
            case 'tallas': return <SizingGuidePage />;
            case 'preguntas-frecuentes': return <FaqPage />;
            default: return <HomePage onNavigate={setCurrentPage} />;
        }
    };

    return (
        <div className="bg-pink-50 text-gray-800 font-sans">
            <Header onNavigate={setCurrentPage} />
            <main>{renderPage()}</main>
            <Footer />
            <WhatsAppFloat />
        </div>
    );
}
