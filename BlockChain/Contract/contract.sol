pragma solidity ^0.4.0;

contract Nummum {
    
    address private owner;
    uint private totalbalance;
    uint private weekprice;
    uint private ticketprice;
    

    event Sent(string msg ,address from,  uint amount);

    function Nummum() public {
        owner = msg.sender;
    }
    
    modifier _isOwner(){
        require(msg.sender == owner);
        _;
    }
    
    function () public payable {
        if( (msg.value / weekprice) == 1 ){
            totalbalance = totalbalance + msg.value;
            Sent('Week',msg.sender,msg.value);
        }
        else if((msg.value / ticketprice) == 1 ){
            totalbalance = totalbalance + msg.value;
            Sent('Tickets',msg.sender,msg.value);
        }
        else if ( (msg.value / (weekprice*4)) == 1 ){
            totalbalance = totalbalance + msg.value;
            Sent('Month',msg.sender,msg.value);
        }
        else {
            revert();
        }
    }

    function changeWeeKprice( uint amountWeek) _isOwner() public {
        
            weekprice = amountWeek;
        
    }
    
    function changeTicketprice( uint amountticket) _isOwner() public {
        //require(msg.sender == owner);
        
            ticketprice = amountticket;
        
    }
    
    function cashout() public _isOwner() {
       
            msg.sender.transfer(totalbalance);
        
    }
}