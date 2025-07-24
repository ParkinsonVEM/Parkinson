document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadBtn');
    const previewImage = document.getElementById('previewImage');
    
    // Asegurar que las secciones sean visibles
    const sections = document.querySelectorAll('.terapias-section, .comentarios-section, .recuerdos-section');
    sections.forEach(section => {
        section.style.display = 'block';
        section.style.visibility = 'visible';
        section.style.opacity = '1';
    });
    
    // Asegurar que los elementos dentro de las secciones sean visibles
    const sectionElements = document.querySelectorAll('.terapia-card, .comentario, .recuerdo-card');
    sectionElements.forEach(element => {
        element.style.display = 'block';
        element.style.visibility = 'visible';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    });
    
    // Inicializar el carrusel de recuerdos
    initRecuerdosCarousel();
    
    // Array de imágenes para el preview flotante
    const previewImages = [
        'img/previewflotante1.png',
        'img/previewflotante2.png',
        'img/previewflotante3.png',
        'img/previewflotante4.png',
        'img/previewflotante5.png',
        'img/previewflotante6.png',
        'img/previewflotante7.png',
        'img/previewflotante8.png',
        'img/previewflotante9.png'
    ];
    
    let currentImageIndex = 0;
    
    // Función para cambiar la imagen con transición suave
    function changePreviewImage() {
        previewImage.style.opacity = '0';
        
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % previewImages.length;
            previewImage.src = previewImages[currentImageIndex];
            previewImage.style.opacity = '1';
        }, 300);
    }
    
    // Cambiar imagen al hacer clic en el preview
    if (previewImage) {
        previewImage.addEventListener('click', changePreviewImage);
        
        // Añadir transición suave a la imagen
        previewImage.style.transition = 'opacity 0.3s ease';
        
        // Cambiar imagen automáticamente cada 5 segundos
        setInterval(changePreviewImage, 5000);
        
        // Asegurar que el preview flotante sea visible
        const floatingPreview = document.querySelector('.floating-preview');
        if (floatingPreview) {
            floatingPreview.style.display = 'block';
            floatingPreview.style.visibility = 'visible';
            floatingPreview.style.opacity = '1';
        }
    }
    
    // Efecto 3D en las tarjetas de recuerdos
    const recuerdoCards = document.querySelectorAll('.recuerdo-card');
    
    recuerdoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
    
    // Efecto 3D en el título, subtítulo y preview del hero
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero-content h2');
    const heroSubtitle = document.querySelector('.hero-content p');
    const previewFloat = document.querySelector('.preview-float');
    
    if (heroContent && heroTitle && heroSubtitle && previewFloat) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            
            heroTitle.style.transform = `translateZ(50px) translateX(${x * 20}px) translateY(${y * 20}px)`;
            heroSubtitle.style.transform = `translateZ(30px) translateX(${x * 15}px) translateY(${y * 15}px)`;
            previewFloat.style.transform = `translateX(-50%) translateZ(20px) rotateX(${y * 10}deg) rotateY(${-x * 10}deg)`;
        });
        
        // Restaurar la transformación original al salir del área
        document.addEventListener('mouseleave', () => {
            previewFloat.style.transform = 'translateX(-50%) translateZ(20px)';
        });
    }
    
    // Funcionalidad de los botones de descarga
    const downloadReleaseBtn = document.getElementById('downloadReleaseBtn');
    const downloadParkinsonBtn = document.getElementById('downloadParkinsonBtn');
    
    // Botón para descargar app-release.apk
    downloadReleaseBtn.addEventListener('click', () => {
        // Set the APK file path from the rsc folder
        const apkUrl = 'https://drive.google.com/file/d/1XY1T_T_jvDphQr92QT9WZN-nDgFPEM9B/view?usp=sharing';
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = apkUrl;
        link.download = 'app-release.apk';
        
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // Botón para descargar Parkinson.apk (versión antigua)
    downloadParkinsonBtn.addEventListener('click', () => {
        // Set the APK file path from the rsc folder
        const apkUrl = 'rsc/Parkinson.apk';
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = apkUrl;
        link.download = 'Parkinson.apk';
        
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // Animación de aparición al hacer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.terapia-card, .comentario, .recuerdo-card, .info-section, .features-section, .benefits-section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Añadir clase para animación inicial
    setTimeout(() => {
        document.querySelectorAll('.terapia-card, .comentario, .recuerdo-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        animateOnScroll();
    }, 100);
    
    // Asegurar que las secciones sean visibles después de un tiempo
    setTimeout(() => {
        document.querySelectorAll('.terapia-card, .comentario, .recuerdo-card').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.display = 'block';
            el.style.visibility = 'visible';
        });
        
        // Forzar visibilidad de las secciones
        document.querySelectorAll('.terapias-section, .comentarios-section, .recuerdos-section').forEach(section => {
            section.style.display = 'block';
            section.style.visibility = 'visible';
            section.style.opacity = '1';
        });
    }, 1000);
    
    window.addEventListener('scroll', animateOnScroll);

    // Función para inicializar el carrusel de recuerdos
    function initRecuerdosCarousel() {
        const carousel = document.getElementById('recuerdosCarousel');
        const prevBtn = document.getElementById('prevRecuerdo');
        const nextBtn = document.getElementById('nextRecuerdo');
        const dots = document.querySelectorAll('#recuerdosDots .dot');
        const cards = document.querySelectorAll('.recuerdo-card');
        let currentIndex = 0;
        
        // Función para actualizar el carrusel
        function updateCarousel(index) {
            // Actualizar el índice actual
            currentIndex = index;
            
            // Calcular el desplazamiento
            const cardWidth = cards[0].offsetWidth;
            const gap = 24; // 1.5rem en píxeles
            const offset = index * (cardWidth + gap);
            
            // Desplazar el carrusel suavemente
            carousel.scrollTo({
                left: offset,
                behavior: 'smooth'
            });
            
            // Actualizar los puntos indicadores
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Evento para el botón anterior
        prevBtn.addEventListener('click', () => {
            const newIndex = Math.max(0, currentIndex - 1);
            updateCarousel(newIndex);
        });
        
        // Evento para el botón siguiente
        nextBtn.addEventListener('click', () => {
            const newIndex = Math.min(cards.length - 1, currentIndex + 1);
            updateCarousel(newIndex);
        });
        
        // Eventos para los puntos indicadores
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                updateCarousel(i);
            });
        });
        
        // Evento para el desplazamiento manual
        carousel.addEventListener('scroll', () => {
            const cardWidth = cards[0].offsetWidth;
            const gap = 24; // 1.5rem en píxeles
            const scrollLeft = carousel.scrollLeft;
            
            // Calcular el índice basado en el desplazamiento
            const index = Math.round(scrollLeft / (cardWidth + gap));
            
            // Actualizar los puntos indicadores sin desplazar el carrusel
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        });
        
        // Inicializar el carrusel
        updateCarousel(0);
    }
});
