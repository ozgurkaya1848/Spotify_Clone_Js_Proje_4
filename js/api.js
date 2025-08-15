// Özellikle kapsam api'a lara istek atıldığında bizim kim olduğumuzu tespit edebilmek için bir options objesi  verir.Bu options objesi bizim kim olduğumuzu api'a belirtir.Bunu bir spor salonundaki üyelik kartı uygulamasına benzetebiliriz.

// * Bu options durumuna basit api'larda ihtiyaç duymayabiliriz, fakat bu çalışmada kullandığımız tarzda büyük Api'larda ihtiyaç duyarız.

// * Hocanın verdiği kimliği yapıştırdığımızda rapidapi limiti dolduğundan kendimiz üyelik alıp, o options kimlik tanıtımını ve şarkıcı url'ini aşağıda yeniledik ve hatasız Api'yı alabildik.

// * Bu options bölümünü eklemezsek 401 hatası yani Unauthorized kimlik hatası alırız. Aşağıdaki gibi options bölümünü ekleriz. Bu arada bunu ekledikten sonra aşağıdaki gibi URL bölümünün sonuna bu options değişkenini de yazarız.

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'a6e672d94dmsh356d2913c790ce0p1cfdf2jsn665b94aa1e36',
		'x-rapidapi-host': 'shazam.p.rapidapi.com'
	}
};



export class API {

    // * Popüler müzikleri api'dan alan fonksiyon

    async getPopular(){

        // * Api'ya istek at ve gelen veriyi projede kullunılacak formata dönüştür

        try { 

            const response = await fetch('https://shazam.p.rapidapi.com/search?term=duman',options);
     
           // * Api'dan gelen cevabı Js nesnesine çevir
     
           const data=  await response.json();
     
         //   * Biz Api'dan çektiğimiz data içerisindeki track değerinin içerisindeki hits'ler le ilgileniriz, fakat biz bunu direk return edersek, her dönen değer için data.tracks.hits yazmak zorundayız, bundan dolayı bunu map() ile döneriz.data içerisindeki tracks içerisindeki hits bir dizi gel bu diziyi map ile dön ve map'e item parametresini ata ve her bir item içerisindeki track değerini bana döndür.
     
         // * Api'dan gelen veriyi proje içerisinde kullanabileceğimiz formata çevirdik
     
           const formattedData = data.tracks.hits.map((item)=>item.track)
     
           // *Fonksiyon çağırıldığında formattedData'yı return et
     
           return formattedData;
            
        } catch (error) {

            // * Eğer hata alınırsa bunu yakala ve alert ile kullanıcıya uyarı ver

            alert(error);
            
        }

       

    }



    // * Aratılan kelimeye göre şarkıları api'dan alan fonksiyon

    async getSearchMusics(query){

        // *  Aratılan kelimeye göre Api'dan şarkıları al ve projede kullanılacak formata dönüştür

        try {

        // *Api'a istek at

       const res= await fetch(`https://shazam.p.rapidapi.com/search?term=${query}`,options);

       const data = await res.json();
    
       // * Api'dan gelen veriyi proje içerisinde kullanabileceğimiz formata çevirdik
    
       const formattedData = data.tracks.hits.map((item)=>item.track)
    
           
    
            
    
          // *Fonksiyon çağırıldığında formattedData'yı return et
    
          return formattedData;
            
        } catch (error) {

            // * Eğer hata alınırsa bunu yakala ve alert ile kullanıcıya uyarı ver

            alert(error);
            
        }




    }


        

}