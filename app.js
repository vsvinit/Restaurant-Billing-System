// Code goes here
// declare a module

var app = angular.module('myApp', []);

app.controller('PosController', function ($scope) {

    $scope.drinks = [{
        id: 0,
        name: "Drink 1",
        price: "50",
    },
    {
        id: 1,
        name: "Drink 2",
        price: "100",
    },
    {
        id: 2,
        name: "Drink 3",
        price: "150",
    },
    {
        id: 3,
        name: "Drink 4",
        price: "200",
    },
    {
        id: 4,
        name: "Tea",
        price: "250",
    },
    {
        id: 5,
        name: "Hot Chocolate",
        price: "300",
    },
    {
        id: 6,
        name: "Coke",
        price: "400",
    },
    {
        id: 7,
        name: "Orange Juice",
        price: "500",
    }];

    $scope.foods = [{
        id: 8,
        name: "Vada Pao",
        price: "50",
    },
    {
        id: 9,
        name: "Idli",
        price: "100",
    },
    {
        id: 10,
        name: "Cheese Cake",
        price: "250",
    },
    {
        id: 11,
        name: "Sandwich",
        price: "300",
    },
    {
        id: 12,
        name: "Chowmein",
        price: "350",
    },
    {
        id: 13,
        name: "Masala Dosa",
        price: "400",
    }];


    $scope.order = [];
    $scope.new = {};
    $scope.totOrders = 0;

    var url = window.location.protocol + "://" + window.location.host + "/" + window.location.pathname;

    $scope.getDate = function () {
        var today = new Date();
        var mm = today.getMonth() + 1;
        var dd = today.getDate();
        var yyyy = today.getFullYear();

        var date = dd + "/" + mm + "/" + yyyy

        return date
    };

    $scope.addToOrder = function (item, qty) {
        var flag = 0;
        if ($scope.order.length > 0) {
            for (var i = 0; i < $scope.order.length; i++) {
                if (item.id === $scope.order[i].id) {
                    item.qty += qty;
                    flag = 1;
                    break;
                }
            }
            if (flag === 0) {
                item.qty = 1;
            }
            if (item.qty < 2) {
                $scope.order.push(item);
            }
        } else {
            item.qty = qty;
            $scope.order.push(item);
        }
    };

    $scope.removeOneEntity = function (item) {
        for (var i = 0; i < $scope.order.length; i++) {
            if (item.id === $scope.order[i].id) {
                item.qty -= 1;
                if (item.qty === 0) {
                    $scope.order.splice(i, 1);
                }
            }
        }
    };

    $scope.removeItem = function (item) {
        for (var i = 0; i < $scope.order.length; i++) {
            if (item.id === $scope.order[i].id) {
                $scope.order.splice(i, 1);
            }
        }
    };

    $scope.getTotal = function () {
        var tot = 0;
        for (var i = 0; i < $scope.order.length; i++) {
            tot += ($scope.order[i].price * $scope.order[i].qty)
        }
        return tot;
    };
$scope.addTip = function () {
        var totAftTip = 0;
        
            totAftTip = $scope.getTotal() + ($scope.tipPer* $scope.getTotal())/100
        
        return totAftTip;
    };

    $scope.clearOrder = function () {
        $scope.order = [];
    };

    $scope.checkout = function (index) {
        alert($scope.getDate() + " - Order Number: " + ($scope.totOrders+1) + "\n\n Total amount: $" + $scope.addTip().toFixed(2) + "\n\nPayment received. Thanks.");
        $scope.order = [];
        $scope.totOrders += 1;
    };

    $scope.addNewItem = function (item) {
        if (item.category === "Drinks") {
            item.id = $scope.drinks.length + $scope.foods.length
            $scope.drinks.push(item)
            $scope.new = []
            $('#myTab a[href="#drink"]').tab('show')
        } else if (item.category === "Foods") {
            item.id = $scope.drinks.length + $scope.foods.length
            $scope.foods.push(item)
            $scope.new = []
            $('#myTab a[href="#food"]').tab('show')
        }
    };

});
