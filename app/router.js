const routers = app => {
    const {
        router,
        controller,
    } = app
    const {
        isParmas,
        isToken,
        isLogin
    } = app.middleware
    const routerConfig = [
        //test
        {
            url: '/',
            middlewareLists: [
                controller.home.index,
            ],
            method: 'get'
        },
        {
            url: '/addUser',
            middlewareLists: [
                controller.home.addUser,
            ],
            method: 'post'
        },
        {
            url: '/updateUser',
            middlewareLists: [
                controller.home.updateUser,
            ],
            method: 'post'
        },
        {
            url: '/deleteUser',
            middlewareLists: [
                controller.home.deleteUser,
            ],
            method: 'post'
        },
        {
            url: '/upload',
            middlewareLists: [
                controller.upload.uploadFiles,
            ],
            method: 'post'
        },

        //菜单

        {
            url: '/getMenuLists',
            middlewareLists: [
                controller.menu.getMenuLists,
            ],
            method: 'get'
        },
        //商品
        {
            url: '/findLists',
            middlewareLists: [
                controller.product.findLists,
            ],
            method: 'get'
        },
        {
            url: '/addProduct',
            middlewareLists: [
                controller.product.addProduct,
            ],
            method: 'post'
        },
        {
            url: '/removeProduct',
            middlewareLists: [
                controller.product.removeProduct,
            ],
            method: 'post'
        },
        {
            url: '/getProductInfo',
            middlewareLists: [
                isParmas(['productId']),
                controller.product.getProductInfo,
            ],
            method: 'get'
        },
        //分类
        {
            url: '/getClass',
            middlewareLists: [
                controller.classification.getClass,
            ],
            method: 'get'
        },
        {
            url: '/addClass',
            middlewareLists: [
                controller.classification.addClass,
            ],
            method: 'post'
        },
        {
            url: '/getFirstClass',
            middlewareLists: [
                controller.classification.getFirstClass,
            ],
            method: 'get'
        },

        //用户
        {
            url: '/addUserInfo',
            middlewareLists: [
                isParmas(['name', 'passWord']),
                controller.user.addUserInfo,
            ],
            method: 'post'
        },
        {
            url: '/login',
            middlewareLists: [
                isParmas(['name', 'passWord']),
                controller.user.login,
            ],
            method: 'post'
        },


        //订单
        {
            url: '/addOrder',
            middlewareLists: [
                // isLogin(),
                isParmas(['productId']),
                controller.order.addOrder,
            ],
            method: 'post'
        },
        {
            url: '/orderLists',
            middlewareLists: [
                controller.order.orderLists,
            ],
            method: 'get'
        },
        {
            url: '/orderPay',
            middlewareLists: [
                isParmas(['orderId']),
                controller.order.orderPay,
            ],
            method: 'post'
        },
        {
            url: '/orderInfo',
            middlewareLists: [
                isParmas(['orderId']),
                controller.order.orderInfo,
            ],
            method: 'get'
        },
        {
            url: '/getOrder',
            middlewareLists: [
                isParmas(['orderId']),
                controller.order.getOrder,
            ],
            method: 'post'
        },
        {
            url: '/comments',
            middlewareLists: [
                isLogin(),
                isParmas(['orderId','content']),
                controller.order.comments,
            ],
            method: 'post'
        },
    ]
    routerConfig.forEach(item => {
        router[item.method](item.url, ...item.middlewareLists)
    })
    // //test
    // router.get('/', controller.home.index)
    // router.post('/addUser', controller.home.addUser)
    // router.post('/updateUser', controller.home.updateUser)
    // router.post('/deleteUser', controller.home.deleteUser)
    // router.post('/upload', controller.upload.uploadFiles)

    // //菜单
    // router.get('/getMenuLists', controller.menu.getMenuLists)
    // //商品
    // router.get('/findLists', controller.product.findLists)
    // router.post('/addProduct', controller.product.addProduct)
    // router.post('/removeProduct', controller.product.removeProduct)

    // //分类
    // router.get('/getClass', controller.classification.getClass)
    // router.post('/addClass', controller.classification.addClass)
    // router.get('/getFirstClass', controller.classification.getFirstClass)
}

module.exports = routers