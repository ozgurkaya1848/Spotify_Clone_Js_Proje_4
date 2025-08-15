

// * API classını import et

import{API} from "./api.js";

// * UI classını import et

import{UI} from "./ui.js";



// * Bir classın örneğini almak "new" keywordü ile olur.


// * API Classını kullanabilmek için bunun  örneğini al

const api = new API();

// * Yukarıda API classını kullanabilmek için onun bir örneğini aldık. örnek almak için new keywordu kullanılır. Örneğini aldıktan sonra onu bir değişkene atadık.

// * UI classını kullanabilmek için bunun bir örneğini al

const ui = new UI();

// ! Sayfa yüklendiği anda api isteği at

document.addEventListener("DOMContentLoaded", async ()=>{

    

    // * Api'dan verileri çekene kadar ekran boş görünmemeli ve clonelanan çalışmada olduğu gibi yükleniyor mesajı veren bir görsel sayfada ,list bölümünde görünmeli

    // * Loader'ı render et

    ui.renderLoader();
    
    
    // * Api'dan data verilerini al ve data değişkenine ata

    const songs = await api.getPopular();

    // * Api'dan gelen veri ile cardları renderla

    ui.renderCards(songs);

   })

// * Sayfa yüklendiği anı yakalamk için addeventlistener ve domcontentloaded kullandık.


//  * yukarıda await eklemeden çalıştırırsak promise hatası alırız. async bir fonksiyon var elimizde ondan await ekledik



// *  Normalde Api isteklerinin const data = await api.getPopular(); veya  ui.renderCards(data); direk şeklinde atılması çok doğru değil. ondan document.addeventlistener içerisinde domcontentloader yani sayfa yüklendiği anda gelmesi talebiyle yazdık.

// * Ui.js'de js'e çektiğimiz form elemanına aşağıda erişiriz. Ve formun gönderilmesini izleriz. Bunu addeventlistener("submit",) ile yaparız.

// ! Form gönderildiğinde inputtaki değere eriş ve api'dan inputtaki kelimeye ait şarkıları al

ui.form.addEventListener("submit",async (e)=>{

    // * Form elemanı gönderildiğinde default olarak sayfa yenilenir. biz bunu engellemek için ve formu takip etmek için, ilk önce event(e) parametresi atadık yukarıya. sonra da aşağıda e.preventDefault(); kullandık. preventdefault sayfa yenilemesini engeller.

    // * Form gönderildiğinde sayfa yenilemesini engelle

    e.preventDefault();

    // * event (e) parametresini console'da görebiliriz. console.log(e) yaparak. console'da e.target ile tetiklenen olay izleyicisinin hedefini belirler. Bir gönderme olayıysa gönderen kim, bir tıklanma olayı ise tıklanan kim gibisinden. Burada gönderen eleman formdur. console'da target bölümünde formu görürüz. console'da form'un altında input elemanı vardır. Bizim amacımız girilen şarkıya erişmektir. yani input'a bundan dolayı e.target[0] deriz. Bunun nedeni console'da target dizisinin sıfırıncı elemanı inputtur. Biz e.target[0] yaptığımızda input'a erişiriz ama html gibi bir çıktı verir, ama biz aslında input'un değerine erişmek istiyoruz ona da e.target[0].value ile erişiriz. Hedef o dur. Girilen şarkı o dur. console.log(e.target[0].value); ile artık arattığımız kelimeyi, şarkıyı console da görürüz. Ama biz aşağıda query diye bir değişkene atayacağız, console yazdırmayacağız.

    
// * form göderildiğinde inputtaki değere eriş

    const query = e.target[0].value;

    // * Yeni bir şarkı girdiğimizde arayüzde verilere erişirken yine bir boşluk oluşur, o bölüme de bekleme anını göstersin diye eklediğimiz loader bölümünü render ederiz aşağıda olduğu gibi

    // * Eğer query değeri yoksa api isteği atma

    // * Yukarıda anlatılmak istenen biz bir şarkı arattığımızda şarkı gelene kadar loader ekranda görünür ama boş bir arama yaparsak yani arama yerine bir şey yazmadan ara butonuna tıklarsak o zaman ortaya çıkan loader sonsuza kadar döner, bunu engellemek için eğer query değeri yoksa api isteği atma işini yaparız.

    // *  aşağıda yapılacak İf(!query) işlemi hiçbir şey yazmadan gönderdiğimiz search bölümünün sonsuz loader döngüsüne girmesini engeller, fakat biz gider search bölümüne tıklar ve bir şey yazmadan boşluk bırakır sonra ara dersek tekrar döndüye gireriz. Bunu engellemek yani boşluk durumunu engellemek için .trim()'i de kullanırız, yani if(!query) değil if(!query.trim()) yazarız.

    if(!query.trim()){

        alert("Lütfen geçerli bir arama işlemi gerçekleştiriniz!!");

        // * Fonksiyonu durdur

        // * Return sadece fonksiyonu döndürmez aynı zamanda durdurur, eğer geçerli bir arama nesnesi girmezlerse, yani boş gönderirlerse, alert verir, ve fonksiyonu durdurur, yani ilerleyen satırdaki loader render olmaz.

        return;
    }



    // * Loader'ı render et

    ui.renderLoader();

    // * Aşağıda title diye bahsedilen seş section içerisindeki title, bunu dinamik şekilde renderlamazsak eminemi aratsak da popüler şarkılar yazacak, metallica aratsak da , biz orada kimi aratıyorsak ona dair bir şey yazmasını istiyoruz.

    // * Title'ı dinamik şekilde renderla

    ui.title.innerText=`${query} için sonuçlar`;



    // * Form içerisinden elde edilen query değeri ile api'a istek at ve gelen veriyi data'ya aktar

    const songs = await api.getSearchMusics(query);

    // * Aratılan şarkıları arayüze render et

    ui.renderCards(songs);


});


// ! Play ikonuna tıklayınca şarkı oynatma özelliği sağlayan fonksiyon

ui.list.addEventListener("click",(e)=>{

    // * Liste alanı içerisindeki play ikonuna tıklandıysa müzik çal

   if(e.target.className=="play"){



  // * Play ikonunun kapsayıcısı olan card'â eriş

//   * Bir elemanın kapsayıcısına parentElement ile erişiriz. Biz tıklanılan play butonunu takip ediyoruz, tıklanılan play'den card kapsayıcısına erişmek için 2 kere parentelement yapmalıyız.

  const card= e.target.parentElement.parentElement;

   

   // * Card'a atanan data özelliklerine [image,title,subtitle,mp3] eriş

   const songData = card.dataset;


      // * Player alanını dinamik olarak renderla

      ui.renderPlayer(songData);



   }
});



