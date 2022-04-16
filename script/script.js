//3d scroll
let zSpacing = -1500,
    lastPos = zSpacing / 5, //стартовая позиция фреймов при загрузке стр.
    frames = document.querySelectorAll(`.frame`),
    framesArr = Array.from(frames),
    zValues = [] //для раздачи стартовых позиций по оси z

window.onscroll = function() {
  let top = document.documentElement.scrollTop, //расстояние сверху скролла до текущей позиции
      deltaPos = lastPos - top //условные значения для движения по оси z, т.к. content позиционирован фиксированно, но дельта тем не менее вычисляется при скролле
  lastPos = top
  //логика: скролл -> от последней позиции отнимаем "сколько наскролили вниз" -> последняя позиция обновляется на "насколько наскролили" -> при скролле это повторяется
  framesArr.forEach( (item, index)=>{
    zValues.push(index*zSpacing + zSpacing/*для расстояния до первого фрейма*/) //раздаем каждому фрейму позицию вглубь
    zValues[index] += deltaPos * -5;
    let frame = framesArr[index],
        transform = `translateZ(${zValues[index]}px)`,
        opacity = zValues[index] < Math.abs(zSpacing)/2 ? 1:0;
    frame.setAttribute('style',`transform: ${transform}; opacity: ${opacity}`)
    if (opacity == 0) {

			setTimeout(() => {

				frame.style.display = 'none'

			}, 300)

		} else if(opacity == 1) {

			setTimeout(() => {

				frame.style.display = 'flex'

			}, 300)

		}
  })
}
window.scrollTo(0, 1);
//audio
let soundButton = document.querySelector(`.sound-button`);
let audio = document.querySelector(`.audio`);

soundButton.addEventListener(`click`, evt => {
  soundButton.classList.toggle(`sound-button_paused`);
  if(audio.paused){
    audio.play();
  } else {
    audio.pause();
  }
});
window.onfocus = function() {
  if (soundButton.classList.contains(`sound-button_paused`)){
    audio.pause();
  } else {
    audio.play();
  }
}
window.onblur = function(){
  audio.pause();
};