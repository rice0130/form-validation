//form_validation.js

//1) Store all the inputs from the user to the variables
//2) Do all validation on your form to ensure the information to be passed to the backend are correct
//3) If all information is correct, add all the information into an object array (e.g. formList)
//4) Print out the formList to check if the information are in the object array

//validate form, get data of form
const formList =[];
let checkboxChecked=[];
let isChecked = false;
const checkboxes = document.querySelectorAll("input[type=checkbox]");
//NodeList : List of input HTML ELEMENT, not able to do filter or map
//Covert Nodelist to Array to make use of filter/map
function addForm(){

    console.log("in the addform function");
    //create variables to store the values from the form

    const name = document.querySelector("#full_name").value;
    const email = document.querySelector("#email").value;
    const tourPackage = document.querySelector("#tour_package").value;
    const arrivalDate = document.querySelector("#arrival_date").value;
    const paxNum = document.querySelector("#num_pax").value;
    const discount = document.querySelector("#discount").value;
    //check if any of the checkbox is checked, radio
    // if check is NOT true 
    if(!isChecked) {
        //Show custom built -in  validation message
       document.querySelector("#c_food").setCustomValidity("Please select at least one experience");//custom message for validity
       document.querySelector("#c_food").reportValidity();//report the message on the screen
     }
     else
     {
       //submit the form- in this case: add the form value to an Array
       console.log("Form is submitted.");
       addToList(name,email, tourPackage, arrivalDate,paxNum,checkboxChecked,discount);
       
      
     }
}

function addToList(name,email, tourPackage, arrivalDate,paxNum,checkBoxItems,discount){
    //Just adding the list of item into the array, and push the array to formList object
    //Array of Objects
    //Item object that contain one set of property and value of the inputs
   const item ={
        name:name, //property of object: value
        email:email,
        tourPackage: tourPackage,
        arrivalDate: arrivalDate,
        paxNum: paxNum,
        experience: checkBoxItems,
        discount:discount
        // name, //property of object: value
        // email,
        // tourPackage,
        // arrivalDate,
        // paxNum,
        // experience,
        // discount
   }
    // push the item to FormList( array of objects)
     formList.push(item);

    //clear the form for the next input
    clearForm();
    console.log(`Total submission: ${formList.length}:`,formList);

}   

function clearForm(){

    document.querySelector("#full_name").value="";
    document.querySelector("#email").value="";
    document.querySelector("#tour_package").value="";
    document.querySelector("#arrival_date").value="";
    document.querySelector("#num_pax").value="";
    document.querySelector("#discount").value="";
    //clear the select option back to first element: "select"
    document.querySelector("#tour_package").selectedIndex="0";
   
    checkboxes.forEach( checkbox => {
       checkbox.checked =false;
    });
    document.querySelector("#radio_agree").checked=false;
   }

   //Validation on checkbox- user has to check at least one experience
   // check if any of the checkboxes is being checked

   checkboxes.forEach( checkbox => {

     checkbox.addEventListener("change", function(){

      checkboxChecked = Array.from(checkboxes)
      .filter( element => element.checked)
      .map(element => element.value)
      
      console.log(checkboxChecked);

       if(checkboxChecked.length> 0){
           
          //remove the CustomValidity message
          document.querySelector("#c_food").setCustomValidity("");
          document.querySelector("#c_food").reportValidity();
          isChecked = true;
       }
       else {
           isChecked= false;
       }

    })
   });


   //Date format

   //set the min and max date for selection of the arrival date
   //limit is one month e.g. today's date is min:2021-08-17, max:2021-09-17
   const dateFormat = 10;
   const today= new Date(); 
   let day = today.getDate(), month = today.getMonth()+1, year = today.getFullYear();
   let daysOfMonth;
   //let nextMonth = month + 1;
   //getMonth- jan return 0, Feb return 1.....
   // console.log(day, month, year);
   //format the dd/mm/yyyy
   //e.g. day is 1, format to 01, month is 8, format to 08
   if( month == 12){
     nextMonth = 1;
   }
   else{
     nextMonth = month + 1;
   }
    if( month ==1 || month ==3 || month==5 || month==7 ||month==8 || month==10 ||month==12){
      daysOfMonth = 31;
    }
    else if(month ==4 ||month ==6 || month==9 || month==11){
      daysOfMonth = 30;
    }
    else {
      daysOfMonth = 28;
    }
    
     nextday = day-1;
    if(nextday==0){
      nextday= daysOfMonth;
    } 
  
   

   day = setDateFormat(day);
   month = setDateFormat(month);
   nextday=  setDateFormat(nextday);
   nextMonth = setDateFormat(nextMonth);
   console.log(day,month,year);
   
   let todayDate = year + "-" + month + "-" + day;
   let nextMonthDate = year + "-" + nextMonth +"-"+ nextday;
   
   
   console.log(todayDate, nextMonthDate);

   document.querySelector("#arrival_date").setAttribute("min", todayDate);
   document.querySelector("#arrival_date").setAttribute("max", nextMonthDate)
   function setDateFormat(d){
    //format the day to dd or month to mm
    if(d < dateFormat) 
    {
       d="0"+ d;
    }
    return d;
   }