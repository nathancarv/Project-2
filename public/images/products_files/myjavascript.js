console.log('hello this is my js')

// let items = [
//     {name: 'iPhone'},{name:'Macbook Pro'}, {name:'Toaster'}
// ]


$('#search').keyup(function(e){
    console.log(this.value)
    let v  = this.value
    let theFilteredItems = theItems.filter(function(item){
        return item.name.includes(v)
    })
    //console.log(theFilteredItems) //Recreate the page with this new data. 

    let html = ''
    
    for(let i=0; i<theFilteredItems.length; i++){ //Loops through all 3 items
        console.log(theFilteredItems[i])
        html +=  `<a href="/details/${theFilteredItems[i]._id}">${theFilteredItems[i].name}</a><br>`
        // for(let j=0; j<theFilteredItems[i].available.length; j++){ //Loops through the available in each one 
        //      html += `<ol>${theFilteredItems[i].available[j].location}</ol>` + `<ol>$${theFilteredItems[i].available[j].price}</ol>`
        // }
    }

    // let result = a.map(element => {
    //     return `<li>${element.name} </li>`
    // });

    // let result = a.map(element=>{
    //     return `<li>${element.available.location.price} </li>`
    // });

    $('#products').html(html)
})
console.log(theItems)

