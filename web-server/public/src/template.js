// src: http://2ality.com/2015/01/template-strings-html.html
function html (literals, ...substs) {
  return literals.raw.reduce((acc, lit, i) => {
    let subst = substs[i - 1]
    if (Array.isArray(subst)) {
      subst = subst.join('')
    }
    if (acc.endsWith('$')) {
      subst = htmlEscape(subst)
      acc = acc.slice(0, -1)
    }
    return acc + subst + lit.trim()
  }).trim()
}

// src: http://2ality.com/2015/01/template-strings-html.html
function htmlEscape (str) {
  return str.replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;')
}

// src: https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
function htmlToElement (html) {
  var template = document.createElement('template')
  template.innerHTML = html
  return template.content.firstChild
}

// src: https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
// Improved by removing extra spaces
function htmlToElements (html) {
  var template = document.createElement('template')
  template.innerHTML = html.replace(/>[\s]+</g, '><')
  return template.content.childNodes
}

function element (literals, ...substs) {
  return htmlToElement(html(literals, ...substs))
}

function elements (literals, ...substs) {
  return htmlToElements(html(literals, ...substs))
}

// function ifExists (value, element, fn = x => x) {
//   if (Array.isArray(value) && value.length === 0) {
//     return ''
//   }
//   if (typeof value === 'object' && Object.keys(value).length === 0) {
//     return ''
//   }
//   if (value == null) {
//     return ''
//   }
//   return fn(element)
// }

// const map = (fn) => (arr) => arr.map(fn)

export default {
  element,
  elements
}

// export default {
//   podcastEditor: id => element`
//     <div class="card my-4 bg-faded">
//       <div class="card-block p-4">

//         <div class="form-group">
//           <label for="inputPodcastName-${id}" class="fw-600">Название подкаста</label>
//           <input type="text" class="form-control" id="inputPodcastName-${id}" aria-describedby="podcastNameHelp" placeholder="Название подкаста">
//           <small id="podcastNameHelp" class="form-text text-muted">Введите название подкаста</small>
//         </div>

//         <div class="form-group">
//           <label for="inputSpeakerName-${id}" class="fw-600">Спикер</label>
//           <input type="text" class="form-control" id="inputSpeakerName-${id}" aria-describedby="speakerNameHelp" placeholder="Спикер">
//           <small id="speakerNameHelp" class="form-text text-muted">Введите имя спикера</small>
//         </div>

//         <div class="form-group">
//           <label for="presentation-${id}" class="fw-600">Презентация (PDF)</label>
//           <input name="presentation" type="file" class="form-control-file" id="presentation-${id}" aria-describedby="presentationHelp">
//           <small id="presentationHelp" class="form-text text-muted">Выберите презентацию</small>
//         </div>

//         <div class="form-group">
//           <label for="audio-stream-${id}" class="fw-600">Аудио</label>
//           <input name="audioStream" , type="file" class="form-control-file" id="audio-stream-${id}" aria-describedby="audioStreamHelp">
//           <small id="audioStreamHelp" class="form-text text-muted">Выберите аудиодорожку</small>
//         </div>

//         <div class="form-group">
//           <label for="slider-${id}" class="fw-600">Отметки времени</label>
//           <div class="podcast-slider mx-4" id="slider-${id}">
//             <img class="pod-slide" src="/content/gallery/google_summer/1.jpg">
//             <img class="pod-slide" src="/content/gallery/google_summer/2.jpg">
//             <img class="pod-slide" src="/content/gallery/google_summer/3.jpg">
//             <img class="pod-slide" src="/content/gallery/google_summer/4.jpg">
//             <img class="pod-slide" src="/content/gallery/google_summer/5.jpg">
//             <img class="pod-slide" src="/content/gallery/google_summer/6.jpg">
//           </div>
//           <div class="mx-auto d-flex justify-content-center">
//             <div class="mr-2">
//               <input class="form-control" id="starttime" type="time" step="1" value="00:00:00" aria-describedby="startTimeHelp">
//               <small id="startTimeHelp" class="form-text text-muted text-center">От</small>
//             </div>
//             <div class="ml-2">
//               <input class="form-control" id="endtime" type="time" step="1" value="00:00:00" aria-describedby="endTimeHelp">
//               <small id="endTimeHelp" class="form-text text-muted text-center">До</small>
//             </div>
//           </div>

//         </div>

//         <div class="d-flex justify-content-center mt-4" id="delete-podcasts-block-${id}">
//           <button id="delete-podcast-btn-${id}" class="btn btn-danger" type="button">Удалить подкаст</button>
//         </div>
//       </div>
//     </div>
//   `
// }
