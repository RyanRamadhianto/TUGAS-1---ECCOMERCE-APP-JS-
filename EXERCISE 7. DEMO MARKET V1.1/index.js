// market v1.7


 /*  market version


    1. Tampilkan informasi stock saat user menginput quantity
    2. user akan diminta input ulang saat quantity yang diinput melebihi stock.
    3. user akan diminta input ulang saat uang yang diinput kurang dari seharusnya


*/
 
class Product{
    constructor(name, price, stock){
        this.name = name
        this.price = price
        this.stock = stock
        this.qty = 0
        this.total = 0
    }
}

class FastFood extends Product{
    constructor(name, price, stock, expired){
        super(name, price, stock)
        this.category = 1
        this.expired = expired
    }
}

class Cloth extends Product{
    constructor(name, price, stock, size){
        super(name, price, stock)
        this.category = 2
        this.size = size
    }
}

class Electronic extends Product{
    constructor(name, price, stock, warranty){
        super(name, price, stock)
        this.category = 3
        this.warranty = warranty
    }
}

class fruits extends Product{
    constructor(name, price, stock, sugar){
        super(name, price, stock)
        this.category = 4
        this.sugar = sugar
    }
}

const Products = [
    {category: 1, name : 'Noodle', price: 20000, stock: 8, expired : 2020},
    {category: 2, name : 'Hoodie', price: 15000, stock: 7, size : 'L'},
    {category: 3, name : 'Headphone', price: 20000, stock: 8, warranty : 'Yes'},
    {category: 4, name : 'Apel', price: 10000, stock: 5, sugar : 'High'},

]




const createList = (arr, header, kind= 1) => {
    let list = `${header}\n\n`;

    if(kind){
        arr.forEach((val, i) => {
            const{name, price, stock, category, expired, size, sugar, warranty} = val
            let newList = `${i}. NAME : ${name} || STOCK : ${stock} || PRICE : ${price}`;
            switch (category) {
                // fast food
                case 1:
                    newList += `|| EXP : ${expired}\n`
                break;
                // clothing
                case 2:
                    newList += `|| SIZE : ${size}\n`
                break;
                //  electronic
                case 3:
                    newList += `|| WARRANTY : ${warranty}\n`
                break;
                // fruit

                default:
                    newList += `|| SUGAR : ${sugar}\n`
                break;
            }

            list += newList
    });  
    } else {
        arr.forEach((val, i) => {
            const{name, price, qty} = val
            list += `${i}. ${name} || Rp.${price} || qty : ${qty}\n`
        });
    }

// arraya masuk ke arr dan header
    // val = {name, price, stock}
    

    return list
        
    };

var cart = []

while (true) {
    const menu = parseInt(prompt(`
    Apa yang ingin anda lakukan :
    1. Menampilkan daftar produk
    2. Menambah produk
    3. Menghapus produk
    4. Membeli produk
    5. Exit
`)
);

if(menu == 1) {
    // var fruitList = generateFruits()
    alert(createList(Products, "Daftar Produk"));


    // menambah buah
} else if(menu == 2) {1

    const catOpt = parseInt(
        prompt(
            `kategori produk yang ingin ditambahkan\n\n` +
            ` 1 . Cepat Saji \n` +
            ` 2 . Pakaian \n` +
            ` 3 . Elektronik \n` +
            ` 4 . Buah \n\n`
        ))


    // input nama harga, stock untuk buah yang baru
    const name = prompt("Masukkan nama produk:");
    const price = parseInt(prompt("Masukkan harga satuan :"));
    const stock = parseInt(prompt("Masukkan jumlah stock :"));

    let newProduct
    switch (catOpt) {
        // fast food
        case 1 :

            const expired = prompt('Masukkan waktu expired')
            newProduct = new FastFood(name, price, stock, expired)
            break ;

        // cloth
        case 2 :

            const size = prompt('Masukkan size produk :')
            newProduct = new Cloth(name, price, stock, size)
            break ;

        // electronic
        case 3 :

            const warranty = prompt('Masukkan status garansi :')
            newProduct = new Electronic(name, price, stock, warranty)
            break ;

        // fruits
        default:

            const sugar = prompt('Masukkan tingkat kadar gula :')
            newProduct = new fruits(name, price, stock, sugar)
            break ;
    }

    // array yang sudah jadi, di push ke array produk
    Products.push(newProduct);
    // menampilkan buah baru

    alert(createList(Products, "Daftar Produk"));


 } else if(menu == 3) {

// menampilkan daftar buah agar dipilih untuk dihapus
// menampilkan daftar buah untuk dihapus
// index dari buah terpilih akan dihapus
    const sellIndex = parseInt(prompt(createList(Products, "Menghapus Produk")));

    Products.splice(sellIndex, 1);

    // menampilkan list buah
    alert(createList(Products, "Daftar Produk"));


 } else if(menu == 4) {

    const carts = [];

    while (true) {
        const selIndex = parseInt(prompt(createList(Products, "Membeli Produk")));

    // menyimpan nama, harga, dan stock buah yang terpilih ke dalam variable tersendiri

    const {name, price, stock} = Products[selIndex]
    // jumlah stock yang ingin dibeli 
    while (true) {
        const qty = parseInt(prompt(`Masukkan quantity untuk ${name}, stock : ${stock} `)
    );

    if ( qty > stock) {
        alert(
            `Quantity yang diminta ${qty}, melebihi jumlah stock ${stock}`
        );
    } else {

        carts.push({name, price, qty});

        // kurangi stock buah yang dipesan
        Products[selIndex].stock -= qty;

        break;
    }
    }

    // tampilkan isi keranjang
    // carts

    const cartList = createList(carts, "Keranjang", 0);
    //  i = 0 1 2

    const again = prompt(`${cartList}\n\nIngin belanja lagi ? ( ya / tidak )`)

    if (again.toLowerCase() =="tidak") {
        break;
    }
    }
    // hitung belanjaan
    let finalPrice = 0;

    // menghitung total harga perbuah dan total keseluruhan
    // for (var i = 0; i < cart.length; i++) {
    //     cart[i][3] = cart[i][1] * cart[i][2];

    //     finalPrice += cart[i][3];
    // }

    carts.forEach((cart)  => {
    
        cart.total = cart.qty * cart.price

        finalPrice += cart.total;

    });

    let finalReport = "";

    // for(var i = 0; i < cart.length; i++) {
    //     finalReport += `${cart[i][0]} : ${cart[i][1]} * ${cart[i][2]} = ${cart[i][3]}\n`
    // }

    carts.forEach((cart)  => {
        const {name, price, qty, total} = cart
    
        finalReport += `${name} : ${price} * ${qty} = ${total}\n`
    });


// while bill yang harus dibayar
while(true) {
        // Menampilkan informasi belanja
        const money = parseInt(prompt(`Detail Belanja\n\n${finalReport}\n\nTotal : ${finalPrice}`))
        
        const margin = Math.abs(money - finalPrice);
     
        if(money < finalPrice){
            alert(`Uang yang Anda masukkan masih kurang ${margin}, total belanja ${finalPrice}`)
        } else {
        if (money > finalPrice) {
            alert(`Terimakasih, uang kembalian Anda ${margin}`);
        } else {
            alert(`Terimakasih`);
        }

        cart = [];

        break;
}
    }
 } else {
     break
 }
}

