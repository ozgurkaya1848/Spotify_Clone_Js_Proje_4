export class UI{

// * Kurucu metot

constructor(){

    // * Html'deki elemanlara eriş

   this.list= document.querySelector("#list");

   this.form= document.querySelector("form");

   // * forma girilen input değere erişmek için ilk önce forma erişmemiz gerekir. Bu işlemleri ui.js de yaparız ve yukarıda form elemanını js'e çektik

   this.title= document.querySelector("#title");

   this.player=document.querySelector(".player");
}

// * Api'dan gelen şarkı verilerine göre arayüzü renderlayan fonksiyon

renderCards(songs){

    // ! Loader kısmı veriler beklenirken boş sayfada görünsün diye html'de list alanının içeriğini sıfırlarız.

    // * Html'de şarkı listelenen alanın içeriğini sıfırla

    this.list.innerHTML="";

    // * Dışarıdan verilen şarkı verisini kullanarak her bir şarkı için bir html oluştur.

    // * Bir html verisini dinamik bir cart  haline getirip kullanacaksak, dışarıdan gelen veriyi ne şekilde döneceğimiz önemlidir. Eğer bizi dizi şeklinde döneceksek map(), eleman şeklinde döneceksek forEach() kullanırız. Bu çalışmada aslında 2 metot da kullanılabilir ama biz forEach'i tercih ettik.

    songs.forEach((song)=>{

       

        // * Bir tane card elemanı oluştur

        // * Sıfırdan bir html elemanı javascriptte createelement komutu ile oluşturulur. biz normalde function içerisinde döndüğümüzden orada map() ile farklı dönerdik , burada class yapısı ile createelement ile oluşturacağız. createElement() parantezi ne oluşturacaksak a etiketi, div ,span, h1 bu her neyse bunu bizden ister.Biz aşağıda bid div oluşturacağız ve bunu card değişkenine atayacağız. Oluşturduğumuz bu card'ı console'a yazdırırsak 5 tane div döner çünkü biz api'dan 5 tane veri alırız.

        const card = document.createElement("div")


        // * Oluşturulan elemana car classı ekle

        // * Eğer card classını eklemezsek verdiğimiz still özelliklerinden bağımsız düzensiz bir elemanı arayüze vermiş oluruz, bundan dolayı istediğimiz arayüzü korumak için classı vermeliyiz.Class classlist.add ile eklenir(card.classList.add("card")). Bunun yerine bunun className'i card olacak da diyebiliriz. (card.className="card")

        card.classList.add("card");

        // * Card'a şarkıya ait resim, müzik, şarkı adı ve şarkıcı veya şarkı grubu adı bilgilerini ata

        // * Biz Card'a yukarıda bahsedilen özellikleri atamak için dataset'i kullandık. Atamak istediğimiz eleman card'dı misal atayacağımız özellik de title olsun, bunu card.dataset.title = yaparak içinde olduğumuz parantez yapı song, song'un title'ını atamalıyız, o da card.dataset.title=song.title şeklinde olur. Bazen atayacağımız elemanın konumunu kestiremeyiz, bu durumda aşağıdaki gibi içinde bulunduğumuz yapıyı console'a yazdırıp, inspect bölümünden aradığımız özelliğin konumuna bakarız, aşağıdaki mp3 örneğinde olduğu gibi, card'a mp3 özelliğini atayacağız, card.dataset.mp3 dedik ve eşitledik eşittirin karşısı, inspect yani incele bölümünden baktığımız kadarıyla mp3 song'un içerisindeki hub bölümün içerisindeki actions dizisinin 2. elemanının içerisindeki uri'dir bunu da card.dataset.mp3=song.hub.actions[1].uri şeklinde yani aşağıdaki gibi gösteririz. Bunu yaptıktan sonra inspect bölümündeki element kısmında car içerisinde eklediğimiz yapıları görürüz.

        

        card.dataset.title =song.title;
        card.dataset.subtitle= song.subtitle;
        card.dataset.image = song.coverarthq;
        card.dataset.mp3 = song.hub.actions[1].uri;

        // * Oluşturulan elemanın html'ini belirle.Her şarkı cardının içeriğini dinamik hale getir

        card.innerHTML = ` <figure>

                   

                    <img src="${song.images.coverarthq}" alt="card-image">

                    

                    <div class="play">
                      <i class="bi bi-play-fill"></i>
                    </div>



                  </figure>

                  <div class="card-info">

                    <h4>${song.title}</h4>
                    <h4>${song.subtitle}</h4>


                  </div>`


                // * Oluşturulan,içeriği belirlenen ve class atanan cardları Html kısmındaki liste içerisine aktar.Burada `this` kullanılmasının sebebi bir class içerisinde bu class içerisindeki yapıya erişmemiz

                // * List'e bu class içerisinde eriştik ve class içerisinde olduğunu gösteren this'i atadık, ondan sonra listi kullanırken this.list olarak belirtmemiz lazım.

       this.list.appendChild(card);
    });



}


// * Loader render eden fonksiyon

// * Aşağıda loader diye bir html eklemesi yaptık. Bu loader bölümünü uiverse sitesinde çalışmamızda geçen bölümü kopyalayarak alarak çalışmamıza ekledik. Bunu this.list ile eklememizin nedeni kopyaladığımız çalışmada loader'ın bizim list olarak adlandırdığımız ve şarkı kartlarının bulunduğu bölgede olması. Loader sayfa yenilendiğinde ve şarkı arattığımızda sonuç beklenirken ekranda yükleniyor mesajını veren görsel bölümdür. Yüklenme sürerken boş bir ekran gözükmesi yerine kullanılmıştır.

renderLoader(){


    this.list.innerHTML = `
        <div class="loader">
        <div class="cell d-0"></div>
        <div class="cell d-1"></div>
        <div class="cell d-2"></div>

        <div class="cell d-1"></div>
        <div class="cell d-2"></div>
  
  
         <div class="cell d-2"></div>
          <div class="cell d-3"></div>
  
  
          <div class="cell d-3"></div>
           <div class="cell d-4"></div>
  
  
          </div>`
}

// * Animasyon ekleyen fonksiyon

toggleAnimation(){

    // * Player içerisindeki image'e erişmeli

    // * İnfo içerisindeki image'e eriş .info img şeklinde gösterilir.

    const image= document.querySelector(".info img")

    // * Erişilen resime eğer animate classı yoksa bunu ekle varsa bunu kaldır
    
    image.classList.toggle("animate");
}


// * Player kısmını dinamik renderlayan fonksiyon

// * Bir fonksiyon bir html'i dinamik yapacaksa bu dinamiklik durumunu fonksiyona dışarıdan parametre atayarak sağlarız. Aşağıda bu parametre song'dur.

renderPlayer(song){

  console.log(song);


    // * Player kısmının içeriğini dışarıdan parametre olarak verilen değer ile dinamik renderla

    this.player.innerHTML = ` 
      <div class="info">
        <img
          src="${song.image}"
          alt=""
        />
        <div>
          <h5>${song.title}</h5>
          <p>${song.subtitle}</p>
        </div>
      </div>


      <audio
        controls
        autoplay
        src="${song.mp3}"
      ></audio>

 
      <div class="icons">
        <i class="bi bi-music-note-list"></i>
        <i class="bi bi-boombox"></i>
        <i class="bi bi-pc-display"></i>
      </div>`;


    //   * Şarkı resminin oynatılma durumuna bağlı olarak resime bir animasyon ekleyebilmek için audio etiketine play ve pause assEventListener'ları eklemeliyiz.

    // *Dinamik şarkı etiketi burada renderlandığından biz ancak dinamik şarkı etiketi özelliklerine burada,bu scope içerisinde erişebiliriz.

   const audio = document.querySelector("audio");


    // * Yukarıda oluşturduğumuz toggleAnimation fonksiyonunu aşağıda play yani şarkının başlaması ve pause durdurulması anında başlatıp durdurduk. Bu şu anlama geliyor, şarkı başladığında köşede ki şarkı resmi animasyonla dönüyor, durdurulduğunda şarkı duruyor.

   audio.addEventListener("play",this.toggleAnimation);
   audio.addEventListener("pause",this.toggleAnimation);



}

}