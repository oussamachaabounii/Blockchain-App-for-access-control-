pragma solidity ^0.5.0;

contract Owned {
    address owner;
    
    constructor() public {
        owner = msg.sender;
    }
    
   modifier onlyOwner {
       require(msg.sender == owner);
       _;
   }
}

contract ACL is Owned{
    address public owner = msg.sender;
  

    struct AccessRight {
        bool read;
        bool write;
        bool exec;
    }
    
    event setAclInfo(
        address requester,
        string resource,
        bool read,
        bool write,
        bool exec
        );
       
 
    mapping (address=>mapping (string => AccessRight)) acl;
    
    address[] public reqAccts;
    
    mapping (address => string) requestAccts;
  
    mapping (address => uint256)  last_ACL_index;
    
    //AccessRight[] aclAttribute;

    constructor() public {
         owner= msg.sender;
        
    }

    function setAclAtb(address _address,bool _read, bool _write, bool _exec,string memory _resource ) onlyOwner public {
        
   //var aclAttribute = acl[_address];
         acl[_address][_resource].read=_read;
         acl[_address][_resource].write=_write;
         acl[_address][_resource].exec=_exec;
        last_ACL_index[_address]++;
        
       reqAccts.push(_address) -1;
        emit setAclInfo(_address,_resource,_read,_write,_exec);
}
    
    function countList() view public returns (uint256){
        return reqAccts.length;
    }

    function getAclAtb(address ins,string memory resource) view public returns (bool,bool,bool) {
        return (acl[ins][resource].read, acl[ins][resource].write, acl[ins][resource].exec);
     
    }
    
    function countRequtsForAddress(address req) view public returns (uint) {
        return last_ACL_index[req];
    }
    
    
  

    function hasRightRead(address req,string memory resource) view public returns(bool){
        return (acl[req][resource].read);

    }
    
    
    function hasRightWrite(address req,string memory resource) view public returns(bool){
        return (acl[req][resource].write);

    }
    
    
    function hasRightExec(address req,string memory resource) view public returns(bool){
        return (acl[req][resource].exec);

    }
    
    function hasRight(address req, string memory ms,string memory resource) view public returns (bool){
    
        bytes memory m1= bytes (ms);
        
        uint nbr=1;
      
        for(uint i=0; i< m1.length; i++){
            
          
            
            if (m1[i] == ","){
                nbr++;
            }
        }
        
        
        if (nbr==3){
            if( keccak256(abi.encodePacked(ms))== keccak256(abi.encodePacked("read,write,exec"))||keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("read,exec,write"))||keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("write,read,exec"))||keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("write,exec,read"))||keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("exec,read,write"))||keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("exec,write,read"))){
                
                if(hasRightRead(req,resource) && hasRightWrite(req,resource) && hasRightExec(req,resource)){
                    return true;
                }
                else return false;
            }
            
            else return false;
        }
        
        else if(nbr==2){
            if( keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("read,write"))||keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("write,read"))){
               if(hasRightRead(req,resource) && hasRightWrite(req,resource)){
                    return true;
                }
                else return false;
                
            }
            else if(keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("read,exec"))||keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("exec,read"))){
                if(hasRightRead(req,resource) && hasRightExec(req,resource)){
                    return true;
                }
                else return false;
                   
            }
            
            else if(keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("write,exec"))||keccak256(abi.encodePacked(ms))== keccak256(abi.encodePacked("exec,write"))){
                if(hasRightWrite(req,resource) && hasRightExec(req,resource)){
                    return true;
                }
                else return false;
                   
            }
            else return false;
            
        }
        else if (nbr==1){
            if(keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("read")) && hasRightRead(req,resource))
            return true;
            else if (keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("write")) && hasRightWrite(req,resource))
            return true;
            else if(keccak256(abi.encodePacked(ms))==keccak256(abi.encodePacked("exec")) && hasRightExec(req,resource))
            return true;
            else return false;
        }
        
        else return false;
    
    
 
        
    }

   
    
}




