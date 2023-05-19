const { constants } =require( "../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    let errorResponse = {
      title: "Server Error",
      message: err.message,
      stackTrace: err.stack
    };
  
    switch (statusCode) {
      case constants.NOT_FOUND:
        errorResponse.title = "Not Found";
        break;
      case constants.VALIDATION_ERROR:
        errorResponse.title = "Validation Error";
        break;
      case constants.FORBIDDEN:
        errorResponse.title = "Forbidden Error";
        break;
      case constants.UN_AUTHORIZED:
        errorResponse.title = "Unauthorized Error";
        break;
      case constants.SERVER_ERROR:
        // no need to modify errorResponse since it is already set to "Server Error"
        break;
      default:
        console.log("All is good, there is no error");
        break;
    }
  
    res.status(statusCode).json(errorResponse);
  };
  
  module.exports = errorHandler;
  


































// const { constants } =require( "../constants");
// const errorHandler=(err,req,res,next)=>{
//    const statusCode = res.statusCode? res.statusCode:500;
//    switch(statusCode){
//     case constants.NOT_FOUND:
//         res.json({
//             title:"Not Found",
//             message:err.message,
//             stackTrace:err.stack
//         });
//         break;
//         case constants.VALIDATION_ERROR:
//             res.json({
//             title:"Validation Error",
//             message:err.message,
//             stackTrace:err.stack
//         });

//         case constants.FORBIDDEN:
//             res.json({
//             title:"Forbidden  Error",
//             message:err.message,
//             stackTrace:err.stack
//         });
//         case constants.UN_AUTHORIZED:
//             res.json({
//             title:"unauthorized Error",
//             message:err.message,
//             stackTrace:err.stack
//         });
//         case constants.SERVER_ERROR:
//             res.json({
//             title:"Server Error",
//             message:err.message,
//             stackTrace:err.stack
//         });

//         default:
//             console.log(" all is good there is no error ");
//                     break;

//    } 
// };

// module.exports=errorHandler;