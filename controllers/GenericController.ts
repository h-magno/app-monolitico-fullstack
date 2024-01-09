class GeneriController {
    generatePagination(limit: any, page: any) {
        const limitVar = limit ? parseInt(limit) : 10,
              pageVar = page? parseInt(page) -1 : 0

            return [limitVar, pageVar]
    }


   generatePin(){
      
        return (Math.random() * 1000).toString().replace('.', '').slice(0, 4)
    }

}
 

export default GeneriController
