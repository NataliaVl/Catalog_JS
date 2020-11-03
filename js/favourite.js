function openFavorite(){
  
  let favouriteList = $(".favouriteList");

  showPhoto(favouriteList);   
  
  function showPhoto(favouriteList){
    for(let i=0; i<localStorage.length; i++) {
      const idPhoto = localStorage.key(i);
      const data = JSON.parse(localStorage.getItem(idPhoto));    
      const title = data[0];
      const url = data[1];
    
      // создаем элемент списка
      const titlePhoto = document.createElement("li");
      titlePhoto.classList.add("favourite__titlePhoto");
      titlePhoto.innerHTML = title;
      titlePhoto.setAttribute("url", url);
  
      // событие для элемента списка
      titlePhoto.onclick = event => {
        const currntUrl = event.target.getAttribute("url");
        $("body").append("<div class='popup'>"+ 
              "<img src="+currntUrl+" class='favourite__popup_img' />"+ 
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
      star.classList.add("svg");
      star.setAttribute("idPhoto", idPhoto);
      star.setAttribute("aria-hidden","true");
      star.setAttribute('viewbox', '0 0 24 24');
      star.setAttribute('width', '24px');
      star.setAttribute('height', '24px');
      path1.setAttribute("idPhoto", idPhoto);
      path1.setAttribute('d', 'M0 0h24v24H0z');
      path1.setAttribute('fill', 'none');
      path2.setAttribute("idPhoto", idPhoto);
      path2.setAttribute('d', 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z');
      path2.classList.add("star_gold");
      star.appendChild(path1);
      star.appendChild(path2);
      
      // событие для звезды
      star.onclick = function(event){
        const idPhoto = event.target.getAttribute("idPhoto");
        localStorage.removeItem(idPhoto);
        favouriteList.empty();
        showPhoto(favouriteList);
      }  
    
      //создаем div контейнер
      const containerTitleAlbum = document.createElement("div");
      containerTitleAlbum.classList.add("favourite__containerTitleAlbum")
      
      // отрисовка всех эл-ов
      containerTitleAlbum.append(star);
      containerTitleAlbum.append(titlePhoto);
      favouriteList.append(containerTitleAlbum);
    }
  }
}

(function() {
  document.addEventListener("openfavourite.html", openFavorite);  
})(this);



