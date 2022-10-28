const sliderContainer = document.querySelectorAll('.contact')

sliderContainer.forEach(container => {
    container.addEventListener('mouseenter', () => {
        if (container.lastElementChild.classList.contains('nactive'))
            container.lastElementChild.classList.replace('nactive', 'active')
        else if (!container.lastElementChild.classList.contains('active'))
            container.lastElementChild.classList.add('active')
    })

    container.addEventListener('mouseleave', () => {
        if (container.lastElementChild.classList.contains('active'))
            container.lastElementChild.classList.replace('active', 'nactive')
    })
})