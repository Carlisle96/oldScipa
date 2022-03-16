pragma solidity >=0.5.0 <0.6.0;

contract SciPa {
 
    uint price = 1 finney;
    address payable backend; 

    struct User {
        string name;
        address payable wallet;
        uint[] readable;
        uint[] submited;
        //bytes32 password;
    }
    
    mapping ( uint => User ) users;
    mapping ( address => uint ) userIDs; 
    
    struct Paper {
        uint[] authors; 
        string title;
        uint[] quotes;
    }
    mapping ( uint => Paper ) papers;
    
    constructor() public {
        backend = msg.sender;
    }
  
    function hashPassword(string memory pw) pure public returns (bytes32) {
        return keccak256(abi.encodePacked(pw));
    }
    
    function getSubmited() public view returns (uint[] memory) {
        require ( userIDs[msg.sender] != 0, "User does not exist!");
        
        return users[userIDs[msg.sender]].submited;
    }
    
    function getReadable() public view returns (uint[] memory) {
        require ( userIDs[msg.sender] != 0, "User does not exist!");
        
        return users[userIDs[msg.sender]].readable;
    }
   
    function getUserName() public view returns (string memory) {
        require ( userIDs[msg.sender] != 0, "User does not exist!");
        
        return users[userIDs[msg.sender]].name;
    }
    
    function getUserID() public view returns (uint) {
        require ( userIDs[msg.sender] != 0, "User does not exist!");
        
        return userIDs[msg.sender];
    }
    
    /*  BACKEND_FUNCTION
     *  Submits a new paper
     */
    function submitPaper(uint[] memory authors, uint paperID, string memory paperTitle, uint[] memory ReferenceQuoteIDs) public {
        require ( msg.sender == backend, "Unauthorized access." );
        require ( paperID != 0, "Dangerous paperID" );
        require ( papers[paperID].authors.length == 0, "Paper already exists!" );
        require ( authors.length != 0, "Given paper has no authers!" );
          
        Paper memory newPaper = Paper(authors, paperTitle, ReferenceQuoteIDs);
        papers[paperID] = newPaper;
        
        for(uint i=0; i<authors.length; i++) {
            if(users[authors[i]].wallet != address(0x0)) {
                users[authors[i]].readable.push(paperID);
                users[authors[i]].submited.push(paperID);
            }  
        }
    }
  
    /*  BACKEND_FUNCTION
     *  Creates a new user
     */
    function createUser(string memory userName, uint userID, address payable wallet /*, string memory pw*/) public {
        require ( msg.sender == backend, "Unauthorized access" );
        require ( userID != 0, "Dangerous userID" );
        require ( users[userID].wallet == address(0x0), "User already exists" );
        
        User memory newUser = User(userName, wallet, new uint[](0), new uint[](0));
        //User memory newUser = User(userName, wallet, new uint[](0), new uint[](0), hashPassword(pw));
        users[userID] = newUser;
        userIDs[wallet] = userID;
    }    
    
    /*  BACKEND_FUNCTION
     *  Adds papers to an user as its papers
     */
    function isAuthorOf(uint author, uint[] memory refs) public {
        require ( msg.sender == backend, "Unauthorized access" );
        require ( users[author].wallet != address(0x0), "User does not exist" );
        require ( author != 0, "Dangerous authorID" );

        for(uint i=0; i<refs.length; i++) {
            if(refs[i] != 0) {
                users[author].readable.push(refs[i]);
                users[author].submited.push(refs[i]);
            }  
        }    
    }
    
    /*  USER_FUNCTION
     *  Buys a paper
     */
    function readPaper(uint paperID) public payable {
        require( msg.value >= price, "Pay more!" );
        require( users[userIDs[msg.sender]].wallet != address(0x0), "You do not exist!" );
        require( paperID != 0, "PaperID is dangerous!" );
        require( papers[paperID].authors.length != 0, "Paper does not exist!" );
        require( !accessPaper(paperID, msg.sender), "You already own that paper!" );

        users[userIDs[msg.sender]].readable.push(paperID);

        uint references = papers[paperID].quotes.length;
        uint authors = papers[paperID].authors.length;
        
        uint quotesPayment = 0;
        if(references!=0) {
            quotesPayment = price / (2*references);
            for(uint i=0; i < references; i++) {
                if(users[papers[paperID].quotes[i]].wallet != address(0x0)) {
                    address payable quotee = users[papers[paperID].quotes[i]].wallet;
                    quotee.transfer(quotesPayment);
                }
            }            
        }
        
        uint authorPayment = (price - ( quotesPayment * references )) / authors;
        for(uint i=0; i < authors; i++) {
            if(users[papers[paperID].authors[i]].wallet != address(0x0)) {
                users[papers[paperID].authors[i]].wallet.transfer(authorPayment);
            }
        }
    }
    
    /*  ANY_FUNCTION
     *  Checks if the given address is allowed to read the paper
     */
    function accessPaper(uint paperID, address reader) public view returns (bool) {
        require( userIDs[msg.sender] != 0, "User does not exist!" );
        require( papers[paperID].authors.length != 0, "Paper does not exist!" );
        
        for(uint i=0; i < users[userIDs[reader]].readable.length; i++) {
            if(users[userIDs[reader]].readable[i] == paperID) {
                return true;
            }
        }
        return false;
    }
    
}
