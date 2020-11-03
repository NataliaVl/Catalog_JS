function openCatalog(){
  const users = $('.catalog__users');

  getUsers();

  async function getInformation(url){
    try{
      const response = await fetch(url);      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('error: ', error);
      this.errored = true;
    }    
  }

  async function getUsers() {

    const result = await getInformation('https://json.medrating.org/users/');

    let loadedUsers = []; // массив, в который добавляются id пользователей, для которых уже загружен json-файл

    // создаем элемент, который выводит username
    for (let i = 0; i < Object.keys(result).length; i++) { 
      if(result[i].hasOwnProperty('username')){ 
        const user = document.createElement('ul');
        user.classList.add("catalog__userName");
        user.innerHTML = result[i].username;      
        user.setAttribute('data-id-user', result[i].id); // добавление id в HTML-атрибут

        users.append(user);

        // ОБРАБОТЧИК СОБЫТИЙ
        user.onclick = function(event){
          let idCurrentUser = event.target.getAttribute('data-id-user');
          let closeElements = event.target.childNodes;

          if(event.target.classList.contains('catalog__open')){          
            for (let i = 1; i < closeElements.length; i++) {
              closeElements[i].classList.add("catalog__hidden");            
            }
            user.classList.remove("catalog__open");
          } else if (loadedUsers.includes(idCurrentUser)){
            for (let i = 1; i < closeElements.length; i++) {
              closeElements[i].classList.remove("catalog__hidden");            
            }
            user.classList.add("catalog__open");
          } else {
            getAlbums(idCurrentUser); // получение json-файла для выбранного пользователя
            loadedUsers.push(idCurrentUser);
            user.classList.add("catalog__open");
          }                
        }
      }     
    } 
  }

  async function getAlbums(userId) {
    url = 'https://json.medrating.org/albums?userId=' + userId; 

    // поучаем файл с альбомами
    const result = await getInformation(url);

    const openUser = document.querySelector('[data-id-user="' + userId + '"]');

    let loadedAlbums = []; // массив, в который добавляются id альбомов, для которых уже загружен json-файл

    // создаем элемент, который выводит альбом
    for (let i = 0; i < Object.keys(result).length; i++) {       
      if(result[i].hasOwnProperty('title')){ 
        const titleAlbum = document.createElement('ul');
        titleAlbum.classList.add('catalog__titleAlbum');
        titleAlbum.innerHTML = result[i].title;       
        titleAlbum.setAttribute('data-id-album', result[i].id); // добавление id в HTML-атрибут

        openUser.append(titleAlbum); // добавление элемета в DOM

        // ОБРАБОТЧИК СОБЫТИЙ
        titleAlbum.onclick = function(event){
          let idCurrentAlbum = event.target.getAttribute('data-id-album');             
          let closeElements = event.target.childNodes;

          if(event.target.classList.contains('catalog__openAlbum')){          
            for (let i = 1; i < closeElements.length; i++) {            
              closeElements[i].classList.add("catalog__hiddenAlbum");
            }
            titleAlbum.classList.remove("catalog__openAlbum");
          } else if (loadedAlbums.includes(idCurrentAlbum)){
            for (let i = 1; i < closeElements.length; i++) {            
              closeElements[i].classList.remove("catalog__hiddenAlbum");            
            }
            titleAlbum.classList.add("catalog__openAlbum");
          } else {
            getPhotos(idCurrentAlbum); // получение json-файла для выбранного пользователя
            loadedAlbums.push(idCurrentAlbum);
            titleAlbum.classList.add("catalog__openAlbum");
          }  
        }
      }     
    }  
  }

  async function getPhotos(idAlbum) {  
    url = 'https://json.medrating.org/photos?albumId=' + idAlbum;

    const result = await getInformation(url);

    const openAlbum = document.querySelector('[data-id-album="' + idAlbum + '"]');
  
    for (let i = 0; i < Object.keys(result).length; i++) {  
      if(result[i].hasOwnProperty('url')){ 

        // создание элемента img
        const photo = document.createElement('img');
        photo.src = result[i].url;
        photo.classList.add('catalog__photo');
        photo.innerHTML = result[i].title;      
        photo.setAttribute('alt', result[i].title);
        photo.setAttribute('data-id-photo', result[i].id);
        photo.setAttribute('title', result[i].title);

        // ОБРАБОТЧИК СОБЫТИЙ для img
        photo.onclick = (event) => {
          const currntUrl = event.target.getAttribute("src");
  		    $("body").append("<div class='popup'>"+ 						  
  						 "<img src="+currntUrl+" class='catalog__popup_img' />"+
  						 "</div>"); 
  		    $(".popup").fadeIn(800);	    
  		    $(".popup").click(function(){
  			    $(".popup").fadeOut(500);
  			    setTimeout(function() {
  			      $(".popup").remove();
  			    }, 500);
  			  });
        }      

        //создаем звезду
        const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        star.classList.add("catalog__star");
        star.setAttribute("aria-hidden","true");
        star.setAttribute('viewbox', '0 0 24 24');
        star.setAttribute('width', '24px');
        star.setAttribute('height', '24px');
        path1.setAttribute("idPhoto", result[i].id);
        path1.setAttribute("titlePhoto", result[i].title);
        path1.setAttribute("urlPhoto", result[i].url);
        path1.setAttribute('d', 'M0 0h24v24H0z');
        path1.setAttribute('fill', 'none');
        path2.setAttribute("idPhoto", result[i].id);
        path2.setAttribute("titlePhoto", result[i].title);
        path2.setAttribute("urlPhoto", result[i].url);
        path2.setAttribute('d', 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z');
        path2.setAttribute('fill', '#a0aec0');
        star.appendChild(path1);
        star.appendChild(path2);


        // ОБРАБОТЧИК СОБЫТИЙ для star
        star.onclick = function(event){
        const idPhoto = event.target.getAttribute("idPhoto");
        const titlePhoto = event.target.getAttribute("titlePhoto");
        const urlPhoto = event.target.getAttribute("urlPhoto");

        let dataPhoto = [];
        if(titlePhoto !== null){
          dataPhoto.push(titlePhoto, urlPhoto);
          localStorage.setItem(idPhoto, JSON.stringify(dataPhoto));
        }  

        event.target.classList.toggle("star_gold");
      }
        // создание элемента div
        let div = document.createElement('div');
        div.classList.add("catalog__album__container");

        // добавление эл-ов в DOM
        div.append(star);
        div.append(photo);
        openAlbum.append(div); // добавление элемета в DOM
      }     
    }  
  }
}

(function() { 
  document.addEventListener("opencatalog.html", openCatalog);  
})(this)