$(document).ready(function(){
   

    $("#myform").submit(function(){
        const search=$("#books").val();
        if(search=='')
        {
            alert("Please enter something in the field first");
         }
        
    });

    else{
        const url='';
        const img='';
        const title='';
        const author='';

        $.get("https://www.googleapis.com/books/v1/volumes/?q="+ search,function(response){})
    }
      
});
    return false;
