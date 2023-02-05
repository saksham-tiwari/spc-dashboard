export default function accessHeader() {
    const user = localStorage.getItem("token");
  
    if (user) {
        
      // For Spring Boot back-end
      return (
        {
            headers: {
                Authorization: 'Bearer ' + user ,//the token is a variable which holds the token
            }
        }
        )
  
      // for Node.js Express back-end
    //   return { "x-access-token": user.accessToken };
    } else {
      return {};
    }
  }