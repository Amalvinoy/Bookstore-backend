const Books=require('../models/bookModel')

///add book -create-
exports.addBook = async (req, res) => { 
    console.log("Inside Add Book"); 
    console.log(req.files);
    const {title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category} = req.body
    const userMail = req.payload
    var uploadImage = []
    req.files.map(item=>uploadImage.push(item.filename))
    console.log(title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImage,userMail);
    try{
        const existingBook = await Books.findOne({title,userMail})
        if(existingBook){
            res.status(401).json("You have already added the book")
        }else{
            const newBook = new Books({
                title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImage,userMail
            })
            await newBook.save()
            res.status(200).json({messge:"Book Added",newBook})
        }
    }catch(err){
        res.status(500).json(err)
    }
    
}

//get all books-find()

exports.getBooks = async (req, res) => {
    console.log("Inside Get Books");
    const searchKey = req.query.search || ""; 
    try {
        const query = {
            title: {
                $regex: searchKey, // Uses the search term as the regex pattern
                $options: 'i'      // Makes the search case-insensitive
            }
        };
        const books = await Books.find(query);      
        res.status(200).json(books);      
    } catch (err) {
        // Essential: Log the error and send a 500 response if the query fails.
        console.error("Mongoose Find Error:", err); 
        res.status(500).json(err);
    }
}

//get home books-find()
exports.getHomeBooks = async (req, res) => {
    console.log("Inside Get Home Books");
    try {
        const books = await Books.find().limit(3);
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json(err);
    }
}

//get book by id
exports.getBookById = async (req, res) => {
    console.log("Inside Get Book By ID");
    const { id } = req.params;
    try {
        const book = await Books.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json(err);
    }
}

//get all book - admin

exports.getAllBooksAdmin = async (req,res)=>{
    console.log("Inside Get All Books for Admin");
    try{
        const books = await Books.find()
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json(err);
    }
}

