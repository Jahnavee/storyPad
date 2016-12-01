/**
 * Created by Sony on 11/17/2016.
 */
//using of jquer-3.1.1.min for confirmation of deleting
$('.confirmation').on('click',function () {
    return confirm('Are you sure you want to delete? ');
});

//password to check register form
var validator = $('#registerForm').validate({
   rules:{
       confirm:{
           required: true,
           equalTo:'#password'
       }
   },
    messages:{
       confirm:{
           equalTo: 'Your Password do not match'
       }
    }
});