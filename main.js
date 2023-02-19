const seats = [[3,2], [4,3], [2,3], [3,4]] 
const No_Of_Passenger = 30
var Total_Seats = 0
var Total_Seats_Remaining = 0 
var visualize = []
var totalAisle = 0
var totalAisleAssigned = 0 
var totalwindow = 0
var totalwindowAssigned = 0 
var totalmiddle = 0
var totalmiddleAssigned = 0 
var total_columns = 0
var total_rows = 0

for(let i=0;i<seats.length;i++){
    Total_Seats += seats[i][0] * seats[i][1] 
    total_columns += seats[i][0]
    total_rows = (total_rows <= seats[i][1])?seats[i][1] : total_rows;
    Total_Seats_Remaining = Total_Seats
    visualize.push(new Array(seats[i][1]).fill('*').map(()=> new Array(seats[i][0]).fill('*')))
}

function isAisleSeatValid(){
    if(totalAisleAssigned < No_Of_Passenger){ 
        return true
    }
    else{
        return false
    }
}

function isWindowSeatValid(){
    var n = No_Of_Passenger - totalAisle; 
    if(n>0){
        if(totalwindowAssigned < n){ 
               return true
            }
            return false 
        }
    else{
            return false
        }
 
}

function isMiddleSeatValid(){
    var n = No_Of_Passenger - totalAisle - totalwindow; 
    if(n>0){
        if(totalmiddleAssigned < n){ 
                return true
            }
            return false
        }
    else{
        return false
    }
 
}

 
function calculateSeats(len,arr,i){ 
    if(i == len-1){
        totalwindow += arr[i].length
        totalAisle += (arr[i][0].length>1)?arr[i].length:0; 
        totalmiddle += (arr[i][0].length>2)?(arr[i][0].length - 2) * arr[i].length : 0 ;
        
        return;
 
        }
    else{
        if(i==0){
            totalwindow += arr[i].length
            totalAisle += (arr[i][0].length>1)?arr[i].length:0; 
            totalmiddle += (arr[i][0].length>2)?(arr[i][0].length - 2) * arr[i].length : 0 ;
        }
        else{
            totalAisle += (arr[i][0].length>1)?arr[i].length * 2 : arr[i].length
            totalmiddle += (arr[i][0].length>2)?(arr[i][0].length - 2) * arr[i].length : 0 ;
        }
        return calculateSeats(len,arr,++i)
        }
}
 

function  fillSeats(len,arr,index,col){
    if(col == len-1){
        if(arr[col].length -1 >= index){
            if((arr[col][index].length == 1) & isWindowSeatValid()){ 
                for(let i=0 ;i<arr[col][index].length;i++){
                    arr[col][index][i] = totalAisle + totalwindowAssigned + 1
                    totalwindowAssigned += 1
                }
            }
            else if(arr[col][index].length == 2){
                for(let i=0 ;i<arr[col][index].length;i++){
                    if(i==0 & isAisleSeatValid()){ 
                        arr[col][index][i] = totalAisleAssigned + 1
                        totalAisleAssigned +=1
                    }
                    else if(isWindowSeatValid()){ 
                        arr[col][index][i] = totalAisle + totalwindowAssigned + 1    
                        totalwindowAssigned += 1
                    }
                }
            }
            else{
                for(let i=0 ;i<arr[col][index].length;i++){ 
                    if(i==0 & isAisleSeatValid()){
                        arr[col][index][i] = totalAisleAssigned + 1
                        totalAisleAssigned +=1
                    }
                    else if((i== arr[col][index].length -1) & isWindowSeatValid()){ 
                        arr[col][index][i] = totalAisle + totalwindowAssigned + 1
                        totalwindowAssigned += 1
                    }
                    else if(isMiddleSeatValid()){ 
                        arr[col][index][i] = totalAisle + totalwindow + totalmiddleAssigned + 1
                        totalmiddleAssigned +=1
                    }
                }
            }
            if(index < len-1){
                return fillSeats(len,arr,index+1,0)
            }
            else{
                return ;
            }
        }
    }
    else{
        if(col==0){
            if(arr[col].length -1 >= index){
                for(let i=0 ;i<arr[col][index].length;i++){
                    if(i==0 & isWindowSeatValid()){ 
                        arr[col][index][i] = totalAisle + totalwindowAssigned + 1
                        totalwindowAssigned += 1
                    }
                    else if((i== arr[col][index].length -1) & isAisleSeatValid()){ 
                        arr[col][index][i] = totalAisleAssigned + 1
                        totalAisleAssigned +=1
                    }
                    else if(isMiddleSeatValid()){ 
                        arr[col][index][i] = totalAisle + totalwindow + totalmiddleAssigned + 1
                        totalmiddleAssigned +=1
                    }
                }
            }
        }
        else{
            if(arr[col].length -1 >= index ){
                for(let i=0 ;i<arr[col][index].length;i++){
                    if((i==0 || i== arr[col][index].length -1) & isAisleSeatValid()){ 
                        arr[col][index][i] = totalAisleAssigned + 1
                        totalAisleAssigned +=1
                    }
                    else if(isMiddleSeatValid()){ 
                        arr[col][index][i] = totalAisle + totalwindow + totalmiddleAssigned + 1
                        totalmiddleAssigned +=1
                    }
                }
            }
        }
        fillSeats(len,arr,index,col+1)
    }               
}

calculateSeats(visualize.length,visualize,0)
console.log("Total Passenger : ",No_Of_Passenger) 
console.log("Total Seats : ",Total_Seats) 
console.log("Total column : ",total_columns) 
console.log("Total rows : ",total_rows) 
console.log("Total Aisle : ",totalAisle) 
console.log("Total Window : ",totalwindow) 
console.log("Total Middle : ",totalmiddle) 

if(No_Of_Passenger <= Total_Seats){
    fillSeats(visualize.length,visualize,0,0)
}
else{
    console.log(`[-] Cant Handle! Passengers are more than seats or
    ${((No_Of_Passenger - Total_Seats)==1)?`${No_Of_Passenger - Total_Seats} passenger`:`${No_Of_Passenger - Total_Seats} passengers`} has to wait!` )
}

console.log(visualize)
