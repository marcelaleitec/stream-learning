const track = document.querySelector('.carrossel_track')
const slide = Array.from(track.children)
const nextBtn = document.querySelector('.carrossel_btn--right')
const prevBtn = document.querySelector('.carrossel_btn--left')
const nav = document.querySelector('.carrossel_nav')
const dots = Array.from(nav.children)

const slideWidth = slide[0].getBoundingClientRect().width

//colocando slides um ao lado do outro
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px'
}
slide.forEach(setSlidePosition)

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')'
  currentSlide.classList.remove('current-slide')
  targetSlide.classList.add('current-slide')
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide')
  targetDot.classList.add('current-slide')
}

const hiddenBtn = (slide, prevBtn, nextBtn, targetIndex) => {
  if (targetIndex === 0) {
    prevBtn.classList.add('is-hidden')
    nextBtn.classList.remove('is-hidden')
  } else if (targetIndex === slide.length - 1) {
    prevBtn.classList.remove('is-hidden')
    nextBtn.classList.add('is-hidden')
  } else {
    prevBtn.classList.remove('is-hidden')
    nextBtn.classList.remove('is-hidden')
  }
}

//movendo slide para a direita
nextBtn.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide')
  const nextSlide = currentSlide.nextElementSibling
  const currentDot = nav.querySelector('.current-slide')
  const nextDot = currentDot.nextElementSibling
  const nextIndex = slide.findIndex(slide => slide === nextSlide)

  moveToSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)
  hiddenBtn(slide, prevBtn, nextBtn, nextIndex)
})

//movendo slide para a esquerda
prevBtn.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide')
  const prevSlide = currentSlide.previousElementSibling
  const currentDot = nav.querySelector('.current-slide')
  const prevDot = currentDot.previousElementSibling
  const prevIndex = slide.findIndex(slide => slide === prevSlide)

  moveToSlide(track, currentSlide, prevSlide)
  updateDots(currentDot, prevDot)
  hiddenBtn(slide, prevBtn, nextBtn, prevIndex)
})

//clicando nos pontos e mudando para o slide indicado
nav.addEventListener('click', e => {
  const targetDot = e.target.closest('button')

  if (!targetDot) return

  const currentSlide = track.querySelector('.current-slide')
  const currentDot = nav.querySelector('.current-slide')
  const targetIndex = dots.findIndex(dot => dot === targetDot)

  const targetSlide = slide[targetIndex]
  moveToSlide(track, currentSlide, targetSlide)

  updateDots(currentDot, targetDot)
  hiddenBtn(slide, prevBtn, nextBtn, targetIndex)
})
