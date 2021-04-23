var productList = [
    {
        name: "T shirt",
        price: 345,
        category : "shoe",
        imgUrl : "./images/product2.jpg"
    },
     {
        name: "Bag",
        price: 200,
        topProduct: true,
        category : "shirts",
        imgUrl : "./images/product4.jpg"
    },
    {
        name: "Suit",
        price: 672,
        category: "bag",
        imgUrl : "./images/product5.jpg"
    },
     {
        name: "Suit",
        price: 780,
        category: "shoe",
        imgUrl : "./images/product6.jpg"
    },
     {
        name: "Shoe",
        price: 685,
        topProduct: true,
        category: "speaker",
        imgUrl : "./images/product9.jpg"
    },
    {
        name: "Suit",
        price: 610,
        topProduct: true,
        category: "speaker",
        imgUrl : "./images/product5.jpg"
    },
    {
        name: "Bag",
        price: 276,
        topProduct: true,
        category: "speaker",
        imgUrl : "./images/product7.jpg"
    },
    {
        name: "Shoe",
        price: 450,
        topProduct: true,
        category: "speaker",
        imgUrl : "./images/product10.jpg"
    },
    {
        name: "Shoe",
        price: 760,
        topProduct: true,
        category: "speaker",
        imgUrl : "./images/product8.jpg"
    }
];

var category = ['Suits', 'Shoes', 'Bags', 'T shirt']

 var categoryItem = '';
    category.forEach((obj, index)=> {
        categoryItem += `<p>${obj}</p>`
    })

document.getElementById('category-list').innerHTML = categoryItem

    var dropdownlist = '';

    category.forEach((obj, index)=> {
        dropdownlist += `<option>${obj}</option>`
    })
document.getElementById('categoryListSelect').innerHTML = dropdownlist  



document.getElementById("sortingRange").value = "default";
document.getElementById('product-total').innerHTML = productList.length;
document.getElementById("input-product-file").value = null;
document.getElementById("input-product-name").value  = null;
document.getElementById("input-product-price").value = null;


// product listing in onload 
getProductList(productList);


// document.querySelector("addProductForm").addEventListener("click", function(event) {
//          event.preventDefault();
// }, false);

// to add the product's item
function addProduct(){
  
   let name = document.getElementById("input-product-name").value;
    let price= document.getElementById("input-product-price").value
    let inputFile = document.getElementById("input-product-file").files[0];
    let isTopProduct = document.getElementById('topProduct').checked 

    if(!name){
        document.getElementById("error-msg-title").innerHTML = "Please Enter the Title";
        return
    }
     document.getElementById("error-msg-title").innerHTML = "";


    if(!price){
        document.getElementById("error-msg-price").innerHTML = "Please Enter the Price";
        return
    }
    document.getElementById("error-msg-price").innerHTML = "";

    if(!inputFile){
        document.getElementById("error-msg-file").innerHTML = "Please Upload the file";
        return
    }
    document.getElementById("error-msg-file").innerHTML = "";


    const file = inputFile;
    const reader = new FileReader();

    reader.onloadend = () => {
        productList.push({
            name: name,
            price: price,
            category: "dress",
            topProduct : isTopProduct,
            imgUrl : reader.result
        })
        getProductList(productList);    
    };
    reader.readAsDataURL(file);
    document.getElementById("input-product-name").value = null
    document.getElementById("input-product-price").value = null
    document.getElementById("input-product-file").value = null ;
    document.getElementById("errormsg").innerHTML = "";
    document.getElementById('fileName').innerHTML = "";
    document.getElementById("cancelBtn").click();
     document.getElementById('topProduct').checked = false;
}

function getFileName(){
    let file = document.getElementById('input-product-file')
    document.getElementById('fileName').innerHTML = file.files[0].name
     document.getElementById('error-msg-file').innerHTML = ""
}

function sortProduct(){
    var range = document.getElementById('sortingRange').value;
    var sortedProduct = [];
    let products =  JSON.parse(JSON.stringify(productList)) ;
    if(range == 'low'){
        sortedProduct = products.sort(function(a,b){
            return a.price - b.price;
            }
        );
    }
    if(range == 'high'){
        sortedProduct = products.sort(function(a,b){
            return b.price - a.price;
            }
        );
    }
    if(range == "default"){
        sortedProduct = productList
    }

    getProductList(sortedProduct, true);
}


function getProductList(products, disableTopProductSort){
    // Show Product List 
    var productItem = '';
    var topProducts = '';
    products.forEach((obj, index)=> {

    productItem += `<div class="col-12 col-sm-4">
                <div class="card mb-3">
                <img src=${obj.imgUrl} alt="Card image cap">
                <div class="card-body text-center">
                    <h5>${obj.name}</h5>
                    <p>${obj.price}</p>
                </div>
                <br>
            </div>
        </div>`

        if(obj.topProduct){

              topProducts += ` <section class="row py-2">
                            <div class="col-4">
                                <img src=${obj.imgUrl}>
                            </div>
                            <div class="col-8">
                                <h6>${obj.name}</h6>
                                <div class="rating">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </div>
                            </div>
                        </section>`

        }
    })
   document.getElementById('product-item').innerHTML = productItem;

   if(!disableTopProductSort){
        document.getElementById('top-products').innerHTML = topProducts; 
   }
}

function uploadBtn(){
    document.getElementById("input-product-file").click()
}




