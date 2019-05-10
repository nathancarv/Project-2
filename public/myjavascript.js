console.log('hello this is my js hehhhhhhhhh')


$('#search').keyup(function(e){
    console.log(this.value)
    let v  = this.value
    let theFilteredItems = theItems.filter(function(item){
        return item.name.includes(v)
    })

    let html = ''
    
    for(let i=0; i<theFilteredItems.length; i++){ //Loops through all 3 items
        //console.log(theFilteredItems[i])
        html +=  `<li class="list-group-item"><a href="/details/${theFilteredItems[i]._id}">${theFilteredItems[i].name}</a></li>`
        // for(let j=0; j<theFilteredItems[i].available.length; j++){ //Loops through the available in each one 
        //      html += `<ol>${theFilteredItems[i].available[j].location}</ol>` + `<ol>$${theFilteredItems[i].available[j].price}</ol>`
        // }
    }
    console.log('v is', v, typeof v, v=='')
    if(v == ''){
        html = ''
    } 
       
    $('#productList').html(html)

})
console.log(theItems)