function generateFruits(){
    var fruitList = 'Daftar buah\n\n';
    //  i = 0 1 2
    // // for(var i = 0; i < fruits.length; i++){
    //     fruitList +=  `${i}. ${fruits[i][0]} || Rp.${fruits[i][1]} || ${fruits[i][2]} \n`;
    // }

    fruits.forEach((item, i, fruits)  => {
        fruitList +=  `${i}. ${fruits[i][0]} || Rp.${fruits[i][1]} || ${fruits[i][2]} \n`;
    
    })
    return fruitList
}

// // meminta user input quaantiti untuk setiap buahnya
// var qtyApple = parseInt (prompt('Masukan jumlah qty Apel'))
// // jika qty melebihi stock yang ada
// if (qtyApple > stockApple){

//     alert(`permintaan qty melebihi stock, qty akan terisi sesuai jumlah stock yaitu : ${stockApple}`)

//     qtyApple = stockApple

// }j

// var qtyGrape = parseInt (prompt('Masukan jumlah qty Anggur'))
// // jika qty melebihi stock yang ada
// if (qtyGrape > stockGrape){

//     alert(`permintaan qty melebihi stock, qty akan terisi sesuai jumlah stock yaitu : ${stockGrape}`)

//     qtyGrape= stockGrape

// }

// var qtyOrange = parseInt (prompt('Masukan jumlah qty Jeruk'))
//  // jika qty melebihi stock yang ada
// if (qtyGrape > stockGrape){

//     alert(`permintaan qty melebihi stock, qty akan terisi sesuai jumlah stock yaitu : ${stockGrape}`)

//     qtyOrange = stockOrange

// }




// // hitung harga total masing-masing buah
// var totalApple = qtyApple * priceApple
// var totalGrape = qtyGrape * priceGrape
// var totalOrange = qtyOrange * priceOrange

// // total keseluruhan
// var finalPrice = totalApple + totalGrape + totalOrange

// while (true){
//     // memunculkan informasi menggunakan prompt sekaligus meminta user menginput sejumlah nominal
// var money = parseInt(
//     prompt(`
//     Detail Belanja

//     Apel : ${qtyApple} x ${priceApple} - ${totalApple}
//     Anggur : ${qtyGrape} x ${priceGrape} - ${totalGrape}
//     Jeruk : ${qtyOrange} x ${priceOrange} - ${totalOrange}

//     Total : ${finalPrice}
//     `)
// )

// var margin = Math.abs(money - finalPrice)

// if(finalPrice > money){

//     alert(`Uang yang anda masukkan kurang ${margin}`);

// } else if (money > finalPrice){

//     alert(`Terimakasih, Uang kembali untuk Anda ${margin}`)

//     break

// } else {

//     alert(`Terima Kasih`);

//     break
// }
// 