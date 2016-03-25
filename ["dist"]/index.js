"use strict";
var lockScreenService = function(n) {
    return {
        show: function(o) {
            n.$broadcast("ionic-lock-screen:show", {
                touchId: o.touchId || !1,
                passcode: o.code,
                onCorrect: o.onCorrect || null,
                onWrong: o.onWrong || null,
                passcodeLabel: o.passcodeLabel || "Enter Passcode",
                touchLabel: o.passcodeLabel || "Verify Passcode",
                backgroundColor: o.backgroundColor || "#F1F1F1",
                textColor: o.textColor || "#464646",
                buttonColor: o.buttonColor || "#F8F8F8",
                buttonTextColor: o.buttonTextColor || "#464646",
                buttonPressed: o.buttonPressed || "#E0E0E0",
                buttonACColor: o.buttonACColor || "#F8F8F8",
                buttonACTextColor: o.buttonACTextColor || "#464646",
                buttonDelColor: o.buttonDelColor || "#F8F8F8",
                buttonDelTextColor: o.buttonDelTextColor || "#464646"
            })
        }
    }
};
lockScreenService.$inject = ["$rootScope"];
var lockScreenDirective = function(n) {
    return {
        restrict: "E",
        scope: {},
        link: function(o) {
            var e = 0;
            o.enteredPasscode = "",
            o.$on("ionic-lock-screen:show", function(e, i) {
                o._showLockScreen = !0,
                o.passcode = i.passcode,
                o.onCorrect = i.onCorrect,
                o.onWrong = i.onWrong,
                o.passcodeLabel = i.passcodeLabel,
                o.backgroundColor = i.backgroundColor,
                o.textColor = i.textColor,
                o.buttonColor = i.buttonColor,
                o.buttonTextColor = i.buttonTextColor,
                o.buttonPressed = i.buttonPressed,
                o.buttonACColor = i.buttonACColor,
                o.buttonACTextColor = i.buttonACTextColor,
                o.buttonDelColor = i.buttonDelColor,
                o.buttonDelTextColor = i.buttonDelTextColor
                n(function() {
                i.touchId && window.touchid && window.touchid.authenticate(function() {
                    o.$apply(function() {
                        o._showLockScreen = !1
                    }), o.onCorrect && o.onCorrect()
                }, function() {}, o.passcodeLabel)
            }, 50)
            }),
                o.all_clear = function() {
                    o.enteredPasscode = ""
                },
                o.delete = function() {
                    o.enteredPasscode = o.enteredPasscode.slice(0,-1);
                },
                o.digit = function(i) {
                    o.selected = +i,
                    o.passcodeWrong ||
                    (o.enteredPasscode += "" + i,
                        o.enteredPasscode.length >= 4 &&
                        (o.enteredPasscode === "" + o.passcode ? (
                            o.enteredPasscode = "",
                            e = 0,
                            o.onCorrect && o.onCorrect(),
                            o._showLockScreen = !1) : (o.passcodeWrong = !0,
                                e++,
                                o.onWrong && o.onWrong(e),
                                n(function() {
                                    o.enteredPasscode = "",
                                    o.passcodeWrong = !1
                                }, 800)
                        ))
                    );
            }
        },
        template: '<style>'+
        '          /* Animations*/'+
        '          @keyframes ILS_shake {'+
        '            from, to {'+
        '              transform: translate3d(0, 0, 0);'+
        '            }'+
        '            10%, 30%, 50%, 70%, 90% {'+
        '              transform: translate3d(-10px, 0, 0);'+
        '            }'+
        '            20%, 40%, 60%, 80% {'+
        '              transform: translate3d(10px, 0, 0);'+
        '            }'+
        '          }'+
        '          @keyframes ILS_buttonPress {'+
        '            0% {'+
        '              background-color: {{buttonPressed}};'+
        '            }'+
        '            100% {'+
        '              background-color: {{buttonColor}};'+
        '            }'+
        '          }'+
        '          /* Lock Screen Layout*/'+
        '          .ILS_lock {'+
        '            display: flex;'+
        '            flex-direction: column;'+
        '            justify-content: center;'+
        '            position: absolute;'+
        '            width: 100%;'+
        '            height: 100%;'+
        '            z-index: 999;'+
        '            background-color: {{backgroundColor}};'+
        '          }'+
        '          .ILS_lock-hidden {'+
        '            display: none;'+
        '          }'+
        '          .ILS_label-row {'+
        '            height: 50px;'+
        '            width: 100%;'+
        '            text-align: center;'+
        '            font-size: 23px;'+
        '            padding-top: 10px;'+
        '            color: {{textColor}};'+
        '          }'+
        '          .ILS_circles-row {'+
        '            display: flex;'+
        '            flex-direction: row;'+
        '            justify-content: center;'+
        '            width: 100%;'+
        '            height: 60px;'+
        '          }'+
        '          .ILS_circle {'+
        '            background-color: {{backgroundColor}}!important;'+
        '            border-radius: 50%;'+
        '            width: 10px;'+
        '            height: 10px;'+
        '            border:solid 1px {{textColor}};'+
        '            margin: 0 15px;'+
        '          }'+
        '          .ILS_numbers-row {'+
        '            display: flex;'+
        '            flex-direction: row;'+
        '            justify-content: center;'+
        '            width: 100%;'+
        '            height: 100px;'+
        '          }'+
        '          .ILS_digit {'+
        '            margin: 0 14px;'+
        '            width: 80px;'+
        '            border-radius: 10%;'+
        '            height: 80px;'+
        '            text-align: center;'+
        '            padding-top: 29px;'+
        '            font-size: 21px;'+
        '            color: {{buttonTextColor}};'+
        '            background-color: {{buttonColor}};'+
        '          }'+
        '          .ILS_digit.activated {'+
        '            -webkit-animation-name: ILS_buttonPress;'+
        '            animation-name: ILS_buttonPress;'+
        '            -webkit-animation-duration: 0.3;'+
        '            animation-duration: 0.3s;'+
        '          }'+
        '          .ILS_ac {'+
        '            color: {{buttonACTextColor}};'+
        '            background-color: {{buttonACColor}};'+
        '          }'+
        '          .ILS_del {'+
        '            color: {{buttonDelTextColor}};'+
        '            background-color: {{buttonDelColor}};'+
        '          }'+
        '          .ILS_full {'+
        '            background-color:{{textColor}}!important;'+
        '          }'+
        '          .ILS_shake {'+
        '            -webkit-animation-name: ILS_shake;'+
        '            animation-name: ILS_shake;'+
        '            -webkit-animation-duration: 0.5;'+
        '            animation-duration: 0.5s;'+
        '            -webkit-animation-fill-mode: both;'+
        '            animation-fill-mode: both;'+
        '          }'+
        '      </style>'+
        '      <div class="ILS_lock" ng-class="!_showLockScreen ?  \'ILS_lock-hidden\' : \'\'">'+
        '        <div class="ILS_label-row">'+
        '          {{passcodeLabel}}'+
        '        </div>'+
        '        <div class="ILS_circles-row" ng-class="passcodeWrong ?  \'ILS_shake\' : \'\'">'+
        '          <div class="ILS_circle" ng-class=" enteredPasscode.length>0 ? \'ILS_full\' : \'\'"></div>'+
        '          <div class="ILS_circle" ng-class=" enteredPasscode.length>1 ? \'ILS_full\' : \'\'"></div>'+
        '          <div class="ILS_circle" ng-class=" enteredPasscode.length>2 ? \'ILS_full\' : \'\'"></div>'+
        '          <div class="ILS_circle" ng-class=" enteredPasscode.length>3 ? \'ILS_full\' : \'\'"></div>'+
        '        </div>'+
        '        <div class="ILS_numbers-row">'+
        '          <div ng-click="digit(1)" class="ILS_digit">1</div>'+
        '          <div ng-click="digit(2)" class="ILS_digit">2</div>'+
        '          <div ng-click="digit(3)" class="ILS_digit">3</div>'+
        '        </div>'+
        '        <div class="ILS_numbers-row">'+
        '          <div ng-click="digit(4)" class="ILS_digit">4</div>'+
        '          <div ng-click="digit(5)" class="ILS_digit">5</div>'+
        '          <div ng-click="digit(6)" class="ILS_digit">6</div>'+
        '        </div>'+
        '        <div class="ILS_numbers-row">'+
        '          <div ng-click="digit(7)" class="ILS_digit">7</div>'+
        '          <div ng-click="digit(8)" class="ILS_digit">8</div>'+
        '          <div ng-click="digit(9)" class="ILS_digit">9</div>'+
        '        </div>'+
        '        <div class="ILS_numbers-row">'+
        '          <div ng-click="all_clear()" class="ILS_digit ILS_ac">AC</div>'+
        '          <div ng-click="digit(0)" class="ILS_digit">0</div>'+
        '          <div ng-click="delete()" class="ILS_digit ILS_del">DEL</div>'+
        '        </div>'+
        '      </div>'
    }
};
lockScreenDirective.$inject = ["$timeout"],
angular.module("ionic-lock-screen", []),
angular.module("ionic-lock-screen").directive("lockScreen", lockScreenDirective),
angular.module("ionic-lock-screen").service("$lockScreen", lockScreenService);