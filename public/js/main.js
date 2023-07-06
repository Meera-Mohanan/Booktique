
async function searchabook() {
       
        let bookname = document.getElementById('searchbook').value;     
        const response = await fetch(`/googlebooks/search/${bookname}`);
        //const jsonData = await response.json();
        

        
        
         

}

